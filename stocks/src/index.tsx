import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// You can import a global CSS file here if you want to add styles
// import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
