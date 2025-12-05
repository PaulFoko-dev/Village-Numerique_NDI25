// import React, { useState } from "react";

// export interface ChoicesData {
//   applyLinux: boolean;
//   enableMonitoring: boolean;
//   secureNetwork: boolean;
// }

// export interface Step2ChoisesProps {
//   initialData: ChoicesData;
//   onComplete: (data: ChoicesData) => void;
//   onBack: () => void;
// }

// const Step2Choises: React.FC<Step2ChoisesProps> = ({ initialData, onComplete, onBack }) => {
//   const [choices, setChoices] = useState<ChoicesData>(initialData);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = e.target;
//     setChoices({ ...choices, [name]: checked });
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold">Étape 2 : Choisissez vos actions</h2>

//       <div className="flex flex-col space-y-2">
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="applyLinux"
//             checked={choices.applyLinux}
//             onChange={handleChange}
//           />
//           Installer Linux sur les machines obsolètes
//         </label>

//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="enableMonitoring"
//             checked={choices.enableMonitoring}
//             onChange={handleChange}
//           />
//           Activer la surveillance et la maintenance proactive
//         </label>

//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="secureNetwork"
//             checked={choices.secureNetwork}
//             onChange={handleChange}
//           />
//           Sécuriser le réseau et limiter l'accès aux services tiers
//         </label>
//       </div>

//       <div className="flex justify-between mt-4">
//         <button
//           onClick={onBack}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
//         >
//           Retour
//         </button>
//         <button
//           onClick={() => onComplete(choices)}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Suivant
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step2Choises;

import React, { useState } from "react";

export type ChoicesData = {
  applyLinux: boolean;
  enableReconditioning: boolean;
  secureNetwork: boolean;
};

export interface Step2ChoisesProps {
  initialData: ChoicesData;
  onComplete: (data: ChoicesData) => void;
  onBack: () => void;
}

export interface ChoiceItemProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  description: string;
}

export const ChoiceItem: React.FC<ChoiceItemProps> = ({ name, checked, onChange, title, description }) => (
  <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition duration-150">
      <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      <div className="ml-3">
          <span className="text-base font-semibold text-gray-900">{title}</span>
          <p className="text-sm text-gray-500">{description}</p>
      </div>
  </label>
);

const Step2Choises: React.FC<Step2ChoisesProps> = ({ initialData, onComplete, onBack }) => {
    // Correction : Le composant initialData.enableMonitoring n'existe plus, on utilise la nouvelle structure
    const initialChoices = {
      applyLinux: initialData.applyLinux,
      enableReconditioning: initialData.enableReconditioning, 
      secureNetwork: initialData.secureNetwork,
    };
    
    const [choices, setChoices] = useState<ChoicesData>(initialChoices);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setChoices({ ...choices, [name]: checked });
    };

    return (
        <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-extrabold text-green-700">2. Les Choix de Résistance NIRD</h2>
            <p className="text-gray-600">Sélectionnez les stratégies NIRD que votre établissement pourrait mettre en place.</p>

            <div className="flex flex-col space-y-4">
                <ChoiceItem
                    name="applyLinux"
                    checked={choices.applyLinux}
                    onChange={handleChange}
                    title="Le 'Coup de Jeune' Linux"
                    description="Basculer les machines obsolètes sous un système d'exploitation libre (Linux) pour prolonger leur durée de vie et économiser sur les licences."
                />

                <ChoiceItem
                    name="enableReconditioning"
                    checked={choices.enableReconditioning}
                    onChange={handleChange}
                    title="L'Atelier de Réemploi"
                    description="Mettre en place un atelier interne (élèves/techniciens) pour reconditionner le matériel au lieu d'acheter neuf, réduisant les déchets électroniques."
                />

                <ChoiceItem
                    name="secureNetwork"
                    checked={choices.secureNetwork}
                    onChange={handleChange}
                    title="Souveraineté du Réseau"
                    description="Adopter des solutions de sécurité et d'infrastructure réseau libres pour reprendre le contrôle total des données et infrastructures critiques."
                />
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={onBack}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-150 font-semibold"
                >
                    &larr; Retour
                </button>
                <button
                    onClick={() => onComplete(choices)}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
                >
                    Lancer la Simulation &rarr;
                </button>
            </div>
        </div>
    );
};

export default Step2Choises;