import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  root: {
    width: "300px",
    position: "relative",
    transition: "transform 0.4s",
    marginBottom: "10px",
    "&:hover": {
      transform: "scale(1.05)",
    },

    [theme.breakpoints.down("md")]: {
      width: "260px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "240px",
    },
  },
  media: {
    height: "360px",
    transition: "transform 0.4s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  infoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "rgba(0, 0, 0, 0.8)",
    color:
      theme.palette.mode === "dark"
        ? theme.palette.secondary
        : theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    transition: "transform 0.4s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  info: {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.secondary.main
        : theme.palette.common.white,
  },

  title: {
    color:
      theme.palette.mode === "light"
        ? theme.palette.primary.light
        : "invert(1)",
    textOverflow: "ellipsis",
    width: "230px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    marginTop: "10px",
    marginBottom: "5px",
    textAlign: "left",
  },
}));
