import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({ title, value, icon: Icon, iconColor = "text-primary" }: StatCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <Icon className={`h-10 w-10 ${iconColor}`} />
        </div>
      </CardContent>
    </Card>
  );
}
