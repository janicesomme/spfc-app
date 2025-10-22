import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Trophy } from "lucide-react";

const highlights = [
  {
    message: "£45 added from a hoodie purchase!",
    icon: ShoppingBag,
    color: "text-[#D4AF37]",
    time: "2 hours ago",
  },
  {
    message: "£12 from FUTV Mug order — thank you, Michael!",
    icon: Heart,
    color: "text-[#C8102E]",
    time: "5 hours ago",
  },
  {
    message: "£2,000 milestone reached — amazing work, FUTV Family!",
    icon: Trophy,
    color: "text-[#D4AF37]",
    time: "1 day ago",
  },
];

export const ImpactHighlights = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${highlight.color} mt-1`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium">
                    {highlight.message}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs border-border">
                    {highlight.time}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
