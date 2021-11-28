import React, { useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import Card from "components/Card/Card";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(4),
    },
  },
  textField: {

  },
  inputGroup: {
    display: "flex",
    justifyContent: "space-between",
  }
}));

const AddNewProposal = ({ onAddNewProposal }) => {
  const classes = useStyles();
  const [state, setState] = useState({ address: "", firstName: "", lastName: "", street: "", city: "", state: "", email: "" })

  function onChange(event) {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    const { address, ...rest } = state;
    const data = JSON.stringify(rest)
    console.log('An essay was submitted: ' + data);
    console.log('address: ' + address);
    onAddNewProposal({ data, address })
    event.preventDefault();
  }


  return (
    <Card>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <div className={classes.root}>
            <div>
              <TextField
                name="address"
                placeholder="Address"
                value={state.address}
                onChange={onChange}
                fullWidth
                className={classes.textField}
              ></TextField>
            </div>
            <div className={classes.inputGroup}>
              <TextField
                name="firstName"
                placeholder="First Name"
                value={state.firstName}
                onChange={onChange}
                className={classes.textField}
              ></TextField>
              <TextField
                name="lastName"
                placeholder="Last Name"
                value={state.lastName}
                onChange={onChange}
                className={classes.textField}
              ></TextField>
              <TextField
                name="email"
                placeholder="Email"
                value={state.email}
                onChange={onChange}
                className={classes.textField}
              ></TextField>
            </div>
            <div className={classes.inputGroup}>
              <TextField
                name="street"
                placeholder="Street"
                value={state.street}
                onChange={onChange}
                className={classes.textField}
              ></TextField>
              <TextField
                name="city"
                placeholder="City"
                value={state.city}
                onChange={onChange}
                className={classes.textField}
              ></TextField>
              <TextField
                name="state"
                placeholder="State"
                value={state.state}
                onChange={onChange}
                className={classes.textField}
              ></TextField>
            </div>
            <div className={classes.inputGroup}>
            <Button onClick={handleSubmit} color="primary" style={{width: "100%"}}>Verify</Button>
            </div>
          </div>
        </GridItem>
      </GridContainer>
    </Card>
  );
};

AddNewProposal.propTypes = {
  onAddNewProposal: PropTypes.func,
};

export default AddNewProposal;
