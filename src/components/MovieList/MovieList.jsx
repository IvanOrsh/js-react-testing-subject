import { Grid } from "@mui/material";

import Movie from "./Movie/Movie";
import useStyles from "./styles";

const MovieList = ({ movies, numberOfMovies }) => {
  const { classes } = useStyles();

  return (
    <Grid container className={classes.moviesContainer}>
      {movies?.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
