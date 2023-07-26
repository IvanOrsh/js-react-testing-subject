import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  featuredCardContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    textDecoration: "none",
    height: "490px",
  },

  card: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },

  cardRoot: {
    position: "relative",
  },

  cardMedia: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "100%",
    transition: "transform 0.4s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  cardContent: {
    color: theme.palette.mode === "light" ? "#fff" : "invert(1)",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    transition: "transform 0.4s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  cardContentRoot: {
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.75)",
    backgroundBlendMode: "darken",
  },

  title: {
    color:
      theme.palette.mode === "light"
        ? theme.palette.primary.light
        : "invert(1)",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    marginTop: "10px",
    marginBottom: "5px",
    textAlign: "left",
  },

  info: {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.secondary.main
        : theme.palette.common.white,
  },
}));
