import type { Entry } from "./expansion";
import type { Thinker } from "@/types/catalog";
const sep = (path: string) => `https://plato.stanford.edu/entries/${path}/`;
type Lesson = Omit<Entry, "controls" | "challenge" | "preset">;
const lessons: Lesson[] = [
  {
    id: "dichotomy-of-control",
    name: "Dichotomy of Control",
    thinker: "epictetus",
    categories: ["philosophy", "decisions"],
    format: "game",
    description:
      "Spend six effort tokens before the weather arrives. Separate your preparation from the outcome.",
    title: "You choose the preparation, not the weather.",
    question:
      "Allocate six effort tokens across actions and external wishes. Commit, reveal weather, then compare the same plan under another condition.",
    idea: "Epictetus distinguishes what is up to us, especially judgment and choice, from external outcomes. The distinction is about responsible agency rather than guaranteed success.",
    mechanism:
      "Six tokens can fund equipment checks, route practice, wishing for weather, or demanding applause. Preparation equals three per equipment token plus two per practice token. Weather adds −4, 0, or +4 operational units after commitment. Replay weather preserves the chosen allocation, so controllable preparation is compared with external variation.",
    example:
      "A presentation can be prepared carefully even when the audience's response remains uncertain.",
    limitation:
      "The effort equation is authored, not Stoic psychology or a wellbeing measure. Real actions can influence uncertain external outcomes; the game does not equate limited control with powerlessness or excuse inaction.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — Epictetus",
      url: sep("epictetus"),
    },
    related: ["illusion-of-control", "opportunity-cost"],
  },
  {
    id: "veil-of-ignorance",
    name: "Veil of Ignorance",
    thinker: "rawls",
    categories: ["philosophy", "decisions", "social"],
    format: "game",
    description:
      "Choose society's allocation before discovering which position you occupy.",
    title: "Would you choose the rule without knowing your place?",
    question:
      "Compare three fictional allocations, commit behind a veil, and reveal one of four equally sampled roles. Inspect the floor and total as well as your own result.",
    idea: "Rawls's original position withholds knowledge of personal circumstances to investigate impartial principles of justice. The veil of ignorance is a constraint on justification, not merely a lottery tactic.",
    mechanism:
      "Three stipulated policies allocate tokens across four positions: 6/6/6/6, 1/5/9/17, or 5/6/8/9. Compare minimum, total, and mean. Your policy locks before a seeded role is revealed. A fresh round changes the role, not the policy values.",
    example:
      "A policy designer can ask whether a rule is defensible to people whose eventual position the designer does not know.",
    limitation:
      "The uniform role lottery is Modic's illustration, not a faithful reconstruction of Rawls's reasoning about uncertainty. Token totals omit liberties, opportunities, institutions, and many features of justice. No allocation is marked morally correct.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — Original position",
      url: sep("original-position"),
    },
    related: ["gini-coefficient", "capability-approach"],
  },
  {
    id: "trolley-problem",
    name: "Trolley Problem",
    thinker: "foot",
    coThinkers: ["thomson"],
    categories: ["philosophy", "decisions"],
    format: "game",
    description:
      "Compare a switch with a bridge case and examine the reason behind your choices.",
    title: "The numbers stay the same; the action changes.",
    question:
      "Make a choice in two classic stylised cases, select your reason, then compare your own decisions. Abstract markers stand for people; there is no graphic imagery.",
    idea: "The trolley problem examines tensions among consequences, duties, intention, and using someone as a means. Different versions probe which distinctions may matter to moral judgment.",
    mechanism:
      "In the switch case, redirecting a runaway trolley is stipulated to kill one instead of five. In the bridge case, stopping it by pushing one person is stipulated to save five. Record Intervene, Do not intervene, or Withhold judgment and a reason for each. The ledger reports the stipulated consequences without scoring moral worth.",
    example:
      "Comparing outcomes with the structure of an action can expose reasons that a simple headcount misses.",
    limitation:
      "These are artificial lethal dilemmas with certain outcomes and no additional options. Real emergencies involve uncertainty and practical alternatives. The activity provides no operational emergency guidance or universal solution.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — Doing versus allowing harm",
      url: sep("doing-allowing"),
    },
    related: ["utilitarianism", "categorical-imperative"],
  },
  {
    id: "experience-machine",
    name: "Experience Machine",
    thinker: "nozick",
    categories: ["philosophy", "decisions"],
    format: "game",
    description:
      "Choose between equally pleasant experiences with different connections to reality.",
    title: "Is a good experience all you want?",
    question:
      "Choose a life option across three paired cards. Pleasure is held equal within each pair while real achievement, connection, or informed control differs.",
    idea: "Nozick's experience machine asks whether pleasurable experience alone exhausts what makes a life go well. It invites consideration of doing, being, and contact with reality.",
    mechanism:
      "Three paired fictional options stipulate equal pleasantness but differ in whether achievement is simulated, relationships are with actual people, or the person retains informed control. Each choice and a selected reason enter a personal ledger. Results summarise choices rather than calculate happiness or a moral score.",
    example:
      "Enjoying the feeling of finishing a project can be distinguished from valuing actually having made it.",
    limitation:
      "This is a simplified comparison, not a psychological experiment or proof that virtual experience has no value. Real and virtual activities can overlap; stated preferences do not settle a theory of wellbeing.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — Well-being",
      url: sep("well-being"),
    },
    related: ["hedonic-adaptation", "newcomb-problem"],
  },
  {
    id: "ship-of-theseus",
    name: "Ship of Theseus",
    thinker: "plutarch",
    categories: ["philosophy"],
    format: "game",
    description:
      "Replace eight planks, keep every original, and build the rival ship yourself.",
    title: "Which ship kept its identity?",
    question:
      "Replace planks one by one, then reassemble the stored originals. Compare continuity and material identity before recording your answer.",
    idea: "The Ship of Theseus asks what allows an object to persist when its parts change. Reassembling the removed parts sets material continuity against the continuity of the maintained object.",
    mechanism:
      "Eight original planks start aboard a ship. Clicking a plank replaces it and moves its original to storage. Each original can be reassembled in a second hull. Counts track original material aboard and in the reconstructed ship. Identity choices remain open to revision; the software supplies no numerical identity percentage.",
    example:
      "A repaired tool or continually maintained organisation can preserve a history while changing its components.",
    limitation:
      "A wooden ship is a thought experiment, not a model proving personal identity or consciousness. Different identity criteria are not assumed to be interchangeable, and counting material does not resolve the philosophical dispute.",
    source: {
      title:
        "University of Washington — Identity, persistence, and the Ship of Theseus",
      url: "https://faculty.washington.edu/smcohen/320/theseus.html",
    },
    related: ["sorites-paradox", "experience-machine"],
  },
  {
    id: "sorites-paradox",
    name: "Sorites Paradox",
    thinker: "eubulides",
    categories: ["philosophy", "information"],
    format: "game",
    description: "Add one grain at a time and record when your label changes.",
    title: "When does a pile become a heap?",
    question:
      "Classify small piles as Heap, Not a heap, or Borderline. Change the grain count and inspect the transitions in your own labels.",
    idea: "The sorites paradox combines clear endpoints with a tempting tolerance premise: one tiny change seems unable to alter a vague classification. Repeating that premise can produce an implausible conclusion.",
    mechanism:
      "A board displays one to sixty grains. Controls add or remove one or ten. Each classification records the exact count and chosen label. The ledger highlights adjacent recorded counts with different labels, without declaring a universally correct threshold.",
    example:
      "Terms such as rich, tall, and close can have clear cases without a readily defensible exact boundary.",
    limitation:
      "A sixty-grain illustration does not reproduce all ordinary uses of heap. Operational thresholds can be useful without being unique meanings; borderline labels alone do not solve every theory of vagueness.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — Sorites paradox",
      url: sep("sorites-paradox"),
    },
    related: ["shannon-entropy", "ship-of-theseus"],
  },
  {
    id: "hedonic-adaptation",
    name: "Hedonic Adaptation",
    thinker: "brickman",
    coThinkers: ["campbell"],
    categories: ["philosophy", "behavior"],
    format: "simulation",
    description:
      "Spend an upgrade budget, step time, and see which gains your chosen model retains.",
    title: "An upgrade can become the new normal.",
    question:
      "Spend up to four upgrade tokens over eight rounds. Compare an adapting response with a persistent-response counterfactual using the same purchases.",
    idea: "Hedonic adaptation concerns changes in affective responses as circumstances become familiar. Adaptation can differ by event, person, and context; it is not a universal guarantee of returning to one fixed happiness level.",
    mechanism:
      "Each purchased upgrade adds ten illustrative response units. On a time step, prior response is multiplied by retention from zero to one. A counterfactual keeps the same boosts without decay. Both start at zero; four upgrade credits and eight time steps bound the game.",
    example:
      "A new convenience can feel striking at first and less noticeable after repeated use.",
    limitation:
      "Response units and exponential decay are invented teaching assumptions, not measured happiness, clinical advice, or forecasts. Some life changes have persistent effects; deprivation and adverse events are not assumed harmless.",
    source: {
      title: "Frederick and Loewenstein — Hedonic adaptation",
      url: "https://www.cmu.edu/dietrich/sds/docs/loewenstein/HedonicAdaptation.pdf",
    },
    related: ["present-bias", "mental-accounting"],
  },
  {
    id: "occams-razor",
    name: "Occam's Razor",
    thinker: "ockham",
    categories: ["philosophy", "information", "learning"],
    format: "game",
    description:
      "Two rules fit every training point. Commit a prediction before seeing the next one.",
    title: "Simpler is a preference to test, not a truth guarantee.",
    question:
      "Compare a short rule with a more elaborate rule that fits the same three observations. Predict the held-out value, then reveal the chosen teaching world.",
    idea: "Occam's razor favours avoiding unnecessary explanatory complexity when other things are appropriately equal. It is a guide to inquiry, not a theorem that the shortest story must be true.",
    mechanism:
      "Training observations are (1,2), (2,4), and (3,6). Candidate rules are 2x and 2x+(x−1)(x−2)(x−3); both fit exactly. At x=4 they predict eight and fourteen. Straight and Curved worlds supply either outcome. Commit to a rule before revealing held-out error; switch worlds to inspect when simplicity helps or misses structure.",
    example:
      "A perfect fit on a small sample can leave very different predictions for unobserved cases.",
    limitation:
      "The worlds and rules are authored, not sampled evidence about real learning algorithms. Description length, parameter count, and truth are distinct; a complex world is possible.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — Simplicity",
      url: sep("simplicity"),
    },
    related: ["confirmation-bias", "bayesian-updating"],
  },
  {
    id: "falsifiability",
    name: "Falsifiability",
    thinker: "popper",
    categories: ["philosophy", "information"],
    format: "game",
    description:
      "Inspect the factory's badges and look for a result the claim rules out.",
    title: "A risky claim tells you what would count against it.",
    question:
      "Test the claim that every badge from a factory is blue. Choose uninspected cards, then compare a testable rule with a rule that excuses every possible result.",
    idea: "Falsifiability concerns whether a claim excludes possible observations. Popper uses it in a demarcation account of science, while actual testing also depends on instruments, auxiliary assumptions, and error correction.",
    mechanism:
      "Five fixed teaching cards contain four blue badges and one amber badge. Click any card to inspect it. Under the universal blue claim, amber is a counterexample; blue cases alone do not establish a claim about all factory output. The evasive mode accepts any colour after the fact and explicitly demonstrates the loss of a test condition.",
    example:
      "A forecast that explains every possible outcome after it happens has not specified what would make it fail.",
    limitation:
      "The noiseless card deck omits measurement error and auxiliary hypotheses. Real scientific theories are not responsibly discarded on the basis of any single unverified anomalous report.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — Karl Popper",
      url: sep("popper"),
    },
    related: ["confirmation-bias", "wason-selection"],
  },
  {
    id: "categorical-imperative",
    name: "Categorical Imperative",
    thinker: "kant",
    categories: ["philosophy", "decisions"],
    format: "simulation",
    description:
      "Give one borrower a false-promise exception, then apply that same rule to everyone.",
    title: "Can your proposed exception be a common rule?",
    question:
      "Compare a one-person exception with universal false promising in a tiny lending town. Inspect how the action depends on an existing practice of trust.",
    idea: "Kant's universal-law formulation asks whether a maxim could be willed as a universal law. The false-promise example probes whether a policy relies on a practice it would undermine when generalised.",
    mechanism:
      "Ten fictional borrowers make promises. A stipulated lender lends to all ten only when at least six promises are reliable. Move from zero to ten false promises or use the One exception and Everyone buttons. The board shows reliable promises and loans under this disclosed operational rule.",
    example:
      "An exception justified by others' honesty may depend on people not adopting the same maxim.",
    limitation:
      "The lender threshold is invented. This trust model is not a proof of Kant's argument, a complete categorical-imperative test, or a reduction of duties to aggregate consequences.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — Kant's moral philosophy",
      url: sep("kant-moral"),
    },
    related: ["trust-game", "prisoners-dilemma"],
  },
  {
    id: "utilitarianism",
    name: "Utilitarianism and Distribution",
    thinker: "mill",
    categories: ["philosophy", "decisions"],
    format: "game",
    description:
      "Allocate five aid tokens and compare total gains with the least-served group.",
    title: "The largest total is one possible criterion.",
    question:
      "Allocate five resource tokens across two groups. Inspect diminishing benefit schedules and compare total benefit with the smaller group's benefit.",
    idea: "Utilitarian traditions assess action through its implications for wellbeing. Aggregation invites questions about distribution, comparison, rights, and what benefits are being counted.",
    mechanism:
      "Five tokens split between A and B. Authored gain schedules are A: 0/8/14/18/20/21, B: 0/6/11/15/18/20. The board shows each group's gain, total, and minimum. A Compare every split table makes the tradeoff inspectable; no split is labelled morally correct.",
    example:
      "Maximising a programme's total estimated gains and protecting its least-served group can favour different allocations.",
    limitation:
      "The gain units are invented and assumed comparable for the exercise. This is not Mill's full theory or a real method of measuring welfare; rights, uncertainty, and benefit quality are omitted.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — History of utilitarianism",
      url: sep("utilitarianism-history"),
    },
    related: ["diminishing-returns", "veil-of-ignorance"],
  },
  {
    id: "moral-luck",
    name: "Moral Luck",
    thinker: "nagel",
    coThinkers: ["bernard-williams"],
    categories: ["philosophy", "decisions"],
    format: "game",
    description:
      "Judge identical packing decisions before and after a chance outcome is revealed.",
    title: "Same choice, different outcome—same judgment?",
    question:
      "Two couriers skip the same protective check. Rate their conduct before learning which identical-risk shipment is damaged, then rate again.",
    idea: "Moral luck examines tensions between judgments of responsibility and factors outside an agent's control. Resultant luck concerns how outcomes affect assessment of otherwise similar conduct.",
    mechanism:
      "Both couriers make the same stipulated negligent choice with identical risk. Record responsibility ratings from one to five before outcome disclosure. A seeded bit assigns one damaged and one intact shipment for a controlled contrast; after-ratings and differences are recorded without prescribing blame.",
    example:
      "An evaluation can distinguish the quality of a decision from a fortunate or unfortunate result.",
    limitation:
      "One damaged shipment is paired with one intact shipment by design, not sampled independently or used to estimate damage probabilities. There is no legal responsibility score, human injury, or psychological diagnosis.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — Moral luck",
      url: sep("moral-luck"),
    },
    related: ["regression", "illusion-of-control"],
  },
  {
    id: "epistemic-injustice",
    name: "Epistemic Injustice",
    thinker: "fricker",
    categories: ["philosophy", "social", "information"],
    format: "game",
    description:
      "Assess the same testimony anonymously, then reveal a status label and reassess it.",
    title: "Who is heard can shape what becomes known.",
    question:
      "Rate an identical maintenance report from two equally informed witnesses. Reveal their roles, then inspect whether the labels changed your credibility ratings.",
    idea: "Epistemic injustice concerns wrongs to people as knowers. Testimonial injustice can involve a credibility deficit arising from identity prejudice, rather than a relevant difference in evidence or expertise.",
    mechanism:
      "Both fictional witnesses directly observed the same leak and passed the same ten-of-ten technical check. Rate each anonymously from one to five, reveal established-manager and new-apprentice labels, then rate again. Results report changes and invite scrutiny of relevance; no user is classified as prejudiced.",
    example:
      "A workplace can miss relevant knowledge if a status stereotype overrides a person's actual evidence.",
    limitation:
      "Equal expertise is stipulated to isolate labels. Real role information can sometimes be relevant; a changed rating alone does not establish the identity prejudice or structural context discussed by Fricker.",
    source: {
      title: "OpenStax — Applied epistemology and epistemic injustice",
      url: "https://openstax.org/books/introduction-philosophy/pages/7-5-applied-epistemology",
    },
    related: ["halo-effect", "signal-detection"],
  },
  {
    id: "capability-approach",
    name: "Capability Approach",
    thinker: "sen",
    coThinkers: ["nussbaum"],
    categories: ["philosophy", "social", "decisions"],
    format: "game",
    description:
      "Use a six-token town budget to turn equal resources into usable opportunities.",
    title: "Equal resources need not mean equal opportunities.",
    question:
      "Two neighbourhoods have equal personal resource tokens but different access. Fund transport, a clinic, or an internet hub and inspect which options become genuinely available.",
    idea: "The capability approach evaluates substantive opportunities people have reason to value, not resources or satisfaction alone. Capabilities concern feasible options, while functionings concern what people actually do or become.",
    mechanism:
      "Central and Remote each have four personal resource tokens. Central already has access to training, healthcare, and remote work; Remote initially lacks the corresponding infrastructure. A separate six-token public budget funds three two-token projects, each opening one option. No resident is forced to use an option and no welfare sum is assigned.",
    example:
      "Equal cash does not by itself overcome a transport or infrastructure barrier.",
    limitation:
      "Three binary options and equal project costs simplify Sen's and Nussbaum's distinct frameworks. The board does not define a complete capability list, rank real communities, or measure achieved wellbeing.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — Capability approach",
      url: sep("capability-approach"),
    },
    related: ["veil-of-ignorance", "opportunity-cost"],
  },
  {
    id: "zenos-paradox",
    name: "Zeno's Dichotomy Paradox",
    thinker: "zeno",
    categories: ["philosophy", "probability"],
    format: "simulation",
    description:
      "Move halfway to the finish and compare shrinking time intervals with fixed ones.",
    title: "Infinitely many intervals need not add up to infinite time.",
    question:
      "Advance halfway through the remaining distance. Toggle whether each step also takes half as much time, and compare the partial sums.",
    idea: "Zeno's dichotomy challenges how motion relates to infinitely divisible distance. Convergent series distinguish infinitely many conceptual subdivisions from an infinite sum of durations.",
    mechanism:
      "A unit track begins at zero. After n steps, distance travelled is 1−2^−n. In shrinking-time mode, total time is also 1−2^−n; in fixed-time mode it is n. Show up to sixteen finite steps and a separate explicit limit of one in shrinking-time mode.",
    example:
      "The series one-half plus one-quarter plus one-eighth approaches one despite having infinitely many terms.",
    limitation:
      "The board models mathematical subdivision, not a person executing infinitely many discrete commands. No finite step is falsely labelled arrival, and a series calculation alone does not settle every Zeno paradox or metaphysical issue about motion.",
    source: {
      title: "Stanford Encyclopedia of Philosophy — Zeno's paradoxes",
      url: sep("paradox-zeno"),
    },
    related: ["compound-growth", "sorites-paradox"],
  },
];
export const philosophyEntries: Entry[] = lessons.map((e) => ({
  ...e,
  controls: [],
  challenge: "",
  preset: {},
  attributionStatus: "provisional",
  relationship: "ASSOCIATED_WITH",
}));
const people: [string, string, string][] = [
  [
    "epictetus",
    "Epictetus",
    "Stoic philosopher whose teachings examine judgment, choice, and what is up to us.",
  ],
  [
    "rawls",
    "John Rawls",
    "Political philosopher associated with justice as fairness and the original position.",
  ],
  [
    "foot",
    "Philippa Foot",
    "Moral philosopher whose work includes the distinctions explored by trolley cases.",
  ],
  [
    "thomson",
    "Judith Jarvis Thomson",
    "Philosopher whose trolley-problem analyses probe rights, action, and harm.",
  ],
  [
    "plutarch",
    "Plutarch",
    "Ancient author whose account of Theseus's ship preserves a classic puzzle of change and persistence.",
  ],
  [
    "eubulides",
    "Eubulides",
    "Ancient dialectician traditionally associated with paradoxes including the heap.",
  ],
  [
    "brickman",
    "Philip Brickman",
    "Psychologist who coauthored work introducing the hedonic treadmill metaphor.",
  ],
  [
    "campbell",
    "Donald T. Campbell",
    "Social scientist who coauthored the hedonic-relativism account behind the treadmill metaphor.",
  ],
  [
    "ockham",
    "William of Ockham",
    "Medieval philosopher associated with principles of explanatory economy, commonly called Occam's razor.",
  ],
  [
    "popper",
    "Karl Popper",
    "Philosopher of science whose work examines falsifiability and critical testing.",
  ],
  [
    "kant",
    "Immanuel Kant",
    "Philosopher whose moral theory includes universal-law and humanity formulations of the categorical imperative.",
  ],
  [
    "mill",
    "John Stuart Mill",
    "Philosopher and author of Utilitarianism, whose ethical writing considers happiness, rules, and kinds of pleasure.",
  ],
  [
    "nagel",
    "Thomas Nagel",
    "Philosopher whose work includes the problem of moral luck and perspectives on responsibility.",
  ],
  [
    "bernard-williams",
    "Bernard Williams",
    "Moral philosopher whose work on moral luck examines the relation between agency and outcomes.",
  ],
  [
    "fricker",
    "Miranda Fricker",
    "Philosopher whose Epistemic Injustice examines wrongs to people in their capacity as knowers.",
  ],
  [
    "sen",
    "Amartya Sen",
    "Economist and philosopher associated with the capability approach and evaluation of substantive freedom.",
  ],
  [
    "nussbaum",
    "Martha Nussbaum",
    "Philosopher whose capability-based account develops a framework of central human opportunities.",
  ],
  [
    "zeno",
    "Zeno of Elea",
    "Ancient philosopher whose paradoxes challenge familiar ideas about motion and plurality.",
  ],
];
export const philosophyThinkers: Thinker[] = people.map(
  ([id, name, description]) => ({
    id,
    name,
    description,
    areaIds: ["philosophy"],
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }),
);
