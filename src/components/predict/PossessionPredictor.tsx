import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award } from "lucide-react";
import { QuickBetButtons } from "./QuickBetButtons";
import { useEffect, useState } from "react";

interface PossessionPredictorProps {
  possession: string;
  betAmount: string;
  onPossessionChange: (value: string) => void;
  onBetAmountChange: (value: string) => void;
}

const spfcPlayers = [
  { value: "joao-de-andrade", label: "Joao de Andrade" },
  { value: "sam-pratt", label: "Sam Pratt" },
  { value: "josh-mbala", label: "Josh Mbala" },
  { value: "ronaldo-brown", label: "Ronaldo Brown" },
  { value: "zacharias-bell", label: "Zacharias Bell" },
  { value: "ellis-pacer", label: "Ellis Pacer" },
  { value: "joseph-coleman", label: "Joseph Coleman" },
  { value: "kayode-adewale", label: "Kayode Adewale" },
  { value: "alexander-black", label: "Alexander Black" },
  { value: "michael-taylor", label: "Michael Taylor" },
  { value: "omar-sinclair", label: "Omar Sinclair" },
  { value: "dion-kemp", label: "Dion Kemp" },
  { value: "sam-walker", label: "Sam Walker" },
  { value: "ryan-liddle", label: "Ryan Liddle" },
  { value: "michael-olatunji", label: "Michael Olatunji" },
];

export const PossessionPredictor = ({
  possession,
  betAmount,
  onPossessionChange,
  onBetAmountChange
}: PossessionPredictorProps) => {
  return (
    <div className="relative p-4">
      {/* Glow effect background */}
      <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(160, 160, 160, 0.4) 0%, rgba(120, 120, 120, 0.3) 30%, rgba(80, 80, 80, 0.2) 50%, transparent 70%)' }}></div>

      <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black relative z-10">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
          <CardTitle className="text-2xl font-extrabold text-center flex items-center justify-between">
            <span>SPFC MOTM</span>
            <Award className="w-8 h-8" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6 bg-white">
          <div className="space-y-3">
            <label className="block text-lg font-bold text-center text-gray-700">
              🏆 Who will be Man of the Match?
            </label>
            <Select value={possession} onValueChange={onPossessionChange}>
              <SelectTrigger className="h-16 text-2xl font-bold shadow-lg border-2 border-gray-300 rounded-xl bg-gray-100 text-black">
                <SelectValue placeholder="Select player" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {spfcPlayers.map((player) => (
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
                Potential winnings: {(parseFloat(betAmount) * 3.5).toFixed(0)} pts
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