import { test, expect } from "@playwright/test";

test("discovery links are independent, counts are dynamic, and surprise chooses live", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByText("14 ideas · 6 interactive · 8 in development"),
  ).toBeVisible();
  const card = page.locator(".effect-card").filter({
    has: page.getByRole("heading", { name: "Lindy Effect", exact: true }),
  });
  await card
    .getByRole("link", { name: "Risk & Uncertainty", exact: true })
    .click();
  await expect(page).toHaveURL(/categories\/risk-and-uncertainty/);
  await page.goto("/");
  await card
    .getByRole("link", { name: "Nassim Nicholas Taleb", exact: true })
    .click();
  await expect(page).toHaveURL(/thinkers\/nassim-nicholas-taleb/);
  await page.goto("/");
  await page.getByLabel("Explore by format").selectOption("thought-experiment");
  await expect(page.locator(".effect-card")).toHaveCount(1);
  await expect(page.locator(".effect-card")).toContainText("Ergodicity");
  await page.getByRole("button", { name: "Surprise me" }).click();
  await expect(page).toHaveURL(
    /effects\/(lindy-effect|gamblers-ruin|base-rate-neglect|regression-to-the-mean|power-laws|network-effects)$/,
  );
});

test("one-life keyboard controls, absorbing ruin, pending changes, and many-life statistics", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(
    "/effects/gamblers-ruin?wealth=100&risk=0.5&win=0&rounds=5&threshold=25&lives=100",
  );
  await expect(
    page.getByRole("img", { name: "One life, round by round" }),
  ).toBeVisible();
  await expect(page.locator(".ruin-stat-grid")).toContainText("Round 2");
  await page.getByLabel("Risk per round", { exact: true }).focus();
  await page.getByLabel("Risk per round", { exact: true }).press("ArrowDown");
  await expect(page.getByLabel("Risk per round", { exact: true })).toHaveValue(
    "49",
  );
  await expect(page.locator(".run-context")).toContainText("Settings changed");
  await page.getByRole("button", { name: "Many lives", exact: true }).click();
  await page
    .getByRole("button", { name: "Run 100 lives", exact: true })
    .click();
  await expect(
    page.getByRole("img", { name: "Many lives, many possible endings" }),
  ).toBeVisible();
  await expect(page.locator(".ruin-stat-grid")).toContainText("100.0%");
  await expect(page.locator(".ruin-stat-grid")).toContainText(
    "Median ending wealth",
  );
  await page.getByRole("button", { name: /Double the exposure/ }).click();
  await expect(page.getByLabel("Risk per round", { exact: true })).toHaveValue(
    "98",
  );
  await expect(page.locator(".run-context")).toContainText("previous settings");
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(page.getByLabel("Starting wealth", { exact: true })).toHaveValue(
    "10000",
  );
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("invalid links, input errors, and clipboard sharing", async ({
  page,
  context,
}) => {
  await page.goto("/effects/gamblers-ruin?risk=bad");
  await expect(page.getByRole("status")).toContainText("invalid settings");
  await page.getByLabel("Ruin threshold", { exact: true }).fill("10001");
  await expect(page.locator(".ruin-input-error")).toContainText(
    "below starting wealth",
  );
  await expect(
    page.getByRole("button", { name: "Run again", exact: true }),
  ).toBeDisabled();
  await page.getByLabel("Ruin threshold", { exact: true }).fill("500");
  await page.getByLabel("Risk per round", { exact: true }).fill("20");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: /Copy experiment link/ }).click();
  await expect(page.getByRole("status")).toContainText("copied");
  const link = await page.evaluate(() => navigator.clipboard.readText());
  const url = new URL(link);
  expect(url.searchParams.get("risk")).toBe("0.2");
  expect(url.searchParams.get("threshold")).toBe("500");
  expect(url.searchParams.has("seed")).toBe(false);
  await page.goto(link);
  await expect(page.getByLabel("Risk per round", { exact: true })).toHaveValue(
    "20",
  );
  await expect(page.getByLabel("Ruin threshold", { exact: true })).toHaveValue(
    "500",
  );
});

test("dark mode, reduced motion, and responsive filters", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).backgroundColor),
  ).toBe("rgb(33, 45, 54)");
  const tail = page.locator(".glyph-tail");
  await page.locator(".effect-card").filter({ has: tail }).hover();
  expect(
    await tail.evaluate((element) => getComputedStyle(element).transform),
  ).toBe("none");
  if (testInfo.project.name === "mobile")
    expect(
      await page
        .locator(".filter-list")
        .evaluate((element) => element.scrollWidth > element.clientWidth),
    ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("homepage-dark.png"),
    fullPage: true,
  });
  await page.goto("/effects/gamblers-ruin");
  await expect(
    page.getByLabel("Starting wealth", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Many lives", exact: true }).click();
  await page
    .getByRole("button", { name: "Run 1,000 lives", exact: true })
    .click();
  await expect(
    page.getByRole("img", { name: "Many lives, many possible endings" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("ruin-dark.png"),
    fullPage: true,
  });
  await page.emulateMedia({
    colorScheme: "light",
    reducedMotion: "no-preference",
  });
  await page.screenshot({
    path: testInfo.outputPath("ruin-light.png"),
    fullPage: true,
  });
});

test("maximum run remains responsive and preserves finite output", async ({
  page,
}) => {
  await page.goto("/effects/gamblers-ruin?lives=5000&rounds=500&win=0.6");
  await page.getByRole("button", { name: "Many lives", exact: true }).click();
  await page
    .getByRole("button", { name: "Run 5,000 lives", exact: true })
    .click();
  await expect(
    page.getByRole("img", { name: "Many lives, many possible endings" }),
  ).toBeVisible();
  await expect(page.locator(".ruin-stat-grid")).not.toContainText(
    /NaN|Infinity/,
  );
  await expect(
    page.getByRole("button", { name: "Run 5,000 lives", exact: true }),
  ).toBeEnabled();
});
