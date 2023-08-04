import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";

import ToggleColorModeProvider from "./utils/ToggleColorMode";
import router from "./routes";
import store from "./app/store";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ToggleColorModeProvider>
  </Provider>,
);
