"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { effects, categories, thinkers } from "@/lib/catalog";
import { filterEffects } from "@/lib/search/filter";
import { EffectCard } from "./EffectCard";
import { collectionSummary } from "@/lib/search/discovery";
import { SurpriseButton } from "./SurpriseButton";
import { experimentTypes, experimentTypeLabels } from "@/types/catalog";
export function EffectExplorer({
  showSurprise = true,
}: {
  showSurprise?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [experimentType, setExperimentType] = useState("all");
  const results = filterEffects(
    effects,
    categories,
    thinkers,
    query,
    category,
    experimentType,
  );
  return (
    <section
      className="explorer"
      id="explore"
      aria-labelledby="explore-heading"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE COLLECTION</span>
          <h2 id="explore-heading">Follow your curiosity.</h2>
        </div>
        <div className="collection-tools">
          <span className="small-note">{collectionSummary(effects)}</span>
          {showSurprise && <SurpriseButton />}
        </div>
      </div>
      <div className="filter-list" aria-label="Filter by category">
        {[{ id: "all", name: "Everything" }, ...categories].map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            className={category === item.id ? "active" : ""}
            onClick={() => setCategory(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="search-row">
        <Search size={19} aria-hidden="true" />
        <label className="sr-only" htmlFor="effect-search">
          Find an effect, idea or thinker
        </label>
        <input
          id="effect-search"
          type="search"
          placeholder="Find an effect, idea or thinker..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <button
            className="icon-button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
          >
            <X size={18} />
          </button>
        )}
        <span aria-live="polite" className="result-count">
          {results.length} {results.length === 1 ? "effect" : "effects"}
        </span>
      </div>
      <div className="type-filter">
        <label htmlFor="experiment-type">Explore by format</label>
        <select
          id="experiment-type"
          value={experimentType}
          onChange={(event) => setExperimentType(event.target.value)}
        >
          <option value="all">All experiments</option>
          {experimentTypes.map((type) => (
            <option key={type} value={type}>
              {experimentTypeLabels[type]}
            </option>
          ))}
        </select>
      </div>
      {results.length ? (
        <div className="effect-grid">
          {results.map((effect) => (
            <EffectCard
              key={effect.id}
              effect={effect}
              index={effects.findIndex((item) => item.id === effect.id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No effects found.</h3>
          <p>Try a broader phrase or a different category.</p>
          <button
            className="text-button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setExperimentType("all");
            }}
          >
            Clear search and filters ↗
          </button>
        </div>
      )}
    </section>
  );
}
