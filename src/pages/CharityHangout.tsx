import { useState, useRef } from "react";
import { VideoPlayer } from "@/components/hangout/VideoPlayer";
import { CharityBanner } from "@/components/hangout/CharityBanner";
import { CharityInfoStrip } from "@/components/hangout/CharityInfoStrip";
import { CharityChatFeed } from "@/components/hangout/CharityChatFeed";
import { CharityProductShelf } from "@/components/hangout/CharityProductShelf";
import { ProductDetailDrawer } from "@/components/hangout/ProductDetailDrawer";
import { CharityFooter } from "@/components/hangout/CharityFooter";
import { ShopifyProduct } from "@/lib/shopify";

export default function CharityHangout() {
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Static placeholder values
  const charityName = "Hospice UK";
  const amountRaised = 2318;
  
  const videoRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);

  const handleProductSelect = (product: ShopifyProduct) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] pb-16">
      {/* Charity Banner */}
      <CharityBanner charityName={charityName} amountRaised={amountRaised} />

      {/* Video Section with Gold Glow */}
      <div ref={videoRef} className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/20 to-transparent pointer-events-none" />
        <div className="border-2 border-[#D4AF37]/30">
          <VideoPlayer isLive={true} />
        </div>
      </div>

      {/* Charity Info Strip */}
      <CharityInfoStrip charityName={charityName} />

      {/* Chat Feed Section */}
      <div ref={chatRef}>
        <CharityChatFeed />
      </div>

      {/* Product Shelf Section */}
      <div ref={shopRef}>
        <CharityProductShelf 
          onProductSelect={handleProductSelect}
          charityName={charityName}
        />
      </div>

      {/* Product Detail Drawer */}
      <ProductDetailDrawer
        product={selectedProduct}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />

      {/* Persistent Footer */}
      <CharityFooter
        onShopClick={() => scrollToSection(shopRef)}
        onChatClick={() => scrollToSection(chatRef)}
        onVideoClick={() => scrollToSection(videoRef)}
      />
    </div>
  );
}
