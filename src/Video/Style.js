import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  video: {
    // border: "3px solid red",
    // backgroundColor: "white",
    position: "relative",
    width: "100%",
    height: "100%",
    scrollSnapAlign: "start",
  },
  videoCard: {
    objectFit: "fill",
    width: "100%",
    height: "100%",
  },
});
