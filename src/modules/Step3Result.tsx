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


// Step3Result.tsx
import React from 'react';
import type { ResultData } from '../utils/calculator';
import type { ChoicesData } from './Step2Choises'; 

// Mise à jour de l'interface pour inclure les choix
interface Step3ResultProps {
  result: ResultData;
  choices: ChoicesData;
  onBack: () => void;
  onNext: () => void;
}

// -------------------------------------------------------------
// Logique de génération des commentaires d'amélioration
// -------------------------------------------------------------

const generateImprovementFeedback = (choices: ChoicesData, score: number): string[] => {
    const feedback: string[] = [];

    // 1. Feedback basé sur les choix non sélectionnés (zones d'amélioration)
    if (!choices.applyLinux) {
        feedback.push("Votre dépendance à l'obsolescence programmée reste élevée. Envisagez le **'Coup de Jeune Linux'** pour les machines en fin de vie afin de prolonger leur durée d'usage.");
    }
    if (!choices.enableReconditioning) {
        feedback.push("L'**économie circulaire** et le **réemploi** sont des leviers majeurs. Un atelier interne pourrait générer des économies substantielles et créer des compétences locales.");
    }
    if (!choices.secureNetwork) {
        feedback.push("La **souveraineté des données** est un défi critique. Explorez l'utilisation de solutions libres pour l'infrastructure réseau afin de maîtriser vos informations.");
    }
    
    // 2. Feedback basé sur un score faible ou moyen
    if (score < 40) {
        feedback.push("Votre score est bas. L'adoption de **plusieurs stratégies NIRD** en parallèle est nécessaire pour construire un véritable 'Village Résistant'.");
    } else if (score >= 40 && score < 70) {
        feedback.push("Bon départ ! Pour passer au niveau supérieur (Impact Élevé), examinez les **défis restants** et osez les solutions les plus autonomes.");
    }
    
    // Si aucun choix n'a été manqué et que le score est bon
    if (feedback.length === 0) {
        feedback.push("Félicitations ! Votre Village Numérique est hautement résistant. Concentrez-vous désormais sur le **partage de votre expérience** avec la communauté NIRD.");
    }

    return feedback;
};

// -------------------------------------------------------------
// Composant Step3Result
// -------------------------------------------------------------

const Step3Result: React.FC<Step3ResultProps> = ({ result, choices, onBack, onNext }) => {
    
    const feedback = generateImprovementFeedback(choices, result.impactScore);

    return (
        <div className="space-y-6 p-6 max-h-[75vh] overflow-y-auto">
            <h2 className="text-2xl font-extrabold text-indigo-700">3. Résultat de la Simulation d'Impact</h2>
            <p className="text-gray-600">
                Votre stratégie NIRD a été simulée. Voici les bénéfices estimés pour votre établissement.
            </p>

            {/* Indicateurs Clés */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-green-100 rounded-lg">
                    <p className="text-lg font-bold text-green-700">{result.impactScore} / 100</p>
                    <p className="text-green-600 font-semibold">Score de Résistance NIRD</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-lg">
                    <p className="text-lg font-bold text-blue-700">{result.moneySaved} €</p>
                    <p className="text-blue-600 font-semibold">Économies Estimées</p>
                </div>
                <div className="p-4 md:col-span-2 bg-yellow-100 rounded-lg">
                    <p className="font-bold text-yellow-700">~{result.message}</p>
                    <p className="text-yellow-600 text-lg font-semibold">Durée de Vie Prolongée</p>
                </div>
            </div>

            {/* Section Commentaires / Améliorations */}
            <div className="pt-4 border-t mt-6">
                <h3 className="text-xl font-bold text-red-600 mb-3">Zones d'Amélioration et Prochaines Étapes</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {feedback.map((item, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2 mt-1">•</span>
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-between mt-6">
                <button 
                    onClick={onBack}   
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-150 font-semibold"
                >
                        &larr; Revoir les choix
                </button>
                <button 
                    onClick={onNext}
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150 shadow-md"
                >
                    Continuer vers la Communauté &rarr;
                </button>
            </div>
        </div>
    );
};

export default Step3Result;