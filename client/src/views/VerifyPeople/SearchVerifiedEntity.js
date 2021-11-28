import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputBase, makeStyles, Paper, TextField, useMediaQuery, useTheme } from "@material-ui/core";
import Card from "components/Card/Card";
import PropTypes from "prop-types";
import SearchIcon from '@material-ui/icons/Search';
import EntityData from "./EntityData";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchVerifiedEntity = ({ onSearchClick, verifiedEntityResult }) => {
  const classes = useStyles();
  const [address, setAddress] = useState();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    verifiedEntityResult && setOpen(true);
  }, [verifiedEntityResult])
   
  return (
    <>
      {/* <h2>Search Verified Entity</h2> */}
      <div className={classes.container}>
        <Paper className={classes.root}>
          <InputBase
            onChange={(c) => setAddress(c.target.value)}
            value={address}
            className={classes.input}
            placeholder="Enter Addess (ex. 0x93...CD2A)"
            inputProps={{ 'aria-label': 'enter address' }}
          />
          <IconButton onClick={() => onSearchClick(address)} className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

      </div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Results for address: {address}
        </DialogTitle>
        <DialogContent>
          {verifiedEntityResult === "NO_RESULTS" ? "No results found :(" : <EntityData data={verifiedEntityResult}/>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

SearchVerifiedEntity.propTypes = {
  onSearchClick: PropTypes.func,
  verifiedEntityResult: PropTypes.string,
};

export default SearchVerifiedEntity;
