interface BetTrackerProps {
  totalBet: number;
  canSubmit: boolean;
}

export const BetTracker = ({ totalBet, canSubmit }: BetTrackerProps) => {
  return (
    <div className="fixed inset-x-2 bottom-4 z-20 bg-black rounded-2xl p-2 shadow-2xl border-2 border-black md:bottom-auto md:top-6 md:right-6 md:left-auto md:p-3 md:max-w-xs">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base md:text-2xl">💰</span>
        <span className="font-bold text-sm md:text-lg text-yellow-400">Total Bets</span>
      </div>
      <div className="text-lg md:text-2xl font-extrabold text-yellow-400">
        £{totalBet.toFixed(0)}/£100
      </div>
      <p className="text-xs text-white mt-1">
        You must bet exactly £100 to lock in!
      </p>
    </div>
  );
};