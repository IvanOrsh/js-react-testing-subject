import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  moviesContainer: {
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
    overflow: "auto",
    "&::after": {
      content: '""',
      flex: "auto",
    },
    [theme.breakpoints.down("md")]: {
      justifyContent: "start",
      alignItems: "center",
      flexDirection: "column",
    },
  },
}));
