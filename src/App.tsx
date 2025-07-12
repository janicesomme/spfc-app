
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
