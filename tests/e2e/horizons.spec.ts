import { test, expect, type Page } from "@playwright/test";
const button = (p: Page, name: string) =>
  p.locator(".horizons-board").getByRole("button", { name, exact: true });
const stat = (p: Page, name: string) =>
  p
    .locator(".horizons-board .simulation-stat")
    .filter({ has: p.locator("dt", { hasText: name }) })
    .locator("dd");
const cases: Record<string, (p: Page) => Promise<void>> = {
  "social-facilitation": async (p) => {
    await button(p, "Simulate 100 attempts").click();
    await expect(stat(p, "Expected accuracy with audience")).toHaveText(
      "88.1%",
    );
    await button(p, "Reverse task instruction").click();
    await expect(stat(p, "Expected accuracy with audience")).toHaveText(
      "11.9%",
    );
  },
  "affective-priming": async (p) => {
    for (let i = 0; i < 9; i++) {
      await p.locator("#pleasantness").fill("2");
      await button(p, "Save rating & continue").click();
    }
    await expect(p.locator(".horizons-board tbody tr")).toHaveCount(3);
    for (const row of await p.locator(".horizons-board tbody tr").all())
      await expect(row).toContainText("2, 2, 2");
  },
  "liking-and-recognition": async (p) => {
    for (let i = 0; i < 8; i++) await button(p, "Next study card").click();
    for (let i = 0; i < 8; i++) {
      const label = await p
          .locator(".horizon-pair svg")
          .first()
          .getAttribute("aria-label"),
        left = Number(label!.split(" ").at(-1)) <= 4;
      await button(p, "Prefer left").click();
      await button(p, left ? "Saw left before" : "Saw right before").click();
      await button(p, "Record both judgments").click();
    }
    await expect(stat(p, "Recognised the studied pattern")).toHaveText("8/8");
  },
  "pluralistic-ignorance": async (p) => {
    await button(p, "Publish anonymous preference poll").click();
    await expect(stat(p, "Actual stipulated support")).toHaveText("25%");
  },
  "abilene-paradox": async (p) => {
    await button(p, "Ask for private preferences first").click();
    await button(p, "Run the meeting").click();
    await expect(p.locator(".horizons-board")).toContainText(
      "cancels the trip",
    );
    await expect(p.locator(".horizons-board tbody tr")).toHaveCount(4);
  },
  "einstellung-effect": async (p) => {
    for (let i = 0; i < 3; i++)
      await button(p, "Rehearse familiar rule").click();
    await button(p, "Fill A").click();
    await button(p, "Pour A → C").click();
    await expect(stat(p, "Moves")).toHaveText("2");
    await expect(stat(p, "Goal")).toHaveText("Ten units measured");
  },
  "functional-fixedness": async (p) => {
    await button(p, "Empty the box").click();
    await button(p, "Fasten box as shelf").click();
    await button(p, "Place beacon on support").click();
    await expect(p.locator('.horizons-board [role="status"]')).toContainText(
      "Solved",
    );
  },
  "gestalt-closure": async (p) => {
    await button(p, "Triangle").click();
    await button(p, "Reveal complete outline").click();
    await expect(p.locator('.horizons-board [role="status"]')).toContainText(
      "Your guess: Triangle",
    );
    await expect(button(p, "Triangle")).toBeDisabled();
  },
  "webers-law": async (p) => {
    await p.locator("#extra-area").fill("4");
    await button(p, "Record noticeable difference").click();
    await button(p, "Reference: small").click();
    await p.locator("#extra-area").fill("4");
    await button(p, "Record noticeable difference").click();
    await expect(p.locator('.horizons-board [role="status"]')).toContainText(
      "20.0%",
    );
    await expect(p.locator('.horizons-board [role="status"]')).toContainText(
      "5.0%",
    );
  },
  "gestalt-proximity": async (p) => {
    await p.locator("#horizontal-gaps").fill("0");
    await p.locator("#vertical-gaps").fill("24");
    await button(p, "Row pairs").click();
    await expect(p.locator('.horizons-board [role="status"]')).toContainText(
      "You reported: Row pairs",
    );
    await expect(p.locator(".horizon-scene circle")).toHaveCount(36);
  },
  "shapley-value": async (p) => {
    await button(p, "Average all joining orders").click();
    const rows = p.locator(".horizons-board tbody tr");
    await expect(rows.nth(0)).toContainText("30.00");
    await expect(rows.nth(1)).toContainText("40.00");
    await expect(rows.nth(2)).toContainText("20.00");
  },
  "banzhaf-power-index": async (p) => {
    await button(p, "B: 3 votes").click();
    await expect(stat(p, "Decision")).toHaveText("Passes");
    await p.locator("#quota").fill("9");
    await expect(stat(p, "Decision")).toHaveText("Fails");
    await expect(p.locator(".horizons-board tbody tr").first()).toContainText(
      "33.3%",
    );
  },
  "credible-commitment": async (p) => {
    await button(p, "Install binding penalty").click();
    await button(p, "Let the entrant decide").click();
    await expect(stat(p, "Your final payoff")).toHaveText("3");
    await expect(stat(p, "Entrant’s predicted action")).toHaveText("Stay out");
  },
  "moral-hazard": async (p) => {
    await p.locator("#coverage").fill("100");
    await button(p, "Skip maintenance").click();
    await expect(stat(p, "Your realised cost")).toHaveText("0.00");
    await expect(p.locator("#coverage")).toBeDisabled();
  },
  "vcg-public-project": async (p) => {
    await p.locator("#true-benefit").fill("5");
    await button(p, "Run public-project mechanism").click();
    await expect(stat(p, "Your true utility")).toHaveText("-10.00");
    await button(p, "Report truthfully").click();
    await button(p, "Run public-project mechanism").click();
    await expect(stat(p, "Project")).toHaveText("Do not build");
  },
  "comparative-advantage": async (p) => {
    await button(p, "Propose exchange").click();
    await expect(p.locator('.horizons-board [role="status"]')).toContainText(
      "Both can accept",
    );
    await expect(p.locator(".horizons-board tbody").last()).toContainText(
      "6.50",
    );
  },
  "pigouvian-tax": async (p) => {
    await p.locator("#pollution-tax").fill("20");
    await expect(stat(p, "Quantity")).toHaveText("60.00");
    await expect(stat(p, "Social welfare")).toHaveText("1800.00");
  },
  "coase-bargaining": async (p) => {
    await button(p, "Test voluntary bargain").click();
    await expect(stat(p, "Combined payoff")).toHaveText("-6.00");
    await p.locator("#transaction-cost").fill("5");
    await button(p, "Test voluntary bargain").click();
    await expect(stat(p, "Noise")).toHaveText("Continues");
    await button(p, "Neighbour has quiet right").click();
    await button(p, "Test voluntary bargain").click();
    await expect(stat(p, "Noise")).toHaveText("Eliminated");
  },
  "hotelling-rule": async (p) => {
    await p.locator("#extract-now").fill("0");
    await expect(stat(p, "Present value of receipts")).toHaveText("100.00");
    await p.locator("#future-price").fill("12");
    await expect(stat(p, "Present value of receipts")).toHaveText("109.09");
  },
  "baumol-cost-disease": async (p) => {
    await p.locator("#service-growth").fill("5");
    await expect(stat(p, "Service unit labour cost")).toHaveText("40.00");
    await expect(stat(p, "Manufactured unit labour cost")).toHaveText("10.00");
  },
  "parrondos-paradox": async (p) => {
    await button(p, "Mix A/B at random").click();
    await button(p, "Run 300 rounds").click();
    expect(
      Number(await stat(p, "Stationary expected drift per round").innerText()),
    ).toBeGreaterThan(0);
  },
  pagerank: async (p) => {
    await button(p, "A → D").click();
    await expect(stat(p, "Total rank")).toHaveText("1.000");
    await p.locator("#damping").fill("0");
    for (const row of await p.locator(".horizons-board tbody tr").all())
      await expect(row).toContainText("25.0%");
  },
  "preferential-attachment": async (p) => {
    await p.locator("#network-size").fill("20");
    await expect(stat(p, "Edges")).toHaveText("19");
    await button(p, "Choose uniformly").click();
    await expect(stat(p, "Edges")).toHaveText("19");
  },
  "condorcet-jury-theorem": async (p) => {
    await p.locator("#jurors").fill("21");
    await p.locator("#shared-error").fill("100");
    await expect(stat(p, "Majority correctness probability")).toHaveText(
      "60.0%",
    );
    await button(p, "Reveal one jury vote").click();
    await expect(p.locator(".horizon-votes span")).toHaveCount(21);
  },
  "hamming-code": async (p) => {
    await p
      .getByRole("button", { name: "Flip transmission bit 1", exact: true })
      .click();
    await p
      .getByRole("button", { name: "Flip transmission bit 2", exact: true })
      .click();
    await button(p, "Decode received bits").click();
    await expect(stat(p, "Syndrome")).toHaveText("3");
    await expect(stat(p, "Match")).toHaveText("No");
  },
  "marginal-value-theorem": async (p) => {
    await button(p, "Harvest for one time unit").click();
    await button(p, "Harvest for one time unit").click();
    await button(p, "Leave patch & travel").click();
    await expect(stat(p, "Completed patches")).toHaveText("1");
    await expect(stat(p, "Completed-cycle reward / time")).toHaveText("1.32");
  },
  "minimax-regret": async (p) => {
    await button(p, "Minimax regret").click();
    await button(p, "Choose Hall").click();
    await button(p, "Commit venue").click();
    await button(p, "Inspect rain outcome").click();
    await expect(stat(p, "Your payoff")).toHaveText("3");
    await expect(stat(p, "Hindsight regret")).toHaveText("1");
  },
  "real-options": async (p) => {
    await p.locator("#waiting-fee").fill("20");
    await expect(stat(p, "Expected NPV: wait")).toHaveText("2.73");
    await button(p, "Pay to wait").click();
    await button(p, "Commit & reveal demand").click();
    await expect(p.locator("#waiting-fee")).toBeDisabled();
    await expect(stat(p, "Realised discounted payoff")).toBeVisible();
  },
  "jensens-inequality": async (p) => {
    await expect(stat(p, "Mean of function values")).toHaveText("34.00");
    await button(p, "Linear: x").click();
    await expect(stat(p, "Mean of function values")).toHaveText("5.00");
    await expect(stat(p, "Difference")).toHaveText("0.00");
  },
  "simulated-annealing": async (p) => {
    await button(p, "Propose right step").click();
    await expect(stat(p, "Current position")).toHaveText("4");
    await expect(stat(p, "Proposals")).toHaveText("1");
    await expect(p.locator('.horizons-board [role="status"]')).toContainText(
      "Rejected",
    );
  },
};
for (const [slug, play] of Object.entries(cases))
  test(`${slug}: meaningful interaction, reset and readable notes`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/effects/" + slug);
    const board = page.locator(".horizons-board");
    await expect(board).toBeVisible();
    const original = await board.innerText();
    await play(page);
    await expect(page.locator(".reading-scenario li")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Reset", exact: true }).click();
    await expect(board).toHaveText(original, { useInnerText: true });
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
