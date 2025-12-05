import React, { useState } from 'react';
import Button from '../components/Button';
import { ShieldCheck, Leaf, Users, ArrowLeft } from 'lucide-react';
import bg_img from '../assets/img/le-village-d-asterix.jpg';

export type AuditData = {
  systemCount: number;
  outdatedSystems: number;
  budget: number;
  itStaffCount: number;
  externalDataPercent: number;
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
      4 questions
    </div>
  </div>
);

const FormField: React.FC<{
  label: string;
  name: keyof AuditData;
  unit: string;
  min?: number;
  max?: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, unit, min = 0, max, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        type="number"
        name={name}
        id={name}
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border-gray-300 pr-10 focus:border-green-600 focus:ring-green-600 sm:text-sm"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">{unit}</span>
      </div>
    </div>
  </div>
);

const Step1Audit: React.FC<Step1AuditProps> = ({ initialData, onComplete }) => {
  const [auditInput, setAuditInput] = useState<AuditData>(initialData);
  const [subStep, setSubStep] = useState<1 | 2>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let num = Number(value);

    if (name === 'externalDataPercent') {
      num = Math.max(0, Math.min(100, num));
    } else {
      num = Math.max(0, num);
    }

    setAuditInput(prev => ({ ...prev, [name]: num }));
  };

  const handleStartQuiz = () => onComplete(auditInput);

  const piliers = [
    {
      Icon: ShieldCheck,
      title: 'Pilier 1 : Responsabilité',
      description: 'Éthique numérique, protection des données, impact social des technologies.',
      iconColor: 'text-green-600',
    },
    {
      Icon: Leaf,
      title: 'Pilier 2 : Durabilité',
      description:
        'Empreinte environnementale, efficacité énergétique, économie circulaire, longévité des équipements.',
      iconColor: 'text-blue-600',
    },
    {
      Icon: Users,
      title: 'Pilier 3 : Inclusion',
      description:
        "Accessibilité et équité pour tous. Valorisation de la diversité et suppression des barrières numériques.",
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <img src={bg_img} alt="Décor village" className="absolute top-0 right-8 hidden md:block w-[10%] z-0 animate-[slideIn_1.5s_ease-in-out_forwards,_floating_6s_ease-in-out_infinite]" />
        <div className="pt-6 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {subStep === 1 ? '1.1 Découverte des Piliers NIRD' : '1.2 Audit et Données Initiales'}
          </h2>
          <p className="text-gray-600 mt-1">
            {subStep === 1
              ? 'Le référentiel NIRD repose sur trois piliers fondamentaux.'
              : 'Entrez les données clés de votre établissement.'}
          </p>
        </div>
      </div>

      {subStep === 1 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {piliers.map((p, i) => (
              <PilierCard key={i} {...p} />
            ))}
          </div>
          <div className="flex flex-col items-center mt-6">
            <p className="text-base text-gray-700 mb-4 text-center">
              Compris ? Passons à l'audit de votre situation actuelle.
            </p>
            <Button onClick={() => setSubStep(2)}>Démarrer l'audit →</Button>
          </div>
        </>
      )}

      {subStep === 2 && (
        <>
          <div className="p-4 bg-gray-50 rounded-lg space-y-6">
            {/* Matériel */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-md font-semibold mb-3">Inventaire Matériel</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Total systèmes"
                  name="systemCount"
                  unit="syst."
                  value={auditInput.systemCount}
                  onChange={handleChange}
                />
                <FormField
                  label="Systèmes obsolètes"
                  name="outdatedSystems"
                  unit="syst."
                  value={auditInput.outdatedSystems}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Finances */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-md font-semibold mb-3">Finances & RH</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Budget licences"
                  name="budget"
                  unit="€"
                  value={auditInput.budget}
                  onChange={handleChange}
                />
                <FormField
                  label="Équipe IT"
                  name="itStaffCount"
                  unit="pers."
                  value={auditInput.itStaffCount}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Cloud */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-md font-semibold mb-3">Souveraineté</h3>
              <FormField
                label="% données sur Cloud externe"
                name="externalDataPercent"
                unit="%"
                max={100}
                value={auditInput.externalDataPercent}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={() => setSubStep(1)} className="flex items-center gap-2 text-gray-700">
              <ArrowLeft className="w-5 h-5" /> Retour
            </button>
            <Button onClick={handleStartQuiz}>Lancer la simulation →</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Step1Audit;
