import type { Option } from "../../types/game";
import type { IOptionRepository } from "../repositories/IOptionRepository";

export class OptionUseCase {
  private repository: IOptionRepository;

  constructor(repository: IOptionRepository) {
    this.repository = repository;
  }

  async listAll(): Promise<Option[] | null> {
    return this.repository.list();
  }

  async create(option: Option): Promise<void> {
    return this.repository.create(option);
  }
}
