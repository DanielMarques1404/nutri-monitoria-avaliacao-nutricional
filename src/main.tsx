import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QuestionnaireProvider } from "./app/context/QuestionnaireContext.tsx";
import "./index.css";
import { router } from "./routers/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuestionnaireProvider>
      <RouterProvider router={router} />
    </QuestionnaireProvider>
  </StrictMode>,
);
