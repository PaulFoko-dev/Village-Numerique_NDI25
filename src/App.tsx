import React, { useState, useEffect, useRef } from "react";
import Modal from "./modules/Modal";
import Step1Audit from "./modules/Step1Audit";
import Step2Choises from "./modules/Step2Choises";
import Step3Result from "./modules/Step3Result";
import Step4Community from "./modules/Step4Community";
import { calculator, type ResultData } from "./utils/calculator";
import type { AuditData } from "./modules/Step1Audit";
import type { ChoicesData } from "./modules/Step2Choises";
import img1 from "./assets/img/img1.png";
import img2 from "./assets/img/img2.png";
import img3 from "./assets/img/img3.png";
import img4 from "./assets/img/img4.png";
import Button from "./components/Button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { data } from "./utils/calculator";
import SnakeGame from "./components/SnakeGame";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
  "Enter",
];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [auditData, setAuditData] = useState<AuditData>(data.defaultAudit);
  const [choicesData, setChoicesData] = useState<ChoicesData>(data.defaultChoices);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  // --- secret snake state ---
  const [showSnake, setShowSnake] = useState<boolean>(false);
  const [snakeResult, setSnakeResult] = useState<{ score: number } | null>(null);
  const konamiRef = useRef<string[]>([]);
  const clickCountRef = useRef<number>(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // normalize: keep Arrow... as-is, single chars to lowercase, Enter/Escape handled by text
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      konamiRef.current.push(key);
      if (konamiRef.current.length > KONAMI.length) konamiRef.current.shift();

      // build comparable arrays
      const recent = konamiRef.current;
      const target = KONAMI.map(k => (k.length === 1 ? k : k));
      if (recent.length === target.length) {
        let match = true;
        for (let i = 0; i < target.length; i++) {
          const r = recent[i];
          const t = target[i];
          if (t.length === 1) {
            if (r !== t) { match = false; break; }
          } else {
            if (r !== t) { match = false; break; }
          }
        }
        if (match) {
          setShowSnake(true);
          konamiRef.current = [];
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleTitleClick = () => {
    clickCountRef.current += 1;
    if (clickCountRef.current >= 5) {
      setShowSnake(true);
      clickCountRef.current = 0;
    }
    // reset si inactivité
    setTimeout(() => {
      clickCountRef.current = 0;
    }, 1200);
  };

  const handleSnakeEnd = (score: number) => {
    // pas d'alert: stocker le score et fermer l'overlay de jeu
    setShowSnake(false);
    setSnakeResult({ score });
    console.log("Snake score", score);
  };

  const handleSnakeClose = () => setShowSnake(false);
  // --- fin snake state ---

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCompleteAudit = (d: AuditData) => {
    setAuditData(d);
    handleNextStep();
  };

  const handleCompleteChoices = (d: ChoicesData) => {
    setChoicesData(d);
    const res = calculator(auditData, d);
    setResultData(res);
    handleNextStep();
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAuditData(data.defaultAudit);
    setChoicesData(data.defaultChoices);
    setResultData(null);
  };

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen px-6 py-10 flex flex-col items-center">
        {!showModal && (
          <>
            <h1
              onClick={handleTitleClick}
              className="text-3xl font-bold text-center text-gray-800 mb-2 select-none"
            >
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
              <img src={img1} alt="Durabilité" className="rounded-lg shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-lg" />
              <img src={img2} alt="Inclusion" className="rounded-lg shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-lg" />
              <img src={img3} alt="Responsabilité" className="rounded-lg shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-lg" />
              <div className="md:col-span-1">
                <img src={img4} alt="Évaluation" className="rounded-lg shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-lg" />
              </div>
            </div>

            <Button onClick={() => { handleReset(); setShowModal(true); }}>
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
              <Step2Choises initialData={choicesData} onBack={handlePrevStep} onComplete={handleCompleteChoices} />
            )}
            {currentStep === 3 && resultData && (
              <Step3Result result={resultData} onBack={handlePrevStep} onNext={handleNextStep} />
            )}
            {currentStep === 4 && resultData && (
              <Step4Community result={resultData} onFinish={() => setShowModal(false)} />
            )}
            {currentStep > 4 && <div className="text-center p-8">Fin de la simulation.</div>}
          </Modal>
        )}
      </main>

      <Footer />

      {/* Snake caché */}
      {showSnake && (
        <SnakeGame onGameEnd={handleSnakeEnd} onClose={handleSnakeClose} />
      )}

      {/* Résultat stylé (remplace alert) */}
      {snakeResult && (
        <div className="fixed bottom-6 right-6 z-60">
          <div className="bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg shadow-2xl border border-green-600 max-w-xs">
            <h4 className="text-lg font-extrabold mb-1">🎉 Fin de partie</h4>
            <p className="text-green-300 text-2xl font-bold mb-3">{snakeResult.score} pts</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setSnakeResult(null)}
                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
              >
                Fermer
              </button>
              <button
                onClick={() => { setSnakeResult(null); setShowSnake(true); }}
                className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 transition"
              >
                Rejouer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;