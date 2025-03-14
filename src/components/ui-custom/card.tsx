
import { cn } from "@/lib/utils";
import { Card as ShadcnCard } from "@/components/ui/card";
import { CardProps as ShadcnCardProps } from "@/components/ui/card";
import { forwardRef } from "react";

interface CardProps extends ShadcnCardProps {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ShadcnCard
        ref={ref}
        className={cn(
          "backdrop-blur-premium bg-white/70 border border-white/20 shadow-sm rounded-2xl overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </ShadcnCard>
    );
  }
);

Card.displayName = "Card";

export { Card };
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
