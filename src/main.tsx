import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./ASST/CSS/index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { dynaStore } from "./RDUX/dynamanContext/dynaStore.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={dynaStore}>
      <App />
    </Provider>
  </StrictMode>
);
