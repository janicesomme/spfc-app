import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown } from "lucide-react";
import { QuickBetButtons } from "./QuickBetButtons";
import { OddsDisplay } from "./OddsDisplay";

interface FirstScorerPredictorProps {
  selectedPlayer: string;
  betAmount: string;
  onPlayerChange: (value: string) => void;
  onBetAmountChange: (value: string) => void;
}

const unitedPlayers = [
  { value: "benjamin-sesko", label: "Benjamin Sesko" },
  { value: "rasmus-hojlund", label: "Rasmus Højlund" },
  { value: "mattheus-cunha", label: "Mattheus Cunha" },
  { value: "bryan-mbuemo", label: "Bryan Mbuemo" },
  { value: "amad-diallo", label: "Amad-Diallo" },
  { value: "bruno-fernandes", label: "Bruno Fernandes" },
  { value: "casemiro", label: "Casemiro" },
  { value: "mason-mount", label: "Mason Mount" },
  { value: "matijis-deligt", label: "Matijis DeLigt" },
  { value: "manuel-ugarte", label: "Manuel-Ugarte" },
];

export const FirstScorerPredictor = ({
  selectedPlayer,
  betAmount,
  onPlayerChange,
  onBetAmountChange
}: FirstScorerPredictorProps) => {
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
            <Select value={selectedPlayer} onValueChange={onPlayerChange}>
              <SelectTrigger className="h-16 text-2xl font-bold shadow-lg border-2 border-gray-300 rounded-xl bg-gray-100 text-black">
                <SelectValue placeholder="Select player" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {unitedPlayers.map((player) => (
                  <SelectItem key={player.value} value={player.value} className="text-xl font-bold text-black">
                    {player.label}
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
    </div>
  );
};