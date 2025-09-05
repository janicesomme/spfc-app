import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BetTracker } from "@/components/predict/BetTracker";
import { ScorePredictor } from "@/components/predict/ScorePredictor";
import { FirstScorerPredictor } from "@/components/predict/FirstScorerPredictor";
import { PossessionPredictor } from "@/components/predict/PossessionPredictor";
import { ShotsPredictor } from "@/components/predict/ShotsPredictor";

const Predict = () => {
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [firstScorer, setFirstScorer] = useState("benjamin-sesko");
  const [possession, setPossession] = useState([55]);
  const [shotsOnTarget, setShotsOnTarget] = useState("7");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOdds, setSelectedOdds] = useState<string | null>(null);
  
  // Bet amounts
  const [scoreBet, setScoreBet] = useState("");
  const [scorerBet, setScorerBet] = useState("");
  const [possessionBet, setPossessionBet] = useState("");
  const [shotsBet, setShotsBet] = useState("");
  
  const { toast } = useToast();

  // Calculate total bet and remaining budget
  const totalBet = (parseFloat(scoreBet) || 0) + (parseFloat(scorerBet) || 0) + (parseFloat(possessionBet) || 0) + (parseFloat(shotsBet) || 0);
  const canSubmit = totalBet === 100;

  const handleSubmit = () => {
    if (!homeScore || !awayScore) {
      toast({
        title: "Missing scores!",
        description: "Please enter scores for both teams.",
        variant: "destructive",
      });
      return;
    }

    // Simulate saving prediction
    localStorage.setItem("currentPrediction", JSON.stringify({
      homeScore: parseInt(homeScore),
      awayScore: parseInt(awayScore),
      firstScorer,
      possession: possession[0],
      shotsOnTarget: parseInt(shotsOnTarget),
      selectedOddsFraction: selectedOdds,
      timestamp: new Date().toISOString()
    }));

    setIsSubmitted(true);
    toast({
      title: "Prediction submitted!",
      description: "You're locked in! Good luck! 🔥",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-800 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8 max-w-sm">
          <div className="text-center space-y-6 text-white">
            <div className="text-6xl">🎉</div>
            <div>
              <h3 className="text-2xl font-bold mb-2">You're locked in!</h3>
              <p className="text-lg mb-4">All predictions submitted!</p>
              <p className="font-semibold">Good luck! 🍀</p>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0 relative" style={{ background: 'radial-gradient(ellipse at center, rgba(160, 160, 160, 0.8) 0%, rgba(120, 120, 120, 0.6) 30%, rgba(80, 80, 80, 0.4) 50%, rgba(0, 0, 0, 1) 90%), black' }}>
      <BetTracker totalBet={totalBet} canSubmit={canSubmit} />

      {/* Red Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 relative z-10">
        <div className="container mx-auto px-4 pt-3 pb-0.5 max-w-md">
          {/* Header */}
          <div className="text-center text-white">
            <h1 className="text-2xl font-extrabold mb-2">Man City vs Man Utd</h1>
            <h2 className="text-lg font-bold mb-4">Emirates Stadium — Sept 14, 4:30pm</h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-md relative z-10">
        {/* Winner Banner with margin */}
        <div className="bg-yellow-400 rounded-2xl p-4 mb-8 border-2 border-black mt-[35px] md:mt-[5px]">
          <p className="text-black font-bold text-base">
            🎉 Last Week's Winner: <span className="text-red-600 font-extrabold">JaniceS</span> — £674 Won
          </p>
        </div>

        <div className="space-y-6">
          <ScorePredictor 
            homeScore={homeScore}
            awayScore={awayScore}
            betAmount={scoreBet}
            onHomeScoreChange={setHomeScore}
            onAwayScoreChange={setAwayScore}
            onBetAmountChange={setScoreBet}
            onSelectedOddsChange={setSelectedOdds}
          />

          <FirstScorerPredictor 
            selectedPlayer={firstScorer}
            betAmount={scorerBet}
            onPlayerChange={setFirstScorer}
            onBetAmountChange={setScorerBet}
          />

          <PossessionPredictor 
            possession={possession}
            betAmount={possessionBet}
            onPossessionChange={setPossession}
            onBetAmountChange={setPossessionBet}
          />

          <ShotsPredictor 
            shotsOnTarget={shotsOnTarget}
            betAmount={shotsBet}
            onShotsChange={setShotsOnTarget}
            onBetAmountChange={setShotsBet}
          />
        </div>

        {/* Submit Bets Button */}
        <div className="mt-12 mb-6">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full h-16 text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-black"
            size="lg"
          >
            Submit Bets 🔥
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/80">
            ⚠️ Risky choices bring big rewards! 🏆 Go for glory!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Predict;