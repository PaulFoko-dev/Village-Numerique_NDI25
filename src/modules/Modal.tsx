import React from "react";

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 sm:px-6"
      onClick={onClose}
    >
      <div
        // Style du contenu du Modal, adapté pour contenir les étapes
        className="bg-white w-full max-w-screen-lg mx-auto rounded-xl shadow-2xl relative border border-gray-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold z-10 p-2"
          aria-label="Fermer"
        >
          ✖
        </button>

        {/* Conteneur pour le contenu (Step1, Step2, Step3) avec gestion du scroll */}
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;