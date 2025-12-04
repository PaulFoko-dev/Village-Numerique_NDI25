import React, { useState } from "react";

export interface ChoicesData {
  applyLinux: boolean;
  enableMonitoring: boolean;
  secureNetwork: boolean;
}

export interface Step2ChoisesProps {
  initialData: ChoicesData;
  onComplete: (data: ChoicesData) => void;
  onBack: () => void;
}

const Step2Choises: React.FC<Step2ChoisesProps> = ({ initialData, onComplete, onBack }) => {
  const [choices, setChoices] = useState<ChoicesData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setChoices({ ...choices, [name]: checked });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Étape 2 : Choisissez vos actions</h2>

      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="applyLinux"
            checked={choices.applyLinux}
            onChange={handleChange}
          />
          Installer Linux sur les machines obsolètes
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="enableMonitoring"
            checked={choices.enableMonitoring}
            onChange={handleChange}
          />
          Activer la surveillance et la maintenance proactive
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="secureNetwork"
            checked={choices.secureNetwork}
            onChange={handleChange}
          />
          Sécuriser le réseau et limiter l'accès aux services tiers
        </label>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Retour
        </button>
        <button
          onClick={() => onComplete(choices)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step2Choises;
