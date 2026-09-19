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
      {kind === "monty-hall" ? (
        <g {...common}>
          {[25, 75, 125].map((x, i) => (
            <g key={x}>
              <rect x={x} y="12" width="32" height="64" rx="2" />
              <circle cx={x + 25} cy="46" r="1.5" />
              {i === 1 && (
                <path
                  d={`M${x + 5} 20L${x + 27} 68M${x + 27} 20L${x + 5} 68`}
                  opacity=".4"
                />
              )}
            </g>
          ))}
        </g>
      ) : kind === "birthday-paradox" ? (
        <g {...common}>
          {Array.from({ length: 24 }, (_, i) => (
            <circle
              key={i}
              cx={20 + (i % 8) * 20}
              cy={22 + Math.floor(i / 8) * 22}
              r="5"
              fill={i === 4 || i === 19 ? "currentColor" : "none"}
            />
          ))}
          <path d="M100 22L80 66" strokeDasharray="3 3" />
        </g>
      ) : kind === "law-of-large-numbers" ? (
        <g {...common}>
          <path d="M10 44H170" opacity=".3" strokeDasharray="3 4" />
          <path d="M10 12L20 65L30 28L40 58L50 37L60 53L70 41L80 49L100 42L120 46L145 43L170 44" />
        </g>
      ) : kind === "compound-growth" ? (
        <g {...common}>
          <path d="M12 76L168 55" opacity=".4" />
          <path d="M12 76C100 75 135 45 168 8" />
        </g>
      ) : kind === "diminishing-returns" ? (
        <g {...common}>
          <path d="M12 78C35 20 70 13 168 12" />
          {[20, 45, 70, 95, 120, 145].map((x, i) => (
            <path
              key={x}
              opacity=".3"
              d={`M${x} 78V${20 + 50 * Math.exp(-i)}`}
            />
          ))}
        </g>
      ) : kind === "opportunity-cost" ? (
        <g {...common}>
          <path d="M20 10V76H170" opacity=".3" />
          <path d="M20 16Q140 15 165 76" />
          <circle cx="105" cy="35" r="4" fill="currentColor" />
        </g>
      ) : kind === "sunk-cost-fallacy" ? (
        <g {...common}>
          <path d="M15 65H170" opacity=".3" />
          <path d="M20 55H75L165 15M75 55L165 73" />
          <path d="M75 8V80" strokeDasharray="3 4" opacity=".5" />
        </g>
      ) : kind === "anchoring-bias" ? (
        <g {...common}>
          <circle cx="36" cy="44" r="15" />
          <path d="M51 44H153M90 36L102 44L90 52" />
          <path d="M156 10V78" strokeDasharray="3 4" />
          <circle cx="108" cy="44" r="5" fill="currentColor" />
        </g>
      ) : kind === "confirmation-bias" ? (
        <g {...common}>
          <path d="M15 44H65L110 15H165M65 44L110 73H165" />
          <path d="M130 10L135 17L148 5M132 64L149 81M149 64L132 81" />
        </g>
      ) : kind === "present-bias" ? (
        <g {...common}>
          <path d="M18 12V42Q80 59 168 72" />
          <path d="M18 12Q75 25 168 62" opacity=".4" strokeDasharray="4 4" />
        </g>
      ) : kind === "forgetting-curve" ? (
        <g {...common}>
          <path d="M12 15Q20 55 55 70V15Q66 45 110 62V15Q130 35 170 45" />
        </g>
      ) : kind === "tragedy-of-the-commons" ? (
        <g {...common}>
          <path d="M12 35H168" />
          <path d="M12 35Q80 32 105 73H168" strokeDasharray="4 4" />
          <path d="M22 12Q45 1 55 18M52 11L55 18L46 17" />
        </g>
      ) : kind === "prisoners-dilemma" ? (
        <g {...common}>
          <rect x="45" y="8" width="90" height="72" />
          <path d="M90 8V80M45 44H135" />
          <circle cx="68" cy="26" r="7" />
          <circle cx="113" cy="62" r="3" />
          <path d="M12 44H35M145 44H170" />
        </g>
      ) : kind === "schelling-segregation" ? (
        <g {...common}>
          {Array.from({ length: 28 }, (_, i) =>
            i % 7 < 3 ? (
              <circle
                key={i}
                cx={18 + (i % 7) * 24}
                cy={14 + Math.floor(i / 7) * 20}
                r="4"
              />
            ) : (
              <rect
                key={i}
                x={14 + (i % 7) * 24}
                y={10 + Math.floor(i / 7) * 20}
                width="8"
                height="8"
                opacity=".5"
              />
            ),
          )}
        </g>
      ) : kind === "butterfly-effect" ? (
        <g {...common}>
          <path d="M10 44L25 40L40 46L55 38L70 49L85 30L100 58L115 15L130 71L145 22L170 60" />
          <path
            d="M10 44L25 40L40 46L55 39L70 46L85 43L100 25L115 65L130 22L145 67L170 15"
            opacity=".4"
            strokeDasharray="3 3"
          />
        </g>
      ) : kind === "lindy" ? (
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
