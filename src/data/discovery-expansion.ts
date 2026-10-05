import type { Entry, Control } from "./expansion";
import type { Thinker } from "@/types/catalog";
const c = (
  key: string,
  label: string,
  min: number,
  max: number,
  value: number,
  suffix = "",
): Control => ({ key, label, min, max, value, suffix });
type Lesson = {
  id: string;
  name: string;
  categories: string[];
  thinker?: string;
  coThinkers?: string[];
  format: "game" | "simulation";
  question: string;
  description: string;
  idea: string;
  mechanism: string;
  example: string;
  limitation: string;
  source: [string, string];
  controls?: Control[];
  related: string[];
};
const lessons: Lesson[] = [
  {
    id: "wason-selection",
    name: "Wason Selection Task",
    categories: ["decisions", "learning"],
    thinker: "wason",
    format: "game",
    description: "Turn only the cards that could expose a broken rule.",
    question:
      "Every vowel must have an even number on the other side. Select the cards you need to check.",
    idea: "A conditional rule is contradicted by a case satisfying its first condition but failing its second. Looking for confirming cases alone can miss that violation.",
    mechanism:
      "Cards A, K, 4 and 7 each have a letter on one side and a number on the other. The sufficient inspection set is A and 7. Feedback explains each selection without pretending that one response measures reasoning ability.",
    example:
      "A policy says every urgent request must have approval. Audit urgent requests and unapproved requests, rather than only approved ones.",
    limitation:
      "Context, interpretation and prior familiarity affect this task. Its answer depends on the explicitly stated one-way rule.",
    source: [
      "University reasoning lesson: the Wason task",
      "https://openbooks.library.baylor.edu/cognition2/chapter/chapter-11-reasoning-and-decision-making/",
    ],
    related: ["confirmation-bias", "conjunction-fallacy"],
  },
  {
    id: "cognitive-reflection",
    name: "Cognitive Reflection",
    categories: ["decisions", "learning"],
    thinker: "frederick",
    format: "game",
    description:
      "Pause before accepting an answer that feels immediately right.",
    question:
      "A mug and a spoon cost 120 coins together. The mug costs 100 more than the spoon. What does the spoon cost?",
    idea: "Cognitive reflection involves checking an appealing initial response against the constraints of the problem.",
    mechanism:
      "This original arithmetic variant offers 10, 20 and 100 coins. Substitution into both equations verifies 10; it does not assign an intelligence score.",
    example:
      "Checking the total and the difference catches an attractive price estimate before it enters a budget.",
    limitation:
      "One familiar puzzle cannot measure general ability. Language, schooling and practice change performance.",
    source: [
      "Shane Frederick: Cognitive Reflection and Decision Making",
      "https://www.aeaweb.org/articles?id=10.1257/089533005775196732",
    ],
    related: ["dunning-kruger-effect", "conjunction-fallacy"],
  },
  {
    id: "newcomb-problem",
    name: "Newcomb's Problem",
    categories: ["decisions", "games"],
    thinker: "nozick",
    format: "game",
    description: "Choose boxes, then distinguish prediction from causation.",
    question:
      "A predictor has already filled the sealed box. Take it alone or take both boxes. Compare two ways of evaluating the choice.",
    idea: "Newcomb’s problem puts evidential reasoning about a reliable prediction alongside causal reasoning about boxes whose contents are already fixed.",
    mechanism:
      "The sealed box holds 1,000 tokens if the prediction was one box, otherwise zero. The open box holds 10. A stipulated predictor accuracy yields conditional expected payoffs; the realized teaching outcome is sampled after a choice, without implying backward causation.",
    example:
      "A predictive association may help estimate outcomes while leaving a separate question about what an intervention actually changes.",
    limitation:
      "This is a disputed philosophical thought experiment. The probability model stipulates the predictor and does not settle which decision theory is correct.",
    source: [
      "Stanford Encyclopedia: causal decision theory and Newcomb",
      "https://plato.stanford.edu/entries/decision-causal/",
    ],
    controls: [
      c("accuracy", "Stipulated prediction accuracy", 50, 100, 90, "%"),
    ],
    related: ["value-of-information", "prisoners-dilemma"],
  },
  {
    id: "dollar-auction",
    name: "Dollar Auction",
    categories: ["games", "decisions"],
    thinker: "shubik",
    format: "game",
    description: "Watch a small bid become an expensive contest.",
    question:
      "The prize is 20 tokens. Both the winner and runner-up pay their final bids. Bid one more or stop.",
    idea: "Paying the second-highest bid as well as the winning bid can create incentives to escalate even after the prize ceases to justify the total cost.",
    mechanism:
      "You and a disclosed bot alternate bids one token apart. The bot bids up to 26. Your standing bid is owed if you stop as runner-up; if the bot stops, you receive 20 minus your winning bid. No real money is involved.",
    example:
      "A contest can make continuing appear attractive relative to accepting an existing loss, even while worsening total returns.",
    limitation:
      "The bot has a fixed cutoff, not human judgment. This is a finite classroom version of the auction.",
    source: [
      "Martin Shubik: The Dollar Auction game",
      "https://journals.sagepub.com/doi/10.1177/002200277101500111",
    ],
    related: ["sunk-cost-fallacy", "tullock-contest"],
  },
  {
    id: "travelers-dilemma",
    name: "Traveler's Dilemma",
    categories: ["games", "decisions"],
    thinker: "basu",
    format: "game",
    description: "A tiny undercut changes both travelers’ payments.",
    question:
      "Claim 2–20 tokens for identical lost souvenirs. The lower claim is paid to both; its owner gets a bonus and the higher claimant pays a penalty.",
    idea: "The traveler’s dilemma contrasts repeated undercutting arguments with the high joint payoffs available when players make high matching claims.",
    mechanism:
      "A disclosed partner claims 18. Equal claims receive that number. Unequal claims receive the lower number, plus the bonus for its owner and minus the bonus for the other. Claims and the bonus are adjustable.",
    example:
      "An incentive intended to encourage truthful claims can instead reward strategic undercutting.",
    limitation:
      "The disclosed partner is not a population of human players. Payoffs can be negative and are teaching tokens.",
    source: [
      "Kaushik Basu: papers including the Traveler’s Dilemma",
      "https://kaushikbasu.org/papers/",
    ],
    controls: [
      c("claim", "Your claim", 2, 20, 18),
      c("bonus", "Bonus and penalty", 1, 5, 2),
    ],
    related: ["prisoners-dilemma", "nash-bargaining"],
  },
  {
    id: "nim",
    name: "Nim",
    categories: ["games", "learning"],
    thinker: "bouton",
    format: "game",
    description: "Take stones from one pile and try to take the last stone.",
    question:
      "Three piles: 3, 4 and 5 stones. Remove any positive number from one pile. Whoever takes the last stone wins.",
    idea: "Normal-play Nim has positions from which a perfect opponent can force a win. The XOR, or nim-sum, identifies the balanced positions.",
    mechanism:
      "The bot removes stones to make the nim-sum zero when possible, otherwise takes one stone. Both players use the same legal moves and the normal last-stone-wins rule.",
    example:
      "A visible move can be evaluated by the future options it leaves, rather than only by its immediate size.",
    limitation:
      "This is normal-play Nim. Changing the last-stone rule changes the strategy; the bot plays optimally.",
    source: [
      "Charles Bouton: Nim, A Game with a Complete Mathematical Theory",
      "https://paradise.caltech.edu/ist4/lectures/Bouton1901.pdf",
    ],
    related: ["rock-paper-scissors", "centipede-game"],
  },
  {
    id: "penneys-game",
    name: "Penney's Game",
    categories: ["probability", "games"],
    format: "game",
    description:
      "Race two coin patterns that have equal frequency but unequal winning chances.",
    question:
      "Choose a three-flip pattern. The opponent chooses a counter-pattern. Flip until one pattern appears first.",
    idea: "Equal probabilities of individual three-flip blocks do not imply equal chances of appearing first in an overlapping sequence.",
    mechanism:
      "For your pattern abc, the bot selects not-b, a, b. Fair seeded flips continue until one pattern occurs, with a 200-flip safety limit and an explicit unfinished result.",
    example:
      "Ordering and overlap matter when comparing competing sequences, even if their standalone frequencies match.",
    limitation:
      "Fair independent coin flips are assumed. A single race is not an estimate of the exact long-run probability.",
    source: [
      "Stanford probability lesson: Penney’s game",
      "https://crypto.stanford.edu/~blynn/pr/penney.html",
    ],
    related: ["rock-paper-scissors", "gamblers-fallacy"],
  },
  {
    id: "nontransitive-dice",
    name: "Nontransitive Dice",
    categories: ["probability", "games"],
    format: "game",
    description:
      "Find a cycle of dice where no die is best against every opponent.",
    question:
      "Choose a die, then roll against the opponent’s counter-die. Inspect all 36 face pairings.",
    idea: "Pairwise superiority need not produce an overall ranking: one die can beat another more often, yet lose to a third.",
    mechanism:
      "Dice A=[2,2,4,4,9,9], B=[1,1,6,6,8,8], C=[3,3,5,5,7,7] form a cycle with winning probability 5/9 in each favored pairing. Rolls sample faces uniformly.",
    example:
      "A comparison that depends on the opponent cannot always be summarized by a single best option.",
    limitation:
      "These deliberately constructed dice are not ordinary six-sided dice. Finite roll counts fluctuate around their exact probabilities.",
    source: [
      "Research: A Game of Nontransitive Dice",
      "https://arxiv.org/abs/1706.00849",
    ],
    related: ["rock-paper-scissors", "penneys-game"],
  },
  {
    id: "ikea-effect",
    name: "IKEA Effect",
    categories: ["behavior", "decisions"],
    thinker: "norton",
    coThinkers: ["mochon", "ariely"],
    format: "game",
    description:
      "Build a tiny tile picture, then compare attachment with quality.",
    question:
      "Assemble three tiles. Rate your finished picture, then inspect the identical ready-made version.",
    idea: "Successful participation in making something can increase its subjective value. Personal attachment is distinct from an independent measure of quality.",
    mechanism:
      "Three tile placements complete a fixed picture. You rate it on a 1–5 scale before an identical ready-made picture is revealed. No extra value is assigned by the program.",
    example:
      "A team may favor a tool it built; blind comparisons can separate useful customization from attachment to effort.",
    limitation:
      "Clicking tiles is a brief analogy, not a replication of the original studies. A rating does not establish a personal bias.",
    source: [
      "Norton, Mochon and Ariely: When Labor Leads to Love",
      "https://www.hbs.edu/ris/Publication%20Files/11-091.pdf",
    ],
    related: ["endowment-effect", "sunk-cost-fallacy"],
  },
  {
    id: "barnum-effect",
    name: "Barnum Effect",
    categories: ["behavior", "information"],
    thinker: "forer",
    format: "game",
    description:
      "Test whether a flattering description actually distinguishes you.",
    question:
      "Read a broad description and rate how well it fits. Then reveal how it was produced.",
    idea: "Broad, flexible descriptions can feel personally specific even when they fit many people. This is also called the Forer effect.",
    mechanism:
      "Everyone receives the same original, non-diagnostic description. Your 1–5 rating is retained when that fact is revealed. No personal information is collected.",
    example:
      "Before trusting a personality reading, ask what observation would distinguish it from a description given to everyone.",
    limitation:
      "This transparent classroom exercise cannot measure susceptibility or validate a personality assessment.",
    source: [
      "Bertram Forer: The fallacy of personal validation",
      "https://pubmed.ncbi.nlm.nih.gov/18110193/",
    ],
    related: ["confirmation-bias", "halo-effect"],
  },
  {
    id: "illusion-of-control",
    name: "Illusion of Control",
    categories: ["behavior", "probability"],
    thinker: "langer",
    format: "game",
    description:
      "Choose the launch button, then check whether choice changes the odds.",
    question:
      "Pick a launch pad and predict heads or tails. Every pad uses the same fair coin mechanism.",
    idea: "Features associated with skill can make chance outcomes feel more controllable than their mechanism supports.",
    mechanism:
      "The pad is decorative and does not enter the seeded coin calculation. Prediction scores accumulate over trials; changing the pad cannot change the fair 50% probability.",
    example:
      "Choosing a lottery ticket may feel like influence without changing its probability under a uniform draw.",
    limitation:
      "The coin is pseudo-random for reproducibility. This task does not test whether you experience the research effect.",
    source: [
      "Research on illusory control and agency, including Langer",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC5399809/",
    ],
    related: ["gamblers-fallacy", "dunning-kruger-effect"],
  },
  {
    id: "recognition-heuristic",
    name: "Recognition Heuristic",
    categories: ["decisions", "information"],
    thinker: "gigerenzer",
    coThinkers: ["goldstein"],
    format: "game",
    description:
      "Compare a familiar name with evidence that matters to the task.",
    question:
      "Choose which fictional shop sells more. First see names, then reveal the relevant sales totals.",
    idea: "When one option is recognized and another is not, recognition can act as a cue if it correlates with the criterion. It is not universally reliable.",
    mechanism:
      "A familiar-looking fictional name is paired with an unfamiliar one. A two-stage choice reveals invented sales of 40 and 70 respectively; these values illustrate a cue failure, not real market data.",
    example:
      "Familiarity may help in some searches while failing when advertising visibility is unrelated to quality.",
    limitation:
      "The task creates name familiarity rather than measuring recognition memory. Its invented pair does not test ecological validity.",
    source: [
      "Goldstein and Gigerenzer: Models of Ecological Rationality",
      "https://cs.nyu.edu/~shasha/papers/RecognitionHeuristic.pdf",
    ],
    related: ["availability-heuristic", "halo-effect"],
  },
  {
    id: "serial-position-effect",
    name: "Serial Position Effect",
    categories: ["learning", "behavior"],
    thinker: "murdock",
    format: "game",
    description: "Recall a list, then inspect which positions you remembered.",
    question:
      "Advance through eight words once. Hide the list and type the words you remember, separated by commas.",
    idea: "Recall often varies with an item’s position, with early and late items showing advantages under some conditions.",
    mechanism:
      "Eight distinct seeded words are shown individually at the reader’s pace. Exact case-insensitive matching scores each original position; repeated words count once. The observed profile is drawn from your answers, not a preset U-shaped curve.",
    example:
      "Position can matter when organizing a spoken list of instructions; a short local trial cannot determine an ideal layout.",
    limitation:
      "Self-paced presentation, rehearsal and the short list differ from controlled free-recall studies. A U-shaped pattern is not guaranteed.",
    source: [
      "Bennet Murdock: The serial position effect of free recall",
      "https://doi.org/10.1037/h0045106",
    ],
    related: ["forgetting-curve", "testing-effect"],
  },
  {
    id: "testing-effect",
    name: "Testing Effect",
    categories: ["learning"],
    thinker: "roediger",
    coThinkers: ["karpicke"],
    format: "game",
    description: "Try retrieval with feedback instead of only rereading.",
    question:
      "Study three invented word pairs. Hide them and practice recalling their partners, then check your answers.",
    idea: "Retrieval practice can improve later retention compared with additional study under appropriate conditions. It is also called test-enhanced learning.",
    mechanism:
      "Three fictional associations are shown, then hidden for typed retrieval. Scoring records exact normalized answers and reveals correct partners. A study-again action supports deliberate practice.",
    example:
      "Attempting to explain a concept before checking notes makes missing knowledge visible and creates a retrieval opportunity.",
    limitation:
      "Immediate practice does not measure delayed retention or prove an advantage over rereading. No invented forgetting percentages are shown.",
    source: [
      "Roediger and Karpicke: Test-enhanced learning",
      "https://pubmed.ncbi.nlm.nih.gov/16507066/",
    ],
    related: ["forgetting-curve", "serial-position-effect"],
  },
  {
    id: "affect-heuristic",
    name: "Affect Heuristic",
    categories: ["behavior", "decisions"],
    thinker: "slovic",
    format: "game",
    description: "Reveal evidence behind an attractive or alarming label.",
    question:
      "Two fictional plans have different names. Choose one, reveal their outcomes, and decide again.",
    idea: "A positive or negative feeling can act as a shortcut when judging benefits and risks. Feelings are information, but do not replace task-specific evidence.",
    mechanism:
      "Bright Horizon and Storm Plan have invented net benefits of 12 and 18. An initial choice is followed by the same cost-benefit evidence for both; the program records whether your choice changes.",
    example:
      "An appealing project name can shape a first impression before its costs and benefits are considered.",
    limitation:
      "Names are illustrative cues, not a controlled emotional manipulation. Neither choice diagnoses a bias.",
    source: [
      "University of Oregon: Slovic’s work on affect and judgment",
      "https://news.uoregon.edu/oq/head-and-heart",
    ],
    related: ["framing-effect", "halo-effect"],
  },
  {
    id: "scope-insensitivity",
    name: "Scope Insensitivity",
    categories: ["behavior", "decisions"],
    thinker: "slovic",
    format: "game",
    description:
      "Compare the scale of a benefit before allocating a fixed budget.",
    question:
      "Rate a fictional rescue project for 10 birds, then 100 birds. Both have the same cost and success rate.",
    idea: "Valuation can respond less strongly to changes in the size of a benefit than the stated decision criterion would suggest.",
    mechanism:
      "Two 1–5 ratings are recorded for otherwise identical invented projects. Their scales are then compared without asserting that ethical value must rise linearly.",
    example:
      "When maximizing a stated benefit under equal cost and certainty, count the outcomes as well as responding to an individual story.",
    limitation:
      "A bounded rating scale cannot express ten times as much value. Moral priorities can legitimately include considerations beyond outcome counts.",
    source: [
      "University research: scope insensitivity in public policy",
      "https://scholarsbank.uoregon.edu/server/api/core/bitstreams/a4093754-3612-4b07-8214-07333e5b2b72/content",
    ],
    related: ["zero-risk-bias", "affect-heuristic"],
  },
  {
    id: "st-petersburg-paradox",
    name: "St. Petersburg Paradox",
    categories: ["probability", "risk"],
    format: "simulation",
    description: "A lottery’s average can be dominated by very rare prizes.",
    question:
      "Compare a capped coin lottery’s exact mean with 200 sampled payouts. Change the maximum number of flips.",
    idea: "The ideal unbounded St. Petersburg lottery has infinite expected monetary payoff, although willingness to pay is generally finite. A cap makes the expectation finite.",
    mechanism:
      "At the first heads on flip k the payout is 2^k. If no heads occurs by cap n, the payout is 2^n. Each earlier first-head event contributes one to the mean; the capped tail contributes two, so the exact expected payout is n+1.",
    example:
      "A headline average can give a poor picture of a typical outcome when rare extremes dominate it.",
    limitation:
      "This finite capped version is not an infinite lottery. Sampled means vary and do not determine a fair price for every person.",
    source: [
      "Berkeley teaching notes on expected utility and the paradox",
      "https://eml.berkeley.edu/~fechenique/lecture_notes/EU.pdf",
    ],
    controls: [c("cap", "Maximum flips", 2, 15, 8)],
    related: ["fat-tails", "ergodicity"],
  },
  {
    id: "hawk-dove",
    name: "Hawk–Dove Game",
    categories: ["games", "ecology"],
    thinker: "maynard-smith",
    coThinkers: ["price"],
    format: "simulation",
    description: "Compare fighting and yielding as the opponent mix changes.",
    question:
      "Move the share of hawks and the cost of fighting. Where do the two strategies have equal expected payoff?",
    idea: "When escalation is costly, the success of aggressive behavior depends on how often it meets another aggressive opponent.",
    mechanism:
      "Resource value is 10. Hawk versus hawk yields (10-cost)/2; hawk versus dove gets 10; dove versus hawk gets zero; two doves get 5 each. Expected payoffs average over the selected opponent mix.",
    example:
      "Competition that pays against yielding opponents may become costly when everyone escalates.",
    limitation:
      "This is a one-shot expected-payoff model, not an evolutionary simulation or a recommendation for human conflict.",
    source: [
      "Maynard Smith and Price: The Logic of Animal Conflict",
      "https://www.nature.com/articles/246015a0",
    ],
    controls: [
      c("hawks", "Hawks among opponents", 0, 100, 50, "%"),
      c("cost", "Cost of fighting", 12, 40, 20),
    ],
    related: ["chicken-game", "prisoners-dilemma"],
  },
  {
    id: "condorcet-cycle",
    name: "Condorcet Voting Paradox",
    categories: ["social", "games"],
    format: "simulation",
    description: "Three consistent voters can produce a cycling majority.",
    question:
      "Three groups rank A>B>C, B>C>A and C>A>B. Adjust the size of the first group and compare pairs.",
    idea: "Individually consistent rankings can aggregate into a majority cycle: A defeats B, B defeats C, and C defeats A.",
    mechanism:
      "Two groups contain three voters each; the first contains the chosen number. All pairwise votes are counted from strict rankings. A Condorcet winner must defeat both alternatives.",
    example:
      "Meeting outcomes can depend on the order of pairwise votes when no option defeats every rival.",
    limitation:
      "Only three ranking types are represented. The absence of a Condorcet winner does not mean voters themselves are inconsistent.",
    source: [
      "OpenStax: fairness in voting methods",
      "https://openstax.org/books/contemporary-mathematics/pages/11-2-fairness-in-voting-methods",
    ],
    controls: [c("voters", "Voters ranking A > B > C", 1, 10, 3)],
    related: ["median-voter", "nontransitive-dice"],
  },
  {
    id: "alabama-paradox",
    name: "Alabama Paradox",
    categories: ["social", "operations"],
    format: "simulation",
    description: "Adding a seat can make one group lose its allocation.",
    question:
      "Allocate 4 or 5 seats to populations 5, 3 and 1 using largest remainders. Watch the smallest group.",
    idea: "Hamilton’s largest-remainder method can reduce a group’s allocation when the total number of seats increases, even with populations unchanged.",
    mechanism:
      "Quotas equal population share times seats. Floors are assigned first; remaining seats go to the largest fractional remainders, with group order resolving exact ties.",
    example:
      "Allocating indivisible representatives or resources requires rules whose behavior can differ from proportional intuition.",
    limitation:
      "This three-group example isolates house-size monotonicity. It does not imply that every apportionment rule has the same failure.",
    source: [
      "University mathematics: Hamilton’s method and the Alabama paradox",
      "https://math.libretexts.org/Courses/Las_Positas_College/Math_for_Liberal_Arts/10%3A_Apportionment/10.01%3A_Hamiltons_Method",
    ],
    controls: [c("seats", "Total seats", 3, 8, 4)],
    related: ["condorcet-cycle", "pareto-concentration"],
  },
  {
    id: "gini-coefficient",
    name: "Gini Coefficient",
    categories: ["markets", "social"],
    format: "simulation",
    description:
      "Move resources toward one person and watch inequality change.",
    question:
      "Five people share 100 tokens. Shift tokens to the top holder and inspect the Lorenz curve.",
    idea: "The Gini coefficient summarizes relative inequality in a nonnegative distribution, rather than its total wealth or fairness.",
    mechanism:
      "The top holder receives the selected share; the other four split the remainder equally. Pairwise absolute differences produce the uncorrected population Gini. The maximum for five holders is 0.8.",
    example:
      "Two communities can have the same inequality coefficient and very different average incomes.",
    limitation:
      "Five invented holders are not a survey. Gini alone does not describe needs, poverty, justice or the full distribution.",
    source: [
      "World Bank: Gini index methodology",
      "https://databank.worldbank.org/metadataglossary/gender-statistics/series/SI.POV.GINI",
    ],
    controls: [c("top", "Tokens held by the top person", 20, 100, 60)],
    related: ["pareto-concentration", "diminishing-returns"],
  },
  {
    id: "polya-urn",
    name: "Pólya Urn",
    categories: ["probability", "complexity"],
    format: "simulation",
    description: "Drawing a color makes that color easier to draw next time.",
    question:
      "Start with one blue and one orange ball. Draw, replace it, and add more of its color. Compare repeated histories.",
    idea: "Reinforcement makes a process path-dependent: chance early draws change later probabilities without fixing a predetermined winner.",
    mechanism:
      "Each draw returns the ball and adds the selected number of matching balls. Three seeded histories start from identical balanced urns; the plot shows blue’s share after each draw.",
    example:
      "A small early advantage can be amplified by a mechanism that rewards existing adoption.",
    limitation:
      "An urn is an analogy, not a fitted model of popularity. Positive reinforcement does not guarantee one color completely takes over.",
    source: [
      "Research on generalized Pólya urn models",
      "https://arxiv.org/abs/1106.4325",
    ],
    controls: [
      c("reinforce", "Extra matching balls", 1, 5, 1),
      c("draws", "Draws", 10, 100, 40),
    ],
    related: ["power-laws", "social-tipping"],
  },
  {
    id: "galton-board",
    name: "Galton Board",
    categories: ["probability"],
    thinker: "galton",
    format: "simulation",
    description: "Drop balls through left–right decisions to build a mound.",
    question:
      "Each peg sends a ball left or right with equal probability. Drop 200 balls and compare the exact binomial shape.",
    idea: "Sums of many independent binary steps produce a binomial distribution whose shape approaches a bell curve as the number of steps increases.",
    mechanism:
      "Each ball takes n independent fair steps. The count of right steps chooses its bin. Observed counts are compared with exact binomial probabilities times 200.",
    example:
      "A roughly bell-shaped total can arise from adding many small independent contributions, even when each contribution is not bell-shaped.",
    limitation:
      "Independence and equal step probabilities are imposed. A bell shape in real data does not by itself identify its cause.",
    source: [
      "Francis Galton: Natural Inheritance and the quincunx",
      "https://galton.org/books/natural-inheritance/index.html",
    ],
    controls: [c("rows", "Rows of pegs", 2, 16, 8)],
    related: ["law-of-large-numbers", "random-walk"],
  },
  {
    id: "percolation",
    name: "Percolation",
    categories: ["complexity", "ecology"],
    format: "simulation",
    description: "Open tiles until a connected path crosses the board.",
    question:
      "Water enters open tiles along the top. Change how many tiles are open and see whether it can reach the bottom.",
    idea: "Local connections can enable a system-spanning path. A finite random grid illustrates connectivity without guaranteeing a path at a particular density.",
    mechanism:
      "A fixed seeded 10×10 grid assigns a threshold to each tile. Increasing openness activates a nested set. Flood fill uses only up, down, left and right neighbors from open top-row tiles.",
    example:
      "Connected gaps determine passage through porous material; the fraction of gaps alone does not describe their arrangement.",
    limitation:
      "This small site-percolation board does not estimate an infinite-lattice threshold or model real fluid dynamics.",
    source: [
      "Lectures on two-dimensional critical percolation",
      "https://arxiv.org/abs/0710.0856",
    ],
    controls: [c("open", "Chance a tile is open", 0, 100, 55, "%")],
    related: ["network", "social-tipping"],
  },
  {
    id: "diffusion",
    name: "Diffusion",
    categories: ["ecology", "operations"],
    format: "simulation",
    description: "Watch a concentration spread while the total stays constant.",
    question:
      "Start with dye in the middle of a closed row. Advance time and compare concentration across the cells.",
    idea: "Diffusion redistributes material down concentration gradients through local movement, without requiring directed motion toward a destination.",
    mechanism:
      "A closed 21-cell row starts with 100 units in the center. Each step transfers 20% to each available neighbor and retains the rest; boundary cells retain the share that cannot leave.",
    example:
      "A localized concentration spreads across a closed region while its total material is conserved.",
    limitation:
      "One-dimensional discrete mixing omits flow, reactions and material-specific coefficients. Time steps are illustrative.",
    source: [
      "OpenStax Biology: passive transport and diffusion",
      "https://openstax.org/books/biology/pages/5-2-passive-transport",
    ],
    controls: [c("time", "Mixing steps", 0, 60, 10)],
    related: ["stocks-and-flows", "random-walk"],
  },
  {
    id: "cobweb-model",
    name: "Cobweb Model",
    categories: ["markets", "operations"],
    format: "simulation",
    description: "Yesterday’s price can make tomorrow’s market oscillate.",
    question:
      "Producers respond to the previous price. Change the strength of their response and inspect price deviations from balance.",
    idea: "Delayed supply responses can create oscillating prices. Stability depends on the relationship between supply and demand responses.",
    mechanism:
      "The linearized deviation obeys x(t+1)=-r*x(t), starting at 1. Response r below one dampens, r=1 repeats, and r above one amplifies. The chart shows deviations, not literal negative prices.",
    example:
      "Planting based on the last harvest’s price can produce too much supply when the next harvest arrives.",
    limitation:
      "This is a linear local model with naive expectations. It omits storage, forecasts, shocks and nonlinear price bounds.",
    source: [
      "QuantEcon: The Cobweb Model",
      "https://intro.quantecon.org/cobweb.html",
    ],
    controls: [
      c("response", "Supply response relative to demand", 20, 140, 70, "%"),
    ],
    related: ["bullwhip-effect", "butterfly-effect"],
  },
  {
    id: "series-parallel-reliability",
    name: "Series & Parallel Reliability",
    categories: ["operations", "risk"],
    format: "simulation",
    description: "Compare a chain of dependencies with independent backups.",
    question:
      "Use the same components in series or parallel. Change their reliability and count.",
    idea: "A series system needs every component to work; a parallel system needs at least one. Independent redundancy can improve reliability while extra required dependencies reduce it.",
    mechanism:
      "For n identical independent components with success probability p, series reliability is p^n and parallel reliability is 1-(1-p)^n over the same period.",
    example:
      "A service that requires every link is different from one with genuinely independent fallback paths.",
    limitation:
      "Common-cause failures violate independence. These probabilities are for one specified period, not a lifetime or repair model.",
    source: [
      "NIST: bottom-up system reliability",
      "https://www.itl.nist.gov/div898/handbook/apr/section1/apr18.htm",
    ],
    controls: [
      c("reliability", "Each component works", 10, 99, 90, "%"),
      c("components", "Number of components", 1, 8, 3),
    ],
    related: ["risk-of-ruin", "diversification"],
  },
  {
    id: "small-world-shortcuts",
    name: "Small-World Shortcuts",
    categories: ["complexity", "social"],
    thinker: "watts",
    coThinkers: ["strogatz"],
    format: "simulation",
    description: "A few long links shorten routes across a ring.",
    question:
      "Twenty people each know their two nearest neighbors on either side. Add shortcuts and compare shortest paths.",
    idea: "Sparse long-range connections can sharply reduce distances while preserving many local links in a clustered network.",
    mechanism:
      "A 20-node degree-four ring is kept intact. Seeded nonlocal edges are added without duplicates. Breadth-first search measures mean shortest path and the route from node 1 to node 11.",
    example:
      "A small number of bridges between communities can make information travel through fewer intermediaries.",
    limitation:
      "This adds edges rather than reproducing the original Watts–Strogatz rewiring model. It measures routes, not message transmission.",
    source: [
      "Watts and Strogatz: Collective dynamics of small-world networks",
      "https://www.nature.com/articles/30918",
    ],
    controls: [c("shortcuts", "Extra long-range links", 0, 12, 2)],
    related: ["friendship-paradox", "network"],
  },
  {
    id: "bayesian-updating",
    name: "Bayesian Updating",
    categories: ["information", "decisions"],
    format: "simulation",
    description: "Update an urn hypothesis one observation at a time.",
    question:
      "Urn A has 70% blue balls; urn B has 30%. Draw with replacement and update your probability of A.",
    idea: "Bayesian updating combines a prior belief with the relative likelihood of the observed evidence under competing hypotheses.",
    mechanism:
      "The two urn hypotheses start with the selected prior. A seeded hidden urn generates draws with replacement. Blue has likelihood ratio 7/3, orange 3/7; posterior odds are multiplied by the appropriate ratio.",
    example:
      "Several independent observations can move an initial estimate substantially, while contradictory observations can move it back.",
    limitation:
      "Likelihoods and conditional independence are stipulated. Repeatedly counting the same evidence would overstate the update.",
    source: [
      "Berkeley probability lesson: Bayes’ rule",
      "https://www.stat.berkeley.edu/~aldous/Real_World/paradox.html",
    ],
    controls: [
      c("prior", "Initial probability of urn A", 5, 95, 50, "%"),
      c("draws", "Observed draws", 0, 20, 6),
    ],
    related: ["base-rate", "value-of-information"],
  },
  {
    id: "hysteresis",
    name: "Hysteresis",
    categories: ["operations", "complexity"],
    format: "simulation",
    description:
      "The same input can leave a switch on or off depending on its history.",
    question:
      "Move the signal up and down. Turn on at 60 and off at 40; between those thresholds, retain the previous state.",
    idea: "Hysteresis means a system’s current response depends on the path by which its input arrived, not only on its current input.",
    mechanism:
      "A stateful switch starts off with input 30, turns on at input >=60 and off at <=40. Inside the band it retains its state. A comparison switch uses one threshold at 50.",
    example:
      "Separate switching thresholds can keep a controller from rapidly toggling when a signal jitters near one boundary.",
    limitation:
      "This ideal relay is an illustrative form of hysteresis, not a complete magnetic or thermal system.",
    source: [
      "Texas Instruments: Understanding Schmitt Triggers",
      "https://www.ti.com/document-viewer/lit/html/scea046",
    ],
    controls: [c("signal", "Input signal", 0, 100, 30)],
    related: ["stocks-and-flows", "social-tipping"],
  },
];
export const discoveryEntries: Entry[] = lessons.map((e) => ({
  ...e,
  controls: e.controls ?? [],
  title: e.name,
  challenge: "",
  preset: {},
  source: { title: e.source[0], url: e.source[1] },
}));
const authors: [string, string, string, string[]][] = [
  [
    "wason",
    "Peter Wason",
    "Psychologist known for experimental work on reasoning, conditional rules and the selection task.",
    ["learning", "decisions"],
  ],
  [
    "frederick",
    "Shane Frederick",
    "Researcher whose Cognitive Reflection Test studies reflection on initially appealing answers.",
    ["learning", "decisions"],
  ],
  [
    "nozick",
    "Robert Nozick",
    "Philosopher and author of Philosophical Explanations, who analyzed Newcomb’s problem and principles of choice.",
    ["decisions", "games"],
  ],
  [
    "shubik",
    "Martin Shubik",
    "Economist and game theorist who introduced the dollar auction as a model of escalation.",
    ["games", "markets"],
  ],
  [
    "basu",
    "Kaushik Basu",
    "Economist and author of The Republic of Beliefs, who formulated the traveler’s dilemma.",
    ["games", "markets"],
  ],
  [
    "bouton",
    "Charles Bouton",
    "Mathematician who published a complete analysis of normal-play Nim in 1901.",
    ["games", "learning"],
  ],
  [
    "norton",
    "Michael Norton",
    "Behavioral researcher and author of The Ritual Effect; coauthor of research on the IKEA effect.",
    ["behavior", "decisions"],
  ],
  [
    "mochon",
    "Daniel Mochon",
    "Behavioral researcher and coauthor of the original IKEA-effect studies.",
    ["behavior", "decisions"],
  ],
  [
    "ariely",
    "Dan Ariely",
    "Behavioral economist and author of Predictably Irrational; coauthor of research on labor and valuation.",
    ["behavior", "decisions"],
  ],
  [
    "forer",
    "Bertram Forer",
    "Psychologist known for the classroom demonstration of personal validation now called the Forer effect.",
    ["behavior", "information"],
  ],
  [
    "langer",
    "Ellen Langer",
    "Psychologist and author of Mindfulness, known for work on perceived control and judgment.",
    ["behavior", "decisions"],
  ],
  [
    "gigerenzer",
    "Gerd Gigerenzer",
    "Psychologist and author of Risk Savvy, known for research on heuristics and ecological rationality.",
    ["decisions", "information"],
  ],
  [
    "murdock",
    "Bennet Murdock",
    "Psychologist whose experiments investigated free recall and serial-position patterns in memory.",
    ["learning", "behavior"],
  ],
  [
    "roediger",
    "Henry Roediger",
    "Psychologist and coauthor of Make It Stick, known for research on memory and retrieval practice.",
    ["learning"],
  ],
  [
    "karpicke",
    "Jeffrey Karpicke",
    "Psychologist whose research investigates retrieval practice and lasting learning.",
    ["learning"],
  ],
  [
    "slovic",
    "Paul Slovic",
    "Psychologist and author of The Perception of Risk, known for research on affect, risk perception and valuation.",
    ["behavior", "risk"],
  ],
  [
    "maynard-smith",
    "John Maynard Smith",
    "Evolutionary biologist and author of Evolution and the Theory of Games; coauthor of the logic of animal conflict.",
    ["ecology", "games"],
  ],
  [
    "price",
    "George Price",
    "Researcher who contributed to evolutionary theory and coauthored work on animal conflict.",
    ["ecology", "games"],
  ],
  [
    "watts",
    "Duncan Watts",
    "Sociologist and author of Six Degrees, who co-developed a foundational small-world network model.",
    ["social", "complexity"],
  ],
  [
    "strogatz",
    "Steven Strogatz",
    "Mathematician and author of Sync and Infinite Powers, known for research on nonlinear dynamics and networks.",
    ["complexity", "learning"],
  ],
];
export const discoveryThinkers: Thinker[] = authors.map(
  ([id, name, description, areaIds]) => ({
    id,
    name,
    description,
    areaIds,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }),
);
