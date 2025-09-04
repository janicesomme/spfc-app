import { Button } from "@/components/ui/button";

const MatchBingo = () => {
  const handlePlayNow = () => {
    window.open('https://www.matchbingo.co.uk/', '_blank');
  };

  return (
    <div 
      className="min-h-screen w-full p-4 sm:p-8"
      style={{ backgroundColor: '#2B1348' }}
    >
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        {/* Header */}
        <div className="space-y-4">
          <img 
            src="/lovable-uploads/ce1cbe45-0627-4581-a278-c5f12dd05315.png" 
            alt="Match Bingo Logo" 
            className="mx-auto h-24 sm:h-32 w-auto"
          />
          <p className="text-white text-lg sm:text-xl font-medium">
            OFFICIAL FUTV SPONSOR SPOTLIGHT
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            Bingo reimagined for football
          </h2>
          
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto">
            Play along with live matches—your card fills as the action happens.
          </p>

          <Button
            onClick={handlePlayNow}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg rounded-lg"
          >
            PLAY NOW AT MATCH BINGO
          </Button>

          <p className="text-white/80 text-sm">
            18+ T&Cs apply
          </p>
        </div>

        {/* Welcome Offer Box */}
        <div className="border-2 border-yellow-400 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-yellow-400 text-2xl font-bold mb-4">
            Current welcome offer:
          </h3>
          <p className="text-yellow-400 text-xl font-bold mb-2">
            £10 free when you deposit £5*
          </p>
          <p className="text-white text-sm mb-2">
            (new players only)
          </p>
          <p className="text-white/80 text-sm">
            Offer controlled by Match Bingo and may change.
          </p>
        </div>

        {/* How Fans Like It Section */}
        <div className="text-left max-w-3xl mx-auto space-y-4">
          <h3 className="text-white text-2xl font-bold mb-6">
            Why fans love it:
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-white text-lg">
                Real-time second-screen fun during football
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-white text-lg">
                Multiple formats and frequent games
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-white text-lg">
                Licensed & regulated bingo product (not a sport-book)
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-white text-lg">
                Cash prizes: some proceeds go to good causes
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center items-center max-w-3xl mx-auto pt-8">
          <button className="text-white text-lg font-medium underline">
            Responsible play
          </button>
        </div>

        {/* Footer Text */}
        <div className="text-white/70 text-xs sm:text-sm max-w-4xl mx-auto leading-relaxed pt-4">
          <p>
            18+ only, Please gamble responsibly, This link takes you to Match Bingo&apos;s official website, Match Bingo is licensed by the Uk Gambling
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchBingo;