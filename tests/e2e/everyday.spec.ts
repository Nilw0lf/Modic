import { test, expect } from "@playwright/test";
import { newExperiments } from "../../src/data/expansion";

for (const entry of newExperiments)
  test(`${entry.id}: interactive controls, reset, theme and layout`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`/effects/${entry.id}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      entry.name,
    );
    await expect(page.locator(".simulation-shell")).toBeVisible();
    if (entry.id === "confirmation-bias") {
      await page.getByRole("button", { name: "Try unequal gaps" }).click();
      await page.getByRole("button", { name: "Test this sequence" }).click();
      await expect(page.locator(".rule-feedback")).toContainText(
        "fits the rule",
      );
      await page
        .getByRole("button", { name: "Try descending numbers" })
        .click();
      await page.getByRole("button", { name: "Test this sequence" }).click();
      await expect(page.locator(".rule-feedback")).toContainText(
        "does not fit",
      );
      await page.getByRole("button", { name: "Reveal the rule" }).click();
      await expect(
        page.getByText("Any three strictly increasing numbers.", {
          exact: true,
        }),
      ).toBeVisible();
    } else {
      const stats = page.locator(".simulation-stats"),
        before = await stats.textContent();
      const sliders = page.getByRole("slider");
      await sliders.first().focus();
      await sliders.first().press("End");
      if (entry.id !== "prisoners-dilemma")
        await expect(stats).not.toHaveText(before!);
      await page.getByRole("button", { name: /Try this:/ }).click();
      if (
        [
          "stag-hunt",
          "chicken-game",
          "matching-pennies",
          "coordination-game",
        ].includes(entry.id)
      ) {
        const board = page.getByRole("region", {
          name: "Play the payoff table",
        });
        await board
          .getByRole("button", { name: /^Play / })
          .first()
          .click();
        await expect(board.getByRole("status")).toContainText("Round 1");
        await board
          .getByRole("button", { name: /^Play / })
          .nth(1)
          .click();
        await expect(board.getByRole("status")).toContainText("Round 2");
        await board.getByRole("button", { name: "Clear rounds" }).click();
        await expect(board.getByRole("status")).toContainText("first round");
      }
      if (entry.id === "monty-hall") {
        await page.getByRole("button", { name: /Door 1/ }).click();
        await page.getByRole("button", { name: "Switch", exact: true }).click();
        await expect(page.locator('p[role="status"]')).toContainText(
          "Your final door",
        );
      }
      if (entry.id === "prisoners-dilemma") {
        await page
          .getByRole("button", { name: "Cooperate this round" })
          .click();
        await expect(page.locator('p[role="status"]')).toContainText("Round 1");
        await page.getByRole("button", { name: "Defect this round" }).click();
        await expect(page.locator('p[role="status"]')).toContainText("Round 2");
      }
      await page.getByRole("button", { name: "Reset", exact: true }).click();
      await expect(page.locator(".simulation-stats")).toHaveText(before!);
    }
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(
      page.getByRole("complementary", { name: "Learning path" }),
    ).toBeVisible();
    expect(errors).toEqual([]);
    if (
      [
        "schelling-segregation",
        "prisoners-dilemma",
        "compound-growth",
        "stag-hunt",
        "nash-bargaining",
        "antifragility",
      ].includes(entry.id)
    )
      await page.screenshot({
        path: testInfo.outputPath(`${entry.id}.png`),
        fullPage: true,
      });
  });
