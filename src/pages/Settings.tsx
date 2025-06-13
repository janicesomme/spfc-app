
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Dashboard configuration and preferences</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Dashboard Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            Settings panel coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
