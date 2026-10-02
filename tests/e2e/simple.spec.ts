import { expect, test } from "@playwright/test";
import { simpleEntries } from "../../src/data/simple-expansion";
const firstMoves: Record<string, string[]> = {
  "conjunction-fallacy": ["Alex is a librarian"],
  "availability-heuristic": ["Routine delays"],
  "halo-effect": ["Choose A", "Reveal work samples", "Choose B"],
  "mental-accounting": ["Replace the lost ticket", "Buy after losing cash"],
  "zero-risk-bias": ["Prevent 15 from B"],
  "default-effect": ["Switch the default", "Confirm plan"],
  "value-of-information": ["Buy perfect information"],
  "tragedy-of-the-anticommons": ["Proceed with project"],
  "minority-game": ["Choose side B"],
  "rock-paper-scissors": ["Paper"],
};
for (const entry of simpleEntries)
  test(`${entry.id}: complete a simple interaction and read its guide`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/effects/${entry.id}`);
    const shell = page.locator(".simulation-shell");
    await expect(
      shell.getByRole("heading", { name: entry.name, exact: true }),
    ).toBeVisible();
    if (entry.format === "game") {
      const board = page.getByRole("region", { name: `Play ${entry.name}` });
      if (entry.id === "stroop-effect") {
        for (let trial = 1; trial <= 8; trial++) {
          await board
            .getByRole("button", { name: `Start trial ${trial}`, exact: true })
            .click();
          const label = await board
            .locator(".stroop-word")
            .getAttribute("aria-label");
          const color = label!.match(/in (Red|Blue|Green) ink/)![1];
          if (trial === 1) {
            const wrong = color === "Red" ? "Blue" : "Red";
            await board
              .getByRole("button", { name: `${wrong} ink`, exact: true })
              .click();
            await expect(board.getByRole("status")).toContainText("Try again");
          }
          await board
            .getByRole("button", { name: `${color} ink`, exact: true })
            .click();
        }
        await expect(board).toContainText("Round complete");
        await expect(board).toContainText("Wrong answers: 1");
      } else if (entry.id === "fitts-law") {
        await board.getByRole("button", { name: "Start", exact: true }).click();
        await board
          .getByRole("button", { name: "Target", exact: true })
          .click();
        await expect(board.getByRole("status")).toContainText("Last selection");
        await shell
          .getByRole("slider", { name: /Target width/ })
          .press("ArrowRight");
        await expect(board.locator(".simple-history tbody tr")).toHaveCount(1);
        await board.getByRole("button", { name: "Start", exact: true }).click();
        await board
          .getByRole("button", { name: "Target", exact: true })
          .click();
        await expect(board.locator(".simple-history tbody tr")).toHaveCount(2);
      } else if (entry.id === "hicks-law") {
        for (let i = 0; i < 2; i++) {
          await board
            .getByRole("button", { name: "Start search", exact: true })
            .click();
          const target = (
            await board.locator(".simple-prompt").innerText()
          ).replace("Find item ", "Item ");
          await board
            .getByRole("button", { name: target, exact: true })
            .click();
          if (i === 0)
            await shell
              .getByRole("slider", { name: /Items in the menu/ })
              .press("ArrowRight");
        }
        await expect(board.locator(".simple-history tbody tr")).toHaveCount(2);
      } else if (entry.id === "dunning-kruger-effect") {
        const correct = [
          "50%",
          "A happens",
          "96",
          "2",
          "Reduce a source by 15",
        ];
        for (let i = 0; i < 5; i++) {
          await board
            .getByRole("slider", { name: /Confidence in your answer/ })
            .fill("80");
          await board
            .getByRole("button", { name: correct[i], exact: true })
            .click();
          await expect(board.getByRole("status")).toContainText("Correct");
          await board
            .getByRole("button", {
              name: i === 4 ? "See calibration summary" : "Next question",
              exact: true,
            })
            .click();
        }
        await expect(board.getByRole("status")).toContainText("Accuracy: 100%");
        await expect(board.getByRole("status")).toContainText(
          "Average confidence: 80%",
        );
      } else {
        for (const move of firstMoves[entry.id])
          await board.getByRole("button", { name: move, exact: true }).click();
        await expect(board.getByRole("status")).not.toBeEmpty();
      }
      await shell.getByRole("button", { name: "Reset", exact: true }).click();
      if (entry.id === "stroop-effect")
        await expect(
          board.getByRole("button", { name: "Start trial 1", exact: true }),
        ).toBeVisible();
      else if (entry.id === "dunning-kruger-effect")
        await expect(
          board.getByRole("button", { name: "50%", exact: true }),
        ).toBeEnabled();
      else
        await expect(board.locator(".play-feedback")).toHaveCount(
          entry.id === "mental-accounting" ? 0 : 1,
        );
    } else {
      const stats = shell.locator(".simulation-stats"),
        before = await stats.textContent();
      if (entry.id === "berksons-paradox")
        await shell
          .getByRole("checkbox", {
            name: "Show only the shortlist",
            exact: true,
          })
          .uncheck();
      else if (entry.id === "diversification")
        await shell.getByRole("slider").first().fill("80");
      else if (entry.id === "stocks-and-flows")
        await shell
          .getByRole("slider", { name: /Minute to inspect/ })
          .press("ArrowRight");
      else await shell.getByRole("slider").first().press("ArrowRight");
      await expect(stats).not.toHaveText(before!);
      await shell.getByRole("button", { name: "Reset", exact: true }).click();
      await expect(stats).toHaveText(before!);
      if (entry.id === "stocks-and-flows") {
        await shell
          .getByRole("button", { name: "Run 5 minutes", exact: true })
          .click();
        await expect(stats).toContainText("50");
      }
      await expect(shell.getByRole("img").first()).toBeVisible();
    }
    await expect(page.locator("#worked-example")).toContainText(
      "A worked example",
    );
    await expect(page.locator("#sources a").first()).toHaveAttribute(
      "href",
      /https:|\/thinkers\//,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.evaluate(
      () => (document.documentElement.dataset.theme = "dark"),
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
test("new author, category and learning routes discover the new lessons", async ({
  page,
}) => {
  await page.goto("/categories/perception-and-design");
  await expect(page.locator(".effect-card")).toHaveCount(3);
  await page.goto("/thinkers/donella-meadows");
  await expect(page.locator(".effect-card")).toHaveCount(1);
  await page.goto("/learn");
  await page.getByRole("searchbox").fill("Berkson");
  await expect(page.locator(".glossary-grid > div")).toHaveCount(1);
  await page
    .locator('.glossary-grid a[href="/effects/berksons-paradox"]')
    .click();
  await expect(page).toHaveURL(/berksons-paradox$/);
});
