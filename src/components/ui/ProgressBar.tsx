"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({
  progress,
  className,
  showLabel = true,
  size = "md",
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full bg-gray-200 rounded-full overflow-hidden",
          size === "sm" && "h-2",
          size === "md" && "h-3",
          size === "lg" && "h-4"
        )}
      >
        <div
          className="h-full bg-gradient-to-r from-purple-deep to-purple-electric transition-all duration-500 ease-out rounded-full"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-600 mt-1">{Math.round(clampedProgress)}% complete</p>
      )}
    </div>
  );
}
