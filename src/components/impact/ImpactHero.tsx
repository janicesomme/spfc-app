import { Sparkles } from "lucide-react";
import futvLogoRed from "@/assets/futv-logo-red.jpg";

interface ImpactHeroProps {
  totalRaised: number;
  charityName: string;
}

export const ImpactHero = ({ totalRaised, charityName }: ImpactHeroProps) => {
  return (
    <div className="relative bg-gradient-to-br from-[#0D0D0D] via-[#1a0a0a] to-[#0D0D0D] border-b-4 border-[#D4AF37] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#C8102E] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="absolute top-4 left-4 h-10">
          <img 
            src={futvLogoRed} 
            alt="FUTV Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>

        <div className="flex justify-center mb-4">
          <Sparkles className="w-12 h-12 text-[#D4AF37] animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
          Together, FUTV Fans Raised{" "}
          <span className="text-[#D4AF37]">£{totalRaised.toLocaleString()}</span>{" "}
          for {charityName}!
        </h1>

        <p className="text-lg md:text-xl text-[#EAEAEA] max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Every hoodie, mug, and T-shirt helped make a difference.
        </p>

        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
