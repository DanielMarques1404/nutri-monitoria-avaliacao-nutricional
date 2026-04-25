import { IconPencil, IconTrash } from "@tabler/icons-react";

type RegisterdItemProps = {
  caption: string;
  items: any[];
  deleteAction: (id: number) => void;
  updateAction: (id: number) => void;
};

export const Table = ({
  caption,
  items,
  deleteAction,
  updateAction,
}: RegisterdItemProps) => {
  return (
    <table>
      <tr>
        <th className="p-2">{caption}</th>
        <th className="p-2">Ações</th>
      </tr>
      {items.map(item => (
        <tr key={item.id} className="cursor-pointer hover:font-semibold">
          <td className="p-2">{item.name}</td>
          <td className="flex items-center justify-end gap-2 p-2">
            <IconTrash onClick={() => deleteAction(item.id)} />
            <IconPencil onClick={() => updateAction(item.id)} />
          </td>
        </tr>
      ))}
    </table>
  );
};
