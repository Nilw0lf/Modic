import type { ReactNode } from "react";
export { Slider, Stats } from "../foundations/Shared";
export const fmt = (n: number, places = 2) => n.toFixed(places);
export const pct = (n: number) => (100 * n).toFixed(1) + "%";
export function Actions({ children }: { children: ReactNode }) {
  return <div className="depth-actions">{children}</div>;
}
export function Chart({
  lines,
  min = 0,
  max = 1,
  label,
  xLabel = "Step →",
  points = false,
  marker,
}: {
  lines: { values: number[]; name: string }[];
  min?: number;
  max?: number;
  label: string;
  xLabel?: string;
  points?: boolean;
  marker?: { index: number; value: number; label: string };
}) {
  return (
    <figure className="depth-chart">
      <svg
        viewBox="0 0 600 260"
        role="img"
        aria-label={
          label +
          (marker
            ? `; ${marker.label} ${marker.index}, value ${fmt(marker.value)}`
            : "")
        }
      >
        {[0, 0.5, 1].map((f) => (
          <g key={f}>
            <line
              x1="55"
              x2="580"
              y1={220 - f * 190}
              y2={220 - f * 190}
              className="depth-gridline"
            />
            <text x="48" y={225 - f * 190} textAnchor="end">
              {fmt(min + f * (max - min), 1)}
            </text>
          </g>
        ))}
        {lines.map((line, k) => (
          <g
            key={line.name}
            className={k % 2 ? "depth-secondary" : "depth-primary"}
          >
            {points ? (
              line.values.map((v, i) => (
                <circle
                  key={i}
                  cx={55 + (i * 525) / Math.max(1, line.values.length - 1)}
                  cy={220 - ((v - min) / (max - min)) * 190}
                  r="4"
                />
              ))
            ) : (
              <polyline
                fill="none"
                strokeWidth="3"
                strokeDasharray={k >= 2 ? "7 5" : undefined}
                points={line.values
                  .map(
                    (v, i) =>
                      `${55 + (i * 525) / Math.max(1, line.values.length - 1)},${220 - ((v - min) / (max - min)) * 190}`,
                  )
                  .join(" ")}
              />
            )}
          </g>
        ))}
        {marker && (
          <circle
            cx={
              55 +
              (marker.index * 525) / Math.max(1, lines[0].values.length - 1)
            }
            cy={220 - ((marker.value - min) / (max - min)) * 190}
            r="8"
            fill="var(--foreground)"
            stroke="var(--background)"
            strokeWidth="3"
          />
        )}
      </svg>
      <figcaption>
        <span>
          {label} · Scale {fmt(min, 1)} to {fmt(max, 1)} · {xLabel}
        </span>
        {marker && (
          <span>
            {marker.label}: {marker.index} · energy {fmt(marker.value)}
          </span>
        )}
        <span className="depth-legend">
          {lines.map((l, k) => (
            <span key={l.name}>
              <i
                className={k % 2 ? "secondary" : "primary"}
                style={{ borderTopStyle: k >= 2 ? "dashed" : "solid" }}
              />
              {l.name}
            </span>
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
export function Ledger({
  headers,
  rows,
  label,
}: {
  headers: string[];
  rows: (string | number)[][];
  label: string;
}) {
  return (
    <div className="depth-table" tabIndex={0} role="region" aria-label={label}>
      <table>
        <caption>{label}</caption>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((v, j) => (
                <td key={j}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
