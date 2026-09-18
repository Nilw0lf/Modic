import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EffectExplorer } from "@/components/effects/EffectExplorer";
import { thinkers, effects } from "@/lib/catalog";
import { SurpriseButton } from "@/components/effects/SurpriseButton";
import { HeroExperiment } from "@/components/simulations/HeroExperiment";
function PreviewChart() {
  return (
    <svg
      viewBox="0 0 540 208"
      role="img"
      aria-label="Illustration of observed lifetime and a range of possible futures"
    >
      <text x="14" y="22" className="chart-label">
        THE PAST
      </text>
      <text x="173" y="22" className="chart-label" fill="var(--accent)">
        POSSIBLE FUTURES
      </text>
      <line
        x1="155"
        x2="155"
        y1="35"
        y2="173"
        stroke="var(--accent)"
        opacity=".45"
        strokeDasharray="3 4"
      />
      {Array.from({ length: 19 }, (_, i) => {
        const y = 43 + i * 6.5;
        const length = 28 + Math.pow(i / 18, 1.65) * 317;
        return (
          <g key={i}>
            <line
              x1="14"
              x2="155"
              y1={y}
              y2={y}
              stroke="currentColor"
              opacity=".2"
            />
            <line
              className="featured-future"
              x1="155"
              x2={155 + length}
              y1={y}
              y2={y}
              stroke="var(--accent)"
              opacity={0.25 + i * 0.025}
            />
            <circle
              className="featured-endpoint"
              cx={155 + length}
              cy={y}
              r="1.7"
              fill="var(--accent)"
              opacity=".7"
            />
          </g>
        );
      })}
      <text
        x="155"
        y="197"
        textAnchor="middle"
        className="chart-tick"
        fill="var(--accent)"
      >
        Now
      </text>
      <text x="500" y="197" textAnchor="end" className="chart-tick">
        Time →
      </text>
    </svg>
  );
}
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <svg
          className="hero-orbits"
          viewBox="0 0 1440 640"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <ellipse
            cx="30"
            cy="290"
            rx="700"
            ry="460"
            transform="rotate(28 30 290)"
          />
          <ellipse cx="1490" cy="750" rx="260" ry="310" />
          <path d="M430 -60Q850 200 620 700" strokeDasharray="4 7" />
          <circle cx="610" cy="92" r="4" />
          <circle cx="66" cy="454" r="3" />
          <circle cx="1290" cy="518" r="4" />
        </svg>
        <div className="hero-kicker">
          <span className="eyebrow">AN INTERACTIVE FIELD GUIDE</span>
          <span className="edition">VOL. 01 — AN ONGOING EXPLORATION</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              See how the
              <br />
              world <span>behaves.</span>
            </h1>
            <div className="hero-bottom">
              <p>
                Move a slider. Test an assumption. See what changes.
                <br className="desktop-break" /> Explore probability, risk,
                decisions, and the patterns that connect them.
              </p>
            </div>
            <div className="hero-actions">
              <Link className="modic-action primary" href="/learn">
                Start learning <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <SurpriseButton prominent />
              <a className="hero-browse" href="#explore">
                Find your own way <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="hero-footnote">
              {effects.filter((e) => e.status === "live").length} hands-on
              experiments · a guided learning path · room for curiosity
            </p>
          </div>
          <HeroExperiment />
        </div>
      </section>
      <EffectExplorer showSurprise={false} />
      <Link className="featured-experiment" href="/effects/lindy-effect">
        <div className="featured-copy">
          <div className="eyebrow">
            <span className="live-dot" /> START WITH AN EXPERIMENT{" "}
            <span className="featured-index">001</span>
          </div>
          <h2>Time is a kind of evidence.</h2>
          <p>
            Why might a 100-year-old idea outlast a new one?
            <br /> Explore the Lindy Effect, one possible future at a time.
          </p>
          <span className="text-link">
            Try the Lindy Effect <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="featured-chart">
          <PreviewChart />
          <span className="preview-note">
            A sketch of possibilities, not a prediction.
          </span>
        </div>
      </Link>
      <section className="thinker-discovery">
        <div>
          <span className="eyebrow">IDEAS THROUGH PEOPLE</span>
          <h2>Follow a curious mind.</h2>
          <p>Different thinkers. Connected questions.</p>
        </div>
        <div className="thinker-discovery-list">
          {["taleb", "kahneman", "mandelbrot", "kelly"].map((id) => {
            const thinker = thinkers.find((t) => t.id === id)!;
            const count = effects.filter((e) =>
              e.thinkerRelationships.some((r) => r.thinkerId === id),
            ).length;
            return (
              <Link key={id} href={`/thinkers/${thinker.slug}`}>
                <span>{thinker.name}</span>
                <span>
                  {count} {count === 1 ? "idea" : "ideas"} ↗︎
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="closing-note">
        <span className="eyebrow">UNDERSTAND BY EXPERIMENTING</span>
        <p>
          Some ideas make more sense
          <br />
          when you can <span>play with them.</span>
        </p>
        <div className="philosophy-statements">
          <p>
            <strong>Change the assumptions.</strong>
            <span>See what breaks.</span>
          </p>
          <p>
            <strong>Run it many times.</strong>
            <span>See what probability hides.</span>
          </p>
          <p>
            <strong>Compare different worlds.</strong>
            <span>Build intuition instead of memorizing formulas.</span>
          </p>
        </div>
        <Link href="/about" className="text-link">
          A little about Modic ↗︎
        </Link>
      </section>
    </>
  );
}
