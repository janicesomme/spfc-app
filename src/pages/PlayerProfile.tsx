
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
      playerName="ALEXANDER ISAK"
      currentClub="NEWCASTLE UNITED"
      fee="€65M"
      age={24}
      height="6ft 2in"
      tacticalFit="Strong fit for the team's pressing and transition play style, capable of executing high defensive work rates."
      marketCompetition="High demand from several top clubs will likely drive up the price and complicate negotiations."
      riskFactors="Moderate injury risk due to past issues but has shown improved durability recently."
      finalSummary="Recommended signing with moderate risk. Strong tactical fit outweighs concerns about market competition and injury history."
      onViewFullProfile={handleViewFullProfile}
    />
  );
}
