import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  toolbar: {
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "240px",
    // mobile
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      flexWrap: "wrap",
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    // not mobile:
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));
