import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  appVid: {
    overflow: "scroll",
    position: "relative",
    height: "600px",
    width: "100%",
    maxWidth: "500px",
    scrollSnapType: "y mandatory",
    borderRadius: "20px",
    msOverflowStyle: "none",
  },
  app: {
    borderRadius: "30px",
    height: "100vh",
    backgroundColor: "black",
    display: "grid",
    placeItems: "center",
  },
});
