import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  // Render the modal using a Portal to append it to the document body
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="bg-white rounded-xl p-4 shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
