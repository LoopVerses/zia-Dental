import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const baseClasses =
  "group/btn relative inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold/60 focus-visible:ring-offset-cream-50";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-teal-deep text-cream-50 hover:bg-teal-dark shadow-soft-lg hover:shadow-premium hover:-translate-y-0.5",
  secondary:
    "bg-gold text-teal-dark hover:bg-gold-light shadow-soft hover:shadow-gold-glow hover:-translate-y-0.5",
  ghost: "text-teal-deep hover:bg-teal-deep/5",
  outline:
    "border border-teal-deep/20 text-teal-deep hover:border-teal-deep hover:bg-teal-deep hover:text-cream-50",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-full",
  md: "px-6 py-3 text-sm rounded-full",
  lg: "px-8 py-4 text-base rounded-full",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", withArrow, children, className, ...props }, ref) => {
    const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
    const content = (
      <>
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {withArrow && (
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          )}
        </span>
      </>
    );

    if ("href" in props && props.href) {
      const isExternal = props.href.startsWith("http") || props.href.startsWith("tel:") || props.href.startsWith("mailto:");
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={classes}
            {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={props.href}
          className={classes}
          {...(props as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
