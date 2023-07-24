import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  ExpandableText,
  MovieList,
  ErrorGoBack,
  Pagination,
} from "../components";
import {
  useGetActorQuery,
  useGetMoviesByActorQuery,
  useGetMoviesByActorAltQuery,
} from "../services/TMDB";
import Movie from "../components/MovieList/Movie/Movie";
import useStyle from "./ActorDetailPage.styles";

const ActorDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { classes } = useStyle();

  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: moviesData, isFetching: isMoviesDataFetching } =
    useGetMoviesByActorQuery({ actorId: id, page });

  // needs additional research - weird behavior! DANGER
  const { data: moviesDataAlt, isFetching: isMoviesDataAltFetching } =
    useGetMoviesByActorAltQuery(id);

  if (isFetching && isMoviesDataFetching && isMoviesDataAltFetching) {
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
      <Grid spacing={2} container className={classes.containerSpaceAround}>
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
                <TableBody>
                  <TableRow>
                    <TableCell>Born</TableCell>
                    <TableCell>{data?.birthday}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Died</TableCell>
                    <TableCell>
                      {data?.deathday ? data?.deathday : "no"}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Place of Birth</TableCell>
                    <TableCell>{data?.place_of_birth}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell>
                      {data?.gender === "1" ? "female" : "male"}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Popularity</TableCell>
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
            onClick={() => navigate(-1)}
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
          <MovieList movies={moviesData.results} numberOfMovies={20} />
        ) : (
          <Box>Sorry, nothing was found</Box>
        )}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={moviesData?.total_pages}
        />
      </Box>

      {/* Movies with given Actor - Alt  */}
      {/* This one MUST be hidden!!!! */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" gutterBottom align="center">
            Alternative search - DANGER!
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexWrap="wrap">
            {moviesDataAlt ? (
              moviesDataAlt.cast.map((movie, i) => (
                <Movie key={movie.id} movie={movie} i={i} />
              ))
            ) : (
              <Box>Sorry, nothing was found</Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ActorDetailPage;
