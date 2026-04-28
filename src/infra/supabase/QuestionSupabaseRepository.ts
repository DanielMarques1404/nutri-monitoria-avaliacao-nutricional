import type { IQuestion } from "../../domain/entities/entities";
import type { IQuestionRepository } from "../../domain/repositories/IQuestionRepository";
import { supabase } from "./config";

export class QuestionSupabaseRepository implements IQuestionRepository {
  async list(): Promise<IQuestion[] | null> {
    const { data, error } = await supabase.from("Questions").select("*");

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;
    const questions: IQuestion[] = data.map((question) => ({
      id: question.id,
      title: question.title,
      statement: question.statement,
      question: question.question,
      options: [],
      correctOptionId: question.correctOptionId || 0,
      explanation: question.explanation || "",
      categoryId: question.categoryId || 0,
      difficulty: question.difficulty || "",
      tags: [],
      summaryImage: question.summaryImage || "",
    }));

    return questions.sort((a: any, b: any) =>
      a.title.localeCompare(b.title),
    ) as IQuestion[];
  }

  createOrUpdate(question: IQuestion): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
