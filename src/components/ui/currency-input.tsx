import * as React from "react"
import { cn } from "@/lib/utils"

interface CurrencyInputProps extends Omit<React.ComponentProps<"input">, 'type'> {
  currency?: string;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, currency = "£", ...props }, ref) => {
    return (
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-bold text-lg z-10">
          {currency}
        </span>
        <input
          type="number"
          className={cn(
            "flex h-14 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-lg font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-amount-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-md",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
CurrencyInput.displayName = "CurrencyInput"

export { CurrencyInput }