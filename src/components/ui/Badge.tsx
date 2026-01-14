"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
          variant === "default" && "bg-gray-100 text-gray-700",
          variant === "success" && "bg-green-100 text-green-700",
          variant === "warning" && "bg-yellow-100 text-yellow-700",
          variant === "error" && "bg-red-100 text-red-700",
          variant === "info" && "bg-purple-100 text-purple-700",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
