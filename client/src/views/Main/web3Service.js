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
    if (governanceInstance) {
      _fetchProposals();
      _setupEventsListener();
    }
  }, [governanceInstance]);

  const _onProposalCreated = (event) => {
    const newProposal = {
      proposalId: event.returnValues.proposalId,
      proposer: event.returnValues.proposer,
      description: event.returnValues.description,
    };

    const newProposals = [...proposals, newProposal];
    setProposals(newProposals);
    localStorage.setItem("proposals", JSON.stringify(newProposals));
  };

  const _setupEventsListener = () => {
    governanceInstance.events.ProposalCreated().on("data", _onProposalCreated);
  };

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
      proposalsWithState = [
        ...proposalsWithState,
        { ...proposal, state: proposalState },
      ];
    }
    setProposals(proposalsWithState);
  };

  const _fetchProposalState = async (proposalId) => {
    const res = await governanceInstance.methods.state(proposalId).call();
    return res;
  };

  const propose = async (entity) => {
    const networkId = await web3.eth.net.getId();

    const encodedFucntionData = verifiedDBInstance.methods
      .addVerifiedEntity(entity.address, entity.data)
      .encodeABI();
    await governanceInstance.methods
      .propose(
        [VerifiedDBContract.networks[networkId].address],
        [0],
        [encodedFucntionData],
        `Verify ${entity.address} address`
      )
      .send({ from: accounts[0] });
  };

  const getVerifiedEntity = async (address) => {
    return await verifiedDBInstance.methods.getVerifiedEntity(address).call();
  };

  return { getVerifiedEntity, propose, proposals, loading };
}

export default useWeb3Service;
