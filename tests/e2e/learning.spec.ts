import { test, expect } from "@playwright/test";
test("homepage actions, guided learning, glossary search, and continuous path", async ({
  page,
}) => {
  await page.goto("/");
  const surprise = page.getByRole("button", { name: "Surprise me" });
  await expect(surprise).toBeVisible();
  expect(
    await surprise.evaluate((el) => el.getBoundingClientRect().top),
  ).toBeLessThan(800);
  await page.getByRole("link", { name: "Start learning", exact: true }).click();
  await expect(page).toHaveTitle("Learn · Modic");
  await expect(page.locator(".learning-path li")).toHaveCount(6);
  await page.getByRole("searchbox").fill("false positive");
  await expect(page.locator(".glossary-grid > div")).toHaveCount(1);
  await page.getByRole("searchbox").fill("zzzz");
  await expect(
    page.getByRole("heading", { name: "No matching terms." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear glossary search" }).click();
  await expect(page.locator(".glossary-grid > div")).toHaveCount(46);
  await page.getByRole("link", { name: "Begin the first experiment" }).click();
  await expect(page).toHaveURL(/base-rate-neglect$/);
  await page
    .getByRole("link", { name: "Next: Separate signal from luck" })
    .click();
  await expect(page).toHaveURL(/regression-to-the-mean$/);
  await page.getByRole("link", { name: "Previous experiment" }).click();
  await expect(page).toHaveURL(/base-rate-neglect$/);
  await page.goto("/effects/gamblers-ruin");
  await page.getByRole("link", { name: "Finish with the glossary" }).click();
  await expect(page).toHaveURL(/learn#glossary$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
const cases = [
  {
    slug: "base-rate-neglect",
    label: "Spam base rate",
    prompt: "make half",
    chart: "One thousand messages",
  },
  {
    slug: "regression-to-the-mean",
    label: "Measurement noise",
    prompt: "remove the noise",
    chart: "First versus second",
  },
  {
    slug: "power-laws",
    label: "Rank exponent",
    prompt: "give every page",
    chart: "Visits per page",
  },
  {
    slug: "network-effects",
    label: "Members",
    prompt: "connect every pair",
    chart: "Simulated network",
  },
];
for (const c of cases)
  test(
    c.slug + " controls, sampling, reset, and layout",
    async ({ page }, testInfo) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.goto("/effects/" + c.slug);
      await expect(
        page.getByRole("img", { name: new RegExp(c.chart) }),
      ).toBeVisible();
      const stats = page.locator(".simulation-stats");
      const original = (await stats.textContent())!;
      await page
        .getByRole("slider", { name: new RegExp(c.label) })
        .press("ArrowRight");
      await expect(stats).not.toHaveText(original);
      await page.getByRole("button", { name: "Reset", exact: true }).click();
      await expect(stats).toHaveText(original);
      await page.getByRole("button", { name: "Resample", exact: true }).click();
      await expect(stats).not.toHaveText(original);
      await page.getByRole("button", { name: "Reset", exact: true }).click();
      await expect(stats).toHaveText(original);
      await page.getByRole("button", { name: new RegExp(c.prompt) }).click();
      await expect(stats).not.toHaveText(original);
      if (c.slug === "regression-to-the-mean") {
        const values = await stats.locator("dd").allTextContents();
        expect(values[0]).toBe(values[1]);
      }
      if (c.slug === "network-effects") await expect(stats).toContainText("66");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(errors).toEqual([]);
      if (testInfo.project.name === "mobile")
        await page.screenshot({
          path: testInfo.outputPath(c.slug + ".png"),
          fullPage: true,
        });
    },
  );
test("homepage and learning page fit dark mode", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  for (const route of ["/", "/learn"]) {
    await page.goto(route);
    if ((await page.locator("html").getAttribute("data-theme")) !== "dark")
      await page.getByRole("button", { name: "Switch to dark mode" }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath(
        route === "/" ? "home-dark.png" : "learn-dark.png",
      ),
      fullPage: true,
    });
  }
});
