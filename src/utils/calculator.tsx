// import type { AuditData } from "../modules/Step1Audit";
// import type { ChoicesData } from "../modules/Step2Choises";
// import type { ResultData } from "../modules/Step3Result";

// export const calculator = (audit: AuditData, choices: ChoicesData): ResultData => {
//   let impactScore = 0;

//   // Impact du nombre de systèmes obsolètes
//   impactScore += audit.systemCount > 0
//     ? Math.max(0, 50 - (audit.outdatedSystems / audit.systemCount) * 50)
//     : 50;

//   // Bonus si Linux est appliqué
//   if (choices.applyLinux) impactScore += 20;

//   // Bonus si monitoring activé
//   if (choices.enableReconditioning) impactScore += 15;

//   // Bonus si réseau sécurisé
//   if (choices.secureNetwork) impactScore += 15;

//   impactScore = Math.min(impactScore, 100); // cap à 100

//   let message = "";
//   if (impactScore < 50) message = "Votre établissement reste très dépendant des Big Tech.";
//   else if (impactScore < 80) message = "Bonne progression, continuez à réduire la dépendance.";
//   else message = "Votre établissement est quasiment autonome et résilient !";

//   return { impactScore: Math.round(impactScore), message };
// };


import type { AuditData } from "../modules/Step1Audit";
import type { ChoicesData } from "../modules/Step2Choises";

export type ResultData = {
  impactScore: number;
  message: string;
  moneySaved: number;
};

export const calculator = (audit: AuditData, choices: ChoicesData): ResultData => {
  const obsolescenceRate =
    audit.systemCount > 0 ? audit.outdatedSystems / audit.systemCount : 0;

  // initial dependency 60..100
  const initialDependency = 60 + obsolescenceRate * 40;

  let autonomyGain = 0;
  let moneySaved = 0;

  if (choices.applyLinux) {
    const migratedMachines = Math.round(audit.outdatedSystems * 0.7);
    autonomyGain += 20;
    moneySaved += migratedMachines * 120;
  }

  if (choices.enableReconditioning) {
    const reconditionedMachines = Math.round(audit.outdatedSystems * 0.4);
    autonomyGain += 15;
    moneySaved += reconditionedMachines * 250;
  }

  if (choices.secureNetwork) {
    autonomyGain += 15;
    moneySaved += 300;
  }

  let adjustedDependency = initialDependency - autonomyGain;
  adjustedDependency = Math.max(0, Math.min(100, adjustedDependency));

  const finalScore = Math.round(100 - adjustedDependency);

  let message = "";
  if (finalScore < 40) {
    message =
      "Votre établissement reste fortement dépendant des Big Tech. Une stratégie NIRD est nécessaire pour renforcer votre autonomie.";
  } else if (finalScore < 70) {
    message =
      "Vous êtes sur la voie de l'autonomie numérique ! Continuez d'optimiser vos infrastructures et vos pratiques.";
  } else if (finalScore < 90) {
    message =
      "Votre établissement montre un excellent niveau de résilience numérique. Les données et outils sont mieux maîtrisés.";
  } else {
    message =
      "Parfait ! Votre établissement est quasiment souverain et peut devenir une référence du Village-Numérique.";
  }

  return {
    impactScore: finalScore,
    message,
    moneySaved: Math.round(moneySaved),
  };
};


// Constantes et valeurs par défaut pour le simulateur
export const data = {
    defaultAudit: {
        systemCount: 150,    // Total de systèmes
        outdatedSystems: 45, // Nombre de systèmes obsolètes (environ 30%)
        budget: 10000,       // Budget annuel de licences
    },
    defaultChoices: {
        applyLinux: false,
        enableReconditioning: false, // RENOMMÉ pour correspondre au scénario
        secureNetwork: false,
    },
    
    // CONSTANTES POUR LE CALCUL D'IMPACT
    COSTS: {
        LICENSE_COST_PER_SYSTEM_YEAR: 120, // Coût annuel estimé pour les licences OS + Office
        RECONDITIONING_SAVINGS_PER_SYSTEM: 250, // Économie par machine reconditionnée vs achat neuf
    },
    IMPACT_FACTORS: {
        LINUX_MIGRATION_RATE: 0.70, // 70% des systèmes obsolètes peuvent passer sous Linux
        RECONDITIONING_RATE: 0.40, // Taux de reconditionnement réussi sur les systèmes obsolètes
    },

    tips: [
      "Réutiliser les ordinateurs existants",
      "Installer Linux pour prolonger la durée de vie",
      "Mutualiser les ressources entre classes et établissements",
      "Sécuriser le réseau pour limiter les risques",
    ],
  };