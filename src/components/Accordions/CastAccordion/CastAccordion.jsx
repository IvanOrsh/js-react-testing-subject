import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import useStyles from "./styles";

const CastAccordion = ({ title, cast, margin = false }) => {
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
        <Grid item container spacing={2}>
          {cast.map((actor) => (
            <Grid
              item
              container
              key={actor.credit_id}
              xs={4}
              md={2}
              lg={1}
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
                {actor?.character ? actor.character.split("/")[0] : actor.job}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CastAccordion;
