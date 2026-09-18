import Link from "next/link";
export default function NotFound() {
  return (
    <section className="directory-header">
      <span className="eyebrow">404 / OUTSIDE THE COLLECTION</span>
      <h1>
        This page hasn’t
        <br />
        taken shape<span className="accent">.</span>
      </h1>
      <p>The idea you’re looking for may be elsewhere.</p>
      <Link className="text-link" href="/effects">
        Back to the collection ↗
      </Link>
    </section>
  );
}
