import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QuestionnaireProvider } from "./app/context/QuestionnaireContext.tsx";
import "./index.css";
import { router } from "./routers/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <QuestionnaireProvider>
        <RouterProvider router={router} />
      </QuestionnaireProvider>
    </QueryClientProvider>
  </StrictMode>,
);
