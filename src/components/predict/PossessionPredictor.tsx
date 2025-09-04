import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { UserRound } from "lucide-react";
import { QuickBetButtons } from "./QuickBetButtons";
import { OddsDisplay } from "./OddsDisplay";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

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
  const [possessionMvp, setPossessionMvp] = useState<{ our_band_text?: string; fraction?: string; our_expected?: number } | null>(null);

  // Calculate odds based on difference from expected
  const calculateOdds = (userPick: number, expected: number): string => {
    const difference = Math.abs(userPick - expected);
    if (difference <= 3) return "4/1";
    if (difference <= 5) return "6/1";
    if (difference <= 7) return "8/1";
    return "12/1";
  };

  const computedOdds = possessionMvp?.our_expected 
    ? calculateOdds(possession[0], possessionMvp.our_expected)
    : "4/1";

  useEffect(() => {
    const fetchPossessionMvp = async () => {
      const { data, error } = await (supabase as any)
        .from('possession_mvp')
        .select('our_band_text, fraction, our_expected')
        .eq('fixture_id', '537822')
        .maybeSingle();
      
      if (data && !error) {
        setPossessionMvp(data);
      }
    };

    fetchPossessionMvp();
  }, []);
  return (
    <div className="relative p-4">
      {/* Glow effect background */}
      <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(160, 160, 160, 0.4) 0%, rgba(120, 120, 120, 0.3) 30%, rgba(80, 80, 80, 0.2) 50%, transparent 70%)' }}></div>
      
      <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black relative z-10">
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
            
            {possessionMvp && (
              <div className="text-center space-y-1 mt-3">
                <div className="text-sm text-gray-600">
                  Expected band: {possessionMvp.our_band_text}%
                </div>
                <div className="text-sm text-gray-600">
                  Your pick odds: {computedOdds}
                </div>
              </div>
            )}
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
                {computedOdds}
              </div>
            </div>
          </div>
          
          {/* Potential Winnings Calculator */}
          <div className="flex justify-center mt-3">
            {betAmount && parseFloat(betAmount) > 0 ? (
              <div className="bg-green-600 text-white border-black border-2 px-3 py-1 text-sm font-bold rounded">
                Potential winnings: £{(parseFloat(betAmount) * 2.5).toFixed(2)}
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