import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Shop() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      {/* Header with back button */}
      <div className="flex items-center gap-3 p-4 border-b border-[#171717] bg-[#0D0D0D] sticky top-0 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-[#EAEAEA] hover:bg-[#171717]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-[#EAEAEA]">FUTV Official Store</h1>
      </div>

      {/* WebView - using iframe for web compatibility */}
      <div className="flex-1">
        <iframe
          src="https://futv.teemill.com"
          className="w-full h-full border-0"
          title="FUTV Official Store"
          allow="payment; fullscreen"
          sandbox="allow-same-origin allow-scripts allow-forms allow-payments allow-popups allow-top-navigation"
        />
      </div>
    </div>
  );
}