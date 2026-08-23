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
    <div className="w-full max-w-full overflow-x-auto">
      <table className="min-w-0 table-fixed">
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
              <td className="wrap-break-word p-2 align-middle">{item.name}</td>
              <td className="w-10 p-2 align-middle">
                <div className="flex items-center justify-end gap-2">
                  {deleteAction && (
                    <IconTrash
                      className="shrink-0"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteAction(item.id);
                      }}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
