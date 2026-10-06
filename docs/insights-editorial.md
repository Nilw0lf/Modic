# Insights publishing and launch research

Launch date: 7 October 2026. Audience: global English-speaking curious beginners; optional deeper mathematical detail. No invented human bylines, interviews, empirical examples, or keyword volumes.

## Topic selection

The first ten guides address information needs connected to current primary reporting. The searches below are editorial targets, not verified monthly volumes. Current events establish relevance; they do not establish Google search demand. No keyword-volume tool or Search Console query export was available for this launch. Public Google English autocomplete was checked for all ten topic stems on 7 October 2026 and returned relevant suggestions (recorded below). This is a limited search-intent signal, affected by location and suggestion filtering; it does not measure popularity, volume, or a rising trend. Validate impressions and queries in Search Console after indexing, then improve the articles that attract relevant readers. Do not describe all ten as trending or “most searched” without independent evidence.

| Guide                    | Practical search intent                                   | Dated relevance / evidence                                             |
| ------------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------- |
| AI job task audit        | will AI replace my job; AI job exposure                   | ILO empirical review, 1 June 2026                                      |
| AI voice scams           | how to avoid AI voice scams; verify a suspicious call     | Google June 2026 threat advisory; FTC callback guidance                |
| Prediction probabilities | what do prediction market odds mean                       | CFTC March 2026 consultation; original Brier scoring research          |
| AI energy                | AI electricity use; Jevons paradox AI                     | IEA update, 16 April 2026                                              |
| Studying with AI         | how to study with AI; retrieval practice                  | OECD Digital Education Outlook 2026; original testing-effect research  |
| Supply chains            | bullwhip effect example; tariff inventory planning        | WTO March 2026 outlook; MIT university material                        |
| News and risk            | availability bias in news; news misinformation            | Reuters Institute report, 16 June 2026; original availability research |
| El Niño outlook          | El Niño 2026; seasonal forecast probability               | WMO outlook published 3 September 2026                                 |
| Shared AI exposure       | diversification and correlation; cloud concentration risk | IMF analysis, 19 January and 23 July 2026                              |
| Subscriptions            | free trial auto renewal; subscription cancellation        | Pending FTC case record updated 4 May 2026; dark-pattern report        |

Sources are linked beside the relevant contextual claims and in each article's reading list. Most article content is original explanation and practical application; reports are not republished or extensively paraphrased. Forecasts, allegations, model assumptions, and illustrative numbers retain their qualifications. Forecast articles explicitly direct readers to current original updates.

### Public autocomplete snapshot

Checked using Google's public autocomplete endpoint, English language, no signed-in account. Geography was not explicitly controlled and suggestions are transient. Samples:

- `will ai replace` → “will ai replace software engineers”, “will ai replace accountants”
- `ai voice scam` → “ai voice scams”, “ai voice scams news”
- `prediction market` → “prediction market”, “prediction market betting”
- `ai energy consumption` → “ai energy consumption statistics”, “ai energy consumption problem”
- `how to study with ai` → “how to study with ai tools”, “how to study with ai for free”
- `bullwhip effect` → “bullwhip effect in supply chain”, “bullwhip effect meaning”
- `availability bias` → “availability bias meaning”, “availability bias example”
- `el nino 2026` → “el nino 2026”, “el nino 2026 effect on pakistan”
- `diversification correlation` → “diversification benefits correlation”, “portfolio diversification correlation”
- `cancel subscription` → “cancel subscription google”, “cancel subscription spotify”

Articles address the underlying educational questions rather than claiming to answer every platform-specific or country-specific variation.

See [Google's explanation of autocomplete](https://support.google.com/websearch/answer/7368877?hl=en) for the distinction between suggestions, real searches, word patterns, and location/time factors.

## Adding an article

1. Author a distinct `Insight` in `src/content/insights/` and register it in `index.ts`. Set the actual publication date, not the latest build date. Check current-event sources before publishing.
2. Include a practical question, precise mechanism, independent source links, a three-step example, a usable checklist, limitations, and a reflection. Make internal experiment links purposeful and use live catalog slugs.
3. Keep all substantive prose server rendered. The client index receives only card metadata. The article route, related reading, metadata, social image, and `insights` child sitemap use the same collection automatically.
4. Run `tests/unit/insights.test.ts`, `tests/unit/sitemap.test.ts`, `tests/unit/reading.test.ts`, browser Insights checks and representative reading checks, typecheck, lint, and build. Check mobile, tablet, both themes, anchor links, no-JavaScript reading, and unknown-slug 404s.
5. After publishing, verify `/insights`, each new article, `/sitemap.xml`, and every child sitemap on `https://modic.app`. Do not fabricate last-modified dates or use query-bearing canonical URLs.

## Follow-up priorities

Use Search Console to distinguish impressions from clicks and compare actual queries with the intended questions. Improve weak explanations and source currency before adding more pages. Review dated AI, trade, regulatory, and climate claims when their sources change. Google Trends is relative interest rather than absolute volume; record geography and date range whenever citing it. A useful article and sound technical metadata support discovery but do not guarantee rankings or traffic.
