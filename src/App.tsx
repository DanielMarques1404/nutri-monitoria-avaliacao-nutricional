import { useEffect, useMemo, useReducer, useState } from "react";
import {
  createEmptyAttempt,
  quizAttemptReducer,
} from "./app/context/QuizAttemptReducer";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import { NavButtons } from "./components/NavButtons";
import { QuestionForm } from "./components/QuestionForm";
import type { IQuestionnaire } from "./domain/entities/entities";
import { useCurrentQuestionnaire } from "./hooks/useCurrentQuestionnaire";

export default function App() {
  const { data } = useCurrentQuestionnaire();
  const [quiz, setQuiz] = useState<IQuestionnaire | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleOpen = () => setIsModalOpen(true);
  // const handleClose = () => setIsModalOpen(false);

  const [attempt, dispatch] = useReducer(
    quizAttemptReducer,
    createEmptyAttempt(0, 0),
  );

  useEffect(() => {
    if (data) setQuiz(data);
  }, [data]);

  useEffect(() => {
    if (!quiz) return;

    dispatch({
      type: "INIT",
      payload: {
        quizId: quiz.id,
        quizVersion: 0, //quiz.version,
      },
    });
  }, [quiz]);

  const currentQuestion = useMemo(() => {
    if (!quiz || currentQuestionIndex < 0) return null;
    return quiz.questions[currentQuestionIndex] ?? null;
  }, [quiz, currentQuestionIndex]);

  const attemptForCurrentQuestion = currentQuestion
    ? attempt.answersByQuestionId[currentQuestion.id]
    : undefined;

  const handleStart = () => {
    setCurrentQuestionIndex(0);
  };

  const handleSelectOption = (questionId: number, optionId: number) => {
    dispatch({
      type: "SELECT_OPTION",
      questionId,
      optionId,
    });
  };

  const handleRevealAnswer = () => {
    if (!currentQuestion) return;

    dispatch({
      type: "SET_REVEAL",
      questionId: currentQuestion.id,
      value: true,
    });
  };

  const handleNext = () => {
    if (!quiz) return;
    setCurrentQuestionIndex((prev) =>
      Math.min(prev + 1, quiz.questions.length - 1),
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  if (!quiz) return <div>Carregando...</div>;

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />

      {currentQuestionIndex === -1 ? (
        <Intro start={handleStart} />
      ) : (
        <>
          <QuestionForm
            question={currentQuestion}
            attemptForQuestion={attemptForCurrentQuestion}
            onSelectOption={handleSelectOption}
          />

          <NavButtons
            BOF={currentQuestionIndex <= 0}
            EOF={currentQuestionIndex >= quiz.questions.length - 1}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onRevealAnswer={handleRevealAnswer}
          />
        </>
      )}

      {/* <pre>{JSON.stringify(attempt, null, 2)}</pre> */}

      <Footer />
      {/* {isModalOpen && currentQuestion && (
        <Modal isOpen={isModalOpen}>
          <Summary
            handleClose={handleClose}
            question={currentQuestion}
            message={
              !currentUserAnswer
                ? "Ainda não respondida"
                : currentUserAnswer === currentQuestion.correctOptionId
                  ? "PARABÉNS"
                  : "Não foi dessa vez!"
            }
          />
        </Modal>
      )} */}
    </div>
  );
}
