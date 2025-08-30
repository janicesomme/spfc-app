import { useState, useEffect } from "react";

interface BetTrackerProps {
  totalBet: number;
  canSubmit: boolean;
}

export const BetTracker = ({ totalBet, canSubmit }: BetTrackerProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed ${hasScrolled ? 'top-4' : 'top-[calc(50vh-76px)]'} md:top-4 right-4 z-50 bg-blue-900 rounded-2xl px-2 pt-3 pb-2 md:px-3 md:py-2 shadow-2xl border-2 border-black max-w-xs transition-all duration-300`}>
      <div className="flex items-center justify-center gap-1 md:gap-2 -mt-2 md:mt-0">
        <span className="text-lg md:text-2xl">💰</span>
        <span className="font-bold text-sm md:text-lg text-white">Total Bets</span>
      </div>
      <div className="text-lg md:text-2xl font-extrabold text-white text-center -mt-2 md:-mt-3">
        £{totalBet.toFixed(0)}/£100
      </div>
      <p className="text-xs text-white/90 text-center -mt-1 md:-mt-2">
        You must bet exactly £100 to lock in!
      </p>
    </div>
  );
};