
import React from 'react';
import { Button } from '@/components/ui/button';

interface PlayerProfileCardProps {
  playerName?: string;
  currentClub?: string;
  fee?: string;
  age?: number;
  height?: string;
  imageUrl?: string;
  tacticalFit?: string;
  marketCompetition?: string;
  riskFactors?: string;
  finalSummary?: string;
  onViewFullProfile?: () => void;
}

export function PlayerProfileCard({
  playerName = "PLAYER NAME",
  currentClub = "CURRENT CLUB",
  fee = "€4,9 m",
  age = 24,
  height = "1,85m",
  imageUrl = "/lovable-uploads/c860ed07-9d23-46b8-984f-1c1fdeb4ecb6.png",
  tacticalFit = "Strong fit for the team's pressing and transition play style, capable of executing high defensive work rates. His versatility allows him to adapt to multiple formations and tactical setups. The player's work ethic and determination make him an ideal candidate for our system.",
  marketCompetition = "High demand from several top clubs will likely drive up the price and complicate negotiations. Competition includes other Premier League sides and European giants. Early action will be crucial to secure his signature before the market heats up further.",
  riskFactors = "Moderate injury risk due to past issues but has shown improved durability recently. Age factor may limit long-term investment value compared to younger alternatives. Contract situation could complicate negotiations if not addressed promptly.",
  finalSummary = "Recommended signing with moderate risk. Strong tactical fit outweighs concerns about market competition and injury history. The player represents excellent value for money given his proven track record and immediate impact potential.",
  onViewFullProfile
}: PlayerProfileCardProps) {
  return (
    <div className="min-h-screen bg-black text-white font-['Inter'] overflow-y-auto">
      <div className="max-w-md mx-auto bg-black">
        {/* TOP SECTION - Image & Name */}
        <div className="flex flex-col items-center pt-8 pb-4 px-6">
          {/* Player Image */}
          <div className="w-48 h-48 mb-4">
            <img
              src={imageUrl}
              alt={playerName}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          {/* Player Name */}
          <h1 className="text-3xl font-bold text-yellow-400 text-center mb-2 tracking-wide">
            {playerName.toLowerCase()}
          </h1>
          
          {/* Current Club */}
          <p className="text-white text-sm uppercase tracking-wider font-medium">
            {currentClub.toUpperCase()}
          </p>
        </div>

        {/* BASIC INFO BAR */}
        <div className="px-6 mb-4">
          <div className="flex justify-between items-center text-white font-mono text-sm">
            <div className="flex items-center">
              <span className="text-red-500">Fee:</span>
              <span className="ml-1">{fee}</span>
            </div>
            <div className="flex items-center">
              <span className="text-red-500">Age:</span>
              <span className="ml-1">{age}</span>
            </div>
            <div className="flex items-center">
              <span className="text-red-500">Ht:</span>
              <span className="ml-1">{height}</span>
            </div>
          </div>
        </div>

        {/* STATS SECTIONS */}
        <div className="px-6 space-y-4">
          {/* TACTICAL FIT */}
          <div>
            <h2 className="text-red-500 font-bold text-lg mb-2 tracking-wide">
              TACTICAL FIT
            </h2>
            <p className="text-white text-xs leading-relaxed">
              {tacticalFit}
            </p>
          </div>

          {/* MARKET COMPETITION */}
          <div>
            <h2 className="text-red-500 font-bold text-lg mb-2 tracking-wide">
              MARKET COMPETITION
            </h2>
            <p className="text-white text-xs leading-relaxed">
              {marketCompetition}
            </p>
          </div>

          {/* RISK FACTORS */}
          <div>
            <h2 className="text-red-500 font-bold text-lg mb-2 tracking-wide">
              RISK FACTORS
            </h2>
            <p className="text-white text-xs leading-relaxed">
              {riskFactors}
            </p>
          </div>

          {/* FINAL SUMMARY */}
          <div>
            <h2 className="text-red-500 font-bold text-lg mb-2 tracking-wide">
              FINAL SUMMARY
            </h2>
            <p className="text-white text-xs leading-relaxed">
              {finalSummary}
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <div className="px-6 pt-6 pb-8">
          <Button
            onClick={onViewFullProfile}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg tracking-wide transition-colors"
          >
            FULL TRANSFER PROFILE
          </Button>
        </div>
      </div>
    </div>
  );
}
