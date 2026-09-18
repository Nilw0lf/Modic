import type { ReactNode } from "react";
import { SimulationShell } from "@/components/simulation/SimulationShell";
export const percent = (value: number | null) =>
  value === null ? "No flags" : (value * 100).toFixed(1) + "%";
export function Slider({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="control">
      <label htmlFor={id}>
        {label}
        <output htmlFor={id}>
          {value}
          {suffix}
        </output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="range-labels">
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
}
export function Experiment({
  title,
  description,
  number,
  reset,
  resample,
  children,
}: {
  title: string;
  description: string;
  number: string;
  reset: () => void;
  resample: () => void;
  children: ReactNode;
}) {
  return (
    <SimulationShell
      label={title}
      number={number}
      actions={
        <>
          <button onClick={reset}>Reset</button>
          <button onClick={resample}>Resample</button>
        </>
      }
    >
      <div className="simulation-intro">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="model-tag">ILLUSTRATIVE MODEL</span>
      </div>
      {children}
    </SimulationShell>
  );
}
export function Stats({ items }: { items: [string, string][] }) {
  return (
    <dl className="simulation-stats" aria-live="polite" aria-atomic="true">
      {items.map(([label, value]) => (
        <div className="simulation-stat" key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="foundation-notice" aria-live="polite">
      {children}
    </div>
  );
}
