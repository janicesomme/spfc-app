interface BetTrackerProps {
  totalBet: number;
  canSubmit: boolean;
}

export const BetTracker = ({ totalBet, canSubmit }: BetTrackerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl px-2 py-1 md:px-3 md:py-2 shadow-2xl border-2 border-black max-w-xs">
      <div className="flex items-center justify-center gap-1 md:gap-2">
        <span className="text-lg md:text-2xl">💰</span>
        <span className="font-bold text-sm md:text-lg text-white">Total Bets</span>
      </div>
      <div className="text-lg md:text-2xl font-extrabold text-white text-center -mt-3 md:-mt-3">
        £{totalBet.toFixed(0)}/£100
      </div>
      <p className="text-xs text-white/90 text-center -mt-2 md:-mt-2">
        You must bet exactly £100 to lock in!
      </p>
    </div>
  );
};