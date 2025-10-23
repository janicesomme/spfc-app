import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Comment {
  id: number;
  author: string;
  preference: 'A' | 'B';
  comment: string;
  timestamp: string;
}

export default function Vote() {
  const [voted, setVoted] = useState<'A' | 'B' | null>(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "RedDevil99",
      preference: "A",
      comment: "Product A is absolutely brilliant! The quality is top-notch and the design is spot on. Worth every penny!",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "FanGirl23",
      preference: "B",
      comment: "I'm voting B because it's more practical for daily use. Love the color and it fits perfectly in my routine.",
      timestamp: "3 hours ago"
    },
    {
      id: 3,
      author: "ManUtdFan",
      preference: "A",
      comment: "Product A all the way! The craftsmanship is incredible and it shows real attention to detail. FUTV never disappoints!",
      timestamp: "5 hours ago"
    },
    {
      id: 4,
      author: "Sarah_J",
      preference: "B",
      comment: "B wins for me - it's versatile, looks great, and the price point is perfect. Already ordered mine!",
      timestamp: "6 hours ago"
    }
  ]);

  const handleVote = (product: 'A' | 'B') => {
    setVoted(voted === product ? null : product);
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: "You",
        preference: voted || 'A',
        comment: newComment.trim(),
        timestamp: "Just now"
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
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

        {/* Fan Comments Section */}
        <Card className="shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
              Fan Comments
            </h2>
            
            {/* Add Comment */}
            <div className="space-y-3 mb-6 pb-6 border-b">
              <Textarea
                placeholder="Share which product you prefer and why..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <Button 
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="w-full sm:w-auto bg-[#C8102E] hover:bg-[#A00D24] text-white"
              >
                <Send className="mr-2 h-4 w-4" />
                Post Comment
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-lg bg-secondary/20 border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{comment.author}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        comment.preference === 'A' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        Prefers {comment.preference}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm sm:text-base text-foreground/90">{comment.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
