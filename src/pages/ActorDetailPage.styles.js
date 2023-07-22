import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  containerSpaceAround: {
    display: "flex",
    alignItems: "start",
    justifyContent: "space-around",
    margin: "px 0 !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },

  poster: {
    margin: "0 auto",
    borderRadius: "20px",
    boxShadow: "0.5em 1em 1em rgb(64, 64, 70)",
    marginBottom: "2rem",
    maxHeight: "600px",

    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      height: "50%",
    },
  },

  links: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 1rem",
    },
  },

  castImage: {
    width: "100%",
    maxWidth: "7em",
    objectFit: "cover",
    borderRadius: "10px",
  },

  buttonsContainer: {
    marginTop: "2rem",
    display: "flex",
    width: "100%",
    wrap: "wrap",
    justifyContent: "center",
  },
}));
