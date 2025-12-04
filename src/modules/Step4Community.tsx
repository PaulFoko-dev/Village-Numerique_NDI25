import React from "react";

export interface Step4CommunityProps {
  onFinish: () => void;
}

const Step4Community: React.FC<Step4CommunityProps> = ({ onFinish }) => {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold">Étape 4 : Rejoignez la communauté</h2>
      <p>
        Bravo ! Vous avez terminé le simulateur. Partagez vos solutions et rejoignez le
        réseau NIRD pour renforcer la résilience numérique des établissements scolaires.
      </p>
      <button
        onClick={onFinish}
        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Terminer
      </button>
    </div>
  );
};

export default Step4Community;
