import { sitemapGroups, xmlSitemapResponse } from "@/lib/seo/sitemap";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return sitemapGroups().map(({ id }) => ({ file: `${id}.xml` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const group = sitemapGroups().find((item) => `${item.id}.xml` === file);
  if (!group) return new Response("Not found", { status: 404 });
  return xmlSitemapResponse(
    "urlset",
    group.entries.map((entry) => entry.url),
  );
}
