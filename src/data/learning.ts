import { catalogExperiments } from "./expansion";

export const learningCollections = [
  {
    title: "Play the strategic tradeoff",
    description:
      "Match partners, allocate a budget, and compare the costs of waiting and competing.",
    slugs: [
      "stable-matching",
      "battle-of-the-sexes",
      "colonel-blotto",
      "war-of-attrition",
      "cournot-competition",
      "stackelberg-competition",
      "bertrand-competition",
    ],
  },
  {
    title: "Question the algorithm",
    description:
      "Investigate fairness, privacy, and feedback before calling a system smart or efficient.",
    slugs: [
      "algorithmic-fairness",
      "differential-privacy",
      "performative-prediction",
      "price-of-anarchy",
      "complex-contagion",
    ],
  },
  {
    title: "Notice what attention misses",
    description:
      "Count, compare, and rate your own experience without turning a game into a diagnosis.",
    slugs: [
      "inattentional-blindness",
      "change-blindness",
      "mere-exposure-effect",
    ],
  },
  {
    title: "Play the surprising odds",
    description: "Race patterns, compare dice and trace the shape of chance.",
    slugs: [
      "penneys-game",
      "nontransitive-dice",
      "st-petersburg-paradox",
      "galton-board",
      "polya-urn",
    ],
  },
  {
    title: "Check the tempting answer",
    description:
      "Test rules and separate first impressions from relevant evidence.",
    slugs: [
      "wason-selection",
      "cognitive-reflection",
      "recognition-heuristic",
      "affect-heuristic",
      "scope-insensitivity",
    ],
  },
  {
    title: "Learn by trying",
    description: "Explore memory, retrieval, attachment and perceived control.",
    slugs: [
      "serial-position-effect",
      "testing-effect",
      "ikea-effect",
      "barnum-effect",
      "illusion-of-control",
    ],
  },
  {
    title: "Think a move ahead",
    description: "Inspect incentives, predictions and strategic positions.",
    slugs: [
      "nim",
      "dollar-auction",
      "travelers-dilemma",
      "newcomb-problem",
      "hawk-dove",
    ],
  },
  {
    title: "Connect the moving parts",
    description:
      "Build routes, spread a concentration and compare resilient arrangements.",
    slugs: [
      "percolation",
      "small-world-shortcuts",
      "diffusion",
      "series-parallel-reliability",
      "hysteresis",
    ],
  },
  {
    title: "Read a changing result",
    description:
      "Investigate collective choices, unequal shares, feedback and evidence.",
    slugs: [
      "condorcet-cycle",
      "alabama-paradox",
      "gini-coefficient",
      "cobweb-model",
      "bayesian-updating",
    ],
  },
  {
    title: "Notice the hidden nudge",
    description:
      "Explore attention, first impressions and the way choices are presented.",
    slugs: [
      "stroop-effect",
      "fitts-law",
      "hicks-law",
      "halo-effect",
      "default-effect",
    ],
  },
  {
    title: "Check your judgment",
    description:
      "Test stories, headlines, budgets and confidence with short decision games.",
    slugs: [
      "conjunction-fallacy",
      "availability-heuristic",
      "mental-accounting",
      "zero-risk-bias",
      "dunning-kruger-effect",
    ],
  },
  {
    title: "Look at the whole system",
    description:
      "Separate selection, accumulation and shared errors from the headline result.",
    slugs: [
      "berksons-paradox",
      "friendship-paradox",
      "wisdom-of-crowds",
      "random-walk",
      "stocks-and-flows",
    ],
  },
  {
    title: "Choose with other people",
    description:
      "Buy useful information, combine risks and find where other choices affect yours.",
    slugs: [
      "value-of-information",
      "diversification",
      "tragedy-of-the-anticommons",
      "minority-game",
      "rock-paper-scissors",
    ],
  },
  {
    title: "Play with uncertainty",
    description:
      "Search, experiment, collect, and test your intuition about chance.",
    slugs: [
      "secretary-problem",
      "multi-armed-bandit",
      "coupon-collector",
      "gamblers-fallacy",
      "inspection-paradox",
    ],
  },
  {
    title: "Decode a message",
    description:
      "Guess digits, detect signals, and see what noise does to information.",
    slugs: [
      "benfords-law",
      "signal-detection",
      "shannon-entropy",
      "noisy-channel",
      "zipfs-law",
    ],
  },
  {
    title: "Fix the system",
    description:
      "Route traffic, add processors, clear queues and follow supply-chain feedback.",
    slugs: [
      "braess-paradox",
      "amdahls-law",
      "littles-law",
      "bullwhip-effect",
      "jevons-paradox",
    ],
  },
  {
    title: "Watch life grow",
    description:
      "Compare unequal shares, epidemic spread and interacting populations.",
    slugs: [
      "pareto-concentration",
      "sir-epidemic",
      "logistic-growth",
      "predator-prey",
      "allee-effect",
    ],
  },
  {
    title: "Choose with context",
    description:
      "Test how wording, ownership, alternatives and memory shape choices.",
    slugs: [
      "framing-effect",
      "endowment-effect",
      "decoy-effect",
      "peak-end-rule",
      "planning-fallacy",
    ],
  },
  {
    title: "Move with the crowd",
    description:
      "See how thresholds, imitation and competition change a group outcome.",
    slugs: [
      "social-tipping",
      "bass-diffusion",
      "median-voter",
      "el-farol-bar",
      "tullock-contest",
    ],
  },
  {
    title: "Read the evidence",
    description:
      "Reveal the hidden groups, ambiguous odds and signals behind a crowd's choices.",
    slugs: [
      "simpsons-paradox",
      "ellsberg-urn",
      "allais-paradox",
      "information-cascade",
      "beauty-contest",
    ],
  },
  {
    title: "Play it together",
    description:
      "Try trust, shared funding, waiting for help, strategic patience and competing locations.",
    slugs: [
      "trust-game",
      "threshold-public-good",
      "volunteers-dilemma",
      "centipede-game",
      "hotelling-location",
    ],
  },
  {
    title: "Think with Taleb",
    description:
      "Stress the assumptions, cap the downside and ask who bears the cost.",
    slugs: [
      "antifragility",
      "barbell-strategy",
      "optionality",
      "skin-in-the-game",
      "turkey-problem",
    ],
  },
  {
    title: "Play the incentives",
    description:
      "Explore trust, conflict, unpredictability, conventions and collective action.",
    slugs: [
      "stag-hunt",
      "chicken-game",
      "matching-pennies",
      "coordination-game",
      "public-goods",
    ],
  },
  {
    title: "Negotiate and design markets",
    description:
      "Test offers, outside options, auction rules and hidden information.",
    slugs: [
      "ultimatum-game",
      "nash-bargaining",
      "vickrey-auction",
      "winners-curse",
      "market-for-lemons",
    ],
  },
  {
    title: "Start with a surprise",
    description:
      "Three accessible probability puzzles, then two everyday trade-offs.",
    slugs: [
      "monty-hall",
      "birthday-paradox",
      "law-of-large-numbers",
      "compound-growth",
      "opportunity-cost",
    ],
  },
  {
    title: "Understand your decisions",
    description:
      "Test assumptions about prices, projects, patience, evidence and memory.",
    slugs: [
      "anchoring-bias",
      "sunk-cost-fallacy",
      "present-bias",
      "confirmation-bias",
      "forgetting-curve",
    ],
  },
  {
    title: "See the bigger system",
    description:
      "Explore how local choices, incentives and feedback shape collective outcomes.",
    slugs: [
      "diminishing-returns",
      "prisoners-dilemma",
      "tragedy-of-the-commons",
      "schelling-segregation",
      "butterfly-effect",
    ],
  },
];

export const learningPath = [
  {
    slug: "base-rate-neglect",
    title: "Start with the odds",
    question: "What did you believe before seeing the signal?",
    task: "Raise the spam base rate to 50%. Explain why the same flag becomes more informative.",
    minutes: 4,
  },
  {
    slug: "regression-to-the-mean",
    title: "Separate signal from luck",
    question: "Will an extraordinary result happen again?",
    task: "Remove measurement noise. Notice what happens to the selected group’s second score.",
    minutes: 4,
  },
  {
    slug: "lindy-effect",
    title: "Think in distributions",
    question: "What can the past tell us about possible futures?",
    task: "Compare low and high uncertainty at the same age. Read the interval as well as the median.",
    minutes: 5,
  },
  {
    slug: "power-laws",
    title: "Look beyond the average",
    question: "How much can a small minority account for?",
    task: "Compare exponent 0 with exponent 2. Watch the share going to the top tenth.",
    minutes: 4,
  },
  {
    slug: "network-effects",
    title: "Connect the pieces",
    question: "Does a bigger network always mean more useful connections?",
    task: "Grow the network with connection chance at 0%, then at 100%. Separate potential from use.",
    minutes: 4,
  },
  {
    slug: "gamblers-ruin",
    title: "Protect the ability to continue",
    question: "Can a favorable game still end your journey?",
    task: "Compare small and large stakes across many lives. Read the ruin rate, not just mean wealth.",
    minutes: 6,
  },
];
export const glossary = [
  ...catalogExperiments.map((e) => ({
    term: e.name,
    definition: e.description,
    slug: e.id,
  })),
  {
    term: "Base rate",
    definition: "How common something is before you observe new evidence.",
    slug: "base-rate-neglect",
  },
  {
    term: "Conditional probability",
    definition:
      "The probability of an event after restricting attention to cases where another event happened.",
    slug: "base-rate-neglect",
  },
  {
    term: "False positive",
    definition: "A flag raised when the thing being sought is absent.",
    slug: "base-rate-neglect",
  },
  {
    term: "Signal and noise",
    definition:
      "The underlying quantity you care about, and the variation that obscures it.",
    slug: "regression-to-the-mean",
  },
  {
    term: "Regression to the mean",
    definition:
      "When selecting an extreme noisy measurement is followed, on average, by a less extreme one.",
    slug: "regression-to-the-mean",
  },
  {
    term: "Distribution",
    definition:
      "A description of possible values and how probability is spread among them.",
    slug: "lindy-effect",
  },
  {
    term: "Median",
    definition:
      "A middle value: at least half of the observations lie on either side of it.",
    slug: "lindy-effect",
  },
  {
    term: "Percentile",
    definition:
      "A cutoff describing where a value sits in an ordered distribution; the 75th percentile has roughly three quarters of observations below it.",
    slug: "lindy-effect",
  },
  {
    term: "Uncertainty",
    definition:
      "The range of possibilities left open by what you know and by the assumptions you make.",
    slug: "lindy-effect",
  },
  {
    term: "Power law",
    definition:
      "A relationship where one quantity varies as a fixed power of another. In this experiment, attention falls as rank rises.",
    slug: "power-laws",
  },
  {
    term: "Concentration",
    definition: "How much of a total is accounted for by a small subset.",
    slug: "power-laws",
  },
  {
    term: "Network effect",
    definition:
      "A change in the benefit of using something as other people use it. More connections are one possible mechanism.",
    slug: "network-effects",
  },
  {
    term: "Expected value",
    definition:
      "An average weighted by probabilities. It need not describe a typical individual outcome.",
    slug: "gamblers-ruin",
  },
  {
    term: "Compounding",
    definition:
      "Repeated changes applied to a quantity that has already changed.",
    slug: "gamblers-ruin",
  },
  {
    term: "Ruin threshold",
    definition:
      "A boundary at which this model stops a journey because its resources are too low.",
    slug: "gamblers-ruin",
  },
  {
    term: "Survivorship bias",
    definition:
      "Drawing conclusions from visible survivors while missing those that disappeared.",
    slug: "survivorship-bias",
  },
].sort((a, b) => a.term.localeCompare(b.term));
