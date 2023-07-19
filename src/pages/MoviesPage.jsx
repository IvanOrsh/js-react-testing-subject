import { Box, CircularProgress, Typography } from "@mui/material";

import { useGetMoviesQuery } from "../services/TMDB";
import { MovieList } from "../components";

const MoviesPage = () => {
  const { data, error, isFetching } = useGetMoviesQuery();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return "An error has occurred.";
  }

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default MoviesPage;
