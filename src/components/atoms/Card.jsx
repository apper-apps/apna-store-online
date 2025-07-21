import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  children,
  className,
  hover = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl bg-white border border-gray-200 shadow-sm",
        hover && "hover:shadow-lg hover:scale-[1.02] transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;