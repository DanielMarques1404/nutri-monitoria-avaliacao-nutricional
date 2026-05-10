import type { IQuizAttempt } from "../../domain/entities/entities";

type AttemptAction =
  | {
      type: "INIT";
      payload: {
        quizId: number;
        quizVersion: number;
      };
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
    };

export function createEmptyAttempt(
  quizId: number,
  quizVersion: number,
): IQuizAttempt {
  return {
    quizId,
    quizVersion,
    answersByQuestionId: {},
  };
}

export const quizAttemptReducer = (
  state: IQuizAttempt,
  action: AttemptAction,
): IQuizAttempt => {
  switch (action.type) {
    case "INIT":
      return createEmptyAttempt(
        action.payload.quizId,
        action.payload.quizVersion,
      );

    case "SELECT_OPTION":
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
          },
        },
      };

    default:
      return state;
  }
};
