import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QuestionnaireProvider } from "./app/context/QuestionnaireContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuestionnaireProvider>
      <App />
    </QuestionnaireProvider>
  </StrictMode>,
);
