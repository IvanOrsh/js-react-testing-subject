import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  moviesContainer: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    overflow: "auto",
    [theme.breakpoints.down("lg")]: {
      justifyContent: "space-between",
      alignItems: "center",
    },
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-around",
      alignItems: "center",
    },
  },
}));
