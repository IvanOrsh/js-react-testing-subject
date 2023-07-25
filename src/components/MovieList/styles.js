import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  moviesContainer: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      justifyContent: "start",
      alignItems: "center",
      flexDirection: "column",
    },
  },
}));
