import React from "react";

import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const calloutVariants = cva(
  "flex flex-col relative overflow-hidden rounded-lg p-4 text-sm",
  {
    variants: {
      variant: {
        default:
          "text-blue-600 dark:text-blue-400 bg-blue-200 dark:bg-blue-950/70",
        success:
          "text-emerald-600 dark:text-emerald-500 bg-emerald-200 dark:bg-emerald-950/70",
        error: "text-red-600 dark:text-red-500 bg-red-200 dark:bg-red-950/70",
        warning:
          "text-yellow-600 dark:text-yellow-500 bg-yellow-200 dark:bg-yellow-950/70",
        neutral:
          "text-black dark:text-gray-400 bg-gray-200 dark:bg-gray-800/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const closeButtonVariants = cva(
  "absolute top-2 right-2 h-6 w-6 rounded-md p-0",
  {
    variants: {
      variant: {
        default: "hover:bg-blue-100 dark:hover:bg-blue-950",
        success: "hover:bg-emerald-100 dark:hover:bg-emerald-950",
        error: "hover:bg-red-100 dark:hover:bg-red-950",
        warning: "hover:bg-yellow-100 dark:hover:bg-yellow-950",
        neutral: "hover:bg-gray-100 dark:hover:bg-gray-950",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface CalloutProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof calloutVariants> {
  title: string;
  icon?: React.ElementType;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  (
    { title, icon: Icon, className, variant, children, ...props }: CalloutProps,
    forwardedRef,
  ) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(true);

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={forwardedRef}
        className={cn(
          calloutVariants({ variant }),
          className,
          "animate-in fade-in-0 zoom-in-95",
        )}
        {...props}
      >
        <div className={cn("flex items-center")}>
          {Icon && (
            <Icon
              className={cn("mr-1.5 h-4 w-4 shrink-0")}
              aria-hidden="true"
            />
          )}

          <span className={cn("font-semibold")}>{title}</span>
        </div>
        <div className={cn("overflow-y-auto", children ? "mt-2" : "")}>
          {children}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            closeButtonVariants({ variant }),
            "absolute right-2 top-2",
          )}
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss callout"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  },
);

Callout.displayName = "Callout";

export { Callout, calloutVariants, type CalloutProps };
