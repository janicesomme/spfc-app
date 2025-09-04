import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const MatchBingoAdBanner = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full max-w-[340px] sm:max-w-4xl mx-auto rounded-lg border border-white p-6 mb-6"
      style={{ backgroundColor: '#2B1348' }}
    >
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-red-600">
          MATCH BINGO
        </h2>
        <p className="text-white font-semibold text-sm sm:text-base">
          PLAY MATCH BINGO DURING FOOTBALL GAMES!
        </p>
        <p className="text-white/90 text-xs sm:text-sm">
          Make the game even more exciting with your own bingo card.
        </p>
        <Button
          onClick={() => navigate("/match-bingo")}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded mt-4"
        >
          PLAY NOW
        </Button>
      </div>
    </div>
  );
};