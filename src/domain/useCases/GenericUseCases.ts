import type { IGeneric } from "../entities/entities";
import type { IRepository } from "../repositories/IRepository";

export class GenericUseCases<T extends IGeneric> {
  private repository: IRepository<T>;

  constructor(repository: IRepository<T>) {
    this.repository = repository;
  }

  async listAll(): Promise<T[] | null> {
    return this.repository.list();
  }

  async createOrUpdate(obj: T): Promise<void> {
    return this.repository.createOrUpdate(obj);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
