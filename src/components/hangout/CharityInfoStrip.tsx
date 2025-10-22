import { Heart } from "lucide-react";

interface CharityInfoStripProps {
  charityName: string;
}

export const CharityInfoStrip = ({ charityName }: CharityInfoStripProps) => {
  return (
    <div className="bg-white border-b border-gray-200 py-4 px-4">
      <div className="max-w-screen-lg mx-auto flex items-center gap-3">
        <Heart className="h-5 w-5 text-[#C8102E] flex-shrink-0" fill="#C8102E" />
        <p className="text-black text-sm">
          Today's sales support <span className="font-semibold">{charityName}</span>. Thank you for being part of the FUTV community.
        </p>
      </div>
    </div>
  );
};
