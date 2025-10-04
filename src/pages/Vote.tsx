import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function Vote() {
  const [votedA, setVotedA] = useState<'up' | 'down' | null>(null);
  const [votedB, setVotedB] = useState<'up' | 'down' | null>(null);

  const handleVote = (video: 'A' | 'B', type: 'up' | 'down') => {
    if (video === 'A') {
      setVotedA(votedA === type ? null : type);
    } else {
      setVotedB(votedB === type ? null : type);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-4 sm:mb-8">
          Vote for Your Favourite
        </h1>

        {/* Video A */}
        <div className="space-y-4">
          <Card className="shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="relative w-full aspect-video bg-secondary/50 rounded-lg flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-muted-foreground">Video A</span>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Button
              size="lg"
              variant={votedA === 'up' ? 'default' : 'outline'}
              onClick={() => handleVote('A', 'up')}
              className="w-full sm:flex-1 sm:max-w-[200px] h-14 sm:h-16 text-base sm:text-lg font-bold"
            >
              <ThumbsUp className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Thumbs Up
            </Button>
            <Button
              size="lg"
              variant={votedA === 'down' ? 'default' : 'outline'}
              onClick={() => handleVote('A', 'down')}
              className="w-full sm:flex-1 sm:max-w-[200px] h-14 sm:h-16 text-base sm:text-lg font-bold"
            >
              <ThumbsDown className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Thumbs Down
            </Button>
          </div>
        </div>

        {/* Video B */}
        <div className="space-y-4">
          <Card className="shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="relative w-full aspect-video bg-secondary/50 rounded-lg flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-muted-foreground">Video B</span>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Button
              size="lg"
              variant={votedB === 'up' ? 'default' : 'outline'}
              onClick={() => handleVote('B', 'up')}
              className="w-full sm:flex-1 sm:max-w-[200px] h-14 sm:h-16 text-base sm:text-lg font-bold"
            >
              <ThumbsUp className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Thumbs Up
            </Button>
            <Button
              size="lg"
              variant={votedB === 'down' ? 'default' : 'outline'}
              onClick={() => handleVote('B', 'down')}
              className="w-full sm:flex-1 sm:max-w-[200px] h-14 sm:h-16 text-base sm:text-lg font-bold"
            >
              <ThumbsDown className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Thumbs Down
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <Card className="mt-8 sm:mt-12 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-foreground mb-6">
              Current Results
            </h2>
            <div className="space-y-6">
              {/* Video A Result */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-semibold text-foreground">Video A</span>
                  <span className="text-base sm:text-lg font-bold text-primary">57%</span>
                </div>
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '57%' }} />
                </div>
              </div>
              
              {/* Video B Result */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-semibold text-foreground">Video B</span>
                  <span className="text-base sm:text-lg font-bold text-primary">43%</span>
                </div>
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '43%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon Section */}
        <Card className="shadow-md border-dashed">
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm sm:text-base font-semibold text-muted-foreground">
              Coming Soon: Fan Comments
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
