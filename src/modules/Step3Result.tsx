import React from "react";

export interface ResultData {
  impactScore: number;
  message: string;
}

export interface Step3ResultProps {
  data: ResultData;
  onBack: () => void;
  onNext: () => void;
}

const Step3Result: React.FC<Step3ResultProps> = ({ data, onBack, onNext }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Étape 3 : Résultats</h2>
      <div className="p-4 bg-green-100 rounded">
        <p className="text-lg font-semibold">Score d'impact : {data.impactScore}</p>
        <p>{data.message}</p>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Retour
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Continuer
        </button>
      </div>
    </div>
  );
};

export default Step3Result;
