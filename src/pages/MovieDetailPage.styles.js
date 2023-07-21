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

  genresContainer: {
    margin: "10px 0 !important",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },

  genreImage: {
    filter: theme.palette.mode === "dark" && "invert(1)",
    marginRight: "10px",
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
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  videos: {
    width: "50%",
    height: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "90%",
    },
  },
}));
