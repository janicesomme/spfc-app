import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

interface ProductShelfProps {
  onProductSelect: (product: ShopifyProduct) => void;
}

export const ProductShelf = ({ onProductSelect }: ProductShelfProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(8);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[280px] flex items-center justify-center bg-[#0D0D0D]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C8102E]" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="h-[280px] flex items-center justify-center bg-[#0D0D0D]">
        <div className="text-center text-[#A0A0A0] p-8">
          <p className="mb-2">No products found</p>
          <p className="text-sm">
            Tell me what product you'd like to add!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] border-t border-[#171717] pb-20">
      <div className="p-4">
        <h3 className="text-[#EAEAEA] font-semibold mb-1">Shop the Hangout</h3>
        <p className="text-[#A0A0A0] text-xs mb-4">
          Products featured in this session
        </p>

        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => {
              const image = product.node.images.edges[0]?.node;
              const price = parseFloat(
                product.node.priceRange.minVariantPrice.amount
              );
              const hasDiscount = Math.random() > 0.7; // Simulate discount

              return (
                <CarouselItem
                  key={product.node.id}
                  className="pl-2 md:pl-4 basis-[45%] sm:basis-[33%] md:basis-[25%]"
                >
                  <Card
                    className="bg-[#171717] border-[#222] overflow-hidden cursor-pointer hover:border-[#C8102E] transition-colors"
                    onClick={() => onProductSelect(product)}
                  >
                    <div className="aspect-square bg-[#0D0D0D] relative">
                      {image ? (
                        <img
                          src={image.url}
                          alt={product.node.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[#A0A0A0] text-xs">
                            No image
                          </span>
                        </div>
                      )}
                      {hasDiscount && (
                        <Badge className="absolute top-2 right-2 bg-[#C8102E] text-white text-xs">
                          -20%
                        </Badge>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="text-[#EAEAEA] text-sm font-medium truncate mb-1">
                        {product.node.title}
                      </h4>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-[#EAEAEA] font-bold">
                          ${price.toFixed(2)}
                        </span>
                        {hasDiscount && (
                          <span className="text-[#A0A0A0] text-xs line-through">
                            ${(price * 1.25).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="w-full bg-[#C8102E] hover:bg-[#A00D26] text-white text-xs h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          onProductSelect(product);
                        }}
                      >
                        Quick Buy
                      </Button>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-[#171717] border-[#222] text-[#EAEAEA]" />
          <CarouselNext className="right-0 bg-[#171717] border-[#222] text-[#EAEAEA]" />
        </Carousel>
      </div>
    </div>
  );
};
