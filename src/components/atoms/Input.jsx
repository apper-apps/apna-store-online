import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text",
  className,
  error,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-error focus:border-error focus:ring-error",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;