import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-brand" href="/">
          modic.
        </Link>
        <span>A field guide to how the world behaves.</span>
      </div>
      <div>
        <span>An ongoing collection</span>
        <Link href="/about">About this project ↗</Link>
      </div>
    </footer>
  );
}
