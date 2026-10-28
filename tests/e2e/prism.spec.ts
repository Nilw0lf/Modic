import { test, expect, type Page } from "@playwright/test";
const board = (p: Page) => p.locator(".prism-board");
const click = (p: Page, name: string) =>
  board(p).getByRole("button", { name, exact: true }).click();
const stat = (p: Page, name: string) =>
  board(p)
    .locator(".simulation-stat")
    .filter({ has: p.getByText(name, { exact: true }) })
    .locator("dd");
const fill = (p: Page, label: string, value: string) =>
  board(p).getByLabel(label).fill(value);
const cases: Record<string, (p: Page) => Promise<void>> = {
  "doppler-effect": async (p) => {
    await fill(p, "Source velocity (m/s)", "114");
    expect(
      Number(await stat(p, "Observed frequency (Hz)").innerText()),
    ).toBeGreaterThan(650);
  },
  "snells-law": async (p) => {
    await click(p, "Direction: Air to glass");
    await fill(p, "Incident angle (degrees)", "50");
    await expect(stat(p, "Refracted angle")).toHaveText(
      "Total internal reflection",
    );
  },
  "inverse-square-law": async (p) => {
    await fill(p, "Distance from point source", "2");
    await expect(stat(p, "Selected intensity")).toHaveText("25.00");
    await expect(stat(p, "Spherical area ratio")).toHaveText("4.00");
  },
  "double-slit-interference": async (p) => {
    await fill(p, "Slit separation (mm)", "0.5");
    await expect(stat(p, "Two-slit fringe spacing (mm)")).toHaveText("1.10");
    await click(p, "One slit baseline");
  },
  "photoelectric-effect": async (p) => {
    await fill(p, "Photon wavelength (nm)", "800");
    await fill(p, "Relative photon flux", "10");
    await expect(stat(p, "Emission now")).toHaveText("None");
    await fill(p, "Photon wavelength (nm)", "400");
    await expect(stat(p, "Maximum energy if emitted (eV)")).toHaveText("1.10");
  },
  "ohms-law": async (p) => {
    await click(p, "Parallel");
    await expect(stat(p, "Equivalent resistance (Ω)")).toHaveText("5.00");
    await expect(stat(p, "Source current (A)")).toHaveText("2.40");
  },
  "kirchhoffs-laws": async (p) => {
    await fill(p, "Lower-right resistor R (Ω)", "30");
    await expect(stat(p, "Balanced")).toHaveText("Yes");
    expect(
      Math.abs(
        Number(await stat(p, "Bridge current left → right (A)").innerText()),
      ),
    ).toBeLessThan(0.0001);
  },
  "bernoulli-flow": async (p) => {
    await fill(p, "Second cross-section area (cm²)", "4");
    await expect(stat(p, "Second speed (m/s)")).toHaveText("2.50");
    await expect(stat(p, "Second ideal pressure (kPa)")).toHaveText("400.00");
  },
  "elastic-collision": async (p) => {
    await fill(p, "Cart B mass (kg)", "1");
    await click(p, "Resolve collision");
    await expect(stat(p, "A velocity (m/s)")).toHaveText("0.00");
    await expect(stat(p, "B velocity (m/s)")).toHaveText("4.00");
  },
  "archimedes-principle": async (p) => {
    await click(p, "Light oil");
    await expect(stat(p, "Outcome")).toHaveText("Neutral when submerged");
    await expect(stat(p, "Maximum supported mass (kg)")).toHaveText("8.00");
  },
  "island-biogeography": async (p) => {
    await click(p, "Run 20 model time units");
    await expect(stat(p, "Equilibrium richness")).toHaveText("66.67");
    await expect(stat(p, "Current richness index")).not.toHaveText("50.00");
  },
  metapopulation: async (p) => {
    await click(p, "Advance 20 model time units");
    await expect(stat(p, "Positive equilibrium")).toHaveText("0.600");
    await expect(stat(p, "Current occupied fraction")).not.toHaveText("0.300");
  },
  "trophic-cascade": async (p) => {
    await click(p, "Run 20 time units");
    await expect(stat(p, "Plant index")).not.toHaveText("60.00");
    await click(p, "Top predator: Present");
    await expect(stat(p, "Predator index")).toHaveText("0.00");
  },
  "hamiltons-rule": async (p) => {
    for (const yes of [true, false, true, false, true])
      await click(
        p,
        yes ? "Condition favours helping" : "Condition does not favour helping",
      );
    await expect(stat(p, "Correct under stated condition")).toHaveText("5");
  },
  "frequency-dependent-selection": async (p) => {
    await click(p, "Advance 10 generations");
    expect(
      Number(await stat(p, "Current A frequency").innerText()),
    ).toBeGreaterThan(0.4);
  },
  "binary-search": async (p) => {
    for (let i = 0; i < 6; i++) {
      const b = board(p).getByRole("button", {
        name: "Guess midpoint",
        exact: true,
      });
      if (await b.isDisabled()) break;
      await b.click();
    }
    await expect(stat(p, "Remaining range")).toContainText("Found");
    expect(Number(await stat(p, "Guesses").innerText())).toBeLessThanOrEqual(6);
  },
  "sorting-algorithms": async (p) => {
    await click(p, "Selection");
    for (let i = 0; i < 5; i++) await click(p, "Perform next pass");
    await expect(stat(p, "Key comparisons")).toHaveText("15");
    await expect(p.locator(".prism-cards span")).toHaveText([
      "1",
      "2",
      "3",
      "5",
      "7",
      "9",
    ]);
  },
  "huffman-coding": async (p) => {
    await fill(p, "Message using A to D", "AAAA");
    await expect(stat(p, "Message bits")).toHaveText("4");
    await expect(stat(p, "Fixed-width message bits")).toHaveText("8");
  },
  "consistent-hashing": async (p) => {
    await click(p, "Add server 50");
    await expect(stat(p, "Servers")).toHaveText("5");
    await expect(stat(p, "Keys moved from original ownership")).toHaveText("3");
  },
  "bloom-filter": async (p) => {
    await click(p, "Insert word");
    await fill(p, "Query word", "apple");
    await click(p, "Query membership");
    await expect(board(p)).toContainText(
      "Possibly present; exact teaching ledger: inserted",
    );
    await click(p, "Look for a false positive");
    await click(p, "Query membership");
    await expect(board(p)).toContainText(
      "Possibly present; exact teaching ledger: not inserted",
    );
  },
  "sampling-bias": async (p) => {
    await click(p, "Online only");
    await click(p, "Reveal population ledger");
    await expect(stat(p, "Support in selected frame")).toHaveText("75.0%");
    await expect(board(p)).toContainText("Population support is 65%");
  },
  "publication-bias": async (p) => {
    await click(p, "Open the file drawer");
    await expect(stat(p, "Visible studies")).toHaveText("100");
    await expect(p.locator(".prism-study-grid .shown")).toHaveCount(100);
  },
  "ecological-fallacy": async (p) => {
    await click(p, "Inspect individual-level cells");
    await expect(
      board(p)
        .getByRole("region", {
          name: "Counts reveal within-district comparisons",
        })
        .locator("tbody tr"),
    ).toHaveCount(4);
    await expect(board(p)).toContainText(
      "Within each district, access and passing are unrelated",
    );
  },
  "range-restriction": async (p) => {
    await fill(p, "Keep only |x| at most", "0.2");
    expect(
      Number(await stat(p, "Selected observations").innerText()),
    ).toBeLessThan(100);
  },
  "robust-statistics": async (p) => {
    await fill(p, "Seventh observation", "200");
    await expect(stat(p, "Arithmetic mean")).toHaveText("37.14");
    await expect(stat(p, "Median")).toHaveText("10.00");
  },
  "poisson-process": async (p) => {
    await click(p, "Reveal next minute");
    await expect(stat(p, "Minutes revealed")).toHaveText("1");
    await expect(stat(p, "Expected arrivals in this duration")).toHaveText(
      "2.0",
    );
  },
  "memoryless-property": async (p) => {
    await fill(p, "Failed attempts already observed", "30");
    await expect(stat(p, "Chance of success next attempt")).toHaveText("20.0%");
    await expect(
      stat(p, "Chance of at least one success in future window"),
    ).toHaveText("48.8%");
  },
  "randomised-response": async (p) => {
    await click(p, "Collect anonymous reports");
    await expect(stat(p, "Expected yes fraction")).toHaveText("0.450");
    await expect(stat(p, "Yes reports")).toContainText("/100");
  },
  "arcsine-law": async (p) => {
    await fill(p, "Walks in the batch", "40");
    const values = await board(p)
      .locator(".prism-bars output")
      .allTextContents();
    expect(values.reduce((s, v) => s + Number(v), 0)).toBe(40);
  },
  "bertrands-chord-paradox": async (p) => {
    await click(p, "Uniform radius");
    await click(p, "Draw 100 chords");
    await expect(stat(p, "Chords drawn")).toHaveText("100");
    await expect(stat(p, "Protocol probability")).toHaveText("1/2");
  },
  chunking: async (p) => {
    const digits = (await board(p).locator(".prism-code").innerText()).replace(
      /\D/g,
      "",
    );
    await click(p, "Hide digits and recall");
    await fill(p, "Recalled sequence", digits);
    await click(p, "Check sequence");
    await expect(stat(p, "Positions correct")).toHaveText("8 / 8");
  },
  "von-restorff-effect": async (p) => {
    await click(p, "Hide list and recall words");
    await fill(p, "Recalled words", "forest, harbour");
    await click(p, "Compare recall with list");
    await expect(
      board(p).locator("tbody tr").filter({ hasText: "forest" }),
    ).toHaveText("forestYesYes");
  },
  "dual-coding": async (p) => {
    await click(p, "Hide pairs and start recall");
    for (const w of ["harbour", "forest", "candle", "window"])
      await click(p, w);
    await expect(stat(p, "Pairs recalled correctly")).toHaveText("4 / 4");
  },
  "spacing-effect": async (p) => {
    for (let i = 0; i < 8; i++) await click(p, "Next study card");
    for (const w of ["harbour", "forest", "candle", "window"])
      await click(p, w);
    await expect(stat(p, "Correct code pairs")).toHaveText("4 / 4");
  },
  "prospective-memory": async (p) => {
    await click(p, "Begin the card task");
    const nums = [3, 8, 2, 7, 4, 1, 6, 9];
    for (let i = 0; i < 8; i++) {
      if (i === 2 || i === 6) await click(p, "Deliver parcel");
      await click(p, nums[i] % 2 ? "Odd" : "Even");
    }
    await expect(board(p).locator("tbody tr")).toHaveText("8/82/20");
  },
  "cognitive-dissonance": async (p) => {
    await fill(p, "Initial reported discomfort (1–5)", "5");
    await click(p, "Keep overtime commitment");
    await click(p, "Change the behaviour");
    await fill(p, "Reported discomfort after considering response (1–5)", "2");
    await expect(stat(p, "Your rating change")).toHaveText("-3");
  },
  "psychological-reactance": async (p) => {
    await board(p)
      .getByRole("group", { name: "Initial preference" })
      .getByRole("button", { name: "Tea", exact: true })
      .click();
    await click(p, "Controlling instruction");
    await board(p)
      .getByRole("group", { name: "Preference after message" })
      .getByRole("button", { name: "Coffee", exact: true })
      .click();
    await expect(stat(p, "Recorded preference change")).toHaveText(
      "Tea → Coffee",
    );
  },
  "choice-overload": async (p) => {
    await board(p)
      .getByRole("button", { name: /^Plan D/ })
      .click();
    await expect(stat(p, "Meets requirements")).toHaveText("Yes");
    await expect(stat(p, "Selected plan")).toHaveText("D");
  },
  "negativity-bias": async (p) => {
    await click(p, "Inspect feedback weighting");
    await fill(p, "Illustrative weight of the negative item", "5");
    await expect(stat(p, "Chosen weighted mean")).toHaveText("4.67");
  },
  "effort-discounting": async (p) => {
    await click(p, "Choose short route");
    for (let i = 0; i < 4; i++) await click(p, "Take next route step");
    await expect(stat(p, "Tokens earned")).toHaveText("6");
  },
  "correlated-equilibrium": async (p) => {
    await click(p, "Always go");
    await click(p, "Play next recommendation");
    await expect(stat(p, "Expected payoff under this policy")).toHaveText("−1");
    await expect(stat(p, "Rounds")).toHaveText("1");
  },
  "bayesian-persuasion": async (p) => {
    await click(p, "Set exact boundary: 3/7");
    await expect(stat(p, "Overall investment probability")).toHaveText("0.600");
    await fill(
      p,
      "Percent of bad states given a positive signal (rounded)",
      "50",
    );
    await expect(stat(p, "Overall investment probability")).toHaveText("0.000");
  },
  "cheap-talk": async (p) => {
    for (let i = 0; i < 6; i++) {
      const text = await board(p).locator(".prism-panel").innerText();
      await click(p, text.includes("High") ? "Choose high" : "Choose low");
    }
    const cells = await board(p)
      .locator("tbody tr td:last-child")
      .allTextContents();
    expect(cells.map(Number).reduce((a, b) => a + b, 0)).toBe(6);
  },
  "top-trading-cycles": async (p) => {
    await click(p, "Execute next top-trading cycle");
    await expect(stat(p, "People still active")).toHaveText("0");
    await expect(stat(p, "Finalised trades")).toHaveText("3");
  },
  "iterated-dominance": async (p) => {
    for (const name of [
      "Remove row B",
      "Remove column M",
      "Remove column R",
      "Remove row C",
    ])
      await click(p, name);
    await expect(board(p)).toContainText("Surviving profile: A, L.");
  },
  "solow-growth": async (p) => {
    await fill(p, "Saving share", "0.4");
    await expect(stat(p, "Consumption per worker")).toHaveText("0.60");
    await click(p, "Advance 10 periods");
    await expect(stat(p, "Steady-state capital")).toHaveText("16.00");
  },
  "expenditure-multiplier": async (p) => {
    await click(p, "Trace another spending round");
    await expect(stat(p, "Cumulative spending in shown rounds")).toHaveText(
      "32.00",
    );
    await expect(stat(p, "Infinite geometric-model total")).toHaveText("50.00");
  },
  "tax-incidence": async (p) => {
    await fill(p, "Tax per unit", "30");
    await expect(stat(p, "Buyer burden per unit")).toHaveText("10.00");
    await expect(stat(p, "Seller burden per unit")).toHaveText("20.00");
    await expect(stat(p, "Tax revenue")).toHaveText("700.00");
  },
  monopsony: async (p) => {
    await fill(p, "Workers hired L", "30");
    await click(p, "Reveal model benchmarks");
    await expect(stat(p, "Employer profit")).toHaveText("1350.00");
    await expect(stat(p, "Wage")).toHaveText("40.00");
  },
  "greshams-law": async (p) => {
    await click(p, "Low-metal coin");
    await expect(stat(p, "Commodity value retained")).toHaveText("1.52");
    await click(p, "Commodity-value pricing");
    await click(p, "High-metal coin");
    await expect(stat(p, "Commodity value retained")).toHaveText("1.40");
  },
  "put-call-parity": async (p) => {
    await click(p, "Call too expensive");
    await fill(p, "Terminal stock price", "0");
    await expect(stat(p, "Initial cost difference A − B")).toHaveText("3.00");
    await expect(stat(p, "Terminal payoff difference A − B")).toHaveText(
      "0.00",
    );
  },
  "covered-interest-parity": async (p) => {
    await fill(p, "Realised future spot (domestic / foreign)", "2.5");
    await expect(stat(p, "Foreign route terminal domestic value")).toHaveText(
      "105.00",
    );
    await click(p, "Forward hedge: On");
    await expect(stat(p, "Foreign route terminal domestic value")).toHaveText(
      "127.50",
    );
  },
  "insurance-deductibles": async (p) => {
    await fill(p, "Deductible", "0");
    await expect(stat(p, "Premium")).toHaveText("10.00");
    await expect(stat(p, "Certainty equivalent under log utility")).toHaveText(
      "90.00",
    );
  },
  "liquidity-mismatch": async (p) => {
    await fill(p, "Early withdrawal requests", "30");
    await click(p, "Settle withdrawals and maturity");
    await expect(stat(p, "Long assets liquidated at a discount")).toHaveText(
      "40.00",
    );
    await expect(stat(p, "Assets remaining at maturity")).toHaveText("0.00");
  },
  "drawdown-recovery": async (p) => {
    await click(p, "Lose 50%");
    await click(p, "Gain 50%");
    await expect(stat(p, "Current wealth")).toHaveText("75.00");
    await expect(stat(p, "Maximum historical drawdown")).toHaveText("50.0%");
  },
  "newsvendor-problem": async (p) => {
    await expect(
      stat(p, "Expected profit under stated distribution"),
    ).toHaveText("176.00");
    await click(p, "Commit order and open the kiosk");
    await expect(board(p)).toContainText("Realised demand:");
    await expect(board(p).getByLabel("Order quantity")).toBeDisabled();
  },
  "economic-order-quantity": async (p) => {
    await click(p, "Reveal EOQ benchmark");
    await expect(stat(p, "Total relevant cost")).toHaveText("580.00");
    await expect(board(p)).toContainText("219.09 units");
  },
  "kingmans-approximation": async (p) => {
    await fill(p, "Interarrival coefficient of variation", "0.5");
    await fill(p, "Service-time coefficient of variation", "0.5");
    await expect(stat(p, "Approximate mean queue wait (minutes)")).toHaveText(
      "1.17",
    );
  },
  "wrights-law": async (p) => {
    await click(p, "Double cumulative production");
    await click(p, "Double cumulative production");
    await expect(stat(p, "Cumulative production")).toHaveText("4");
    await expect(stat(p, "Unit-cost index")).toHaveText("640.00");
  },
  "shortest-job-first": async (p) => {
    await click(p, "Use shortest-job-first");
    await expect(stat(p, "Mean wait among queued jobs")).toHaveText("4.40");
    await expect(stat(p, "Full schedule makespan")).toHaveText("20");
  },
  "strength-of-weak-ties": async (p) => {
    await click(p, "Remove weak bridge 3–4");
    await expect(stat(p, "People reachable from person 1")).toHaveText("3");
    await click(p, "Remove strong local edge 1–2");
    await expect(stat(p, "People reachable from person 1")).toHaveText("6");
  },
  "bounded-confidence": async (p) => {
    await fill(p, "Confidence bound ε", "1");
    await click(p, "Average for five rounds");
    await expect(stat(p, "Opinion range")).toHaveText("0.000");
    await expect(stat(p, "Confidence components now")).toHaveText("1");
  },
  "voter-model": async (p) => {
    await click(p, "Copy one neighbour");
    await expect(stat(p, "Updates")).toHaveText("1");
    expect(Number(await stat(p, "B count").innerText())).toBeGreaterThanOrEqual(
      3,
    );
  },
  "degroot-learning": async (p) => {
    await click(p, "Exchange beliefs for five rounds");
    await click(p, "Agent A: Averaging");
    await click(p, "Exchange beliefs for five rounds");
    await expect(stat(p, "A belief")).toHaveText("0.000");
    await expect(stat(p, "Averaging-network consensus limit")).toHaveText(
      "0.000",
    );
  },
  homophily: async (p) => {
    await fill(p, "Same-group preference", "1");
    await expect(stat(p, "Within-group connection probability")).toHaveText(
      "0.80",
    );
    await expect(stat(p, "Cross-group connection probability")).toHaveText(
      "0.15",
    );
  },
  "brain-in-a-vat": async (p) => {
    for (let i = 0; i < 3; i++) await click(p, "Inspect another experience");
    await click(p, "These stipulated clues do not distinguish them");
    await expect(board(p).locator("tbody tr")).toHaveCount(3);
    await expect(board(p)).toContainText(
      "Your interpretation: These stipulated clues do not distinguish them",
    );
  },
  "twin-earth": async (p) => {
    await click(p, "Inspect stipulated chemistry");
    await click(p, "Environment helps fix reference");
    await expect(board(p)).toContainText("Composition: XYZ (stipulated)");
    await expect(board(p)).toContainText(
      "Position recorded: Environment helps fix reference",
    );
  },
  "non-identity-problem": async (p) => {
    await click(p, "Identity comparison: Different future people");
    await click(p, "Prefer clean");
    await expect(board(p)).toContainText("With the same person in both rows");
    await expect(
      board(p).getByRole("button", { name: "Prefer clean", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  },
  "utility-monster": async (p) => {
    await fill(p, "Tokens allocated to monster", "10");
    await expect(stat(p, "Total utility")).toHaveText("100");
    await click(p, "Allocation cap: None");
    await expect(stat(p, "Total utility")).toHaveText("44");
  },
  "new-riddle-of-induction": async (p) => {
    await click(p, "Observe another emerald before T");
    await click(p, "Consider first observation after T");
    await expect(board(p).locator("tbody tr").nth(1)).toHaveText("GrueYesBlue");
  },
};
for (const [slug, play] of Object.entries(cases))
  test(`${slug}: meaningful interaction, exact reset and usable guide`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/effects/" + slug);
    const b = board(page);
    await expect(b).toBeVisible();
    const initial = await b.innerText();
    await play(page);
    await expect(page.locator(".reading-scenario li")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Reset", exact: true }).click();
    await expect(b).toHaveText(initial, { useInnerText: true });
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
