import { Button } from "@/components/ui/button";

interface QuickBetButtonsProps {
  selectedAmount: string;
  onAmountSelect: (amount: string) => void;
}

export const QuickBetButtons = ({ selectedAmount, onAmountSelect }: QuickBetButtonsProps) => {
  const amounts = [5, 10, 20, 50];

  return (
    <div className="space-y-3">
      <label className="block text-lg font-bold text-center text-gray-700">
        💰 Quick Bet Amounts
      </label>
      <div className="grid grid-cols-4 gap-2">
        {amounts.map((amount) => (
          <Button
            key={amount}
            onClick={() => onAmountSelect(amount.toString())}
            variant={selectedAmount === amount.toString() ? "default" : "outline"}
            className={`w-full h-12 text-sm font-bold rounded-xl border-2 border-black text-black ${
              selectedAmount === amount.toString() 
                ? "bg-yellow-500 hover:bg-yellow-600" 
                : "bg-yellow-400 hover:bg-yellow-500"
            }`}
          >
            £{amount}
          </Button>
        ))}
      </div>
    </div>
  );
};