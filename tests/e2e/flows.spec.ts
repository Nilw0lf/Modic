import { test, expect } from "@playwright/test";
test("home, local search, category filters, and empty recovery", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "See how the world behaves." }),
  ).toBeVisible();
  await expect(page.locator(".effect-card")).toHaveCount(44);
  await page.getByRole("button", { name: "Game Theory", exact: true }).click();
  await expect(page.locator(".effect-card")).toHaveCount(14);
  await expect(
    page.getByRole("heading", { name: "Prisoner’s Dilemma", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Everything", exact: true }).click();
  await page.getByRole("searchbox").fill("Taleb");
  await expect(page.locator(".effect-card")).toHaveCount(9);
  await page.getByRole("searchbox").fill("unfindable-query");
  await expect(
    page.getByRole("heading", { name: "No effects found." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear search and filters" }).click();
  await expect(page.locator(".effect-card")).toHaveCount(44);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test("Lindy controls, prompts, resample, reset, and accessible chart", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: /START WITH AN EXPERIMENT/ }).click();
  await expect(page).toHaveURL(/effects\/lindy-effect/);
  await expect(
    page.getByRole("heading", { name: "Lindy Effect." }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Possible remaining lifetimes" }),
  ).toBeVisible();
  const stats = page.locator(".simulation-stats");
  const original = await stats.innerText();
  await page.getByLabel("Current age", { exact: false }).focus();
  await page.getByLabel("Current age", { exact: false }).press("ArrowRight");
  await expect(page.locator("output[for=current-age]")).toContainText("105");
  await page
    .getByRole("button", { name: "Remove the age effect", exact: false })
    .click();
  await expect(page.locator("output[for=lindy-strength]")).toHaveText("0.0");
  await expect(page.locator(".notice-panel")).toContainText(
    "Age has stopped mattering",
  );
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  expect(await stats.innerText()).toBe(original);
  await page.getByRole("button", { name: "Resample", exact: true }).click();
  expect(await stats.innerText()).not.toBe(original);
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  expect(await stats.innerText()).toBe(original);
  await expect(
    page.getByText(
      "Model outputs are illustrative simulation values, not forecasts for real things.",
    ),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test("category and thinker routes group real relationships", async ({
  page,
}) => {
  await page.goto("/categories");
  await page.getByRole("link", { name: /Risk & Uncertainty/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Risk & Uncertainty",
  );
  await expect(page.locator(".effect-card")).toHaveCount(11);
  await page.goto("/thinkers/nassim-nicholas-taleb");
  await expect(
    page.getByRole("heading", { name: "Popularized", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Discussed", exact: true }),
  ).toBeVisible();
  await page.goto("/effects/fat-tails");
  await expect(
    page.getByText("The interactive simulation for this idea is planned.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(page.locator(".simulation-shell")).toHaveCount(0);
});
test("navigation and metadata", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByText("Menu", { exact: false }).first().click();
  const nav = page.getByRole("navigation", {
    name: isMobile ? "Mobile navigation" : "Main navigation",
    exact: true,
  });
  await nav.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about/);
  await expect(page).toHaveTitle("About · Modic");
  await page.goto("/effects/lindy-effect");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/effects\/lindy-effect$/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Lindy Effect · Modic",
  );
  await page.goto("/effects/not-a-real-effect");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "This page hasn’t",
  );
});
