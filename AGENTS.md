<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Sitemap maintenance

When adding or publishing effects, categories, or thinkers, keep `src/lib/seo/sitemap.ts` catalog-generated and run `tests/unit/sitemap.test.ts`. Production URLs must use `https://modic.app`, match page canonicals and robots.txt, be unique and query-free, and stay grouped and sorted. Include live experiments and category/thinker pages associated with live experiments; planned entries appear when published. Keep the `/sitemap.xml` index and `/sitemap/[file]` XML children aligned, automatically split groups at 1,000 URLs, omit empty groups, and keep XML responses `noindex, follow`. Do not hand-maintain an XML URL list or invent modification dates. Rebuild and verify the deployed index and every child sitemap after catalog releases.

## Effect field notes

Every catalog entry needs an individually authored reader guide in `src/content/effects/guides/`, registered in its index. Keep explanations approachable with optional deeper model details. Include a precise definition, causal reasoning, guidance for interpreting the actual experiment, a three-step worked example, a misconception and correction, a useful question and answer, and a reflection prompt. Preserve original model assumptions, limitations, and source links. Use concept names and alternative terminology naturally; do not pad pages with repeated keywords or promise rankings. Do not present invented example numbers as empirical measurements, or teaching curves as forecasts. Add contextual primary or university readings without converting provisional thinker associations into verified authorship claims. Run `tests/unit/reading.test.ts` and representative `tests/e2e/reading.spec.ts` checks after content or layout changes.
