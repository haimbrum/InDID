import React, { useState } from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
import Card from "components/Card/Card";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
    },
  },
}));

const AddNewProposal = ({ onAddNewProposal }) => {
  const classes = useStyles();
  const [data, setData] = useState();
  const [address, setAddress] = useState();

  return (
    <>
      <h2>Create New Proposal</h2>
      <Card>
        <div className={classes.root}>
          <TextField
            placeholder="Data"
            value={data}
            onChange={(c) => setData(c.target.value)}
          ></TextField>
          <TextField
            placeholder="Address"
            value={address}
            onChange={(c) => setAddress(c.target.value)}
          ></TextField>
          <Button onClick={() => onAddNewProposal({ data, address })}>
            Add
          </Button>
        </div>
      </Card>
    </>
  );
};

AddNewProposal.propTypes = {
  onAddNewProposal: PropTypes.func,
};

export default AddNewProposal;
