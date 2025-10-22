import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { name: "Hoodies", sales: 3420, percentage: 42 },
  { name: "T-Shirts", sales: 2890, percentage: 35 },
  { name: "Mugs", sales: 1240, percentage: 15 },
  { name: "Caps", sales: 650, percentage: 8 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
};

export function SalesChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Sales by Product</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" width={80} stroke="hsl(var(--muted-foreground))" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="hsl(var(--primary))" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex justify-between items-center">
              <span className="text-muted-foreground">{item.name}:</span>
              <span className="font-bold">£{item.sales.toLocaleString()} ({item.percentage}%)</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
