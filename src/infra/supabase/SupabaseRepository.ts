import type { IGeneric } from "../../domain/entities/entities";
import type { IRepository } from "../../domain/repositories/IRepository";
import type { Database } from "./supabase";
import { supabase } from "./config";

type TableName = keyof Database["public"]["Tables"];

export class SupabaseRepository<T extends IGeneric> implements IRepository<T> {
  private tableName: TableName;

  constructor(tableName: TableName) {
    this.tableName = tableName;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq("id", id as any);

    if (error) {
      throw error;
    }
  }

  async createOrUpdate(obj: T): Promise<void> {
    if (obj.id === 0) {
      const { id, ...objWithoutId } = obj;
      const { error } = await supabase
        .from(this.tableName)
        .insert([objWithoutId as any])
        .select();

      if (error) {
        throw error;
      }
    } else {
      const { error } = await supabase
        .from(this.tableName)
        .update(obj as any)
        .eq("id", obj.id as any)
        .select();

      if (error) {
        throw error;
      }
    }
  }

  async listAll(): Promise<T[] | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*");

    if (error) throw error;

    if (!data) return null;

    return data.sort((a: any, b: any) => a.name.localeCompare(b.name)) as unknown as T[];
  }

  async listById(id: number): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id as any);

    if (error) throw error;

    if (!data) return null;

    return data[0] as unknown as T;
  }
}
