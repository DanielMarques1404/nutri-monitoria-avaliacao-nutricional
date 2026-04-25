import type { IGeneric } from "../../domain/entities/entities";
import type { IRepository } from "../../domain/repositories/IRepository";
import { supabase } from "./config";

export class SupabaseRepository<T extends IGeneric> implements IRepository<T> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from(this.tableName).delete().eq("id", id);

    if (error) {
      throw error;
    }
  }

  async createOrUpdate(obj: T): Promise<void> {
    if (obj.id === 0) {
      const { error } = await supabase
        .from(this.tableName)
        .insert([obj])
        .select();

      if (error) {
        throw error;
      }
    } else {
      const { error } = await supabase
        .from(this.tableName)
        .update(obj)
        .eq("id", obj.id)
        .select();

      if (error) {
        throw error;
      }
    }
  }

  async list(): Promise<T[] | null> {
    const { data, error } = await supabase.from(this.tableName).select("*");

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;

    return data.sort((a, b) => a.name.localeCompare(b.name)) as T[];
  }
}
