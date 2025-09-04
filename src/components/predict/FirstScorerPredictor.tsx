import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown } from "lucide-react";
import { QuickBetButtons } from "./QuickBetButtons";
import { OddsDisplay } from "./OddsDisplay";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface FirstScorerPredictorProps {
  selectedPlayer: string;
  betAmount: string;
  onPlayerChange: (value: string) => void;
  onBetAmountChange: (value: string) => void;
}

const unitedPlayers = [
  { value: "benjamin-sesko", label: "Benjamin Sesko" },
  { value: "chido-obi-martin", label: "Chido Obi-Martin" },
  { value: "joshua-zirkzee", label: "Joshua Zirkzee" },
  { value: "mattheus-cunha", label: "Mattheus Cunha" },
  { value: "bryan-mbuemo", label: "Bryan Mbuemo" },
  { value: "amad-diallo", label: "Amad-Diallo" },
  { value: "bruno-fernandes", label: "Bruno Fernandes" },
  { value: "carlos-casemiro", label: "Casemiro" },
  { value: "mason-mount", label: "Mason Mount" },
  { value: "matijis-deligt", label: "Matijis DeLigt" },
  { value: "manuel-ugarte", label: "Manuel Ugarte" },
  { value: "kobbie-manioo", label: "Koddie Mainoo" },
  { value: "ethan-wheatly", label: "Ethan Wheatley" },
  { value: "patrick-dorgu", label: "Patrick Dorgu" },
  { value: "leny-yoro", label: "Leny Yoro" },
  { value: "noussair-mazraoui", label: "Noussair Mazraoui" },
  { value: "ayden-heaven", label: "Ayden Heaven" },
  { value: "tyler-fredricson", label: "Tyler Fredricson" },
  { value: "harry-amass", label: "Harry Amass" },
  { value: "lisandro-martinez", label: "Lisandro Martinez" },
  { value: "luke-shaw", label: "Luke Shaw" },
  { value: "diogo-dalot", label: "Diogo Dalot" },
  { value: "altay-bayindir", label: "Altay Bayindir" },
  { value: "andre-onana", label: "Andre Onana" },
];

export const FirstScorerPredictor = ({
  selectedPlayer,
  betAmount,
  onPlayerChange,
  onBetAmountChange
}: FirstScorerPredictorProps) => {
  const [oddsBySlug, setOddsBySlug] = useState<{ [key: string]: string }>({});
  const [selectedFirstScorerOdds, setSelectedFirstScorerOdds] = useState<string | null>(null);

  useEffect(() => {
    const fetchOdds = async () => {
      const playerSlugs = unitedPlayers.map(p => p.value);
      const { data, error } = await (supabase as any)
        .from('first_scorer_odds')
        .select('player_slug, fraction')
        .in('player_slug', playerSlugs);
      
      if (data && !error) {
        const oddsMap: { [key: string]: string } = {};
        data.forEach((item: any) => {
          oddsMap[item.player_slug] = item.fraction;
        });
        setOddsBySlug(oddsMap);
      }
    };

    fetchOdds();
  }, []);

  const handlePlayerChange = (value: string) => {
    onPlayerChange(value);
    setSelectedFirstScorerOdds(oddsBySlug[value] || null);
  };

  return (
    <div className="relative p-4">
      {/* Glow effect background */}
      <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(160, 160, 160, 0.4) 0%, rgba(120, 120, 120, 0.3) 30%, rgba(80, 80, 80, 0.2) 50%, transparent 70%)' }}></div>
      
      <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black relative z-10">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
          <CardTitle className="text-2xl font-extrabold text-center flex items-center justify-between">
            <span>FIRST UNITED SCORER</span>
            <Crown className="w-8 h-8" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6 bg-white">
          <div className="space-y-3">
            <label className="block text-lg font-bold text-center text-gray-700">
              🔴 Who scores first for United?
            </label>
            <Select value={selectedPlayer} onValueChange={handlePlayerChange}>
              <SelectTrigger className="h-16 text-2xl font-bold shadow-lg border-2 border-gray-300 rounded-xl bg-gray-100 text-black">
                <SelectValue placeholder="Select player" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {unitedPlayers.map((player) => (
                  <SelectItem key={player.value} value={player.value} className="text-xl font-bold text-black">
                    {player.label + (oddsBySlug[player.value] ? " (" + oddsBySlug[player.value] + ")" : "")}
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
                ENTER PREDICTION
              </div>
            </div>
          </div>
          
          {/* Potential Winnings Calculator */}
          <div className="flex justify-center mt-3">
            {betAmount && parseFloat(betAmount) > 0 ? (
              <div className="bg-green-600 text-white border-black border-2 px-3 py-1 text-sm font-bold rounded">
                Potential winnings: £{(parseFloat(betAmount) * 3.0).toFixed(2)}
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