import {
  Typography,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MovieList from "../../MovieList/MovieList";
import useStyles from "./styles";

const MoviesAccordion = ({ title, movies, margin = false }) => {
  const { classes } = useStyles();
  const containerStyles = margin
    ? [classes.container, classes.marginTop]
    : classes.container;
  return (
    <Accordion className={containerStyles}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5" gutterBottom align="left">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {movies ? (
          <MovieList movies={movies} numberOfMovies={20} />
        ) : (
          <Box>Sorry, nothing was found</Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default MoviesAccordion;
