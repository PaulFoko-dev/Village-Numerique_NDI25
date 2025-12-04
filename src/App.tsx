// import React, { useState } from "react";
// import Modal from "./modules/Modal";
// import Step1Audit from "./modules/Step1Audit";
// import type { AuditData } from "./modules/Step1Audit";
// import Step2Choises from "./modules/Step2Choises";
// import type { ChoicesData } from "./modules/Step2Choises";
// import Step3Result from "./modules/Step3Result";
// import type { ResultData } from "./modules/Step3Result";
// import Step4Community from "./modules/Step4Community";
// import { calculator } from "./utils/calculator";

// const App: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [showModal, setShowModal] = useState<boolean>(false);

//   const [auditData, setAuditData] = useState<AuditData>({
//     systemCount: 0,
//     outdatedSystems: 0,
//     budget: 0,
//   });

//   const [choicesData, setChoicesData] = useState<ChoicesData>({
//     applyLinux: false,
//     enableMonitoring: false,
//     secureNetwork: false,
//   });

//   const [resultData, setResultData] = useState<ResultData | null>(null);

//   const handleNextStep = () => {
//     if (currentStep < 4) setCurrentStep(currentStep + 1);
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   const handleCompleteAudit = (data: AuditData) => {
//     setAuditData(data);
//     handleNextStep();
//   };

//   const handleCompleteChoices = (data: ChoicesData) => {
//     setChoicesData(data);
//     const result = calculator(auditData, data);
//     setResultData(result);
//     handleNextStep();
//   };

//   const handleReset = () => {
//     setCurrentStep(1);
//     setAuditData({ systemCount: 0, outdatedSystems: 0, budget: 0 });
//     setChoicesData({ applyLinux: false, enableMonitoring: false, secureNetwork: false });
//     setResultData(null);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       {!showModal && (
//         <div className="text-center space-y-6">
//           <h1 className="text-3xl font-bold">🌐 Village Numérique</h1>
//           <p className="text-gray-700">
//             Découvrez comment un établissement scolaire peut devenir autonome et résistant face aux Big Tech.
//           </p>
//           <button
//             onClick={() => { handleReset(); setShowModal(true); }}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             🚀 Lancer le simulateur
//           </button>
//         </div>
//       )}

//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           {currentStep === 1 && (
//             <Step1Audit initialData={auditData} onComplete={handleCompleteAudit} />
//           )}
//           {currentStep === 2 && (
//             <Step2Choises
//               initialData={choicesData}
//               onBack={handlePrevStep}
//               onComplete={handleCompleteChoices}
//             />
//           )}
//           {currentStep === 3 && resultData && (
//             <Step3Result data={resultData} onBack={handlePrevStep} onNext={handleNextStep} />
//           )}
//           {currentStep === 4 && (
//             <Step4Community onFinish={() => setShowModal(false)} />
//           )}
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import Modal from "./modules/Modal";
import Step1Audit from "./modules/Step1Audit";
import type { AuditData } from "./modules/Step1Audit";
import Step2Choises from "./modules/Step2Choises";
import type { ChoicesData } from "./modules/Step2Choises";
import Step3Result from "./modules/Step3Result";
import Step4Community from "./modules/Step4Community";
import { calculator } from "./utils/calculator";
import type { ResultData } from "./utils/calculator";

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [auditData, setAuditData] = useState<AuditData>({
    systemCount: 0,
    outdatedSystems: 0,
    budget: 0,
  });

  const [choicesData, setChoicesData] = useState<ChoicesData>({
    applyLinux: false,
    enableReconditioning: false,
    secureNetwork: false,
  });

  const [resultData, setResultData] = useState<ResultData | null>(null);

  const openSimulator = () => {
    // reset minimal
    setCurrentStep(1);
    setAuditData({ systemCount: 0, outdatedSystems: 0, budget: 0 });
    setChoicesData({
      applyLinux: false,
      enableReconditioning: false,
      secureNetwork: false,
    });
    setResultData(null);
    setShowModal(true);
  };

  const handleCompleteAudit = (data: AuditData) => {
    setAuditData(data);
    setCurrentStep(2);
  };

  const handleCompleteChoices = (data: ChoicesData) => {
    setChoicesData(data);
    // compute results and go to step 3
    const result = calculator(auditData, data);
    setResultData(result);
    setCurrentStep(3);
  };

  const handleFromStep3Next = (res: ResultData) => {
    setResultData(res);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div className="max-w-3xl w-full">
        {/* HOME */}
        {!showModal && (
          <div className="bg-white shadow-md rounded-xl p-10 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              🌐 Village-Numérique
            </h1>
            <p className="text-gray-700 mb-6">
              Découvrez comment un petit village scolaire peut renforcer sa
              cybersécurité et son autonomie numérique grâce à des actions NIRD
              (Linux, Reconditionnement, Souveraineté réseau).
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                onClick={openSimulator}
              >
                🚀 Lancer le simulateur
              </button>
              <a
                className="px-6 py-3 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
                href="#"
              >
                En savoir plus
              </a>
            </div>
          </div>
        )}

        {/* MODAL */}
        {showModal && (
          <Modal
            onClose={() => {
              setShowModal(false);
            }}
          >
            <div className="w-full">
              {currentStep === 1 && (
                <Step1Audit
                  initialData={auditData}
                  onComplete={handleCompleteAudit}
                />
              )}

              {currentStep === 2 && (
                <Step2Choises
                  initialData={choicesData}
                  onBack={() => setCurrentStep(1)}
                  onComplete={handleCompleteChoices}
                />
              )}

              {currentStep === 3 && resultData && (
                <Step3Result
                  audit={auditData}
                  choices={choicesData}
                  result={resultData}
                  onBack={() => setCurrentStep(2)}
                  onNext={handleFromStep3Next}
                />
              )}

              {currentStep === 4 && resultData && (
                <Step4Community
                  result={resultData}
                  onFinish={() => {
                    setShowModal(false);
                  }}
                />
              )}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default App;
