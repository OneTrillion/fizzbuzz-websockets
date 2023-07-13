import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";

if (!document.getElementById("root"))
  document.body.innerHTML = '<div id="root"></div>';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
