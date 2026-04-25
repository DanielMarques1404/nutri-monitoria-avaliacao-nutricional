import type { Option } from "../../types/game";

export interface IOptionRepository {
  list(): Promise<Option[] | null>;
  create(option: Option): Promise<void>;
}
