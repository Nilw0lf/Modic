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
