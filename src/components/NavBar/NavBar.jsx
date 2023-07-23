import { useEffect, useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "../SideBar/SideBar";
import Search from "../Search/Search";

import { ColorModeContext } from "../../utils/ToggleColorMode";
import { setUser, userSelector } from "../../features/auth";
import { fetchToken, createSessionId, moviesApi } from "../../utils";

import useStyles from "./styles";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();

  // TODO: move auth logic from component!
  const { isAuthenticated, user } = useSelector(userSelector);
  const dispatch = useDispatch();

  const { toggleColorMode } = useContext(ColorModeContext);

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const logInUser = async () => {
      let userData;

      if (token && sessionIdFromLocalStorage) {
        const { data } = await moviesApi.get(
          `/account?session_id=${sessionIdFromLocalStorage}`,
        );
        userData = data;
      } else if (token) {
        const sessionId = await createSessionId();
        const { data } = await moviesApi.get(
          `/account?session_id=${sessionId}`,
        );
        userData = data;
      }

      dispatch(setUser(userData));
    };

    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              className={classes.menuButton}
              color="inherit"
              edge="start"
              style={{
                outline: "none",
              }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <Menu />
            </IconButton>
          )}
          {/* Theme Switcher */}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={toggleColorMode}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                className={classes.linkButton}
                color="inherit"
                LinkComponent={Link}
                to={`profile/${user.id}`}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1056&q=80"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              s
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
