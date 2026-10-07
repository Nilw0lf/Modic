import type { Entry } from "./expansion";
import type { Thinker } from "@/types/catalog";

const oligopoly = {
  title: "MIT OpenCourseWare — Cournot, Stackelberg and Bertrand models",
  url: "https://ocw.mit.edu/courses/15-010-economic-analysis-for-business-decisions-fall-2004/807ba86e100d349ef73c294b9e720931_the_bsc_game_thy.pdf",
};
type Lesson = Omit<Entry, "controls" | "challenge" | "preset">;
const lessons: Lesson[] = [
  {
    id: "stable-matching",
    name: "Stable Matching",
    thinker: "shapley",
    coThinkers: ["gale", "alvin-roth"],
    categories: ["games", "algorithms"],
    format: "game",
    description:
      "Make proposals, keep tentative matches, and eliminate blocking pairs.",
    title: "A match can be stable without being everyone's first choice.",
    question:
      "Match three applicants with three teams. Choose a free applicant to propose; a team keeps its preferred offer and releases the other applicant.",
    idea: "A stable matching has no unmatched pair who both prefer each other to their assigned partners. Deferred acceptance maintains tentative matches while rejected proposers move down their preference lists.",
    mechanism:
      "Each side has complete strict rankings of three partners and one place per team. Every click sends a free applicant's next untried proposal. Teams retain the applicant they rank higher. The final board explicitly checks all unmatched pairs for blocking pairs. New round changes both preference profiles using a seeded shuffle.",
    example:
      "Matching-market design can help explain placement systems where both sides have preferences, rather than treating assignments as a single score ranking.",
    limitation:
      "This small one-to-one complete-preference model omits capacities, couples, priorities, and unacceptable matches. Stability does not mean fairness, happiness, or maximum total satisfaction; proposer advantage requires the usual model assumptions.",
    source: {
      title: "Nobel committee — Stable allocations and market design",
      url: "https://www.nobelprize.org/uploads/2018/06/popular-economicsciences2012.pdf",
    },
    related: ["nash-bargaining", "coordination-game"],
  },
  {
    id: "battle-of-the-sexes",
    name: "Battle of the Sexes",
    thinker: "raiffa",
    categories: ["games", "decisions"],
    format: "game",
    description:
      "You both want to meet, but prefer different venues. Can you coordinate?",
    title: "Agreeing where can be harder than agreeing to meet.",
    question:
      "Choose Music or Sport. You prefer Music, your partner prefers Sport, but both earn zero when you go to different places.",
    idea: "This coordination game has shared interest in meeting and conflicting preferences over where to meet. There are two pure-strategy equilibria, each favouring a different player.",
    mechanism:
      "Meeting at Music pays you 3 and the partner 2; Sport pays you 2 and the partner 3; splitting pays both zero. The disclosed bot independently chooses Music with the slider probability. Each round samples that policy and records both payoffs; expected payoffs are shown separately from realised tokens.",
    example:
      "Two teams may agree to use one communication tool but prefer different tools. Coordination and bargaining over the chosen convention are separate tasks.",
    limitation:
      "The bot does not negotiate or learn. Its probability is stipulated. The historic game name is retained for search and study; the players here have no assigned genders.",
    source: {
      title: "MIT — Game theory: examples of coordination games",
      url: "https://ocw.mit.edu/courses/1-022-introduction-to-network-models-fall-2018/90ccf0c3ab63d74c019e4b1e3b668ddf_MIT1_022F18_lec21.pdf",
    },
    related: ["coordination-game", "stag-hunt"],
  },
  {
    id: "cournot-competition",
    name: "Cournot Competition",
    thinker: "cournot",
    categories: ["games", "markets"],
    format: "game",
    description: "Choose how much to produce before seeing the market price.",
    title: "More output lowers the price of every unit.",
    question:
      "Your rival has committed to a displayed output. Choose your production, then compare profit with the best response for that rival quantity.",
    idea: "Cournot competition models firms choosing quantities. Each firm's quantity changes the common market price and therefore the profitability of the other's production.",
    mechanism:
      "Price is max(0, 100 − your quantity − rival quantity), unit cost is 20, and profit is quantity × (price − 20). The best response is max(0, (80 − rival quantity)/2). The symmetric continuous Cournot benchmark is 80/3 units each; slider choices are integer units.",
    example:
      "A commodity producer can face a tradeoff between selling more units and depressing the price received on all units.",
    limitation:
      "The rival output is held fixed for the challenge, not an adaptive equilibrium bot. Homogeneous products, linear demand, equal constant costs, and no capacity constraints are teaching assumptions.",
    source: oligopoly,
    related: ["stackelberg-competition", "bertrand-competition"],
  },
  {
    id: "stackelberg-competition",
    name: "Stackelberg Competition",
    thinker: "stackelberg",
    categories: ["games", "markets"],
    format: "game",
    description: "Commit first, then watch a rival choose its best response.",
    title: "Moving first helps only when the commitment matters.",
    question:
      "Commit a production quantity. The follower sees it and optimises its own output under the displayed demand and cost assumptions.",
    idea: "Stackelberg competition is a sequential quantity game. A credible first mover can anticipate the follower's best response when choosing its own quantity.",
    mechanism:
      "Price is max(0, 100 − leader − follower), both unit costs are 20, and the follower chooses max(0, (80 − leader)/2). The leader's optimum is 40, followed by 20. The comparison shows the continuous simultaneous Cournot outcome of 80/3 each.",
    example:
      "A capacity commitment can change a rival's subsequent choice when it cannot cheaply be reversed.",
    limitation:
      "The commitment is enforced in this game. Actual firms may revise capacity, differentiate products, or face uncertainty. Moving first is not universally an advantage.",
    source: oligopoly,
    related: ["cournot-competition", "chicken-game"],
  },
  {
    id: "bertrand-competition",
    name: "Bertrand Competition",
    thinker: "bertrand",
    categories: ["games", "markets"],
    format: "game",
    description:
      "Price a shared product and see what a one-token undercut changes.",
    title: "Price competition shifts who serves the market.",
    question:
      "Your rival posts a price. Choose yours: the lower-priced seller serves demand, while equal prices split it.",
    idea: "Bertrand competition models firms setting prices. For identical goods with equal constant costs and sufficient capacity, a lower price can capture demand from a higher-priced rival.",
    mechanism:
      "Demand is max(0, 100 − the lowest price). The low-price seller serves it all; a tie splits it equally. Unit cost is 20 and profit is (own price − 20) × own units. Integer prices are allowed from 10 to 90; below-cost prices can generate losses. Rival price is held fixed for comparison.",
    example:
      "An undifferentiated market can make a small price cut shift sales sharply, even though it also reduces the margin per unit.",
    limitation:
      "This is a one-shot best-response challenge, not a simulation of convergence to Bertrand equilibrium. Branding, search costs, capacities, and repeated interaction can change the outcome.",
    source: oligopoly,
    related: ["cournot-competition", "market-for-lemons"],
  },
  {
    id: "war-of-attrition",
    name: "War of Attrition",
    thinker: "maynard-smith",
    categories: ["games", "decisions"],
    format: "game",
    description: "Outlast a rival—but remember that every round costs you.",
    title: "The last player standing can still lose overall.",
    question:
      "A prize is worth 12 tokens. Continuing costs both players 2 per round. The bot exits after its displayed patience limit; choose Continue or Exit.",
    idea: "A war of attrition is a contest where waiting is costly and the player who outlasts the other receives the prize. Net gains depend on the cost of persistence.",
    mechanism:
      "Both start with zero cumulative cost. Exit concedes immediately and gives you minus accumulated cost. Continue charges 2 to both; when the resulting round reaches the disclosed bot patience, the bot exits and you receive 12 minus your total cost. Limits range from 1 to 8 rounds.",
    example:
      "A costly dispute or delay can consume the value the participants were trying to secure.",
    limitation:
      "This finite, disclosed-cutoff bot is not the mixed-strategy evolutionary model in the source. There is no real money and no uncertainty about the bot's rule.",
    source: {
      title: "John Maynard Smith — The war of attrition",
      url: "https://www.cambridge.org/core/books/abs/evolution-and-the-theory-of-games/war-of-attrition/6323661FB39FFEA93B4061B1E9F5E034",
    },
    related: ["dollar-auction", "sunk-cost-fallacy"],
  },
  {
    id: "colonel-blotto",
    name: "Colonel Blotto",
    thinker: "roberson",
    categories: ["games", "decisions"],
    format: "game",
    description:
      "Allocate ten tokens across three contests. Win places, not just one landslide.",
    title: "Where you put a limited budget changes what you can win.",
    question:
      "Spend exactly ten tokens across three equal-value fields. Submit against a hidden seeded opponent allocation, then inspect every field.",
    idea: "Colonel Blotto games distribute limited resources across simultaneous contests. The value of an allocation depends on the opponent's allocation and the rule for scoring each contest.",
    mechanism:
      "Three nonnegative integer allocations must sum to ten. The bot generates a valid allocation by placing each of its ten tokens on a uniformly sampled field. Higher allocation earns one point, a tie earns each player half a point. The opponent is hidden until submission. New round generates a new allocation.",
    example:
      "A campaign, sales team, or defender may need to distribute effort across multiple objectives rather than maximise effort on a single one.",
    limitation:
      "This discrete three-field teaching game is not Roberson's continuous equilibrium model. The disclosed random bot is not an optimal mixed strategy and winning a few rounds does not establish optimal play.",
    source: {
      title: "Brian Roberson — The Colonel Blotto game",
      url: "https://doi.org/10.1007/s00199-005-0071-5",
    },
    related: ["tullock-contest", "minority-game"],
  },
  {
    id: "price-of-anarchy",
    name: "Price of Anarchy",
    thinker: "roughgarden",
    coThinkers: ["tardos"],
    categories: ["games", "operations", "algorithms"],
    format: "simulation",
    description:
      "Route traffic and compare individual incentives with total delay.",
    title: "A stable traffic pattern need not be the most efficient one.",
    question:
      "Route 100 units of nonatomic traffic between a congestion-sensitive road and a fixed-delay road. Compare your allocation, selfish equilibrium, and the system optimum.",
    idea: "The price of anarchy compares the cost of a worst equilibrium with the minimum achievable system cost under a stated model. Individual incentives can produce an inefficient collective outcome.",
    mechanism:
      "The variable road takes x minutes when carrying x traffic units. The other road always takes 60 minutes. Total delay is x² + 60(100−x). The nonatomic equilibrium has x=60; the system optimum has x=30. Their ratio is 6000/5100, about 1.18. The slider explores allocations; it does not change that equilibrium ratio.",
    example:
      "Routing rules can improve total travel time while asking some users to choose a route that is not their individual minimum at that allocation.",
    limitation:
      "Traffic is divisible and users are infinitesimal. These are arbitrary delay units, not a city forecast. The number shown is specific to these two roads, not the general worst-case bound.",
    source: {
      title: "Tim Roughgarden — Research overview: selfish routing",
      url: "https://theory.stanford.edu/~tim/overview.html",
    },
    related: ["braess-paradox", "coordination-game"],
  },
  {
    id: "complex-contagion",
    name: "Complex Contagion",
    thinker: "centola",
    coThinkers: ["macy"],
    categories: ["social", "complexity"],
    format: "agent-model",
    description: "Seed a behaviour and see when one contact is not enough.",
    title: "Reinforcement needs several neighbours, not just one bridge.",
    question:
      "Choose seed nodes on a ring network. Step the spread with one-neighbour or two-neighbour adoption, and compare an isolated seed with a small cluster.",
    idea: "Complex contagion describes diffusion that requires social reinforcement from multiple sources, unlike simple contagion where one exposure can suffice.",
    mechanism:
      "Twenty nodes connect to their two nearest neighbours on each side. At each synchronous step, inactive nodes adopt if at least the selected number of neighbours were active at the start of that step. Adoption is irreversible. You choose initial seeds; a stalled state stops when no additional nodes qualify.",
    example:
      "Trying an unfamiliar collaborative practice may require encouragement from several peers rather than merely hearing about it from one distant contact.",
    limitation:
      "This deterministic threshold network omits individual differences, forgetting, resistance, and actual social data. It does not predict adoption rates or claim to be a disease model.",
    source: {
      title:
        "Centola and Macy — Complex contagions and the weakness of long ties",
      url: "https://ndg.asc.upenn.edu/models/complex-contagions/",
    },
    related: ["small-world-shortcuts", "social-tipping"],
  },
  {
    id: "performative-prediction",
    name: "Performative Prediction",
    thinker: "hardt",
    coThinkers: ["perdomo", "zrnic", "mendler-dunner"],
    categories: ["algorithms", "complexity", "information"],
    format: "simulation",
    description:
      "Deploy a forecast and watch the forecast change what happens next.",
    title: "A prediction can become part of the system it predicts.",
    question:
      "A forecast influences demand. Deploy it repeatedly, retrain on the resulting demand, and compare that loop with a frozen baseline forecast.",
    idea: "Performative prediction studies situations where deploying a predictive model changes the distribution of the outcomes it is meant to predict. Learning from the changed data and steering the system are distinct processes.",
    mechanism:
      "Baseline demand is 20 units. Deployment creates demand d=clamp(20 + r×prediction, 0, 100), where response r ranges from −1.5 to 1.5. Retraining sets the next prediction equal to d. The initial prediction is 20. One click is one deploy-and-retrain cycle; positive response can reinforce forecasts, negative response can cause alternating corrections.",
    example:
      "A popularity forecast can affect which products receive promotion, changing the demand later recorded as training data.",
    limitation:
      "The response equation is invented for teaching, not fitted to a platform. Its scalar fixed point is not the full optimisation problem or a proof of the research paper's convergence guarantees.",
    source: {
      title:
        "Perdomo, Zrnic, Mendler-Dünner and Hardt — Performative Prediction",
      url: "https://arxiv.org/abs/2002.06673",
    },
    related: ["goodhart", "cobweb-model"],
  },
  {
    id: "algorithmic-fairness",
    name: "Algorithmic Fairness Tradeoffs",
    thinker: "kleinberg",
    coThinkers: ["mullainathan", "raghavan"],
    categories: ["algorithms", "decisions", "information"],
    format: "simulation",
    description:
      "Move two thresholds and compare different meanings of an equal outcome.",
    title: "One fairness metric does not tell the whole story.",
    question:
      "Set a threshold for each synthetic group. Compare true-positive rates, false-positive rates, and positive predictive value rather than only counting approvals.",
    idea: "Algorithmic fairness involves multiple criteria that can conflict. Equal error rates, equal selection rates, and equal predictive value ask different questions, especially when outcome frequencies differ.",
    mechanism:
      "Each group has 100 synthetic cases, with 20 positives in A and 60 in B. Positive scores are evenly spaced from 35 to 95; negative scores from 5 to 65. Scores at or above the group's threshold are selected. Exact confusion counts and derived metrics are displayed, with undefined ratios labelled rather than set to zero.",
    example:
      "A screening system can have similar sensitivity across groups while selected cases have different success frequencies. Evaluate the consequences and definitions before calling it fair.",
    limitation:
      "These are invented groups and scores, not demographic data. This threshold illustration does not prove the original calibration impossibility theorem, define legal fairness, or decide which criterion a real deployment should use.",
    source: {
      title:
        "Kleinberg, Mullainathan and Raghavan — Inherent trade-offs in risk scores",
      url: "https://arxiv.org/abs/1609.05807",
    },
    related: ["base-rate", "signal-detection"],
  },
  {
    id: "differential-privacy",
    name: "Differential Privacy",
    thinker: "dwork",
    coThinkers: ["aaron-roth"],
    categories: ["algorithms", "information", "probability"],
    format: "simulation",
    description:
      "Release a noisy count and see why repeated queries spend a privacy budget.",
    title: "A little uncertainty can protect a single person's contribution.",
    question:
      "Release an illustrative count using Laplace noise. Change epsilon, repeat the query, and inspect both the noise and the cumulative budget.",
    idea: "Differential privacy bounds how much a released result's probability distribution changes when one person's contribution changes. It is a property of a mechanism, not a claim that any noisy number is private.",
    mechanism:
      "The synthetic count is 40 and neighbouring datasets differ by one. Each release adds independently seeded Laplace noise with scale 1/epsilon. Epsilon is chosen from 0.1 to 2. No rounding or clipping is applied. Basic sequential composition adds epsilon across releases, even when epsilon changes; the mean of releases is also shown.",
    example:
      "A statistics publisher may release a protected aggregate rather than exact individual records, while accounting for all related releases.",
    limitation:
      "No personal data are used or stored. This single-count teaching mechanism is not a deployable privacy service. Correct bounds require a valid sensitivity model, secure randomness, and accounting for every release.",
    source: {
      title:
        "Dwork and Roth — The Algorithmic Foundations of Differential Privacy",
      url: "https://privacytools.seas.harvard.edu/book/reading-algorithmic-foundations-differential-privacy",
    },
    related: ["noisy-channel", "law-of-large-numbers"],
  },
  {
    id: "inattentional-blindness",
    name: "Inattentional Blindness",
    thinker: "simons",
    coThinkers: ["chabris"],
    categories: ["perception", "behavior"],
    format: "game",
    description:
      "Track the target symbols, then notice what else happened in the scene.",
    title: "Looking at a scene does not guarantee noticing everything in it.",
    question:
      "Count the blue circles across eight cards. Advance at your own pace, then submit the total before inspecting the full sequence.",
    idea: "Inattentional blindness is failure to notice a visible, unexpected event while attention is occupied by another task.",
    mechanism:
      "Eight seeded cards each contain one to four blue circles and three amber diamonds. Card four also includes a star. Users advance manually, report a count, and then see the correct total and a question about the additional symbol. All cards can be reviewed after submission.",
    example:
      "An interface audit should check whether a critical notice is actually attended to during the user's main task, not merely whether it is present on screen.",
    limitation:
      "This is an original, self-paced demonstration inspired by attention research, not the original gorilla task or a validated attention test. Knowing the surprise, reading this guide first, or using assistive descriptions changes the experience. No diagnosis or population rate is inferred.",
    source: {
      title: "Simons and Chabris — Gorillas in our midst",
      url: "https://doi.org/10.1068/p281059",
    },
    related: ["stroop-effect", "change-blindness"],
  },
  {
    id: "change-blindness",
    name: "Change Blindness",
    thinker: "rensink",
    categories: ["perception", "behavior"],
    format: "game",
    description:
      "Compare two scenes with a gap between them and find the changed tile.",
    title: "A change can be obvious once you know where to look.",
    question:
      "Alternate two twelve-tile scenes. One tile changes shape. Try a blank gap or direct comparison, then select the changed tile.",
    idea: "Change blindness is difficulty detecting a change between views of a scene. Interruptions can remove a local motion or transient cue that would otherwise draw attention to the change.",
    mechanism:
      "A seeded board has twelve numbered tiles containing circle or diamond shapes. Scene B changes exactly one shape. With the gap enabled, Next view alternates A, blank, B, blank; without it, A and B alternate directly. Selecting a tile receives exact feedback; Reveal change shows the two differing shapes side by side.",
    example:
      "A saved-settings interface can make changes easier to detect by highlighting the changed field or showing an explicit before-and-after comparison.",
    limitation:
      "The game is untimed and simplified. A gap may or may not affect an individual attempt; repeated play and advance knowledge can make detection easier. It is not a vision assessment.",
    source: {
      title:
        "Rensink, O'Regan and Clark — The need for attention to see change",
      url: "https://www2.psych.ubc.ca/~rensink/flicker/index.html",
    },
    related: ["inattentional-blindness", "stroop-effect"],
  },
  {
    id: "mere-exposure-effect",
    name: "Mere Exposure Effect",
    thinker: "zajonc",
    categories: ["behavior", "perception"],
    format: "game",
    description:
      "Rate two unfamiliar patterns, see one more often, then rate again.",
    title: "Familiar can start to feel preferable—but not always.",
    question:
      "Rate two original symbols from 1 to 5. Complete twelve exposure cards, then rate them again and inspect your own change.",
    idea: "The mere exposure effect describes increased liking that can follow repeated exposure to a stimulus, under some conditions and without a direct reward.",
    mechanism:
      "Two SVG patterns receive separate before ratings. A seeded twelve-card sequence shows one pattern nine times and the other three times. After advancing through all cards, users supply new ratings. The result shows rating changes and actual exposure counts; the software never manufactures increased liking.",
    example:
      "Repeated brand or interface exposure can affect familiarity and preference, so liking a familiar option should not be confused with evidence of its quality.",
    limitation:
      "One unblinded self-report has no control group and cannot establish causation. Novelty, boredom, initial preference, and demand expectations can change the result. No response is labelled wrong.",
    source: {
      title: "Robert Zajonc — The attitudinal effects of mere exposure",
      url: "https://cdn.isr.umich.edu/pubFiles/historicPublications/Theattitudinaleffects_2360_.PDF",
    },
    related: ["halo-effect", "recognition-heuristic"],
  },
];

export const frontierEntries: Entry[] = lessons.map((entry) => ({
  ...entry,
  controls: [],
  challenge: "",
  preset: {},
  attributionStatus: "provisional",
  relationship: "ASSOCIATED_WITH",
}));
const people: [string, string, string, string[]][] = [
  [
    "shapley",
    "Lloyd Shapley",
    "Mathematician whose work with David Gale developed stable matching; a central contributor to game theory and market design.",
    ["games", "algorithms"],
  ],
  [
    "gale",
    "David Gale",
    "Mathematician who coauthored the foundational deferred-acceptance analysis of stable matching.",
    ["games", "algorithms"],
  ],
  [
    "alvin-roth",
    "Alvin Roth",
    "Economist and author of Who Gets What—and Why, whose market-design research connects matching theory with practical allocation systems.",
    ["games", "markets", "algorithms"],
  ],
  [
    "cournot",
    "Antoine Augustin Cournot",
    "Economist and mathematician associated with quantity competition and an early mathematical treatment of markets.",
    ["games", "markets"],
  ],
  [
    "stackelberg",
    "Heinrich von Stackelberg",
    "Economist associated with sequential quantity competition and leadership in oligopoly models.",
    ["games", "markets"],
  ],
  [
    "bertrand",
    "Joseph Bertrand",
    "Mathematician associated with a price-setting critique of quantity competition in oligopoly.",
    ["games", "markets"],
  ],
  [
    "roberson",
    "Brian Roberson",
    "Economist whose research analyses Colonel Blotto contests and strategic allocation across multiple objectives.",
    ["games", "decisions"],
  ],
  [
    "roughgarden",
    "Tim Roughgarden",
    "Computer scientist and author of Twenty Lectures on Algorithmic Game Theory, known for selfish routing and the price of anarchy.",
    ["games", "algorithms", "operations"],
  ],
  [
    "tardos",
    "Eva Tardos",
    "Computer scientist whose algorithmic game-theory research includes the efficiency of selfish routing.",
    ["games", "algorithms"],
  ],
  [
    "centola",
    "Damon Centola",
    "Sociologist and author of Change and How Behavior Spreads, known for experiments and models of complex contagion.",
    ["social", "complexity"],
  ],
  [
    "macy",
    "Michael Macy",
    "Sociologist who coauthored research on social reinforcement and complex contagions in networks.",
    ["social", "complexity"],
  ],
  [
    "hardt",
    "Moritz Hardt",
    "Computer scientist and coauthor of Fairness and Machine Learning, whose research examines prediction, fairness, and feedback in deployed systems.",
    ["algorithms", "information"],
  ],
  [
    "perdomo",
    "Juan C. Perdomo",
    "Researcher and coauthor of the foundational Performative Prediction paper on models that alter their target distributions.",
    ["algorithms", "information"],
  ],
  [
    "zrnic",
    "Tijana Zrnic",
    "Statistician and researcher who coauthored work on performative prediction and inference in adaptive systems.",
    ["algorithms", "information"],
  ],
  [
    "mendler-dunner",
    "Celestine Mendler-Dünner",
    "Researcher whose work studies performative prediction, optimisation, and feedback from deploying predictive models.",
    ["algorithms", "complexity"],
  ],
  [
    "kleinberg",
    "Jon Kleinberg",
    "Computer scientist whose research includes networks, algorithms, and formal tradeoffs in algorithmic fairness.",
    ["algorithms", "information"],
  ],
  [
    "mullainathan",
    "Sendhil Mullainathan",
    "Economist and coauthor of Scarcity, whose work connects behavioural economics and machine learning with social decisions.",
    ["algorithms", "behavior", "decisions"],
  ],
  [
    "raghavan",
    "Manish Raghavan",
    "Computer scientist whose research studies algorithmic decision making and the limits of fairness criteria.",
    ["algorithms", "decisions"],
  ],
  [
    "dwork",
    "Cynthia Dwork",
    "Computer scientist who helped establish differential privacy and coauthored The Algorithmic Foundations of Differential Privacy.",
    ["algorithms", "information"],
  ],
  [
    "aaron-roth",
    "Aaron Roth",
    "Computer scientist and coauthor of The Algorithmic Foundations of Differential Privacy, known for privacy and algorithmic decision research.",
    ["algorithms", "information"],
  ],
  [
    "simons",
    "Daniel Simons",
    "Psychologist and coauthor of The Invisible Gorilla, known for research on attention and failures to notice visible events.",
    ["perception", "behavior"],
  ],
  [
    "chabris",
    "Christopher Chabris",
    "Psychologist and coauthor of The Invisible Gorilla, whose research includes attention, cognition, and inattentional blindness.",
    ["perception", "behavior"],
  ],
  [
    "rensink",
    "Ronald Rensink",
    "Vision researcher who co-developed the flicker paradigm for investigating change blindness and visual attention.",
    ["perception", "behavior"],
  ],
  [
    "zajonc",
    "Robert Zajonc",
    "Psychologist known for research on affect, social psychology, and the attitudinal effects of mere exposure.",
    ["behavior", "perception"],
  ],
];
export const frontierThinkers: Thinker[] = people.map(
  ([id, name, description, areaIds]) => ({
    id,
    name,
    description,
    areaIds,
    slug: name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-"),
  }),
);
