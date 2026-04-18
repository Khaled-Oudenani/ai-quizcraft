import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "text-[#00285b] hover:brightness-110",
      secondary: "bg-[#262a33] text-[#c2c6d5] hover:bg-[#31353e] border border-[#424753]/40",
      ghost: "text-[#8c909e] hover:text-[#dfe2ee] hover:bg-white/5",
      danger: "bg-[#ffb4ab]/10 text-[#ffb4ab] hover:bg-[#ffb4ab]/20 border border-[#ffb4ab]/20",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-4 text-base",
    };

    const primaryStyle = variant === "primary"
      ? { background: "linear-gradient(to bottom, #acc7ff, #508ff8)", boxShadow: "inset 0.5px 0.5px 0 rgba(255,255,255,0.2)" }
      : {};

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        style={{ fontFamily: "Manrope, sans-serif", ...primaryStyle }}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
