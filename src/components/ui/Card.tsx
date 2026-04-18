import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export default function Card({ children, className, glass = false, hover = false, padding = "md" }: CardProps) {
  const paddings = { sm: "p-4", md: "p-5", lg: "p-7" };

  return (
    <div
      className={cn(
        "rounded-2xl border border-[#424753]/20 transition-all",
        paddings[padding],
        hover && "hover:border-[#424753]/40 cursor-pointer",
        className
      )}
      style={{
        background: glass ? "rgba(49,53,62,0.6)" : "#181c24",
        backdropFilter: glass ? "blur(20px)" : undefined,
        boxShadow: glass
          ? "inset 0.5px 0.5px 0 rgba(66,71,83,0.3), 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(79,142,247,0.05)"
          : undefined,
      }}
    >
      {children}
    </div>
  );
}
