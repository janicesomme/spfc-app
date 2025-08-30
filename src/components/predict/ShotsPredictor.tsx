import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target } from "lucide-react";
import { QuickBetButtons } from "./QuickBetButtons";
import { OddsDisplay } from "./OddsDisplay";

interface ShotsPredictorProps {
  shotsOnTarget: string;
  betAmount: string;
  onShotsChange: (value: string) => void;
  onBetAmountChange: (value: string) => void;
}

export const ShotsPredictor = ({
  shotsOnTarget,
  betAmount,
  onShotsChange,
  onBetAmountChange
}: ShotsPredictorProps) => {
  return (
    <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black mb-6">
      <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
        <CardTitle className="text-2xl font-extrabold text-center flex items-center justify-between">
          <span>MAN UTD SHOTS ON TARGET</span>
          <Target className="w-8 h-8" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6 bg-white">
        <div className="space-y-3">
          <label className="block text-lg font-bold text-center text-gray-700">
            🔢 How many shots on target?
          </label>
          <Select value={shotsOnTarget} onValueChange={onShotsChange}>
            <SelectTrigger className="h-16 text-2xl font-bold shadow-lg border-2 border-gray-300 rounded-xl bg-gray-100 text-black">
              <SelectValue placeholder="Select shots" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {Array.from({ length: 16 }, (_, i) => (
                <SelectItem key={i} value={i.toString()} className="text-xl font-bold">
                  {i} shots
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <QuickBetButtons 
          selectedAmount={betAmount}
          onAmountSelect={onBetAmountChange}
        />

        <div className="space-y-3">
          <label className="block text-lg font-bold text-center text-gray-700">
            💸 Your Bet Amount
          </label>
          <CurrencyInput
            placeholder="Enter amount"
            value={betAmount}
            onChange={(e) => onBetAmountChange(e.target.value)}
            className="text-center text-2xl font-bold h-16 border-2 border-gray-300 rounded-xl bg-gray-100 text-black placeholder:text-red-500"
          />
        </div>

        <OddsDisplay />
      </CardContent>
    </Card>
  );
};