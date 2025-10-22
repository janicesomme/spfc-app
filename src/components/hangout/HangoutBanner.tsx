import futvLogo from "@/assets/futv-logo.jpg";

export const HangoutBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#8B0000] to-[#FF1A1A] border-b-2 border-primary py-3 px-4">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <img 
            src={futvLogo} 
            alt="FUTV Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>
        <div className="flex-1 text-center">
          <span className="font-bold text-white text-base sm:text-lg">
            FUTV Hangout — Have a Laugh, Grab Some Gear.
          </span>
        </div>
        <div className="flex-shrink-0 w-10 sm:w-auto opacity-0">
          {/* Spacer for balance */}
        </div>
      </div>
    </div>
  );
};
