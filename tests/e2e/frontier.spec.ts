import { test, expect, type Page } from "@playwright/test";

async function slider(page: Page, id: string, value: number) {
  await page.locator(`#${id}`).fill(String(value));
}

const cases: Record<string, (page: Page) => Promise<void>> = {
  "stable-matching": async (page) => {
    for (let i = 0; i < 9; i++) {
      const button = page
        .locator(".frontier-board button:not([disabled])")
        .filter({ hasText: "propose next" })
        .first();
      if (!(await button.count())) break;
      await button.click();
    }
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      "Matching complete. 0 blocking pairs",
    );
  },
  "battle-of-the-sexes": async (page) => {
    await slider(page, "venue-probability", 100);
    await page
      .getByRole("button", { name: "Go to Music", exact: true })
      .click();
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      "you 3, bot 2",
    );
  },
  "cournot-competition": async (page) => {
    await slider(page, "cournot-own", 30);
    await page.getByRole("button", { name: "Produce and sell" }).click();
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      "profit is 900",
    );
  },
  "stackelberg-competition": async (page) => {
    await slider(page, "leader-quantity", 40);
    await page
      .getByRole("button", { name: "Commit and let follower respond" })
      .click();
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      "follower produces 20. Your net profit is 800",
    );
  },
  "bertrand-competition": async (page) => {
    await slider(page, "bertrand-own", 49);
    await page.getByRole("button", { name: "Post your price" }).click();
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      "51 units and earn 1,479",
    );
  },
  "war-of-attrition": async (page) => {
    await slider(page, "attrition-patience", 8);
    for (let i = 0; i < 8; i++)
      await page
        .getByRole("button", { name: "Continue (costs 2)", exact: true })
        .click();
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      "= -4 net tokens",
    );
    await expect(
      page.getByRole("button", { name: "Exit now", exact: true }),
    ).toBeDisabled();
  },
  "colonel-blotto": async (page) => {
    await page
      .getByRole("button", { name: "Remove token from field 1" })
      .click();
    await expect(
      page.getByRole("button", { name: "Submit allocation" }),
    ).toBeDisabled();
    await page.getByRole("button", { name: "Add token to field 2" }).click();
    await page.getByRole("button", { name: "Submit allocation" }).click();
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      "Field score",
    );
    await expect(
      page.getByRole("button", { name: "Remove token from field 1" }),
    ).toBeDisabled();
  },
  "price-of-anarchy": async (page) => {
    await page
      .getByRole("button", { name: "System optimum", exact: true })
      .click();
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      "minimal at 5,100",
    );
  },
  "complex-contagion": async (page) => {
    await expect(
      page.getByRole("button", { name: "Spread one step" }),
    ).toBeDisabled();
    await page.getByRole("button", { name: "Try adjacent seeds" }).click();
    await page.getByRole("button", { name: "Spread one step" }).click();
    await expect(page.locator(".frontier-board")).toContainText("4/20");
  },
  "performative-prediction": async (page) => {
    await page.getByRole("button", { name: "Deploy and retrain once" }).click();
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      "Cycle 1: the prediction 30 would produce demand 35",
    );
  },
  "algorithmic-fairness": async (page) => {
    await slider(page, "fairness-a", 100);
    await expect(page.locator(".frontier-metric-cards").first()).toContainText(
      "Undefined: no selections",
    );
    await expect(
      page.locator(".frontier-board tbody tr").first(),
    ).toContainText("20");
  },
  "differential-privacy": async (page) => {
    await page
      .getByRole("button", { name: "Release another noisy count" })
      .click();
    await slider(page, "privacy-epsilon", 1);
    await page
      .getByRole("button", { name: "Release another noisy count" })
      .click();
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      "2 releases spent epsilon 1.5",
    );
  },
  "inattentional-blindness": async (page) => {
    let count = 0;
    for (let i = 0; i < 8; i++) {
      const description = await page
        .locator(".frontier-attention-scene")
        .getAttribute("aria-label");
      count += Number(description!.match(/: (\d+) blue/)![1]);
      if (i < 7)
        await page.getByRole("button", { name: "Next counting card" }).click();
    }
    await page
      .getByLabel("How many blue circles did you count?")
      .fill(String(count));
    await page.getByRole("button", { name: "Check count and review" }).click();
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      `You reported ${count}; the total is ${count}`,
    );
  },
  "change-blindness": async (page) => {
    await page.getByRole("button", { name: "Next view", exact: true }).click();
    await expect(
      page.locator(".frontier-change-grid button").first(),
    ).toBeDisabled();
    await page.getByRole("button", { name: "Next view", exact: true }).click();
    await page.getByRole("button", { name: "Reveal change" }).click();
    const text = await page.locator(".frontier-comparison").innerText();
    const tile = text.match(/Tile (\d+)/)![1];
    await page
      .locator(".frontier-change-grid")
      .getByRole("button", { name: new RegExp(`^Tile ${tile},`) })
      .click();
    await expect(page.locator('.frontier-board [role="status"]')).toContainText(
      `Correct: tile ${tile}`,
    );
  },
  "mere-exposure-effect": async (page) => {
    for (const pattern of ["A", "B"])
      await page
        .getByRole("group", { name: `Rate pattern ${pattern}`, exact: true })
        .getByRole("button", { name: "2", exact: true })
        .click();
    await page
      .getByRole("button", { name: "Save ratings and start exposure" })
      .click();
    for (let i = 0; i < 11; i++)
      await page.getByRole("button", { name: "Next exposure card" }).click();
    await page
      .getByRole("button", { name: "Finish exposure and rate again" })
      .click();
    for (const pattern of ["A", "B"])
      await page
        .getByRole("group", { name: `Rate pattern ${pattern}`, exact: true })
        .getByRole("button", { name: "4", exact: true })
        .click();
    await page.getByRole("button", { name: "Compare my ratings" }).click();
    await expect(
      page.locator(".frontier-board tbody tr").first().locator("td"),
    ).toHaveText([/3|9/, "2", "4", "2"]);
  },
};

for (const [slug, play] of Object.entries(cases)) {
  test(`${slug}: interactive outcome, reader guide, and responsive layout`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/effects/${slug}`);
    await expect(page.locator(".frontier-board")).toBeVisible();
    const initialBoard = await page.locator(".frontier-board").innerText();
    await play(page);
    await expect(page.locator(".reading-scenario li")).toHaveCount(3);
    await expect(page.locator(".reading-sources a").first()).toHaveAttribute(
      "href",
      /https?:|\/thinkers\//,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Reset", exact: true }).click();
    await expect(page.locator(".frontier-board")).toHaveText(initialBoard, {
      useInnerText: true,
    });
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
}
