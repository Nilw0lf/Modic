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
type Spec = Omit<Entry, "title" | "source"> & { source: [string, string] };
const specs: Spec[] = [
  {
    id: "stroop-effect",
    name: "Stroop Effect",
    thinker: "stroop",
    categories: ["perception", "behavior"],
    format: "game",
    description: "Name the ink color while the word tries to distract you.",
    question:
      "Play eight trials. Choose the ink color, not the word. Compare matching and conflicting trials.",
    controls: [],
    challenge: "Play another round",
    preset: {},
    idea: "Reading a familiar word can interfere with naming its ink color when the two disagree. The conflict makes an otherwise simple task less straightforward.",
    mechanism:
      "Eight trials alternate matching and conflicting words with seeded color choices. Response time runs from presentation to the correct answer; wrong answers add to the error count and elapsed time. Matching and conflicting means summarize only this small practice round.",
    example:
      "A dashboard that uses contradictory labels and colors asks people to resolve competing signals. Consistent cues can make its message easier to interpret.",
    limitation:
      "Practice, device latency, color vision, reading fluency and trial order affect results. This is not a controlled study or a diagnostic test. Screen readers announce both cues, so their times are not comparable to visual naming.",
    source: [
      "J. Ridley Stroop — Studies of interference in serial verbal reactions",
      "https://www.yorku.ca/pclassic/Stroop/",
    ],
  },
  {
    id: "fitts-law",
    name: "Fitts's Law",
    thinker: "fitts",
    categories: ["perception", "operations"],
    format: "game",
    description: "A nearby, larger target is generally easier to reach.",
    question:
      "Press Start, then hit the target. Change its width and distance and compare your own attempts.",
    controls: [
      c("width", "Target width", 8, 28, 16, "%"),
      c("distance", "Distance from start", 30, 75, 60, "%"),
    ],
    challenge: "Make a wide, nearby target",
    preset: { width: 28, distance: 30 },
    idea: "Fitts's Law relates movement time to target distance and width. A target can be visually prominent yet difficult to hit if it is narrow or far from the pointer.",
    mechanism:
      "The task places the start at 10% of the arena width and the target at 10% plus the selected distance. Width is a percentage of the same arena. The comparison uses the Shannon-form difficulty index log2(1 + distance/width), not a fitted prediction in milliseconds.",
    example:
      "Enlarging frequently used buttons and placing them near the relevant action can reduce pointing effort in an interface.",
    limitation:
      "This browser task includes thinking and device effects as well as movement. Keyboard navigation bypasses pointer distance. The original law and later variants require empirical coefficients to predict time.",
    source: [
      "Paul Fitts — The information capacity of the human motor system",
      "https://doi.org/10.1037/h0055392",
    ],
  },
  {
    id: "hicks-law",
    name: "Hick–Hyman Law",
    thinker: "hick",
    categories: ["perception", "decisions"],
    format: "game",
    description:
      "More possible responses can increase the time needed to choose.",
    question:
      "Start a round, find the requested item, and select it. Try a smaller and a larger menu.",
    controls: [c("choices", "Items in the menu", 2, 12, 6)],
    challenge: "Try twelve choices",
    preset: { choices: 12 },
    idea: "The Hick–Hyman law relates choice response time to uncertainty about the required response under particular experimental conditions.",
    mechanism:
      "Each round selects one equally likely item from a shuffled menu. The theoretical uncertainty is log2(number of choices) bits. The recorded browser time also includes visual search; no universal timing coefficient is assumed.",
    example:
      "Clear grouping and familiar labels can make a menu easier to navigate. Merely hiding options can also make important actions harder to find.",
    limitation:
      "This task is an illustration, not a replication of laboratory choice-reaction experiments. Visual search, reading, familiarity and accessibility tools affect the measured time.",
    source: [
      "William Hick — On the Rate of Gain of Information",
      "https://doi.org/10.1080/17470215208416600",
    ],
  },
  {
    id: "conjunction-fallacy",
    name: "Conjunction Fallacy",
    thinker: "tversky",
    coThinkers: ["kahneman"],
    categories: ["probability", "behavior"],
    format: "game",
    description:
      "A vivid two-part story can feel more likely than one of its parts.",
    question:
      "Read a short profile and choose the more probable statement. Then uncover the set relationship.",
    controls: [],
    challenge: "Try the story",
    preset: {},
    idea: "An event and an additional condition cannot be more probable than the original event alone. A persuasive description can make the narrower conjunction feel more representative.",
    mechanism:
      "The choice compares 'Alex is a librarian' with 'Alex is a librarian and volunteers for wildlife protection'. Every person in the second set also belongs to the first. The game supplies no population probabilities and does not require the two traits to be independent.",
    example:
      "When reviewing an elaborate prediction, compare the whole sequence with each necessary event. Adding conditions makes a scenario more specific, not automatically more probable.",
    limitation:
      "Natural-language interpretations can change what people think a question means. The game explicitly treats the broad statement as including people who also volunteer.",
    source: [
      "Tversky & Kahneman — Extensional versus intuitive reasoning",
      "https://doi.org/10.1037/0033-295X.90.4.293",
    ],
  },
  {
    id: "availability-heuristic",
    name: "Availability Heuristic",
    thinker: "tversky",
    coThinkers: ["kahneman"],
    categories: ["behavior", "information"],
    format: "game",
    description: "Memorable headlines are not a representative sample.",
    question:
      "Predict which event is more common from the headlines, then open the full record.",
    controls: [],
    challenge: "Look beyond the headlines",
    preset: {},
    idea: "The availability heuristic uses how easily examples come to mind as a clue to frequency or probability. Vivid or selectively reported events can distort that clue.",
    mechanism:
      "The fictional record contains 80 routine delays and 20 spectacular failures. The displayed feed includes one routine delay and four failures. The reveal distinguishes the selected feed from the complete record, without claiming this pattern describes real news.",
    example:
      "A memorable outage can dominate a team's discussion. Check incident counts and a defined reporting period before deciding which failure deserves the most attention.",
    limitation:
      "Salient events can be important even when rare. Frequency is not the same as severity, and remembering a useful example is not inherently irrational.",
    source: [
      "Tversky & Kahneman — Availability: A heuristic for judging frequency and probability",
      "https://doi.org/10.1016/0010-0285(73)90033-9",
    ],
  },
  {
    id: "halo-effect",
    name: "Halo Effect",
    thinker: "thorndike",
    categories: ["behavior", "decisions"],
    format: "game",
    description:
      "An impressive introduction can spill into unrelated judgments.",
    question:
      "Choose a candidate from the introductions. Reveal the work samples, then choose again.",
    controls: [],
    challenge: "Judge the relevant evidence",
    preset: {},
    idea: "The halo effect occurs when an overall impression or one salient trait influences judgments about other traits that should be assessed separately.",
    mechanism:
      "Two fictional candidates have different presentation cues. Their hidden work-sample scores are 62 and 88 on the same invented task. The reveal contrasts relevant evidence with introductory impressions; it does not measure bias from one selection.",
    example:
      "Score each interview competency against a rubric before forming an overall recommendation, rather than letting confidence or polish determine every rating.",
    limitation:
      "Presentation can be relevant for some jobs. The example deliberately isolates a work-sample objective and is not a claim that polished candidates perform poorly.",
    source: [
      "Edward Thorndike — A constant error in psychological ratings",
      "https://doi.org/10.1037/h0071663",
    ],
  },
  {
    id: "mental-accounting",
    name: "Mental Accounting",
    thinker: "thaler",
    categories: ["behavior", "markets"],
    format: "game",
    description: "The label on a loss can change how the same money feels.",
    question:
      "Decide whether to buy a replacement ticket in two situations with equal remaining resources.",
    controls: [],
    challenge: "Compare the two accounts",
    preset: {},
    idea: "Mental accounting groups resources into psychological budgets. Those categories can support planning, but can also change choices when the underlying resource consequences are identical.",
    mechanism:
      "Both cases begin with 100 units. One loses a purchased 20-unit ticket; the other loses 20 units of cash before buying. Buying now leaves 60 spendable units in either case, with one usable ticket. Choices are recorded separately, then compared.",
    example:
      "A separate entertainment budget may make a replacement purchase feel expensive even when the overall financial position is unchanged. Check both the category and the whole budget.",
    limitation:
      "Budget rules may reflect real commitments or useful self-control. Equivalence here assumes the lost ticket is non-refundable and has no other replacement route.",
    source: [
      "Richard Thaler — Mental Accounting and Consumer Choice",
      "https://doi.org/10.1287/mksc.4.3.199",
    ],
  },
  {
    id: "zero-risk-bias",
    name: "Zero-Risk Bias",
    categories: ["risk", "behavior"],
    format: "game",
    description:
      "Removing a small risk can feel better than preventing more harm overall.",
    question:
      "Spend one safety budget: eliminate a small source or reduce a larger one. Compare total expected incidents.",
    controls: [],
    challenge: "Compare remaining totals",
    preset: {},
    idea: "Zero-risk bias describes favoring the complete elimination of one risk over a larger overall reduction that leaves some risk remaining.",
    mechanism:
      "Two fictional sources produce expected counts of 5 and 50 comparable incidents per period. Option A eliminates the first; option B reduces the second by 15. Equal cost and equal incident severity are explicit assumptions. These are expected counts, not probabilities of mutually exclusive events.",
    example:
      "A reliability team can compare expected prevented incidents across equal-cost fixes instead of treating a component's zero-error target as the only objective.",
    limitation:
      "Unequal severity, duties, dependencies and uncertainty can justify a different choice. The game compares expected incident totals only and is not a real safety assessment.",
    source: [
      "Schneider and colleagues — Measuring the Zero-Risk Bias",
      "https://epub.ub.uni-muenchen.de/53237/",
    ],
  },
  {
    id: "default-effect",
    name: "Default Effect",
    thinker: "johnson",
    coThinkers: ["goldstein"],
    categories: ["behavior", "decisions"],
    format: "game",
    description:
      "A preselected option can steer a choice before you compare it.",
    question:
      "Choose a plan with one option preselected. Switch the default and check whether the underlying offer changed.",
    controls: [],
    challenge: "Change the starting choice",
    preset: {},
    idea: "A default is the outcome selected when someone takes no further action. Defaults can influence decisions through effort, perceived endorsement, or attachment to the starting option.",
    mechanism:
      "Two fictional plans have identical core service and clearly stated prices: Basic costs 10; Plus costs 16 with an optional extra. The experiment switches the preselected radio option while preserving these terms. It records your confirmation without estimating population uptake.",
    example:
      "When designing a settings screen, show what the default means and make alternatives easy to understand and select.",
    limitation:
      "A preference for a default can be informed. The experiment cannot determine whether effort, endorsement, familiarity or genuine preference caused a person's choice.",
    source: [
      "Eric Johnson & Daniel Goldstein — Do Defaults Save Lives?",
      "https://doi.org/10.1126/science.1091721",
    ],
  },
  {
    id: "dunning-kruger-effect",
    name: "Dunning–Kruger Effect",
    thinker: "dunning",
    coThinkers: ["kruger"],
    categories: ["learning", "behavior"],
    format: "game",
    description: "Compare confidence with answers rather than labeling people.",
    question:
      "Answer five short questions and record confidence before each reveal. Compare confidence with accuracy.",
    controls: [],
    challenge: "Check your calibration",
    preset: {},
    idea: "Dunning and Kruger's research examined how task performance and awareness of mistakes can relate to self-assessment. Confidence and competence are different measurements.",
    mechanism:
      "Five fixed, two-option questions ask for confidence from 50% to 100% before feedback. The summary shows your accuracy, average stated confidence and their difference. It does not estimate your percentile or produce the popular confidence-versus-expertise cartoon.",
    example:
      "After a prediction, record how sure you were before learning the outcome. Over many comparable decisions, check whether confident judgments are correct as often as expected.",
    limitation:
      "Five questions cannot establish a population effect or diagnose a person's competence. Item difficulty, prior knowledge and chance affect this tiny sample, and explanations of the original statistical pattern remain debated.",
    source: [
      "Justin Kruger & David Dunning — Unskilled and unaware of it",
      "https://pubmed.ncbi.nlm.nih.gov/10626367/",
    ],
  },
  {
    id: "berksons-paradox",
    name: "Berkson's Paradox",
    thinker: "berkson",
    categories: ["probability", "information"],
    description:
      "Selecting on either of two strengths can create a misleading tradeoff.",
    question:
      "Switch between all applicants and a shortlist selected for either skill. Compare the same two traits.",
    controls: [c("selected", "Show only the shortlist", 0, 1, 1)],
    challenge: "Show the whole applicant pool",
    preset: { selected: 0 },
    idea: "Berkson's paradox is a selection effect: conditioning on a common consequence of two variables can create an association between them even when they are independent in the original population.",
    mechanism:
      "The 100 applicants form a 10-by-10 grid of independent writing and coding scores from 1 to 10. The shortlist admits an applicant if writing is at least 8 OR coding is at least 8. The scatterplot and Pearson correlation use only the currently shown rows.",
    example:
      "If admission rewards either test skill or athletic skill, comparing admitted students can suggest a tradeoff that is absent from the full applicant pool.",
    limitation:
      "The threshold and independent grid are invented. Real traits can already be related, and different selection rules can create different associations.",
    source: [
      "Joseph Berkson — Limitations of fourfold table analysis to hospital data",
      "https://pubmed.ncbi.nlm.nih.gov/21001024/",
    ],
  },
  {
    id: "friendship-paradox",
    name: "Friendship Paradox",
    thinker: "feld",
    categories: ["social", "complexity"],
    description: "Highly connected people appear in more friendship lists.",
    question:
      "Give a central person more connections. Compare the ordinary average with sampling through friendship links.",
    controls: [c("leaves", "Friends linked to the center", 2, 12, 6)],
    challenge: "Build a larger star",
    preset: { leaves: 12 },
    idea: "The friendship paradox arises because people with more friends are represented more often when you sample friendship links than when you sample people equally.",
    mechanism:
      "A star network contains one center with n links and n leaves with one link each. Mean degree is 2n/(n+1). Following a uniformly sampled edge endpoint gives mean degree sum(k²)/sum(k), equal to (n+1)/2 here. This is an edge-weighted average, not every individual's neighbor average.",
    example:
      "A contact recruited through referrals may be better connected than a randomly selected participant. Account for the sampling method when estimating a community's typical connectivity.",
    limitation:
      "The comparison is about averages in an undirected graph. It does not mean every person's friends have more friends, and real ties need not form a star.",
    source: [
      "Scott Feld — Why Your Friends Have More Friends Than You Do",
      "https://doi.org/10.1086/229693",
    ],
  },
  {
    id: "wisdom-of-crowds",
    name: "Wisdom of Crowds",
    thinker: "galton",
    categories: ["social", "probability"],
    description:
      "Independent errors can cancel; a shared bias survives averaging.",
    question:
      "Change crowd size and shared bias. Compare one estimate with the crowd's mean across repeated teaching samples.",
    controls: [
      c("people", "People estimating", 1, 100, 20),
      c("bias", "Shared error", 0, 30, 0),
    ],
    challenge: "Give everyone the same bias",
    preset: { bias: 20 },
    idea: "Averaging diverse estimates can improve accuracy when errors partly cancel. More contributors cannot automatically remove an error shared by everyone.",
    mechanism:
      "The true quantity is 100. Each simulated guess adds a chosen common bias and independent uniform noise from −30 to +30. A batch of 200 crowds reports the mean absolute error for one person and for the crowd mean. The analytic uncertainty band uses noise standard deviation divided by the square root of crowd size; shared bias shifts its center.",
    example:
      "Ask colleagues to estimate independently before discussion. A shared anchor can make their errors move together even if many people contribute.",
    limitation:
      "The guesses are generated, not observed. Equal weighting is not always appropriate, and misinformation, extreme outliers or correlated errors can undermine aggregation.",
    source: [
      "Francis Galton — Vox Populi",
      "https://www.nature.com/articles/075450a0",
    ],
  },
  {
    id: "value-of-information",
    name: "Value of Information",
    thinker: "raiffa",
    categories: ["decisions", "information"],
    format: "game",
    description: "A clue is valuable when it can change a worthwhile decision.",
    question:
      "Choose to launch immediately, skip the project, or buy perfect information before choosing.",
    controls: [
      c("success", "Chance of success", 0, 100, 40, "%"),
      c("cost", "Cost of perfect information", 0, 50, 10),
    ],
    challenge: "Make the clue expensive",
    preset: { cost: 45 },
    idea: "The value of information is the improvement in a decision objective made possible by learning something before acting. It is not simply the amount of detail in a report.",
    mechanism:
      "Launching pays +80 on success and −40 on failure; skipping pays zero. Perfect information reveals the state before the choice. Expected value with free information is p×80; without it, the best value is max(0, p×80−(1−p)×40). Buying information subtracts the selected cost. A single played round samples the state and distinguishes realized payoff from expected value.",
    example:
      "A test is more useful when its result could reverse a costly commitment. Information that never changes your action may have little decision value despite being interesting.",
    limitation:
      "The clue is perfectly accurate and outcomes are correctly specified. Real tests have false results, delays and incomplete coverage. Expected payoff is only one possible objective.",
    source: [
      "Howard Raiffa — Decision Analysis: A Personal Account",
      "https://saghafian.scholars.harvard.edu/sites/g/files/omnuum11646/files/2025-06/raiffa-2002-decision-analysis-a-personal-account-of-how-it-got-started-and-evolved.pdf",
    ],
  },
  {
    id: "diversification",
    name: "Diversification",
    thinker: "markowitz",
    categories: ["risk", "markets"],
    description:
      "Combining different exposures helps most when they do not move together.",
    question:
      "Split two equally variable exposures. Change correlation and compare the combined variability.",
    controls: [
      c("weight", "Share in exposure A", 0, 100, 50, "%"),
      c("correlation", "Correlation", -100, 100, 0, "%"),
    ],
    challenge: "Make them move together",
    preset: { correlation: 100 },
    idea: "Diversification combines exposures whose changes need not coincide. The reduction in variability depends on both allocation and covariance, rather than the number of labels in a portfolio.",
    mechanism:
      "Both exposures have zero mean and standard deviation 10 units. Combined standard deviation is 10×sqrt(w²+(1−w)²+2ρw(1−w)). The chart compares allocations at the selected fixed correlation. No price paths, return predictions or actual assets are included.",
    example:
      "A business with two clients in the same industry may still face one shared demand shock. Distinct sources of income help only to the extent that their risks differ.",
    limitation:
      "Standard deviation is not all risk. Tail losses, dependencies that change under stress and unequal exposure sizes matter. This symmetric model is educational, not a portfolio recommendation.",
    source: [
      "Harry Markowitz — Portfolio Selection",
      "https://doi.org/10.1111/j.1540-6261.1952.tb01525.x",
    ],
  },
  {
    id: "random-walk",
    name: "Random Walk",
    thinker: "polya",
    categories: ["probability", "complexity"],
    description: "A fair step can still leave a long path far from its start.",
    question:
      "Take repeated left or right steps. Resample the paths and compare average position with distance from home.",
    controls: [c("steps", "Steps per walk", 10, 200, 60)],
    challenge: "Walk for longer",
    preset: { steps: 200 },
    idea: "A simple random walk adds independent random steps. A zero expected step does not force a particular path to stay close to its starting point.",
    mechanism:
      "Twenty one-dimensional paths start at zero and independently move +1 or −1 with equal probability. The highlighted path is one sample, and all paths remain unbounded. The root mean squared position reference is sqrt(number of steps); sample averages can fluctuate.",
    example:
      "Repeated small, balanced changes can still accumulate into substantial variation. Distinguish an unbiased mechanism from a guarantee of a neutral realized outcome.",
    limitation:
      "No drift or dependence is modeled. Finite runs do not prove eventual return; Pólya's recurrence results concern particular infinite-horizon random walks.",
    source: [
      "Russell Lyons — Random Walk Demonstrations and Pólya's theorem",
      "https://rdlyons.pages.iu.edu/rw/rw.html",
    ],
  },
  {
    id: "tragedy-of-the-anticommons",
    name: "Tragedy of the Anticommons",
    thinker: "heller",
    categories: ["markets", "operations"],
    format: "game",
    description:
      "Too many separate permissions can leave a useful resource unused.",
    question:
      "Decide whether to assemble all permissions for a project. Reduce fees and see when the same project becomes viable.",
    controls: [
      c("owners", "Required permission holders", 1, 10, 6),
      c("fee", "Fee per permission", 0, 20, 12),
    ],
    challenge: "Lower the permission fee",
    preset: { fee: 4 },
    idea: "An anticommons arises when multiple parties can exclude others from a resource and fragmented rights prevent useful activity, creating underuse rather than overuse.",
    mechanism:
      "A project creates 60 units of value and requires every owner's permission. Each charges the same selected fee, so net project value is 60 minus owners×fee. The decision game compares proceeding with abstaining, which pays zero. Negotiation delays and strategic pricing are omitted.",
    example:
      "A project needing many separate approvals or licenses can stall even when the underlying work has value. Coordinating permissions may reduce the barrier.",
    limitation:
      "Permission holders may have legitimate interests, and fees are not the only barrier. This is a coordination model, not advice about legal rights or an assumption that removing protections always helps.",
    source: [
      "Michael Heller — The Tragedy of the Anticommons",
      "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=57627",
    ],
  },
  {
    id: "minority-game",
    name: "Minority Game",
    thinker: "challet",
    coThinkers: ["zhang"],
    categories: ["games", "social"],
    format: "game",
    description: "Choose a side—but the smaller crowd wins.",
    question:
      "Pick A or B against 100 probability-based bots. Your own choice counts toward attendance.",
    controls: [c("aChance", "Bots choosing A", 0, 100, 60, "%")],
    challenge: "Make both sides equally likely",
    preset: { aChance: 50 },
    idea: "A minority game rewards participants for being on the less crowded side. A strategy that is attractive to one player can lose its advantage when enough others adopt it.",
    mechanism:
      "One human and 100 bots choose two sides. Each bot independently chooses A with the stated probability. The 101-player total prevents a tie; everyone on the smaller side wins one point. Bots do not learn. Exact binomial probabilities compare the chance of winning on either side.",
    example:
      "When choosing a shared facility or service time, predicting others' choices can matter more than an option's intrinsic appeal.",
    limitation:
      "The fixed bots omit the learning and adaptive strategies studied in the original minority-game research. Choosing a minority is not a general-purpose rule for social or market decisions.",
    source: [
      "Damien Challet & Yi-Cheng Zhang — Emergence of Cooperation and Organization",
      "https://arxiv.org/abs/adap-org/9708006",
    ],
  },
  {
    id: "rock-paper-scissors",
    name: "Rock, Paper, Scissors",
    categories: ["games", "decisions"],
    format: "game",
    description:
      "No move wins against every response; predictability is exploitable.",
    question:
      "Play against a bot with a visible rock preference. Compare a repeated move with randomized play.",
    controls: [c("rock", "Bot's rock probability", 0, 100, 33, "%")],
    challenge: "Make the bot predictable",
    preset: { rock: 80 },
    idea: "Rock, Paper, Scissors has cyclic dominance: rock beats scissors, scissors beats paper, and paper beats rock. No single pure action is an equilibrium of the symmetric game.",
    mechanism:
      "The bot independently chooses rock with the selected probability and divides the remainder equally between paper and scissors. Wins score +1, draws 0, and losses −1. The summary shows expected scores for each pure action and the one-third uniform mix. The bot never observes the current human move before sampling.",
    example:
      "When an opponent can exploit repeated choices, deliberately randomizing may protect against prediction. A biased opponent can also create an exploitable pattern.",
    limitation:
      "This bot is fixed rather than adaptive. Real people have sequence habits, and unequal payoffs would change the appropriate probabilities. The game is traditional; the source explains its mathematical structure.",
    source: [
      "Rafael Pass — Mixed strategies in Rock–Paper–Scissors",
      "https://www.cs.cornell.edu/~rafael/networks-html/chapter1.html",
    ],
  },
  {
    id: "stocks-and-flows",
    name: "Stocks and Flows",
    thinker: "meadows",
    categories: ["operations", "complexity"],
    description: "A smaller inflow can still leave a stock growing.",
    question:
      "Fill a tank, open the drain, and follow what accumulates. Compare rates with the amount stored.",
    controls: [
      c("inflow", "Inflow per minute", 0, 10, 6),
      c("outflow", "Maximum drain per minute", 0, 10, 4),
      c("minutes", "Minute to inspect", 0, 20, 0),
    ],
    challenge: "Drain faster than you fill",
    preset: { inflow: 3, outflow: 7 },
    idea: "A stock is an accumulated quantity; flows add to or remove from it. Changing a rate is different from changing the level that has already accumulated.",
    mechanism:
      "A tank starts with 40 units and has capacity 100. Each of 20 one-minute steps adds the inflow, drains up to the available amount, then caps storage at 100. Excess is counted as overflow. Drain capacity is not actual outflow when the tank is empty.",
    example:
      "A smaller backlog arrival rate does not shrink a queue unless departures exceed arrivals. Measure the existing backlog separately from the change per period.",
    limitation:
      "Rates are fixed, time is discrete, and there is no feedback delay. The ordering of flow updates is explicit; real systems may have continuously changing rates and constraints.",
    source: [
      "Donella Meadows — Leverage Points: Places to Intervene in a System",
      "https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/",
    ],
  },
];
const related: Record<string, string[]> = {
  "stroop-effect": ["halo-effect", "fitts-law"],
  "fitts-law": ["hicks-law", "opportunity-cost"],
  "hicks-law": ["fitts-law", "default-effect"],
  "conjunction-fallacy": ["base-rate", "confirmation-bias"],
  "availability-heuristic": ["survivorship", "signal-detection"],
  "halo-effect": ["anchoring-bias", "dunning-kruger-effect"],
  "mental-accounting": ["sunk-cost-fallacy", "loss-aversion"],
  "zero-risk-bias": ["base-rate", "value-of-information"],
  "default-effect": ["endowment-effect", "present-bias"],
  "dunning-kruger-effect": ["confirmation-bias", "regression"],
  "berksons-paradox": ["simpsons-paradox", "survivorship"],
  "friendship-paradox": ["network", "power-laws"],
  "wisdom-of-crowds": ["law-of-large-numbers", "information-cascade"],
  "value-of-information": ["multi-armed-bandit", "optionality"],
  diversification: ["barbell-strategy", "fat-tails"],
  "random-walk": ["gamblers-fallacy", "law-of-large-numbers"],
  "tragedy-of-the-anticommons": ["tragedy-of-the-commons", "coordination-game"],
  "minority-game": ["el-farol-bar", "rock-paper-scissors"],
  "rock-paper-scissors": ["matching-pennies", "minority-game"],
  "stocks-and-flows": ["littles-law", "logistic-growth"],
};
export const simpleEntries: Entry[] = specs.map(({ source, ...spec }) => ({
  ...spec,
  related: related[spec.id],
  title: spec.name,
  source: { title: source[0], url: source[1] },
}));
export const simpleIds = new Set(simpleEntries.map((entry) => entry.id));
export const simpleThinkers: Thinker[] = [
  [
    "stroop",
    "J. Ridley Stroop",
    "Psychologist whose experiments studied interference between reading words and naming ink colors.",
    ["perception", "behavior"],
  ],
  [
    "fitts",
    "Paul Fitts",
    "Psychologist whose research connected movement difficulty with target size and distance.",
    ["perception", "operations"],
  ],
  [
    "hick",
    "William Hick",
    "Psychologist whose experiments related response time to the uncertainty of a choice.",
    ["perception", "decisions"],
  ],
  [
    "thorndike",
    "Edward Thorndike",
    "Psychologist who studied learning and described the halo error in trait ratings.",
    ["behavior", "learning"],
  ],
  [
    "johnson",
    "Eric Johnson",
    "Decision researcher and author of The Elements of Choice, studying how the design of choices affects decisions.",
    ["behavior", "decisions"],
  ],
  [
    "goldstein",
    "Daniel Goldstein",
    "Decision researcher whose work includes defaults, judgment and bounded rationality.",
    ["behavior", "decisions"],
  ],
  [
    "dunning",
    "David Dunning",
    "Social psychologist whose research examines self-assessment, judgment and awareness of errors.",
    ["behavior", "learning"],
  ],
  [
    "kruger",
    "Justin Kruger",
    "Psychologist who coauthored research on skill and the accuracy of self-assessment.",
    ["behavior", "learning"],
  ],
  [
    "berkson",
    "Joseph Berkson",
    "Statistician who examined how selection into a sample can distort associations.",
    ["probability", "information"],
  ],
  [
    "feld",
    "Scott Feld",
    "Sociologist whose work explains degree-weighted sampling in friendship networks.",
    ["social", "complexity"],
  ],
  [
    "galton",
    "Francis Galton",
    "Historical statistician whose Vox Populi report examined the aggregation of estimates in a guessing competition.",
    ["probability", "social"],
  ],
  [
    "raiffa",
    "Howard Raiffa",
    "Decision theorist and author whose work developed methods for choices, information and negotiation under uncertainty.",
    ["decisions", "information"],
  ],
  [
    "markowitz",
    "Harry Markowitz",
    "Economist whose portfolio-selection research formalized the role of covariance in diversification.",
    ["risk", "markets"],
  ],
  [
    "polya",
    "George Pólya",
    "Mathematician and author of How to Solve It, whose work included random-walk recurrence.",
    ["probability", "complexity"],
  ],
  [
    "heller",
    "Michael Heller",
    "Legal scholar and author of The Gridlock Economy, known for research on fragmented rights and anticommons.",
    ["markets", "operations"],
  ],
  [
    "challet",
    "Damien Challet",
    "Researcher who co-developed the minority game to study competing adaptive participants.",
    ["games", "social"],
  ],
  [
    "zhang",
    "Yi-Cheng Zhang",
    "Physicist who co-developed minority-game models of collective competition.",
    ["games", "social"],
  ],
  [
    "meadows",
    "Donella Meadows",
    "Systems thinker and author of Thinking in Systems, known for explaining feedback, stocks, flows and intervention points.",
    ["complexity", "operations"],
  ],
].map(([id, name, description, areaIds]) => ({
  id: id as string,
  name: name as string,
  description: description as string,
  areaIds: areaIds as string[],
  slug: (name as string)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, ""),
}));
