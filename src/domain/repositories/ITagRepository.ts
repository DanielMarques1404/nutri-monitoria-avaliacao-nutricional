import type { QuizTag } from "../../types/game";

export interface ITagRepository {
    list(): Promise<QuizTag[] | null>;
    create(tag: QuizTag): Promise<void>
}