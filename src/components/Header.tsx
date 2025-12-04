// Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo section */}
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 rounded-md p-2">
            {/* Icône stylisée */}
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-800">Village numérique</span>
        </div>

        {/* Espace pour navigation ou actions */}
        <nav>
          {/* Tu peux ajouter des liens ici */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
