import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { UserRound } from "lucide-react";
import { QuickBetButtons } from "./QuickBetButtons";
import { OddsDisplay } from "./OddsDisplay";

interface PossessionPredictorProps {
  possession: number[];
  betAmount: string;
  onPossessionChange: (value: number[]) => void;
  onBetAmountChange: (value: string) => void;
}

export const PossessionPredictor = ({
  possession,
  betAmount,
  onPossessionChange,
  onBetAmountChange
}: PossessionPredictorProps) => {
  return (
    <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black">
      <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
        <CardTitle className="text-2xl font-extrabold text-center flex items-center justify-between">
          <span>MAN UTD POSSESSION %</span>
          <UserRound className="w-8 h-8" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6 bg-white">
        <div className="space-y-4">
          <label className="block text-lg font-bold text-center text-gray-700">
            ⚽ What % of possession will United have?
          </label>
          <div className="relative flex justify-center">
            <div className="w-40 h-20 relative">
              <div className="absolute inset-0 border-8 border-red-600 rounded-t-full"></div>
              <div 
                className="absolute inset-0 border-8 border-green-500 rounded-t-full"
                style={{
                  clipPath: `polygon(0 100%, ${possession[0]}% 100%, ${possession[0]}% 0, 100% 0, 100% 100%)`
                }}
              ></div>
              <div className="absolute inset-0 flex items-end justify-center pb-2">
                <span className="text-3xl font-bold text-black">{possession[0]}%</span>
              </div>
            </div>
          </div>
          
          <Slider
            value={possession}
            onValueChange={onPossessionChange}
            max={80}
            min={30}
            step={1}
            className="w-full"
          />
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