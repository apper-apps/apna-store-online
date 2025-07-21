import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 active:scale-95",
    secondary: "bg-secondary text-white hover:bg-secondary/90 hover:scale-105 active:scale-95",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white hover:scale-105 active:scale-95",
    ghost: "text-primary hover:bg-primary/10 hover:scale-105 active:scale-95",
    danger: "bg-error text-white hover:bg-error/90 hover:scale-105 active:scale-95"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;