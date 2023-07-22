import { Box, Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const ErrorGoBack = ({ error, goBackHandler }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <Typography variant="h5" align="center" gutterBottom color="darkmagenta">
      Something went wrong: {error.status}
    </Typography>
    <Button
      variant="outlined"
      startIcon={<ArrowBack />}
      onClick={goBackHandler}
      color="primary"
    >
      Go back
    </Button>
  </Box>
);

export default ErrorGoBack;
