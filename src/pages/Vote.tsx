import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
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
      <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-foreground mb-8">
          Vote for Your Favourite
        </h1>

        {/* Video A */}
        <div className="space-y-4">
          <div className="relative w-full aspect-video bg-secondary rounded-lg border border-border flex items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground">Video A</span>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant={votedA === 'up' ? 'default' : 'outline'}
              onClick={() => handleVote('A', 'up')}
              className="flex-1 max-w-[200px] h-14 text-lg font-bold"
            >
              <ThumbsUp className="mr-2 h-6 w-6" />
              Thumbs Up
            </Button>
            <Button
              size="lg"
              variant={votedA === 'down' ? 'default' : 'outline'}
              onClick={() => handleVote('A', 'down')}
              className="flex-1 max-w-[200px] h-14 text-lg font-bold"
            >
              <ThumbsDown className="mr-2 h-6 w-6" />
              Thumbs Down
            </Button>
          </div>
        </div>

        {/* Video B */}
        <div className="space-y-4">
          <div className="relative w-full aspect-video bg-secondary rounded-lg border border-border flex items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground">Video B</span>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant={votedB === 'up' ? 'default' : 'outline'}
              onClick={() => handleVote('B', 'up')}
              className="flex-1 max-w-[200px] h-14 text-lg font-bold"
            >
              <ThumbsUp className="mr-2 h-6 w-6" />
              Thumbs Up
            </Button>
            <Button
              size="lg"
              variant={votedB === 'down' ? 'default' : 'outline'}
              onClick={() => handleVote('B', 'down')}
              className="flex-1 max-w-[200px] h-14 text-lg font-bold"
            >
              <ThumbsDown className="mr-2 h-6 w-6" />
              Thumbs Down
            </Button>
          </div>
        </div>

        {/* Results Placeholder */}
        <div className="mt-12 p-8 bg-secondary/50 rounded-lg border border-border text-center">
          <h2 className="text-xl font-bold text-muted-foreground">
            Results Coming Soon
          </h2>
        </div>
      </div>
    </Layout>
  );
}
