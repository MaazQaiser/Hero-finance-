export function ArrowLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="arrow-link group">
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </span>
  );
}
