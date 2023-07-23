import { useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  Rating,
  Modal,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from "../services/TMDB";
import useMovieInteraction from "../hooks/useMovieInteraction";
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";
import { MovieList, ErrorGoBack } from "../components";
import genreIcons from "../assets/genres";
import useStyles from "./MovieDetailPage.styles";
import { userSelector } from "../features/auth";

const MovieDetailPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { id } = useParams();

  const navigate = useNavigate();

  const { classes } = useStyles();

  // modal trailer
  const [open, setOpen] = useState(false);

  // movies, recommendations, favorites & watch list
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery(id);
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    page: 1,
  });

  const {
    isMovieFavorited,
    isMovieWatchlisted,
    addToFavorites,
    addToWatchlist,
  } = useMovieInteraction(user, id, favoriteMovies, watchlistMovies);

  if (isFetching && isRecommendationsFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return <ErrorGoBack error={error} goBackHandler={() => navigate(-1)} />;
  }

  return (
    <>
      <Grid container className={classes.containerSpaceAround}>
        {/* Movie Poster */}
        <Grid item container sm={12} lg={6}>
          <img
            className={classes.poster}
            src={
              data?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
                : "http://via.placeholder.com/200x300"
            }
            alt={data?.title}
          />
        </Grid>

        {/* Movie Info */}
        <Grid item container direction="column" lg={6}>
          <Typography variant="h4" align="center" gutterBottom>
            {data?.title} ({data?.release_date.split("-")[0]})
          </Typography>
          <Typography
            color="textSecondary"
            variant="h5"
            align="center"
            gutterBottom
          >
            {data?.tagline}
          </Typography>

          {/* Rating, Runtime, Language */}
          <Grid item container className={classes.containerSpaceAround}>
            <Box display="flex" justifyContent="center">
              <Rating
                readOnly
                value={
                  data?.vote_average
                    ? parseFloat(data.vote_average) / 2
                    : "none"
                }
              />
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ marginLeft: "10px " }}
              >
                {data?.vote_average} / 10
              </Typography>
            </Box>
            <Typography variant="h6" align="center">
              {data?.runtime}min{" "}
              {data?.spoken_languages.length > 0
                ? `/ ${data.spoken_languages[0].name}`
                : ""}
            </Typography>
          </Grid>

          {/* Movie Genres: */}
          <Grid item container className={classes.genresContainer}>
            {data?.genres?.map((genre) => (
              <Link
                key={genre.name}
                className={classes.links}
                to="/"
                onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              >
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                />
                <Typography color="textPrimary" variant="subtitle1">
                  {genre?.name}
                </Typography>
              </Link>
            ))}
          </Grid>

          {/* Movie Overview  */}

          <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
            Overview
          </Typography>
          <Typography style={{ marginBlock: "1rem " }}>
            {data?.overview}
          </Typography>

          {/* Movie Cast */}
          <Typography variant="h5" gutterBottom>
            Top Cast{" "}
          </Typography>
          <Grid item container spacing={2}>
            {data &&
              data.credits?.cast?.slice(0, 12).map((actor) => (
                <Grid
                  item
                  container
                  key={actor.id}
                  xs={4}
                  md={2}
                  component={Link}
                  to={`/actors/${actor.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    className={classes.castImage}
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                        : "http://via.placeholder.com/200x300"
                    }
                    alt={actor.name}
                  />
                  <Typography color="textPrimary">{actor?.name}</Typography>
                  <Typography color="textSecondary">
                    {actor?.character.split("/")[0]}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Buttons TODO: refactor */}
      <Box className={classes.buttonsContainer}>
        <Button
          variant="outlined"
          target="_blank"
          rel="noopener noreferrer"
          href={data?.homepage}
          endIcon={<Language />}
        >
          Website
        </Button>
        <Button
          variant="outlined"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${data?.imdb_id}`}
          endIcon={<MovieIcon />}
        >
          IMDB
        </Button>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          href="#"
          endIcon={<Theaters />}
        >
          Trailer
        </Button>

        <Button
          variant="outlined"
          onClick={addToFavorites}
          endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}
        >
          {isMovieFavorited ? "Unfavorite" : "Favorite"}
        </Button>
        <Button
          variant="outlined"
          onClick={addToWatchlist}
          endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
        >
          Watchlist
        </Button>
        <Button
          variant="outlined"
          endIcon={<ArrowBack />}
          sx={{ borderColor: "primary.main" }}
        >
          <Typography
            component={Link}
            to="/"
            color="inherit"
            variant="subtitle2"
            style={{ textDecoration: "none" }}
            onClick={() => navigate(-1)}
          >
            Back
          </Typography>
        </Button>
      </Box>

      {/* Recommendations */}
      <Box marginTop="5rem" width="100%">
        <Typography variant="h4" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations.results} numberOfMovies={20} />
        ) : (
          <Box>Sorry, nothing was found</Box>
        )}
      </Box>

      {/* Trailer Modal */}
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results && (
          <iframe
            autoPlay
            className={classes.videos}
            frameBorder="0"
            title="Trailer"
            src={
              data.videos.results.length > 0
                ? `https://www.youtube.com/embed/${data.videos.results[0].key}`
                : "https://www.youtube.com"
            }
            allow="autoplay"
          />
        )}
      </Modal>
    </>
  );
};

export default MovieDetailPage;
