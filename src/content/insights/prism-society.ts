import type { Insight } from "./types";
import { prismSources as s } from "@/data/prism-sources";
export const prismSociety: Insight[] = [
  {
    slug: "opinion-dynamics-consensus-degroot-bounded-confidence",
    title:
      "Why consensus is not the same as being right: three opinion-dynamics models",
    description:
      "Compare DeGroot averaging, bounded confidence and voter copying, then examine who influences a group and whether agreement carries any evidence of truth.",
    topic: "Networks & society",
    published: "2026-10-28",
    takeaway:
      "A group can converge because of its update rule and network structure. Agreement by itself does not show that opinions incorporated independent evidence or moved toward a correct answer.",
    intro:
      "A group discussion ends with everyone agreeing. That could reflect strong evidence, but it could also reflect repeated averaging, copying or attention concentrated on one stubborn participant. Opinion-dynamics models isolate those processes so their consequences become visible. They do not read the beliefs of actual communities. Their value is to make you inspect the influence rule before interpreting consensus as a sign that a discussion worked.",
    sections: [
      {
        id: "averaging",
        title: "DeGroot learning repeatedly averages trusted opinions",
        paragraphs: [
          "In a DeGroot model, each participant updates to a weighted average of existing opinions. The weights specify who influences whom and by how much. If the network and weights satisfy suitable conditions, the opinions can converge. The final value depends on the influence structure as well as the starting values; it need not equal their simple unweighted average.",
          "Run the [DeGroot-learning simulation](/effects/degroot-learning) with initial opinions zero, 0.4 and one. Under the ordinary displayed weights, the process approaches 0.45. [DeGroot’s original paper](" +
            s.degroot.url +
            ") presents the consensus framework. Toggle the first participant to stubborn and observe how a fixed opinion changes the path. The board’s opinion scale has no external truth marker, so convergence cannot be interpreted as improved accuracy.",
        ],
      },
      {
        id: "confidence",
        title: "Bounded confidence changes whom people will hear",
        paragraphs: [
          "Bounded-confidence models add a distance rule: an agent averages only with opinions sufficiently close to its own. A small confidence bound can keep distant groups from interacting. A larger bound may create bridges or a common cluster. The rule makes the interaction network depend on the current opinions, so changing the bound changes the mechanism itself.",
          "In the [bounded-confidence activity](/effects/bounded-confidence), eight agents update synchronously using an inclusive distance threshold and include their own opinion in the average. [Hegselmann and Krause’s paper](" +
            s.bounded.url +
            ") discusses this family of models. The toy agents have no identities, motivations or factual evidence. A cluster in the plot is an output of a selected update rule, not a measured account of why a particular community polarised.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: distinguish agreement from evidence",
        paragraphs: [
          "Use the fixed inputs before adding a real-world interpretation. These are constructed numerical demonstrations, not estimates of persuasion strength in a population.",
        ],
        steps: [
          "Reset DeGroot learning and advance the ordinary-weight process. Record the initial opinions and the limiting value near 0.45. Note that the simple initial average is about 0.467, so influence weights matter.",
          "Reset, make the zero-opinion agent stubborn and advance again. The other agents move toward zero through the connected influence network. Ask what evidence changed: in this model, none was introduced.",
          "Open bounded confidence and compare a very small bound with a bound of one. The first can leave separated opinions; the second lets every agent hear everyone and moves to the mean. Neither setting includes a correct-answer variable, so neither alone establishes wiser beliefs.",
        ],
      },
      {
        id: "copying",
        title: "The voter model copies instead of averaging",
        paragraphs: [
          "The [voter-model game](/effects/voter-model) places binary opinions on an eight-person ring. At each step, a randomly selected person copies a randomly selected neighbor. There is no strength-of-argument calculation and no weighted compromise between zero and one. The stochastic sequence matters, so a different round can follow a different route even from the same starting split.",
          "Finite systems of this type can eventually reach a common opinion under the model’s connected copying rules. That endpoint is not evidence that the surviving opinion was more accurate. To see why topology also matters, open [the strength-of-weak-ties activity](/effects/strength-of-weak-ties) and add or remove a bridge between two groups. Reachability changes when the bridge changes, without establishing that every message crossing it is valuable.",
        ],
        deeper: {
          title: "Do not equate repeated exposure with independent evidence",
          text: "If several people repeat information from the same source, their statements are correlated. Counting them as independent confirmations can exaggerate the evidence. These opinion boards intentionally omit a Bayesian evidence process, so their consensus values should be read as influence outcomes. A truth-learning model would need an external state, signals and assumptions about their dependence.",
        },
      },
      {
        id: "checklist",
        title: "Audit a group’s route to agreement",
        paragraphs: [
          "The useful application is a set of questions about a process you can observe, not a label attached to a group because its members agree.",
        ],
        checklist: [
          "Identify the update rule: are participants averaging estimates, copying a source, exchanging reasons or responding to a new observation?",
          "Map influence as well as attendance. A person who speaks often, sets the agenda or cannot revise their position can have disproportionate impact.",
          "Check whether apparently separate sources share an origin. Independent evidence and multiple repetitions of one claim should not receive the same treatment.",
          "Look for missing connections and excluded perspectives, then ask whether adding a bridge improves access to evidence rather than simply accelerating repetition.",
        ],
      },
      {
        id: "practice",
        title: "Make a real discussion easier to inspect",
        paragraphs: [
          "Before discussion, ask participants to write an estimate and the main observation supporting it. After discussion, record which observation changed and why. This creates a modest audit trail for learning without assuming that disagreement is always valuable or that a persistent minority must be right. The goal is to reveal how information affected a judgment.",
          "The [homophily network generator](/effects/homophily) offers a related caution: denser within-group connection and sparser cross-group connection can arise from selected edge probabilities. In that toy model, the parameter changes expected connection counts as well as mixing. In a real network, shared opportunity, preference and institutional structure can overlap. A familiar visual pattern does not identify its cause.",
        ],
      },
    ],
    experiments: [
      {
        slug: "degroot-learning",
        task: "Compare ordinary averaging with a stubborn agent while keeping the starting opinions fixed.",
      },
      {
        slug: "bounded-confidence",
        task: "Widen the confidence bound and inspect which opinion clusters can interact.",
      },
      {
        slug: "voter-model",
        task: "Advance local copying on a ring and compare different seeded paths.",
      },
    ],
    sources: [
      { ...s.degroot, note: "Primary weighted-averaging consensus model." },
      {
        ...s.bounded,
        note: "Primary study of continuous opinions and bounded confidence.",
      },
    ],
    reflection:
      "When your group agreed last time, what new evidence entered the discussion and whose influence changed the final answer?",
  },
  {
    slug: "twin-earth-brain-in-vat-goodman-knowledge",
    title:
      "Twin Earth, brains in vats and Goodman’s grue: three puzzles about knowing",
    description:
      "Explore meaning, skeptical possibilities and induction through interactive thought experiments, with practical distinctions and no artificial correct-answer score.",
    topic: "Philosophy & life",
    published: "2026-10-28",
    takeaway:
      "Separate what an experience is like, what a word refers to and which rule your evidence supports. The puzzles become clearer when you change one assumption at a time.",
    intro:
      "You can imagine a person whose experiences resemble yours while their environment differs radically. Does that change what their words mean? Does it undermine what they know? And if observations fit more than one prediction rule, what makes one rule a sensible basis for tomorrow? Three philosophical thought experiments sharpen these questions. Their purpose is to expose assumptions you can discuss, not to award points for accepting a preferred theory.",
    sections: [
      {
        id: "twin",
        title: "Twin Earth separates internal similarity from reference",
        paragraphs: [
          "The Twin Earth thought experiment stipulates a counterpart whose internal life resembles yours, while the superficially familiar liquid around them has a different underlying composition. The question concerns what the word water refers to in each environment. Externalist arguments suggest that facts beyond an individual’s internal state can partly determine the content of a thought or expression.",
          "Use the [Twin-Earth interactive scenario](/effects/twin-earth) to compare an internalist judgment with a judgment that gives the environment a role. [Stanford’s article on externalism](" +
            s.twin.url +
            ") explains the philosophical setting. The scenario is not an empirical demonstration that chemistry alone fixes every word’s meaning. It isolates a contested claim about reference under a stipulation that would be difficult to reproduce as an ordinary experiment.",
        ],
      },
      {
        id: "vat",
        title: "The brain-in-a-vat scenario changes the skeptical question",
        paragraphs: [
          "A brain-in-a-vat story imagines experiences produced by a radically different environment from the one the subject takes themselves to inhabit. The initial skeptical challenge asks what could distinguish those experiences from ordinary perception. Semantic arguments add another question: if a subject’s words develop entirely within the simulated environment, what do those words refer to?",
          "The [brain-in-a-vat activity](/effects/brain-in-a-vat) records how you assess a scenario and its evidence; it does not reveal a hidden metaphysical answer. [Stanford’s treatment of content externalism and skepticism](" +
            s.vat.url +
            ") helps distinguish the skeptical challenge from proposed semantic replies. A philosophical argument about what a sentence could refer to is not a physical test that rules out every possible simulation story.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: compare two prediction rules",
        paragraphs: [
          "Goodman’s puzzle supplies a different difficulty. Use the activity’s stipulated observation cutoff and definitions; these are invented classifications chosen to expose a problem about induction.",
        ],
        steps: [
          "Observe the sample of green objects shown before the cutoff. Write the ordinary rule: future objects of this kind will be green. Note the observed cases supporting it.",
          "Define grue as green before the cutoff and blue afterward. The same observed pre-cutoff cases fit a rule predicting grue objects, yet that rule predicts blue after the cutoff. Record where the predictions first diverge.",
          "Ask why you regard green as projectible and grue as contrived. Consider established use, explanatory relationships and background knowledge. Simply counting past matches cannot distinguish the two rules on the supplied observations.",
        ],
      },
      {
        id: "induction",
        title: "Goodman’s riddle asks which predicates support projection",
        paragraphs: [
          "The [new-riddle-of-induction activity](/effects/new-riddle-of-induction) is not claiming that any prediction is as good as any other. It asks why some ways of describing a pattern seem suitable for extending observations into unobserved cases. An equivalent fit to old examples does not by itself make two descriptions equally useful within a broader scientific practice.",
          "This is a useful prompt when evaluating a rule constructed after inspecting data. Ask what was fixed before the observations, how many alternatives were considered and what independent test could distinguish the candidate explanations. That practical concern connects with scientific overfitting, but it does not dissolve Goodman’s philosophical problem into one statistical metric. The standards for selecting concepts and the performance of a fitted predictor are related questions at different levels.",
        ],
        deeper: {
          title: "Thought experiments test commitments under stipulation",
          text: "A thought experiment asks you to hold selected assumptions fixed and consider their consequences. If an objection rejects a stipulation, say which one and why. That can be a substantive response, but it answers a different question from showing an inconsistency within the stipulated case. Record both your judgment and the premise on which it depends.",
        },
      },
      {
        id: "checklist",
        title: "Read a philosophical puzzle without losing the question",
        paragraphs: [
          "A short written record helps prevent the discussion from moving between meaning, evidence and reality without noticing the transition. Use these checks before defending a conclusion.",
        ],
        checklist: [
          "Restate the stipulations in ordinary language. Separate facts assumed for the scenario from claims the argument is trying to establish.",
          "Identify the target: whether a belief is true, whether it is justified, what a term refers to or what future cases a rule predicts.",
          "Vary one assumption and state whether your answer changes. A different environmental history can matter even when the present experience is described as similar.",
          "Give the strongest reason for an alternative judgment. A recorded disagreement can make the underlying theory clearer without requiring a correctness score.",
        ],
      },
      {
        id: "ethics",
        title: "Carry the method into ethical puzzles carefully",
        paragraphs: [
          "The same habit helps with the [nonidentity problem](/effects/non-identity-problem), where a policy can affect which people exist, and the [utility-monster allocation game](/effects/utility-monster), where stipulated utility numbers put pressure on an aggregative rule. Those puzzles concern ethical reasons rather than the reference of water or the projection of colour predicates.",
          "Do not collapse them into a contest for the most surprising answer. State the principle being tested, explain why a case challenges it and identify what a revision would preserve or sacrifice. Modic keeps these activities open-ended because their educational value comes from a reasoned account of your commitments, including what would make you change them.",
        ],
      },
    ],
    experiments: [
      {
        slug: "twin-earth",
        task: "Compare judgments about reference while holding internal similarity fixed.",
      },
      {
        slug: "brain-in-a-vat",
        task: "Record what the stipulated experience does and does not establish.",
      },
      {
        slug: "new-riddle-of-induction",
        task: "Fit green and grue to the same old observations and inspect their different projections.",
      },
    ],
    sources: [
      {
        ...s.twin,
        note: "University reference on externalism, content and Twin Earth.",
      },
      {
        ...s.vat,
        note: "University reference separating semantic externalism from skeptical challenges.",
      },
    ],
    reflection:
      "Which philosophical judgment of yours changes when an environment changes but the described experience stays the same?",
  },
  {
    slug: "bank-runs-liquidity-mismatch-drawdown-insurance",
    title:
      "Bank runs and liquidity mismatch: why assets and available cash are different",
    description:
      "Trace withdrawals through a simple bank balance sheet, separate liquidity from solvency and connect the exercise with deductibles and drawdown arithmetic.",
    topic: "Finance & risk",
    published: "2026-10-28",
    takeaway:
      "A future asset value and cash available today answer different questions. Trace timing, liquidation prices and outstanding claims before interpreting a balance-sheet total.",
    intro:
      "A balance sheet can contain assets that are valuable at maturity yet expensive to turn into cash immediately. When liabilities can be withdrawn sooner, the timing mismatch matters. A simple withdrawal game makes that mechanism visible without predicting a bank failure. Comparing it with insurance deductibles and drawdown recovery also shows why financial risk cannot be summarised by a single expected return or a single reassuring total.",
    sections: [
      {
        id: "timing",
        title: "Liquidity concerns meeting payments when they come due",
        paragraphs: [
          "Liquidity asks whether an institution can obtain the cash needed for current obligations on feasible terms. Solvency asks whether assets are sufficient for liabilities under an appropriate valuation. The two can interact: an urgent sale at a low price can impair asset value, while doubts about value can make funding harder to obtain. They remain distinct questions with different time horizons.",
          "The [liquidity-mismatch withdrawal game](/effects/liquidity-mismatch) starts with fifty unit deposits, ten units of cash and forty units in a long asset. The long asset returns 1.5 per unit at maturity but only 0.5 if liquidated early. [Diamond and Dybvig’s paper](" +
            s.bank.url +
            ") supplies the classic bank-run framework. The Modic game isolates cash-flow accounting; it does not solve the full strategic model or forecast the behaviour of any actual bank.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: the same assets, different withdrawal timing",
        paragraphs: [
          "Every amount below is an invented teaching unit. The exercise contains no deposit insurance, central-bank facility or external funding source; adding one would change the feasible payments.",
        ],
        steps: [
          "Request ten early withdrawals. The initial cash pays them without liquidating the long asset. Forty late deposits remain, backed by the asset’s maturity value of sixty, or 1.5 per remaining depositor under the board’s payout rule.",
          "Reset and request thirty early withdrawals. After the cash pays ten, another twenty units of cash are needed. At a liquidation price of 0.5, obtaining them requires selling all forty units of the long asset.",
          "Inspect the remaining claims and maturity assets. Twenty late deposit claims remain while no long asset remains to pay them. If requests exceed available liquidation proceeds, unpaid early claims also remain claims; they do not vanish because the board runs out of cash.",
        ],
      },
      {
        id: "interpretation",
        title: "Accounting reveals a mechanism, not a failure probability",
        paragraphs: [
          "The exercise lets you select withdrawal demand directly. It does not model why depositors withdraw, what they know or which equilibrium they expect others to select. Those are central questions in a strategic run model. Treating a selected high-withdrawal scenario as a measured chance of a real run would confuse a stress case with an estimated probability.",
          "An actual institution also has many asset maturities, funding sources, collateral arrangements and legal rules. The point of the small model is to make the missing questions concrete: how quickly can assets be converted, at what prices, with which obligations ahead of others? A claim that everything is fine because final asset value is high skips timing. A claim that every cash shortage proves insolvency skips valuation and available funding.",
        ],
      },
      {
        id: "insurance",
        title: "Insurance compares a different distribution of outcomes",
        paragraphs: [
          "The [insurance-deductible simulation](/effects/insurance-deductibles) asks how a stated loss probability, premium loading and deductible change wealth in loss and no-loss states. Its displayed certainty equivalent uses logarithmic utility. [OpenStax’s insurance chapter](" +
            s.insurance.url +
            ") provides context about insurance and imperfect information. The selected utility function makes the preference calculation explicit instead of claiming to measure your own risk tolerance.",
          "Under fair full coverage in the toy example, a forty-unit loss with probability one-quarter costs an expected premium of ten, leaving ninety in either state from initial wealth one hundred. With a loading or deductible, the outcome distribution changes. This is an expected-utility exercise about one specified loss; it does not price every risk, model claim denial or show that a particular real policy is appropriate.",
        ],
        deeper: {
          title: "Pooling and maturity transformation are different operations",
          text: "An insurer can pool specified contingent losses, while a bank can transform the maturity of funding and assets. Both institutions need assets and payment capacity, but their contracts and risk mechanisms differ. The deductible board has no strategic withdrawal queue; the withdrawal board has no insurance pool. Combining their lessons requires an explicit model of the contracts being combined.",
        },
      },
      {
        id: "checklist",
        title: "Questions to ask about a risk claim",
        paragraphs: [
          "Use these to turn a reassuring or alarming headline into a request for information. They identify what the claim would need to specify before it could support a conclusion.",
        ],
        checklist: [
          "Write a dated list of payments due and assets available. Separate maturity value, current market value and proceeds from an urgent liquidation.",
          "State which scenario is chosen and which probability, if any, is estimated. A severe selected stress does not itself quantify its likelihood.",
          "Keep unpaid claims on the ledger. Record priority, legal protection and funding facilities if they matter; do not assume them into or out of a real institution.",
          "Distinguish a mathematical preference calculation from a personal recommendation. Check the loss definition, coverage exclusions, premium and resources available outside the model.",
        ],
      },
      {
        id: "drawdowns",
        title: "Drawdown recovery adds the changing-base problem",
        paragraphs: [
          "In the [drawdown-recovery experiment](/effects/drawdown-recovery), a fifty-percent loss followed by a fifty-percent gain turns one hundred into seventy-five. The percentages use different bases. Returning from seventy-five to one hundred then requires a gain of one-third. The historical maximum drawdown remains fifty percent even though the current shortfall has narrowed to twenty-five percent.",
          "This arithmetic is exact for the selected path, but it does not forecast the next return. Like the withdrawal ledger, it rewards careful attention to what a number measures and when it is measured. Before comparing two risk summaries, check whether they describe current cash, terminal wealth, a historical peak loss or a utility-weighted evaluation. Each may be useful without answering the others.",
        ],
      },
    ],
    experiments: [
      {
        slug: "liquidity-mismatch",
        task: "Increase early withdrawal requests and trace cash, liquidation and unpaid claims.",
      },
      {
        slug: "insurance-deductibles",
        task: "Vary retained loss and premium loading under a disclosed utility model.",
      },
      {
        slug: "drawdown-recovery",
        task: "Apply losses and gains to the changing wealth base and separate current from maximum drawdown.",
      },
    ],
    sources: [
      {
        ...s.bank,
        note: "Primary model of deposit contracts, liquidity and bank runs.",
      },
      {
        ...s.insurance,
        note: "Textbook context for insurance and imperfect information.",
      },
    ],
    reflection:
      "In a financial claim you rely on, does the reassuring number measure value at maturity or money available when a payment is due?",
  },
];
