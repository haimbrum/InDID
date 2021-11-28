import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Storage from "@material-ui/icons/Storage";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function FeaturesSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <h2 className={classes.title}>Get Involved</h2>
          <h5 className={classes.description}>
            TruBuddy aims to decentralized as much information as possible and create a huge trust-based network.
            <br />
            There are a variety of ways you can help us achieve our goals.
          </h5>
        </GridItem>
      </GridContainer>
      <div className={classes.featuresWrapper}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>

            <a href="/verify-people" target="_blank">
              <InfoArea
                title="Ask For Entity Verification"
                description={() => <>You can search for already verified entity or you can ask to verify a new entity. <br/><br/><br/> Click to enter the app</>}
                icon={Person}
                iconColor="primary"
                vertical
              />
            </a>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <a href="https://docs.trubdy.net/trubuddy-components/trubuddy-validators" target="_blank">
              <InfoArea
                title="Be A TruBuddy validator"
                description={() => <>As a TruBuddy validator you help the trusted network to grow. <br/> In return for your efforts you will earn rewards. <br/> <br/> Click to read more</>}
                icon={VerifiedUser}
                iconColor="primary"
                vertical
              />
            </a>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <a href="https://docs.trubdy.net/trubuddy-components/trubuddy-node-operators" target="_blank">
              <InfoArea
                title="Be An IPFS Chainlink Operator"
                description={() => <>As an IPFS Chainlink Node Operator you influence the decentralization of information. <br/> In return for that you will earn rewards. <br/> <br/> Click to read more</>}
                icon={Storage}
                iconColor="primary"
                vertical
              />
            </a>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
