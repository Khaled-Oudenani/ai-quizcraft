import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="text-xs font-bold text-[#c2c6d5] uppercase tracking-wider"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-xl text-sm text-[#dfe2ee] placeholder-[#424753] outline-none transition-all",
            error ? "border-[#ffb4ab]" : "border-[#424753]",
            className
          )}
          style={{
            background: "#0a0e16",
            border: `1px solid ${error ? "#ffb4ab" : "#424753"}`,
            fontFamily: "Manrope, sans-serif",
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = "#acc7ff";
              e.target.style.boxShadow = "0 0 0 1px #acc7ff40, 0 0 10px rgba(172,199,255,0.08)";
              e.target.style.background = "#1c2028";
            }
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? "#ffb4ab" : "#424753";
            e.target.style.boxShadow = "none";
            e.target.style.background = "#0a0e16";
            props.onBlur?.(e);
          }}
          {...props}
        />
        {error && (
          <p className="text-xs text-[#ffb4ab] flex items-center gap-1" style={{ fontFamily: "Manrope, sans-serif" }}>
            <span className="material-symbols-outlined text-xs">error</span>
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-[#424753]" style={{ fontFamily: "Manrope, sans-serif" }}>{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
