import { useState, useRef, useEffect } from "react";
import { VideoPlayer } from "@/components/hangout/VideoPlayer";
import { HangoutBanner } from "@/components/hangout/HangoutBanner";
import { ChatFeed } from "@/components/hangout/ChatFeed";
import { ProductShelf } from "@/components/hangout/ProductShelf";
import { ProductShowcase } from "@/components/hangout/ProductShowcase";
import { ProductDetailDrawer } from "@/components/hangout/ProductDetailDrawer";
import { HangoutFooter } from "@/components/hangout/HangoutFooter";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";

export default function ShoppableHangout() {
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cuedProduct, setCuedProduct] = useState<ShopifyProduct | null>(null);
  
  const videoRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);

  // Load first product as cued product for MVP demo
  useEffect(() => {
    const loadInitialProduct = async () => {
      try {
        const products = await fetchProducts(1);
        if (products && products.length > 0) {
          setCuedProduct(products[0]);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    loadInitialProduct();
  }, []);

  const handleProductSelect = (product: ShopifyProduct) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] pb-16">
      {/* Hangout Banner */}
      <HangoutBanner />

      {/* Split Layout: Video + Product Showcase */}
      <div ref={videoRef} className="flex flex-col md:flex-row">
        {/* Left: Video Player */}
        <div className="w-full md:w-1/2 h-[33vh] md:h-[50vh] min-h-[250px]">
          <VideoPlayer isLive={true} />
        </div>

        {/* Right: Product Showcase */}
        <div className="w-full md:w-1/2 h-[33vh] md:h-[50vh] min-h-[250px]">
          <ProductShowcase cuedProduct={cuedProduct} />
        </div>
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
