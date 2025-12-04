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
import React, { useMemo } from "react";
import type { AuditData } from "./Step1Audit";
import type { ChoicesData } from "./Step2Choises";
import { calculator } from "../utils/calculator";
import type { ResultData } from "../utils/calculator";

interface Step3ResultProps {
  audit: AuditData;
  choices: ChoicesData;
  result: ResultData;
  onBack: () => void;
  onNext: (result: ResultData) => void;
}

const levelFromScore = (score: number) => {
  if (score < 40) return { label: "Débutant", color: "bg-red-400" };
  if (score < 70) return { label: "Intermédiaire", color: "bg-yellow-400" };
  if (score < 90) return { label: "Résilient", color: "bg-green-400" };
  return { label: "Souverain", color: "bg-indigo-500" };
};

const Step3Result: React.FC<Step3ResultProps> = ({ audit, choices, result, onBack, onNext }) => {
  // recompute to ensure coherence (in case)
  const computed = useMemo(() => calculator(audit, choices), [audit, choices]);

  const level = levelFromScore(computed.impactScore);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Étape 3 — Résultats</h2>
      <p className="text-gray-600">Voici l'impact estimé suite à vos choix.</p>

      <div className="p-4 rounded-lg bg-white shadow">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Score d'impact</div>
            <div className="text-3xl font-extrabold">{computed.impactScore}</div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-white text-sm ${level.color}`}>
              {level.label}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-green-400 to-indigo-500 transition-all"
              style={{ width: `${Math.max(0, Math.min(100, computed.impactScore))}%` }}
            />
          </div>
        </div>

        {/* Message + savings */}
        <div className="mt-4 text-gray-700">
          <p className="mb-2">{computed.message}</p>
          <p className="text-sm text-gray-600">
            Économie estimée : <span className="font-semibold">{computed.moneySaved} € / an</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          ← Retour
        </button>

        <button
          onClick={() => onNext(computed)}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Continuer →
        </button>
      </div>
    </div>
  );
};

export default Step3Result;
