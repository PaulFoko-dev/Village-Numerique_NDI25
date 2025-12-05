// import React from "react";

// export interface ModalProps {
//   children: React.ReactNode;
//   onClose: () => void;
// }

// const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//       <div
//         className="bg-white rounded-xl w-full max-w-xl p-6 relative shadow-lg animate-scaleUp"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
//         >
//           ✖
//         </button>
//         {children}
//       </div>
//       <style>
//         {`
//           @keyframes scaleUp {
//             from { transform: scale(0.95); opacity: 0; }
//             to { transform: scale(1); opacity: 1; }
//           }
//           .animate-scaleUp {
//             animation: scaleUp 0.25s ease-out forwards;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Modal;
import React from "react";

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[70%] h-[75%] p-6 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Fermer"
        >
          ✖
        </button>

        <div className="max-h-[80vh] overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

