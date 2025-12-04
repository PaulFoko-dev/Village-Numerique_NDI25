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
   