interface BetTrackerProps {
  totalBet: number;
  canSubmit: boolean;
}

export const BetTracker = ({ totalBet, canSubmit }: BetTrackerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-3 shadow-2xl border-2 border-black max-w-xs">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">💰</span>
        <span className="font-bold text-lg text-white">Total Bets</span>
      </div>
      <div className="text-2xl font-extrabold text-white">
        £{totalBet.toFixed(0)}/£100
      </div>
      <p className="text-xs text-white/90 mt-1">
        You must bet exactly £100 to lock in!
      </p>
    </div>
  );
};