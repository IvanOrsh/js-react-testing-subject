import { makeStyles } from "tss-react/mui";

const drawerWidth = 240;

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

  linkButton: {
    "&:hover": {
      color: "white !important",
      textDecoration: "none",
    },
  },

  drawer: {
    // not mobile:
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  drawerPaper: {
    width: drawerWidth,
  },
}));
