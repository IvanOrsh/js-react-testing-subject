import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

import useStyles from "./styles";

const FeaturedMovie = ({ movie }) => {
  const { classes } = useStyles();

  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`/movie/${movie.id}`}
      className={classes.featuredCardContainer}
    >
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          className={classes.cardMedia}
          media="picture"
          alt={movie.original_title}
          image={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`
              : "http://via.placeholder.com/200x300"
          }
          title={movie.original_title}
        />
        <Box padding="20px">
          <CardContent
            className={classes.cardContent}
            classes={{ root: classes.cardContentRoot }}
          >
            <Typography variant="h5" className={classes.title} gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2" className={classes.info}>
              Release Date: {new Date(movie.release_date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" className={classes.info}>
              Vote Average: {movie.vote_average}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
