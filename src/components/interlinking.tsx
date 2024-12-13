'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Game {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

const defaultImage = 'https://wallpapercave.com/wp/wp2533676.jpg';

const games: Game[] = [
  { id: 'csgo', name: 'Counter-Strike: GO', icon: 'https://gamevik.com/static/images/gamlogo/csgo.svg', image: '/static/images/GAMEVIK_GAMES_WALLPAPER1.jpg' },
  { id: 'lol', name: 'League of Legends', icon: 'https://gamevik.com/static/images/gamlogo/lol.svg', image: '/static/images/GAMEVIK_GAMES_WALLPAPER2.jpg' },
  { id: 'valorant', name: 'Valorant', icon: 'https://gamevik.com/static/images/gamlogo/valorant.svg', image: '/static/images/GAMEVIK_GAMES_WALLPAPER3.jpg' },
  { id: 'r6', name: 'Rainbow Six Siege', icon: 'https://gamevik.com/static/images/gamlogo/r6s.svg', image: '/static/images/GAMEVIK_GAMES_WALLPAPER4.jpg' },
  { id: 'cod', name: 'Call of Duty', icon: 'https://gamevik.com/static/images/gamlogo/cod.svg', image: '/static/images/GAMEVIK_GAMES_WALLPAPER5.jpeg' },
  { id: 'rocketleague', name: 'Rocket League', icon: 'https://gamevik.com/static/images/gamlogo/dota2.svg', image: '/static/images/GAMEVIK_GAMES_WALLPAPER6.jpg' },
  { id: 'starcraft', name: 'StarCraft', icon: 'https://gamevik.com/static/images/gamlogo/sc2.svg', image: '/static/images/GAMEVIK_GAMES_WALLPAPER7.jpg' },
  { id: 'overwatch', name: 'Overwatch 2', icon: 'https://gamevik.com/static/images/gamlogo/overwatch.svg', image: '/static/images/GAMEVIK_GAMES_WALLPAPER8.jpg' },
  { id: 'hearthstone', name: 'Hearthstone', icon: 'https://gamevik.com/static/images/gamlogo/hearthstone.svg', image: '/static/images/GAMEVIK_GAMES_WALLPAPER9.jpg' },
];

export default function HorizontalGameSelector() {
  const [activeGame, setActiveGame] = useState(games[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth / 2;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const handleScroll = () => {
        setCanScrollLeft(containerRef.current.scrollLeft > 0);
        setCanScrollRight(
          containerRef.current.scrollWidth > containerRef.current.clientWidth &&
          containerRef.current.scrollLeft < containerRef.current.scrollWidth - containerRef.current.clientWidth
        );
      };

      handleScroll(); // Initial check
      containerRef.current.addEventListener('scroll', handleScroll);

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);

  return (
    <div className="w-full max-w-[87.5rem] mx-auto p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto space-x-3 py-2 no-scrollbar"
      >
        {games.map((game) => (
          <motion.button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className={`flex-shrink-0 relative flex flex-col items-center justify-center p-3 w-[12.5rem] h-[9rem] rounded-lg cursor-pointer overflow-hidden group ${
              activeGame === game.id
                ? 'border-2 border-green-400 dark:border-green-400'
                : 'hover:border-2 hover:border-green-400 dark:hover:border-green-400'
            }`}
            whileHover={{ scale: 0.96 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundImage: `url(${game.image || defaultImage})`,
              }}
            />
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                activeGame === game.id
                  ? 'bg-black/10'
                  : 'bg-white/10 dark:bg-black/20 group-hover:bg-black/10 dark:group-hover:bg-black/15'
              }`}
            />
            <div className="relative z-10 flex flex-col items-center space-y-3">
              <div
                className={`p-3 rounded-full transition-all duration-300 ${
                  activeGame === game.id
                    ? 'bg-green-500/50 dark:bg-green-500/50'
                    : 'bg-transparent group-hover:bg-gray-200/50 dark:group-hover:bg-gray-700/50'
                }`}
              >
                <img src={game.icon} alt={`${game.name} icon`} className="w-8 h-8" />
              </div>
              <span
                className="text-base font-bold text-center text-[#00ff94] transition-colors duration-300"
              >
                {game.name}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 transform translate-y-2 bg-gray-100/80 dark:bg-gray-800/80 text-green-500 dark:text-green-500 p-2 rounded-full"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 bottom-0 transform translate-y-2 bg-gray-100/80 dark:bg-gray-800/80 text-green-500 dark:text-green-500 p-2 rounded-full"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}
