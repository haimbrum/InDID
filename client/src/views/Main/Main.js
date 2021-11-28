import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import FeaturesSection from "./FeaturesSection";
import ArchitectureImage from 'assets/img/architecture.png'
import Button from "components/CustomButtons/Button.js";
import { LibraryBooks } from "@material-ui/icons";
// import Network from 'assets/img/network.png'

const useStyles = makeStyles(styles);


export default function Main(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="TruBuddy"
        rightLinks={<HeaderLinks />}
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax >
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                {/* <img className={classes.mainImage} src={Network} width="750px"/> */}
                <h1 className={classes.title}>
                  Decentralized Trust Based Network
                </h1>
                <h3 className={classes.subtitle}>
                  TruBuddy is a platform with the aim to bridge between blockchain contracts and off-chain entities and to decentralize the information regarding those entities.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classes.container}>
        <FeaturesSection />
      </div>
      <div className={classes.section}>
        <div className={classes.container}>

          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <img src={ArchitectureImage} width="100%" />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h2 className={classes.sectionTitle}>Overview</h2>
              <div className={classes.sectionDescription}>

                <h4 >
                  TruBuddy is implemented as a DAO (Decentralized Autonomous Organization) which allow to stakers (validators) to verify off-chain entities and store the entities documents over IPFS protocol using Chainlink oracles.
                </h4>
                <h4>
                  TruBuddy validators functioning as DAO stakers. Each time an entity requires verification, validators are chosen at random based on a rating to verify that entity.
                </h4>
                <Button
                  href="https://docs.trubdy.net/"
                  target="_blank"
                  color="primary"
                  className={classes.navLink}
                >
                  <LibraryBooks /> Docs
                </Button>
              </div>

            </GridItem>
          </GridContainer>
        </div>
      </div>

      <Footer />
    </div>
  );
}
