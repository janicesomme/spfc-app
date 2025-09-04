import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target } from "lucide-react";
import { QuickBetButtons } from "./QuickBetButtons";
import { OddsDisplay } from "./OddsDisplay";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface ShotsPredictorProps {
  shotsOnTarget: string;
  betAmount: string;
  onShotsChange: (value: string) => void;
  onBetAmountChange: (value: string) => void;
  onShotsOddsChange?: (odds: string) => void;
}

export const ShotsPredictor = ({
  shotsOnTarget,
  betAmount,
  onShotsChange,
  onBetAmountChange,
  onShotsOddsChange
}: ShotsPredictorProps) => {
  const [shotsOddsMap, setShotsOddsMap] = useState<{ [shots: number]: string }>({});
  const [selectedShotsOdds, setSelectedShotsOdds] = useState<string>("");

  useEffect(() => {
    const fetchShotsOdds = async () => {
      const { data, error } = await (supabase as any)
        .from('shots_on_target_odds')
        .select('shots, fraction');
      
      if (!error && data) {
        const oddsMap = data.reduce((acc: { [shots: number]: string }, item: any) => {
          acc[item.shots] = item.fraction;
          return acc;
        }, {});
        setShotsOddsMap(oddsMap);
      }
    };

    fetchShotsOdds();
  }, []);

  useEffect(() => {
    if (shotsOnTarget && shotsOddsMap[parseInt(shotsOnTarget)]) {
      const odds = shotsOddsMap[parseInt(shotsOnTarget)];
      setSelectedShotsOdds(odds);
      onShotsOddsChange?.(odds);
    }
  }, [shotsOnTarget, shotsOddsMap, onShotsOddsChange]);
  return (
    <div className="relative p-4">
      {/* Glow effect background */}
      <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(160, 160, 160, 0.4) 0%, rgba(120, 120, 120, 0.3) 30%, rgba(80, 80, 80, 0.2) 50%, transparent 70%)' }}></div>
      
      <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black mb-6 relative z-10">
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
                  <SelectItem key={i} value={i.toString()} className="text-xl font-bold text-black">
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

          {/* Odds Section */}
          <div className="space-y-3">
            <label className="block text-lg font-bold text-center text-gray-700">
              📊 ODDS
            </label>
            <div className="flex justify-center">
              <div className="bg-red-600 text-white px-4 py-2 text-lg font-bold rounded-lg min-w-[80px] text-center">
                {selectedShotsOdds || "ENTER PREDICTION"}
              </div>
            </div>
          </div>
          
          {/* Potential Winnings Calculator */}
          <div className="flex justify-center mt-3">
            {betAmount && parseFloat(betAmount) > 0 ? (
              <div className="bg-green-600 text-white border-black border-2 px-3 py-1 text-sm font-bold rounded">
                Potential winnings: £{(parseFloat(betAmount) * 4.0).toFixed(2)}
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