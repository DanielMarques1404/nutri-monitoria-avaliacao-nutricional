import Modal from "../layout/Modal";
import { Button } from "../ui/Button";

type ConfirmActionModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmActionModal = ({
  isOpen,
  title,
  description,
  confirmLabel,
  onCancel,
  onConfirm,
}: ConfirmActionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold text-dark-green">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            type="button"
            label="Cancelar"
            onClick={onCancel}
          />
          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            type="button"
            label={confirmLabel}
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};
