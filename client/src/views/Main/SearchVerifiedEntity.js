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

const SearchVerifiedEntity = ({ onSearchClick, verifiedEntityResult }) => {
  const classes = useStyles();
  const [address, setAddress] = useState();

  return (
    <>
      <h2>Search Verified Entity</h2>
      <Card>
        <div className={classes.root}>
          <TextField
            placeholder="Address"
            value={address}
            onChange={(c) => setAddress(c.target.value)}
          ></TextField>
          <Button onClick={() => onSearchClick(address)}>Search</Button>
        </div>
        {verifiedEntityResult}
      </Card>
    </>
  );
};

SearchVerifiedEntity.propTypes = {
  onSearchClick: PropTypes.func,
  verifiedEntityResult: PropTypes.string,
};

export default SearchVerifiedEntity;
