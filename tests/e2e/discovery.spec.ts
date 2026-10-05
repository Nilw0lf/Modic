import { test, expect } from "@playwright/test";
import { discoveryEntries } from "../../src/data/discovery-expansion";
for (const entry of discoveryEntries)
  test(`${entry.id}: interaction, reset and field notes`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`/effects/${entry.id}`);
    const shell = page.locator(".simulation-shell");
    await expect(
      shell.getByRole("heading", { name: entry.name, exact: true }),
    ).toBeVisible();
    if (entry.format === "game") {
      const board = page.getByRole("region", { name: `Play ${entry.name}` });
      switch (entry.id) {
        case "wason-selection":
          await board.getByRole("button", { name: "A", exact: true }).click();
          await board.getByRole("button", { name: "7", exact: true }).click();
          await board
            .getByRole("button", { name: "Check selected cards" })
            .click();
          await expect(board.locator("p[role=status]")).toContainText(
            "Correct",
          );
          break;
        case "cognitive-reflection":
          await board.getByRole("button", { name: "10 coins" }).click();
          await expect(board.locator("p[role=status]")).toContainText(
            "Correct",
          );
          break;
        case "newcomb-problem":
          await board
            .getByRole("button", { name: "Take sealed box only" })
            .click();
          await expect(board.locator("p[role=status]")).toContainText(
            "Teaching outcome",
          );
          break;
        case "dollar-auction":
          await board.getByRole("button", { name: "Bid one more" }).click();
          await board.getByRole("button", { name: "Stop bidding" }).click();
          await expect(board.locator("p[role=status]")).toContainText(
            "net payoff: -1",
          );
          await expect(
            board.getByRole("button", { name: "Bid one more" }),
          ).toBeDisabled();
          break;
        case "travelers-dilemma":
          await board.getByRole("button", { name: "Submit claim" }).click();
          await expect(board.locator("p[role=status]")).toContainText(
            "Your payoff: 18",
          );
          await shell.getByRole("slider", { name: /Your claim/ }).fill("17");
          await board.getByRole("button", { name: "Submit claim" }).click();
          await expect(board.locator("p[role=status]")).toContainText(
            "Your payoff: 19",
          );
          break;
        case "nim":
          for (
            let i = 0;
            i < 12 &&
            (await board.getByRole("button", { name: /take/ }).count());
            i++
          ) {
            const available = board.getByRole("button", { name: /take/ });
            if (await available.first().isDisabled()) break;
            await available.first().click();
          }
          await expect(board.locator("p[role=status]")).toContainText(/win/i);
          break;
        case "penneys-game":
          await board.getByRole("button", { name: "Race patterns" }).click();
          await expect(board.locator("p[role=status]")).toContainText("Flips:");
          break;
        case "nontransitive-dice":
          await board.getByRole("button", { name: "Roll dice" }).click();
          await expect(board.locator("p[role=status]")).toContainText("44.4%");
          break;
        case "ikea-effect":
          for (let i = 0; i < 3; i++)
            await board
              .getByRole("button", { name: "Place next tile" })
              .click();
          await board.getByRole("slider").fill("4");
          await board
            .getByRole("button", { name: "Reveal comparison" })
            .click();
          await expect(board.locator("p[role=status]")).toContainText(
            "Your rating: 4/5",
          );
          break;
        case "barnum-effect":
          await board
            .getByRole("button", { name: "Reveal comparison" })
            .click();
          await expect(board.locator("p[role=status]")).toContainText(
            "Everyone receives",
          );
          break;
        case "illusion-of-control":
          await board.getByRole("combobox").selectOption("Orange pad");
          await board.getByRole("button", { name: "Predict heads" }).click();
          await expect(board.locator("p[role=status]")).toContainText(
            "Orange pad",
          );
          break;
        case "recognition-heuristic":
        case "affect-heuristic":
          await board
            .getByRole("button", {
              name:
                entry.id === "recognition-heuristic"
                  ? "Choose Familiar Market"
                  : "Choose Bright Horizon",
            })
            .click();
          await board.getByRole("button", { name: "Reveal evidence" }).click();
          await board
            .getByRole("button", {
              name:
                entry.id === "recognition-heuristic"
                  ? "Choose Qev Shop"
                  : "Choose Storm Plan",
            })
            .click();
          await expect(board.locator("p[role=status]")).toContainText(
            "After evidence",
          );
          break;
        case "scope-insensitivity":
          await board.getByRole("slider").fill("2");
          await board
            .getByRole("button", { name: "Save first rating" })
            .click();
          await board.getByRole("slider").fill("5");
          await board
            .getByRole("button", { name: "Reveal comparison" })
            .click();
          await expect(board.locator("p[role=status]")).toContainText(
            "First project: 2/5. Larger project: 5/5",
          );
          break;
        case "serial-position-effect": {
          const words: string[] = [];
          for (let i = 0; i < 8; i++) {
            words.push(await board.locator(".memory-word").innerText());
            await board
              .getByRole("button", {
                name: i < 7 ? "Next word" : "Hide list and recall",
              })
              .click();
          }
          await board.getByRole("textbox").fill(words.slice(0, 3).join(", "));
          await board.getByRole("button", { name: "Check recall" }).click();
          await expect(board.locator("p[role=status]")).toContainText(
            "Recalled 3 of 8",
          );
          break;
        }
        case "testing-effect":
          await board
            .getByRole("button", { name: "Hide and retrieve" })
            .click();
          await board.getByRole("textbox", { name: "Dax" }).fill("river");
          await board.getByRole("textbox", { name: "Mip" }).fill("lantern");
          await board.getByRole("textbox", { name: "Zog" }).fill("orchard");
          await board.getByRole("button", { name: "Check recall" }).click();
          await expect(board.locator("p[role=status]")).toContainText("3 of 3");
          break;
      }
      await shell.getByRole("button", { name: "Reset", exact: true }).click();
      if (entry.id === "nim")
        await expect(board).toContainText("Pile 1 · 3 stones");
      if (entry.id === "serial-position-effect")
        await expect(board.locator(".memory-word")).toBeVisible();
      if (entry.id === "scope-insensitivity")
        await expect(
          board.getByRole("button", { name: "Save first rating" }),
        ).toBeVisible();
    } else if (entry.id === "hysteresis") {
      const slider = shell.getByRole("slider");
      await slider.fill("70");
      await slider.fill("50");
      await expect(shell.locator(".relay-board p[role=status]")).toContainText(
        "memory switch ON",
      );
      await slider.fill("30");
      await slider.fill("50");
      await expect(shell.locator(".relay-board p[role=status]")).toContainText(
        "memory switch OFF",
      );
      await shell.getByRole("button", { name: "Reset", exact: true }).click();
      await expect(slider).toHaveValue("30");
    } else {
      const stats = shell.locator(".simulation-stats"),
        before = await stats.textContent(),
        slider = shell.getByRole("slider").first();
      if (entry.id === "hawk-dove") await slider.fill("80");
      else if (entry.id === "bayesian-updating")
        await shell.getByRole("slider", { name: /Observed draws/ }).fill("12");
      else await slider.fill(String(entry.controls[0].max));
      await expect(stats).not.toHaveText(before!);
      await expect(shell.getByRole("img").first()).toBeVisible();
      await shell.getByRole("button", { name: "Reset", exact: true }).click();
      await expect(stats).toHaveText(before!);
    }
    await expect(page.locator("#worked-example")).toContainText(
      "A worked example",
    );
    await expect(page.locator("#sources a").first()).toHaveAttribute(
      "href",
      /https:|\/thinkers\//,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://modic.app/effects/${entry.id}`,
    );
    await page.locator("#model-detail summary").click();
    await expect(page.locator("#model-detail details")).toHaveAttribute(
      "open",
      "",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
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
test("new thinkers and glossary lessons are discoverable", async ({ page }) => {
  await page.goto("/thinkers/steven-strogatz");
  await expect(
    page.getByRole("heading", { name: "Small-World Shortcuts", exact: true }),
  ).toBeVisible();
  await page.goto("/learn");
  await page.getByRole("searchbox").fill("Nim");
  await page.locator('.glossary-grid a[href="/effects/nim"]').click();
  await expect(page).toHaveURL(/\/effects\/nim$/);
});
