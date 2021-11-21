import React, { useState } from "react";
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import AddNewProposal from "./AddNewProposal";
import SearchVerifiedEntity from "./SearchVerifiedEntity";
import useWeb3Service from "./web3Service";
import { ProposalState } from "./enums";
import VerificationDataDialog from "./verficationDataDialog";

const SUCCEDEED_STATE = 4;
const QUEUED_STATE = 5;

const useStyles = makeStyles(styles);

const DaoWizard = () => {
  const classes = useStyles();
  const {
    getVerifiedEntity,
    propose,
    castVote,
    executePropose,
    queuePropose,
    proposals,
    loading,
  } = useWeb3Service();

  const [verifiedEntityResult, setVerifiedEntityResult] = useState();

  const handleSearchEntityClick = async (address) => {
    const res = await getVerifiedEntity(address);
    setVerifiedEntityResult(res);
  };

  const handleAddNewProposal = (entity) => {
    propose(entity);
  };

  return loading ? (
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
                  <TableCell>State</TableCell>
                  <TableCell>Vote For</TableCell>
                  <TableCell>Vote Against</TableCell>
                  <TableCell>Vote Abstain</TableCell>
                  <TableCell>Total Votes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proposals &&
                  proposals.map((proposal) => (
                    <TableRow key={proposal.proposalId}>
                      <TableCell>
                        <VerificationDataDialog
                          description={proposal.description}
                          data={proposal.data}
                          onCastVote={(support) =>
                            castVote(proposal.proposalId, support)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {ProposalState[proposal.state]}
                        {proposal.state == SUCCEDEED_STATE && (
                          <Button
                            variant="outlined"
                            onClick={() => queuePropose(proposal.proposalId)}
                          >
                            Queue
                          </Button>
                        )}
                        {proposal.state == QUEUED_STATE && (
                          <Button
                            variant="outlined"
                            onClick={() => executePropose(proposal.proposalId)}
                          >
                            Execute
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>{proposal.forVotes}</TableCell>
                      <TableCell>{proposal.againstVotes}</TableCell>
                      <TableCell>{proposal.abstainVotes}</TableCell>
                      <TableCell>{proposal.totalVotes}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <AddNewProposal onAddNewProposal={handleAddNewProposal} />
          <SearchVerifiedEntity
            onSearchClick={handleSearchEntityClick}
            verifiedEntityResult={verifiedEntityResult}
          />
        </div>
      </div>
    </div>
  );
};

export default DaoWizard;
