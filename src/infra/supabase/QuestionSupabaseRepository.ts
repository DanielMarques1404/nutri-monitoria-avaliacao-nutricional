import type { IQuestion } from "../../domain/entities/entities";
import type { IQuestionRepository } from "../../domain/repositories/IQuestionRepository";
import { supabase } from "./config";

export class QuestionSupabaseRepository implements IQuestionRepository {
  async list(): Promise<IQuestion[] | null> {
    const { data, error } = await supabase
      .from("Questions")
      .select("*, QuestionTags(Tags(*)), QuestionOptions(*)");

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
      options:
        question.QuestionOptions?.map((qo) => ({
          id: qo.id,
          questionId: qo.questionId,
          description: qo.description,
        })) || [],
      correctOptionId: question.correctOptionId || 0,
      explanation: question.explanation || "",
      categoryId: question.categoryId || 0,
      difficulty: question.difficulty || "",
      tags:
        question.QuestionTags?.map((qt) => ({
          id: qt.Tags.id,
          name: qt.Tags.name,
        })) || [],
      summaryImage: question.summaryImage || "",
    }));

    return questions.sort((a: any, b: any) =>
      a.title.localeCompare(b.title),
    ) as IQuestion[];
  }

  async createOrUpdate(question: IQuestion): Promise<number> {
    if (question.id === 0) {
      const { id, options, tags, ...questionWithoutId } = question;
      const { data, error } = await (supabase as any)
        .from("Questions")
        .insert([questionWithoutId])
        .select("id");

      if (error) {
        throw error;
      }

      return data[0].id;
    } else {
      const { options, tags, ...justAQuestion } = question;
      const { error } = await supabase
        .from("Questions")
        .update(justAQuestion)
        .eq("id", question.id)
        .select();

      if (error) {
        throw error;
      }

      return question.id;
    }
  }

  async delete(id: number): Promise<void> {
    console.log("deletando", id);
    throw new Error("Method not implemented.");
  }
}
