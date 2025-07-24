import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Trophy, ChevronRight, Calculator, MessageSquare, CircleDot, Crown, UserRound, Target } from "lucide-react";

const Predict = () => {
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [firstScorer, setFirstScorer] = useState("marcus-rashford");
  const [possession, setPossession] = useState([55]);
  const [shotsOnTarget, setShotsOnTarget] = useState("7");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Bet amounts
  const [scoreBet, setScoreBet] = useState("");
  const [scorerBet, setScorerBet] = useState("");
  const [possessionBet, setPossessionBet] = useState("");
  const [shotsBet, setShotsBet] = useState("");
  
  const { toast } = useToast();

  // Calculate total bet and remaining budget
  const totalBet = (parseFloat(scoreBet) || 0) + (parseFloat(scorerBet) || 0) + (parseFloat(possessionBet) || 0) + (parseFloat(shotsBet) || 0);
  const remainingBudget = 100 - totalBet;
  const canSubmit = totalBet === 100;

  const unitedPlayers = [
    { value: "marcus-rashford", label: "Marcus Rashford" },
    { value: "bruno-fernandes", label: "Bruno Fernandes" },
    { value: "casemiro", label: "Casemiro" },
    { value: "antony", label: "Antony" },
    { value: "mason-mount", label: "Mason Mount" },
    { value: "rasmus-hojlund", label: "Rasmus Højlund" }
  ];

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
      <div className="min-h-screen bg-gradient-to-b from-man-utd-red to-man-utd-dark-red pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8 max-w-sm">
          <div className="text-center space-y-6 text-white">
            <div className="text-6xl">🎉</div>
            <div>
              <h3 className="text-2xl font-bold mb-2">You're locked in!</h3>
              <p className="text-lg mb-4">All predictions submitted!</p>
              <p className="font-semibold">Good luck! 🍀</p>
            </div>
            
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="w-full h-12 bg-white text-man-utd-red border-white hover:bg-white/90"
            >
              Change Predictions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0 relative bg-[url('/lovable-uploads/5645fe5f-d11b-47bf-b2be-ebb0eb20f54a.png')] bg-no-repeat bg-cover bg-center">

      {/* Live Tracker - Responsive positioning */}
      <div className="fixed top-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border-2 border-black max-w-[280px] md:max-w-xs md:top-6 md:right-6 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg md:text-2xl">💰</span>
            <span className="font-bold text-sm md:text-lg text-red-600">Total Bets</span>
          </div>
        <div className={`text-lg md:text-2xl font-extrabold ${canSubmit ? 'text-green-600' : totalBet > 100 ? 'text-red-600' : 'text-red-600'}`}>
          £{totalBet.toFixed(0)}/£100
        </div>
        <p className="text-xs text-gray-600 mt-1">
          You must bet exactly £100 to lock in!
        </p>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Manchester United vs Arsenal</h1>
          <h2 className="text-xl font-bold mb-4">Old Trafford — Aug 10, 3:00pm</h2>
          
          {/* Top Scorer Banner */}
          <div className="bg-yellow-400 rounded-2xl p-4 mb-8 border-2 border-black">
            <p className="text-black font-bold text-base">
              🎉 Last Week's Winner: <span className="text-red-600 font-extrabold">TUSFan123</span> — £74 Won
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Predict the Score */}
          <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <CardTitle className="text-2xl font-extrabold text-center flex items-center justify-between">
                <span>PREDICT THE SCORE</span>
                <CircleDot className="w-8 h-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Score Inputs */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-center text-gray-700">
                  🏆 Final Score Prediction
                </label>
                <div className="flex items-center gap-4 justify-center">
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={homeScore}
                      onChange={(e) => setHomeScore(e.target.value)}
                      className="text-center !text-2xl !font-bold h-16 border-2 border-gray-300 rounded-xl"
                      placeholder="3"
                      min="0"
                      max="10"
                    />
                  </div>
                  <div className="text-2xl font-bold text-gray-600 px-2">-</div>
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={awayScore}
                      onChange={(e) => setAwayScore(e.target.value)}
                      className="text-center !text-2xl !font-bold h-16 border-2 border-gray-300 rounded-xl"
                      placeholder="1"
                      min="0"
                      max="10"
                    />
                  </div>
                </div>
              </div>

              {/* Preset Bet Buttons */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-center text-gray-700">
                  💰 Quick Bet Amounts
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[5, 10, 20, 50, 100].map((amount) => (
                    <Button
                      key={amount}
                      onClick={() => setScoreBet(amount.toString())}
                      variant={scoreBet === amount.toString() ? "default" : "outline"}
                      className="h-12 text-sm font-bold rounded-xl border-2 border-black"
                    >
                      £{amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bet Amount Input */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-center text-gray-700">
                  💸 Your Bet Amount
                </label>
                <CurrencyInput
                  placeholder="Enter amount"
                  value={scoreBet}
                  onChange={(e) => setScoreBet(e.target.value)}
                  className="text-center text-2xl font-bold h-16 border-2 border-gray-300 rounded-xl"
                />
              </div>

              {/* Odds Display */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-center text-gray-700">
                  📊 Current Odds
                </label>
                <div className="bg-gray-100 border-2 border-gray-300 rounded-xl h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">3/1</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* First United Scorer */}
          <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <CardTitle className="text-2xl font-extrabold text-center flex items-center justify-between">
                <span>FIRST UNITED SCORER</span>
                <Crown className="w-8 h-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Player Selection */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-center text-gray-700">
                  🔴 Who scores first for United?
                </label>
                <Select value={firstScorer} onValueChange={setFirstScorer}>
                  <SelectTrigger className="h-16 text-2xl font-bold shadow-lg border-2 border-gray-300 rounded-xl">
                    <SelectValue placeholder="Select player" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {unitedPlayers.map((player) => (
                      <SelectItem key={player.value} value={player.value} className="text-xl font-bold">
                        {player.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preset Bet Buttons */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-center text-gray-700">
                  💰 Quick Bet Amounts
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[5, 10, 20, 50, 100].map((amount) => (
                    <Button
                      key={amount}
                      onClick={() => setScorerBet(amount.toString())}
                      variant={scorerBet === amount.toString() ? "default" : "outline"}
                      className="h-12 text-sm font-bold rounded-xl border-2 border-black"
                    >
                      £{amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bet Amount Input */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-center text-gray-700">
                  💸 Your Bet Amount
                </label>
                <CurrencyInput
                  placeholder="Enter amount"
                  value={scorerBet}
                  onChange={(e) => setScorerBet(e.target.value)}
                  className="text-center text-2xl font-bold h-16 border-2 border-gray-300 rounded-xl"
                />
              </div>

              {/* Odds Display */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-center text-gray-700">
                  📊 Current Odds
                </label>
                <div className="bg-gray-100 border-2 border-gray-300 rounded-xl h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">3/1</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Man Utd Possession % */}
          <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <CardTitle className="text-2xl font-extrabold text-center flex items-center justify-between">
                <span>MAN UTD POSSESSION %</span>
                <UserRound className="w-8 h-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Possession Visual and Slider */}
              <div className="space-y-4">
                <label className="block text-lg font-bold text-center text-gray-700">
                  ⚽ What % of possession will United have?
                </label>
                {/* Possession Arc Visual */}
                <div className="relative flex justify-center">
                  <div className="w-40 h-20 relative">
                    <div className="absolute inset-0 border-8 border-gray-200 rounded-t-full"></div>
                    <div 
                      className="absolute inset-0 border-8 border-green-500 rounded-t-full"
                      style={{
                        clipPath: `polygon(0 100%, ${possession[0]}% 100%, ${possession[0]}% 0, 100% 0, 100% 100%)`
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-end justify-center pb-2">
                      <span className="text-3xl font-bold">{possession[0]}%</span>
                    </div>
                  </div>
                </div>
                
                <Slider
                  value={possession}
                  onValueChange={setPossession}
                  max={80}
                  min={30}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Preset Bet Buttons */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-center text-gray-700">
                  💰 Quick Bet Amounts
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[5, 10, 20, 50, 100].map((amount) => (
                    <Button
                      key={amount}
                      onClick={() => setPossessionBet(amount.toString())}
                      variant={possessionBet === amount.toString() ? "default" : "outline"}
                      className="h-12 text-sm font-bold rounded-xl border-2 border-black"
                    >
                      £{amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bet Amount Input */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-center text-gray-700">
                  💸 Your Bet Amount
                </label>
                <CurrencyInput
                  placeholder="Enter amount"
                  value={possessionBet}
                  onChange={(e) => setPossessionBet(e.target.value)}
                  className="text-center text-2xl font-bold h-16 border-2 border-gray-300 rounded-xl"
                />
              </div>

              {/* Odds Display */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-center text-gray-700">
                  📊 Current Odds
                </label>
                <div className="bg-gray-100 border-2 border-gray-300 rounded-xl h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">3/1</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Man Utd Shots on Target */}
        <Card className="shadow-2xl drop-shadow-lg rounded-2xl overflow-hidden bg-white border-4 border-black mb-6">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
            <CardTitle className="text-2xl font-extrabold text-center flex items-center justify-between">
              <span>MAN UTD SHOTS ON TARGET</span>
              <Target className="w-8 h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Shots Selection */}
            <div className="space-y-3">
              <label className="block text-lg font-bold text-center text-gray-700">
                🔢 How many shots on target?
              </label>
              <Select value={shotsOnTarget} onValueChange={setShotsOnTarget}>
                <SelectTrigger className="h-16 text-2xl font-bold shadow-lg border-2 border-gray-300 rounded-xl">
                  <SelectValue placeholder="Select shots" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {Array.from({ length: 16 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()} className="text-xl font-bold">
                      {i} shots
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preset Bet Buttons */}
            <div className="space-y-3">
              <label className="block text-lg font-bold text-center text-gray-700">
                💰 Quick Bet Amounts
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[5, 10, 20, 50, 100].map((amount) => (
                  <Button
                    key={amount}
                    onClick={() => setShotsBet(amount.toString())}
                    variant={shotsBet === amount.toString() ? "default" : "outline"}
                    className="h-12 text-sm font-bold rounded-xl border-2 border-black"
                  >
                    £{amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bet Amount Input */}
            <div className="space-y-3">
              <label className="block text-lg font-bold text-center text-gray-700">
                💸 Your Bet Amount
              </label>
              <CurrencyInput
                placeholder="Enter amount"
                value={shotsBet}
                onChange={(e) => setShotsBet(e.target.value)}
                className="text-center text-2xl font-bold h-16 border-2 border-gray-300 rounded-xl"
              />
            </div>

            {/* Odds Display */}
            <div className="space-y-3">
              <label className="block text-lg font-bold text-center text-gray-700">
                📊 Current Odds
              </label>
              <div className="bg-gray-100 border-2 border-gray-300 rounded-xl h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">3/1</span>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* Submit Bets Button */}
        <div className="mt-12 mb-6">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full h-16 text-xl font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-black"
            size="lg"
          >
            Submit Bets 🔥
          </Button>
        </div>
          
        {/* Discord Join Button */}
        <div className="mb-6">
          <Button
            className="w-full h-16 text-lg font-bold text-white hover:opacity-90 hover:shadow-2xl rounded-xl shadow-lg transition-all duration-200 border-2 border-black hover:border-yellow-400 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#1e52f1' }}
          >
            <MessageSquare size={24} />
            📢 Join Our Fan Discord
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