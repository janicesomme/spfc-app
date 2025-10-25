
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import YouTube from "./pages/YouTube";
import Shop from "./pages/Shop";
import Players from "./pages/Players";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import HotOMeter from "./pages/HotOMeter";
import Index from "./pages/Index";
import PlayerProfile from "./pages/PlayerProfile";
import PickYourXI from "./pages/PickYourXI";
import PickPlayer from "./pages/PickPlayer";
import PlayerRatings from "./pages/PlayerRatings";
import FinalPlayerRatings from "./pages/FinalPlayerRatings";
import GamePredictions from "./pages/GamePredictions";
import Predict from "./pages/Predict";
import Leaderboard from "./pages/Leaderboard";
import MatchBingo from "./pages/MatchBingo";
import Vote from "./pages/Vote";
import ShoppableHangout from "./pages/ShoppableHangout";
import CharityHangout from "./pages/CharityHangout";
import CreatorDashboard from "./pages/CreatorDashboard";
import PresenterDashboard from "./pages/PresenterDashboard";
import Impact from "./pages/Impact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/news" element={<News />} />
              <Route path="/youtube" element={<YouTube />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/players" element={<Players />} />
              <Route path="/player-profile" element={<PlayerProfile />} />
              <Route path="/pick-your-xi" element={<PickYourXI />} />
              <Route path="/pick-player" element={<PickPlayer />} />
              <Route path="/player-ratings" element={<PlayerRatings />} />
              <Route path="/final-player-ratings" element={<FinalPlayerRatings />} />
              <Route path="/game-predictions" element={<GamePredictions />} />
              <Route path="/predict" element={<Predict />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/hangout" element={<ShoppableHangout />} />
              <Route path="/charity-hangout" element={<CharityHangout />} />
              <Route path="/creator-dashboard" element={<CreatorDashboard />} />
              <Route path="/presenter-dashboard" element={<PresenterDashboard />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/match-bingo" element={<MatchBingo />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/hot-o-meter" element={<HotOMeter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
