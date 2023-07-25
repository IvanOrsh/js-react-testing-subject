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
    backgroundColor: "rgba(0,0,0,0.575)",
    backgroundBlendMode: "darken",
  },

  cardContent: {
    color: theme.palette.mode === "light" ? "#fff" : "invert(1)",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  cardContentRoot: {
    position: "relative",
    backgroundColor: "transparent",
  },
}));
