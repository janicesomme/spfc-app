import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyPredictions = () => {
  const predictions = [
    {
      id: 1,
      match: "Man Utd vs Arsenal",
      actualScore: "2-1",
      myPrediction: "3-1",
      points: 1,
      status: "partial",
      date: "Aug 10",
    },
    {
      id: 2,
      match: "Chelsea vs Liverpool",
      actualScore: "1-1",
      myPrediction: "1-1",
      points: 3,
      status: "perfect",
      date: "Aug 3",
    },
    {
      id: 3,
      match: "Arsenal vs Tottenham",
      actualScore: "3-0",
      myPrediction: "2-1",
      points: 1,
      status: "partial",
      date: "Jul 27",
    },
    {
      id: 4,
      match: "Man City vs Newcastle",
      actualScore: "4-1",
      myPrediction: "1-2",
      points: 0,
      status: "miss",
      date: "Jul 20",
    },
  ];

  const getStatusBadge = (status: string, points: number) => {
    switch (status) {
      case "perfect":
        return <Badge className="bg-success text-success-foreground">Perfect! +{points}</Badge>;
      case "partial":
        return <Badge variant="secondary">Close! +{points}</Badge>;
      case "miss":
        return <Badge variant="destructive">Miss +{points}</Badge>;
      default:
        return null;
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "perfect": return "🎯";
      case "partial": return "📍";
      case "miss": return "❌";
      default: return "";
    }
  };

  const totalPoints = predictions.reduce((sum, pred) => sum + pred.points, 0);
  const averagePoints = (totalPoints / predictions.length).toFixed(1);

  return (
    <div className="min-h-screen pb-20 md:pb-0 relative">
      {/* Red textured wave background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/7c7fdd19-42d9-4736-ad54-35b3bfe2bfb6.png')`
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            🧠 Your Predictions So Far
          </h1>
          <p className="text-white/90">
            Track your prediction accuracy and points
          </p>
        </div>

        {/* Stats Overview */}
        <Card className="shadow-lg mb-6">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
            <CardTitle className="text-center text-xl">Your Stats</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{averagePoints}</div>
                <div className="text-sm text-muted-foreground">Avg per Game</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{predictions.length}</div>
                <div className="text-sm text-muted-foreground">Predictions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predictions List */}
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <Card key={prediction.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {prediction.match}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {prediction.date}
                    </p>
                  </div>
                  <div className="text-2xl">
                    {getStatusEmoji(prediction.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Actual Score</div>
                    <div className="text-lg font-bold text-foreground">
                      {prediction.actualScore}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Your Prediction</div>
                    <div className="text-lg font-bold text-primary">
                      {prediction.myPrediction}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  {getStatusBadge(prediction.status, prediction.points)}
                  <div className="text-sm text-muted-foreground">
                    {prediction.status === "perfect" && "Exact match! 🔥"}
                    {prediction.status === "partial" && "Right result! 👍"}
                    {prediction.status === "miss" && "Better luck next time!"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <p className="text-lg font-semibold text-foreground mb-2">
                Keep it up! 💪
              </p>
              <p className="text-sm text-muted-foreground">
                Perfect predictions = 3 points • Correct result = 1 point
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyPredictions;