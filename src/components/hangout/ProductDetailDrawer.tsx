import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { X, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface ProductDetailDrawerProps {
  product: ShopifyProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetailDrawer = ({
  product,
  open,
  onOpenChange,
}: ProductDetailDrawerProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  if (!product) return null;

  const image = product.node.images.edges[0]?.node;
  const variant =
    product.node.variants.edges.find((v) => v.node.id === selectedVariant)
      ?.node || product.node.variants.edges[0]?.node;

  const price = variant
    ? parseFloat(variant.price.amount)
    : parseFloat(product.node.priceRange.minVariantPrice.amount);

  const handleAddToCart = () => {
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    };

    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.node.title} has been added to your cart`,
      position: "top-center",
    });
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-[#0D0D0D] border-[#171717] max-h-[85vh]">
        <DrawerHeader className="relative border-b border-[#171717]">
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-[#A0A0A0] hover:text-[#EAEAEA]"
            >
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
          <DrawerTitle className="text-[#EAEAEA] text-left pr-12">
            {product.node.title}
          </DrawerTitle>
          <DrawerDescription className="text-[#A0A0A0] text-left">
            Featured in Creator Hangout
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto flex-1">
          <div className="p-4 space-y-4">
            {/* Product Image */}
            <div className="aspect-square bg-[#171717] rounded-lg overflow-hidden">
              {image ? (
                <img
                  src={image.url}
                  alt={product.node.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[#A0A0A0]">No image available</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#EAEAEA]">
                ${price.toFixed(2)}
              </span>
              <Badge className="bg-[#C8102E] text-white">Featured Deal</Badge>
            </div>

            {/* Creator Quote */}
            <div className="bg-[#171717] p-4 rounded-lg border border-[#222]">
              <p className="text-sm text-[#A0A0A0] italic mb-2">
                "This is one of my favorite products! I use it all the time and
                highly recommend it to all fans."
              </p>
              <p className="text-xs text-[#C8102E] font-medium">
                - Creator's Pick
              </p>
            </div>

            {/* Description */}
            {product.node.description && (
              <div>
                <h4 className="text-[#EAEAEA] font-semibold mb-2">
                  Description
                </h4>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">
                  {product.node.description}
                </p>
              </div>
            )}

            {/* Variants */}
            {product.node.variants.edges.length > 1 && (
              <div>
                <h4 className="text-[#EAEAEA] font-semibold mb-2">Options</h4>
                <div className="flex flex-wrap gap-2">
                  {product.node.variants.edges.map((v) => (
                    <Button
                      key={v.node.id}
                      variant={
                        selectedVariant === v.node.id ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedVariant(v.node.id)}
                      className={
                        selectedVariant === v.node.id
                          ? "bg-[#C8102E] hover:bg-[#A00D26]"
                          : ""
                      }
                    >
                      {v.node.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <DrawerFooter className="border-t border-[#171717] bg-[#0D0D0D]">
          <Button
            size="lg"
            className="w-full bg-[#C8102E] hover:bg-[#A00D26] text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart - ${price.toFixed(2)}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
