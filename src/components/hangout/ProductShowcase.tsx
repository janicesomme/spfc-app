import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";

interface ProductShowcaseProps {
  cuedProduct?: ShopifyProduct | null;
}

export const ProductShowcase = ({ cuedProduct }: ProductShowcaseProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    if (cuedProduct) {
      setIsVisible(false);
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [cuedProduct]);

  if (!cuedProduct) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#C8102E]/20 flex items-center justify-center">
            <ExternalLink className="w-12 h-12 text-[#C8102E]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Product Showcase</h3>
          <p className="text-gray-400">Waiting for presenter to cue a product...</p>
        </div>
      </div>
    );
  }

  const product = cuedProduct.node;
  const firstVariant = product.variants.edges[0]?.node;
  const imageUrl = product.images.edges[0]?.node.url;
  const price = firstVariant?.price || product.priceRange.minVariantPrice;

  const handleAddToCart = () => {
    if (!firstVariant) return;
    
    const cartItem = {
      product: cuedProduct,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
  };

  return (
    <div 
      className={`h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-6 flex flex-col justify-center transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="max-w-md mx-auto w-full">
        {/* Product Image */}
        <div className="relative mb-6 rounded-lg overflow-hidden bg-white/5 border-2 border-[#C8102E]/30">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={product.title}
              className="w-full aspect-square object-cover"
            />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center bg-gray-800">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <div className="bg-[#C8102E] text-white px-3 py-1 rounded-full text-sm font-bold">
              FEATURED
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{product.title}</h3>
            {product.description && (
              <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-[#C8102E]">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </div>
          </div>

          <Button 
            onClick={handleAddToCart}
            className="w-full bg-[#C8102E] hover:bg-[#A00D24] text-white font-bold py-6 text-lg rounded-lg transition-all hover:scale-[1.02]"
            size="lg"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
