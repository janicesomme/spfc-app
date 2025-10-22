import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageCircle, Video } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";

interface HangoutFooterProps {
  onShopClick: () => void;
  onChatClick: () => void;
  onVideoClick: () => void;
}

export const HangoutFooter = ({
  onShopClick,
  onChatClick,
  onVideoClick,
}: HangoutFooterProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-[#171717] z-40">
      <div className="max-w-screen-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Quick Nav Icons */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#A0A0A0] hover:text-[#EAEAEA]"
              onClick={onVideoClick}
            >
              <Video className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Video</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#A0A0A0] hover:text-[#EAEAEA]"
              onClick={onChatClick}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Chat</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#A0A0A0] hover:text-[#EAEAEA]"
              onClick={onShopClick}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Shop All</span>
            </Button>
          </div>

          {/* Cart */}
          <CartDrawer />
        </div>
      </div>
    </div>
  );
};
