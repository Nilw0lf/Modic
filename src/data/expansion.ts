import type { Effect, Thinker } from "@/types/catalog";

export type Control = {
  key: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  suffix?: string;
};
type Entry = {
  id: string;
  name: string;
  description: string;
  categories: string[];
  title: string;
  question: string;
  controls: Control[];
  challenge: string;
  preset: Record<string, number>;
  idea: string;
  mechanism: string;
  example: string;
  limitation: string;
  source: { title: string; url: string };
  thinker?: string;
  format?: Effect["experimentType"];
};

export const newExperiments: Entry[] = [
  {
    id: "monty-hall",
    name: "Monty Hall Problem",
    description:
      "A host who knows the answer changes what an open door tells you.",
    categories: ["probability", "decisions"],
    title: "Three doors. One informed host.",
    question:
      "Pick a door, watch the host reveal a goat, then stay or switch. Compare both strategies across many games.",
    controls: [
      {
        key: "trials",
        label: "Batch games",
        min: 100,
        max: 5000,
        step: 100,
        value: 1000,
      },
    ],
    challenge: "Run a larger batch",
    preset: { trials: 5000 },
    idea: "Your first choice wins one time in three. An informed host always opens an unchosen goat door and always offers a switch. Switching wins precisely when your first choice was wrong.",
    mechanism:
      "The prize is uniform across three doors. If the host has a choice of goat doors, the host chooses randomly. Batch results evaluate staying and switching on the same games; their wins sum to the number of games.",
    example:
      "When interpreting an interview shortlist or a revealed clue, ask how the information was selected. A deliberate reveal and an accidental observation can support different inferences.",
    limitation:
      "The two-thirds switching result depends on this host policy. A host who sometimes reveals the prize or selectively offers a switch changes the problem.",
    source: {
      title: "David Aldous — The role of modelling in Monty Hall",
      url: "https://www.stat.berkeley.edu/~aldous/Real-World/Monty-Hall.html",
    },
    format: "game",
  },
  {
    id: "birthday-paradox",
    name: "Birthday Paradox",
    description: "A small room contains far more possible pairs than people.",
    categories: ["probability"],
    title: "How many people until a match?",
    question:
      "Build a room of people and compare its birthdays with 1,000 simulated rooms.",
    controls: [
      {
        key: "people",
        label: "People in the room",
        min: 2,
        max: 80,
        value: 23,
      },
    ],
    challenge: "Try a room of 50",
    preset: { people: 50 },
    idea: "A shared birthday can occur between any two people. At 23 people there are 253 pairs, and the probability of at least one match is about 50.7% under a uniform 365-day model.",
    mechanism:
      "Exact probability = 1 − product of (365 − i)/365 for i = 0 through n − 1. The sample draws 1,000 independent rooms; the displayed room highlights repeated day numbers. Pair count is n(n − 1)/2.",
    example:
      "The same collision logic helps explain why duplicate short identifiers can appear surprisingly early in a growing database.",
    limitation:
      "Real birthdays are seasonal and not independent for every group; leap days are excluded. A match with your own birthday is a different question.",
    source: {
      title: "Grinstead & Snell — The birthday problem, Section 3.1",
      url: "https://www.stat.berkeley.edu/~aldous/134/grinstead.pdf#page=85",
    },
  },
  {
    id: "law-of-large-numbers",
    name: "Law of Large Numbers",
    description:
      "More observations can stabilize an average without making the next outcome predictable.",
    categories: ["probability", "risk"],
    thinker: "bernoulli",
    title: "Let the observations accumulate.",
    question:
      "Toss a biased coin and follow the running share of heads. Resample to see another possible history.",
    controls: [
      {
        key: "chance",
        label: "Chance of heads",
        min: 0,
        max: 100,
        value: 50,
        suffix: "%",
      },
      {
        key: "trials",
        label: "Tosses",
        min: 10,
        max: 5000,
        step: 10,
        value: 500,
      },
    ],
    challenge: "Collect 5,000 tosses",
    preset: { trials: 5000 },
    idea: "For independent tosses with the same success probability, the observed proportion becomes increasingly likely to lie near that probability as the sample grows.",
    mechanism:
      "Each seeded uniform draw is counted as heads when it is below p. The curve shows cumulative heads divided by toss count, with a horizontal reference at p. Absolute counts can drift even as proportions stabilize.",
    example:
      "Estimate a product defect rate from a larger representative sample. More data reduces sampling noise, but it cannot repair a biased sampling process.",
    limitation:
      "The next toss never compensates for previous tosses. The displayed path need not approach its target monotonically. Dependence and changing probabilities require different assumptions.",
    source: {
      title: "Grinstead & Snell — Introduction to Probability, Chapter 8",
      url: "https://www.stat.berkeley.edu/~aldous/134/grinstead.pdf",
    },
  },
  {
    id: "compound-growth",
    name: "Compound Growth",
    description: "Small repeated changes build on everything that came before.",
    categories: ["markets", "decisions"],
    title: "Growth earns growth.",
    question:
      "Compare reinvested growth with simple interest on the same starting amount, then account for inflation.",
    controls: [
      {
        key: "rate",
        label: "Annual growth",
        min: 0,
        max: 15,
        value: 6,
        suffix: "%",
      },
      { key: "years", label: "Years", min: 1, max: 50, value: 30 },
      {
        key: "inflation",
        label: "Annual inflation",
        min: 0,
        max: 10,
        value: 2,
        suffix: "%",
      },
    ],
    challenge: "Remove growth",
    preset: { rate: 0 },
    idea: "Compounding applies each period's change to the current total. The gap from simple interest widens with time because earlier gains also earn gains.",
    mechanism:
      "Starting with 1,000 units, nominal balance is 1,000(1+r)^t; simple interest is 1,000(1+rt). Purchasing power divides the nominal balance by (1+inflation)^t. Rates are fixed and there are no deposits.",
    example:
      "Compare long-term savings scenarios, or explore how a recurring percentage increase changes a bill over time.",
    limitation:
      "This is arithmetic under assumed constant rates, not an investment forecast. Taxes, fees, changing inflation and uncertain returns are excluded.",
    source: {
      title: "Investor.gov — Compound interest",
      url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest",
    },
    format: "calculator",
  },
  {
    id: "diminishing-returns",
    name: "Diminishing Returns",
    description:
      "Adding one more input can produce less extra output than the one before.",
    categories: ["markets", "decisions"],
    title: "One kitchen. How many cooks?",
    question:
      "Staff a kitchen with fixed equipment. Compare the next worker's contribution with the wage you must pay.",
    controls: [
      { key: "workers", label: "Workers", min: 1, max: 20, value: 6 },
      {
        key: "capacity",
        label: "Kitchen capacity",
        min: 40,
        max: 200,
        step: 10,
        value: 100,
      },
      { key: "wage", label: "Wage per worker", min: 0, max: 40, value: 12 },
    ],
    challenge: "Double the kitchen capacity",
    preset: { capacity: 200 },
    idea: "With equipment fixed, additional workers eventually add less output. Diminishing marginal output does not mean total output is falling.",
    mechanism:
      "Output Q(L) = capacity × (1 − exp(−L/5)). Each meal sells for one unit. Profit is Q(L) − wage × L. The next-worker statistic is Q(L+1) − Q(L), while the chart compares revenue and labour cost for 0–20 workers.",
    example:
      "A café can compare hiring another cook with investing in more equipment. The important comparison is the extra output against the extra cost.",
    limitation:
      "This concave production curve is imposed for teaching. Real teams can initially improve through specialization, and bottlenecks can create abrupt changes.",
    source: {
      title: "OpenStax — Production in the short run",
      url: "https://openstax.org/books/principles-economics-2e/pages/7-2-production-in-the-short-run",
    },
    format: "calculator",
  },
  {
    id: "opportunity-cost",
    name: "Opportunity Cost",
    description:
      "Choosing one useful thing means giving up another useful thing.",
    categories: ["decisions", "markets"],
    title: "Give your next hour a job.",
    question:
      "Allocate eight hours between paid work and learning. Explore what one extra hour of work costs in learning output.",
    controls: [
      { key: "work", label: "Hours of paid work", min: 0, max: 8, value: 4 },
      { key: "pay", label: "Pay per hour", min: 5, max: 60, value: 20 },
      {
        key: "learning",
        label: "Learning productivity",
        min: 1,
        max: 10,
        value: 5,
      },
    ],
    challenge: "Spend the day learning",
    preset: { work: 0 },
    idea: "The opportunity cost of a choice is the value of the best alternative forgone. It can be time, knowledge, money or another outcome that matters to you.",
    mechanism:
      "The frontier plots earnings = wage × work hours against learning output = productivity × sqrt(8 − work hours). Moving toward more earnings leaves less learning time. Units are distinct; the chart does not claim they are equally valuable.",
    example:
      "Choosing a freelance project uses hours that could go toward a course. The right choice depends on how you value both outputs, not only on the cash offered.",
    limitation:
      "The day is fixed at eight hours and learning has diminishing returns. Rest, deadlines and future benefits of learning are outside this one-day model.",
    source: {
      title: "OpenStax — Production possibilities and social choices",
      url: "https://openstax.org/books/principles-economics-2e/pages/2-2-the-production-possibilities-frontier-and-social-choices",
    },
    format: "calculator",
  },
  {
    id: "sunk-cost-fallacy",
    name: "Sunk Cost Fallacy",
    description:
      "Money already spent can pull a decision away from what happens next.",
    categories: ["behavior", "decisions"],
    thinker: "thaler",
    title: "Would you fund the next step?",
    question:
      "Decide whether to finish a project. Change what was already spent and watch which decision quantities actually move.",
    controls: [
      {
        key: "sunk",
        label: "Already spent",
        min: 0,
        max: 100,
        step: 5,
        value: 50,
      },
      {
        key: "cost",
        label: "Cost to finish",
        min: 0,
        max: 100,
        step: 5,
        value: 40,
      },
      {
        key: "reward",
        label: "Revenue if successful",
        min: 0,
        max: 200,
        step: 5,
        value: 100,
      },
      {
        key: "success",
        label: "Success chance",
        min: 0,
        max: 100,
        value: 50,
        suffix: "%",
      },
    ],
    challenge: "Make the past expense enormous",
    preset: { sunk: 100 },
    idea: "An unrecoverable past cost is common to both choices. A forward-looking comparison asks whether the next expenditure improves the outcome relative to stopping now.",
    mechanism:
      "Stopping gives a lifetime net result of −sunk. Continuing has expected lifetime result p × revenue − remaining cost − sunk. The difference is p × revenue − remaining cost, independent of sunk expense.",
    example:
      "A team considering another development milestone should compare its future cost with its future benefit. A large historical budget alone does not justify continuing.",
    limitation:
      "Risk neutrality, zero salvage value and no alternative project are assumed. Reputation, contractual obligations and information value can matter in an actual decision.",
    source: {
      title: "Richard Thaler — Research on sunk costs and self-control",
      url: "https://www.nobelprize.org/prizes/economic-sciences/2017/thaler/biographical/",
    },
    format: "thought-experiment",
  },
  {
    id: "anchoring-bias",
    name: "Anchoring Bias",
    description:
      "An initial number can keep pulling an estimate toward itself.",
    categories: ["behavior", "decisions"],
    thinker: "kahneman",
    title: "The first price leaves a trace.",
    question:
      "Keep comparable prices fixed while changing an asking price. See how incomplete adjustment distorts a toy estimate.",
    controls: [
      {
        key: "anchor",
        label: "Initial asking price",
        min: 20,
        max: 200,
        step: 5,
        value: 150,
      },
      {
        key: "adjust",
        label: "Adjustment toward evidence",
        min: 0,
        max: 100,
        value: 40,
        suffix: "%",
      },
    ],
    challenge: "Use the evidence completely",
    preset: { adjust: 100 },
    idea: "Judgment can remain influenced by an initial value even when better evidence is available. This demonstration makes the adjustment rule visible; it does not measure your susceptibility.",
    mechanism:
      "Comparable items have a fixed evidence-based estimate of 80 units. The toy estimate is anchor + adjustment × (80 − anchor). At full adjustment the anchor has no effect; at zero adjustment the estimate equals the asking price.",
    example:
      "When evaluating a used bicycle, gather comparable sales before considering the seller's asking price. This gives your estimate an independent starting point.",
    limitation:
      "A linear adjustment rule is an illustration, not a fitted psychological law. Some anchors contain useful information and responses differ across people and contexts.",
    source: {
      title: "Tversky & Kahneman — Judgment under uncertainty (1974)",
      url: "https://doi.org/10.1126/science.185.4157.1124",
    },
    format: "thought-experiment",
  },
  {
    id: "confirmation-bias",
    name: "Confirmation Bias",
    description:
      "Tests that agree with a theory may leave its strongest rivals untouched.",
    categories: ["behavior", "decisions"],
    title: "Can you break your own rule?",
    question:
      "The sequence 2, 4, 6 fits a hidden rule. Submit your own triples, then test an alternative explanation before revealing the rule.",
    controls: [],
    challenge: "Try 1, 2, 9",
    preset: {},
    idea: "Confirming examples can fit several explanations at once. A useful test is one on which competing hypotheses disagree.",
    mechanism:
      "The hidden rule accepts any three strictly increasing numbers. Each submitted triple receives truthful yes/no feedback. The tally records tests and rejections; the rule can be revealed when you are ready.",
    example:
      "A product team convinced that discounts cause purchases should also seek situations that could contradict that explanation, rather than collecting only successful campaigns.",
    limitation:
      "This recreates the structure of a classic reasoning task, not an assessment of your personality. In real research, evidence is noisy and hypotheses may be much harder to distinguish.",
    source: {
      title: "Peter Wason — On the failure to eliminate hypotheses (1960)",
      url: "https://doi.org/10.1080/17470216008416717",
    },
    format: "game",
  },
  {
    id: "present-bias",
    name: "Present Bias",
    description:
      "An immediate reward can outweigh a larger future one—and reverse an earlier plan.",
    categories: ["behavior", "decisions"],
    thinker: "thaler",
    title: "Tomorrow's plan meets today's temptation.",
    question:
      "Compare 50 units now with a larger delayed reward. Then shift both rewards into the future.",
    controls: [
      { key: "later", label: "Later reward", min: 50, max: 120, value: 80 },
      { key: "delay", label: "Extra waiting days", min: 1, max: 30, value: 7 },
      {
        key: "beta",
        label: "Weight on future rewards",
        min: 20,
        max: 100,
        value: 60,
        suffix: "%",
      },
      {
        key: "offset",
        label: "Days until early reward",
        min: 0,
        max: 30,
        value: 0,
      },
    ],
    challenge: "Move both rewards a week ahead",
    preset: { offset: 7 },
    idea: "Some preferences change when a reward becomes immediate. Planning ahead can favour patience even when the same wait feels unattractive in the moment.",
    mechanism:
      "This quasi-hyperbolic model values an immediate reward at its face value and a reward t days away at beta × 0.99^t × amount. Shifting both rewards into the future applies beta to both.",
    example:
      "A commitment made in advance can help protect a study plan from immediate entertainment. This model lets you inspect the preference reversal behind that intuition.",
    limitation:
      "The weights are chosen assumptions, not a measurement of a person. Real delay choices also depend on trust, need and uncertainty about receiving a reward.",
    source: {
      title: "Nobel committee — Thaler and behavioural economics",
      url: "https://www.nobelprize.org/uploads/2018/06/advanced-economicsciences2017-1.pdf",
    },
    format: "thought-experiment",
  },
  {
    id: "forgetting-curve",
    name: "Forgetting Curve",
    description:
      "Memory fades, and the timing of review changes what remains available later.",
    categories: ["behavior", "decisions"],
    thinker: "ebbinghaus",
    title: "Make the next review count.",
    question:
      "Compare a single study session with regularly spaced reviews over a month.",
    controls: [
      {
        key: "interval",
        label: "Days between reviews",
        min: 1,
        max: 14,
        value: 7,
      },
      {
        key: "strength",
        label: "Initial memory timescale",
        min: 1,
        max: 10,
        value: 3,
        suffix: " days",
      },
      {
        key: "boost",
        label: "Strength gain per review",
        min: 0,
        max: 100,
        value: 40,
        suffix: "%",
      },
    ],
    challenge: "Review every three days",
    preset: { interval: 3 },
    idea: "Ebbinghaus studied how retention changed with time. Reviews can restore accessibility; this experiment explores one simplified way repeated study might slow later forgetting.",
    mechanism:
      "Retention is exp(−time since review / strength). A review resets retention to 100% and multiplies strength by 1 + boost. Reviews occur on the chosen interval, strictly before day 30; the comparison has no reviews.",
    example:
      "Use the chart to think about revision timing for vocabulary or procedures. Compare review effort with what the model retains on the final day.",
    limitation:
      "This exponential curve and multiplicative review benefit are teaching assumptions, not Ebbinghaus's fitted curve or a validated scheduling algorithm. Familiarity, sleep and retrieval success are omitted.",
    source: {
      title: "Hermann Ebbinghaus — Memory, retention and forgetting",
      url: "https://psychclassics.yorku.ca/Ebbinghaus/memory7.htm",
    },
  },
  {
    id: "tragedy-of-the-commons",
    name: "Tragedy of the Commons",
    description:
      "Shared resources depend on both individual demand and the rules people build together.",
    categories: ["complexity", "games"],
    thinker: "ostrom",
    title: "Can the lake keep giving?",
    question:
      "Run a fishery for 40 seasons. Compare open harvesting with a rule limiting the catch to this season's regrowth.",
    controls: [
      {
        key: "harvest",
        label: "Requested catch per season",
        min: 0,
        max: 40,
        value: 25,
      },
      {
        key: "growth",
        label: "Regrowth rate",
        min: 5,
        max: 80,
        value: 40,
        suffix: "%",
      },
      {
        key: "rule",
        label: "Compliance with catch limit",
        min: 0,
        max: 100,
        value: 0,
        suffix: "%",
      },
    ],
    challenge: "Apply the catch limit fully",
    preset: { rule: 100 },
    idea: "A renewable resource can be depleted when withdrawal exceeds replenishment. Ostrom's work shows why institutions and local cooperation matter; collapse is not an inevitable property of sharing.",
    mechanism:
      "The lake starts at 80 fish units, with capacity 100. Each season regrowth is r × stock × (1 − stock/100). Catch blends unrestricted demand with min(demand, regrowth), according to compliance, then is capped at available stock.",
    example:
      "A shared irrigation system needs withdrawals that account for replenishment. Rules can change the resource trajectory even when individual demand stays the same.",
    limitation:
      "Compliance is imposed, not explained. Real institutions require monitoring, legitimacy and enforcement; real ecosystems have uncertain growth and shocks. This is a stock-flow model, not a fishery forecast.",
    source: {
      title: "Elinor Ostrom — Beyond markets and states",
      url: "https://www.nobelprize.org/uploads/2018/06/ostrom_lecture.pdf",
    },
  },
  {
    id: "prisoners-dilemma",
    name: "Prisoner’s Dilemma",
    description: "A tempting individual move can leave both players worse off.",
    categories: ["games", "decisions"],
    thinker: "axelrod",
    title: "Play again. Does cooperation survive?",
    question:
      "Choose your move against a strategy, or compare automated strategies over repeated rounds.",
    controls: [
      {
        key: "rounds",
        label: "Batch rounds",
        min: 10,
        max: 200,
        step: 10,
        value: 50,
      },
      {
        key: "noise",
        label: "Chance a move is flipped",
        min: 0,
        max: 30,
        value: 0,
        suffix: "%",
      },
    ],
    challenge: "Add mistakes",
    preset: { noise: 10 },
    idea: "Both players would benefit from mutual cooperation, yet each can gain by defecting in a single round. Repeated encounters make reputation and reciprocity relevant.",
    mechanism:
      "Mutual cooperation pays 3 each; mutual defection pays 1 each. A lone defector receives 5 and the cooperator 0. Tit for tat starts with cooperation, then copies the opponent's previous actual move. Noise independently flips each intended move.",
    example:
      "Recurring supplier relationships can reward reliability, while short-term incentives reward cutting corners. Try how reciprocal strategies respond to mistakes.",
    limitation:
      "The payoff table and strategies are fixed. This experiment does not establish one universally best strategy; communication, forgiveness and the end of a relationship can change outcomes.",
    source: {
      title: "Robert Axelrod — The Evolution of Cooperation",
      url: "https://www-personal.umich.edu/~axe/research/Axelrod%20and%20Hamilton%20EC%201981.pdf",
    },
    format: "game",
  },
  {
    id: "schelling-segregation",
    name: "Schelling’s Segregation Model",
    description:
      "Local preferences can produce a larger pattern that nobody explicitly chose.",
    categories: ["complexity", "behavior"],
    thinker: "schelling",
    title: "Small preferences. Changing neighbourhoods.",
    question:
      "Move through successive rounds in a toy neighbourhood. Blue circles and orange squares seek enough neighbours of their own group.",
    controls: [
      {
        key: "threshold",
        label: "Desired share of similar neighbours",
        min: 0,
        max: 100,
        step: 5,
        value: 35,
        suffix: "%",
      },
      { key: "rounds", label: "Rounds of moves", min: 0, max: 30, value: 8 },
    ],
    challenge: "Remove the preference",
    preset: { threshold: 0 },
    idea: "Schelling explored how individual rules can generate aggregate patterns. Even a preference that does not demand complete separation can produce clustering through repeated moves.",
    mechanism:
      "A bounded 16 × 16 grid begins with equal groups and 20% vacancies. An agent is unhappy if the share of like neighbours among occupied adjacent cells is below its threshold. In shuffled order, unhappy agents move to a random vacancy; new sites need not immediately satisfy them.",
    example:
      "Use the model to distinguish individual intentions from collective outcomes in neighbourhood or organisational clustering.",
    limitation:
      "This toy model omits discrimination, wealth, housing supply, policy and history. It cannot explain real segregation on its own. Agents with no occupied neighbours are treated as satisfied.",
    source: {
      title: "Nobel committee — Schelling, micromotives and macrobehavior",
      url: "https://www.nobelprize.org/uploads/2018/06/popular-economicsciences2005.pdf",
    },
    format: "agent-model",
  },
  {
    id: "butterfly-effect",
    name: "Butterfly Effect",
    description:
      "Tiny differences in starting conditions can grow into very different trajectories.",
    categories: ["complexity", "probability"],
    thinker: "lorenz",
    title: "Almost the same beginning.",
    question:
      "Compare two logistic-map populations that begin a tiny distance apart. Change the growth parameter to compare stable and chaotic behaviour.",
    controls: [
      {
        key: "rate",
        label: "Growth parameter",
        min: 2.5,
        max: 4,
        step: 0.01,
        value: 3.9,
      },
      {
        key: "epsilon",
        label: "Initial difference (millionths)",
        min: 0,
        max: 100,
        value: 1,
      },
      { key: "steps", label: "Generations", min: 10, max: 100, value: 60 },
    ],
    challenge: "Try a stable regime",
    preset: { rate: 2.8 },
    idea: "Lorenz's work brought attention to sensitive dependence on initial conditions. A deterministic rule can still have a limited practical prediction horizon.",
    mechanism:
      "The logistic map is x(t+1) = r × x(t) × (1 − x(t)). Starting values are 0.4 and 0.4 + epsilon/1,000,000. Both use the same parameter. The chart shows normalized population for each generation, not Lorenz's atmospheric equations.",
    example:
      "Small measurement errors can matter greatly when forecasting a nonlinear system. Comparing regimes shows why that sensitivity is not equally strong everywhere.",
    limitation:
      "This one-dimensional toy map is not a weather forecast. Some parameter values have stable cycles; deterministic chaos is different from independent random noise.",
    source: {
      title: "Edward Lorenz — Deterministic Nonperiodic Flow (1963)",
      url: "https://journals.ametsoc.org/view/journals/atsc/20/2/1520-0469_1963_020_0130_dnf_2_0_co_2.xml",
    },
  },
];

export const expansionEffects: Effect[] = newExperiments.map((e) => ({
  id: e.id,
  slug: e.id,
  name: e.name,
  shortDescription: e.description,
  categoryIds: e.categories,
  thinkerRelationships: e.thinker
    ? [
        {
          id: `${e.id}-${e.thinker}`,
          thinkerId: e.thinker,
          relationship: "DISCUSSED",
          editorialStatus: "verified",
          sources: [e.source.url],
        },
      ]
    : [],
  status: "live",
  difficulty: [
    "schelling-segregation",
    "butterfly-effect",
    "prisoners-dilemma",
  ].includes(e.id)
    ? "intermediate"
    : "intuitive",
  simulationType: e.id,
  experimentType: e.format ?? "simulation",
  relatedEffectIds: e.categories.includes("behavior")
    ? ["base-rate", "regression"]
    : e.categories.includes("complexity")
      ? ["network", "power-laws"]
      : ["ruin", "base-rate"],
}));

export const expansionThinkers: Thinker[] = [
  {
    id: "thaler",
    slug: "richard-thaler",
    name: "Richard Thaler",
    description:
      "Economist and author of Misbehaving and coauthor of Nudge, known for bringing psychological evidence into economics, including mental accounting and self-control.",
    areaIds: ["behavior", "decisions"],
  },
  {
    id: "ostrom",
    slug: "elinor-ostrom",
    name: "Elinor Ostrom",
    description:
      "Political economist and author of Governing the Commons, known for research on how communities build institutions to manage shared resources.",
    areaIds: ["games", "complexity"],
  },
  {
    id: "axelrod",
    slug: "robert-axelrod",
    name: "Robert Axelrod",
    description:
      "Political scientist and author of The Evolution of Cooperation, whose tournaments explored reciprocal strategies in repeated social dilemmas.",
    areaIds: ["games", "decisions"],
  },
  {
    id: "schelling",
    slug: "thomas-schelling",
    name: "Thomas Schelling",
    description:
      "Economist and author of Micromotives and Macrobehavior and The Strategy of Conflict, known for studying how individual decisions generate collective outcomes.",
    areaIds: ["games", "complexity"],
  },
  {
    id: "ebbinghaus",
    slug: "hermann-ebbinghaus",
    name: "Hermann Ebbinghaus",
    description:
      "Psychologist and author of Memory: A Contribution to Experimental Psychology, a pioneering experimental investigation of learning and forgetting.",
    areaIds: ["behavior"],
  },
  {
    id: "lorenz",
    slug: "edward-lorenz",
    name: "Edward Lorenz",
    description:
      "Meteorologist and author of The Essence of Chaos, whose research helped establish the importance of sensitive dependence on initial conditions.",
    areaIds: ["complexity", "probability"],
  },
  {
    id: "bernoulli",
    slug: "jacob-bernoulli",
    name: "Jacob Bernoulli",
    description:
      "Mathematician and author of Ars Conjectandi, which included an early proof of the law of large numbers for repeated binary trials.",
    areaIds: ["probability"],
  },
];

export const expansionArticles = Object.fromEntries(
  newExperiments.map((e) => [
    e.id,
    {
      explanationTitle: e.title,
      explanation: [e.idea],
      sections: [{ title: "Inside this model", paragraphs: [e.mechanism] }],
      examples: [{ title: "A practical use", text: e.example }],
      limitations: [e.limitation],
      furtherReading:
        "Explore the original research or the teaching reference behind this experiment.",
      readingLinks: [e.source],
    },
  ]),
);
