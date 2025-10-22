import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const chatQuotes = [
  { user: "RedDevil99", message: "Love this product! Best merch ever!" },
  { user: "FanGirl23", message: "When will you restock jerseys?" },
  { user: "UnitedForever", message: "Just bought 3 hoodies for my mates!" },
];

export function CommunityHighlights() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Community Highlights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {chatQuotes.map((quote, index) => (
            <div key={index} className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm">
                <span className="font-bold text-primary">{quote.user}:</span>{" "}
                <span className="text-foreground">{quote.message}</span>
              </p>
            </div>
          ))}
          
          <div className="pt-4 mt-4 border-t border-border">
            <Badge variant="default" className="bg-primary text-primary-foreground px-3 py-1.5">
              <Flame className="h-4 w-4 mr-1" />
              Most Loved Product: FUTV Hoodie
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
