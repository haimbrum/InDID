import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: "100px",
    background: "#09c3ab",
  },
});

export default function CenteredTabs({onChange, value}) {
  const classes = useStyles();


  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={onChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Ask For Verify Entity" />
        <Tab label="Validate Entity" />
      </Tabs>
    </Paper>
  );
}