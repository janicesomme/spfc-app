import { useState, useRef } from "react";
import { VideoPlayer } from "@/components/hangout/VideoPlayer";
import { ChatFeed } from "@/components/hangout/ChatFeed";
import { ProductShelf } from "@/components/hangout/ProductShelf";
import { ProductDetailDrawer } from "@/components/hangout/ProductDetailDrawer";
import { HangoutFooter } from "@/components/hangout/HangoutFooter";
import { ShopifyProduct } from "@/lib/shopify";

export default function ShoppableHangout() {
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
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
      {/* Video Section */}
      <div ref={videoRef}>
        <VideoPlayer isLive={true} />
      </div>

      {/* Chat Feed Section */}
      <div ref={chatRef}>
        <ChatFeed />
      </div>

      {/* Product Shelf Section */}
      <div ref={shopRef}>
        <ProductShelf onProductSelect={handleProductSelect} />
      </div>

      {/* Product Detail Drawer */}
      <ProductDetailDrawer
        product={selectedProduct}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />

      {/* Persistent Footer */}
      <HangoutFooter
        onShopClick={() => scrollToSection(shopRef)}
        onChatClick={() => scrollToSection(chatRef)}
        onVideoClick={() => scrollToSection(videoRef)}
      />
    </div>
  );
}
