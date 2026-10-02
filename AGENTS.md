<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Sitemap maintenance

When adding or publishing effects, categories, or thinkers, keep `src/app/sitemap.ts` catalog-generated and run `tests/unit/sitemap.test.ts`. Production URLs must use `https://modic.app`, match page canonicals and robots.txt, be unique and query-free, and stay grouped and sorted. Include live experiments and category/thinker pages associated with live experiments; planned entries appear when published. Do not hand-maintain an XML URL list or invent modification dates. Rebuild and verify the deployed `/sitemap.xml` after catalog releases.
