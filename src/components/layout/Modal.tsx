import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  contentClassName?: string;
  onClose?: () => void;
};

const Modal = ({ isOpen, children, contentClassName, onClose }: ModalProps) => {
  if (!isOpen) return null;
  const contentClasses = contentClassName ?? "max-w-md";

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl p-4 shadow-lg w-full ${contentClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
