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
      className={`h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center overflow-hidden transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-3 p-3 md:p-4 lg:p-6">
        {/* Product Image */}
        <div className="relative rounded-lg overflow-hidden bg-white/5 border-2 border-[#C8102E]/30 flex-shrink-0 w-full md:w-[45%] aspect-square max-h-[180px] md:max-h-[280px]">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <div className="bg-[#C8102E] text-white px-2 py-0.5 rounded-full text-xs font-bold">
              FEATURED
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-center space-y-2 md:space-y-3 min-w-0 max-w-full md:max-w-[50%]">
          <div>
            <h3 className="text-base md:text-xl lg:text-2xl font-bold text-white mb-1 line-clamp-2">{product.title}</h3>
            {product.description && (
              <p className="text-gray-400 text-xs md:text-sm line-clamp-1 md:line-clamp-2">{product.description}</p>
            )}
          </div>

          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#C8102E]">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </div>

          <Button 
            onClick={handleAddToCart}
            className="w-full bg-[#C8102E] hover:bg-[#A00D24] text-white font-bold py-3 md:py-4 lg:py-5 text-sm md:text-base lg:text-lg rounded-lg transition-all hover:scale-[1.02]"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
