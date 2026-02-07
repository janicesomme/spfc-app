import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock } from "lucide-react";
import { QuickBetButtons } from "./QuickBetButtons";

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
    <div className="relative p-4">
      {/* Glow effect background */}
      <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(160, 160, 160, 0.4) 0%, rgba(120, 120, 120, 0.3) 30%, rgba(80, 80, 80, 0.2) 50%, transparent 70%)' }}></div>

      <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black mb-6 relative z-10">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
          <CardTitle className="text-2xl font-extrabold text-center flex items-center justify-between">
            <span>SPFC CLEAN SHEET</span>
            <Lock className="w-8 h-8" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6 bg-white">
          <div className="space-y-3">
            <label className="block text-lg font-bold text-center text-gray-700">
              🔒 Will we keep a clean sheet today?
            </label>
            <Select value={shotsOnTarget} onValueChange={onShotsChange}>
              <SelectTrigger className="h-16 text-2xl font-bold shadow-lg border-2 border-gray-300 rounded-xl bg-gray-100 text-black">
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="yes" className="text-xl font-bold text-black">
                  Yes
                </SelectItem>
                <SelectItem value="no" className="text-xl font-bold text-black">
                  No
                </SelectItem>
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

          {/* Odds Section */}
          <div className="space-y-3">
            <label className="block text-lg font-bold text-center text-gray-700">
              📊 ODDS
            </label>
            <div className="flex justify-center">
              <div className="bg-red-600 text-white px-4 py-2 text-lg font-bold rounded-lg min-w-[80px] text-center">
                ENTER PREDICTION
              </div>
            </div>
          </div>

          {/* Potential Winnings Calculator */}
          <div className="flex justify-center mt-3">
            {betAmount && parseFloat(betAmount) > 0 ? (
              <div className="bg-green-600 text-white border-black border-2 px-3 py-1 text-sm font-bold rounded">
                Potential winnings: {(parseFloat(betAmount) * 2.0).toFixed(0)} pts
              </div>
            ) : (
              <div className="border-blue-500 border text-blue-600 px-3 py-1 text-xs rounded">
                Enter bet amount to see winnings
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};