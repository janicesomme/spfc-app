
import React from 'react';
import { PlayerProfileCard } from '@/components/PlayerProfileCard';
import { useNavigate } from 'react-router-dom';

export default function PlayerProfile() {
  const navigate = useNavigate();

  const handleViewFullProfile = () => {
    console.log('Navigate to full transfer profile');
    // Add navigation logic here when needed
  };

  return (
    <PlayerProfileCard
      playerName="alexander isak"
      currentClub="newcastle united"
      fee="€65M"
      age={24}
      height="6ft 2in"
      tacticalFit="Strong fit for the team's pressing and transition play style, capable of executing high defensive work rates. His versatility allows him to adapt to multiple formations and tactical setups. The player's work ethic and determination make him an ideal candidate for our system."
      marketCompetition="High demand from several top clubs will likely drive up the price and complicate negotiations. Competition includes other Premier League sides and European giants. Early action will be crucial to secure his signature before the market heats up further."
      riskFactors="Moderate injury risk due to past issues but has shown improved durability recently. Age factor may limit long-term investment value compared to younger alternatives. Contract situation could complicate negotiations if not addressed promptly."
      finalSummary="Recommended signing with moderate risk. Strong tactical fit outweighs concerns about market competition and injury history. The player represents excellent value for money given his proven track record and immediate impact potential."
      onViewFullProfile={handleViewFullProfile}
    />
  );
}
