import React from "react";

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture
      >
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
