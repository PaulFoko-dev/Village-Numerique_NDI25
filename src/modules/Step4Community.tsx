// import React from "react";

// export interface Step4CommunityProps {
//   onFinish: () => void;
// }

// const Step4Community: React.FC<Step4CommunityProps> = ({ onFinish }) => {
//   return (
//     <div className="space-y-4 text-center">
//       <h2 className="text-xl font-bold">Étape 4 : Rejoignez la communauté</h2>
//       <p>
//         Bravo ! Vous avez terminé le simulateur. Partagez vos solutions et rejoignez le
//         réseau NIRD pour renforcer la résilience numérique des établissements scolaires.
//       </p>
//       <button
//         onClick={onFinish}
//         className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
//       >
//         Terminer
//       </button>
//     </div>
//   );
// };

// export default Step4Community;
import React from "react";
import type { ResultData } from "../utils/calculator";

interface Step4CommunityProps {
  result: ResultData;
  onFinish: () => void;
}

const Step4Community: React.FC<Step4CommunityProps> = ({ result, onFinish }) => {
  return (
    <div className="space-y-6 text-center p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-700">4. Rejoindre la communauté NIRD</h2>

      <p className="text-gray-700 text-lg">
        Félicitations ! Votre score final est de : 
        <span className="font-extrabold text-3xl block mt-2 text-indigo-600">{result.impactScore}</span>
      </p>
      <p className="text-gray-600">
        Grâce à vos choix NIRD, l'économie annuelle estimée pour votre établissement est de :
        <span className="font-bold text-xl block mt-1 text-green-700"> {result.moneySaved} €</span>
      </p>

      <div className="grid grid-cols-1 gap-4 pt-4 border-t mt-4">
        <button
          onClick={onFinish}
          className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-md"
        >
          Terminer la simulation
        </button>

        <button
          onClick={() => {
            // simulate sharing / download
            void navigator.clipboard?.writeText(
              `Village-Numérique — Score: ${result.impactScore}, Économie: ${result.moneySaved} €/an`
            );
            alert("Texte du résultat copié dans le presse-papier (simulé).");
          }}
          className="px-6 py-3 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition font-semibold"
        >
          Copier le résumé pour partager
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Rejoignez la communauté Village-Numérique pour échanger des guides, tutoriels et retours d'expérience.
      </p>
    </div>
  );
};

export default Step4Community;