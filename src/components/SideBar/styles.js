import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  image: {
    width: "70%",
  },

  imageLink: {
    display: "flex",
    justifyContent: "center",
    padding: "10% 0",
  },

  links: {
    color: theme.palette.primary.m,
    textDecoration: "none",
  },

  genreImage: {
    filter: theme.palette.mode === "dark" ? "invert(1)" : "",
  },

  button: {
    color:
      theme.palette.mode === "dark" ? theme.palette.primary.light : "invert(1)",
  },
}));
