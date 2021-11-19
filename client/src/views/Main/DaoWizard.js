import React, { useState } from "react";
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

import {
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

const useStyles = makeStyles(styles);

const DaoWizard = () => {
  const classes = useStyles();
  const { getVerifiedEntity, propose, proposals, loading } = useWeb3Service();

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
                  <TableCell>Total Votes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proposals &&
                  proposals.map((proposal) => (
                    <TableRow key={proposal.proposalId}>
                      <TableCell>{proposal.description}</TableCell>
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
