import type { AuditData } from "../modules/Step1Audit";
import type { ChoicesData } from "../modules/Step2Choises";
import type { ResultData } from "../modules/Step3Result";

export const calculator = (audit: AuditData, choices: ChoicesData): ResultData => {
  let impactScore = 0;

  // Impact du nombre de systèmes obsolètes
  impactScore += audit.systemCount > 0
    ? Math.max(0, 50 - (audit.outdatedSystems / audit.systemCount) * 50)
    : 50;

  // Bonus si Linux est appliqué
  if (choices.applyLinux) impactScore += 20;

  // Bonus si monitoring activé
  if (choices.enableMonitoring) impactScore += 15;

  // Bonus si réseau sécurisé
  if (choices.secureNetwork) impactScore += 15;

  impactScore = Math.min(impactScore, 100); // cap à 100

  let message = "";
  if (impactScore < 50) message = "Votre établissement reste très dépendant des Big Tech.";
  else if (impactScore < 80) message = "Bonne progression, continuez à réduire la dépendance.";
  else message = "Votre établissement est quasiment autonome et résilient !";

  return { impactScore: Math.round(impactScore), message };
};
