import { useEffect, useMemo, useReducer, useState } from "react";
import {
  createEmptyAttempt,
  quizAttemptReducer,
} from "./app/context/QuizAttemptReducer";
import {
  useActiveQuestionnaires,
  useQuestionnaire,
} from "./app/hooks/useCurrentQuestionnaire";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import Modal from "./components/layout/Modal";
import { NavButtons } from "./components/NavButtons";
import { QuestionForm } from "./components/QuestionForm";
import { Summary } from "./components/Summary";
import type { IQuestionnaire, IQuizAttempt } from "./domain/entities/entities";
import { getAttemptStorageKey } from "./utils/data";

const SELECTED_QUESTIONNAIRE_STORAGE_KEY = "selected-questionnaire-id";

const getInitialSelectedQuestionnaireId = () => {
  const savedQuestionnaireId = localStorage.getItem(
    SELECTED_QUESTIONNAIRE_STORAGE_KEY,
  );

  if (!savedQuestionnaireId) return null;

  const parsedQuestionnaireId = Number(savedQuestionnaireId);

  return Number.isNaN(parsedQuestionnaireId) ? null : parsedQuestionnaireId;
};

export default function App() {
  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState<
    number | null
  >(getInitialSelectedQuestionnaireId);
  const { data } = useQuestionnaire(selectedQuestionnaireId);
  const { data: activeQuestionnaires } = useActiveQuestionnaires();
  const [quiz, setQuiz] = useState<IQuestionnaire | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attemptStorageVersion, setAttemptStorageVersion] = useState(0);

  const [attempt, dispatch] = useReducer(
    quizAttemptReducer,
    createEmptyAttempt(0, 0),
  );

  useEffect(() => {
    setQuiz(data ?? null);
  }, [data]);

  useEffect(() => {
    if (!selectedQuestionnaireId || !activeQuestionnaires) return;

    const selectedQuestionnaireIsActive = activeQuestionnaires.some(
      (questionnaire) => questionnaire.id === selectedQuestionnaireId,
    );

    if (selectedQuestionnaireIsActive) return;

    localStorage.removeItem(SELECTED_QUESTIONNAIRE_STORAGE_KEY);
    setSelectedQuestionnaireId(null);
    setQuiz(null);
    setCurrentQuestionIndex(-1);
  }, [activeQuestionnaires, selectedQuestionnaireId]);

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

    const storageKey = getAttemptStorageKey(attempt.questionnaireId);

    if (Object.keys(attempt.answersByQuestionId).length === 0) {
      localStorage.removeItem(storageKey);
      return;
    }

    localStorage.setItem(
      storageKey,
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
    if (!quiz) return;

    setCurrentQuestionIndex(0);
  };

  const handleSelectQuestionnaire = (questionnaire: IQuestionnaire) => {
    localStorage.setItem(
      SELECTED_QUESTIONNAIRE_STORAGE_KEY,
      String(questionnaire.id),
    );
    setSelectedQuestionnaireId(questionnaire.id);
    setCurrentQuestionIndex(-1);
  };

  const handleResetQuestionnaireAttempt = (questionnaireId: number) => {
    localStorage.removeItem(getAttemptStorageKey(questionnaireId));
    setAttemptStorageVersion((version) => version + 1);

    if (quiz?.id !== questionnaireId) return;

    dispatch({
      type: "INIT",
      payload: {
        questionnaireId: quiz.id,
        quizVersion: 0, //quiz.version,
      },
    });
    setCurrentQuestionIndex(-1);
    setIsModalOpen(false);
  };

  const handleSelectOption = (questionId: number, optionId: number) => {
    if (attempt.answersByQuestionId[questionId]?.isAnswerRevealed) return;

    dispatch({
      type: "SELECT_OPTION",
      questionId,
      optionId,
    });
  };

  const handleRevealAnswer = () => {
    if (!currentQuestion) return;

    const selectedOption = currentQuestion.options?.find(
      (option) => option.id === attemptForCurrentQuestion?.selectedOptionId,
    );
    const result = !selectedOption
      ? "revealed_without_answer"
      : selectedOption.option === currentQuestion.correctOption
        ? "correct"
        : "incorrect";

    dispatch({
      type: "SET_REVEAL",
      questionId: currentQuestion.id,
      value: true,
      result,
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

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header questionnaireName={currentQuestionIndex > -1 ? quiz?.name : undefined} showBackButton={currentQuestionIndex !== -1 && !!quiz} />

      {currentQuestionIndex === -1 || !quiz ? (
        <Intro
          start={handleStart}
          questionnaires={activeQuestionnaires ?? []}
          selectedQuestionnaireId={selectedQuestionnaireId}
          attemptStorageVersion={attemptStorageVersion}
          onSelectQuestionnaire={handleSelectQuestionnaire}
          onResetQuestionnaireAttempt={handleResetQuestionnaireAttempt}
          canStart={!!quiz}
        />
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
