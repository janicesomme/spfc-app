import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart } from "lucide-react";

const events = [
  {
    date: "Dec 15",
    title: "Supporting Cancer Research UK",
    type: "Charity Hangout",
  },
  {
    date: "Feb 2",
    title: "FUTV Kids' Football Equipment Drive",
    type: "Community Drive",
  },
];

export const UpcomingCharityEvents = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calendar className="w-5 h-5 text-[#D4AF37]" />
          Upcoming Charity Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gradient-to-r from-[#1a0a0a] to-card border border-border hover:border-[#D4AF37] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <Badge className="bg-[#D4AF37] text-[#0D0D0D] mb-2 border-0">
                    {event.date}
                  </Badge>
                  <p className="font-semibold text-foreground">{event.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{event.type}</p>
                </div>
                <Heart className="w-5 h-5 text-[#C8102E] flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
