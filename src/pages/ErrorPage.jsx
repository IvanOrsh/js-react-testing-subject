import { makeStyles } from "tss-react/mui";
import { NavBar } from "../components";

const useStyles = makeStyles()(() => ({
  root: {
    display: "flex",
    height: "100%",
  },
  toolbar: {
    height: "70px",
  },
  content: {
    flexGrow: "1",
    padding: "2em",
  },
}));

const ErrorPage = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        Error Page
      </main>
    </div>
  );
};

export default ErrorPage;
