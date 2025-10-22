import { ImpactHero } from "@/components/impact/ImpactHero";
import { ImpactProgress } from "@/components/impact/ImpactProgress";
import { TopSupporters } from "@/components/impact/TopSupporters";
import { ImpactHighlights } from "@/components/impact/ImpactHighlights";
import { UpcomingCharityEvents } from "@/components/impact/UpcomingCharityEvents";
import { HomeBottomNav } from "@/components/HomeBottomNav";

const Impact = () => {
  const totalRaised = 2318;
  const goal = 5000;
  const charityName = "Hospice UK";

  return (
    <div className="min-h-screen bg-background pb-20">
      <ImpactHero totalRaised={totalRaised} charityName={charityName} />
      
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <ImpactProgress raised={totalRaised} goal={goal} />
        
        <div className="grid md:grid-cols-2 gap-6">
          <TopSupporters />
          <ImpactHighlights />
        </div>
        
        <UpcomingCharityEvents />
      </div>

      <HomeBottomNav />
    </div>
  );
};

export default Impact;
