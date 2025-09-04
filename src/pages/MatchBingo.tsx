import { Button } from "@/components/ui/button";

const MatchBingo = () => {
  const handlePlayNow = () => {
    window.open('https://www.matchbingo.co.uk/', '_blank');
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: '#2B1348' }}
    >
      <div className="w-full max-w-md mx-auto text-center space-y-6">
        <img 
          src="/lovable-uploads/e99f1ed3-6638-4587-9ea6-8ad0f045de7e.png" 
          alt="Match Bingo Logo"
          className="mx-auto h-16 sm:h-20 w-auto"
        />
        
        <div className="space-y-4">
          <p className="text-white font-bold text-xl sm:text-2xl">
            Bingo Transformed
          </p>
          
          <p className="text-white/90 text-sm sm:text-base">
            Make games even more exciting with your own bingo card!
          </p>
          
          <div className="space-y-2">
            <p className="text-white font-semibold text-lg">
              £10 free when you deposit £5*
            </p>
            
            <p className="text-white/80 text-xs sm:text-sm">
              Full T&Cs apply and may change* (new players only)
            </p>
          </div>
        </div>
        
        <Button
          onClick={handlePlayNow}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded text-sm sm:text-base w-full sm:w-auto"
        >
          PLAY NOW AT MATCH BINGO
        </Button>
      </div>
    </div>
  );
};

export default MatchBingo;