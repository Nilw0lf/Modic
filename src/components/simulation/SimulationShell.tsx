import type { ReactNode } from "react";
export function SimulationShell({
  children,
  actions,
  label = "Interactive Lindy experiment",
  number = "001",
}: {
  children: ReactNode;
  actions: ReactNode;
  label?: string;
  number?: string;
}) {
  return (
    <section className="simulation-shell" aria-label={label}>
      <div className="simulation-toolbar">
        <div>
          <span className="live-dot" /> INTERACTIVE EXPERIMENT{" "}
          <span className="experiment-number">/ {number}</span>
        </div>
        <div className="simulation-actions">{actions}</div>
      </div>
      {children}
    </section>
  );
}
