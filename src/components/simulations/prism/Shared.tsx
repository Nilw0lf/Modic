"use client";
import { useId, type ComponentProps } from "react";
import { Slider as BaseSlider } from "../depth/Shared";
export { Actions, Ledger, Chart } from "../depth/Shared";
export { Stats } from "../mosaic/Shared";
export function Slider(
  p: Omit<ComponentProps<typeof BaseSlider>, "id"> & { id?: string },
) {
  const id = useId();
  return <BaseSlider {...p} id={p.id ?? id} />;
}
export function Choices({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (s: string) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset className="prism-choices">
      <legend>{label}</legend>
      {options.map((o) => (
        <button
          key={o}
          disabled={disabled}
          aria-pressed={value === o}
          onClick={() => onChange(o)}
        >
          {o}
        </button>
      ))}
    </fieldset>
  );
}
export function Bars({
  items,
  max,
  label,
}: {
  items: [string, number][];
  max: number;
  label: string;
}) {
  return (
    <figure className="prism-bars">
      <figcaption>{label}</figcaption>
      {items.map(([name, v]) => (
        <div key={name}>
          <span>{name}</span>
          <meter min={0} max={max} value={Math.max(0, v)} />
          <output>{v.toFixed(2)}</output>
        </div>
      ))}
    </figure>
  );
}
export function Plot({
  series,
  xLabel,
  yLabel,
  minX = 0,
  maxX = 1,
  minY = 0,
  maxY = 1,
}: {
  series: { name: string; points: [number, number][] }[];
  xLabel: string;
  yLabel: string;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
}) {
  const x = (n: number) =>
      65 + ((n - minX) / Math.max(1e-9, maxX - minX)) * 500,
    y = (n: number) => 280 - ((n - minY) / Math.max(1e-9, maxY - minY)) * 235;
  return (
    <figure className="prism-plot">
      <svg
        viewBox="0 0 600 345"
        role="img"
        aria-label={`${yLabel} against ${xLabel}; ${series.map((s) => s.name).join(", ")}`}
      >
        <text x="65" y="20">
          {yLabel}
        </text>
        {[0, 0.5, 1].map((f) => (
          <g key={f}>
            <line
              x1="65"
              x2="565"
              y1={y(minY + f * (maxY - minY))}
              y2={y(minY + f * (maxY - minY))}
              stroke="var(--border)"
            />
            <text x="56" y={y(minY + f * (maxY - minY)) + 5} textAnchor="end">
              {Number((minY + f * (maxY - minY)).toFixed(2))}
            </text>
            <text x={x(minX + f * (maxX - minX))} y="305" textAnchor="middle">
              {Number((minX + f * (maxX - minX)).toFixed(2))}
            </text>
          </g>
        ))}
        {series.map((s, i) => (
          <g key={s.name}>
            <polyline
              points={s.points
                .filter((p) => p.every(Number.isFinite))
                .map(([a, b]) => `${x(a)},${y(b)}`)
                .join(" ")}
              fill="none"
              stroke={i % 2 ? "var(--foreground)" : "var(--accent)"}
              strokeWidth="3"
              strokeDasharray={plotDashes[i % plotDashes.length]}
            />
            {s.points.length === 1 && s.points[0].every(Number.isFinite) && (
              <circle
                cx={x(s.points[0][0])}
                cy={y(s.points[0][1])}
                r="4"
                fill={i % 2 ? "var(--foreground)" : "var(--accent)"}
              />
            )}
          </g>
        ))}
        <text x="235" y="337">
          {xLabel} →
        </text>
      </svg>
      <figcaption>
        {series.map((s, i) => (
          <span className="prism-plot-key" key={s.name}>
            <svg viewBox="0 0 34 12" aria-hidden="true">
              <line
                x1="0"
                y1="6"
                x2="34"
                y2="6"
                stroke={i % 2 ? "var(--foreground)" : "var(--accent)"}
                strokeWidth="3"
                strokeDasharray={plotDashes[i % plotDashes.length]}
              />
            </svg>
            {s.name}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
const plotDashes = [
  undefined,
  "9 4",
  "2 4",
  "10 3 2 3",
  "14 5",
  "4 3",
  "2 3 2 7",
  "14 3 4 3",
];
export const fixed = (v: number, d = 2) =>
  Number.isFinite(v) ? v.toFixed(d) : "Undefined";
