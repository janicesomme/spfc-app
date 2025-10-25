import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Square, Clock, Megaphone, Zap, Search, Sparkles, MessageSquare } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export default function PresenterDashboard() {
  const [isLive, setIsLive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pinnedMessage, setPinnedMessage] = useState("");
  const [countdownMinutes, setCountdownMinutes] = useState(2);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cuedProductId, setCuedProductId] = useState<string | null>(null);
  const [highlightedComment, setHighlightedComment] = useState("");
  const [talkingPoints, setTalkingPoints] = useState("");

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(20);
        setProducts(fetchedProducts || []);
      } catch (error) {
        console.error("Failed to load products:", error);
        toast.error("Failed to load products");
      }
    };
    loadProducts();
  }, []);

  // Timer for elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGoLive = () => {
    setIsLive(!isLive);
    if (!isLive) {
      setElapsedTime(0);
      toast.success("🔴 You are now LIVE!");
    } else {
      toast.info("Stream ended");
    }
  };

  const handlePushMessage = () => {
    if (!pinnedMessage.trim()) return;
    toast.success("Message pushed to viewers!", {
      description: pinnedMessage
    });
    setPinnedMessage("");
  };

  const handleStartCountdown = () => {
    if (countdownMinutes <= 0) return;
    toast.success(`⚡ ${countdownMinutes} minute flash deal started!`, {
      description: "Countdown visible to viewers"
    });
  };

  const handleCueProduct = (product: ShopifyProduct) => {
    setCuedProductId(product.node.id);
    toast.success("Product cued!", {
      description: `${product.node.title} is now showing to viewers`,
      duration: 3000
    });
  };

  const filteredProducts = products.filter(product =>
    product.node.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mockComments = [
    { user: "RedDevil99", text: "Love this sweatshirt! 🔥", time: "2m ago" },
    { user: "UnitedFan23", text: "Do you have any hoodies?", time: "5m ago" },
    { user: "ManUtdLegend", text: "Just ordered mine!", time: "7m ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Presenter Dashboard</h1>
        <p className="text-muted-foreground">Live control hub for your selling event</p>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN - Show Controls */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Show Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Go Live Button */}
            <div className="space-y-2">
              <Button
                onClick={handleGoLive}
                className={`w-full h-16 text-lg font-bold transition-all ${
                  isLive 
                    ? "bg-destructive hover:bg-destructive/90 animate-pulse" 
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                {isLive ? (
                  <>
                    <Square className="w-6 h-6 mr-2" />
                    End Stream
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 mr-2" />
                    Go Live
                  </>
                )}
              </Button>
              <Badge variant={isLive ? "destructive" : "secondary"} className="w-full justify-center py-2">
                {isLive ? "🔴 LIVE" : "⚫ OFF AIR"}
              </Badge>
            </div>

            {/* Timer */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Elapsed Time
              </label>
              <div className="text-4xl font-mono font-bold text-center py-4 bg-muted rounded-lg">
                {formatTime(elapsedTime)}
              </div>
            </div>

            {/* Pinned Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Megaphone className="w-4 h-4" />
                Pinned Message
              </label>
              <Textarea
                placeholder="e.g., ⚡ Flash Deal for 5 mins!"
                value={pinnedMessage}
                onChange={(e) => setPinnedMessage(e.target.value)}
                rows={3}
              />
              <Button 
                onClick={handlePushMessage} 
                variant="secondary"
                className="w-full"
                disabled={!pinnedMessage.trim()}
              >
                Push to Viewers
              </Button>
            </div>

            {/* Countdown Deal */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Flash Deal Countdown
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="1"
                  max="60"
                  value={countdownMinutes}
                  onChange={(e) => setCountdownMinutes(parseInt(e.target.value) || 1)}
                  className="flex-1"
                />
                <span className="flex items-center text-sm text-muted-foreground">mins</span>
              </div>
              <Button 
                onClick={handleStartCountdown}
                className="w-full bg-[#C8102E] hover:bg-[#A00D24]"
              >
                Start Countdown
              </Button>
            </div>

          </CardContent>
        </Card>

        {/* CENTER COLUMN - Product Cue Board */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Product Cue Board</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? "No products found" : "No products available"}
                </div>
              ) : (
                filteredProducts.map((product) => {
                  const imageUrl = product.node.images.edges[0]?.node.url;
                  const price = product.node.priceRange.minVariantPrice;
                  const isCued = cuedProductId === product.node.id;

                  return (
                    <Card 
                      key={product.node.id}
                      className={`transition-all ${isCued ? "ring-2 ring-[#C8102E] shadow-lg" : ""}`}
                    >
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                            {imageUrl ? (
                              <img 
                                src={imageUrl} 
                                alt={product.node.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate mb-1">
                              {product.node.title}
                            </h4>
                            <p className="text-[#C8102E] font-bold text-sm mb-2">
                              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                            </p>
                            <Button
                              onClick={() => handleCueProduct(product)}
                              size="sm"
                              className={`w-full ${
                                isCued 
                                  ? "bg-[#C8102E] hover:bg-[#A00D24]" 
                                  : "bg-secondary hover:bg-secondary/80"
                              }`}
                            >
                              {isCued ? "✓ Cued" : "Cue Product"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN - Audience & Notes */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Audience & Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Live Chat Viewer */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Live Chat</label>
              <div className="bg-muted rounded-lg p-4 space-y-3 max-h-[200px] overflow-y-auto">
                {mockComments.map((comment, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{comment.user}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 text-xs"
                      onClick={() => {
                        setHighlightedComment(comment.text);
                        toast.success("Comment highlighted!", {
                          description: "Now showing to all viewers"
                        });
                      }}
                    >
                      Highlight
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlighted Comment */}
            {highlightedComment && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Currently Highlighted</label>
                <div className="bg-[#C8102E]/10 border border-[#C8102E] rounded-lg p-3">
                  <p className="text-sm">{highlightedComment}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 text-xs mt-2"
                    onClick={() => setHighlightedComment("")}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}

            {/* Talking Points */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Talking Points / Script</label>
              <Textarea
                placeholder="Your show notes, talking points, and script..."
                value={talkingPoints}
                onChange={(e) => setTalkingPoints(e.target.value)}
                rows={8}
                className="resize-none"
              />
              <Button
                variant="outline"
                className="w-full"
                disabled
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Talking Points (Coming Soon)
              </Button>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}
