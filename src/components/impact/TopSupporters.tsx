import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Flame, ThumbsUp } from "lucide-react";

const supporters = [
  { name: "Sarah J", initials: "SJ", purchases: 3, icon: Heart, color: "text-[#C8102E]" },
  { name: "RedDevil99", initials: "RD", purchases: 2, icon: Flame, color: "text-[#D4AF37]" },
  { name: "FanGirl23", initials: "FG", purchases: 5, icon: ThumbsUp, color: "text-[#C8102E]" },
];

export const TopSupporters = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Top Supporters</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your name appears here when you buy during a Charity Hangout!
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {supporters.map((supporter, index) => {
            const Icon = supporter.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-12 w-12 border-2 border-[#D4AF37]">
                  <AvatarFallback className="bg-card text-foreground font-bold">
                    {supporter.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${supporter.color}`} />
                    <span className="font-semibold text-foreground">{supporter.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {supporter.purchases} {supporter.purchases === 1 ? 'purchase' : 'purchases'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
