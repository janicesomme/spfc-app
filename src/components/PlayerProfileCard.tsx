
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
  imageUrl = "/lovable-uploads/99e4de47-e29d-43b1-9a6c-bc8c4d3eae80.png",
  tacticalFit = "Strong fit for the team's pressing and transition play style, capable of executing high defensive work rates.",
  marketCompetition = "High demand from several top clubs will likely drive up the price and complicate negotiations.",
  riskFactors = "Moderate injury risk due to past issues but has shown improved durability recently.",
  finalSummary = "Recommended signing with moderate risk. Strong tactical fit outweighs concerns about market competition and injury history.",
  onViewFullProfile
}: PlayerProfileCardProps) {
  return (
    <div className="min-h-screen bg-black text-white font-['Inter'] overflow-y-auto">
      <div className="max-w-md mx-auto bg-black">
        {/* TOP SECTION - Image & Name */}
        <div className="flex flex-col items-center pt-8 pb-6 px-6">
          {/* Player Image */}
          <div className="w-48 h-48 mb-6">
            <img
              src={imageUrl}
              alt={playerName}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          {/* Player Name */}
          <h1 className="text-3xl font-bold text-yellow-400 text-center mb-2 tracking-wide">
            {playerName}
          </h1>
          
          {/* Current Club */}
          <p className="text-white text-sm uppercase tracking-wider font-medium">
            {currentClub}
          </p>
        </div>

        {/* BASIC INFO BAR */}
        <div className="px-6 mb-8">
          <div className="flex justify-between items-center text-white font-mono text-lg">
            <div className="flex items-center space-x-2">
              <span className="text-red-500">€</span>
              <span>{fee}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">👤</span>
              <span>{age}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">📏</span>
              <span>{height}</span>
            </div>
          </div>
        </div>

        {/* STATS SECTIONS */}
        <div className="px-6 space-y-6">
          {/* TACTICAL FIT */}
          <div>
            <h2 className="text-red-500 font-bold text-lg mb-3 tracking-wide">
              TACTICAL FIT
            </h2>
            <p className="text-white text-sm leading-relaxed">
              {tacticalFit}
            </p>
          </div>

          {/* MARKET COMPETITION */}
          <div>
            <h2 className="text-red-500 font-bold text-lg mb-3 tracking-wide">
              MARKET COMPETITION
            </h2>
            <p className="text-white text-sm leading-relaxed">
              {marketCompetition}
            </p>
          </div>

          {/* RISK FACTORS */}
          <div>
            <h2 className="text-red-500 font-bold text-lg mb-3 tracking-wide">
              RISK FACTORS
            </h2>
            <p className="text-white text-sm leading-relaxed">
              {riskFactors}
            </p>
          </div>

          {/* FINAL SUMMARY */}
          <div>
            <h2 className="text-red-500 font-bold text-lg mb-3 tracking-wide">
              FINAL SUMMARY
            </h2>
            <p className="text-white text-sm leading-relaxed">
              {finalSummary}
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <div className="px-6 pt-8 pb-8">
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
