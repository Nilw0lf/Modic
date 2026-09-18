export function EffectGlyph({
  kind,
  large = false,
}: {
  kind: string;
  large?: boolean;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: large ? 1.5 : 1.3,
  };
  return (
    <svg
      className={`effect-glyph glyph-${kind} ${large ? "large" : ""}`}
      viewBox="0 0 180 88"
      aria-hidden="true"
    >
      {kind === "lindy" ? (
        <g {...common}>
          {[15, 24, 33, 42, 51, 60, 69].map((y, i) => (
            <path
              key={y}
              opacity={0.3 + i * 0.1}
              d={`M 15 ${y} H ${65 + i * 14}`}
            />
          ))}
          <path strokeDasharray="2 4" d="M 65 8 V 80" />
        </g>
      ) : kind === "fat-tails" ? (
        <g {...common}>
          <path opacity=".3" d="M10 74 C48 74 46 15 70 15 S90 74 170 74" />
          <path
            className="glyph-tail"
            d="M10 74 C40 74 45 26 67 26 S95 62 170 67"
          />
        </g>
      ) : kind === "kelly" ? (
        <g {...common}>
          <path d="M15 72 Q 60 -34 165 72" />
          <path strokeDasharray="3 4" opacity=".5" d="M77 13 V74" />
          <circle
            className="glyph-optimum"
            cx="77"
            cy="20"
            r="3"
            fill="currentColor"
            stroke="none"
          />
        </g>
      ) : kind === "network" || kind === "principal-agent" ? (
        <g {...common}>
          {[
            [30, 44, 80, 20],
            [30, 44, 80, 68],
            [80, 20, 130, 44],
            [80, 68, 130, 44],
            [80, 20, 80, 68],
            [130, 44, 165, 18],
          ].map((p, i) => (
            <path
              key={i}
              opacity=".4"
              d={`M${p[0]} ${p[1]} L${p[2]} ${p[3]}`}
            />
          ))}
          {kind === "network" && (
            <path
              className="glyph-connection"
              d="M80 20 L165 18"
              pathLength="1"
            />
          )}
          {[
            [30, 44],
            [80, 20],
            [80, 68],
            [130, 44],
            [165, 18],
          ].map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="4" />
          ))}
        </g>
      ) : kind === "ruin" || kind === "risk-of-ruin" ? (
        <g {...common}>
          <path opacity=".4" strokeDasharray="3 4" d="M10 70H170" />
          <path
            className="glyph-ruin-path"
            d="M12 33L28 25L43 40L59 32L75 48L92 41L109 63L127 71L169 71"
          />
          <circle cx="127" cy="71" r="3" fill="var(--negative)" stroke="none" />
        </g>
      ) : kind === "regression" ? (
        <g {...common}>
          <path opacity=".3" strokeDasharray="3 4" d="M15 44H165" />
          {[16, 29, 38, 51, 62, 75].map((y, i) => (
            <g key={y}>
              <circle
                className={`glyph-observation ${y < 44 ? "above" : "below"}`}
                cx={25 + i * 25}
                cy={y}
                r="3"
              />
              <path opacity=".2" d={`M${25 + i * 25} ${y}V44`} />
            </g>
          ))}
        </g>
      ) : kind === "power-laws" ? (
        <path {...common} d="M20 10 C23 63 49 72 165 75" />
      ) : kind === "loss-aversion" ? (
        <g {...common}>
          <path opacity=".3" d="M15 44H165M90 5V83" />
          <path d="M30 80 Q70 75 90 44 Q120 23 162 18" />
        </g>
      ) : (
        <g {...common}>
          {Array.from({ length: 17 }, (_, i) => (
            <line
              key={i}
              x1={12 + i * 9}
              x2={12 + i * 9}
              y1={74}
              y2={Number(
                (
                  74 -
                  (15 +
                    Math.sin(i * 0.6 + kind.length) * Math.sin(i * 0.3) * 45)
                ).toFixed(3),
              )}
              opacity={0.35 + (i % 4) * 0.17}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
