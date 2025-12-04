import React from 'react';
import Button from '../components/Button';
import { ShieldCheck, Leaf, Users } from 'lucide-react'; // Icônes nécessaires

// --- Props pour le composant principal ---
interface Step1AuditProps {
  onStartQuiz: () => void; // Fonction pour démarrer le quiz (passer à l'Écran 3/Pilier 1)
}

// --- Composant Card pour un Pilier ---
interface PilierCardProps {
  Icon: React.ElementType; // Type générique pour une icône Lucide ou autre
  title: string;
  description: string;
  iconColor: string; // Tailwind class pour la couleur de l'icône
}

const PilierCard: React.FC<PilierCardProps> = ({ Icon, title, description, iconColor }) => (
  <div className="flex flex-col items-start p-6 bg-white rounded-lg transition-shadow hover:shadow-xl h-full border border-gray-100">
    <div className={`p-2 rounded-full ${iconColor} bg-opacity-10 mb-4`}>
      <Icon className={`w-8 h-8 ${iconColor}`} />
    </div>
    
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    
    {/* Étiquette "5 questions" */}
    <div className="mt-auto text-sm font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
      5 questions
    </div>
  </div>
);

// --- Composant Principal (Step1Audit.tsx) ---
const Step1Audit: React.FC<Step1AuditProps> = ({ onStartQuiz }) => {

  // Données structurées des piliers pour le rendu
  const piliers = [
    {
      Icon: ShieldCheck, // Icône pour Responsabilité/Éthique
      title: "Pilier 1 : Responsabilité",
      description: "Évaluez votre engagement éthique, la conformité de vos pratiques et votre contribution sociale.",
      iconColor: "text-green-500", // Couleur de l'icône et du cercle
    },
    {
      Icon: Leaf, // Icône pour Durabilité/Écologie
      title: "Pilier 2 : Durabilité",
      description: "Mesurez l'impact environnemental de vos activités numériques et vos efforts pour une sobriété éco-responsable.",
      iconColor: "text-blue-500", // Nouvelle couleur pour démarquer (si désiré)
    },
    {
      Icon: Users, // Icône pour Inclusion/Communauté
      title: "Pilier 3 : Inclusion",
      description: "Analysez l'accessibilité de vos outils, la diversité de vos équipes et l'équité de vos actions.",
      iconColor: "text-purple-500", // Couleur de l'icône et du cercle
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Étape 1 : Audit de votre établissement</h2>

      <div className="flex flex-col space-y-2">
        <label>Nombre total de systèmes informatiques</label>
        <input
          type="number"
          name="systemCount"
          value={form.systemCount}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
      </div>

        {/* Pied de Page et Bouton d'Action */}
        <div className="flex flex-col items-center">
          <p className="text-base text-gray-700 mb-4">Prêt à relever le défi NIRD ?</p>
          
          {/* Le bouton d'action */}
          <Button onClick={onStartQuiz}>
            Commencer le Pilier 1 : Responsabilité
          </Button>
        </div>
      </div>

      <button
        onClick={() => onComplete(form)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Suivant
      </button>
    </div>
  );
};

export default Step1Audit;