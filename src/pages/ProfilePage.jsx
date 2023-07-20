import { useSelector } from "react-redux";
import { Typography, Button, Box } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

import { userSelector } from "../features/auth";

const ProfilePage = () => {
  const { user } = useSelector(userSelector);
  const favoriteMovies = [];

  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          {user.username}&#39;s Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies.length ? (
        <Typography variant="h5">
          Add some movies to favorites or watchlist to see them here!
        </Typography>
      ) : (
        <Box>FAVORITE MOVIES</Box>
      )}
    </Box>
  );
};

export default ProfilePage;
