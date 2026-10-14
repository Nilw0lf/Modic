import { test, expect, type Page } from "@playwright/test";
const slide = async (page: Page, id: string, n: number) =>
  page.locator("#" + id).fill(String(n));
const cases: Record<string, (page: Page) => Promise<void>> = {
  "volatility-drag": async (p) => {
    await p.getByRole("button", { name: "Try +50 / −50 twice" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "56.25",
    );
  },
  "sequence-of-returns": async (p) => {
    await slide(p, "sequence-withdrawal", 0);
    await p.getByRole("button", { name: "Put gains first" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "108.11",
    );
  },
  "fee-drag": async (p) => {
    await p.getByRole("button", { name: "Compare a 0.2% fee" }).click();
    await expect(p.locator("#fee-rate")).toHaveValue("0.2");
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "foregone growth",
    );
  },
  "real-return": async (p) => {
    await p.getByRole("button", { name: "More money, fewer baskets" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "Year 10",
    );
    await expect(p.locator(".money-shop")).toContainText("162.89");
  },
  "bond-duration": async (p) => {
    await slide(p, "bond-coupon", 0);
    await slide(p, "bond-years", 5);
    await expect(p.locator(".money-board .simulation-stats")).toContainText(
      "5 years",
    );
    await p
      .getByText("Inspect each discounted cash flow", { exact: true })
      .click();
    await expect(p.locator(".money-board tbody tr")).toHaveCount(5);
  },
  "discounted-cash-flow": async (p) => {
    await slide(p, "dcf-growth", 0);
    await slide(p, "dcf-bid", 80);
    await p.getByRole("button", { name: "Submit project bid" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "above",
    );
    await p.getByRole("button", { name: "Stress the assumptions" }).click();
    await expect(p.locator("#dcf-discount")).toHaveValue("15");
  },
  "margin-calls": async (p) => {
    await slide(p, "margin-leverage", 3);
    await p.getByRole("button", { name: "Open margin account" }).click();
    await p.getByRole("button", { name: "Reveal market move" }).click();
    await expect(
      p.getByRole("button", { name: "Reveal market move" }),
    ).toBeDisabled();
    await p.getByRole("button", { name: "Sell assets to repay debt" }).click();
    await expect(
      p.getByRole("button", { name: "Reveal market move" }),
    ).toBeEnabled();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "Equity is unchanged",
    );
  },
  "portfolio-rebalancing": async (p) => {
    await p.getByRole("button", { name: "Reveal next market round" }).click();
    await p.getByRole("button", { name: "Rebalance to 50/50" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "fee 0.25",
    );
    await expect(p.locator(".money-allocation")).toContainText("A 50%");
  },
  "dollar-cost-averaging": async (p) => {
    await p.getByRole("button", { name: "Rising path", exact: true }).click();
    for (let i = 0; i < 6; i++)
      await p.getByRole("button", { name: "Invest next 100 tokens" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "lump-sum wealth is 1,200",
    );
    await expect(
      p.getByRole("button", { name: "Invest next 100 tokens" }),
    ).toBeDisabled();
  },
  "disposition-effect": async (p) => {
    for (const asset of ["B", "B", "A", "A"])
      await p
        .getByRole("button", { name: "Sell asset " + asset, exact: true })
        .click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "Four decisions recorded",
    );
    await expect(p.locator(".money-ledger li")).toHaveCount(4);
    await expect(p.locator(".money-ledger")).not.toContainText("180");
  },
  "house-money-effect": async (p) => {
    await p.getByRole("button", { name: "Choose sure 110" }).click();
    await p.getByRole("button", { name: "Choose the 50/50 draw" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "Your choice changed",
    );
    await expect(
      p.getByRole("button", { name: "Choose sure 110" }),
    ).toBeDisabled();
  },
  "minsky-financing": async (p) => {
    for (let i = 0; i < 3; i++)
      await p.getByRole("button", { name: "Settle next quarter" }).click();
    await expect(p.locator(".money-regime")).toContainText("Ponzi finance");
    await p.getByRole("button", { name: "Settle next quarter" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "borrowed",
    );
  },
  "permissionless-leverage": async (p) => {
    await p.getByRole("button", { name: "Build and launch once" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "earned -2",
    );
    await p.getByRole("button", { name: "Distribute product again" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "earned 76",
    );
  },
  "specific-knowledge": async (p) => {
    for (const skill of ["Coding", "Logistics", "Data analysis"])
      await p.getByRole("button", { name: new RegExp("^" + skill) }).click();
    await p.getByRole("button", { name: "Test my skill mix" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "50 illustrative fit points",
    );
    await p.getByRole("button", { name: "Switch customer brief" }).click();
    await p.getByRole("button", { name: "Test my skill mix" }).click();
    await expect(p.locator('.money-board [role="status"]')).toContainText(
      "0/3",
    );
  },
  "circle-of-competence": async (p) => {
    for (let i = 0; i < 6; i++)
      await p.getByRole("button", { name: "Pass this offer" }).click();
    await expect(p.locator(".money-ledger li")).toHaveCount(6);
    await expect(p.locator(".money-board .simulation-stats")).toContainText(
      "0",
    );
  },
};
for (const [slug, play] of Object.entries(cases))
  test(`${slug}: decision outcome and reset`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/effects/" + slug);
    const board = page.locator(".money-board");
    await expect(board).toBeVisible();
    const initial = await board.innerText();
    await play(page);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator(".reading-scenario li")).toHaveCount(3);
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
