import type { IQuizAttempt } from "../../domain/entities/entities";

type AttemptAction =
  | {
      type: "INIT";
      payload: {
        questionnaireId: number;
        quizVersion: number;
      };
    }
  | {
      type: "HYDRATE";
      payload: IQuizAttempt;
    }
  | {
      type: "SELECT_OPTION";
      questionId: number;
      optionId: number;
    }
  | {
      type: "SET_REVEAL";
      questionId: number;
      value: boolean;
      result: "correct" | "incorrect" | "revealed_without_answer";
    };

export function createEmptyAttempt(
  questionnaireId: number,
  quizVersion: number,
): IQuizAttempt {
  return {
    questionnaireId,
    quizVersion,
    answersByQuestionId: {},
    optionOrderByQuestionId: {},
  };
}

export const quizAttemptReducer = (
  state: IQuizAttempt,
  action: AttemptAction,
): IQuizAttempt => {
  switch (action.type) {
    case "INIT":
      return createEmptyAttempt(
        action.payload.questionnaireId,
        action.payload.quizVersion,
      );

    case "HYDRATE":
      return action.payload;

    case "SELECT_OPTION":
      if (state.answersByQuestionId[action.questionId]?.isAnswerRevealed) {
        return state;
      }

      return {
        ...state,
        answersByQuestionId: {
          ...state.answersByQuestionId,
          [action.questionId]: {
            ...state.answersByQuestionId[action.questionId],
            selectedOptionId: action.optionId,
            isAnswerRevealed:
              state.answersByQuestionId[action.questionId]?.isAnswerRevealed ??
              false,
          },
        },
      };

    case "SET_REVEAL":
      return {
        ...state,
        answersByQuestionId: {
          ...state.answersByQuestionId,
          [action.questionId]: {
            ...state.answersByQuestionId[action.questionId],
            selectedOptionId:
              state.answersByQuestionId[action.questionId]?.selectedOptionId,
            isAnswerRevealed: action.value,
            result: action.result,
          },
        },
      };

    default:
      return state;
  }
};
