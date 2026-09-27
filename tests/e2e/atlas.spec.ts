import { expect, test } from "@playwright/test";
import { atlasEntries } from "../../src/data/atlas-expansion";

const firstMoves: Record<string, string[]> = {
  "secretary-problem": ["Observe first 7", "Hire this candidate"],
  "multi-armed-bandit": ["Machine 1"],
  "gamblers-fallacy": ["Heads"],
  "benfords-law": ["Draw a digit"],
  "signal-detection": ["Flag it"],
  "shannon-entropy": ["Heads"],
  "braess-paradox": ["Open the shortcut"],
  "framing-effect": ["Safe in gains", "Safe in losses"],
  "endowment-effect": ["Buy", "Sell"],
  "decoy-effect": ["A", "B"],
  "peak-end-rule": ["Repeat A"],
  "planning-fallacy": ["Reveal completion"],
  "median-voter": ["Count the votes"],
  "el-farol-bar": ["Go"],
  "tullock-contest": ["Draw a winner"],
};

for (const entry of atlasEntries)
  test(`${entry.id}: a player can make a choice and see feedback`, async ({
    page,
  }) => {
    await page.goto(`/effects/${entry.id}`);
    const board = page.getByRole("region", { name: `Play ${entry.name}` });
    await expect(board).toBeVisible();
    if (!firstMoves[entry.id]) {
      await page
        .getByRole("slider", { name: entry.controls[0].label })
        .press("End");
      await board.getByRole("button", { name: "Rise" }).click();
    } else {
      for (const name of firstMoves[entry.id])
        await board
          .getByRole("button", { name, exact: name !== "Machine 1" })
          .last()
          .click();
    }
    await expect(board.getByRole("status")).not.toHaveText(
      "Choose a move to see what happens.",
    );
    await page.getByRole("button", { name: "Reset", exact: true }).click();
    await expect(board.getByRole("status")).toHaveText(
      "Choose a move to see what happens.",
    );
  });
