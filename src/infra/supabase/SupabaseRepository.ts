import type { IGeneric } from "../../domain/entities/entities";
import type { IRepository } from "../../domain/repositories/IRepository";
import { supabase } from "./config";

/**
 * Repositório genérico que abstrai a complexidade dos tipos do Supabase.
 * Mantém a interface simples com IGeneric enquanto trabalha com o Supabase internamente.
 *
 * O casting para `any` é necessário porque o cliente Supabase espera literais de tabela
 * conhecidas em tempo de compilação, mas mantemos abstração genérica no domínio.
 */
export class SupabaseRepository<T extends IGeneric> implements IRepository<T> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async delete(id: number): Promise<void> {
    const { error } = await (supabase as any)
      .from(this.tableName)
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  }

  async createOrUpdate(obj: T): Promise<void> {
    if (obj.id === 0) {
      const { id, ...objWithoutId } = obj;
      const { error } = await (supabase as any)
        .from(this.tableName)
        .insert([objWithoutId])
        .select();

      if (error) {
        throw error;
      }
    } else {
      const { error } = await (supabase as any)
        .from(this.tableName)
        .update(obj)
        .eq("id", obj.id)
        .select();

      if (error) {
        throw error;
      }
    }
  }

  async listAll(): Promise<T[] | null> {
    const { data, error } = await (supabase as any)
      .from(this.tableName)
      .select("*");

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;

    return data.sort((a: any, b: any) => a.name.localeCompare(b.name)) as T[];
  }

  async listById(id: number): Promise<T | null> {
    const { data, error } = await (supabase as any)
      .from(this.tableName)
      .select("*")
      .eq("id", id);

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;

    return data[0] as T;
  }
}
