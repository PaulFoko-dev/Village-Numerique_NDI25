// import React, { useMemo } from "react";
// import type { AuditData } from "../modules/Step1Audit";
// import type { ChoicesData } from "../modules/Step2Choises";
// import type { ResultData } from "../utils/calculator";
// import { calculator } from "../utils/calculator";

// export interface Step3ResultProps {
//   audit: AuditData;
//   choices: ChoicesData;
//   onBack: () => void;
//   onNext: (result: ResultData) => void;
// }

// const Step3Result: React.FC<Step3ResultProps> = ({ audit, choices, onBack, onNext }) => {
//   // Recalcule le score à chaque modification des données
//   const result = useMemo(() => calculator(audit, choices), [audit, choices]);

//   return (
//     <div className="space-y-4 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold text-green-700">Étape 3 : Résultats</h2>

//       <div className="p-4 bg-green-100 border-l-4 border-green-600 rounded">
//         <p className="text-lg font-semibold">
//           Score d'impact : <span className="text-green-700">{result.impactScore}</span>
//         </p>
//         <p className="text-gray-700 mt-2">{result.message}</p>
//       </div>

//       <div className="flex justify-between mt-6">
//         <button
//           onClick={onBack}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
//         >
//           Retour
//         </button>
//         <button
//           onClick={() => onNext(result)}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Continuer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step3Result;
import React from "react";
// Import des types nécessaires pour la cohérence
import type { ResultData } from "../utils/calculator";

interface Step3ResultProps {
  result: ResultData;
  onBack: () => void;
  onNext: () => void; // onNext n'a pas besoin de ResultData ici, il passe juste à l'étape suivante
}

const levelFromScore = (score: number) => {
  if (score < 40) return { label: "Débutant", color: "bg-red-400" };
  if (score < 70) return { label: "Intermédiaire", color: "bg-yellow-400" };
  if (score < 90) return { label: "Résilient", color: "bg-green-400" };
  return { label: "Souverain", color: "bg-indigo-500" };
};

const Step3Result: React.FC<Step3ResultProps> = ({ result, onBack, onNext }) => {
  const level = levelFromScore(result.impactScore);

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">3. Résultats de la Simulation</h2>
      <p className="text-gray-600">Voici l'impact estimé suite à vos choix de stratégies NIRD.</p>

      <div className="p-4 rounded-lg bg-gray-50 shadow">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Score d'impact NIRD</div>
            <div className="text-3xl font-extrabold text-green-700">{result.impactScore}</div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${level.color}`}>
              {level.label}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-green-400 to-indigo-500 transition-all duration-500"
              style={{ width: `${Math.max(0, Math.min(100, result.impactScore))}%` }}
            />
          </div>
        </div>

        {/* Message + savings */}
        <div className="mt-4 text-gray-700 border-t pt-4">
          <p className="mb-2 italic">« {result.message} »</p>
          <p className="text-sm text-gray-600">
            Économie estimée : <span className="font-bold text-green-700">{result.moneySaved} € / an</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition font-semibold"
        >
          ← Modifier les choix
        </button>

        <button
          onClick={onNext}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Continuer →
        </button>
      </div>
    </div>
  );
};

export default Step3Result;