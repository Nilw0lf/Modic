import Link from "next/link";
import { insightsForEffect, readingMinutes } from "@/content/insights";
export function EffectInsights({ slug }: { slug: string }) {
  const posts = insightsForEffect(slug);
  if (!posts.length) return null;
  return (
    <section
      className="insight-related effect-insights"
      aria-labelledby="effect-insights-title"
    >
      <span className="insight-kicker">Put the idea to work</span>
      <h2 id="effect-insights-title">Read it in context.</h2>
      <div className="insight-grid">
        {posts.map((post) => (
          <article className="insight-card" key={post.slug}>
            <div className="insight-card-meta">
              {post.topic} · {readingMinutes(post)} min read
            </div>
            <h3>
              <Link href={`/insights/${post.slug}`}>{post.title} ↗</Link>
            </h3>
            <p>{post.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
