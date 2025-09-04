import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleDot } from "lucide-react";
import { QuickBetButtons } from "./QuickBetButtons";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface ScorePredictorProps {
  homeScore: string;
  awayScore: string;
  betAmount: string;
  onHomeScoreChange: (value: string) => void;
  onAwayScoreChange: (value: string) => void;
  onBetAmountChange: (value: string) => void;
  onSelectedOddsChange?: (odds: string | null) => void;
}

export const ScorePredictor = ({
  homeScore,
  awayScore,
  betAmount,
  onHomeScoreChange,
  onAwayScoreChange,
  onBetAmountChange,
  onSelectedOddsChange
}: ScorePredictorProps) => {
  const [oddsMap, setOddsMap] = useState<Record<string, string>>({});
  const [isLoadingOdds, setIsLoadingOdds] = useState(true);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const { data, error } = await supabase
          .from('prediction_adjusted_odds' as any)
          .select('scoreline, adjusted_fraction')
          .eq('fixture_id', '537822');

        if (error) {
          console.error('Error fetching odds:', error);
          setIsLoadingOdds(false);
          return;
        }

        const map: Record<string, string> = {};
        data?.forEach((item: any) => {
          if (item.scoreline && item.adjusted_fraction) {
            map[item.scoreline] = item.adjusted_fraction;
          }
        });
        
        console.log('Loaded odds map:', map);
        setOddsMap(map);
        setIsLoadingOdds(false);
      } catch (error) {
        console.error('Error fetching odds:', error);
        setIsLoadingOdds(false);
      }
    };

    fetchOdds();
  }, []);

  // Compute current score key and get odds
  const currentScoreKey = homeScore && awayScore ? `${homeScore}-${awayScore}` : '';
  const currentOdds = currentScoreKey ? oddsMap[currentScoreKey] : null;
  
  console.log('Score key:', currentScoreKey, 'Odds:', currentOdds, 'Bet:', betAmount);

  // Convert fractional odds to decimal for calculations
  const convertFractionalToDecimal = (fractional: string): number => {
    if (fractional === "EVENS") return 2.0;
    
    const parts = fractional.split('/');
    if (parts.length === 2) {
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      return (numerator / denominator) + 1;
    }
    
    return 2.0; // Default fallback
  };

  // Update parent with selected odds when score changes
  useEffect(() => {
    if (onSelectedOddsChange) {
      onSelectedOddsChange(currentOdds);
    }
  }, [currentOdds, onSelectedOddsChange]);
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
                <div className="text-center text-sm sm:text-lg text-black mb-1 whitespace-nowrap">Home Team</div>
                <Input
                  type="number"
                  value={homeScore}
                  onChange={(e) => {
                    console.log('Home score changed to:', e.target.value);
                    onHomeScoreChange(e.target.value);
                  }}
                  className="text-center text-black placeholder:text-black !text-2xl !font-bold h-16 border-2 border-gray-300 rounded-xl bg-gray-100"
                  placeholder="3"
                  min="0"
                  max="10"
                />
              </div>
              <div className="text-2xl font-bold text-gray-600 px-2">-</div>
              <div className="flex-1">
                <div className="text-center text-sm sm:text-lg text-black mb-1 whitespace-nowrap">Away Team</div>
                <Input
                  type="number"
                  value={awayScore}
                  onChange={(e) => {
                    console.log('Away score changed to:', e.target.value);
                    onAwayScoreChange(e.target.value);
                  }}
                  className="text-center text-black placeholder:text-black !text-2xl !font-bold h-16 border-2 border-gray-300 rounded-xl bg-gray-100"
                  placeholder="1"
                  min="0"
                  max="10"
                />
              </div>
            </div>
            
            {/* Odds Section */}
            <div className="space-y-3">
              <label className="block text-lg font-bold text-center text-gray-700">
                📊 ODDS
              </label>
              <div className="flex justify-center">
                <div className="bg-red-600 text-white px-4 py-2 text-lg font-bold rounded-lg min-w-[80px] text-center">
                  {currentOdds || "ENTER PREDICTION"}
                </div>
              </div>
            </div>
            
            {/* Potential Winnings Calculator */}
            <div className="flex justify-center mt-3">
              {currentOdds && betAmount && parseFloat(betAmount) > 0 ? (
                <Badge variant="secondary" className="bg-green-600 text-white border-black border-2 px-3 py-1 text-sm font-bold">
                  You will win £{(parseFloat(betAmount) * convertFractionalToDecimal(currentOdds)).toFixed(2)}
                </Badge>
              ) : currentOdds && (!betAmount || parseFloat(betAmount) === 0) ? (
                <Badge variant="outline" className="border-blue-500 text-blue-600 px-3 py-1 text-xs">
                  Enter bet amount to see winnings
                </Badge>
              ) : currentScoreKey && !isLoadingOdds ? (
                <Badge variant="outline" className="border-gray-400 text-gray-500 px-3 py-1 text-xs">
                  Odds unavailable
                </Badge>
              ) : null}
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

          
        </CardContent>
      </Card>
    </div>
  );
};