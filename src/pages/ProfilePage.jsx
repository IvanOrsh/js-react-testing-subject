import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Button, Box, CircularProgress } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

import { userSelector } from "../features/auth";
import { useGetListQuery } from "../services/TMDB";
import { ErrorGoBack, RatedCards } from "../components";
import { logout } from "../hooks/useAuth";

const ProfilePage = () => {
  const { user } = useSelector(userSelector);
  const navigate = useNavigate();

  const {
    data: favoriteMovies,
    isFetching: isFavoriteMoviesFetching,
    refetch: refetchFavoriteMovies,
    error: favoriteMoviesError,
  } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    page: 1,
  });
  const {
    data: watchlistMovies,
    isFetching: isWatchlistMoviesFetching,
    refetch: refetchWatchlistMovies,
    error: watchlistError,
  } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    page: 1,
  });

  useEffect(() => {
    refetchFavoriteMovies();
    refetchWatchlistMovies();
  }, []);

  if (isFavoriteMoviesFetching && isWatchlistMoviesFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (favoriteMoviesError || watchlistError) {
    const error = favoriteMovies || watchlistError;
    return <ErrorGoBack error={error} goBackHandler={() => navigate(-1)} />;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>
          {user.username}&#39;s Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results.length ? (
        <Typography variant="h5">
          Add some movies to favorites or watchlist to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies.results} />
        </Box>
      )}
      {watchlistMovies?.results.length ? (
        <Box>
          <RatedCards title="Watchlist" data={watchlistMovies.results} />
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ProfilePage;
