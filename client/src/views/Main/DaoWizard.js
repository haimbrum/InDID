import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import GovernorContract from "../../contracts/VerifierGovernor.json";
import VerifiedDBContract from "../../contracts/VerifiedDB.json";
import getWeb3 from "../../utils/getWeb3";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import Card from "components/Card/Card";

const fetchProposals = () => {
  const proposals = localStorage.getItem("proposals"); // Todo: call backend
  return proposals ? JSON.parse(proposals) : [];
};

const AddNewProposal = ({ onAddNewProposal }) => {
  const [description, setDescription] = useState();

  return (
    <Card>
      <h2>Create New Proposal</h2>
      <label>Description: </label>
      <TextField
        value={description}
        onChange={(c) => setDescription(c.target.value)}
      ></TextField>
      <button onClick={() => onAddNewProposal(description)}>Add</button>
    </Card>
  );
};

AddNewProposal.propTypes = {
  onAddNewProposal: PropTypes.func,
};

const useStyles = makeStyles(styles);

const DaoWizard = () => {
  const classes = useStyles();

  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();
  const [governanceInstance, setGovernanceInstance] = useState();
  const [verifiedDBInstance, setVerifiedDBInstance] = useState();
  const [proposals, setProposals] = useState();

  const initializeContracts = async () => {
    const web3 = await getWeb3();
    setWeb3(web3);

    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);

    setProposals(fetchProposals());

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
  };

  const onProposalCreated = (event) => {
    const newProposal = {
      proposalId: event.returnValues.proposalId,
      proposer: event.returnValues.proposer,
      description: event.returnValues.description,
    };

    const newProposals = [...proposals, newProposal];
    setProposals(newProposals);
    localStorage.setItem("proposals", JSON.stringify(newProposals));
  };

  const setupEventsListener = () => {
    governanceInstance.events.ProposalCreated().on("data", onProposalCreated);
  };

  useEffect(() => {
    governanceInstance && setupEventsListener();
  }, [governanceInstance]);

  useEffect(() => {
    try {
      initializeContracts();
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }, []);

  const handleAddNewProposal = async (description) => {
    const networkId = await web3.eth.net.getId();

    console.log(VerifiedDBContract.networks[networkId]);

    const encodedFucntionData = verifiedDBInstance.methods
      .addVerifiedEntity(123, { data: description, confidence: 100 })
      .encodeABI();
    await governanceInstance.methods
      .propose(
        [VerifiedDBContract.networks[networkId].address],
        [0],
        [encodedFucntionData],
        description
      )
      .send({ from: accounts[0] });
  };

  return !web3 ? (
    <div>Loading Web3, accounts, and contract...</div>
  ) : (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="typography">
          <div className={classes.title}>
            <h2>Proposals</h2>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Vote For</TableCell>
                  <TableCell>Vote Against</TableCell>
                  <TableCell>Total Votes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proposals &&
                  proposals.map((proposal) => (
                    <TableRow key={proposal.proposalId}>
                      <TableCell>{proposal.description}</TableCell>
                      <TableCell>{proposal.proposalId}</TableCell>
                      <TableCell>{proposal.state}</TableCell>
                      <TableCell>{proposal.voresFor}</TableCell>
                      <TableCell>{proposal.votesAgainst}</TableCell>
                      <TableCell>{proposal.totalVotes}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.typo}></div>
          <AddNewProposal onAddNewProposal={handleAddNewProposal} />
        </div>
      </div>
    </div>
  );
};

export default DaoWizard;
