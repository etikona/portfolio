interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export default function Tag({ children, active, className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[2px] border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
        active
          ? "border-accent bg-accent/10 text-fg"
          : "border-border bg-surface text-muted"
      } ${className}`}
    >
      {children}
    </span>
  );
}
