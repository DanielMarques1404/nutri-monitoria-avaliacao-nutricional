import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { IOption } from "../domain/entities/entities";
import { cn } from "../utils/cn";

type OptionItemProps = {
  option: IOption;
  selected?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (option: IOption) => void;
  onSelect?: (option: IOption) => void;
};

export const OptionItem = (props: OptionItemProps) => {
  return (
    <div>
      {props.selected && (
        <span className="text-sm font-bold text-dark-green">Correta</span>
      )}
      <div
        className={cn(
          "grid grid-cols-12 items-center border border-dark-green rounded-md overflow-hidden select-none h-auto cursor-pointer min-h-14",
          {
            "border-4 border-orange": props.selected,
          },
        )}
        onClick={() => props.onSelect && props.onSelect(props.option)}
      >
        <span
          className={cn(
            "px-2 py-1",
            !props.onDelete && !props.onEdit && !props.selected
              ? "col-span-12"
              : "col-span-10",
          )}
        >
          {props.option.description}
        </span>

        {props.onEdit && (
          <div
            className="flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <IconPencil onClick={() => props.onEdit?.(props.option)} />
          </div>
        )}

        {props.onDelete && (
          <div
            className="flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <IconTrash
              onClick={() => props.onDelete && props.onDelete(props.option.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
