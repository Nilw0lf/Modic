# Modic

An interactive field guide to how the world behaves. Built as an editorial publication, with experiments embedded near the beginning of an idea rather than hidden beneath an article.

The collection includes 44 concepts, seven categories, 17 thinkers, local search, and 36 interactive experiments. Eight further experiments are explicitly **planned**. The original six experiments are joined by Monty Hall, Birthday Paradox, Law of Large Numbers, Compound Growth, Diminishing Returns, Opportunity Cost, Sunk Cost Fallacy, Anchoring Bias, Confirmation Bias, Present Bias, Forgetting Curve, Tragedy of the Commons, Prisoner’s Dilemma, Schelling’s Segregation Model, and Butterfly Effect. Each new concept includes model assumptions, a practical example and a reading reference.

The homepage provides Start learning and Surprise me actions. `/learn` contains the original six-stop path, six five-experiment routes and a 46-term searchable glossary. All live experiments have previous/next learning navigation. The header offers a saved light/dark choice, defaulting to light. The site has no accounts, analytics, database, or external search service.

## Run locally

Use Node.js 20.9+ (tested with Node 24) and pnpm 11.19.0. Install pnpm through Corepack or your preferred package manager if needed.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000. Fonts are bundled through the `geist` package and loaded with `next/font/local`; builds do not contact Google Fonts.

For the production version:

```sh
pnpm build
pnpm start
```

Copy `.env.example` to `.env.local` if you need a custom canonical origin. Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS origin **before building for deployment**. The local fallback is `http://localhost:3000`.

## Stack and design choices

- Next.js 16 App Router, React 19, strict TypeScript.
- Tailwind CSS 4 with shared CSS variables and an editorial stylesheet.
- D3's `d3-scale` and `d3-array` packages; no full D3 bundle.
- SVG charts with separate layouts for small and large screens.
- Motion for a short resample transition, respecting reduced motion.
- KaTeX for server-rendered mathematical notation.
- Zod for catalog, editorial content, and simulation validation.
- Vitest and Playwright for mathematical, data, navigation, and interaction tests.
- Native labeled range inputs, buttons, and a disclosure menu. This MVP does not need a shadcn/Base UI overlay, selection, or dialog primitive; no component library is installed solely to wrap native controls.

The palette is neutral with restrained blue visualization accents. Typography, spacing, and fine borders establish hierarchy. The high-level editorial reference was [probability.app](https://probability.app); the design and code are original.

## Architecture

```text
src/
  app/                       Server-rendered routes, metadata, styles
    effects/[slug]/          Shared effect page
    categories/[slug]/       Category relationship views
    thinkers/[slug]/         Automatically grouped thinker views
    explore/                 Searchable collection
    about/
  components/
    layout/                  Header and footer
    effects/                 Headers, cards, articles, search
    simulation/              Shared shell and statistics
    simulations/
      registry.tsx           Lazy simulation registration
      lindy/                 Interactive Lindy presentation
  content/effects/           Editable JSON editorial content
  data/                    # Modic, categories, thinkers
  types/catalog.ts           Zod schemas and inferred domain types
  lib/
    catalog.ts               Queries and referential-integrity checks
    content.ts               Validated article lookup
    metadata.ts              Canonical and Open Graph metadata
    search/filter.ts         Pure local search
    simulations/             Pure math and seeded random generation
tests/
  unit/                      Model, catalog, and search checks
  e2e/                       Desktop and mobile browser flows
```

Pages and editorial rendering are Server Components. Only filtering and simulation interaction require client state. All known entity routes are generated with `generateStaticParams`. Entity titles, descriptions, canonicals, and Open Graph metadata are generated from the catalog; sitemap and robots routes are included. Unknown entities return a real 404.

JSON is the equivalent content-file format used in place of MDX. It keeps prose separate from React while validating available article sections. No arbitrary HTML from content is evaluated. KaTeX renders only a fixed, trusted model formula.

The browser receives the catalog for local filtering. Category and thinker directories are server rendered. Original simulations have individual dynamic imports; the 15 everyday concepts share a lazy-loaded UI module in `components/simulations/everyday`. Their deterministic model functions live in `lib/simulations/everyday.ts`; sourced content, controls and presets live in `data/expansion.ts`.

## Add an effect: Matthew Effect

For an entry without a simulation, only metadata and editorial content are required.

1. Add a record to `src/data/effects.ts`:

```ts
{
  id: "matthew",
  slug: "matthew-effect",
  name: "Matthew Effect",
  shortDescription: "An initial advantage can compound into a larger one.",
  categoryIds: ["complexity", "markets"],
  thinkerRelationships: [],
  status: "planned",
  difficulty: "intuitive",
  relatedEffectIds: ["network", "power-laws"],
}
```

2. Add content under the same **slug** in `src/content/effects/planned.json`:

```json
"matthew-effect": {
  "explanation": ["Write the explanation here."],
  "whyItMatters": ["Describe the practical implication."],
  "limitations": ["Explain where this model fails."]
}
```

For a longer article, create `src/content/effects/matthew-effect.json`, import it in `src/lib/content.ts`, and map its slug in the content registry, as done for Lindy. Supported fields are `whatToNotice`, `explanation`, `whyItMatters`, `examples` (title/text pairs), `limitations`, and `furtherReading`. Only `explanation` is required.

3. Optionally register a simulation using the instructions below and set the effect to `live`.
4. Run tests and build. Update the seed-count assertion in `tests/unit/catalog.test.ts` and browser collection-count assertions when intentionally expanding the seed library.

The effect route, metadata, sitemap entry, search results, category membership, and thinker groupings appear automatically. `relatedEffectIds` are **directed** links: adding an outgoing relationship does not silently alter another article's curated recommendations. Add the reciprocal ID when the relationship should appear both ways.

## Add a category

Add an object with `id`, `slug`, `name`, and `description` to `src/data/categories.ts`. Use its stable ID in effects' `categoryIds` and optionally in thinkers' `areaIds`. The directory, filters, detail page, counts, and sitemap update automatically. IDs and slugs must be unique lowercase hyphenated identifiers.

## Add a thinker and an attribution

Add `id`, `slug`, `name`, `description`, and `areaIds` to `src/data/thinkers.ts`. Then add an independent attribution to an effect:

```ts
{
  id: "matthew-example-thinker",
  thinkerId: "example-thinker",
  relationship: "DISCUSSED",
  editorialStatus: "provisional",
  sources: [],
}
```

Supported relationships: `COINED`, `FORMALIZED`, `DEVELOPED`, `POPULARIZED`, `EXTENDED`, `DISCUSSED`, `CRITIQUED`, `ASSOCIATED_WITH`.

Each attribution has its own ID, source URLs, and editorial status. A thinker page groups effects by the actual relationship type. Be conservative: association, discussion, and popularization do not establish invention. Seed attributions are provisional and need editorial source review before being presented as authoritative historical claims.

## Add a simulation

1. Create a pure module in `src/lib/simulations/` with validated input/output types and deterministic randomness. Keep mathematics out of components.
2. Add unit tests for bounds, deterministic behavior, and properties of the model—not merely snapshots of an implementation.
3. Build a focused client component in `src/components/simulations/<name>/`. Reuse the shell, statistics, styles, and labeled native controls where appropriate. A new effect can have an entirely different chart.
4. Register a dynamic import in `src/components/simulations/registry.tsx`.
5. Set the effect's `simulationType` to that registry key and its status to `live`.
6. Explain the model, uncertainty, assumptions, and limitations in editorial content. Add a keyboard and mobile browser test.

The catalog test verifies that every live effect has a registered simulation and every effect has valid content. A simulation with hundreds of thousands of objects might need Canvas or a worker; the current model does not.

## Lindy model

The model's population median remaining life is:

```text
m = 50 × (age / 50)^strength
remaining life = m × exp(sigma × Z), with Z ~ Normal(0, 1)
```

`sigma` is 0.3, 0.7, or 1.2 for low, medium, or high uncertainty. Mulberry32 and a Box–Muller transform provide reproducible draws. The initial seed is 42; Resample increments it; Reset restores every input and the original seed.

- Age: 5–500 years, UI step 5.
- Strength: 0–2, UI step 0.1. Zero removes age dependence; one sets the population median to observed age.
- Simulated futures: 100–5,000, UI step 100.
- Statistics are empirical sample quantiles, not population values or forecasts.
- The SVG shows 38 ordered representative sample paths. Statistics use **all** samples. Very long paths extend beyond the plotted horizon and have arrow markers.
- Past and future have independently labeled scales. The past is contextual, not a pixel-for-pixel comparison with the future. The future axis keeps a 500-year reference horizon for ordinary comparisons and expands in 250-year increments when needed to include at least 95% of samples. Compare tick labels and numerical statistics when the horizon expands.

This is a pedagogical scale model that **imposes** an age relationship, not a coherent fitted conditional-survival process for a real population. It is neither empirical evidence for Lindy nor a lifespan predictor. It should not be applied indiscriminately to perishable things, rapidly changing environments, or populations selected only for survival.

## Gambler’s Ruin model

`src/lib/simulations/gamblers-ruin.ts` defines pure, validated `GamblerRuinInput`, `SingleLifeResult`, and `ManyLivesResult` interfaces. A win changes wealth to `wealth × (1 + risk × payoff)`; a loss changes it to `wealth × (1 − risk)`. Payoff is **net profit** on the stake. Rounds are independent with fixed parameters.

Ruin occurs at the first wealth value at or below the threshold. The path then freezes at its **actual crossing value**, not zero or the threshold. This is a proportional-risk absorbing-threshold model, distinct from the [classical fixed-stake model](https://mpaldridge.github.io/math2750/S03-gamblers-ruin.html). The threshold must be below starting wealth.

Defaults: 10,000 wealth units, 10% risk per round, 55% win probability, 1× net payoff, 500 rounds, 1,000 lives, and a 1,000-unit threshold. Validated bounds allow 1–5,000 lives, 1–500 rounds, probabilities/risk from 0 to 1, payoff from 0 to 3, wealth from 100 to 1,000,000, and threshold at least 1. These bounds also keep numerical results finite, including maximum consecutive wins. Mean wealth is accumulated online to avoid overflowing a large sum.

One-life mode shows final/maximum wealth, maximum drawdown, and the first ruin round. Many-life mode reports empirical ruin probability, ending median/mean/quartiles, and the fraction finishing above starting wealth. All outcomes enter the statistics; only 24 full paths and up to 101 cross-sectional checkpoints are retained for plotting. The median and percentile band are pointwise summaries, not individual life paths. The symmetric-log wealth scale represents zero while compressing extreme winners. Outlier sample paths may be clipped; the interface discloses this.

`manyLivesSteps` is a deterministic generator consumed synchronously by tests or asynchronously by `runRuinCooperatively`. The UI yields approximately every 8 ms, including during percentile aggregation, and supports cancellation. A local maximum-workload profile (5,000 × 500) measured about 114 ms total and a 4.3 ms largest generator step; timings vary by hardware. This did not justify a Worker. Re-profile before increasing the bounds. Run `node node_modules/vitest/vitest.mjs run tests/unit/ruin-profile.test.ts --reporter=verbose --silent=false` to see timings.

Each life receives a reproducible seed derived from the run seed and its index. Reset restores the initial seed; running again advances it. Edited settings do not silently relabel previous results: they are marked pending until the next run.

Share parameters through `/effects/gamblers-ruin?wealth=10000&risk=0.1&win=0.55&payoff=1&rounds=500&lives=1000&threshold=1000`. URLs use fractional risk/probability even though controls display percentages. Copy experiment link includes all settings but never seeds or outcomes. Malformed, duplicate, out-of-range, or incompatible parameters restore defaults with a visible message. A read-only link field is provided if clipboard access fails.

## Foundation experiments and learning

The four foundation experiments share controls and statistics, but use distinct SVG views: a 1,000-message outcome grid, paired-measurement scatterplot, rank-frequency bars, and a small random network. Pure, Zod-validated models live in `src/lib/simulations/foundations.ts`; all use seeded randomness and bounded workloads.

Base Rate Neglect compares a sampled classifier outcome with exact Bayes probability. Regression to the Mean uses fixed Gaussian abilities and two independent Gaussian measurement errors, selecting a group by its first score. Power Laws allocates 1,000 visits using normalized finite rank weights, with an exact expected top-tenth share. Network Effects samples independent undirected connections among at most 30 members, separating potential pairs from realized connections. Each page explains its assumptions and limitations and links to further reading.

`src/data/learning.ts` defines the ordered learning path and glossary. Every step links to a live effect, and each live effect provides a reflection prompt and previous/next navigation. The glossary searches terms and definitions locally; no account or saved progress is required.

## Discovery and themes

Counts and thinker associations derive from catalog metadata. Surprise me chooses only live entries. Cards have separate title, category, and thinker links (no nested anchors). Relationship-specific language is reserved for verified attribution records; provisional associations remain labeled conservatively.

`experimentType` supports `simulation`, `game`, `calculator`, `thought-experiment`, `visualization`, and `agent-model`; it defaults to `simulation` for existing records. The Explore format selector uses these values. Category filters scroll horizontally on mobile.

The original light identity is preserved. Dark mode follows `prefers-color-scheme`, with the same typography and spacing. Bespoke glyphs use the `glyph-<effect-id>` class and targeted SVG elements for small CSS hover/focus responses. Motion is disabled under `prefers-reduced-motion`; the homepage feature remains an illustration, not a live simulation.

## Testing and formatting

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
pnpm format:check
```

Use `pnpm format` to apply formatting. Type generation occurs during the Next build; run a build before end-to-end tests.

Playwright defaults to installed Microsoft Edge on this Windows workstation. Desktop, 820px tablet, and 390px mobile viewports are tested in Chromium, including light/dark themes, reduced motion, keyboard controls, URL sharing, and invalid input recovery. This is mobile viewport/touch emulation, not an assertion of Safari/iOS engine testing. In CI, install Playwright Chromium and set `PLAYWRIGHT_CHANNEL=chromium`:

```sh
pnpm exec playwright install --with-deps chromium
PLAYWRIGHT_CHANNEL=chromium pnpm test:e2e
```

PowerShell equivalent:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chromium'
pnpm test:e2e
```

The suite starts the production server automatically or reuses a running localhost server outside CI. The explicit Node startup command avoids a nested package-manager shell during server shutdown on Windows. Test artifacts are ignored by Git.

Coverage includes metadata validation and referential integrity, thinker groupings, category filtering, name/description/category/thinker search, invalid inputs, deterministic sampling, age-scaling invariants, uncertainty behavior, homepage navigation, planned effect pages, mobile menu, keyboard sliders, prompts, reset/resample, SEO tags, 404s, and horizontal overflow.

## Accessibility and performance

Semantic headings, labels, fieldsets, buttons, a skip link, visible focus states, keyboard range controls, reduced-motion support, chart title/description, and a live textual statistics summary are included. Small-screen charts use fewer axis ticks and a dedicated viewBox. Visual paths are supplementary to the text statistics. Automated checks are not a full assistive-technology or WCAG audit.

Static content and metadata are rendered on the server. Fonts are self-hosted. D3 imports are narrow and state is local. No global store, database, image pipeline, or large chart framework is needed. Core Web Vitals have not been measured against a public production deployment.

## Deployment

### Recommended: Vercel

1. Push this project to a GitHub repository, including `pnpm-lock.yaml`.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Select the **Next.js** preset and **Node.js 24.x**. Keep the output directory at its framework default. Use `pnpm build` as the build command.
4. Add `ENABLE_EXPERIMENTAL_COREPACK=1` so Vercel uses the `pnpm@11.19.0` version pinned in `package.json`. Leave the install command automatic.
5. Set `NEXT_PUBLIC_SITE_URL` to your production HTTPS origin. If using the assigned Vercel domain, update this after the first deployment and redeploy so canonical URLs and the sitemap use the correct origin.
6. Deploy. To use your own domain, add it in the project's domain settings and follow the DNS instructions.

No database or API keys are required. See [Vercel's Next.js guide](https://vercel.com/docs/frameworks/full-stack/nextjs) and [Corepack configuration](https://vercel.com/docs/builds/configure-a-build#corepack).

Cloudflare Workers is also an option, but requires a separate compatibility and deployment setup. Its current [Next.js guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) recommends vinext, currently in beta. Vercel is the simpler fit for this existing standard Next.js application.

### Other Node hosts

This is a standard Next.js application and can run on Vercel or another Node-compatible host. No hosting account is required for local development, and no public deployment was created by this task.

1. Configure pnpm and Node on the host.
2. Set `NEXT_PUBLIC_SITE_URL` to the real origin.
3. Install with `pnpm install --frozen-lockfile`.
4. Run lint, type checks, tests, and `pnpm build`.
5. Start with `pnpm start`, or let the Next.js hosting integration manage the process.

The default start script binds to localhost for local development. For a container or host that requires binding all interfaces, use `pnpm exec next start --hostname 0.0.0.0 --port 3000` behind the host's HTTPS proxy. Do not use the development server as a production server. Keep the lockfile committed.

## Adding Supabase/PostgreSQL later

The catalog has stable effect, category, thinker, and attribution IDs. Keep public editorial data separate from user-owned state. A future database can add users, bookmarks (`user_id`, `effect_id`), and saved simulations (`user_id`, `effect_id`, versioned inputs, seed) without changing the simulation math or public route structure.

Introduce server-side repository functions at that point; keep secrets off the client. If using Supabase, require authentication and row-level security for user-specific records. The current MVP intentionally has no auth screens or nonfunctional bookmark controls.

The latest expansion adds five Taleb-inspired experiments (Antifragility, Barbell Strategy, Optionality, Skin in the Game, Turkey Problem) and ten strategic-interaction models (Stag Hunt, Chicken, Matching Pennies, Coordination, Public Goods, Ultimatum, Nash Bargaining, Vickrey Auction, Winner’s Curse, Market for Lemons). Four payoff tables support playable rounds and computed pure-equilibrium highlights. Models state their assumptions and distinguish illustrative formulas from the authors’ original research.
