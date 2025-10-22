import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const transactions = [
  { customer: "John Smith", product: "FUTV Hoodie", price: "£45.00", charity: true, date: "Dec 10, 2024" },
  { customer: "Emma Wilson", product: "FUTV T-Shirt", price: "£25.00", charity: false, date: "Dec 10, 2024" },
  { customer: "Michael Brown", product: "FUTV Mug", price: "£12.00", charity: true, date: "Dec 9, 2024" },
  { customer: "Sarah Jones", product: "FUTV Cap", price: "£18.00", charity: false, date: "Dec 9, 2024" },
  { customer: "David Taylor", product: "FUTV Hoodie", price: "£45.00", charity: true, date: "Dec 8, 2024" },
];

export function TransactionsTable() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Charity</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{transaction.customer}</TableCell>
                  <TableCell>{transaction.product}</TableCell>
                  <TableCell className="font-bold">{transaction.price}</TableCell>
                  <TableCell>
                    {transaction.charity ? (
                      <Badge variant="default" className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
