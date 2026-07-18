import type { IQuestionnaireQuestion } from "../../domain/entities/entities";
import type { IQuestionnaireQuestionsRepository } from "../../domain/repositories/IQuestionnaireQuestionsRepository";
import { supabase } from "./config";

export class QuestionnaireQuestionsSupabaseRepository
  implements IQuestionnaireQuestionsRepository
{
  async listByQuestionnaireId(
    questionnaireId: number,
  ): Promise<IQuestionnaireQuestion[] | null> {
    const { data, error } = await supabase
      .from("questionnaire_questions")
      .select("id, questionnaire_id, question_id")
      .eq("questionnaire_id", questionnaireId);

    if (error) throw error;

    return (
      data?.map((item) => ({
        id: item.id,
        questionnaireId: item.questionnaire_id,
        questionId: item.question_id,
      })) || null
    );
  }

  async create(questionnaireId: number, questionId: number): Promise<void> {
    const { data: existing, error: existingError } = await supabase
      .from("questionnaire_questions")
      .select("id")
      .eq("questionnaire_id", questionnaireId)
      .eq("question_id", questionId)
      .maybeSingle();

    if (existingError) throw existingError;
    if (existing) return;

    const { error } = await supabase.from("questionnaire_questions").insert({
      questionnaire_id: questionnaireId,
      question_id: questionId,
    });

    if (error) throw error;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from("questionnaire_questions")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  async deleteByQuestionnaireId(questionnaireId: number): Promise<void> {
    const { error } = await supabase
      .from("questionnaire_questions")
      .delete()
      .eq("questionnaire_id", questionnaireId);

    if (error) throw error;
  }

  async deleteByQuestionId(questionId: number): Promise<void> {
    const { error } = await supabase
      .from("questionnaire_questions")
      .delete()
      .eq("question_id", questionId);

    if (error) throw error;
  }

  async deleteByQuestionnaireAndQuestion(
    questionnaireId: number,
    questionId: number,
  ): Promise<void> {
    const { error } = await supabase
      .from("questionnaire_questions")
      .delete()
      .eq("questionnaire_id", questionnaireId)
      .eq("question_id", questionId);

    if (error) throw error;
  }
}
