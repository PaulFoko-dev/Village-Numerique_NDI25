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
import Header from "./components/Header";
import Button from "./components/Button";
import Footer from "./components/Footer";
import { images } from './assets/images';

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
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen px-6 py-10 flex flex-col items-center">
      {!showModal && (
        <>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          L'Histoire NIRD : Évaluer l'Impact Réel
        </h1>
        <p className="text-sm text-gray-500 mb-6">Étape 1 sur 6</p>

        <p className="text-gray-700 text-center max-w-3xl mb-8">
          Bienvenue dans l'audit NIRD, une démarche essentielle pour évaluer et renforcer la résilience de vos systèmes et pratiques. Dans un monde en constante évolution, la capacité à s'adapter, à innover et à agir de manière éthique est plus cruciale que jamais.
        </p>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
  <div className="bg-white shadow-md rounded-lg p-4 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
    <h2 className="text-lg font-semibold text-green-700 mb-2">Responsabilité</h2>
    <p className="text-sm text-gray-600">
      Éthique numérique, protection des données, impact social des technologies. Innovation responsable et confiance.
    </p>
  </div>
  <div className="bg-white shadow-md rounded-lg p-4 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
    <h2 className="text-lg font-semibold text-green-700 mb-2">Durabilité</h2>
    <p className="text-sm text-gray-600">
      Empreinte environnementale, efficacité énergétique, économie circulaire, longévité des équipements.
    </p>
  </div>
  <div className="bg-white shadow-md rounded-lg p-4 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
    <h2 className="text-lg font-semibold text-green-700 mb-2">Inclusion</h2>
    <p className="text-sm text-gray-600">
      Accessibilité et équité pour tous. Valorisation de la diversité et suppression des barrières numériques.
    </p>
  </div>
</section>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
  {/* Ligne du haut : 3 cases */}
  <img
    src={images.img1}
    alt="Durabilité"
    className="rounded-lg shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
  />
  <img
    src={images.img2}
    alt="Inclusion"
    className="rounded-lg shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
  />
  <img
    src={images.img3}
    alt="Responsabilité"
    className="rounded-lg shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
  />

  {/* Ligne du bas : alignée sous la première case */}
  <div className="md:col-span-1">
    <img
      src={images.img4}
      alt="Évaluation"
      className="rounded-lg shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
    />
  </div>
</div>



        <Button onClick={() => { handleReset(); setShowModal(true); }}
          >
            🚀 Lancer le simulateur
        </Button>
      </>
    
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
    </main>
      <Footer />
      </>
  );
};

export default App;
