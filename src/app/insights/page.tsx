import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { insights, readingMinutes } from "@/content/insights";
import { InsightDirectory } from "@/components/insights/InsightDirectory";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Insights — practical guides for a changing world",
  "Explore AI, learning, forecasts, everyday decisions, and complex systems with sourced articles and hands-on Modic experiments.",
  "/insights",
);
export default function InsightsPage() {
  const featured = insights[0];
  return (
    <div className="insights-index">
      <header className="insight-hero">
        <div>
          <span className="insight-kicker">
            Modic Insights / A reading room for curious minds
          </span>
          <h1>
            Make sense of
            <br />
            what&apos;s <em>changing.</em>
          </h1>
          <p>
            Big questions. Clear explanations. A way to try the ideas for
            yourself.
          </p>
          <a className="insight-button" href="#articles">
            Find your next read <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
        <aside
          className="insight-learning-map"
          aria-label="How to use Insights"
        >
          <span className="insight-kicker">A little less guessing</span>
          <ol>
            <li>
              <span>01</span>
              <div>
                <h2>Start with a real question.</h2>
                <p>Work, money, technology, the stories in your feed.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h2>See the mechanism.</h2>
                <p>Follow an example. Check the evidence and assumptions.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h2>Try it in Modic.</h2>
                <p>
                  Change a variable. Bring a better question back to your day.
                </p>
              </div>
            </li>
          </ol>
          <span className="insight-map-note">
            Understanding is something you do.
          </span>
        </aside>
      </header>
      <section className="insight-feature" aria-labelledby="featured-insight">
        <div className="insight-feature-label">
          <span className="insight-kicker">Start here</span>
          <span className="insight-feature-mark" aria-hidden="true">
            ?
          </span>
          <p>
            From a headline
            <br />
            to a useful next step.
          </p>
        </div>
        <div>
          <span className="insight-card-meta">
            {featured.topic} · {readingMinutes(featured)} min read
          </span>
          <h2 id="featured-insight">
            <Link href={`/insights/${featured.slug}`}>{featured.title}</Link>
          </h2>
          <p>{featured.description}</p>
          <Link
            className="insight-text-link"
            href={`/insights/${featured.slug}`}
          >
            Read the guide <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <InsightDirectory
        posts={insights.map((post) => ({
          slug: post.slug,
          title: post.title,
          description: post.description,
          topic: post.topic,
          minutes: readingMinutes(post),
        }))}
      />
      <aside className="insight-endnote">
        <div>
          <span className="insight-kicker">Prefer to learn by doing?</span>
          <h2>Let an experiment surprise you.</h2>
        </div>
        <Link className="insight-button" href="/explore">
          Explore the collection <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
