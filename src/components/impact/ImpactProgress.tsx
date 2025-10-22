import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface ImpactProgressProps {
  raised: number;
  goal: number;
}

export const ImpactProgress = ({ raised, goal }: ImpactProgressProps) => {
  const percentage = Math.min((raised / goal) * 100, 100);
  const milestoneReached = percentage >= 50;

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Community Goal Progress</h2>
        {milestoneReached && (
          <Badge className="bg-[#D4AF37] text-[#0D0D0D] border-0">
            <Trophy className="w-3 h-3 mr-1" />
            50% Reached!
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Raised</span>
          <span className="font-bold text-[#D4AF37]">£{raised.toLocaleString()}</span>
        </div>
        
        <Progress 
          value={percentage} 
          className="h-4 bg-muted"
        />
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Goal: £{goal.toLocaleString()}</span>
          <span className="text-foreground font-semibold">{percentage.toFixed(0)}%</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center pt-2">
        Keep going, FUTV Family! Every purchase counts.
      </p>
    </div>
  );
};
