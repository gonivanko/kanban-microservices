import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./providers/AuthProvider";
import Routes from "./routing/Routes";
import "./styles/App.scss";
import ReduxProvider from "./providers/ReduxProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReduxProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ReduxProvider>
  </React.StrictMode>
);

reportWebVitals();
