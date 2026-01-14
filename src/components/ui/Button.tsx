"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          // Variants
          variant === "primary" &&
            "bg-gradient-to-r from-purple-deep to-purple-electric text-white hover:opacity-90 focus:ring-purple-electric",
          variant === "secondary" &&
            "bg-green-light text-gray-900 hover:bg-opacity-90 focus:ring-green-light",
          variant === "outline" &&
            "border-2 border-purple-deep text-purple-deep hover:bg-purple-deep hover:text-white focus:ring-purple-deep",
          variant === "ghost" &&
            "text-gray-600 hover:text-purple-deep hover:bg-gray-100 focus:ring-purple-deep",
          // Sizes
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
