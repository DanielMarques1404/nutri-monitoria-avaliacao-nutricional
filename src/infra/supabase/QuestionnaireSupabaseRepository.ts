import type { IQuestionnaire } from "../../domain/entities/entities";
import type { IQuestionnaireRepository } from "../../domain/repositories/IQuestionnaireRepository";
import { supabase } from "./config";

export class QuestionnaireSupabaseRepository implements IQuestionnaireRepository {
  async listActives(): Promise<IQuestionnaire[] | null> {
    const { data, error } = await supabase
      .from("questionnaires")
      .select("id, name, description, active, questionnaire_questions(question_id)")
      .eq("active", true);

    if (error) throw error;

    if (!data) return null;

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      active: item.active,
      questions: [],
      questionCount: item.questionnaire_questions.length,
      urls: [],
    }));
  }

  async listAll(): Promise<IQuestionnaire[] | null> {
        const { data, error } = await supabase
      .from("questionnaires")
      .select("id, name, description, active, questionnaire_questions(question_id)")
      .order("name", { ascending: true });
      
    if (error) throw error;

    if (!data) return null;

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      active: item.active,
      questions: [],
      questionCount: item.questionnaire_questions.length,
      urls: [],
    }));
  }

  async listById(id: number): Promise<IQuestionnaire | null> {
    const { data, error } = await supabase
      .from("questionnaire_questions")
      .select(
        "questionnaires(id, name, description, active), questions(id, title, statement, question, explanation, difficulty, correct_option, category_id, question_tags(tags(id, name)), question_options(id, description, question_id))",
      )
      .eq("questionnaire_id", id);

    if (error) throw error;

    if (!data || data.length === 0) return null;

    return {
      id: data[0].questionnaires.id,
      name: data[0].questionnaires.name,
      description: data[0].questionnaires.description || "",
      active: data[0].questionnaires.active,
      questions: data.map((item) => ({
        id: item.questions.id,
        title: item.questions.title,
        statement: item.questions.statement,
        question: item.questions.question,
        options:
          item.questions.question_options?.map((option) => ({
            id: option.id,
            questionId: option.question_id,
            description: option.description,
          })) || [],
        correctOption: item.questions.correct_option || 0,
        explanation: item.questions.explanation || "",
        categoryId: item.questions.category_id || 0,
        difficulty: item.questions.difficulty || "",
        tags:
          item.questions.question_tags?.map((questionTag) => ({
            id: questionTag.tags.id,
            name: questionTag.tags.name,
          })) || [],
      })),
      questionCount: data.length,
      urls: [],
    };
  }

  createOrUpdate(obj: IQuestionnaire): Promise<void> {
    throw new Error(`"Method not implemented." ${obj}`);
  }
  delete(id: number): Promise<void> {
    throw new Error(`"Method not implemented." ${id}`);
  }
}
