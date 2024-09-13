import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { RouterApp } from "./router";

import permissionsPolicy from "permissions-policy";

import "./common/styles/global.scss";

permissionsPolicy({
  features: {
    camera: ["self"],
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
  </StrictMode>
);
