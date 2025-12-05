// calculator.ts
import type { AuditData } from "../modules/Step1Audit";
import type { ChoicesData } from "../modules/Step2Choises";
import { data } from "./data"; // Importer le fichier de constantes mis à jour

export type ResultData = {
  impactScore: number;
  message: string;
  moneySaved: number;
};

export const calculator = (audit: AuditData, choices: ChoicesData): ResultData => {
  
  // Utilisation des constantes
  const { COSTS, IMPACT_FACTORS } = data;
  
  const obsolescenceRate =
    audit.systemCount > 0 ? audit.outdatedSystems / audit.systemCount : 0;
  
  // ----------------------------------------------------
  // 1. CALCUL DE LA DÉPENDANCE INITIALE
  // ----------------------------------------------------
  
  // Dépendance de base
  let initialDependency = IMPACT_FACTORS.BASE_DEPENDENCY; 

  // Impact de l'obsolescence (plus de machines obsolètes = plus de dépendance à l'achat)
  initialDependency += obsolescenceRate * IMPACT_FACTORS.OBSOLESCENCE_IMPACT;

  // Impact du Cloud Externe (plus de données externes = moins de souveraineté)
  const externalDataRate = audit.externalDataPercent / 100;
  initialDependency += externalDataRate * IMPACT_FACTORS.EXTERNAL_DATA_IMPACT;

  // S'assurer que la dépendance initiale reste dans les limites
  initialDependency = Math.max(0, Math.min(100, initialDependency));

  // ----------------------------------------------------
  // 2. CALCUL DU GAIN D'AUTONOMIE ET DES ÉCONOMIES
  // ----------------------------------------------------

  let autonomyGain = 0;
  let moneySaved = 0;
  
  // A. Choix: Coup de Jeune Linux
  if (choices.applyLinux) {
    const migratedMachines = Math.round(audit.outdatedSystems * IMPACT_FACTORS.LINUX_MIGRATION_RATE);
    // Gain d'autonomie significatif (logiciel libre + prolongation de vie)
    autonomyGain += 20; 
    // Économie : licences évitées
    moneySaved += migratedMachines * COSTS.LICENSE_COST_PER_SYSTEM_YEAR;
  }

  // B. Choix: Atelier de Réemploi
  if (choices.enableReconditioning) {
    const reconditionedMachines = Math.round(audit.outdatedSystems * IMPACT_FACTORS.RECONDITIONING_RATE);
    // Gain d'autonomie (maîtrise du matériel + réduction de l'achat)
    autonomyGain += 15;
    // Économie : remplacement matériel neuf évité
    moneySaved += reconditionedMachines * COSTS.RECONDITIONING_SAVINGS_PER_SYSTEM;
  }

  // C. Choix: Souveraineté des Données
  if (choices.secureNetwork) {
    // Gain d'autonomie (souveraineté + sécurité)
    autonomyGain += 15;
    
    // Économie : Risque réduit lié au cloud externe + coût de licence des solutions propriétaires
    const dataRiskCost = audit.budget * externalDataRate * COSTS.EXTERNAL_DATA_RISK_COST_PERCENT;
    
    // Si l'établissement utilisait des licences pour le réseau (ex: VPN, monitoring)
    const networkLicenseSavings = 1000; // Estimation minimale
    
    moneySaved += dataRiskCost + networkLicenseSavings; 
    
    // Coût initial pour la migration/sécurisation (soustraire de l'économie si l'on veut être précis)
    // moneySaved -= COSTS.INITIAL_INVESTMENT_SECURE_NETWORK; 
  }
  
  // ----------------------------------------------------
  // 3. RÉSULTAT FINAL
  // ----------------------------------------------------

  let adjustedDependency = initialDependency - autonomyGain;
  adjustedDependency = Math.max(0, Math.min(100, adjustedDependency));

  // Le score NIRD est l'inverse de la dépendance ajustée
  const finalScore = Math.round(100 - adjustedDependency);

  let message = "";
  if (finalScore < 40) {
    message =
      "Faible Résistance : Votre établissement reste fortement dépendant des solutions propriétaires. Une stratégie NIRD est nécessaire pour renforcer votre autonomie.";
  } else if (finalScore < 70) {
    message =
      "Résistance Modérée : Vous êtes sur la voie de l'autonomie numérique ! Continuez d'optimiser vos infrastructures et vos pratiques pour sécuriser vos données et prolonger la vie de votre matériel.";
  } else if (finalScore < 90) {
    message =
      "Forte Résistance : Votre établissement montre un excellent niveau de résilience numérique. Les données et outils sont mieux maîtrisés. Poursuivez vos efforts pour devenir un modèle de sobriété.";
  } else {
    message =
      "Village Résistant Parfait : Votre établissement est quasiment souverain et peut devenir une référence du Village-Numérique. Concentrez-vous sur le partage d'expérience!";
  }

  return {
    impactScore: finalScore,
    message,
    moneySaved: Math.round(moneySaved),
  };
};