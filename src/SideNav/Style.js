import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  Sidebar: { position: "absolute", top: "50%", right: "15px", color: "#fff" },
  iconSidebar: { padding: "30% 0 0 0", textAlign: "center", fontSize: "large" },
  dialogComment: {
    width: "35%",
    padding: "10% 0% 0% 33%",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      // height: "400px",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },
}));
