import { test, expect, type Page } from "@playwright/test";
const board = (p: Page) => p.locator(".mosaic-board");
const button = (p: Page, name: string) =>
  board(p).getByRole("button", { name, exact: true });
const stat = (p: Page, name: string) =>
  board(p)
    .locator(".simulation-stat")
    .filter({ has: p.locator("dt", { hasText: name }) })
    .locator("dd");
const cases: Record<string, (p: Page) => Promise<void>> = {
  "flanker-effect": async (p) => {
    for (let i = 0; i < 10; i++) {
      const a = await p.locator(".mosaic-arrows").getAttribute("aria-label");
      await button(
        p,
        a!.endsWith("right") ? "Middle points right" : "Middle points left",
      ).click();
      await button(p, "Next arrow card").click();
    }
    await expect(stat(p, "Matching flankers")).toHaveText("5/5 correct");
    await expect(stat(p, "Conflicting flankers")).toHaveText("5/5 correct");
  },
  "ebbinghaus-illusion": async (p) => {
    await p.locator("#central-radius").fill("24");
    await button(p, "Record match & remove surrounds").click();
    await expect(stat(p, "Physical radius difference")).toHaveText("4");
  },
  "muller-lyer-illusion": async (p) => {
    await p.locator("#shaft-length").fill("260");
    await button(p, "Record match & hide fins").click();
    await expect(stat(p, "Physical difference")).toHaveText("20 units");
  },
  "simultaneous-contrast": async (p) => {
    await p.locator("#grey-level").fill("140");
    await button(p, "Record match & equalise surrounds").click();
    await expect(stat(p, "Channel difference")).toHaveText("12");
  },
  "figure-ground": async (p) => {
    await button(p, "Faces").click();
    await expect(board(p).getByRole("status")).toContainText(
      "two opposing profiles",
    );
  },
  "misinformation-effect": async (p) => {
    await button(p, "Hide the depot scene").click();
    await button(p, "Continue to recall").click();
    await p.getByLabel("Van colour recall").selectOption("Blue");
    await p.getByLabel("Van count recall").fill("3");
    await button(p, "Compare with original scene").click();
    await expect(stat(p, "Exact match")).toHaveText("Yes");
  },
  "false-consensus-effect": async (p) => {
    await button(p, "Reveal the fictional panel").click();
    await expect(stat(p, "Panel sharing your preference")).toHaveText(
      "4/12 (33.3%)",
    );
  },
  "fundamental-attribution-error": async (p) => {
    await p.locator("#initial-ability").fill("5");
    await button(p, "Reveal role assignment").click();
    await p.locator("#revised-ability").fill("2");
    await button(p, "Record rating comparison").click();
    await expect(stat(p, "Rating change")).toHaveText("-3");
  },
  "transactive-memory": async (p) => {
    await button(p, "Hide directory & route questions").click();
    for (const a of ["Ari", "Ari", "Bea", "Bea", "Chen", "Chen"])
      await button(p, a).click();
    await expect(stat(p, "Questions routed to the listed expert")).toHaveText(
      "6/6",
    );
  },
  "implementation-intentions": async (p) => {
    await p
      .getByLabel("Action for New message")
      .selectOption("Batch message for later");
    await button(p, "Run the six event cards").click();
    await expect(board(p).locator("tbody tr")).toHaveCount(6);
    await expect(board(p).locator("tbody tr").nth(1)).toContainText(
      "Batch message for later",
    );
  },
  "confidence-intervals": async (p) => {
    await button(p, "Reveal fixed parameter").click();
    await expect(stat(p, "Fixed true mean")).toHaveText("0.00");
    await p.locator("#ci-size").fill("100");
    await expect(stat(p, "Interval width")).toHaveText("0.39");
  },
  "statistical-power": async (p) => {
    await p.locator("#true-effect").fill("0");
    await expect(stat(p, "Expected rejection probability")).toHaveText("5.0%");
    await expect(p.locator(".mosaic-study-dots span")).toHaveCount(100);
  },
  "sequential-probability-ratio-test": async (p) => {
    await button(p, "Observe one flip").click();
    await expect(stat(p, "Observed flips")).toHaveText("1");
    for (let i = 0; i < 20; i++) {
      const b = button(p, "Observe up to ten flips");
      if (await b.isDisabled()) break;
      await b.click();
    }
    await expect(stat(p, "Decision")).not.toHaveText("Continue sampling");
  },
  "bootstrap-resampling": async (p) => {
    await button(p, "Inspect next resample").click();
    await button(p, "Omit the largest observed value").click();
    await expect(stat(p, "Observed sample mean")).toHaveText("3.20");
    await expect(p.locator(".mosaic-coins span")).toHaveCount(5);
  },
  "anscombes-quartet": async (p) => {
    await button(p, "Dataset 4").click();
    await button(p, "Omit the point with largest x").click();
    await expect(stat(p, "OLS slope")).toHaveText("Undefined: no x variation");
    await button(p, "Restore all points").click();
    await expect(stat(p, "Included observations")).toHaveText("11");
  },
  "loan-amortization": async (p) => {
    await p.locator("#loan-rate").fill("0");
    await p.locator("#loan-months").fill("12");
    await expect(stat(p, "Total interest")).toHaveText("0.00");
    await button(p, "Inspect next repayment year").click();
    await expect(stat(p, "Balance at inspected month")).toHaveText("0.00");
  },
  "debt-snowball-avalanche": async (p) => {
    await button(p, "Pay one month").click();
    await expect(stat(p, "Month paid")).toHaveText("1");
    await button(p, "Compare complete plans").click();
    await expect(
      board(p).getByRole("region", { name: "Modelled complete-plan results" }),
    ).toBeVisible();
  },
  "bond-convexity": async (p) => {
    await p.locator("#yield-shift").fill("0");
    await expect(stat(p, "Exact shifted price")).toHaveText("100.00");
    await expect(stat(p, "Second-order approximation")).toHaveText("100.00");
  },
  "dividend-irrelevance": async (p) => {
    await p.locator("#dividend-tax").fill("20");
    await expect(stat(p, "Total share value plus cash")).toHaveText("9.60");
    await button(p, "Keep cash").click();
    await expect(stat(p, "Total share value plus cash")).toHaveText("9.60");
  },
  "efficient-frontier": async (p) => {
    await p.locator("#correlation").fill("1");
    await p.locator("#asset-weight").fill("30");
    await expect(stat(p, "Portfolio standard deviation")).toHaveText("13.00%");
    await button(p, "Show minimum-variance portfolio").click();
    await expect(board(p).locator("svg circle")).toHaveCount(2);
  },
  "dutch-auction": async (p) => {
    for (let i = 0; i < 9; i++) await button(p, "Lower clock by 5").click();
    await button(p, "Accept price").click();
    await expect(board(p)).toContainText("Your profit: 25");
  },
  "all-pay-auction": async (p) => {
    await p.getByLabel("Your bid").fill("0");
    await button(p, "Submit all-pay bid").click();
    await expect(stat(p, "Your net payoff")).toHaveText("0");
    await expect(button(p, "Submit all-pay bid")).toBeDisabled();
  },
  "common-knowledge": async (p) => {
    for (let i = 0; i < 3; i++) await button(p, "Hear next round").click();
    await expect(board(p)).toContainText("Round 3: A, B, C can deduce");
    await expect(button(p, "Hear next round")).toBeDisabled();
  },
  "screening-contracts": async (p) => {
    await p.getByLabel("Quality 2 price").fill("14");
    await expect(stat(p, "Total seller profit")).toHaveText("6");
    await expect(stat(p, "Different contracts chosen")).toHaveText("No");
  },
  "tiebout-sorting": async (p) => {
    await p.getByLabel("Cost per household move").fill("6");
    await board(p)
      .getByRole("button", { name: "Q1 · benefit after tax 2", exact: true })
      .click();
    await button(p, "Swap selected households").click();
    await expect(stat(p, "Benefits after taxes")).toHaveText("28");
    await expect(stat(p, "Net after moves")).toHaveText("16");
  },
  "le-chatelier-principle": async (p) => {
    await button(p, "Add 10 A").click();
    await expect(stat(p, "Net direction")).toHaveText("A → B");
    await button(p, "Equilibrate mixture").click();
    await expect(stat(p, "Total A + B")).toHaveText("110.0");
    await expect(stat(p, "Net direction")).toHaveText("At equilibrium");
  },
  "law-of-the-minimum": async (p) => {
    for (let i = 0; i < 4; i++) await button(p, "Add Nitrogen").click();
    await button(p, "Add Phosphorus").click();
    await expect(stat(p, "Yield index")).toHaveText("70");
    await expect(stat(p, "Target")).toHaveText("Reached!");
  },
  "ice-albedo-feedback": async (p) => {
    await button(p, "Advance 50 thermal steps").click();
    await expect(stat(p, "Steps")).toHaveText("50");
    await button(p, "Initial state: Cold").click();
    await expect(stat(p, "Steps")).toHaveText("0");
    await expect(stat(p, "Temperature °C")).toHaveText("16.9");
  },
  synchronization: async (p) => {
    await p.getByLabel("Coupling strength K").fill("0.5");
    await button(p, "Advance one time unit").click();
    await expect(stat(p, "Time")).toHaveText("1.0");
    await expect(stat(p, "Locking possible")).toHaveText("Yes, asymptotically");
  },
  "paradox-of-enrichment": async (p) => {
    await p.getByLabel("Prey carrying capacity K").fill("6");
    await button(p, "Run 50 time units").click();
    await expect(stat(p, "Time simulated")).toHaveText("50");
    await expect(stat(p, "Last-quarter prey minimum")).not.toHaveText("0.700");
  },
  "dijkstras-algorithm": async (p) => {
    for (let i = 0; i < 5; i++) await button(p, "Settle next node").click();
    await expect(board(p)).toContainText("E is settled at cost 7");
    await expect(button(p, "Settle next node")).toBeDisabled();
  },
  "a-star-search": async (p) => {
    await button(p, "Find route").click();
    await expect(stat(p, "Result")).toHaveText("Goal found");
    await expect(stat(p, "Path length")).not.toHaveText("—");
    await board(p).getByRole("button", { name: "Cell 1", exact: true }).click();
    await expect(stat(p, "Expanded cells")).toHaveText("0");
  },
  "beladys-anomaly": async (p) => {
    await button(p, "Replay all requests").click();
    await expect(stat(p, "3-slot faults")).toHaveText("9");
    await expect(stat(p, "4-slot faults")).toHaveText("10");
    await button(p, "Policy: FIFO").click();
    await expect(stat(p, "Requests processed")).toHaveText("0");
  },
  "no-free-lunch": async (p) => {
    await button(p, "Family: All 16 binary objectives").click();
    await expect(board(p).locator("tbody tr")).toHaveText("2.8001.600");
    await button(p, "Probe next location").click();
    await expect(stat(p, "Probes used")).toHaveText("1");
  },
  gerrymandering: async (p) => {
    await expect(stat(p, "A seats with rows")).toHaveText("4 / 5");
    await button(p, "District map: Rows").click();
    await expect(stat(p, "A seats with columns")).toHaveText("2 / 5");
    await board(p)
      .getByRole("button", { name: "Voter 1: A", exact: true })
      .click();
    await expect(stat(p, "A vote share")).toHaveText("48%");
  },
  "buridans-ass": async (p) => {
    for (let i = 0; i < 3; i++) await button(p, "Wait one turn").click();
    await button(p, "Use a fair tie-breaker").click();
    await expect(stat(p, "Reward available")).toHaveText("7");
    await expect(stat(p, "Selected route")).not.toHaveText("Undecided");
  },
  "marys-room": async (p) => {
    await button(p, "New propositional fact").click();
    await button(p, "Let Mary see red").click();
    await board(p)
      .getByRole("group", {
        name: "Your interpretation after considering the case",
      })
      .getByRole("button", { name: "New ability or acquaintance", exact: true })
      .click();
    await expect(board(p)).toContainText(
      "Current interpretation: New ability or acquaintance",
    );
  },
  "gettier-problem": async (p) => {
    await button(p, "Knowledge").click();
    await button(p, "Inspect the label history").click();
    await board(p)
      .getByRole("group", { name: "Your judgment after the history" })
      .getByRole("button", { name: "Not knowledge", exact: true })
      .click();
    await expect(board(p)).toContainText(
      "Before: Knowledge. After: Not knowledge.",
    );
  },
  "chinese-room": async (p) => {
    for (const v of ["△", "○", "□"]) await button(p, `Output ${v}`).click();
    await expect(stat(p, "Correct rule outputs")).toHaveText("3");
    await button(p, "Behaviour alone does not settle it").click();
    await expect(board(p)).toContainText(
      "Interpretation recorded: Behaviour alone does not settle it",
    );
  },
  "repugnant-conclusion": async (p) => {
    await p.getByLabel("People in World B").fill("10000");
    await p.getByLabel("Well-being per person in B").fill("0.2");
    await expect(board(p)).toContainText("Total evaluation: B ranks above A");
    await button(p, "Average evaluation").click();
    await expect(board(p)).toContainText("Average evaluation: A ranks above B");
  },
};
for (const [slug, play] of Object.entries(cases))
  test(`${slug}: real interaction, exact reset and readable notes`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/effects/" + slug);
    const b = board(page);
    await expect(b).toBeVisible();
    const initial = await b.innerText();
    await play(page);
    await expect(page.locator(".reading-scenario li")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Reset", exact: true }).click();
    await expect(b).toHaveText(initial, { useInnerText: true });
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
