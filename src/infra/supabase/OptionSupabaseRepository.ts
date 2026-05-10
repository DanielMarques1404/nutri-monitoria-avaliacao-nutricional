import type { IOptionRepository } from "../../domain/repositories/IOptionRepository";
import type { Option } from "../../types/game";

export class OptionSupabaseRepository implements IOptionRepository {
  list(): Promise<Option[] | null> {
    throw new Error("Method not implemented.");
  }
  create(option: Option): Promise<void> {
    throw new Error(`"Method not implemented." ${option}`);
  }
}
