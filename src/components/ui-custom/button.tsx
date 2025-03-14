
import { cn } from "@/lib/utils";
import { Button as ShadcnButton } from "@/components/ui/button";
import { ButtonProps as ShadcnButtonProps } from "@/components/ui/button";
import { forwardRef } from "react";

interface ButtonProps extends ShadcnButtonProps {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        className={cn(
          "font-medium rounded-xl px-6 transition-all duration-300 ease-out hover:shadow-md active:scale-[0.98] hover:-translate-y-[1px]",
          className
        )}
        {...props}
      >
        {children}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
