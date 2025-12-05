import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import logo1 from '../assets/img/logo-k1.png';
import logo2 from '../assets/img/logo-klub1.png';
import logo3 from '../assets/img/logo-k2.png';
import logo4 from '../assets/img/logo-klub-black.png';

/**
 * Splash animé :
 * - deux images traversent l'écran en rebondissant (effet "jeu vidéo")
 * - après N passages, une image finale tourne et s'arrête au centre
 * - onFinish() est appelé pour afficher l'app principale
 */

const passes = 3;        // nombre de traversées avant la finale
const passDuration = 1.1; // durée (s) d'une traversée

const KlubIntro: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [phase, setPhase] = useState<'playing' | 'final' | 'done'>('playing');
  const controlsA = useAnimation();
  const controlsB = useAnimation();
  const controlsFinal = useAnimation();

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      // Répéter des traversées gauche->droite avec rebonds
      for (let i = 0; i < passes && mounted; i++) {
        // lancer les deux éléments en parallèle
        await Promise.all([
          controlsA.start({
            x: ['-60vw', '60vw'],
            y: [0, -90, 0, -40, 0],
            scaleY: [1, 0.78, 1.08, 0.88, 1],
            rotate: [0, 6, -4, 3, 0],
            transition: { duration: passDuration, ease: 'easeInOut', times: [0, 0.35, 0.6, 0.85, 1] },
          }),
          controlsB.start({
            x: ['-50vw', '50vw'],
            y: [0, -45, 0, -20, 0],
            scale: [1, 0.95, 1.03, 0.97, 1],
            rotate: [0, 360],
            transition: { duration: passDuration, ease: 'linear', times: [0, 1] },
          }),
        ]);

        // petit reset instantané hors du rendu pour repartir
        if (!mounted) return;
        await Promise.all([
          controlsA.set({ x: '-60vw', y: 0, rotate: 0, scaleY: 1 }),
          controlsB.set({ x: '-50vw', y: 0, rotate: 0, scale: 1 }),
        ]);
        // petite pause avant la passe suivante
        await new Promise(r => setTimeout(r, 120));
      }

      if (!mounted) return;
      setPhase('final');

      // choisir la dernière image (logo4) pour la finale
      // placer logoA en centre et faire tourner lourdement puis settle
      await controlsFinal.start({
        // amener depuis la gauche vers le centre (x: 0 = centre de la page)
        x: ['-60vw', '-10vw', '0vw'],
        y: [-20, -30, 0],
        rotate: [0, 720],
        scale: [1, 1.15, 1],
        transition: { duration: 1.2, ease: 'circOut' },
      });

      // petit settle (petit rebond final)
      await controlsFinal.start({
        y: [0, -14, 0],
        scale: [1, 0.96, 1],
        transition: { duration: 0.6, times: [0, 0.5, 1], ease: 'easeOut' },
      });

      if (!mounted) return;
      setPhase('done');

      // délai court puis appel onFinish pour afficher l'app principale
      setTimeout(() => onFinish?.(), 300);
    };

    run();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden z-50">
      {/* Zone relative où x animations utilisent vw par rapport au centre */}
      <div className="relative w-full h-full">
        {/* Element A : rebond puissant / squash/stretch */}
        <motion.img
          src={logo1}
          alt="logo A"
          style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
          initial={{ x: '-60vw', y: 0, scaleY: 1, rotate: 0 }}
          animate={controlsA}
          className="pointer-events-none select-none"
          width={220}
          height={220}
        />

        {/* Element B : rotation pendant la traversée */}
        <motion.img
          src={logo2}
          alt="logo B"
          style={{ position: 'absolute', left: '50%', top: '62%', transform: 'translate(-50%,-50%)' }}
          initial={{ x: '-50vw', y: 0, scale: 1, rotate: 0 }}
          animate={controlsB}
          className="pointer-events-none select-none"
          width={160}
          height={160}
        />

        {/* Element Final : apparaît au-dessus lors de la phase finale */}
        <motion.img
          src={logo4}
          alt="logo final"
          style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
          initial={{ x: '-60vw', y: 0, rotate: 0, scale: 1, opacity: 1 }}
          animate={controlsFinal}
          className={`pointer-events-none select-none ${phase === 'final' || phase === 'done' ? 'z-40' : 'z-10'}`}
          width={260}
          height={260}
        />
      </div>
    </div>
  );
};

export default KlubIntro;