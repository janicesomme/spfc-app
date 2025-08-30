interface OddsDisplayProps {
  odds?: string;
}

export const OddsDisplay = ({ odds = "3/1" }: OddsDisplayProps) => {
  return (
    <div className="space-y-3">
      <label className="block text-lg font-bold text-center text-gray-700">
        📊 Current Odds
      </label>
      <div className="bg-blue-900 border rounded-xl h-16 flex items-center justify-center border-black">
        <span className="text-2xl font-bold text-white">{odds}</span>
      </div>
    </div>
  );
};