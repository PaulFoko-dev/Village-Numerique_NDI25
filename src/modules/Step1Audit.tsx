// import React from 'react';
// import Button from '../components/Button';
// import { ShieldCheck, Leaf, Users } from 'lucide-react'; // Icônes nécessaires

// // --- Props pour le composant principal ---
// interface Step1AuditProps {
//   onStartQuiz: () => void; // Fonction pour démarrer le quiz (passer à l'Écran 3/Pilier 1)
// }

// // --- Composant Card pour un Pilier ---
// interface PilierCardProps {
//   Icon: React.ElementType; // Type générique pour une icône Lucide ou autre
//   title: string;
//   description: string;
//   iconColor: string; // Tailwind class pour la couleur de l'icône
// }

// const PilierCard: React.FC<PilierCardProps> = ({ Icon, title, description, iconColor }) => (
//   <div className="flex flex-col items-start p-6 bg-white rounded-lg transition-shadow hover:shadow-xl h-full border border-gray-100">
//     <div className={`p-2 rounded-full ${iconColor} bg-opacity-10 mb-4`}>
//       <Icon className={`w-8 h-8 ${iconColor}`} />
//     </div>
    
//     <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    
//     <p className="text-sm text-gray-600 mb-4">{description}</p>
    
//     {/* Étiquette "5 questions" */}
//     <div className="mt-auto text-sm font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
//       5 questions
//     </div>
//   </div>
// );

// // --- Composant Principal (Step1Audit.tsx) ---
// const Step1Audit: React.FC<Step1AuditProps> = ({ onStartQuiz }) => {

//   // Données structurées des piliers pour le rendu
//   const piliers = [
//     {
//       Icon: ShieldCheck, // Icône pour Responsabilité/Éthique
//       title: "Pilier 1 : Responsabilité",
//       description: "Évaluez votre engagement éthique, la conformité de vos pratiques et votre contribution sociale.",
//       iconColor: "text-green-500", // Couleur de l'icône et du cercle
//     },
//     {
//       Icon: Leaf, // Icône pour Durabilité/Écologie
//       title: "Pilier 2 : Durabilité",
//       description: "Mesurez l'impact environnemental de vos activités numériques et vos efforts pour une sobriété éco-responsable.",
//       iconColor: "text-blue-500", // Nouvelle couleur pour démarquer (si désiré)
//     },
//     {
//       Icon: Users, // Icône pour Inclusion/Communauté
//       title: "Pilier 3 : Inclusion",
//       description: "Analysez l'accessibilité de vos outils, la diversité de vos équipes et l'équité de vos actions.",
//       iconColor: "text-purple-500", // Couleur de l'icône et du cercle
//     },
//   ];

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold">Étape 1 : Audit de votre établissement</h2>

//       <div className="flex flex-col space-y-2">
//         <label>Nombre total de systèmes informatiques</label>
//         <input
//           type="number"
//           name="systemCount"
//           value={form.systemCount}
//           onChange={handleChange}
//           className="border rounded px-2 py-1"
//         />
//       </div>

//         {/* Pied de Page et Bouton d'Action */}
//         <div className="flex flex-col items-center">
//           <p className="text-base text-gray-700 mb-4">Prêt à relever le défi NIRD ?</p>
          
//           {/* Le bouton d'action */}
//           <Button onClick={onStartQuiz}>
//             Commencer le Pilier 1 : Responsabilité
//           </Button>
//         </div>
//       </div>

//       <button
//         onClick={() => onComplete(form)}
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//       >
//         Suivant
//       </button>
//     </div>
//   );
// };

// export default Step1Audit;
import React, { useState } from 'react';
import Button from '../components/Button';
import { ShieldCheck, Leaf, Users } from 'lucide-react';
import bg_img from "../assets/img/le-village-d-asterix.jpg"

// Import du type AuditData
export type AuditData = {
  systemCount: number;
  outdatedSystems: number;
  budget: number;
};

interface Step1AuditProps {
  initialData: AuditData; // Ajouté pour correspondre à l'appel dans App.tsx
  onComplete: (data: AuditData) => void; // Ajouté pour correspondre à l'appel dans App.tsx
}

interface PilierCardProps {
  Icon: React.ElementType;
  title: string;
  description: string;
  iconColor: string;
}

const PilierCard: React.FC<PilierCardProps> = ({ Icon, title, description, iconColor }) => (
  <div className="flex flex-col items-start p-6 bg-white rounded-lg transition-shadow hover:shadow-xl h-full border border-gray-100">
    <div className={`p-2 rounded-full ${iconColor} bg-opacity-10 mb-4`}>
      <Icon className={`w-8 h-8 ${iconColor}`} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="mt-auto text-sm font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
      5 questions
    </div>
  </div>
);

const Step1Audit: React.FC<Step1AuditProps> = ({ initialData, onComplete }) => {
  // Ajout de l'état local pour simuler la saisie des données d'audit
  const [auditInput, setAuditInput] = useState<AuditData>(initialData);

  const piliers = [
    {
      Icon: ShieldCheck,
      title: "Pilier 1 : Responsabilité",
      description: "Évaluez votre engagement éthique, la conformité de vos pratiques et votre contribution sociale.",
      iconColor: "text-green-500",
    },
    {
      Icon: Leaf,
      title: "Pilier 2 : Durabilité",
      description: "Mesurez l'impact environnemental de vos activités numériques et vos efforts pour une sobriété éco-responsable.",
      iconColor: "text-blue-500",
    },
    {
      Icon: Users,
      title: "Pilier 3 : Inclusion",
      description: "Analysez l'accessibilité de vos outils, la diversité de vos équipes et l'équité de vos actions.",
      iconColor: "text-purple-500",
    },
  ];

  // Simuler la saisie des données ou la validation du quiz (pour la démo)
  const handleStartQuiz = () => {
    // Dans une vraie application, on collecterait les données ici.
    // Pour l'instant, on utilise les données initiales (ou modifiées) et on passe à l'étape suivante.
    onComplete(auditInput);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuditInput(prev => ({
        ...prev,
        [name]: Number(value),
    }));
  }

  return (
    <div className="space-y-6 min-h-full">
      {/* 1. L'image de fond animée */}
      <img
          src={bg_img}
          alt="Illustration de fond animée"
          className="absolute bottom-4 right-4 w-[20%] h-auto animate-[slideIn_2s_ease-in-out_forwards,_floating_8s_ease-in-out_infinite] hidden md:block"
      />
      <h2 className="text-2xl font-bold text-gray-900">1. Audit et Données Initiales</h2>
      <p className="text-gray-600">Entrez les données de votre établissement pour lancer la simulation d'impact, puis découvrez vos trois piliers.</p>
      
      {/* Saisie des données (Ajout pour la cohérence avec le calcul) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
            <label className="block text-sm font-medium text-gray-700">Total de systèmes</label>
            <input 
                type="number" 
                name="systemCount" 
                value={auditInput.systemCount} 
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                min="0"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Systèmes obsolètes</label>
            <input 
                type="number" 
                name="outdatedSystems" 
                value={auditInput.outdatedSystems} 
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                min="0"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Budget Licences (€)</label>
            <input 
                type="number" 
                name="budget" 
                value={auditInput.budget} 
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                min="0"
            />
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {piliers.map((p, idx) => (
          <PilierCard key={idx} {...p} />
        ))}
      </div>

      <div className="flex flex-col items-center mt-6">
        <p className="text-base text-gray-700 mb-4">Prêt à évaluer l'impact des choix NIRD ?</p>
        <Button onClick={handleStartQuiz}>
          Continuer vers les choix de stratégies &rarr;
        </Button>
      </div>
    </div>
  );
};

export default Step1Audit;