import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDot } from "lucide-react";
import { QuickBetButtons } from "./QuickBetButtons";
import { OddsDisplay } from "./OddsDisplay";

interface ScorePredictorProps {
  homeScore: string;
  awayScore: string;
  betAmount: string;
  onHomeScoreChange: (value: string) => void;
  onAwayScoreChange: (value: string) => void;
  onBetAmountChange: (value: string) => void;
}

export const ScorePredictor = ({
  homeScore,
  awayScore,
  betAmount,
  onHomeScoreChange,
  onAwayScoreChange,
  onBetAmountChange
}: ScorePredictorProps) => {
  return (
    <div className="relative p-4">
      {/* Glow effect background */}
      <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(160, 160, 160, 0.4) 0%, rgba(120, 120, 120, 0.3) 30%, rgba(80, 80, 80, 0.2) 50%, transparent 70%)' }}></div>
      
      <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black relative z-10">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
          <CardTitle className="text-2xl font-extrabold text-center flex items-center justify-between">
            <span>PREDICT THE SCORE</span>
            <CircleDot className="w-8 h-8" />
          </CardTitle>
          <p className="mt-1 text-xs sm:text-sm text-white text-center">HOME team score in the LEFT box</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6 bg-white">
          <div className="space-y-3">
            <label className="block text-lg font-bold text-center text-gray-700">
              🏆 Final Score Prediction
            </label>
            <div className="flex items-center gap-4 justify-center">
              <div className="flex-1">
                <div className="text-center text-lg text-black mb-1">Home Team</div>
                <Input
                  type="number"
                  value={homeScore}
                  onChange={(e) => onHomeScoreChange(e.target.value)}
                  className="text-center text-black placeholder:text-black !text-2xl !font-bold h-16 border-2 border-gray-300 rounded-xl bg-gray-100"
                  placeholder="3"
                  min="0"
                  max="10"
                />
              </div>
              <div className="text-2xl font-bold text-gray-600 px-2">-</div>
              <div className="flex-1">
                <div className="text-center text-lg text-black mb-1">Away Team</div>
                <Input
                  type="number"
                  value={awayScore}
                  onChange={(e) => onAwayScoreChange(e.target.value)}
                  className="text-center text-black placeholder:text-black !text-2xl !font-bold h-16 border-2 border-gray-300 rounded-xl bg-gray-100"
                  placeholder="1"
                  min="0"
                  max="10"
                />
              </div>
            </div>
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
    </div>
  );
};