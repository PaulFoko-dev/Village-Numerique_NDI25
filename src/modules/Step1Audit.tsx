// Step1Audit.tsx
import React, { useState } from 'react';
import Button from '../components/Button';
import { ShieldCheck, Leaf, Users } from 'lucide-react';
import bg_img from '../assets/img/le-village-d-asterix.jpg';

export type AuditData = {
  systemCount: number;
  outdatedSystems: number;
  budget: number;
};

interface Step1AuditProps {
  initialData: AuditData;
  onComplete: (data: AuditData) => void;
}

interface PilierCardProps {
  Icon: React.ElementType;
  title: string;
  description: string;
  iconColor: string;
}

const PilierCard: React.FC<PilierCardProps> = ({ Icon, title, description, iconColor }) => (
  <div className="flex flex-col p-5 bg-white rounded-lg border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="flex items-center gap-2 mb-3">
      <span className={`inline-flex items-center justify-center p-2 rounded-full bg-gray-100`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </span>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="mt-auto text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
      5 questions
    </div>
  </div>
);

const Step1Audit: React.FC<Step1AuditProps> = ({ initialData, onComplete }) => {
  const [auditInput, setAuditInput] = useState<AuditData>(initialData);

  const piliers = [
    {
      Icon: ShieldCheck,
      title: 'Pilier 1 : Responsabilité',
      description:
        "Évaluez votre engagement éthique, la conformité de vos pratiques et votre contribution sociale.",
      iconColor: 'text-green-600',
    },
    {
      Icon: Leaf,
      title: 'Pilier 2 : Durabilité',
      description:
        "Mesurez l'impact environnemental de vos activités numériques et vos efforts pour une sobriété éco-responsable.",
      iconColor: 'text-blue-600',
    },
    {
      Icon: Users,
      title: 'Pilier 3 : Inclusion',
      description:
        "Analysez l'accessibilité de vos outils, la diversité de vos équipes et l'équité de vos actions.",
      iconColor: 'text-purple-600',
    },
  ];

  const handleStartQuiz = () => onComplete(auditInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Empêche les valeurs négatives et énorme dépassement
    const num = Math.max(0, Number(value));
    setAuditInput(prev => ({ ...prev, [name]: num }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Modal wrapper */}
      <div className="relative bg-white w-full max-w-screen-lg mx-auto rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header decor + safe area */}
        <div className="relative">
          {/* Décor: image en fond, cachée en <sm, taille maîtrisée sinon */}
          <img
            src={bg_img}
            alt="Décor village"
            className="absolute -top-6 -right-6 hidden md:block w-40 lg:w-56 opacity-15 pointer-events-none select-none"
          />
          <div className="px-5 sm:px-6 lg:px-8 pt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              1. Audit et Données Initiales
            </h2>
            <p className="text-gray-600 mt-1">
              Entrez les données de votre établissement pour lancer la simulation d&apos;impact, puis
              découvrez vos trois piliers.
            </p>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="px-5 sm:px-6 lg:px-8 pb-6 max-h-[75vh] overflow-y-auto">
          {/* Formulaire */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total de systèmes
              </label>
              <input
                type="number"
                name="systemCount"
                inputMode="numeric"
                min={0}
                value={auditInput.systemCount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Systèmes obsolètes
              </label>
              <input
                type="number"
                name="outdatedSystems"
                inputMode="numeric"
                min={0}
                value={auditInput.outdatedSystems}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget Licences (€)
              </label>
              <input
                type="number"
                name="budget"
                inputMode="numeric"
                min={0}
                value={auditInput.budget}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Cartes des piliers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {piliers.map((p, idx) => (
              <PilierCard key={idx} {...p} />
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center mt-6">
            <p className="text-base text-gray-700 mb-4 text-center">
              Prêt à évaluer l&apos;impact des choix NIRD ?
            </p>
            <Button onClick={handleStartQuiz}>Continuer vers les choix de stratégies →</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Audit;
