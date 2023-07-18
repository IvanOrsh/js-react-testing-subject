import {
  AppBar,
  Toolbar,
  // Drawer,
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

import useStyles from "./styles";

const NavBar = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const isAuthenticated = true; // dummy

  return (
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
            onClick={() => {
              // placeholder
            }}
          >
            <Menu />
          </IconButton>
        )}
        <IconButton
          color="inherit"
          sx={{ ml: 1 }}
          onClick={() => {
            // placeholder
          }}
        >
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        {!isMobile && "Search..."}
        <div>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={() => {}}>
              Login &nbsp; <AccountCircle />
            </Button>
          ) : (
            <Button
              className={classes.linkButton}
              color="inherit"
              LinkComponent={Link}
              to="profile/:id"
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
        {isMobile && "Search..."}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
