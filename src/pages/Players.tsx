
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Players() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Player Database</h1>
        <p className="text-gray-600">Comprehensive player profiles and transfer history</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Player Database</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            Player database functionality coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
