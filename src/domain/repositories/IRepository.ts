import type { IGeneric } from "../entities/entities";

export interface IRepository<T extends IGeneric> {
  listAll(): Promise<T[] | null>;
  listById(id: number): Promise<T | null>;
  createOrUpdate(obj: T): Promise<void>;
  delete(id: number): Promise<void>;
}
