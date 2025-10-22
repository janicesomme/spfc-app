import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageCircle, Video, Power } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { useNavigate } from "react-router-dom";

interface CharityFooterProps {
  onShopClick: () => void;
  onChatClick: () => void;
  onVideoClick: () => void;
}

export const CharityFooter = ({
  onShopClick,
  onChatClick,
  onVideoClick,
}: CharityFooterProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t-2 border-[#D4AF37] z-40">
      <div className="max-w-screen-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Quick Nav Icons */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#A0A0A0] hover:text-[#D4AF37]"
              onClick={onVideoClick}
            >
              <Video className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Video</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#A0A0A0] hover:text-[#D4AF37]"
              onClick={onChatClick}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Chat</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#A0A0A0] hover:text-[#D4AF37]"
              onClick={onShopClick}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Shop All</span>
            </Button>
          </div>

          {/* Toggle and Cart */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
              onClick={() => navigate('/hangout')}
            >
              <Power className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Exit Charity Mode</span>
              <span className="sm:hidden">Exit</span>
            </Button>
            <CartDrawer />
          </div>
        </div>
      </div>
    </div>
  );
};
