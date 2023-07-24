import { useRef } from "react";
import { Outlet } from "react-router-dom";

import { makeStyles } from "tss-react/mui";

import { NavBar } from "../components";
import useAlan from "../hooks/useAlan";

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
    maxWidth: "1450px",
    margin: "0 auto",
  },
}));

const Layout = () => {
  const { classes } = useStyles();
  const alanBtnContainer = useRef();
  useAlan();
  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Outlet />
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
};

export default Layout;
