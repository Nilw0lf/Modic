import { test, expect } from "@playwright/test";
import { playEntries } from "../../src/data/play-expansion";

for (const entry of playEntries)
  test(`${entry.id}: the playable choice changes the story`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/effects/${entry.id}`);
    const board = page.locator(".play-board");
    await expect(board).toBeVisible();
    switch (entry.id) {
      case "simpsons-paradox":
        await board.getByRole("button", { name: "Predict B" }).click();
        await expect(board).toContainText(
          "Your prediction matches the pooled result",
        );
        await expect(board.getByRole("table")).toContainText("90%");
        break;
      case "ellsberg-urn":
        await board.getByRole("button", { name: "Draw from unknown" }).click();
        await expect(board.getByRole("status")).toContainText(
          "unknown urn contained",
        );
        await board.getByRole("button", { name: "New urns" }).click();
        await expect(board.getByRole("status")).toBeEmpty();
        break;
      case "allais-paradox":
        await board.getByRole("button", { name: /Choose A/ }).click();
        await board.getByRole("button", { name: /Choose D/ }).click();
        await board.getByRole("button", { name: "Draw both outcomes" }).click();
        await expect(board).toContainText("classic pattern");
        await expect(board.getByRole("status")).toContainText("Pair 1: A paid");
        break;
      case "information-cascade":
        await board
          .getByRole("button", { name: "Reveal next decision" })
          .click();
        await expect(board.locator(".cascade-steps li")).toHaveCount(1);
        await board
          .getByRole("button", { name: "Reveal clues and state" })
          .click();
        await expect(board).toContainText("Clue:");
        break;
      case "threshold-public-good":
        await board.getByRole("button", { name: "Run funding round" }).click();
        await expect(board.getByRole("status")).toContainText(
          "your net payoff",
        );
        break;
      case "trust-game":
        await board.getByRole("button", { name: /Send 5 tokens/ }).click();
        await expect(board.getByRole("status")).toContainText(
          "recipient received 15",
        );
        await board.getByRole("button", { name: /Return 50%/ }).click();
        await expect(board.getByRole("status")).toContainText(
          "Sender ends with 12.5",
        );
        break;
      case "centipede-game":
        await board
          .getByRole("button", { name: "Pass and grow the pot" })
          .click();
        await expect(board.getByRole("status")).toContainText("pot");
        if (await board.getByRole("button", { name: "Take now" }).isVisible())
          await board.getByRole("button", { name: "Take now" }).click();
        await expect(
          board.getByRole("button", { name: "Play again" }),
        ).toBeVisible();
        break;
      case "volunteers-dilemma":
        await board
          .getByRole("button", { name: "Wait for someone else" })
          .click();
        await expect(board.getByRole("status")).toContainText("You waited");
        break;
      case "beauty-contest":
        await board.getByRole("button", { name: /Submit guess/ }).click();
        await expect(board.getByRole("status")).toContainText(
          "Nine bot guesses",
        );
        break;
      case "hotelling-location":
        await board
          .getByRole("button", { name: "Compare customer territories" })
          .click();
        await expect(board.getByRole("status")).toContainText("serves");
        await expect(board.locator(".street-map i")).toHaveCount(21);
        break;
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
    if (
      ["information-cascade", "allais-paradox", "hotelling-location"].includes(
        entry.id,
      )
    )
      await page.screenshot({
        path: testInfo.outputPath(`${entry.id}.png`),
        fullPage: true,
      });
  });
