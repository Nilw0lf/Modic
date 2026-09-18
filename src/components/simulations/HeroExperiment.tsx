"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { simulateManyLives } from "@/lib/simulations/gamblers-ruin";

export function HeroExperiment() {
  const [risk, setRisk] = useState(6);
  const result = useMemo(
    () =>
      simulateManyLives(
        {
          wealth: 100,
          risk: risk / 100,
          win: 0.55,
          payoff: 1,
          rounds: 40,
          lives: 1000,
          threshold: 10,
        },
        42,
      ),
    [risk],
  );
  const x = (round: number) => 48 + (round / 40) * 480;
  const y = (wealth: number) =>
    266 - ((Math.log10(Math.max(1, wealth)) - 1) / 2) * 224;
  const path = (values: number[]) =>
    values
      .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(2)},${y(v).toFixed(2)}`)
      .join(" ");
  const band =
    result.bands
      .map((b) => `${x(b.round).toFixed(2)},${y(b.q75).toFixed(2)}`)
      .join(" ") +
    " " +
    [...result.bands]
      .reverse()
      .map((b) => `${x(b.round).toFixed(2)},${y(b.q25).toFixed(2)}`)
      .join(" ");
  const href = `/effects/gamblers-ruin?wealth=100&risk=${risk / 100}&win=0.55&payoff=1&rounds=40&lives=1000&threshold=10`;
  return (
    <div className="hero-experiment">
      <div className="hero-model-heading">
        <div>
          <span className="eyebrow">LIVE MODEL / 01</span>
          <h2>One edge. Many futures.</h2>
        </div>
        <span className="hero-live">
          <i />
          Try it
        </span>
      </div>
      <svg
        className="hero-model-chart"
        viewBox="0 0 560 315"
        role="img"
        aria-label="Forty rounds of simulated wealth: sample paths, median, and middle fifty percent"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".65" fill="currentColor" opacity=".25" />
          </pattern>
          <clipPath id="hero-chart-clip">
            <rect x="48" y="30" width="480" height="236" />
          </clipPath>
        </defs>
        <rect x="48" y="30" width="480" height="236" fill="url(#hero-grid)" />
        {[10, 30, 100, 300, 1000].map((v) => (
          <g key={v}>
            <line
              x1="48"
              x2="528"
              y1={y(v)}
              y2={y(v)}
              stroke="currentColor"
              strokeDasharray="2 6"
              opacity=".25"
            />
            <text x="38" y={y(v) + 4} textAnchor="end">
              {v === 10000 ? "10k" : v === 1000 ? "1k" : v}
            </text>
          </g>
        ))}
        <g clipPath="url(#hero-chart-clip)">
          {result.sampledPaths.map((p, i) => (
            <path
              key={i}
              d={path(p.path)}
              fill="none"
              stroke="currentColor"
              opacity=".15"
              strokeWidth="1"
            />
          ))}
          <polygon points={band} fill="var(--hero-orange)" opacity=".17" />
          <path
            d={path(result.bands.map((b) => b.median))}
            fill="none"
            stroke="var(--hero-orange)"
            strokeWidth="2.6"
          />
          <circle
            cx={x(40)}
            cy={y(result.medianEndingWealth)}
            r="4.5"
            fill="var(--hero-orange)"
          />
        </g>
        <path
          d="M48 30V266H528"
          stroke="currentColor"
          opacity=".5"
          fill="none"
        />
        {[0, 10, 20, 30, 40].map((v) => (
          <text key={v} x={x(v)} y="286" textAnchor="middle">
            {v}
          </text>
        ))}
        <text x="48" y="17">
          Wealth · log scale
        </text>
        <text x="288" y="309" textAnchor="middle">
          Rounds played →
        </text>
      </svg>
      <div className="hero-chart-legend">
        <span>
          <i />
          Median & middle 50%
        </span>
        <span>24 sample journeys</span>
      </div>
      <div className="hero-model-controls">
        <div className="hero-risk-control">
          <label htmlFor="hero-risk">
            Stake per round <output htmlFor="hero-risk">{risk}%</output>
          </label>
          <input
            id="hero-risk"
            type="range"
            min="1"
            max="20"
            value={risk}
            onChange={(e) => setRisk(Number(e.target.value))}
          />
          <div>
            <span>Small stakes</span>
            <span>Larger stakes</span>
          </div>
        </div>
        <div className="hero-outcome" aria-live="polite">
          <span>Middle 50% finish with</span>
          <strong>
            {Math.round(result.q25)}–{Math.round(result.q75)}
          </strong>
          <small>wealth units</small>
        </div>
      </div>
      <div className="hero-model-footer">
        <p>
          1,000 trials · 55% win chance · start at 100
          <br />
          Illustrative model. Stop at 10. Paths may exceed the chart.
        </p>
        <Link href={href} aria-label="Open full risk experiment">
          <ArrowUpRight size={20} />
        </Link>
      </div>
    </div>
  );
}
