
import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Shop() {
  const navigate = useNavigate();

  useEffect(() => {
    // Open the store in a new tab when this component mounts
    window.open('https://futv.teemill.com/collection/new', '_blank');
    // Navigate back to the previous page
    navigate(-1);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-4">
        <ExternalLink className="h-12 w-12 text-[#C8102E] mx-auto" />
        <h1 className="text-2xl font-bold text-[#EAEAEA]">Opening FUTV Official Store</h1>
        <p className="text-[#A0A0A0] max-w-md">
          The store is opening in a new tab. If it didn't open automatically, click the button below.
        </p>
        <div className="space-y-3">
          <Button
            onClick={() => window.open('https://futv.teemill.com/collection/new', '_blank')}
            className="bg-[#C8102E] hover:bg-[#A00D26] text-white px-6 py-2"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Store
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-[#A0A0A0] hover:text-[#EAEAEA] hover:bg-[#171717] block mx-auto"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
