"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import {
  Actions,
  Slider,
  Stats,
  Choices,
  Ledger,
  Bars,
  fixed,
} from "./Shared";
import {
  population,
  publication,
  mean,
  median,
  fit,
} from "@/lib/simulations/prism";
export function Sampling() {
  const [mode, setMode] = useState("All households"),
    [reveal, setReveal] = useState(false);
  const groups = [
      { name: "Online", count: 80, support: 60 },
      { name: "Offline", count: 20, support: 5 },
    ],
    included = mode === "Online only" ? [groups[0]] : groups;
  const rate =
    included.reduce((s, g) => s + g.support, 0) /
    included.reduce((s, g) => s + g.count, 0);
  return (
    <>
      <p>
        A fictional town has 100 households. An online survey excludes
        households without internet access. Choose a sampling frame before
        inspecting the full ledger.
      </p>
      <Choices
        label="Survey frame"
        options={["All households", "Online only"]}
        value={mode}
        onChange={(s) => {
          setMode(s);
          setReveal(false);
        }}
      />
      <Stats
        items={[
          ["Frame size", mode === "Online only" ? 80 : 100],
          ["Support in selected frame", fixed(rate * 100, 1) + "%"],
        ]}
      />
      <Actions>
        <button onClick={() => setReveal(true)}>
          Reveal population ledger
        </button>
      </Actions>
      {reveal && (
        <>
          <Ledger
            label="Stipulated population, not survey data"
            headers={["Group", "Households", "Supporters"]}
            rows={groups.map((g) => [g.name, g.count, g.support])}
          />
          <p>
            Population support is 65%. Online-only support is 75%. Increasing
            responses within the online frame cannot reach the missing offline
            households.
          </p>
        </>
      )}
      <p>
        This exact authored population isolates coverage bias; it does not
        estimate real internet access or public opinion.
      </p>
    </>
  );
}
export function Publication({ seed }: { seed: number }) {
  const [all, setAll] = useState(false),
    data = publication(seed),
    shown = all ? data : data.filter((d) => d.significant);
  return (
    <>
      <p>
        One hundred independent studies estimate a true mean of zero with known
        standard deviation one and sample size 25. A selective journal publishes
        only |Z| &gt; 1.96.
      </p>
      <Actions>
        <button aria-pressed={all} onClick={() => setAll(!all)}>
          {all ? "Show selective journal" : "Open the file drawer"}
        </button>
      </Actions>
      <div className="prism-study-grid">
        {data.map((d, i) => (
          <span
            key={i}
            className={all || d.significant ? "shown" : "hidden-study"}
            aria-label={`Study ${i + 1}: ${all || d.significant ? fixed(d.estimate) : "unpublished"}`}
          >
            {all || d.significant ? fixed(d.estimate) : "?"}
          </span>
        ))}
      </div>
      <Stats
        items={[
          ["Visible studies", shown.length],
          [
            "Visible mean estimate",
            shown.length
              ? fixed(mean(shown.map((d) => d.estimate)), 3)
              : "No published estimates",
          ],
          ["True generating mean", 0],
          ["Selection rule", "Two-sided |Z| > 1.96"],
        ]}
      />
      <p>
        Two-sided selection exaggerates absolute effects even when positive and
        negative selected effects average close to zero. This toy does not
        estimate how prevalent publication bias is in a field.
      </p>
    </>
  );
}
export function Ecological() {
  const [reveal, setReveal] = useState(false);
  return (
    <>
      <p>
        Two fictional districts have different school-library access and exam
        pass rates. Both district summaries appear positively associated.
        Predict whether the same is true for individuals.
      </p>
      <Ledger
        label="District-level summaries"
        headers={["District", "Library access", "Overall pass rate"]}
        rows={[
          ["A", "80%", "70%"],
          ["B", "20%", "30%"],
        ]}
      />
      <Actions>
        <button onClick={() => setReveal(true)}>
          Inspect individual-level cells
        </button>
      </Actions>
      {reveal && (
        <>
          <Ledger
            label="Counts reveal within-district comparisons"
            headers={["District / access", "People", "Passes", "Pass rate"]}
            rows={[
              ["A / Yes", 80, 56, "70%"],
              ["A / No", 20, 14, "70%"],
              ["B / Yes", 20, 6, "30%"],
              ["B / No", 80, 24, "30%"],
            ]}
          />
          <p>
            Within each district, access and passing are unrelated in this
            table. The aggregate association reflects the between-district
            difference, not an individual causal effect.
          </p>
        </>
      )}
      <p>
        The ecological fallacy is an inference across levels. These invented
        cells illustrate the problem; they do not claim libraries have no
        educational benefit.
      </p>
    </>
  );
}
export function Range({ seed }: { seed: number }) {
  const [width, setWidth] = useState(3),
    points = population(seed),
    selected = points.filter(([x]) => Math.abs(x) <= width),
    r = fit(selected);
  return (
    <>
      <p>
        Generate a bivariate Normal teaching population with correlation 0.7,
        then restrict admission to a narrow band of the x variable. The
        underlying data-generating rule stays unchanged.
      </p>
      <Slider
        label="Keep only |x| at most"
        min={0.2}
        max={3}
        step={0.1}
        value={width}
        onChange={setWidth}
      />
      <svg
        className="prism-scatter"
        viewBox="0 0 600 350"
        role="img"
        aria-label="Full and range-restricted synthetic scatter plot"
      >
        {points.map(([x, y], i) => (
          <circle
            key={i}
            cx={300 + x * 65}
            cy={175 - y * 45}
            r="4"
            fill={Math.abs(x) <= width ? "var(--accent)" : "var(--muted)"}
            opacity={Math.abs(x) <= width ? 1 : 0.2}
          />
        ))}
        <text x="20" y="335">
          x and y in synthetic standard-deviation units
        </text>
      </svg>
      <Stats
        items={[
          ["Selected observations", selected.length],
          ["Full sample correlation", fixed(fit(points).corr ?? NaN, 3)],
          ["Restricted correlation", fixed(r.corr ?? NaN, 3)],
        ]}
      />
      <p>
        Restriction can reduce observed correlation without changing the
        generating relationship. Finite-sample fluctuations and the exact
        selection rule matter; this is not a formula for correcting a real
        admissions study.
      </p>
    </>
  );
}
export function Robust() {
  const [outlier, setOutlier] = useState(10),
    data = [8, 9, 10, 10, 11, 12, outlier],
    sorted = [...data].sort((a, b) => a - b),
    trimmed = mean(sorted.slice(1, -1));
  return (
    <>
      <p>
        Six ordinary observations stay fixed. Move the seventh to inspect how
        three location summaries react. An extreme value is not automatically an
        error.
      </p>
      <Slider
        label="Seventh observation"
        min={-100}
        max={200}
        step={5}
        value={outlier}
        onChange={setOutlier}
      />
      <Bars
        label="Observed values (negative values reported in text)"
        max={200}
        items={data.map((v, i) => [`Observation ${i + 1}`, v])}
      />
      <Stats
        items={[
          ["Arithmetic mean", fixed(mean(data))],
          ["Median", fixed(median(data))],
          ["One-per-tail trimmed mean", fixed(trimmed)],
        ]}
      />
      <p>
        The median resists one arbitrarily distant value here. Robustness trades
        off with other properties and does not identify which observation is
        valid; always investigate the collection process.
      </p>
    </>
  );
}

export default function GroupBoard({
  index,
  seed,
}: {
  index: number;
  seed: number;
}) {
  const B = [Sampling, Publication, Ecological, Range, Robust][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
