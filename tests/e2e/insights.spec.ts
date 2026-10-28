import { test, expect } from "@playwright/test";

test("Insights library filters, searches, resets, and opens an article", async ({
  page,
}) => {
  await page.goto("/insights");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Make sense",
  );
  await expect(page.locator(".insight-directory .insight-card")).toHaveCount(
    62,
  );
  await page.getByRole("button", { name: "Learning", exact: true }).click();
  await expect(page.locator(".insight-directory .insight-card")).toHaveCount(2);
  await page.getByRole("button", { name: "All insights", exact: true }).click();
  await page
    .getByRole("searchbox", { name: "Search Insights" })
    .fill("unmatchable-query");
  await expect(page.getByRole("status")).toHaveText("0 articles");
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".insight-directory .insight-card")).toHaveCount(
    62,
  );
  await page
    .getByRole("searchbox", { name: "Search Insights" })
    .fill("voice scams");
  await page.locator(".insight-directory .insight-card h3 a").click();
  await expect(page).toHaveURL(
    /\/insights\/ai-voice-scams-verify-before-you-trust$/,
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

for (const slug of [
  "doppler-effect-frequency-vs-intensity",
  "ohms-law-vs-kirchhoffs-laws",
  "island-biogeography-vs-metapopulations",
  "binary-search-bloom-filter-consistent-hashing",
  "sampling-bias-publication-bias-ecological-fallacy",
  "bertrands-paradox-random-chords-explained",
  "spaced-practice-chunking-dual-coding-study-plan",
  "cognitive-dissonance-reactance-choice-overload-explained",
  "cheap-talk-bayesian-persuasion-correlated-equilibrium",
  "tax-incidence-monopsony-who-really-pays",
  "put-call-parity-covered-interest-parity-explained",
  "newsvendor-vs-economic-order-quantity-inventory",
  "opinion-dynamics-consensus-degroot-bounded-confidence",
  "twin-earth-brain-in-vat-goodman-knowledge",
  "bank-runs-liquidity-mismatch-drawdown-insurance",
  "confidence-intervals-vs-statistical-power",
  "bootstrap-resampling-anscombe-quartet-data-analysis",
  "misinformation-memory-if-then-plans",
  "debt-snowball-vs-avalanche-amortization",
  "efficient-frontier-correlation-diversification",
  "optical-illusions-context-size-brightness",
  "dutch-vs-all-pay-auctions-screening",
  "gettier-marys-room-chinese-room-knowledge",
  "dijkstra-vs-a-star-search-explained",
  "paradox-of-enrichment-more-resources-stability",
  "robert-zajonc-explained-beyond-mere-exposure",
  "social-facilitation-audience-performance-zajonc",
  "affective-priming-vs-mere-exposure-liking-recognition",
  "pluralistic-ignorance-abilene-paradox-team-decisions",
  "functional-fixedness-einstellung-effect-problem-solving",
  "shapley-value-banzhaf-voting-power-explained",
  "comparative-advantage-explained-opportunity-cost",
  "pagerank-preferential-attachment-popularity",
  "parrondos-paradox-two-losing-games",
  "real-options-minimax-regret-value-of-waiting",

  "correlation-vs-causation-confounding-natural-experiments",
  "p-values-multiple-testing-false-discovery-rate",
  "natural-selection-vs-genetic-drift-explained",
  "feedback-loops-delay-overcorrection",
  "interleaving-generation-cognitive-load-study-guide",
  "brier-score-calibration-probability-forecasts",
  "critical-path-method-project-bottlenecks",
  "will-ai-replace-my-job-task-audit",
  "prediction-market-probabilities-explained",
  "subscription-traps-defaults-and-cancellation",
  "compound-interest-explained-formula-fees-inflation",
  "sunk-cost-fallacy-examples-relationships-projects",
  "confirmation-bias-examples-how-to-avoid",
  "portfolio-diversification-explained-correlation-rebalancing",
  "naval-ravikant-wealth-specific-knowledge-leverage",
  "stoicism-explained-dichotomy-of-control",
  "hedonic-treadmill-why-success-feels-normal",
  "prisoners-dilemma-explained-cooperation-real-examples",
  "occams-razor-meaning-examples-not-always-simplest",
  "trolley-problem-explained-ethics-no-single-solution",
]) {
  test(`${slug}: navigable, sourced, readable in both themes`, async ({
    page,
  }) => {
    await page.goto(`/insights/${slug}`);
    const contents = page.getByRole("navigation", { name: "Article contents" });
    for (const href of await contents
      .locator("a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")!)))
      await expect(page.locator(href)).toHaveCount(1);
    await contents.locator('a[href="#worked-example"]').click();
    await expect(page.locator("#worked-example")).toBeInViewport();
    await expect(page.locator(".insight-worked-steps li")).toHaveCount(3);
    await expect(page.locator(".insight-sources li")).toHaveCount(2);
    await expect(page.locator(".insight-experiment-link")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const deeper = page.locator(".insight-deeper summary");
    if (await deeper.count()) {
      await deeper.focus();
      await deeper.press("Enter");
      await expect(page.locator(".insight-deeper")).toHaveAttribute("open", "");
    }
    await page.evaluate(() => {
      document.documentElement.dataset.theme = "dark";
    });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const schema = JSON.parse(
      (await page
        .locator('script[type="application/ld+json"]')
        .first()
        .textContent()) ?? "[]",
    );
    expect(schema[0]["@type"]).toBe("BlogPosting");
    await page.locator(".insight-experiment-link").first().click();
    await expect(page).toHaveURL(/\/effects\//);
  });
}

test("article text and links are present without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/insights/ai-energy-demand-jevons-paradox");
  await expect(
    page.getByRole("heading", { name: "Do the two-number calculation first" }),
  ).toBeVisible();
  await expect(
    page.locator('article a[href="/effects/jevons-paradox"]'),
  ).toHaveCount(2);
  await page.goto("/insights");
  await expect(page.locator(".insight-directory .insight-card")).toHaveCount(
    62,
  );
  await context.close();
});

test("unknown articles return 404", async ({ page }) => {
  const response = await page.goto("/insights/not-a-real-article");
  expect(response?.status()).toBe(404);
});
