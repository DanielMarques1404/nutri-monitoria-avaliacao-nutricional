import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import type { Category } from "../../types/game";
import { supabase } from "./config";

export class CategorySupabaseRepository implements ICategoryRepository {
  async create(category: Category): Promise<void> {
    const { error } = await supabase
      .from("Categories")
      .insert([{ name: category.name, active: category.active }])
      .select();
    if (error) {
      throw error;
    }
  }

  async list(): Promise<Category[] | null> {
    const { data, error } = await supabase.from("Categories").select("*");

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;

    const result: Category[] = data.map((category) => ({
      id: category.id,
      name: category.name,
      active: category.active,
    }));

    return result;
  }
}
