import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Package } from "lucide-react";

const events = [
  {
    title: "Next Charity Hangout",
    description: "Supporting Cancer Research UK",
    date: "Dec 15, 2024",
    icon: Calendar,
  },
  {
    title: "Merch Restock",
    description: "FUTV Classic T-Shirt",
    date: "Dec 12, 2024",
    icon: Package,
  },
];

export function UpcomingEvents() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Upcoming Hangouts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50 border border-border">
              <event.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
