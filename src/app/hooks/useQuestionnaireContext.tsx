import { useContext } from "react";
import { QuestionnaireContext } from "../context/QuestionnaireContext";

export const useQuestionnaireContext = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error("Unavailable Questionnaire Context");
  }
  return context;
};
