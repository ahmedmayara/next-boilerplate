import React from "react";

import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva("relative inline-block", {
  variants: {
    size: {
      default: "w-5 h-5",
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-10 h-10",
      xl: "w-16 h-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({ size, className, ...props }: SpinnerProps) {
  const sizeInPixels = {
    default: 20,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 64,
  }[size || "default"];

  return (
    <div
      className={cn(spinnerVariants({ size }))}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className={cn(
            "animate-spinnerRotate absolute rounded-full bg-muted-foreground",
            className,
          )}
          style={{
            width: `${sizeInPixels * 0.1}px`,
            height: `${sizeInPixels * 0.25}px`,
            left: `${sizeInPixels * 0.45}px`,
            top: `${sizeInPixels * 0.1}px`,
            transformOrigin: `${sizeInPixels * 0.05}px ${sizeInPixels * 0.4}px`,
            transform: `rotate(${index * 45}deg)`,
            opacity: 1 - index * 0.1,
            animationDelay: `${-1 + index * 0.125}s`,
          }}
        />
      ))}
    </div>
  );
}
