import type { Entry, Control } from "./expansion";
import type { Thinker } from "@/types/catalog";

const c = (
  key: string,
  label: string,
  min: number,
  max: number,
  value: number,
  suffix = "",
  step = 1,
): Control => ({ key, label, min, max, value, suffix, step });
export const playEntries: Entry[] = [
  {
    id: "simpsons-paradox",
    name: "Simpson’s Paradox",
    thinker: "simpson",
    categories: ["probability", "decisions"],
    format: "game",
    description:
      "A trend inside every group can reverse when the groups are pooled.",
    title: "Which option really performs better?",
    question:
      "Compare two programs across easy and hard cases. Predict the overall winner, then change who enters each case.",
    controls: [
      c("easyA", "A's easy-case share", 0, 100, 10, "%"),
      c("easyB", "B's easy-case share", 0, 100, 90, "%"),
    ],
    challenge: "Balance the case mix",
    preset: { easyA: 50, easyB: 50 },
    idea: "An aggregate comparison can tell a different story from every subgroup comparison when the groups have different weights. Edward Simpson analyzed how combining contingency tables changes interpretation.",
    mechanism:
      "In each difficulty group A succeeds 10 percentage points more often: easy 90% versus 80%; hard 30% versus 20%. Overall A = 0.30+0.60×easyA and B = 0.20+0.60×easyB, with shares expressed as fractions. These are illustrative expected rates for equal-sized programs.",
    example:
      "Before judging two hospitals or schools by one headline rate, compare the difficulty of the cases each accepts.",
    limitation:
      "This toy comparison is not a causal estimate. Whether to pool or split real data depends on how groups arise, what was measured, and the question being asked.",
    source: {
      title:
        "Edward Simpson — The Interpretation of Interaction in Contingency Tables",
      url: "https://doi.org/10.1111/j.2517-6161.1951.tb00088.x",
    },
  },
  {
    id: "ellsberg-urn",
    name: "Ellsberg’s Urns",
    thinker: "ellsberg",
    categories: ["risk", "behavior"],
    format: "game",
    description:
      "Known odds and unknown odds can feel different even when their midpoint matches.",
    title: "Choose the urn before you draw.",
    question:
      "One urn has exactly half red balls. The other has an unknown red share in the shown interval. Pick an urn, then reveal a draw.",
    controls: [c("width", "Possible red-share range", 0, 100, 80, "%")],
    challenge: "Make the unknown urn certain",
    preset: { width: 0 },
    idea: "Ellsberg used urn choices to study ambiguity: a decision maker may treat unknown probabilities differently from known ones.",
    mechanism:
      "The known urn is 50% red. For the unknown urn, a red share is drawn once per session uniformly from [50−width/2, 50+width/2] percent; its value stays hidden until you play. Each urn pays 10 on red, 0 otherwise. The chart shows payoff under every possible unknown composition, not a claim about your preferences.",
    example:
      "Compare a contract with known failure odds with one whose probability cannot be estimated confidently from available data.",
    limitation:
      "The random composition is a teaching device. Ellsberg's point concerns unknown beliefs and preference patterns, not a known uniform distribution over urn compositions.",
    source: {
      title: "Daniel Ellsberg — Risk, Ambiguity, and the Savage Axioms",
      url: "https://www.ellsberg.net/wp-content/uploads/2023/03/DE_Notes_Papers_Risk_Ambiguity__the_Savage_Axioms_reprinted_from_Quarterly_Journal_of_Economics_Vol_LXXV_November_1961.pdf",
    },
  },
  {
    id: "allais-paradox",
    name: "Allais Paradox",
    thinker: "allais",
    categories: ["risk", "decisions"],
    format: "game",
    description:
      "Two pairs of lotteries can expose tension in how we value certainty.",
    title: "Would you trade certainty for a small chance at more?",
    question:
      "Choose once from each lottery pair. Draw an outcome and compare your choices with their expected values.",
    controls: [c("prize", "Base prize", 10, 100, 50)],
    challenge: "Try larger stakes",
    preset: { prize: 100 },
    idea: "Maurice Allais used linked lottery choices to challenge the independence axiom of expected utility. Many people choose certainty in one pair and a larger long-shot in the other.",
    mechanism:
      "Pair 1: A pays the base prize for sure; B pays 5×base with 10%, base with 89%, zero with 1%. Pair 2: C pays base with 11% and zero otherwise; D pays 5×base with 10% and zero otherwise. The game draws seeded uniform outcomes and shows both expected payoffs. A with D is the classic independence-axiom conflict.",
    example:
      "A guaranteed benefit and a high-upside gamble may be evaluated differently when a common outcome is removed from both choices.",
    limitation:
      "One answer cannot diagnose a person's rationality. Stakes here are fictional, and risk attitudes are not estimated from a single trial.",
    source: {
      title: "Fondation Maurice Allais — Théorie du risque",
      url: "https://www.fondationmauriceallais.org/leconomiste/risque/",
    },
  },
  {
    id: "information-cascade",
    name: "Information Cascade",
    thinker: "bikhchandani",
    categories: ["games", "behavior"],
    format: "agent-model",
    description:
      "People can follow earlier actions even when their own clue disagrees.",
    title: "When does a crowd stop revealing information?",
    question:
      "Reveal one decision at a time. Each person sees earlier choices and receives a private clue about a hidden state.",
    controls: [
      c("accuracy", "Private clue accuracy", 55, 90, 70, "%"),
      c("people", "People to reveal", 1, 16, 8),
    ],
    challenge: "Reveal the full crowd",
    preset: { people: 16 },
    idea: "Bikhchandani, Hirshleifer and Welch showed how observing earlier actions can lead later decision makers to set aside their own private signals.",
    mechanism:
      "A hidden state is equally likely red or blue. Each independent clue is correct with the chosen probability. At each turn an agent compares the public likelihood from earlier actions with their clue likelihood, chooses the more likely state, and follows their clue on a tie. The public belief is updated from the probability of that action under each state; once both possible clues produce the same choice, the action conveys no new clue.",
    example:
      "Early reviews can influence later buyers so strongly that later choices add little fresh evidence about product quality.",
    limitation:
      "Agents have common knowledge of clue accuracy, act to maximize correctness, and never communicate the clues themselves. Real social learning is more varied.",
    source: {
      title:
        "Bikhchandani, Hirshleifer and Welch — A Theory of Fads, Fashion, Custom, and Cultural Change",
      url: "https://snap.stanford.edu/class/cs224w-readings/bikhchandani92fads.pdf",
    },
  },
  {
    id: "threshold-public-good",
    name: "Threshold Public Good",
    thinker: "ostrom",
    categories: ["games", "markets"],
    format: "game",
    description:
      "A shared project succeeds only after enough people contribute.",
    title: "Will your contribution tip the project over the line?",
    question:
      "Pledge up to 20 units, set the target and how likely others are to help, then run a funding round.",
    controls: [
      c("pledge", "Your pledge", 0, 20, 10),
      c("target", "Funding target", 10, 50, 30),
      c("chance", "Each other person helps", 0, 100, 50, "%"),
    ],
    challenge: "Make your pledge pivotal",
    preset: { pledge: 10, target: 30, chance: 65 },
    idea: "When a project has a threshold, a small contribution can be pivotal. Institutions can change who expects others to contribute and how commitments are enforced.",
    mechanism:
      "Three other people each independently contribute 10 with the chosen probability. The project pays every person 40 if total pledges reach the target. Your pledge costs you its amount whether or not funding succeeds. The chart enumerates all eight possible patterns of other contributors to compute your expected net payoff for each pledge.",
    example:
      "A neighborhood improvement may be funded only after enough households make credible pledges.",
    limitation:
      "Independent decisions, fixed 10-unit pledges, identical 40-unit benefits, and sunk pledges are model rules. Real projects may refund failed pledges and coordinate through discussion.",
    source: {
      title: "Elinor Ostrom — Beyond Markets and States",
      url: "https://www.nobelprize.org/uploads/2018/06/ostrom_lecture.pdf",
    },
  },
  {
    id: "trust-game",
    name: "Trust Game",
    categories: ["games", "behavior"],
    format: "game",
    description:
      "The first person can grow a shared pie but cannot force a fair return.",
    title: "Send first. Then decide what to return.",
    question:
      "Send some of your 10 tokens. The transfer triples; then choose how much the recipient returns.",
    controls: [
      c("send", "Tokens to send", 0, 10, 5),
      c("return", "Share sent back", 0, 100, 50, "%"),
    ],
    challenge: "Test no return",
    preset: { return: 0 },
    idea: "Investment games separate a trusting move from the recipient's opportunity to reciprocate.",
    mechanism:
      "Sender begins with 10 and sends x; the transfer becomes 3x. Recipient returns r% of 3x. Final sender tokens are 10−x+3xr/100; recipient tokens are 3x(1−r/100). The chart fixes the return share while varying the amount sent.",
    example:
      "A team member shares time or information first, hoping that the other person will reciprocate after the collaboration becomes more valuable.",
    limitation:
      "You control both roles in this solo game. It demonstrates possible payoffs, not an empirical prediction of how strangers reciprocate.",
    source: {
      title:
        "Berg, Dickhaut and McCabe — Trust, Reciprocity, and Social History",
      url: "https://doi.org/10.1006/game.1995.1027",
    },
  },
  {
    id: "centipede-game",
    name: "Centipede Game",
    categories: ["games", "decisions"],
    format: "game",
    description: "Passing grows the pot, but each player can take it first.",
    title: "Take now or pass a larger pot along?",
    question:
      "Play against a partner who passes with the chosen probability. The pot doubles after each pass.",
    controls: [
      c("passes", "Partner passes", 0, 100, 65, "%"),
      c("turns", "Maximum decisions", 4, 10, 6),
    ],
    challenge: "Face a partner who rarely passes",
    preset: { passes: 10 },
    idea: "The centipede game makes the tension between immediate advantage and mutually growing gains visible one move at a time.",
    mechanism:
      "The initial pot is 4 and doubles after each pass. Taking pays the mover 80% and the other player 20%. The opponent independently passes at the chosen probability. A user pass prompts one opponent choice; at the final permitted decision the active player takes automatically. The plot compares pot size and the payoff for taking at each node.",
    example:
      "In a collaboration, each side may want the other to make one more investment while retaining the option to claim the current return.",
    limitation:
      "The partner is a fixed stochastic policy, not a strategic learner. This short game is a teaching variant of a broader family of centipede payoff schedules.",
    source: {
      title:
        "Robert Rosenthal — Games of perfect information, predatory pricing and the chain-store paradox",
      url: "https://doi.org/10.1016/0022-0531(81)90018-1",
    },
  },
  {
    id: "volunteers-dilemma",
    name: "Volunteer’s Dilemma",
    categories: ["games", "decisions"],
    format: "game",
    description:
      "Everyone benefits if one person acts, but each hopes someone else will.",
    title: "Will anybody step forward?",
    question:
      "Choose to volunteer or wait while other people independently decide whether to act.",
    controls: [
      c("chance", "Each other person volunteers", 0, 100, 20, "%"),
      c("group", "People in group", 2, 20, 5),
      c("cost", "Cost to volunteer", 1, 25, 10),
    ],
    challenge: "Make help unlikely",
    preset: { chance: 2 },
    idea: "Diekmann's volunteer dilemma shows how a public good can remain unprovided when each person hopes someone else bears the cost.",
    mechanism:
      "The benefit is 30 if at least one person volunteers. A volunteer receives 30−cost. Waiting yields 30 with probability 1−(1−p)^(group−1), otherwise zero. Playing samples each of the other group members independently.",
    example:
      "When a shared problem needs one person to report it or organize a fix, everyone may wait despite valuing the result.",
    limitation:
      "This assumes identical benefits and independent fixed probabilities. Social roles and coordinated commitments can change real behavior.",
    source: {
      title: "Andreas Diekmann — Volunteer's Dilemma",
      url: "https://doi.org/10.1177/0022002785029004003",
    },
  },
  {
    id: "beauty-contest",
    name: "Beauty Contest Game",
    thinker: "keynes",
    categories: ["games", "markets"],
    format: "game",
    description:
      "Try to predict what others will predict, not a number's intrinsic value.",
    title: "Guess two-thirds of the average.",
    question:
      "Choose 0–100. Nine simulated players guess at varying depths of reasoning. Can you get close to two-thirds of the group's mean?",
    controls: [
      c("guess", "Your guess", 0, 100, 33),
      c("depth", "Other players' reasoning depth", 0, 4, 2),
    ],
    challenge: "Think one step further",
    preset: { guess: 20, depth: 3 },
    idea: "Keynes's beauty-contest metaphor describes decisions about other people's expectations. Later experiments turned the idea into number-guessing games.",
    mechanism:
      "Nine opponents each guess near 50×(2/3)^depth with seeded noise of at most 5 points. Your target is (2/3) times the average of all ten guesses, including your own. The chart shows how close each possible guess gets to its resulting target. Best response solves guess=(2/3)×(sum of opponents+guess)/10.",
    example:
      "When estimating resale value, what others will pay can matter separately from your own private use value.",
    limitation:
      "The bots use a chosen rule, not measured human thinking. Repeated play with real people can change expectations, and this single-round game is not a market forecast.",
    source: {
      title: "John Maynard Keynes — The General Theory, chapter 12",
      url: "https://www.gutenberg.net.au/ebooks03/0300071h/chap12.html",
    },
  },
  {
    id: "hotelling-location",
    name: "Hotelling’s Location Game",
    thinker: "hotelling",
    categories: ["games", "markets"],
    format: "game",
    description: "Two sellers compete for customers spread along one street.",
    title: "Where would you put your shop?",
    question:
      "Place your shop anywhere on a street while a competitor chooses another spot. See which customers each attracts.",
    controls: [
      c("you", "Your shop location", 0, 100, 35),
      c("rival", "Rival shop location", 0, 100, 70),
    ],
    challenge: "Move next to the rival",
    preset: { you: 69 },
    idea: "Hotelling used spatial competition to study how seller location affects demand when buyers prefer nearby options.",
    mechanism:
      "Customers are uniformly spread from 0 to 100 and choose the nearer seller at equal prices. The indifference point is the midpoint of shop locations. Your market share equals the length of street nearer your shop; co-location splits customers evenly. The plot shows your share at each possible location holding the rival fixed.",
    example:
      "Two food stalls, clinics, or service outlets may choose locations partly in response to a nearby rival.",
    limitation:
      "Equal prices, uniform customers, identical quality and pure distance costs are strong assumptions. The chart does not solve a full price-and-location competition model.",
    source: {
      title: "Harold Hotelling — Stability in Competition",
      url: "https://www.math.utoronto.ca/mccann/assignments/477/Hotelling29.pdf",
    },
  },
];

export const playThinkers: Thinker[] = [
  {
    id: "simpson",
    slug: "edward-simpson",
    name: "Edward Simpson",
    description:
      "Statistician known for a 1951 analysis of how relationships within contingency-table groups can change when data are combined.",
    areaIds: ["probability", "decisions"],
  },
  {
    id: "ellsberg",
    slug: "daniel-ellsberg",
    name: "Daniel Ellsberg",
    description:
      "Researcher and author of Risk, Ambiguity, and the Savage Axioms, a foundational challenge about choices under unknown probabilities.",
    areaIds: ["risk", "behavior"],
  },
  {
    id: "allais",
    slug: "maurice-allais",
    name: "Maurice Allais",
    description:
      "Economist whose lottery choice problems challenged a standard axiom of expected utility theory.",
    areaIds: ["risk", "decisions"],
  },
  {
    id: "bikhchandani",
    slug: "sushil-bikhchandani",
    name: "Sushil Bikhchandani",
    description:
      "Economist and coauthor of influential research on informational cascades and the fragility of social learning from observed actions.",
    areaIds: ["games", "behavior"],
  },
  {
    id: "keynes",
    slug: "john-maynard-keynes",
    name: "John Maynard Keynes",
    description:
      "Economist and author of The General Theory, which used a beauty-contest metaphor to explain choices driven by expectations about others.",
    areaIds: ["games", "markets"],
  },
  {
    id: "hotelling",
    slug: "harold-hotelling",
    name: "Harold Hotelling",
    description:
      "Statistician and economist known for models of spatial competition and consumer choice across locations.",
    areaIds: ["games", "markets"],
  },
];
