import { Badge } from "@/components/ui/badge";

interface CharityBannerProps {
  charityName: string;
  amountRaised: number;
}

export const CharityBanner = ({ charityName, amountRaised }: CharityBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6D3] to-[#D4AF37] border-b-2 border-[#D4AF37] py-3 px-4">
      <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎗</span>
          <span className="font-semibold text-[#0D0D0D]">
            Charity Hangout — Every Purchase Helps {charityName}
          </span>
        </div>
        <Badge className="bg-[#C8102E] text-white border-0 px-4 py-1 text-sm font-bold">
          £{amountRaised.toLocaleString()} Raised So Far
        </Badge>
      </div>
    </div>
  );
};
