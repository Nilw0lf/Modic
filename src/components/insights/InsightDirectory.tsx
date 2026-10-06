"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";

export type InsightCard = {
  slug: string;
  title: string;
  description: string;
  topic: string;
  minutes: number;
};
export function InsightDirectory({ posts }: { posts: InsightCard[] }) {
  const [topic, setTopic] = useState("All insights");
  const [query, setQuery] = useState("");
  const topics = ["All insights", ...new Set(posts.map((post) => post.topic))];
  const visible = posts.filter(
    (post) =>
      (topic === "All insights" || post.topic === topic) &&
      `${post.title} ${post.description} ${post.topic}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <section
      id="articles"
      className="insight-directory"
      aria-labelledby="insight-library-title"
    >
      <div className="insight-section-heading">
        <div>
          <span className="insight-kicker">The reading room</span>
          <h2 id="insight-library-title">Follow a question.</h2>
        </div>
        <p>Read it. Test it. Make it yours.</p>
      </div>
      <div
        className="insight-filters"
        role="group"
        aria-label="Filter articles by topic"
      >
        {topics.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={topic === item}
            onClick={() => setTopic(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="insight-search">
        <Search size={20} aria-hidden="true" />
        <label className="sr-only" htmlFor="insight-search">
          Search Insights
        </label>
        <input
          id="insight-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a question, concept, or topic…"
        />
        <span role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? "article" : "articles"}
        </span>
      </div>
      <div className="insight-grid">
        {visible.map((post) => (
          <article className="insight-card" key={post.slug}>
            <div className="insight-card-meta">
              <span>{post.topic}</span>
              <span>{post.minutes} min read</span>
            </div>
            <h3>
              <Link href={`/insights/${post.slug}`}>
                {post.title}
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </h3>
            <p>{post.description}</p>
            <span className="insight-card-foot">
              A practical guide + experiments
            </span>
          </article>
        ))}
      </div>
      {!visible.length && (
        <div className="insight-empty">
          <h3>No articles match that question yet.</h3>
          <p>Try a broader phrase, or browse all ten guides.</p>
          <button
            type="button"
            onClick={() => {
              setTopic("All insights");
              setQuery("");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
