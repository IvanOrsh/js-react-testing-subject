import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import router from "./routes";
import store from "./app/store";
import "./index.css";

const theme = createTheme({});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>,
);
