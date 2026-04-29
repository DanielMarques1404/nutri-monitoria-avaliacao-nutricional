import type { IQuestion } from "../../domain/entities/entities";
import type {
  IQuestionRepository,
} from "../../domain/repositories/IQuestionRepository";
import { supabase } from "./config";


export class QuestionSupabaseRepository implements IQuestionRepository {

  async list(): Promise<IQuestion[] | null> {
    const { data, error } = await supabase.from("Questions").select("*, QuestionTags(Tags(*)), QuestionOptions(*)");

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
      options: question.QuestionOptions?.map(qo => ({
        id: qo.id,
        questionId: qo.questionId,
        description: qo.description,
      })) || [],
      correctOptionId: question.correctOptionId || 0,
      explanation: question.explanation || "",
      categoryId: question.categoryId || 0,
      difficulty: question.difficulty || "",
      tags: question.QuestionTags?.map(qt => ({
        id: qt.Tags.id,
        name: qt.Tags.name,
      })) || [],
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
