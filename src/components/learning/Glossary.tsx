"use client";
import { useState } from "react";
import Link from "next/link";
import { glossary } from "@/data/learning";
export function Glossary() {
  const [query, setQuery] = useState("");
  const terms = glossary.filter((t) =>
    (t.term + " " + t.definition)
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <section
      className="glossary"
      id="glossary"
      aria-labelledby="glossary-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">A SMALL WORKING VOCABULARY</span>
          <h2 id="glossary-title">Keep the ideas close.</h2>
        </div>
        <span className="small-note" aria-live="polite">
          {terms.length} terms
        </span>
      </div>
      <label htmlFor="glossary-search">Find a term or an idea</label>
      <input
        id="glossary-search"
        type="search"
        placeholder="Try noise, probability, or network…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <dl className="glossary-grid">
        {terms.map((t) => (
          <div key={t.term}>
            <dt>{t.term}</dt>
            <dd>
              {t.definition}
              <Link className="text-link" href={"/effects/" + t.slug}>
                See the idea in context ↗︎
              </Link>
            </dd>
          </div>
        ))}
      </dl>
      {!terms.length && (
        <div className="empty-state">
          <h3>No matching terms.</h3>
          <button className="text-button" onClick={() => setQuery("")}>
            Clear glossary search ↗︎
          </button>
        </div>
      )}
    </section>
  );
}
