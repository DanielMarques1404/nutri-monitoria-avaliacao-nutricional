import type { QuizQuestion } from "../../types/game";

export interface IQuestionRepository {
    list(): Promise<QuizQuestion | null>;
    insert(question: QuizQuestion): Promise<void>
}