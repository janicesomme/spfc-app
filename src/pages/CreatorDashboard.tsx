import { Users, TrendingUp, Mail, Zap, Eye, BarChart3 } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CreatorDashboard() {
  const navigate = useNavigate();

  // Demo data - in production these would come from Supabase
  const dashboardStats = {
    totalActiveUsers: "2,847",
    dailyActiveUsers: "652",
    newUsersThisMonth: "412",
    emailSubscribers: "1,934",
    predictionsSubmitted: "8,392",
    uniquePredictors: "1,223",
    playerRatingsSubmitted: "3,156",
    participationRate: "42%",
    returnRate: "68%",
    avgSessionDuration: "8m 34s",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 border-b-2 border-primary px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">SPFC App Dashboard</h1>
            <p className="text-sm text-white/80">Stretford Paddock FC Analytics</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-white">Stephen Howson</p>
            <p className="text-xs text-white/80">Admin</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Key Metrics - This Month</h2>

          {/* Top Row - User Growth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Active Users"
              value={dashboardStats.totalActiveUsers}
              icon={Users}
              iconColor="text-blue-500"
            />
            <StatCard
              title="Daily Active Users"
              value={dashboardStats.dailyActiveUsers}
              icon={TrendingUp}
              iconColor="text-green-500"
            />
            <StatCard
              title="New Users"
              value={dashboardStats.newUsersThisMonth}
              icon={Zap}
              iconColor="text-purple-500"
            />
            <StatCard
              title="Email Subscribers"
              value={dashboardStats.emailSubscribers}
              icon={Mail}
              iconColor="text-yellow-500"
            />
          </div>

          {/* Second Row - Prediction Game */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Predictions Submitted"
              value={dashboardStats.predictionsSubmitted}
              icon={BarChart3}
              iconColor="text-red-500"
            />
            <StatCard
              title="Unique Predictors"
              value={dashboardStats.uniquePredictors}
              icon={Users}
              iconColor="text-indigo-500"
            />
            <StatCard
              title="Player Ratings"
              value={dashboardStats.playerRatingsSubmitted}
              icon={Eye}
              iconColor="text-orange-500"
            />
            <StatCard
              title="Participation Rate"
              value={dashboardStats.participationRate}
              icon={TrendingUp}
              iconColor="text-emerald-500"
            />
          </div>

          {/* Third Row - Engagement */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Return Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{dashboardStats.returnRate}</div>
                <p className="text-sm text-gray-500 mt-1">% of users returning</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Avg Session Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{dashboardStats.avgSessionDuration}</div>
                <p className="text-sm text-gray-500 mt-1">Time per session</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Insights Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <p className="font-semibold text-sm">Strong Prediction Game Engagement</p>
                <p className="text-xs text-gray-600">8,392 predictions submitted - core feature is working well</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p className="font-semibold text-sm">Good User Retention</p>
                <p className="text-xs text-gray-600">68% return rate shows strong community stickiness</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
              <div>
                <p className="font-semibold text-sm">Email List Growing</p>
                <p className="text-xs text-gray-600">1,934 subscribers - use for future matchday alerts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
              <div>
                <p className="font-semibold text-sm">Daily Active Users Steady</p>
                <p className="text-xs text-gray-600">652 DAU from 2,847 total users - consistent engagement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/predict')}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Prediction Game
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/leaderboard')}
            >
              <Users className="h-5 w-5 mr-2" />
              Leaderboard
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/news')}
            >
              <Eye className="h-5 w-5 mr-2" />
              News Feed
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/')}
            >
              Back to App
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
