import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";

type ItemTable = {
  id: number;
  name: string;
};

type RegisterdItemProps = {
  caption?: string;
  items: ItemTable[];
  selectedOption?: number;
  highlightingOption?: boolean;
  onSelectOption?: (id: number) => void;
  deleteAction?: (id: number) => void;
  updateAction?: (id: number) => void;
};

export const Table = ({
  caption,
  items,
  selectedOption,
  highlightingOption,
  onSelectOption,
  deleteAction,
  updateAction,
}: RegisterdItemProps) => {
  const [selectedItem, setSelectedItem] = useState<number | undefined>(
    selectedOption,
  );

  useEffect(() => {
    setSelectedItem(selectedOption);
  }, [selectedOption]);

  return (
    <table>
      {caption && (
        <caption className="w-full p-1 font-semibold">{caption}</caption>
      )}
      <tbody>
        {items?.map((item) => (
          <tr
            key={item.id}
            className={cn("cursor-pointer hover:font-semibold", {
              "border-4 border-orange":
                highlightingOption && selectedItem === item.id,
            })}
            onClick={() => {
              onSelectOption && onSelectOption(item.id);
              updateAction && updateAction(item.id);
              setSelectedItem(item.id);
            }}
          >
            <td className="p-2">{item.name}</td>
            <td className="flex items-center justify-end gap-2 p-2">
              {deleteAction && (
                <IconTrash
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteAction(item.id);
                  }}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
