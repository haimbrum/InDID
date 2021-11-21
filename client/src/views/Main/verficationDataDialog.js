import * as React from "react";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import BlockIcon from "@material-ui/icons/Block";
import ReportIcon from "@material-ui/icons/Report";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { blue, grey, red } from "@material-ui/core/colors";
import { SupportType } from "./enums";

const useStyles = makeStyles(() => ({
  itemCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  voteActions: {
    display: "flex",
    justifyContent: "center",
  },
}));

function VerificationDataDialog({ description, data, onCastVote }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCastVote = (support) => {
    handleClose();
    onCastVote(support);
  };

  return (
    <div>
      <div className={classes.itemCell}>
        {description}
        <Button variant="outlined" onClick={handleClickOpen}>
          See User Info...
        </Button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Do you confirm the identity of the address: {data.address}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{data.details}</DialogContentText>
          <div className={classes.voteActions}>
            <Tooltip title="Verify User" aria-label="verify user">
              <IconButton
                style={{ color: blue[500] }}
                onClick={() => handleCastVote(SupportType.FOR)}
              >
                <VerifiedUserIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Report User" aria-label="add">
              <IconButton
                style={{ color: red[500] }}
                onClick={() => handleCastVote(SupportType.AGAINST)}
              >
                <ReportIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="I'm Not Sure" aria-label="add">
              <IconButton
                style={{ color: grey[500] }}
                onClick={() => handleCastVote(SupportType.ABSTAIN)}
              >
                <BlockIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

VerificationDataDialog.propTypes = {
  description: PropTypes.string,
  data: PropTypes.string,
  onCastVote: PropTypes.func.isRequired,
};

export default VerificationDataDialog;
