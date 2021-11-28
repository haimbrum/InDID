import { container } from "assets/jss/material-kit-react.js";

const componentsStyle = {
  container,
  section: {
    padding: "100px 0",
  },
  brand: {
    color: "#FFFFFF",
    textAlign: "left",
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",
    width: "54%",
    lineHeight: 1,
    margin: "17px 0",
  },
  sectionTitle: {
    color: "#09c3ab",
    fontFamily: "Roboto Slab",
    fontWeight: 700,
  },
  sectionDescription: {
    color: "#e0e0e0",
    '& > h4': {
      lineHeight: "1.55em",
      margin: "40px 0",
    },
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  link: {
    textDecoration: "none",
  },
  textCenter: {
    textAlign: "center",
  },
  mainImage: {
    position: "absolute",
  },
};

export default componentsStyle;
