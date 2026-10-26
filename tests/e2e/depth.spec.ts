import { test, expect, type Page } from "@playwright/test";
const button = (p: Page, name: string) =>
  p.locator(".depth-board").getByRole("button", { name, exact: true });
const stat = (p: Page, name: string) =>
  p
    .locator(".depth-board .simulation-stat")
    .filter({ has: p.locator("dt", { hasText: new RegExp(`^${name}$`) }) })
    .locator("dd");
const cases: Record<string, (p: Page) => Promise<void>> = {
  confounding: async (p) => {
    await button(p, "Randomise assignment").click();
    await expect(stat(p, "Raw difference")).toHaveText("10.00");
  },
  "instrumental-variables": async (p) => {
    await p.locator("#stage").fill("0");
    await expect(stat(p, "Wald ratio ΔY / ΔD")).toHaveText("Undefined");
    await p.locator("#stage").fill("40");
    await p.locator("#direct").fill("1");
    await expect(stat(p, "Wald ratio ΔY / ΔD")).toHaveText("4.50");
  },
  "regression-discontinuity": async (p) => {
    await p.locator("#bandwidth").fill("1");
    await expect(stat(p, "Local mean contrast")).toHaveText("11.00");
    await button(p, "Toggle another policy at cutoff").click();
    await expect(stat(p, "Local mean contrast")).toHaveText("16.00");
  },
  "difference-in-differences": async (p) => {
    await p.locator("#trend").fill("3");
    await expect(stat(p, "Difference in differences")).toHaveText("11.00");
    await button(p, "Show no-policy counterfactual").click();
    await expect(p.locator(".depth-chart figcaption")).toContainText(
      "without policy",
    );
  },
  "false-discovery-rate": async (p) => {
    await button(p, "Benjamini–Hochberg").click();
    await button(p, "Reveal synthetic truth").click();
    await expect(stat(p, "False discoveries")).not.toHaveText("Hidden");
    await expect(p.locator(".depth-mosaic>div")).toHaveCount(30);
  },
  "natural-selection": async (p) => {
    await button(p, "Ten generations").click();
    await expect(stat(p, "Generation")).toHaveText("10");
    await expect(stat(p, "Allele A")).toHaveText("86.1%");
    await button(p, "Reverse environment").click();
    await button(p, "Ten generations").click();
    await expect(stat(p, "Allele A")).toHaveText("50.0%");
  },
  "genetic-drift": async (p) => {
    await button(p, "Sample next generation").click();
    await expect(stat(p, "Generation")).toHaveText("1");
    await expect(p.locator(".depth-genes span")).toHaveCount(30);
    await p.locator("#copies").fill("100");
    await expect(stat(p, "Generation")).toHaveText("0");
    await expect(p.locator(".depth-genes span")).toHaveCount(100);
  },
  "hardy-weinberg": async (p) => {
    await button(p, "All homozygotes").click();
    await expect(stat(p, "Allele A from genotypes")).toHaveText("50.0%");
    await expect(stat(p, "Heterozygotes")).toHaveText("0.0%");
  },
  "mutation-selection-balance": async (p) => {
    await button(p, "Run 100 generations").click();
    await expect(stat(p, "Generations")).toHaveText("100");
    await expect(stat(p, "Current q")).not.toHaveText("50.0%");
  },
  "competitive-exclusion": async (p) => {
    await button(p, "Unequal competitors").click();
    await button(p, "Advance 20 time units").click();
    await expect(stat(p, "Time")).toHaveText("20");
    await expect(stat(p, "Population A")).not.toHaveText("40.00");
  },
  "revenue-equivalence": async (p) => {
    await button(p, "Compare 500 auctions").click();
    await expect(stat(p, "Batch first-price mean")).toBeVisible();
    await expect(stat(p, "Batch second-price mean")).toBeVisible();
  },
  "strategic-voting": async (p) => {
    await button(p, "B ≻ A ≻ C").click();
    await button(p, "Count these ballots").click();
    await expect(stat(p, "Winner")).toHaveText("B");
  },
  "costly-signaling": async (p) => {
    await p.locator("#education").fill("10");
    await expect(stat(p, "Pattern")).toHaveText("Pooling");
    await p.locator("#education").fill("15");
    await expect(stat(p, "Pattern")).toHaveText("Separating");
  },
  "hold-up-problem": async (p) => {
    await button(p, "Protection: 50% retained").click();
    await button(p, "Commit investment").click();
    await expect(stat(p, "Your net payoff")).toHaveText("10.00");
    await expect(p.locator("#investment")).toBeDisabled();
  },
  "alternating-offer-bargaining": async (p) => {
    await button(p, "Make offer").click();
    await expect(stat(p, "Pie remaining")).toHaveText("80.00");
    await expect(button(p, "Make offer")).toBeDisabled();
    await button(p, "Accept bot counteroffer").click();
    await expect(p.locator('.depth-board [role="status"]')).toContainText(
      "35.56",
    );
  },
  resonance: async (p) => {
    await p.locator("#damping").fill("1");
    await expect(stat(p, "Amplitude at chosen frequency")).toHaveText("1.00");
    await button(p, "Inspect steady oscillation").click();
    await expect(p.locator(".depth-chart figcaption")).toContainText(
      "Steady displacement",
    );
  },
  "feedback-delay": async (p) => {
    await button(p, "Advance five steps").click();
    await expect(stat(p, "Updates")).toHaveText("5");
    await p.locator("#delay").fill("0");
    await button(p, "Advance five steps").click();
    await expect(stat(p, "Current state")).toHaveText("99.98");
  },
  "critical-path": async (p) => {
    await button(p, "Shorten task C").click();
    await expect(stat(p, "Project duration")).toHaveText("10 days");
    await button(p, "Shorten task D").click();
    await expect(stat(p, "Project duration")).toHaveText("9 days");
  },
  brachistochrone: async (p) => {
    for (let i = 0; i < 11; i++) await button(p, "Advance 0.1 second").click();
    await expect(stat(p, "Elapsed")).toHaveText("1.10 s");
    await expect(stat(p, "Cycloid arrival")).toHaveText("1.00 s");
  },
  "carnot-limit": async (p) => {
    await p.locator("#work").fill("60");
    await button(p, "Test proposed cycle").click();
    await expect(p.locator('.depth-board [role="status"]')).toContainText(
      "Rejected",
    );
    await p.locator("#work").fill("40");
    await button(p, "Test proposed cycle").click();
    await expect(stat(p, "Admissible cycles")).toHaveText("1");
  },
  "central-limit-theorem": async (p) => {
    await p.locator("#sample-size").fill("25");
    await expect(stat(p, "Theoretical SD")).toHaveText("0.20");
    await button(p, "Collect 200 more means").click();
    await expect(stat(p, "Sample means")).toHaveText("400");
  },
  "law-of-small-numbers": async (p) => {
    await button(p, "Run the groups").click();
    await expect(stat(p, "Extreme 5-flip groups")).toBeVisible();
    await expect(stat(p, "Extreme 100-flip groups")).toBeVisible();
  },
  "regression-dilution": async (p) => {
    await expect(stat(p, "Fitted slope")).toHaveText("2.00");
    await p.locator("#error").fill("15");
    await expect(stat(p, "Fitted slope")).not.toHaveText("2.00");
  },
  "precision-recall": async (p) => {
    await p.locator("#retrieved").fill("10");
    await button(p, "Reveal relevance labels").click();
    await expect(stat(p, "Precision")).toHaveText("50.0%");
    await expect(stat(p, "Recall")).toHaveText("83.3%");
  },
  "brier-score": async (p) => {
    await button(p, "Use generating probabilities").click();
    await button(p, "Commit forecasts & reveal").click();
    await expect(p.locator("#forecast-0")).toBeDisabled();
    await expect(stat(p, "Your Brier score")).toHaveText(
      await stat(p, "Generator's realised score").innerText(),
    );
  },
  interleaving: async (p) => {
    for (let i = 0; i < 12; i++) {
      const index = [0, 3, 1, 4, 2, 5, 6, 7, 8, 9, 10, 11][i],
        a = index < 3 || [6, 8, 11].includes(index),
        w = 3 + (index % 3),
        h = 2 + (index % 4);
      await p.locator("#math-answer").fill(String(a ? w * h : 2 * (w + h)));
      await button(p, "Check answer").click();
      await button(p, "Next problem").click();
    }
    await expect(p.locator(".depth-callout")).toHaveText(
      "Mixed test complete: 6/6 correct.",
    );
  },
  "generation-effect": async (p) => {
    for (const word of ["night", "honey", "leaf", "heat"]) {
      await p.locator("#generated-word").fill(word);
      await button(p, "Reveal the pair").click();
      await button(p, "Next pair").click();
    }
    for (const [cue, target] of [
      ["moon", "night"],
      ["bee", "honey"],
      ["tree", "leaf"],
      ["fire", "heat"],
    ])
      await p
        .getByRole("textbox", { name: `Recall ${cue}`, exact: true })
        .fill(target);
    await button(p, "Check recalled words").click();
    await expect(stat(p, "Exact target matches")).toHaveText("4/4");
  },
  "cognitive-load": async (p) => {
    const sequence = (await p.locator(".depth-callout").innerText()).split(
      " → ",
    );
    await button(p, "Arithmetic interference: off").click();
    await button(p, "Hide sequence & recall").click();
    await p.getByRole("spinbutton", { name: "Arithmetic answer" }).fill("15");
    for (const n of sequence)
      await p
        .locator(".depth-keypad")
        .getByRole("button", { name: n, exact: true })
        .click();
    await expect(p.locator(".depth-board")).toContainText("Exact match.");
  },
  satisficing: async (p) => {
    await button(p, "Pay 2 & inspect first").click();
    await button(p, "Accept current offer").click();
    await expect(stat(p, "Net payoff")).not.toHaveText("Not accepted");
    await expect(button(p, "Pay 2 & inspect next")).toBeDisabled();
  },
  "peak-shift": async (p) => {
    await p.locator("#inhibition").fill("0");
    await expect(stat(p, "Response peak")).toHaveText("60");
    await p.locator("#inhibition").fill("1");
    await expect(stat(p, "Response peak")).not.toHaveText("60");
  },
};
for (const [slug, play] of Object.entries(cases))
  test(`${slug}: interaction, reset, reading and themes`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`/effects/${slug}`);
    const board = page.locator(".depth-board");
    await expect(board).toBeVisible();
    const initial = await board.innerText();
    await play(page);
    await expect(page.locator(".reading-scenario li")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Reset", exact: true }).click();
    await expect(board).toHaveText(initial, { useInnerText: true });
    await page.evaluate(
      () => (document.documentElement.dataset.theme = "dark"),
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
