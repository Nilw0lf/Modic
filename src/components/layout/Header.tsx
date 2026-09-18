import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
const links = [
  "Effects",
  "Learn",
  "Categories",
  "Thinkers",
  "Explore",
  "About",
];
export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Modic home">
        <span className="brand-symbol" aria-hidden="true">
          m<span>·</span>
        </span>
        modic<span className="brand-period">.</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((label) => (
          <Link key={label} href={`/${label.toLowerCase()}`}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <Link href="/explore" className="header-explore">
          Start exploring <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <details className="mobile-nav">
          <summary>
            Menu <span aria-hidden="true">+</span>
          </summary>
          <nav aria-label="Mobile navigation">
            {links.map((label) => (
              <Link key={label} href={`/${label.toLowerCase()}`}>
                {label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
