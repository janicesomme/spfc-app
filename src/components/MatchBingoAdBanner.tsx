import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const MatchBingoAdBanner = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full max-w-[340px] sm:max-w-4xl mx-auto rounded-lg border border-white p-4 sm:p-6 mb-6 mt-5"
      style={{ backgroundColor: '#2B1348' }}
    >
      <div className="text-center space-y-3 sm:space-y-4">
        <img 
          src="/lovable-uploads/e99f1ed3-6638-4587-9ea6-8ad0f045de7e.png" 
          alt="Match Bingo Logo"
          className="mx-auto h-12 sm:h-16 w-auto"
        />
        <p className="text-white font-bold text-lg sm:text-xl">
          Bingo Transformed
        </p>
        <p className="text-white/90 text-sm sm:text-base px-2">
          Make games even more exciting with your own bingo card!
        </p>
        <Button
          onClick={() => navigate("/match-bingo")}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded text-sm sm:text-base mt-4"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};