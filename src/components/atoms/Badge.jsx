import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children,
  variant = "default",
  size = "sm",
  className,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary to-accent text-white",
    success: "bg-success text-white",
    warning: "bg-warning text-white",
    error: "bg-error text-white",
    info: "bg-info text-white"
  };
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;