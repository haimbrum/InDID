/*eslint-disable*/
import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, VerifiedUser, LibraryBooks } from "@material-ui/icons";


// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/verify-people"
          color="primary"
          className={classes.navLink}
        >
          Enter App
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://docs.trubdy.net/"
          target="_blank"
          color="transparent"
          className={classes.navLink}
        >
          <LibraryBooks className={classes.icons} /> Docs
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
          <Button
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            href="https://github.com/haimbrum/TruBuddy"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-github"} />
          </Button>
      </ListItem>
    </List>
  );
}
