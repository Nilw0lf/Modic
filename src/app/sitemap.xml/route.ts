import { sitemapIndexUrls, xmlSitemapResponse } from "@/lib/seo/sitemap";

export const dynamic = "force-static";

export function GET() {
  return xmlSitemapResponse("sitemapindex", sitemapIndexUrls());
}
