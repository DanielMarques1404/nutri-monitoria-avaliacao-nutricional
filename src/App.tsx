import { useEffect, useMemo, useReducer, useState } from "react";
import {
  createEmptyAttempt,
  quizAttemptReducer,
} from "./app/context/QuizAttemptReducer";
import { useCurrentQuestionnaire } from "./app/hooks/useCurrentQuestionnaire";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import Modal from "./components/layout/Modal";
import { NavButtons } from "./components/NavButtons";
import { QuestionForm } from "./components/QuestionForm";
import { Summary } from "./components/Summary";
import type { IQuestionnaire, IQuizAttempt } from "./domain/entities/entities";

const getAttemptStorageKey = (questionnaireId: number) =>
  `quiz-attempt:${questionnaireId}`;

export default function App() {
  const { data } = useCurrentQuestionnaire();
  const [quiz, setQuiz] = useState<IQuestionnaire | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [attempt, dispatch] = useReducer(
    quizAttemptReducer,
    createEmptyAttempt(0, 0),
  );

  useEffect(() => {
    if (data) setQuiz(data);
  }, [data]);

  useEffect(() => {
    if (!quiz) return;

    const storageKey = getAttemptStorageKey(quiz.id);
    const savedAttempt = localStorage.getItem(storageKey);

    if (savedAttempt) {
      try {
        const parsedAttempt = JSON.parse(savedAttempt) as IQuizAttempt;

        if (
          parsedAttempt.questionnaireId === quiz.id &&
          parsedAttempt.quizVersion === 0
        ) {
          dispatch({
            type: "HYDRATE",
            payload: parsedAttempt,
          });
          return;
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    dispatch({
      type: "INIT",
      payload: {
        questionnaireId: quiz.id,
        quizVersion: 0, //quiz.version,
      },
    });
  }, [quiz]);

  useEffect(() => {
    if (attempt.questionnaireId <= 0) return;

    localStorage.setItem(
      getAttemptStorageKey(attempt.questionnaireId),
      JSON.stringify(attempt),
    );
  }, [attempt]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

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

    setIsModalOpen(true);
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
      <Header questionnaireName={quiz.name} />

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
      {isModalOpen && currentQuestion && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Summary
            handleClose={() => setIsModalOpen(false)}
            question={currentQuestion}
            kind={
              !attemptForCurrentQuestion?.selectedOptionId
                ? "abstention"
                : currentQuestion.options?.find(
                      (o) =>
                        o.id === attemptForCurrentQuestion.selectedOptionId,
                    )?.option === currentQuestion.correctOption
                  ? "success"
                  : "error"
            }
          />
        </Modal>
      )}
    </div>
  );
}
