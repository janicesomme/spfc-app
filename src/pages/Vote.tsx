import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function Vote() {
  const [voted, setVoted] = useState<'A' | 'B' | null>(null);

  const handleVote = (product: 'A' | 'B') => {
    setVoted(voted === product ? null : product);
  };

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-4 sm:mb-8">
          Vote for Your Favourite
        </h1>

        {/* Products Side by Side */}
        <div className="space-y-4">
          <Card className="shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Product A */}
                <div className="space-y-2">
                  <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden flex items-center justify-center">
                    <img 
                      src="/products/futv-hoodie.png" 
                      alt="Product A" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-lg font-bold text-foreground">A</p>
                </div>
                
                {/* Product B */}
                <div className="space-y-2">
                  <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden flex items-center justify-center">
                    <img 
                      src="/products/futv-mug.png" 
                      alt="Product B" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-lg font-bold text-foreground">B</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Vote Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Button
              size="lg"
              variant={voted === 'A' ? 'default' : 'outline'}
              onClick={() => handleVote('A')}
              className="w-full sm:flex-1 sm:max-w-[200px] h-14 sm:h-16 text-base sm:text-lg font-bold bg-[#C8102E] hover:bg-[#A00D24] text-white border-0"
            >
              <ThumbsUp className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              THUMBS UP A
            </Button>
            <Button
              size="lg"
              variant={voted === 'B' ? 'default' : 'outline'}
              onClick={() => handleVote('B')}
              className="w-full sm:flex-1 sm:max-w-[200px] h-14 sm:h-16 text-base sm:text-lg font-bold bg-[#C8102E] hover:bg-[#A00D24] text-white border-0"
            >
              <ThumbsDown className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              THUMBS UP B
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
              {/* Product A Result */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-semibold text-foreground">Product A</span>
                  <span className="text-base sm:text-lg font-bold text-primary">57%</span>
                </div>
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '57%' }} />
                </div>
              </div>
              
              {/* Product B Result */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-semibold text-foreground">Product B</span>
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
