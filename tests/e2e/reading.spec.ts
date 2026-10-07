import { test, expect } from "@playwright/test";

for (const slug of [
  "lindy-effect",
  "gamblers-ruin",
  "fat-tails",
  "base-rate-neglect",
  "monty-hall",
  "antifragility",
  "simpsons-paradox",
  "signal-detection",
  "braess-paradox",
  "framing-effect",
  "tullock-contest",
  "bass-diffusion",
  "stable-matching",
  "algorithmic-fairness",
  "mere-exposure-effect",
]) {
  test(`${slug}: readable field notes and working contents`, async ({
    page,
  }) => {
    await page.goto(`/effects/${slug}`);
    const article = page.getByRole("article");
    await expect(
      article.getByRole("heading", { name: "A worked example", exact: true }),
    ).toBeVisible();
    await expect(article.locator(".reading-scenario li")).toHaveCount(3);
    await expect(
      article.getByRole("heading", {
        name: "A common misconception",
        exact: true,
      }),
    ).toBeVisible();
    await expect(article.locator(".reading-sources a").first()).toHaveAttribute(
      "href",
      /https?:|\/thinkers\//,
    );
    const contents = page.getByRole("navigation", { name: "On this page" });
    for (const href of await contents
      .locator("a")
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")!),
      )) {
      await expect(page.locator(href)).toHaveCount(1);
    }
    await contents
      .getByRole("link", { name: "A worked example", exact: true })
      .click();
    await expect(page).toHaveURL(/#worked-example$/);
    await expect(page.locator("#worked-example")).toBeInViewport();
    const summary = article.locator(".reading-model summary");
    if (await summary.count()) {
      await summary.focus();
      await summary.press("Enter");
      await expect(article.locator("details")).toHaveAttribute("open", "");
      await expect(article.locator(".reading-model-body")).toBeVisible();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.evaluate(
      () => (document.documentElement.dataset.theme = "dark"),
    );
    await expect(article.locator(".reading-takeaway")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
}

test("field notes and collapsed model details are available without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/effects/lindy-effect`);
  await expect(page.locator(".reading-takeaway")).toContainText("Lindy Effect");
  await expect(page.locator(".reading-model")).not.toHaveAttribute("open");
  await page.locator(".reading-model summary").click();
  await expect(page.locator(".reading-model-body")).toContainText(
    "median remaining life",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Lindy/,
  );
  await context.close();
});
