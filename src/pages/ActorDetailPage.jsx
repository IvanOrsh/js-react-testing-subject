import { useParams, Link } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import { ExpandableText, MovieList } from "../components";
import { useGetActorQuery, useGetMoviesByActorQuery } from "../services/TMDB";
import useStyle from "./ActorDetailPage.styles";

const ActorDetailPage = () => {
  const { id } = useParams();
  const { classes } = useStyle();
  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: moviesData, isFetching: isMoviesDataFetching } =
    useGetMoviesByActorQuery(id);

  if (isFetching && isMoviesDataFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );
  }

  return (
    <>
      <Grid container className={classes.containerSpaceAround}>
        {/* Actor Picture */}
        <Grid item container sm={12} lg={6}>
          <img
            className={classes.poster}
            src={
              data?.profile_path
                ? `https://image.tmdb.org/t/p/w500${data.profile_path}`
                : "http://via.placeholder.com/200x300"
            }
            alt={data?.name}
          />
        </Grid>

        {/* Actor Info, Table maybe? */}
        <Grid item container direction="column" lg={6}>
          <Typography variant="h3" align="left" gutterBottom>
            {data?.name}
          </Typography>
          <Box marginBottom="2rem">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Born</TableCell>
                    <TableCell>Died</TableCell>
                    <TableCell>Place of Birth</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Popularity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{data?.birthday}</TableCell>
                    <TableCell>
                      {data?.deathday ? data?.deathday : "no"}
                    </TableCell>
                    <TableCell>{data?.place_of_birth}</TableCell>
                    <TableCell>
                      {data?.gender === "1" ? "female" : "male"}
                    </TableCell>
                    <TableCell>{data?.popularity}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Biography  */}
          <ExpandableText>{data?.biography}</ExpandableText>
        </Grid>
      </Grid>

      {/* Buttons TODO: refactor */}
      <Box className={classes.buttonsContainer}>
        <Button
          variant="outlined"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/name/${data?.imdb_id}`}
        >
          IMDB
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
          >
            Back
          </Typography>
        </Button>
      </Box>

      {/* Movies with given Actor  */}
      <Box marginTop="5rem" width="100%">
        <Typography variant="h4" gutterBottom align="center">
          Movies
        </Typography>
        {moviesData ? (
          <MovieList movies={moviesData.cast} numberOfMovies={50} />
        ) : (
          <Box>Sorry, nothing was found</Box>
        )}
      </Box>
    </>
  );
};

export default ActorDetailPage;
