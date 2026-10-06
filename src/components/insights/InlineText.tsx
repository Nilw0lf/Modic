import Link from "next/link";

/** Small author-controlled inline syntax; never renders arbitrary HTML. */
export function InlineText({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (!link) return part;
    const [, label, href] = link;
    return href.startsWith("/") ? (
      <Link key={index} href={href}>
        {label}
      </Link>
    ) : (
      <a key={index} href={href}>
        {label}
      </a>
    );
  });
}
