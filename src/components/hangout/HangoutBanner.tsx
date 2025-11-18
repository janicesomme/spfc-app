import thatsfootballBanner from "@/assets/thats-football-banner.jpg";

export const HangoutBanner = () => {
  return (
    <div className="w-full border-b-2 border-border">
      <img 
        src={thatsfootballBanner} 
        alt="That's Football Banner" 
        className="w-full h-auto object-cover"
      />
    </div>
  );
};
