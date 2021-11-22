import { useEffect, useState } from "react";
import getWeb3 from "../../utils/getWeb3";
import GovernorContract from "../../contracts/VerifierGovernor.json";
import VerifiedDBContract from "../../contracts/VerifiedDB.json";

function useWeb3Service() {
  const [web3, setWeb3] = useState();
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState();
  const [governanceInstance, setGovernanceInstance] = useState();
  const [verifiedDBInstance, setVerifiedDBInstance] = useState();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    _initializeContracts();
  }, []);

  useEffect(() => {
    if (governanceInstance && verifiedDBInstance) {
      _fetchProposals();
      _setupEventsListener();
    }
  }, [governanceInstance, verifiedDBInstance]);

  const _extractDecodedData = (encodedData) => {
    // workaround for extracting a signature from verifiedDBInstance context.
    // Todo: improve it with a better solution
    const signature = verifiedDBInstance.methods.addVerifiedEntity(null, null)
      ._method.signature;
    const encodedDataParams = encodedData.split(signature)[1];
    const calldata = web3.eth.abi.decodeParameters(
      ["address", "string"],
      encodedDataParams
    );
    return {
      address: calldata[0],
      details: calldata[1],
    };
  };

  const _onProposalCreated = (event) => {
    const callData = _extractDecodedData(event.returnValues.calldatas[0]);
    const newProposal = {
      proposalId: event.returnValues.proposalId,
      proposer: event.returnValues.proposer,
      description: event.returnValues.description,
      proposalData: event.returnValues.description,
      state: 1,
      abstainVotes: "0",
      againstVotes: "0",
      forVotes: "0",
      data: callData,
    };

    const newProposals = [...proposals, newProposal];
    setProposals(newProposals);
    localStorage.setItem("proposals", JSON.stringify(newProposals));
  };

  const _onVoteCast = () => {
    _fetchProposals();
  };

  const _setupEventsListener = () => {
    governanceInstance.events.ProposalCreated().on("data", _onProposalCreated);
    governanceInstance.events.VoteCast().on("data", _onVoteCast);
  };

  window.ethereum.on("accountsChanged", async (accounts) => {
    setAccounts(accounts);
  });

  const _initializeContracts = async () => {
    try {
      const web3 = await getWeb3();
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);

      const networkId = await web3.eth.net.getId();

      const governanceinstance = new web3.eth.Contract(
        GovernorContract.abi,
        networkId &&
          GovernorContract.networks[networkId] &&
          GovernorContract.networks[networkId].address
      );

      setGovernanceInstance(governanceinstance);

      const verifiedDBInstance = new web3.eth.Contract(
        VerifiedDBContract.abi,
        networkId &&
          VerifiedDBContract.networks[networkId] &&
          VerifiedDBContract.networks[networkId].address
      );

      setVerifiedDBInstance(verifiedDBInstance);
      setLoading(false);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const _fetchStoredProposals = () => {
    const proposals = localStorage.getItem("proposals"); // Todo: call backend

    return proposals ? JSON.parse(proposals) : [];
  };

  const _fetchProposals = async () => {
    const proposals = _fetchStoredProposals();
    let proposalsWithState = [];

    for (const proposal of proposals) {
      const proposalState = await _fetchProposalState(proposal.proposalId);
      if (proposalState) {
        const { abstainVotes, againstVotes, forVotes } =
          await _fetchProposeData(proposal.proposalId);

        proposalsWithState = [
          ...proposalsWithState,
          {
            ...proposal,
            state: proposalState,
            abstainVotes,
            againstVotes,
            forVotes,
          },
        ];
      }
    }
    setProposals(proposalsWithState);
  };

  const _fetchProposalState = async (proposalId) => {
    const res = await governanceInstance.methods.state(proposalId).call();
    return res;
  };

  const _fetchProposeData = async (proposalId) => {
    const res = await governanceInstance.methods.proposals(proposalId).call();
    return res;
  };

  const propose = async (entity) => {
    const networkId = await web3.eth.net.getId();
    const address = entity.address;
    const shortedAddress =
      address.slice(0, 5) + "..." + address.slice(address.length - 4);
    const encodedFucntionData = verifiedDBInstance.methods
      .addVerifiedEntity(address, entity.data)
      .encodeABI();
    await governanceInstance.methods
      .propose(
        [VerifiedDBContract.networks[networkId].address],
        [0],
        [encodedFucntionData],
        `Verify ${shortedAddress}`
      )
      .send({ from: accounts[0] });
  };

  const getVerifiedEntity = async (address) => {
    return await verifiedDBInstance.methods.getVerifiedEntity(address).call();
  };

  const castVote = async (proposalId, support) => {
    await governanceInstance.methods
      .castVote(proposalId, support)
      .send({ from: accounts[0] });
  };

  const queuePropose = async (proposalId) => {
    const networkId = await web3.eth.net.getId();
    const proposalToExecute = proposals.find(
      (proposal) => proposal.proposalId === proposalId
    );
    const encodedFucntionData = verifiedDBInstance.methods
      .addVerifiedEntity(
        proposalToExecute.data.address,
        proposalToExecute.data.details
      )
      .encodeABI();

    const descriptionHash = web3.utils.sha3(proposalToExecute.description);
    await governanceInstance.methods
      .queue(
        [VerifiedDBContract.networks[networkId].address],
        [0],
        [encodedFucntionData],
        descriptionHash
      )
      .send({ from: accounts[0] });
  };

  const executePropose = async (proposalId) => {
    const networkId = await web3.eth.net.getId();
    const proposalToExecute = proposals.find(
      (proposal) => proposal.proposalId === proposalId
    );
    const encodedFucntionData = verifiedDBInstance.methods
      .addVerifiedEntity(
        proposalToExecute.data.address,
        proposalToExecute.data.details
      )
      .encodeABI();

    const descriptionHash = web3.utils.sha3(proposalToExecute.description);
    await governanceInstance.methods
      .execute(
        [VerifiedDBContract.networks[networkId].address],
        [0],
        [encodedFucntionData],
        descriptionHash
      )
      .send({ from: accounts[0] });
  };

  return {
    getVerifiedEntity,
    propose,
    castVote,
    executePropose,
    queuePropose,
    proposals,
    loading,
  };
}

export default useWeb3Service;
