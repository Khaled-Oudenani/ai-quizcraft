import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "secondary" | "tertiary" | "success" | "warning" | "error" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
  primary: { bg: "rgba(172,199,255,0.1)", text: "#acc7ff", border: "rgba(172,199,255,0.2)" },
  secondary: { bg: "rgba(69,223,164,0.1)", text: "#45dfa4", border: "rgba(69,223,164,0.2)" },
  tertiary: { bg: "rgba(255,185,95,0.1)", text: "#ffb95f", border: "rgba(255,185,95,0.2)" },
  success: { bg: "rgba(69,223,164,0.1)", text: "#45dfa4", border: "rgba(69,223,164,0.2)" },
  warning: { bg: "rgba(255,185,95,0.1)", text: "#ffb95f", border: "rgba(255,185,95,0.2)" },
  error: { bg: "rgba(255,180,171,0.1)", text: "#ffb4ab", border: "rgba(255,180,171,0.2)" },
  muted: { bg: "#262a33", text: "#8c909e", border: "#424753" },
};

export default function Badge({ variant = "muted", children, className, dot }: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold", className)}
      style={{
        background: styles.bg,
        color: styles.text,
        border: `1px solid ${styles.border}`,
        fontFamily: "Manrope, sans-serif",
      }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: styles.text }}
        />
      )}
      {children}
    </span>
  );
}
