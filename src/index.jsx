import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
// import { Provider } from "react-redux";

import router from "./routes";
// import store from "./app/store";

const theme = createTheme({});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
    {/* </Provider> */}
  </React.StrictMode>,
);
