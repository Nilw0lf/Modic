import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  getInsight,
  insights,
  insightDate,
  readingMinutes,
  relatedInsights,
} from "@/content/insights";
import { InlineText } from "@/components/insights/InlineText";
import { getEffect } from "@/lib/catalog";
import { pageMetadata, siteUrl } from "@/lib/metadata";

export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getInsight((await params).slug);
  if (!post) return {};
  const base = pageMetadata(
    post.title,
    post.description,
    `/insights/${post.slug}`,
  );
  return {
    ...base,
    authors: [{ name: "Modic editorial", url: `${siteUrl}/about` }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.published,
      authors: ["Modic editorial"],
      section: post.topic,
    },
  };
}
export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getInsight((await params).slug);
  if (!post) notFound();
  const canonical = `${siteUrl}/insights/${post.slug}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.published,
      author: {
        "@type": "Organization",
        name: "Modic editorial",
        url: `${siteUrl}/about`,
      },
      publisher: { "@type": "Organization", name: "Modic", url: siteUrl },
      mainEntityOfPage: canonical,
      url: canonical,
      articleSection: post.topic,
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Insights",
          item: `${siteUrl}/insights`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: canonical },
      ],
    },
  ];
  return (
    <div className="insight-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="insight-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/insights">Insights</Link>
        <span aria-hidden="true">/</span>
        <span>{post.topic}</span>
      </nav>
      <header className="insight-article-header">
        <span className="insight-kicker">{post.topic} / A practical guide</span>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div className="insight-byline">
          <Link href="/about">Modic editorial</Link>
          <span aria-hidden="true">·</span>
          <time dateTime={post.published}>{insightDate(post.published)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(post)} min read</span>
        </div>
      </header>
      <div className="insight-reading-layout">
        <aside className="insight-contents">
          <details open>
            <summary>In this guide</summary>
            <nav aria-label="Article contents">
              <ol>
                {post.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
                <li>
                  <a href="#try-it">Try the experiments</a>
                </li>
                <li>
                  <a href="#sources">Sources & further reading</a>
                </li>
              </ol>
            </nav>
          </details>
          <Link className="insight-text-link" href="/insights">
            ← All Insights
          </Link>
        </aside>
        <article className="insight-prose" aria-label={post.title}>
          <aside className="insight-takeaway">
            <span className="insight-kicker">The idea to keep</span>
            <p>{post.takeaway}</p>
          </aside>
          <p className="insight-intro">{post.intro}</p>
          {post.sections.map((section, index) => (
            <section id={section.id} key={section.id}>
              <span className="insight-section-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((text, i) => (
                <p key={i}>
                  <InlineText text={text} />
                </p>
              ))}
              {section.steps && (
                <ol className="insight-worked-steps">
                  {section.steps.map((text, i) => (
                    <li key={i}>
                      <InlineText text={text} />
                    </li>
                  ))}
                </ol>
              )}
              {section.checklist && (
                <ul className="insight-checklist">
                  {section.checklist.map((text, i) => (
                    <li key={i}>
                      <InlineText text={text} />
                    </li>
                  ))}
                </ul>
              )}
              {section.deeper && (
                <details className="insight-deeper">
                  <summary>Go a little deeper: {section.deeper.title}</summary>
                  <p>
                    <InlineText text={section.deeper.text} />
                  </p>
                </details>
              )}
            </section>
          ))}
          <section id="try-it" className="insight-experiments">
            <span className="insight-kicker">Read → experiment → reflect</span>
            <h2>Try the ideas for yourself.</h2>
            <p>
              These are teaching models. Follow the assumptions in each
              experiment; the results are not real-world forecasts.
            </p>
            <div>
              {post.experiments.map((item) => (
                <Link
                  className="insight-experiment-link"
                  href={`/effects/${item.slug}`}
                  key={item.slug}
                >
                  <strong>
                    {getEffect(item.slug)?.name}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </strong>
                  <span>{item.task}</span>
                </Link>
              ))}
            </div>
          </section>
          <aside className="insight-reflection">
            <span className="insight-kicker">Take it into your day</span>
            <p>{post.reflection}</p>
            <span>
              Write a short answer. Name one assumption you would want to check.
            </span>
          </aside>
          <section id="sources" className="insight-sources">
            <h2>Sources & further reading</h2>
            <p>
              Current-event context was checked on {insightDate(post.published)}
              . Follow the original source for newer updates. Worked scenarios
              are illustrative unless explicitly identified as reported data.
            </p>
            <ol>
              {post.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url}>{source.title} ↗</a>
                  <p>{source.note}</p>
                </li>
              ))}
            </ol>
          </section>
          <a className="insight-text-link" href="#main">
            Back to the top ↑
          </a>
        </article>
      </div>
      <section className="insight-related" aria-labelledby="related-insights">
        <div className="insight-section-heading">
          <h2 id="related-insights">Keep the question going.</h2>
          <Link href="/insights">All Insights ↗</Link>
        </div>
        <div className="insight-grid">
          {relatedInsights(post).map((item) => (
            <article className="insight-card" key={item.slug}>
              <span className="insight-card-meta">
                {item.topic} · {readingMinutes(item)} min read
              </span>
              <h3>
                <Link href={`/insights/${item.slug}`}>
                  {item.title}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
