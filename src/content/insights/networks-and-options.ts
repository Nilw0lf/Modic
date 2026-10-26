import type { Insight } from "./types";
import { horizonSources as s } from "@/data/horizons-expansion";
export const networksAndOptions: Insight[] = [
  {
    slug: "pagerank-preferential-attachment-popularity",
    title: "PageRank and preferential attachment: why popularity can compound",
    description:
      "Explore how link structure redistributes PageRank and how growing networks create hubs, with interactive examples and a careful distinction between visibility and quality.",
    topic: "Networks & information",
    published: "2026-10-27",
    takeaway:
      "Existing connections can influence future visibility, but a ranking calculation and a network-growth mechanism are different explanations. Neither makes popularity a direct measurement of quality.",
    intro:
      "A prominent page sends attention to another page. A well-connected person attracts more connections. A popular option appears everywhere and becomes easier to discover. These processes can look similar from the outside while following different rules. PageRank describes rank flow on a specified graph; preferential attachment describes how a graph grows. Modic lets you change each rule and inspect its consequences separately.",
    sections: [
      {
        id: "graph",
        title: "Begin with nodes, links and the question being asked",
        paragraphs: [
          "A network model starts by defining what a node represents and what an edge means. A directed citation link differs from an undirected acquaintance. The same drawing can be used for different stories, but the interpretation of the calculations depends on that choice. Before explaining a hub, ask whether you are analysing an existing network or proposing a rule for how it formed.",
          "The [PageRank experiment](/effects/pagerank) fixes four nodes and lets you edit their directed links. The [preferential-attachment experiment](/effects/preferential-attachment) instead adds nodes and links over time. Its edges are undirected. Comparing them is useful precisely because they do not answer the same question: where does rank flow now, and which nodes receive new connections as the system grows?",
        ],
      },
      {
        id: "rank",
        title: "PageRank follows probability mass rather than counting links",
        paragraphs: [
          "[Brin and Page's original search-engine paper](https://research.google/pubs/the-anatomy-of-a-large-scale-hypertextual-web-search-engine/) describes a prototype using web link structure. Modic's teaching model represents a surfer who follows an outgoing link with probability d and otherwise jumps uniformly. Rank received from a node depends on that node's own rank and how it distributes mass across its outgoing links.",
          "A node with no outgoing links cannot simply swallow the probability. In this implementation its link-following mass is distributed uniformly. After one hundred iterations, the rank shares still sum to one. An incoming-link count would miss the source nodes' importance, their other outgoing links and the teleportation term. Those differences are visible even in a four-node example.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: edit one link, then remove link following",
        paragraphs: [
          "Use the small graph to test a mechanism rather than to derive a search-engine optimisation prescription. The exact rank percentages are conditional on this four-node network and its uniform jumps. Real web ranking includes far more structure and many signals absent from this model.",
        ],
        steps: [
          "Inspect the initial graph: A links to B and C, B to C, C to A and D to C. Record D's rank and the total rank mass.",
          "Add A→D using the link button. Compare D's new share and the shares that changed elsewhere; rank has been redistributed rather than created.",
          "Set link-following probability to zero. Every node receives twenty-five percent because the process now consists entirely of uniform jumps, making the link graph irrelevant to this calculation.",
        ],
      },
      {
        id: "growth",
        title: "Preferential attachment changes the future graph",
        paragraphs: [
          "[Barabási and Albert's growing-network research](https://arxiv.org/abs/cond-mat/9910332) combines growth with preferential attachment. In Modic's version, each new node adds one edge and selects an existing neighbour in proportion to current degree. A uniform alternative ignores degree. The comparison isolates a cumulative-advantage mechanism without assigning different intrinsic qualities to nodes.",
          "An early connection advantage can create more opportunities to receive later connections. That is a mechanism for unequal degree, not proof that a hub is the best node. Nor does every unequal network arise this way. Capacity, deletion, copying, fitness and institutional rules can all change the process. The board contains forty nodes at most, so it cannot establish a power-law fit from its drawing.",
        ],
      },
      {
        id: "patterns",
        title: "A pattern does not uniquely identify its generating process",
        paragraphs: [
          "The [power-law experiment](/effects/power-laws) explores concentration in a distribution. Preferential attachment offers one possible story for a related pattern of unequal connections, but a heavy tail alone does not identify that story. A useful explanation asks which observations distinguish the proposed mechanism from alternatives, rather than naming a famous distribution after seeing a few large values.",
          "Likewise, a high rank on a fixed graph does not show why the graph formed. The system may already encode prior visibility, resource differences or selection. If ranking then changes what people encounter, the ranking can also influence future links. That feedback is a further model to investigate, not something automatically included in either of the two simple boards.",
        ],
      },
      {
        id: "checklist",
        title: "A practical audit of a popularity-based claim",
        paragraphs: [
          "When a ranking is used to allocate attention or resources, record what it measures and what people might mistakenly infer from it. A useful audit distinguishes structural prominence from the outcome the decision actually cares about. That distinction can reveal both the value and the limits of a ranking.",
        ],
        checklist: [
          "Define nodes and the meaning and direction of each link.",
          "Separate an existing-graph calculation from a growth model.",
          "Check how dangling nodes and new nodes are treated.",
          "Ask whether source importance matters or only counts are used.",
          "Consider feedback from visibility to later opportunities.",
          "Do not substitute prominence for an independent quality measurement.",
        ],
      },
      {
        id: "limits",
        title: "Keep search advice separate from a teaching model",
        paragraphs: [
          "The PageRank board does not reproduce a current search engine or provide a formula for traffic. Its small fixed graph omits content, queries, spam handling and many other features. Editing a link in it teaches mass flow; it does not establish what will happen if a real site gains one backlink. A credible practical claim would require relevant evidence about the actual system.",
          "The durable lesson is about interpretation. Ask what signal the metric uses, how that signal was generated and what happens when people respond to it. Popularity can contain information and can also reflect cumulative opportunity. Understanding the mechanism helps you decide when prominence is useful evidence and when an independent check is needed before treating it as quality.",
        ],
      },
    ],
    experiments: [
      {
        slug: "pagerank",
        task: "Edit links while checking conservation of rank mass.",
      },
      {
        slug: "preferential-attachment",
        task: "Compare degree-based and uniform growth.",
      },
      {
        slug: "power-laws",
        task: "Distinguish a concentrated pattern from a causal explanation.",
      },
    ],
    sources: [
      {
        ...s.pagerank,
        note: "Primary description of the original web-search prototype and link analysis.",
      },
      {
        ...s.attachment,
        note: "The authors' primary paper on growth and preferential attachment.",
      },
    ],
    reflection:
      "Is the ranking you rely on measuring independent evidence of quality, or partly recycling existing visibility?",
  },
  {
    slug: "parrondos-paradox-two-losing-games",
    title:
      "Parrondo's paradox explained: how two losing games can produce positive drift",
    description:
      "Inspect the state-dependent rules behind Parrondo's paradox, compare individual paths with long-run drift, and learn why the result is not a general winning strategy.",
    topic: "Probability & paradoxes",
    published: "2026-10-27",
    takeaway:
      "The combination changes the states each game encounters. The paradox depends on those transition rules, not a general principle that mixing losses creates gains.",
    intro:
      "Two games lose in the long run, but randomly alternating them can gain. That sounds like an arithmetic contradiction until you inspect what the probabilities depend on. In Parrondo's paradox, one game's odds depend on the current capital state. Mixing changes how often those states occur. This guide makes the rules, the state dependence and the limits of the result visible in Modic's simulation.",
    sections: [
      {
        id: "rules",
        title: "Write the games before interpreting the paradox",
        paragraphs: [
          "Game A in Modic wins with probability 0.495. Game B wins with probability 0.095 when capital is divisible by three and 0.745 otherwise. Each win adds one unit and each loss subtracts one. Capital is allowed to be negative, and divisibility is handled consistently for negative integers too. Those details define a mathematical process rather than a finite-bankroll betting recommendation.",
          "The [primary Nature report on losing strategies](https://doi.org/10.1038/47220) introduced this counterintuitive combination to a broad audience. The interesting claim is conditional on specified games and switching. It does not say any two strategies with negative returns can be averaged into a positive one. The mechanism requires more than labelling each standalone result a loss.",
        ],
      },
      {
        id: "state",
        title: "Game B's average odds depend on where it spends time",
        paragraphs: [
          "Capital modulo three gives three states: remainder zero, one or two. Game B's low probability applies only in the zero state. You cannot average its two listed probabilities as if each occurred equally often. The frequency of visits is generated by the game's own transitions. That state distribution is part of the calculation.",
          "The [Parrondo experiment](/effects/parrondos-paradox) shows both a realised path and a stationary expected drift. Its three-state calculation repeatedly updates the state probabilities under the chosen policy. The random mixture changes transition probabilities and therefore changes state occupancy. That is why its long-run drift is not simply the average of the standalone games' already-averaged drifts.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: inspect the mixed odds at each state",
        paragraphs: [
          "Start with the transition-level arithmetic before looking at a simulated final balance. This calculation does not prove the stationary result by itself; it identifies the state-dependent probabilities that the Markov calculation must use. A single path will still fluctuate around the process's longer-run behaviour.",
        ],
        steps: [
          "At a capital divisible by three, a fifty-fifty choice of A and B has win probability (0.495+0.095)/2=0.295, making this state unfavourable.",
          "At the other two remainders, the same mixture wins with probability (0.495+0.745)/2=0.620. These states have favourable one-step drift.",
          "Compare the simulator's stationary drift for A, B and the mixture. The mixture's transition rule changes time spent in the three states, allowing positive average drift under these exact parameters.",
        ],
      },
      {
        id: "sampling",
        title: "One winning path is different from positive expected drift",
        paragraphs: [
          "Run each policy and inspect the three-hundred-round path. A negative-drift policy can finish above zero by chance, and a positive-drift policy can finish below it. The hundred-path mean reduces some sampling variability but is still an estimate from a finite batch. The stationary calculation is a different object: a property of the specified transition model.",
          "[Harmer and Abbott's fuller treatment](https://www1.eleceng.adelaide.edu.au/personal/dabbott/publications/PRS_harmer2000.pdf) develops the games' mathematical structure. Modic keeps the state space small enough to expose the rule. It does not fit a real time series or estimate whether a practical strategy has positive drift. Agreement between a batch mean and the reference is a useful check, not empirical evidence about an outside market.",
        ],
      },
      {
        id: "related",
        title: "Connect the paradox with other dependent processes",
        paragraphs: [
          "The [random-walk experiment](/effects/random-walk) is a useful starting contrast. A walk with fixed odds does not need to track a state-dependent change in its next-step win probability. Parrondo's capital-dependent game adds exactly that feature. The current state influences what happens next, so transition structure matters as well as an overall summary rate.",
          "The [Pólya-urn model](/effects/polya-urn) provides another dependence example, though with a different mechanism. Drawing a colour changes future composition through reinforcement. It should not be called the same paradox; the useful connection is that a sequence's history can change future probabilities. When mixing processes, ask what state one leaves for the next, rather than assuming their standalone averages contain all the necessary information.",
        ],
      },
      {
        id: "checklist",
        title: "How to audit a surprising combination claim",
        paragraphs: [
          "A surprising result becomes easier to assess when the process is written as states, actions and transitions. Make the standalone policies and the mixture comparable under the same starting conditions, and specify which quantity is supposed to improve. A visually appealing path is not an adequate substitute for those definitions.",
        ],
        checklist: [
          "State whether odds depend on capital, history or another hidden state.",
          "Write the switching policy explicitly.",
          "Compare one path, a batch mean and a model expectation separately.",
          "Check boundary conditions such as stopping at zero capital.",
          "Identify which state distribution changes under the mixture.",
          "Avoid extending the result to unrelated losing strategies.",
        ],
      },
      {
        id: "limits",
        title: "Why this is not a casino or investment system",
        paragraphs: [
          "The model permits negative capital and has no absorbing ruin threshold. Adding a finite bankroll changes what can happen and when play stops. Real games and investments also involve costs, constraints and uncertain or changing probabilities. A positive drift derived from a fictional transition table cannot be transferred to them by analogy.",
          "The valuable idea is structural: combining processes can change the distribution of conditions under which each operates. That possibility is worth investigating in a concrete model, while the burden remains to identify the transitions and evidence. The paradox does not suspend arithmetic. It warns against averaging summaries that were calculated under different state distributions and assuming the combination preserves those distributions.",
        ],
      },
    ],
    experiments: [
      {
        slug: "parrondos-paradox",
        task: "Compare sampled paths with policy-specific stationary drift.",
      },
      {
        slug: "random-walk",
        task: "Contrast fixed odds with state-dependent transition rules.",
      },
      {
        slug: "polya-urn",
        task: "Explore a different process whose history changes future probabilities.",
      },
    ],
    sources: [
      {
        title: "Harmer and Abbott — Losing strategies can win",
        url: "https://doi.org/10.1038/47220",
        note: "The primary Nature communication on the paradox.",
      },
      {
        ...s.parrondo,
        note: "A primary mathematical treatment of the state-dependent games.",
      },
    ],
    reflection:
      "What condition does one process change that makes the next process's standalone average an unreliable guide?",
  },
  {
    slug: "real-options-minimax-regret-value-of-waiting",
    title: "Real options and minimax regret: when is waiting worth its cost?",
    description:
      "Compare a two-period real-option example with minimax regret and search costs, using clear numbers and a practical checklist for decisions under uncertainty.",
    topic: "Decisions & flexibility",
    published: "2026-10-27",
    takeaway:
      "Waiting is valuable only if useful information arrives, a meaningful choice remains available and preserving it costs less than its benefit under a defensible decision model.",
    intro:
      "Commit now or keep the decision open? The answer depends on more than an appetite for uncertainty. You need to know what information will arrive, what can still be changed, what waiting costs and whether probabilities are defensible. Real options and minimax regret address different versions of this problem. Modic's games let you compare their assumptions instead of using flexibility as a blanket reason to postpone.",
    sections: [
      {
        id: "option",
        title: "A real option is a choice you can still make later",
        paragraphs: [
          "A real option concerns a future operational or investment decision rather than a tradeable financial contract. Its value can come from making the action contingent on information that is not yet available. The ability to decline a poor project after learning more is different from a promise to undertake it regardless of what is learned.",
          "[Myers's corporate-finance paper](https://doi.org/10.1016/0304-405x%2877%2990015-0) is a primary reference associated with real investment options. Modic's [real-options game](/effects/real-options) uses a deliberately small two-period example, not a company valuation. Every payoff, probability and timing assumption is exposed so the comparison can be checked before attempting a more realistic application.",
        ],
      },
      {
        id: "timing",
        title: "Write a timeline before calculating value",
        paragraphs: [
          "Building now costs fifty immediately and returns either one hundred or twenty at time one. Waiting costs a fee now; at time one demand is revealed, and the model allows instant construction and payoff then. The waiting strategy builds only in high demand, when the immediate hundred payoff exceeds the fifty cost. That strong timing assumption is essential to the displayed values.",
          "If construction took another year or a competitor could remove the opportunity, the waiting branch would be different. Likewise, observing demand only after committing would not preserve the same option. A timeline prevents a favourable calculation from quietly giving one strategy extra information, faster construction or a later payment date without acknowledging the change.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: a waiting fee can reverse the choice",
        paragraphs: [
          "Use the model's fifty-percent high-demand probability and ten-percent discount rate. These are stipulated inputs, not investment forecasts. The comparison demonstrates how contingent action changes expected payoff and how an explicit option-preservation cost can remove that advantage.",
        ],
        steps: [
          "Building now has expected future receipt sixty. Discounting and subtracting the immediate fifty cost gives 60/1.1−50, approximately 4.55.",
          "With waiting fee five, the future net receipt is fifty only in high demand and zero otherwise. Its expected present value is 25/1.1−5, approximately 17.73.",
          "Raise the waiting fee to twenty. Waiting value falls to about 2.73, below immediate building's 4.55. Flexibility remains available, but its assumed price now exceeds its benefit relative to the other action.",
        ],
      },
      {
        id: "probabilities",
        title:
          "Expected value and unknown probabilities are different settings",
        paragraphs: [
          "The expected-value calculation uses a specified demand probability. If no defensible probability is available, hiding that gap inside a convenient fifty-fifty assumption is not the same analysis. You can instead inspect outcomes across states and ask which decision criterion fits the problem, while being explicit about the value judgments each criterion introduces.",
          "[Stoye's discussion of decisions under ambiguity](https://stoye.economics.cornell.edu/docs/ARE.pdf) surveys formal approaches including minimax regret. In the [minimax-regret game](/effects/minimax-regret), no weather probabilities are specified. Maximin protects the lowest absolute payoff; minimax regret limits the greatest shortfall relative to the best venue in each state. Those criteria can select different actions from the same table.",
        ],
      },
      {
        id: "search",
        title:
          "Waiting for information is different from searching indefinitely",
        paragraphs: [
          "An option can expire or become costly to maintain. A decision can also suffer from endless comparison that yields little new information. The [satisficing game](/effects/satisficing) makes that cost visible by charging for each inspected offer and removing past offers. Continuing search can discover a higher value while reducing net payoff after inspection costs.",
          "Before postponing, write what you expect to learn and when. If the next week supplies no new observation relevant to the decision, merely passing time may not create the option value you have in mind. If learning is available, ask whether an inexpensive reversible step can obtain it while preserving the important choice. The relevant benefit is a changed contingent action, not an abstract preference for keeping every possibility open.",
        ],
        deeper: {
          title: "Expected waiting value in this board",
          text: "With high-demand probability p, discount rate 0.1 and waiting fee f, the waiting strategy is worth p×50/1.1−f. Immediate building is worth (100p+20(1−p))/1.1−50. These equations rely on the stated construction and payoff timing; changing timing changes the comparison.",
        },
      },
      {
        id: "checklist",
        title: "A practical decision note about preserving flexibility",
        paragraphs: [
          "Use a short note that makes both the future choice and its preservation cost concrete. The note should also identify what would make waiting no longer worthwhile. That turns delay into an explicit strategy with a review point instead of an open-ended way to avoid committing.",
        ],
        checklist: [
          "Write the actions available now and after information arrives.",
          "Specify the information, its arrival date and its reliability.",
          "Record expiry, competition, fees and delayed benefits.",
          "Separate stated probabilities from genuine ambiguity.",
          "Compare outcomes or expected values under the chosen criterion.",
          "Set a review point and an action trigger rather than waiting without a condition.",
        ],
      },
      {
        id: "limits",
        title: "Preserving a choice is not always the goal",
        paragraphs: [
          "Some commitments create coordination, learning or access that waiting would lose. Other decisions are cheap to reverse and do not require an elaborate option analysis. A useful model focuses attention on a material irreversible choice and relevant uncertainty, rather than turning every ordinary decision into a prolonged financial exercise.",
          "The games use teaching amounts and simplified states. They do not value an actual business, recommend an investment or settle which conservative rule a person must prefer. Their practical value is a clearer structure: what is known, what may become known, which choices remain, what each branch costs and which criterion you use to compare them. Once those are explicit, the next action becomes easier to justify and revisit.",
        ],
      },
    ],
    experiments: [
      {
        slug: "real-options",
        task: "Compare contingent investment with its explicit waiting fee.",
      },
      {
        slug: "minimax-regret",
        task: "Choose a criterion when probabilities are not supplied.",
      },
      { slug: "satisficing", task: "Count the cost of continuing to search." },
    ],
    sources: [
      {
        ...s.options,
        note: "Primary corporate-finance reference associated with real investment options.",
      },
      {
        ...s.regret,
        note: "University survey of minimax and regret criteria under ambiguity.",
      },
    ],
    reflection:
      "What specific information would change your action, and what is the total cost of keeping that action available until it arrives?",
  },
];
