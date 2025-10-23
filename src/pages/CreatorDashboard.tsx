import { DollarSign, Heart, Users, ShoppingBag, Video, Settings } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { CommunityHighlights } from "@/components/dashboard/CommunityHighlights";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import futvLogo from "@/assets/futv-logo.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CreatorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#8B0000] to-[#FF1A1A] border-b-2 border-primary px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img 
            src={futvLogo} 
            alt="FUTV Logo" 
            className="h-10 w-auto object-contain"
          />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">Adam Stott</p>
              <p className="text-xs text-white/80">Creator</p>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-white text-[#8B0000]">AS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Creator Dashboard</h1>

        {/* Top Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Sales This Month"
            value="£3,462"
            icon={DollarSign}
            iconColor="text-green-500"
          />
          <StatCard
            title="Charity Raised"
            value="£2,318"
            icon={Heart}
            iconColor="text-[#D4AF37]"
          />
          <StatCard
            title="Hangout Viewers"
            value="1,289"
            icon={Users}
            iconColor="text-blue-500"
          />
          <StatCard
            title="Products Sold"
            value="176"
            icon={ShoppingBag}
            iconColor="text-purple-500"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <SalesChart />
            <TransactionsTable />
            <CommunityHighlights />
          </div>

          {/* Right Sidebar - 1/3 width */}
          <div className="space-y-6">
            <UpcomingEvents />
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/hangout')}
            >
              <Video className="h-5 w-5 mr-2" />
              Hangout
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/shop')}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Shop
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/charity-hangout')}
            >
              <Heart className="h-5 w-5 mr-2" />
              Charity Mode
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
