import { useNavigate } from "react-router-dom";
import {
  Grow,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import useStyles from "./styles";

const Movie = ({ movie, i }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Grow style={{ borderRadius: "5px" }} in key={i} timeout={(i + 1) * 250}>
      <Card onClick={() => navigate(`/movie/${movie.id}`)}>
        <CardActionArea className={classes.root}>
          <CardMedia
            component="img"
            alt={movie.original_title}
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "http://via.placeholder.com/200x300"
            }
            title={movie.original_title}
            className={classes.media}
          />
          <CardContent className={classes.infoContainer}>
            <Typography className={classes.title} variant="h6" component="h2">
              {movie.title}
            </Typography>
            <Typography variant="body2" className={classes.info}>
              Original Language: {movie.original_language}
            </Typography>
            <Typography variant="body2" className={classes.info}>
              Release Date: {new Date(movie.release_date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" className={classes.info}>
              Vote Average: {movie.vote_average}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grow>
  );
};

export default Movie;
