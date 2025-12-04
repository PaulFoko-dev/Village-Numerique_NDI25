import React, { useState } from "react";
import Modal from "./modules/Modal";
import Step1Audit from "./modules/Step1Audit";
import type { AuditData } from "./modules/Step1Audit";
import Step2Choises from "./modules/Step2Choises";
import type { ChoicesData } from "./modules/Step2Choises";
import Step3Result from "./modules/Step3Result";
import type { ResultData } from "./modules/Step3Result";
import Step4Community from "./modules/Step4Community";
import { calculator } from "./utils/calculator";

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [auditData, setAuditData] = useState<AuditData>({
    systemCount: 0,
    outdatedSystems: 0,
    budget: 0,
  });

  const [choicesData, setChoicesData] = useState<ChoicesData>({
    applyLinux: false,
    enableMonitoring: false,
    secureNetwork: false,
  });

  const [resultData, setResultData] = useState<ResultData | null>(null);

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCompleteAudit = (data: AuditData) => {
    setAuditData(data);
    handleNextStep();
  };

  const handleCompleteChoices = (data: ChoicesData) => {
    setChoicesData(data);
    const result = calculator(auditData, data);
    setResultData(result);
    handleNextStep();
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAuditData({ systemCount: 0, outdatedSystems: 0, budget: 0 });
    setChoicesData({ applyLinux: false, enableMonitoring: false, secureNetwork: false });
    setResultData(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {!showModal && (
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold">🌐 Village Numérique</h1>
          <p className="text-gray-700">
            Découvrez comment un établissement scolaire peut devenir autonome et résistant face aux Big Tech.
          </p>
          <button
            onClick={() => { handleReset(); setShowModal(true); }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            🚀 Lancer le simulateur
          </button>
        </div>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {currentStep === 1 && (
            <Step1Audit initialData={auditData} onComplete={handleCompleteAudit} />
          )}
          {currentStep === 2 && (
            <Step2Choises
              initialData={choicesData}
              onBack={handlePrevStep}
              onComplete={handleCompleteChoices}
            />
          )}
          {currentStep === 3 && resultData && (
            <Step3Result data={resultData} onBack={handlePrevStep} onNext={handleNextStep} />
          )}
          {currentStep === 4 && (
            <Step4Community onFinish={() => setShowModal(false)} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default App;
