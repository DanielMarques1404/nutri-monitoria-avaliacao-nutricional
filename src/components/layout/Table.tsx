import { IconTrash } from "@tabler/icons-react";

type RegisterdItemProps = {
  caption: string;
  items: any[];
  onSelectOption?: (id: number) => void;
  deleteAction?: (id: number) => void;
  updateAction?: (id: number) => void;
};

export const Table = ({
  caption,
  items,
  onSelectOption,
  deleteAction,
  updateAction,
}: RegisterdItemProps) => {
  return (
    <table>
      <caption className="w-full p-1 font-semibold">{caption}</caption>
      <tbody>
        {items?.map((item) => (
          <tr
            key={item.id}
            className="cursor-pointer hover:font-semibold"
            onClick={() => {
              onSelectOption && onSelectOption(item.id);
              updateAction && updateAction(item.id);
            }}
          >
            <td className="p-2">{item.name}</td>
            <td className="flex items-center justify-end gap-2 p-2">
              {deleteAction && (
                <IconTrash onClick={() => deleteAction(item.id)} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
