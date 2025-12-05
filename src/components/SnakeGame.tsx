import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface SnakeGameProps {
  onGameEnd: (score: number) => void;
  onClose: () => void;
}

// Configuration du jeu
const GRID_SIZE = 20;
const INITIAL_SPEED = 200;
const FOOD_COLOR = "bg-yellow-400";
const SNAKE_COLOR = "bg-green-500";
const WALL_COLOR = "bg-gray-700";
const BACKGROUND_COLOR = "bg-gray-800";

const getRandomPosition = (snake: { x: number, y: number }[]) => {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};

const SnakeGame: React.FC<SnakeGameProps> = ({ onGameEnd, onClose }) => {
  const START_POS = { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) };

  const [snake, setSnake] = useState<{ x: number; y: number }[]>([START_POS]);
  const [food, setFood] = useState<{ x: number; y: number }>(getRandomPosition([START_POS]));
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');

  const directionRef = useRef<Direction>(direction);
  const isPausedRef = useRef(isPaused);

  useEffect(() => { directionRef.current = direction; }, [direction]);
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);

  const isOpposite = (d1: Direction, d2: Direction) =>
    (d1 === 'UP' && d2 === 'DOWN') ||
    (d1 === 'DOWN' && d2 === 'UP') ||
    (d1 === 'LEFT' && d2 === 'RIGHT') ||
    (d1 === 'RIGHT' && d2 === 'LEFT');

  const resetGame = useCallback(() => {
    const start = { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) };
    setSnake([start]);
    setFood(getRandomPosition([start]));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setIsPaused(false);
    isPausedRef.current = false;
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
    setGameOverMessage('');
  }, []);

  const endGame = useCallback((reason: string) => {
    setGameOverMessage(reason);
    setGameOver(true);
    setIsPaused(true);
    isPausedRef.current = true;
    onGameEnd(score);
  }, [onGameEnd, score]);

  const moveSnake = useCallback(() => {
    if (isPausedRef.current || gameOver) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = newSnake[0];
      let newHead = { x: head.x, y: head.y };
      const currentDirection = directionRef.current;

      switch (currentDirection) {
        case 'RIGHT': newHead.x = head.x + 1; break;
        case 'LEFT': newHead.x = head.x - 1; break;
        case 'UP': newHead.y = head.y - 1; break;
        case 'DOWN': newHead.y = head.y + 1; break;
      }

      // Collision murs => fin
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        endGame('Vous avez touché un mur.');
        return prevSnake;
      }

      // Collision avec soi-même => fin
      if (newSnake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        endGame('Vous vous êtes mordu.');
        return prevSnake;
      }

      newSnake.unshift(newHead);

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prev => prev + 10);
        setFood(getRandomPosition(newSnake));
        setSpeed(prev => Math.max(50, prev - 5));
        return newSnake;
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [endGame, food, gameOver]);

  useEffect(() => {
    if (isPaused || gameOver) return;
    const id = setInterval(moveSnake, speed);
    return () => clearInterval(id);
  }, [moveSnake, speed, isPaused, gameOver]);

  useEffect(() => {
    const keyToDir: Record<string, Direction | undefined> = {
      'arrowup': 'UP', 'w': 'UP',
      'arrowdown': 'DOWN', 's': 'DOWN',
      'arrowleft': 'LEFT', 'a': 'LEFT',
      'arrowright': 'RIGHT', 'd': 'RIGHT',
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const k = (e.key || '').toLowerCase();

      if (k === ' ' || k === 'spacebar') {
        setIsPaused(p => !p);
        return;
      }

      if (k === 'escape') {
        onClose();
        return;
      }

      const newDir = keyToDir[k];
      if (!newDir) return;
      if (isOpposite(newDir, directionRef.current)) return;

      setDirection(newDir);
      directionRef.current = newDir;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        let className = BACKGROUND_COLOR;

        if (snake.some(segment => segment.x === x && segment.y === y)) {
          className = SNAKE_COLOR;
          if (snake[0].x === x && snake[0].y === y) {
            className = "bg-green-700 border-2 border-white animate-pulse";
          }
        } else if (food.x === x && food.y === y) {
          className = `${FOOD_COLOR} rounded-full transform scale-110`;
        }

        cells.push(
          <div
            key={`${x}-${y}`}
            className={`w-[20px] h-[20px] ${className} border border-gray-900/10`}
            style={{ gridColumnStart: x + 1, gridRowStart: y + 1 }}
          />
        );
      }
    }
    return cells;
  };

  const trySetDirection = (d: Direction) => {
    if (isOpposite(d, directionRef.current)) return;
    setDirection(d);
    directionRef.current = d;
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/95 flex flex-col items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-red-400 transition"
        title="Quitter le jeu"
      >
        <X className="w-8 h-8" />
      </button>

      <h2 className="text-4xl font-extrabold text-green-400 mb-2">🐍 Défi Secret NIRD : Le Serpent Libre 🐍</h2>
      <p className="text-white mb-6 text-sm">Flèches / WASD — Espace = pause — Échap = quitter</p>

      <div className="flex justify-between w-full max-w-xl text-white mb-4 px-4 sm:px-0">
        <span className="text-xl font-semibold">Score: {score}</span>
        <span className="text-xl font-semibold">Vitesse: {Math.max(1, Math.floor((INITIAL_SPEED - speed) / 5))}</span>
        <button
          onClick={() => setIsPaused(p => !p)}
          className="px-3 py-1 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          {isPaused ? 'Reprendre' : 'Pause'}
        </button>
      </div>

      <div
        className={`w-[400px] h-[400px] border-4 ${WALL_COLOR} shadow-2xl rounded-lg overflow-hidden`}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {renderGrid()}
      </div>

      <div className="mt-8 flex flex-col items-center sm:hidden">
        <button onClick={() => trySetDirection('UP')} className="w-16 h-10 bg-gray-700 text-white rounded-t-lg mb-2">▲</button>
        <div className="flex">
          <button onClick={() => trySetDirection('LEFT')} className="w-16 h-10 bg-gray-700 text-white rounded-l-lg mr-2">◀</button>
          <button onClick={() => trySetDirection('RIGHT')} className="w-16 h-10 bg-gray-700 text-white rounded-r-lg">▶</button>
        </div>
        <button onClick={() => trySetDirection('DOWN')} className="w-16 h-10 bg-gray-700 text-white rounded-b-lg mt-2">▼</button>
      </div>

      <button
        onClick={onClose}
        className="mt-10 px-8 py-3 bg-red-600 text-white rounded-lg font-bold shadow-md hover:bg-red-700 transition transform hover:scale-105"
      >
        Quitter le Jeu
      </button>

      {/* Overlay Game Over */}
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/80 backdrop-blur-md rounded-xl p-6 w-[90%] max-w-md text-center shadow-2xl border border-green-600">
            <h3 className="text-2xl text-red-400 font-extrabold mb-3">GAME OVER</h3>
            <p className="text-white mb-4">{gameOverMessage}</p>
            <p className="text-green-300 text-lg font-semibold mb-6">Score final: {score}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { resetGame(); }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Rejouer
              </button>
              <button
                onClick={() => { setGameOver(false); onClose(); }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Quitter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;