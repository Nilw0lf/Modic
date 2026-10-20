import { test, expect, type Page } from "@playwright/test";
async function ratings(p: Page, n: string) {
  for (const name of ["A", "B"])
    await p
      .getByRole("group", { name: "Rate " + name, exact: true })
      .getByRole("button", { name: n, exact: true })
      .click();
}
const cases: Record<string, (p: Page) => Promise<void>> = {
  "dichotomy-of-control": async (p) => {
    for (let i = 0; i < 3; i++)
      await p
        .getByRole("button", {
          name: "Add effort: Check equipment",
          exact: true,
        })
        .click();
    for (let i = 0; i < 3; i++)
      await p
        .getByRole("button", {
          name: "Add effort: Practise the route",
          exact: true,
        })
        .click();
    await p.getByRole("button", { name: "Commit my preparation" }).click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "Preparation 15; weather -4; result 11",
    );
    await p
      .getByRole("button", { name: "Replay under different weather" })
      .click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "Preparation 15; weather 0; result 15",
    );
  },
  "veil-of-ignorance": async (p) => {
    await p.getByRole("button", { name: /^Equal shares/ }).click();
    await p
      .getByRole("button", { name: "Commit policy and lift the veil" })
      .click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "receive 6",
    );
    await expect(
      p.getByRole("button", { name: /^Equal shares/ }),
    ).toBeDisabled();
  },
  "trolley-problem": async (p) => {
    await p.getByRole("button", { name: "Intervene", exact: true }).click();
    await p
      .getByRole("button", { name: "Withhold judgment", exact: true })
      .click();
    await expect(p.locator(".philo-ledger li")).toHaveCount(2);
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "Both choices recorded",
    );
  },
  "experience-machine": async (p) => {
    for (let i = 0; i < 3; i++)
      await p
        .getByRole("button", { name: "Choose option B", exact: true })
        .click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "chose B in 3 cases",
    );
  },
  "ship-of-theseus": async (p) => {
    await p
      .getByRole("button", { name: "Replace plank 1", exact: true })
      .click();
    await p
      .getByRole("button", { name: "Reassemble original plank 1", exact: true })
      .click();
    await p
      .getByRole("button", { name: "Replace all remaining planks" })
      .click();
    await p
      .getByRole("button", { name: "Reassemble stored originals" })
      .click();
    await expect(p.locator(".philo-ships")).toContainText(
      "8/8 originals reassembled",
    );
    await p
      .getByRole("button", {
        name: "The criterion needs clarification",
        exact: true,
      })
      .click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "plank counts alone do not settle identity",
    );
  },
  "sorites-paradox": async (p) => {
    await p.getByRole("button", { name: "Not a heap", exact: true }).click();
    await p.getByRole("button", { name: "+1 grain", exact: true }).click();
    await p.getByRole("button", { name: "Borderline", exact: true }).click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "1 adjacent recorded pair",
    );
  },
  "hedonic-adaptation": async (p) => {
    await p
      .getByRole("button", { name: "Spend one upgrade (+10)", exact: true })
      .click();
    await p.getByRole("button", { name: "Let one period pass" }).click();
    await p.getByRole("button", { name: "Let one period pass" }).click();
    await expect(p.locator(".philo-board .simulation-stats")).toContainText(
      "2.50",
    );
    await expect(p.locator(".philo-board .simulation-stats")).toContainText(
      "10.00",
    );
  },
  "occams-razor": async (p) => {
    await p.getByRole("button", { name: /^Short rule/ }).click();
    await p
      .getByRole("button", { name: "Commit prediction and reveal x=4" })
      .click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "squared prediction error: 0",
    );
    await p.getByRole("button", { name: "Switch teaching world" }).click();
    await p.getByRole("button", { name: /^Short rule/ }).click();
    await p
      .getByRole("button", { name: "Commit prediction and reveal x=4" })
      .click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "squared prediction error: 36",
    );
  },
  falsifiability: async (p) => {
    await p
      .getByRole("button", { name: "Inspect badge 4", exact: true })
      .click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "amber badge is a counterexample",
    );
    await p.getByRole("button", { name: "Toggle evasive explanation" }).click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "no genuine failure condition",
    );
  },
  "categorical-imperative": async (p) => {
    await p.getByRole("button", { name: "Everyone adopts it" }).click();
    await expect(p.locator(".philo-board .simulation-stats")).toContainText(
      "Loans under the toy rule0",
    );
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "no longer extends loans",
    );
  },
  utilitarianism: async (p) => {
    await p.locator("#utility-a").fill("3");
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "total 29 and minimum 11",
    );
    await p.getByRole("button", { name: "Compare every split" }).click();
    await expect(p.locator(".philo-board tbody tr")).toHaveCount(6);
  },
  "moral-luck": async (p) => {
    await ratings(p, "3");
    await p
      .getByRole("button", {
        name: "Save conduct ratings and reveal deliveries",
      })
      .click();
    await ratings(p, "4");
    await p
      .getByRole("button", { name: "Compare responsibility ratings" })
      .click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "ratings changed by 1 / 1",
    );
  },
  "epistemic-injustice": async (p) => {
    await ratings(p, "3");
    await p
      .getByRole("button", { name: "Save anonymous ratings and reveal roles" })
      .click();
    await ratings(p, "2");
    await p
      .getByRole("button", { name: "Compare credibility ratings" })
      .click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "Rating changes: -1 / -1",
    );
  },
  "capability-approach": async (p) => {
    await p.getByRole("button", { name: /^Fund Accessible bus/ }).click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "3 versus 1 available options",
    );
    await p.getByRole("button", { name: /^Fund Local clinic/ }).click();
    await p.getByRole("button", { name: /^Fund Public internet hub/ }).click();
    await expect(p.locator('.philo-board [role="status"]')).toContainText(
      "3 versus 3",
    );
  },
  "zenos-paradox": async (p) => {
    for (let i = 0; i < 3; i++)
      await p
        .getByRole("button", { name: "Travel half the remaining distance" })
        .click();
    await expect(p.locator(".philo-number-list")).toContainText("0.875000");
    await p.getByRole("button", { name: "Use fixed time per step" }).click();
    await expect(p.locator(".philo-number-list")).toContainText(
      "Accumulated time3.000000",
    );
  },
};
for (const [slug, play] of Object.entries(cases))
  test(`${slug}: meaningful choices, exact reset, responsive field notes`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/effects/" + slug);
    const board = page.locator(".philo-board");
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
