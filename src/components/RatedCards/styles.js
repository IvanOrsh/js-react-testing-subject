import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));
