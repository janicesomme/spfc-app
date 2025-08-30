import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Leaderboard = () => {
  const [showMyRank, setShowMyRank] = useState(false);

  const leaderboardData = [
    { rank: 1, name: "Janice", points: 2155, trend: "up" },
    { rank: 2, name: "BarryTheRed", points: 1902, trend: "up" },
    { rank: 3, name: "RonaldoSZN", points: 1790, trend: "down" },
    { rank: 4, name: "FootyFan92", points: 1559, trend: "up" },
    { rank: 5, name: "RedDevil", points: 1556, trend: "same" },
    { rank: 6, name: "ArsenalACE", points: 1483, trend: "down" },
    { rank: 7, name: "PredictorPro", points: 1416, trend: "up" },
    { rank: 8, name: "MatchMaster", points: 1405, trend: "same" },
    { rank: 9, name: "ScoreGuru", points: 1394, trend: "down" },
    { rank: 10, name: "GoalGetter", points: 1389, trend: "up" },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2 L16 8 L13 8 L13 18 L7 18 L7 8 L4 8 Z" fill="#16a34a" />
        </svg>
      );
      case "down": return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 18 L4 12 L7 12 L7 2 L13 2 L13 12 L16 12 Z" fill="#dc2626" />
        </svg>
      );
      default: return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10 L16 10" stroke="#6b7280" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 relative bg-gradient-to-b from-purple-900 to-purple-700">
      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            📊 Top 10 Predictors This Week
          </h1>
          <p className="text-white/90">
            See who's leading the prediction game!
          </p>
        </div>

        <Card className="shadow-lg mb-6">
          <CardHeader className="bg-red-600">
            <CardTitle className="text-center text-xl text-white">
              Week 1 Standings
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {leaderboardData.map((player, index) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
                    index < 3 ? "bg-gradient-to-r from-primary/5 to-accent/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl font-bold min-w-[3rem] text-center">
                      {getRankBadge(player.rank)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">
                        {player.name}
                      </div>
                      {index < 3 && (
                        <div className="text-sm text-muted-foreground">
                          {index === 0 && "🔥 On fire!"}
                          {index === 1 && "🎯 Sharp shooter"}
                          {index === 2 && "⚡ Rising star"}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-bold">
                      £{player.points}
                    </Badge>
                    <span className="text-lg">
                      {getTrendIcon(player.trend)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Button
            onClick={() => setShowMyRank(!showMyRank)}
            variant="outline"
            className="w-full h-12 text-lg font-semibold"
          >
            {showMyRank ? "Hide My Rank" : "See My Rank"} 👀
          </Button>

          {showMyRank && (
            <Card className="shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-xl font-bold">#47</div>
                      <div>
                        <div className="font-semibold text-foreground">You</div>
                        <div className="text-sm text-muted-foreground">
                          Keep climbing! 💪
                        </div>
                      </div>
                  </div>
                  <Badge variant="secondary" className="font-bold">
                    £2
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <p className="text-sm text-white/80">
            Updated after each match. New week starts Monday!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;