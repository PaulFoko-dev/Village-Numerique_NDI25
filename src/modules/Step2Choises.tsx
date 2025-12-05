// Step2Choises.tsx
import React, { useState, useMemo } from "react";
import { CheckCircle, Zap, Recycle, Server, Users, DollarSign, Leaf, BookOpen, Heart, Shield } from 'lucide-react';

// Les types finaux pour le calculateur restent inchangés
export type ChoicesData = {
  applyLinux: boolean;
  enableReconditioning: boolean;
  secureNetwork: boolean;
};

// Type interne pour stocker toutes les décisions
interface DecisionData extends ChoicesData {
    nirdScore: number;
}

export interface Step2ChoisesProps {
  initialData: ChoicesData;
  onComplete: (data: ChoicesData) => void;
  onBack: () => void;
}

// Composant de Sous-Étape (inchangé)
interface ChoiceOption {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
    impact: Partial<ChoicesData> & { scoreBoost: number };
}

interface SubStepContent {
    step: number;
    title: string;
    scenario: string;
    options: ChoiceOption[];
}

interface SubStepComponentProps extends SubStepContent {
    selectedOptionId: string | null;
    onSelect: (optionId: string) => void;
}

const SubStepComponent: React.FC<SubStepComponentProps> = ({ 
    step, title, scenario, options, selectedOptionId, onSelect
}) => (
    <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Défi {step} : {title}
        </h3>
        
        {/* Le Scénario Narratif */}
        <p className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-gray-700 italic">
            {scenario}
        </p>

        <p className="text-md font-medium text-gray-700">Choisissez l'approche de votre Village Numérique :</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map(option => (
                <button
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    className={`flex items-start p-4 border-2 rounded-lg transition duration-200 text-left h-full 
                                ${selectedOptionId === option.id ? 'border-indigo-600 bg-indigo-50 shadow-lg' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                    <option.icon className={`w-6 h-6 mt-1 mr-3 ${selectedOptionId === option.id ? 'text-indigo-600' : 'text-gray-500'}`} />
                    <div>
                        <span className="text-base font-bold block">{option.label}</span>
                        <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                    </div>
                </button>
            ))}
        </div>
    </div>
);

// -------------------------------------------------------------
// Définition des 12 Défis NIRD
// -------------------------------------------------------------

const STEP_CONTENTS: SubStepContent[] = [
    {
        step: 1,
        title: "Le Coup de Jeune Linux et l'Obsolescence",
        scenario: "30% de votre parc (45 systèmes) est obsolète (fin de support Windows). Racheter ces machines est impossible.",
        options: [
            {
                id: 'A', label: "Le passage complet au Libre", icon: Zap,
                description: "Migration immédiate de tout le parc obsolète vers Linux. (Fort Impact NIRD)",
                impact: { applyLinux: true, scoreBoost: 15 }
            },
            {
                id: 'B', label: "Migration Progressive", icon: CheckCircle,
                description: "Migration de 50% du parc vers Linux. (Impact Modéré)",
                impact: { applyLinux: true, scoreBoost: 8 }
            },
            {
                id: 'C', label: "Achat d'occasion", icon: DollarSign,
                description: "Achat de licences d'occasion compatibles pour gagner du temps. (Faible Impact NIRD)",
                impact: { scoreBoost: 2 }
            },
        ],
    },
    {
        step: 2,
        title: "L'Atelier de Réemploi et les Compétences",
        scenario: "Le NIRD propose d'ouvrir un 'Atelier de Réemploi' pour reconditionner le matériel existant et former les élèves.",
        options: [
            {
                id: 'A', label: "Atelier Permanent", icon: Recycle,
                description: "Mise en place d'un atelier permanent inclus dans les parcours pédagogiques. (Fort Impact Durabilité & Inclusion)",
                impact: { enableReconditioning: true, scoreBoost: 15 }
            },
            {
                id: 'B', label: "Formation des Techniciens", icon: Users,
                description: "Formation intensive des techniciens pour reconditionner en interne. (Impact Modéré)",
                impact: { enableReconditioning: true, scoreBoost: 7 }
            },
            {
                id: 'C', label: "Externalisation", icon: Server,
                description: "Sous-traitance du reconditionnement à une entreprise locale. (Impact Faible)",
                impact: { scoreBoost: 3 }
            },
        ],
    },
    {
        step: 3,
        title: "Souveraineté des Données Critiques",
        scenario: "Vos données pédagogiques sont hébergées par des fournisseurs Cloud étrangers. Vous devez agir pour la souveraineté et la sécurité.",
        options: [
            {
                id: 'A', label: "Migration vers les Comités", icon: Server,
                description: "Migration vers des solutions libres hébergées par des acteurs publics français. (Fort Impact Responsabilité)",
                impact: { secureNetwork: true, scoreBoost: 15 }
            },
            {
                id: 'B', label: "Utilisation du Libre pour les Services", icon: Zap,
                description: "Adoption de logiciels libres pour les services clés sur serveurs internes. (Impact Modéré)",
                impact: { secureNetwork: true, scoreBoost: 8 }
            },
            {
                id: 'C', label: "Renforcement des Contrats", icon: CheckCircle,
                description: "Renforcement des clauses de protection des données avec les fournisseurs actuels. (Faible Impact)",
                impact: { scoreBoost: 2 }
            },
        ],
    },
    {
        step: 4,
        title: "Le Choix des Logiciels Pédagogiques",
        scenario: "Un éditeur vous propose un abonnement annuel pour 5000€/an. L'équivalent libre existe, mais demande de la formation.",
        options: [
            {
                id: 'A', label: "Le Libre Forme l'Humain", icon: Users,
                description: "Investissement dans la formation des enseignants pour le logiciel libre, économisant 5000€/an. (Impact Responsabilité)",
                impact: { scoreBoost: 10 }
            },
            {
                id: 'B', label: "Confort vs Coût", icon: DollarSign,
                description: "Maintien de l'abonnement pour la facilité d'usage. (Impact Négatif)",
                impact: { scoreBoost: -5 }
            },
        ],
    },
    {
        step: 5,
        title: "L'Énergie du Numérique",
        scenario: "Les serveurs informatiques du lycée tournent 24h/24. L'ambition NIRD est la sobriété énergétique.",
        options: [
            {
                id: 'A', label: "Extinction Programmée", icon: Leaf,
                description: "Mise en place d'une extinction programmée des serveurs la nuit et le week-end, si possible. (Fort Impact Durabilité)",
                impact: { scoreBoost: 12 }
            },
            {
                id: 'B', label: "Optimisation Logicielle", icon: Zap,
                description: "Optimisation de l'OS des serveurs (sous Linux/Libre) pour une consommation plus faible. (Impact Modéré)",
                impact: { scoreBoost: 6 }
            },
            {
                id: 'C', label: "Achat de Compteurs", icon: DollarSign,
                description: "Installation de compteurs pour surveiller la consommation sans agir directement sur les machines. (Impact Faible)",
                impact: { scoreBoost: 3 }
            },
        ],
    },
    {
        step: 6,
        title: "L'Inclusion Numérique et l'Accessibilité",
        scenario: "Une partie de vos ressources numériques n'est pas pleinement accessible aux élèves ayant des besoins spécifiques.",
        options: [
            {
                id: 'A', label: "Audit d'Accessibilité Total", icon: CheckCircle,
                description: "Lancement d'un audit et intégration de l'accessibilité comme critère principal. (Fort Impact Inclusion)",
                impact: { scoreBoost: 10 }
            },
            {
                id: 'B', label: "Concentration sur les Services Clés", icon: Users,
                description: "Amélioration de l'accessibilité des 3 outils numériques les plus utilisés par les élèves. (Impact Modéré)",
                impact: { scoreBoost: 5 }
            },
            {
                id: 'C', label: "Remplacement Matériel", icon: DollarSign,
                description: "Achat de matériel spécialisé pour les élèves concernés uniquement. (Impact Limité)",
                impact: { scoreBoost: 2 }
            },
        ],
    },
    {
        step: 7,
        title: "Sensibilisation et Culture NIRD",
        scenario: "Les élèves et enseignants comprennent mal les enjeux de la sobriété et de la souveraineté numérique.",
        options: [
            {
                id: 'A', label: "Programme Pédagogique Intégral", icon: BookOpen,
                description: "Intégration des thèmes NIRD dans les cours et création de clubs d'éco-délégués numériques. (Fort Impact Inclusion)",
                impact: { scoreBoost: 12 }
            },
            {
                id: 'B', label: "Communication Interne", icon: Heart,
                description: "Campagnes d'affichage et de mails sporadiques sur l'usage responsable. (Impact Modéré)",
                impact: { scoreBoost: 4 }
            },
        ],
    },
    {
        step: 8,
        title: "Recrutement et Compétences Libres",
        scenario: "Votre petite équipe IT (Audit Etape 1) manque de compétences spécifiques sur les systèmes d'exploitation libres (Linux/BSD).",
        options: [
            {
                id: 'A', label: "Recrutement Expert", icon: Users,
                description: "Recrutement d'un profil expert en logiciels et systèmes libres pour former l'équipe. (Fort Impact Responsabilité)",
                impact: { scoreBoost: 10 }
            },
            {
                id: 'B', label: "Formation Externe", icon: BookOpen,
                description: "Envoi de l'équipe existante en formation coûteuse sur les systèmes libres. (Impact Modéré)",
                impact: { scoreBoost: 6 }
            },
            {
                id: 'C', label: "Dépendance aux Tutos", icon: Zap,
                description: "Dépendance aux tutoriels en ligne et support communautaire pour la montée en compétence. (Risqué/Faible Impact)",
                impact: { scoreBoost: 2 }
            },
        ],
    },
    {
        step: 9,
        title: "Gestion des Données Personnelles",
        scenario: "L'utilisation de certains services pédagogiques étrangers pose des questions sur la conformité RGPD de vos élèves.",
        options: [
            {
                id: 'A', label: "Audit RGPD et Remplacement", icon: Shield,
                description: "Audit immédiat et remplacement des services non conformes par des solutions souveraines/publiques. (Fort Impact Responsabilité)",
                impact: { scoreBoost: 12 }
            },
            {
                id: 'B', label: "Avis Légal", icon: CheckCircle,
                description: "Demande d'un avis juridique sur la conformité sans changer les outils. (Impact Modéré)",
                impact: { scoreBoost: 5 }
            },
        ],
    },
    {
        step: 10,
        title: "Le Green IT Matériel",
        scenario: "Lors de l'achat de 20 nouveaux ordinateurs, vous avez le choix entre le fournisseur classique et un fournisseur local spécialisé en matériel 'Green IT' (matériaux recyclés, faible impact).",
        options: [
            {
                id: 'A', label: "Priorité Écologique", icon: Leaf,
                description: "Achat auprès du fournisseur Green IT, même si légèrement plus cher, pour un impact durable maximal. (Fort Impact Durabilité)",
                impact: { scoreBoost: 10 }
            },
            {
                id: 'B', label: "Priorité Budget", icon: DollarSign,
                description: "Achat auprès du fournisseur classique le moins cher. (Impact Négatif)",
                impact: { scoreBoost: -3 }
            },
        ],
    },
    {
        step: 11,
        title: "Mutualisation des Ressources",
        scenario: "Vous utilisez plusieurs logiciels propriétaires pour des tâches simples (ex: retouche photo, tableur). L'équivalent libre existe et peut être mutualisé sur la Forge NIRD.",
        options: [
            {
                id: 'A', label: "Migration Complète", icon: Zap,
                description: "Migration de tous les logiciels propriétaires vers des solutions libres mutualisables (ex: GIMP, LibreOffice). (Fort Impact Autonomie)",
                impact: { scoreBoost: 10 }
            },
            {
                id: 'B', label: "Migration Partielle", icon: CheckCircle,
                description: "Migration uniquement des outils les plus coûteux vers le libre. (Impact Modéré)",
                impact: { scoreBoost: 5 }
            },
        ],
    },
    {
        step: 12,
        title: "Partage et Communauté NIRD",
        scenario: "Votre établissement a développé un excellent guide pour la migration Linux. Le partager en licence libre sur la Forge des communs NIRD permettrait d'aider d'autres villages.",
        options: [
            {
                id: 'A', label: "Partage Ouvert et Libre", icon: Recycle,
                description: "Publication immédiate du guide en licence libre. Co-construction et entraide maximale. (Fort Impact Communauté)",
                impact: { scoreBoost: 15 }
            },
            {
                id: 'B', label: "Partage Limité", icon: Server,
                description: "Partage du guide uniquement avec les établissements de votre académie. (Faible Impact Communauté)",
                impact: { scoreBoost: 5 }
            },
        ],
    },
];

// -------------------------------------------------------------
// Composant Step2Choises Principal
// -------------------------------------------------------------

const Step2Choises: React.FC<Step2ChoisesProps> = ({ initialData, onComplete, onBack }) => {
    
    // Assurez-vous que l'initialData est bien un objet ChoicesData complet
    const initialDecisions: DecisionData = { 
        ...initialData, 
        nirdScore: 0
    };
    
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [decisions, setDecisions] = useState<DecisionData>(initialDecisions);
    
    // État pour stocker les IDs des options sélectionnées pour chaque défi
    const [selections, setSelections] = useState<Record<number, string>>(
        STEP_CONTENTS.reduce((acc, content) => ({ ...acc, [content.step]: "" }), {})
    );
    
    const currentStepContent = useMemo(() => STEP_CONTENTS.find(c => c.step === currentStep), [currentStep]);
    
    // Fonction pour gérer la sélection d'un choix dans une sous-étape (inchangé)
    const handleSelectOption = (optionId: string) => {
        if (!currentStepContent) return;
        
        // Met à jour la sélection de la sous-étape
        setSelections(prev => ({ ...prev, [currentStep]: optionId }));
    };

    // Fonction de navigation "Suivant"
    const handleNextStep = () => {
        if (!currentStepContent) return;

        const selectedOptionId = selections[currentStep];
        const option = currentStepContent.options.find(o => o.id === selectedOptionId);
        
        if (!option) {
            // Pas d'alert dans un composant, mais un message d'erreur utilisateur serait mieux
            // Pour l'exercice on laisse le bouton disabled.
            return;
        }
        
        // 1. Appliquer l'impact de l'option à l'état global (score et choix binaires)
        // NOTE IMPORTANTE: Pour gérer le score à rebours (si on recule), il faudrait
        // stocker le score de chaque choix dans l'état selections et déduire/ajouter.
        // Ici, on fait le calcul cumulatif sans déduction pour simplifier.
        setDecisions(prev => {
            const newScore = prev.nirdScore + option.impact.scoreBoost;
            
            // Les choix binaires sont 'true' si au moins une option les a activés.
            const newDecisions = {
                ...prev,
                nirdScore: newScore,
                applyLinux: prev.applyLinux || (option.impact.applyLinux ?? false),
                enableReconditioning: prev.enableReconditioning || (option.impact.enableReconditioning ?? false),
                secureNetwork: prev.secureNetwork || (option.impact.secureNetwork ?? false),
            };
            return newDecisions;
        });

        // 2. Passage à l'étape suivante ou Complétion
        if (currentStep < STEP_CONTENTS.length) {
            setCurrentStep(currentStep + 1);
        } else {
            // FIN : on passe les choix binaires finaux à App.tsx pour le calcul
            const finalChoices: ChoicesData = {
                applyLinux: decisions.applyLinux || (option.impact.applyLinux ?? false),
                enableReconditioning: decisions.enableReconditioning || (option.impact.enableReconditioning ?? false),
                secureNetwork: decisions.secureNetwork || (option.impact.secureNetwork ?? false),
            };
            onComplete(finalChoices);
        }
    };
    
    // Fonction de navigation "Précédent"
    const handleNavigationBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            // NOTE: Le score cumulé ne sera pas déduit, mais c'est acceptable pour un quiz simple.
        } else {
            onBack(); // Retour à l'étape 1
        }
    };
    
    if (!currentStepContent) {
        return <div className="p-8 text-center">Calcul des impacts...</div>;
    }

    const isLastStep = currentStep === STEP_CONTENTS.length;
    const isOptionSelected = selections[currentStep] !== "";

    return (
        <div className="space-y-6 p-6 relative max-h-[75vh] overflow-y-auto">
            <h2 className="text-2xl font-extrabold text-green-700">
                2. Les Défis de la Résistance NIRD
            </h2>
            <p className="text-gray-600">
                Étape {currentStep} sur {STEP_CONTENTS.length}. Répondez aux défis pour construire votre stratégie NIRD.
            </p>

            {/* Affichage de la Sous-Étape */}
            <SubStepComponent 
                {...currentStepContent}
                selectedOptionId={selections[currentStep]}
                onSelect={handleSelectOption}
            />

            {/* Barres de progression et Navigation */}
            <div className="mt-8 pt-4 border-t bg-white sticky bottom-0">
                {/* Barre de Progression */}
                <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                    <div 
                        className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${(currentStep / STEP_CONTENTS.length) * 100}%` }}
                    ></div>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={handleNavigationBack}
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-150 font-semibold disabled:opacity-50"
                        disabled={currentStep === 1}
                    >
                        &larr; Précédent
                    </button>
                    
                    <button
                        onClick={handleNextStep}
                        className={`px-6 py-2 text-white font-semibold rounded-lg transition duration-150 shadow-md ${isOptionSelected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!isOptionSelected}
                    >
                        {isLastStep ? 'Lancer la Simulation Finale →' : 'Défi Suivant →'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step2Choises;