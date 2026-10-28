import type { Insight } from "./types";
import { prismSources as s } from "@/data/prism-sources";

export const prismMind: Insight[] = [
  {
    slug: "spaced-practice-chunking-dual-coding-study-plan",
    title:
      "Spaced practice, chunking and dual coding: build a study plan you can test",
    description:
      "Turn a chapter into retrieval questions, meaningful chunks and useful diagrams, with a worked study plan and clear limits on what a short memory game proves.",
    topic: "Learning",
    published: "2026-10-28",
    takeaway:
      "Organise material so you can understand it, retrieve it without the answer, and return after a meaningful delay. Measure what you can explain or do rather than how familiar a page feels.",
    intro:
      "A highlighted page can feel reassuring while the underlying idea remains difficult to recall. Three learning concepts suggest different ways to improve a study session: chunking changes how information is organised, dual coding connects verbal and visual representations, and spaced practice distributes encounters over time. They can work together, but none is a universal memory trick. Start with the task you need to perform and make the next session produce evidence about that task.",
    sections: [
      {
        id: "organise",
        title: "Chunking depends on meaningful structure",
        paragraphs: [
          "A chunk is a meaningful unit that brings several elements together. An experienced reader recognises a familiar word without separately rehearsing each letter. A beginner in a new subject may not yet have that structure. Adding spaces to a string can make its display easier to scan, but it does not automatically create durable knowledge or increase everyone’s memory capacity by the same amount.",
          "Try the [chunking memory game](/effects/chunking). Study the digits, hide them and record your recall before comparing grouping styles. Because you can revisit the same string, practice and familiarity can affect the result. Treat a better second score as a personal observation under those conditions, not as an isolated causal estimate of grouping. For a textbook chapter, build a small hierarchy of ideas and explain why the items belong together.",
        ],
      },
      {
        id: "represent",
        title: "Dual coding makes a second representation do useful work",
        paragraphs: [
          "A diagram helps when its relationships correspond to the concept being learned. A circuit sketch can show which components share two nodes; a timeline can make temporal order inspectable. A decorative image may capture attention without representing anything you need to retrieve. The useful question is what the visual reveals that your existing sentence makes harder to see.",
          "The [dual-coding activity](/effects/dual-coding) pairs verbal material with optional visual cues and then asks for recall. [Paivio’s account of dual coding](" +
            s.dual.url +
            ") supplies the theoretical background. Translate the principle into a small drawing you can reconstruct from memory. Then state its meaning in words. If the drawing cannot be explained or its labels are ambiguous, repair the representation before adding more detail.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: learn a small circuit topic",
        paragraphs: [
          "This is a proposed study routine, not a validated schedule or a promise about examination results. Adjust its spacing to the time available and the difficulty of retrieval.",
        ],
        steps: [
          "Choose three questions: what makes components series-connected, what makes them parallel-connected, and how does current divide? Draw two circuits and group each rule with the node relationship that justifies it.",
          "Close the notes and reconstruct the circuits, rules and one numerical example. Check the work immediately afterward. Record a mistaken node connection or missing explanation specifically rather than labelling the entire topic difficult.",
          "Return on another day and solve a changed circuit before looking at the solution. Give extra attention to the error you recorded, then mix in a related question. Shorten the interval if retrieval fails completely; extend it cautiously when recall remains accurate.",
        ],
      },
      {
        id: "spacing",
        title: "Spacing is more than changing the order of cards",
        paragraphs: [
          "Distributed practice separates encounters with material. Interleaving mixes different kinds of problems. Retrieval practice attempts an answer rather than only rereading it. These ideas can interact, but they describe different choices. A session can be mixed yet compressed into a few minutes, or spaced across days while repeatedly studying one topic at a time.",
          "The [spacing-effect card activity](/effects/spacing-effect) makes blocked and interleaved sequences visible. It does not compress days of forgetting into seconds or estimate your long-term retention curve. [Dunlosky and colleagues’ review of learning techniques](" +
            s.spacing.url +
            ") discusses evidence and boundaries for distributed practice and practice testing. Use the activity to inspect a sequence, then test your real routine after a meaningful delay with new questions.",
        ],
        deeper: {
          title: "Why immediate performance can mislead",
          text: "An answer that remains active from the previous card may be easy to produce without being durable. Conversely, a harder delayed retrieval can expose a gap worth correcting. Neither difficulty nor fluency alone measures learning: compare accuracy, explanation quality and later transfer under conditions that resemble the intended task.",
        },
      },
      {
        id: "checklist",
        title: "A practical checklist for your next session",
        paragraphs: [
          "Keep the plan small enough to carry out. A routine you can repeat and inspect is more informative than a complex calendar abandoned after the first day.",
        ],
        checklist: [
          "Specify the performance: explaining a mechanism, solving a problem, recognising a case or remembering a term. Match your questions to that performance.",
          "Build chunks around relationships you can explain. Avoid grouping facts only because they fit neatly into a coloured box.",
          "Make one diagram encode something important, then practise producing it without copying. Use words to check what each part means.",
          "Schedule a later attempt, keep the answer hidden until you have tried, and save one concrete error to revisit. Include unfamiliar examples when checking transfer.",
        ],
      },
      {
        id: "attention",
        title: "A memorable cue still needs the right action",
        paragraphs: [
          "The [von Restorff activity](/effects/von-restorff-effect) explores a distinctive item, while the [prospective-memory game](/effects/prospective-memory) asks you to remember an intended action when a cue appears. Neither result means that making every note bright will help. If everything competes to stand out, the relationship between cue and task can disappear.",
          "Give one cue one job: when a particular problem type appears, check its assumptions before calculating. Track whether you noticed the cue and whether you performed the intended action. Learning then becomes a sequence of understandable adjustments rather than a verdict about whether you have a good or bad memory.",
        ],
      },
    ],
    experiments: [
      {
        slug: "chunking",
        task: "Hide the digit string and compare actual recall after changing its grouping.",
      },
      {
        slug: "dual-coding",
        task: "Compare verbal prompts and visual cues, then inspect which pairs you remembered.",
      },
      {
        slug: "spacing-effect",
        task: "Operate blocked and mixed card sequences without treating a short session as a long-term retention study.",
      },
    ],
    sources: [
      {
        ...s.dual,
        note: "Theoretical account of verbal and nonverbal representation.",
      },
      {
        ...s.spacing,
        note: "Research review of learning techniques, including distributed practice and practice testing.",
      },
    ],
    reflection:
      "What could you produce tomorrow without looking that would show you learned the idea rather than recognised the page?",
  },
  {
    slug: "cognitive-dissonance-reactance-choice-overload-explained",
    title:
      "Cognitive dissonance vs psychological reactance: understand a difficult choice",
    description:
      "Separate conflicting commitments, threatened freedom and an overloaded choice set, then use practical reflection games without turning a score into a diagnosis.",
    topic: "Perception & judgment",
    published: "2026-10-28",
    takeaway:
      "Identify what is producing the friction before trying to remove it: inconsistent commitments, a threatened choice and difficult comparison call for different responses.",
    intro:
      "You agree to a commitment, dislike being told what to do, and face twelve similar options. Each situation can feel uncomfortable, but the same explanation does not fit them all. Cognitive dissonance concerns an aversive inconsistency among relevant cognitions. Psychological reactance concerns a threatened freedom. Choice overload concerns the difficulty a choice set can create under particular conditions. Distinguishing them helps you ask a better question about the decision in front of you.",
    sections: [
      {
        id: "dissonance",
        title: "Cognitive dissonance begins with an inconsistency",
        paragraphs: [
          "Imagine valuing reliable work while repeatedly accepting deadlines you cannot meet. The tension is not simply that you have many tasks. Your behaviour conflicts with a relevant commitment. Possible responses include changing the behaviour, changing a belief, adding a justification or deciding that the apparent conflict matters less than you thought. Those responses have different consequences for the original problem.",
          "The [cognitive-dissonance reflection activity](/effects/cognitive-dissonance) asks you to record a judgment and reconsider it in context. It does not infer an unconscious motive from a single answer. [OpenStax’s discussion of attitudes and persuasion](" +
            s.dissonance.url +
            ") provides an accessible account. When reflecting, write down both the original commitment and what actually changed. A plausible explanation after the event can be helpful, but its plausibility does not establish that it caused the choice.",
        ],
      },
      {
        id: "reactance",
        title: "Reactance concerns a freedom you believe is threatened",
        paragraphs: [
          "A demand can provoke resistance even when the requested action might otherwise seem reasonable. Reactance theory asks about the perceived restriction: which option was available, who appeared to remove it, and how important was that freedom? Disagreement can also arise because the demand is mistaken, unfair or costly. Resistance alone cannot tell you which explanation applies.",
          "Compare prompts in the [psychological-reactance activity](/effects/psychological-reactance) and record your willingness rather than accepting a hidden bias label. [Steindl and colleagues’ review](" +
            s.reactance.url +
            ") discusses the construct and its research context. In an everyday conversation, explain the reason for a request and identify genuine choices the person retains. Do not offer a fake choice when the outcome is already fixed; that changes the informational and ethical situation.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: choose a subscription without getting stuck",
        paragraphs: [
          "The following is an invented decision scenario. The point is to diagnose the source of friction before using a simplifying rule, not to decide which subscription anyone should purchase.",
        ],
        steps: [
          "Write your constraints before browsing: a spending limit, required storage and whether cancellation must be flexible. In the choice-overload game, those requirements make a feasible set that you can inspect directly.",
          "Notice a promotion saying you must choose immediately. Ask whether your objection concerns the product, missing information or the pressure itself. Removing the pressure may restore willingness without changing the product’s value.",
          "After choosing, compare the option with your original criteria. If you now minimise a missing requirement, consider whether it genuinely became less important or whether you are defending the choice. Decide whether to keep, revise or reverse it using the stated constraints.",
        ],
      },
      {
        id: "overload",
        title: "Choice overload depends on the comparison task",
        paragraphs: [
          "More options can improve the chance of finding a suitable match. They can also make comparison harder when attributes are unfamiliar, differences are small or the decision maker lacks a usable rule. The [choice-overload game](/effects/choice-overload) gives you a clear goal, a budget and a small menu so that filtering has a visible effect. Its completion time is not a population estimate of choice overload.",
          "A useful intervention reduces irrelevant comparison rather than simply deleting options. Group plans by the requirement that matters, show total cost consistently and make constraints easy to check. A smaller set that hides an important alternative can make the decision worse. Ask whether the design improves understanding of the feasible options, not merely whether it gets someone to click sooner.",
        ],
        deeper: {
          title: "A change in an answer does not identify a mechanism",
          text: "Repeated prompts can change salience, reveal new information, create demand cues or give you practice. Without an appropriate research design, a before-and-after rating cannot isolate dissonance or reactance. Modic records your response so you can inspect it; it does not diagnose a psychological condition or supply a validated individual trait score.",
        },
      },
      {
        id: "checklist",
        title: "Questions that make the next decision clearer",
        paragraphs: [
          "Use these questions when the choice matters enough to deserve a short pause. They are a reflection aid, not a protocol that guarantees an unbiased answer.",
        ],
        checklist: [
          "Name the conflict precisely: which belief, action or commitment is inconsistent with which other one? Avoid explaining every unpleasant feeling as dissonance.",
          "Identify the freedom at stake. Would the same proposal feel different if you could refuse it without pressure, and what information would still be missing?",
          "List requirements before evaluating the full menu. Separate an option that fails a requirement from one that is merely less attractive.",
          "Keep a record of the reasons you had before choosing. Revisit them after new information arrives so that a changed explanation remains visible.",
        ],
      },
      {
        id: "related",
        title: "Attention and effort can change the same choice",
        paragraphs: [
          "The [negativity-bias activity](/effects/negativity-bias) asks how a negative item affects an overall evaluation. The [effort-discounting game](/effects/effort-discounting) separates a stated reward from the steps required to obtain it. These mechanisms can overlap with difficult choices without becoming interchangeable. A demanding option may be rejected because its effort is genuinely costly, not because the person failed to reason.",
          "When you explain a decision to someone else, offer more than one plausible account and state what evidence would distinguish them. That habit preserves curiosity about their actual constraints. It also makes it easier to change a policy, message or comparison table when the original explanation turns out to be incomplete.",
        ],
      },
    ],
    experiments: [
      {
        slug: "cognitive-dissonance",
        task: "Record a commitment, reconsider a scenario and inspect your own explanation.",
      },
      {
        slug: "psychological-reactance",
        task: "Compare request framings and report your willingness without a diagnostic score.",
      },
      {
        slug: "choice-overload",
        task: "Filter a menu using explicit requirements and find the cheapest feasible option.",
      },
    ],
    sources: [
      {
        ...s.dissonance,
        note: "Accessible textbook treatment of attitudes and cognitive dissonance.",
      },
      {
        ...s.reactance,
        note: "Research review of psychological reactance and its theoretical context.",
      },
    ],
    reflection:
      "Which part of a recent difficult choice was a real constraint, and which part was pressure or a reason you added afterward?",
  },
  {
    slug: "cheap-talk-bayesian-persuasion-correlated-equilibrium",
    title:
      "Cheap talk vs Bayesian persuasion: when should you trust a strategic message?",
    description:
      "Compare costless advice, committed signal design and correlated recommendations through simple games, posterior calculations and an incentive checklist.",
    topic: "Games & cooperation",
    published: "2026-10-28",
    takeaway:
      "A message becomes understandable when you know what the sender observes, what the sender wants, which rule is committed in advance and what the receiver can infer.",
    intro:
      "A recommendation can contain useful information even when the sender has a preference about your response. It can also be uninformative despite sounding precise. Game theory separates several reasons why: cheap talk studies strategic communication, Bayesian persuasion studies committed information design, and correlated equilibrium studies recommendations that players have incentives to follow. Playing each version makes the difference between a message and its supporting mechanism easier to see.",
    sections: [
      {
        id: "cheap",
        title: "Cheap talk is costless communication with strategic incentives",
        paragraphs: [
          "In a cheap-talk model, the message itself does not directly change payoffs or bind the sender to an action. That does not mean every message is a lie or that communication is always useless. The receiver considers what the sender knows and which response the sender prefers. The extent of preference alignment affects what can be communicated credibly in a specified game.",
          "Use the [cheap-talk game](/effects/cheap-talk) to compare an aligned truthful script with a sender that always recommends the high action. [Crawford and Sobel’s original paper](" +
            s.cheap.url +
            ") develops strategic information transmission more generally. Modic’s scripted comparison does not compute all equilibria of that model. Its narrower purpose is to make you ask whether a message distinguishes states that matter to the receiver.",
        ],
      },
      {
        id: "commitment",
        title: "Bayesian persuasion changes the experiment behind the message",
        paragraphs: [
          "Information design gives a sender a different power: choosing a signal rule before the state is drawn or revealed under the model’s commitment structure. The receiver knows the rule and updates from the signal. A persuasive positive signal can be credible precisely because its rate of appearing in each state is disclosed. The sender cannot freely rewrite the rule after seeing an inconvenient outcome.",
          "In the [Bayesian-persuasion simulation](/effects/bayesian-persuasion), the prior probability of a good state is 0.3. Good states always receive a positive signal; the adjustable parameter is how often bad states also do. [Kamenica and Gentzkow’s paper](" +
            s.persuasion.url +
            ") provides the primary framework. The teaching objective is a transparent posterior calculation under a deliberately small game, not a universal recipe for marketing or political influence.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: make a positive signal just persuasive enough",
        paragraphs: [
          "These probabilities define the toy game. The receiver invests at a posterior of at least one-half, including the exact tie; changing that tie rule changes the boundary outcome.",
        ],
        steps: [
          "Set the bad-state positive rate to zero. A positive signal then comes only from good states. Its probability is 0.3 and the receiver’s posterior after a positive signal is one.",
          "Raise that rate to 3/7 using the boundary preset. Positive signals now occur with probability 0.3 + 0.7 × 3/7 = 0.6. The good-state share of positive signals is 0.3 / 0.6 = 0.5.",
          "Increase the rate beyond 3/7. Positive signals become more frequent, but their posterior drops below one-half and the receiver rejects them under the stated rule. More optimistic messages can therefore produce less investment in this particular game.",
        ],
      },
      {
        id: "recommendations",
        title:
          "Correlated equilibrium asks whether following advice is worthwhile",
        paragraphs: [
          "The [correlated-equilibrium traffic game](/effects/correlated-equilibrium) uses a shared device to coordinate two players in a small Chicken payoff matrix. Opposite recommendations avoid a collision in the scripted play. The relevant incentive question is conditional: after receiving your recommendation, would changing your own action improve your expected payoff while the other player follows theirs?",
          "Coordination does not require both players to receive the same instruction. Nor does a shared random number automatically create a correlated equilibrium for any payoff table. Inspect the actual rewards, the recommendation distribution and what each player learns. The displayed device illustrates one incentive-compatible construction; it does not establish that an unannounced human convention will work or that every player will obey a recommendation.",
        ],
        deeper: {
          title: "Commitment and disclosure are substantive assumptions",
          text: "If the sender can secretly change the signal rule after observing the state, the receiver’s calculation no longer describes the same game. Similarly, a correlated recommendation needs a specified joint distribution and information structure. Good arithmetic cannot compensate for an inaccurate account of who can change which rule and when.",
        },
      },
      {
        id: "checklist",
        title: "An information-and-incentives checklist",
        paragraphs: [
          "Apply this before deciding whether a strategic message deserves weight. It works best when the answers are concrete enough that someone else can inspect them.",
        ],
        checklist: [
          "State what the sender observes before speaking, which actions are available and how the sender’s payoff changes with your response.",
          "Ask whether the signal rule is fixed in advance and visible to the receiver. Distinguish a disclosed testing process from a claim that an undisclosed process was fair.",
          "Update using the probability of the message in every relevant state. The frequency of positive messages is not itself the probability that a positive message is correct.",
          "Check the receiver’s threshold and tie convention, then test the incentive to deviate after each recommendation rather than checking only average cooperation.",
        ],
      },
      {
        id: "applications",
        title: "Use the distinctions in a real conversation",
        paragraphs: [
          "An adviser, platform or seller may have expertise and an incentive to steer your action. That combination invites an audit rather than automatic trust or automatic rejection. Ask for the evaluation rule, rejected alternatives and circumstances in which the recommendation would change. Those details can reveal whether a message is informative about your objective.",
          "When the problem instead involves exchanging existing items, try [top trading cycles](/effects/top-trading-cycles). When a payoff table contains clearly inferior actions, try [iterated dominance](/effects/iterated-dominance). A more elaborate signaling story is not always necessary. Choose the model around the actual allocation, information and commitment problem, then keep its conclusions within those assumptions.",
        ],
      },
    ],
    experiments: [
      {
        slug: "cheap-talk",
        task: "Compare truthful aligned messages with a constant high recommendation.",
      },
      {
        slug: "bayesian-persuasion",
        task: "Find the disclosed signal rule that reaches the receiver’s investment boundary.",
      },
      {
        slug: "correlated-equilibrium",
        task: "Follow or override a traffic recommendation and inspect the incentive calculation.",
      },
    ],
    sources: [
      { ...s.cheap, note: "Primary strategic-communication model." },
      {
        ...s.persuasion,
        note: "Primary committed information-design framework.",
      },
    ],
    reflection:
      "What would make a recommendation informative for you even if its sender benefits when you follow it?",
  },
];
