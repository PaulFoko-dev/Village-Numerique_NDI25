// Button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md border-0 outline-none cursor-pointer transform transition duration-200 hover:translate-y-1"
    >
      {children}
    </button>
  );
};

export default Button;
