import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  footer: {
    display: "flex",
    color: "white",
    position: "relative",
    bottom: "79px",
    paddingLeft: "10px",
  },
  footerText: {
    paddingLeft: "3%",
    flex: 1,
    "& p": {
      paddingBottom: "12px",
      paddingTop: "5px",
      fontSize: "14px",
    },
  },
  iconMusic: {
    position: "absolute",
  },
  imageFooter: {
    animation: "$spinnerRecorder infinite 5s linear",
    filter: "invert(1)",
    height: "50px",
    position: "absolute",
    bottom: "0",
    right: "0",
  },
  "@keyframes spinnerRecorder": {
    "from ": {
      transform: "rotate(0deg)",
    },
    "to ": {
      transform: "rotate(360deg)",
    },
  },
  sliderText: {
    "& p": {
      paddingTop: "auto",
      fontSize: "12px",
    },
    "& .ticker": {
      height: "fir-content",
      marginLeft: "30px",
      width: "80%",
    },
  },
});
