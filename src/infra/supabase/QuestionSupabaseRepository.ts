import { toast } from "react-toastify";
import type { IQuestionRepository } from "../../domain/repositories/IQuestionsRepository";
import type { QuizQuestion } from "../../types/game";
import { supabase } from "./config";

export class QuestionSupabaseRepository implements IQuestionRepository {
  async insert(question: QuizQuestion): Promise<void> {
    console.log("inserindo question no supabase", question);

    const { data, error } = await supabase
      .from("question")
      .insert([{ some_column: "someValue", other_column: "otherValue" }])
      .select();

    if (error) {
      toast.error("Erro ao atualizar conta");
      throw error;
    }

    toast.success("Conta atualizada com sucesso");
  }

  async list(): Promise<QuizQuestion | null> {
    let { data: question, error } = await supabase.from("").select("*");

    if (error) {
      console.error(error);
      return null;
    }

    if (!question) return null;

    const result: QuizQuestion = {
      id: question.id,
      title: question.name,
      balance: question.balance,
    };

    return result;
  }
}
