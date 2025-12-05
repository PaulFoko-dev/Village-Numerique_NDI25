// data.ts

import type { AuditData } from "../modules/Step1Audit"; // Assurez-vous d'avoir le bon chemin
import type { ChoicesData } from "../modules/Step2Choises"; // Assurez-vous d'avoir le bon chemin

// Le type complet pour l'audit incluant les nouveaux champs
type FullAuditData = AuditData & {
  itStaffCount: number;
  externalDataPercent: number;
};

// Les types sont définis dans les modules, ici on utilise un objet local pour les types
// pour éviter les erreurs d'import circulaire si c'est un fichier de constantes/utils

export const data = {
    // ----------------------------------------------------
    // VALEURS PAR DÉFAUT
    // ----------------------------------------------------
    defaultAudit: {
        systemCount: 150,    // Total de systèmes
        outdatedSystems: 45, // Systèmes obsolètes (30%)
        budget: 10000,       // Budget annuel de licences (€)
        itStaffCount: 2,     // NOUVEAU: Équipe IT (personnes)
        externalDataPercent: 70, // NOUVEAU: % de données critiques sur Cloud externe
    } as FullAuditData, // Cast pour s'assurer du type complet
    
    defaultChoices: {
        applyLinux: false,
        enableReconditioning: false,
        secureNetwork: false,
    } as ChoicesData,
    
    // ----------------------------------------------------
    // CONSTANTES POUR LE CALCUL D'IMPACT
    // ----------------------------------------------------
    COSTS: {
        LICENSE_COST_PER_SYSTEM_YEAR: 120, // Coût annuel estimé pour les licences OS + Office
        RECONDITIONING_SAVINGS_PER_SYSTEM: 250, // Économie par machine reconditionnée vs achat neuf
        LICENSE_COST_FOR_SECURE_NETWORK: 0, // Les solutions libres n'ont pas de coût de licence direct
        INITIAL_INVESTMENT_SECURE_NETWORK: 300, // Coût minimal estimé pour la sécurisation/migration (ex: serveur local)
        EXTERNAL_DATA_RISK_COST_PERCENT: 0.05, // Coût potentiel de risque si externalDataPercent est élevé (5% du budget annuel)
    },
    IMPACT_FACTORS: {
        LINUX_MIGRATION_RATE: 0.70, // 70% des systèmes obsolètes peuvent passer sous Linux
        RECONDITIONING_RATE: 0.40, // Taux de reconditionnement réussi sur les systèmes obsolètes
        
        // NOUVEAUX FACTEURS DE BASE POUR LE CALCUL DU SCORE INITIAL
        BASE_DEPENDENCY: 50, // Dépendance de base d'un établissement
        OBSOLESCENCE_IMPACT: 30, // Impact max de l'obsolescence (ajoute jusqu'à 30 points)
        EXTERNAL_DATA_IMPACT: 20, // Impact max du cloud externe (ajoute jusqu'à 20 points)
    },

    tips: [
      "Réutiliser les ordinateurs existants",
      "Installer Linux pour prolonger la durée de vie",
      "Mutualiser les ressources entre classes et établissements",
      "Sécuriser le réseau pour limiter les risques",
      "Éviter les solutions Cloud étrangères pour les données critiques.",
    ],
};