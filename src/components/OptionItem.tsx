import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react";
import type { IOption } from "../domain/entities/entities";
import { cn } from "../utils/cn";

type OptionItemProps = {
  option: IOption;
  selected?: boolean;
  onDelete?: (id: number) => void;
  onMoveUp?: (id: number) => void;
  onMoveDown?: (id: number) => void;
  onSelect?: (option: IOption) => void;
};

export const OptionItem = (props: OptionItemProps) => {
  const visibleButtons =
    props.onMoveUp && props.onMoveDown
      ? props.onDelete
        ? 2
        : 1
      : props.onDelete
        ? 1
        : 0;

  return (
    <div
      className={cn(
        "grid grid-cols-12 items-center border border-dark-green rounded-md overflow-hidden select-none h-auto cursor-pointer min-h-14",
        {
          "border-4 border-answer-user": props.selected,
        },
      )}
    >
      <div
        className="bg-lighter-green flext items-center justify-center w-full h-full p-2"
        onClick={() => props.onSelect && props.onSelect(props.option)}
      >
        <span className="flex items-center justify-center h-full font-bold text-dark-green">
          {props.option.option}
        </span>
      </div>
      <span
        className={cn(
          "col-span-11 px-2 py-1",
          { "col-span-10": visibleButtons === 1 },
          { "col-span-9": visibleButtons === 2 },
        )}
        onClick={() => props.onSelect && props.onSelect(props.option)}
      >
        {props.option.description}
      </span>
      {props.onDelete && (
        <div className="flex items-center justify-center">
          <IconTrash
            onClick={() => props.onDelete && props.onDelete(props.option.id)}
          />
        </div>
      )}
      {props.onMoveDown && props.onMoveUp && (
        <div className="flex flex-col items-center justify-center">
          <IconChevronUp
            onClick={() => props.onMoveUp && props.onMoveUp(props.option.id)}
          />
          <IconChevronDown
            onClick={() =>
              props.onMoveDown && props.onMoveDown(props.option.id)
            }
          />
        </div>
      )}
    </div>
  );
};
