import { test, expect } from "@playwright/test";

test("hero model responds to its stake control and opens matching experiment settings", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("img", { name: /Forty rounds/ })).toBeVisible();
  const outcome = page.locator(".hero-outcome");
  const before = await outcome.textContent();
  await page
    .getByRole("slider", { name: /Stake per round/ })
    .press("ArrowRight");
  await expect(page.locator('output[for="hero-risk"]')).toHaveText("7%");
  await expect(outcome).not.toHaveText(before!);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
  await page.getByRole("heading", { level: 1 }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath("homepage-light.png") });
  await page.getByRole("link", { name: "Open full risk experiment" }).click();
  await expect(page).toHaveURL(/risk=0.07/);
  await expect(page.getByLabel("Risk per round")).toHaveValue("7");
});
