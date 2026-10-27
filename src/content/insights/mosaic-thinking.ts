import type { Insight } from "./types";
import { mosaicSources as s } from "@/data/mosaic-expansion";
export const mosaicThinking: Insight[] = [
  {
    slug: "optical-illusions-context-size-brightness",
    title:
      "Why optical illusions work: size, length and brightness depend on context",
    description:
      "Explore the Ebbinghaus illusion, Müller–Lyer illusion and simultaneous brightness contrast, then apply a practical context checklist to charts and interface design.",
    topic: "Perception & judgment",
    published: "2026-10-27",
    takeaway:
      "A drawing’s physical values and a reader’s experience of it are different things. Preserve the measured target while changing context to understand the distinction.",
    intro:
      "Two identical greys can look different against different backgrounds. Equal line segments can appear unequal when their endpoints carry different decorations. These examples are useful because the physical drawing can be inspected while the experience remains open to observation. They invite a more careful design habit: test an object in its actual surroundings, and do not assume that equal input values guarantee equal appearance.",
    sections: [
      {
        id: "size",
        title: "Start by holding the central object still",
        paragraphs: [
          "The Ebbinghaus illusion compares central circles surrounded by differently sized neighbours. The important comparison is the target circle, not the diameter of the entire arrangement. If both target and context change at once, it becomes difficult to tell which change explains the difference a viewer reports.",
          "In the [Ebbinghaus matching activity](/effects/ebbinghaus-illusion), the left central radius stays at twenty drawing units while the right is adjustable. Remove the surrounds after choosing a match and inspect the recorded physical difference. A [primary study of geometrical illusions](https://pmc.ncbi.nlm.nih.gov/articles/PMC5220349/) provides research context for comparing perceptual effects. The board is a self-adjustment illustration, not a replication of that study or a calibrated measure of your visual system.",
        ],
      },
      {
        id: "length",
        title: "Distinguish a shaft from the fins around it",
        paragraphs: [
          "The Müller–Lyer illusion concerns apparent shaft length under different fin arrangements. Overall decorated extent and the horizontal segment between endpoints are different quantities. A diagram can encourage a reader to judge the former while a caption claims to compare the latter, creating a mismatch between the intended encoding and the perceived object.",
          "Use the [Müller–Lyer experiment](/effects/muller-lyer-illusion) to adjust the lower shaft before hiding its fins. The upper segment remains 240 units long. If your chosen lower segment differs, the reveal records that difference rather than secretly changing the line. An exact physical match is also a legitimate response. Visible numerical controls, unlimited viewing and uncontrolled screen geometry prevent this small activity from estimating a universal illusion magnitude or diagnosing perceptual ability.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: test a pair of chart markers",
        paragraphs: [
          "Imagine a dashboard using two circular markers to represent equal values. One sits among tiny marks and the other among large marks. The following is a proposed design review, not an empirical claim that all users will make the same error.",
        ],
        steps: [
          "Render both target markers with the same physical radius and verify that equality in the drawing code. Preserve a copy with the surrounding marks visible so the comparison reflects the intended layout.",
          "Ask a reader to compare apparent size, then remove or standardise the surrounding marks without changing the targets. Record the reader’s judgment separately from the known dimensions rather than treating either as a substitute for the other.",
          "Repeat the review in the actual panel size, spacing and theme. If the target is a precise comparison, add direct labels or a simpler common-scale encoding rather than expecting context to become irrelevant after an explanation.",
        ],
      },
      {
        id: "brightness",
        title: "Equal channel values do not guarantee equal appearance",
        paragraphs: [
          "The [simultaneous brightness contrast board](/effects/simultaneous-contrast) places patches on dark and light surrounds. The reference uses RGB channels of 128; the comparison can be adjusted. Equalising the surrounds preserves those channel values, letting you distinguish a physical drawing specification from an apparent match. The displayed numbers are not calibrated luminance readings.",
          "This distinction matters when a design uses colour to suggest status, emphasis or equivalence. A swatch reviewed on white can behave differently inside a dark panel. Display settings and ambient lighting add further variation. Test the actual arrangement and use redundant labels when interpreting colour correctly matters. A perceptual demonstration does not replace established accessibility checks, nor should a viewer’s subjective match be presented as a monitor calibration.",
        ],
      },
      {
        id: "checklist",
        title: "A practical context review for visual comparisons",
        paragraphs: [
          "Treat a context review as an investigation with an explicit target. Otherwise a redesign can accidentally change scale, spacing, contrast and meaning at once, leaving no clear explanation of what improved. Preserve the source values, identify the visual judgment a reader must make and test that judgment in the complete interface rather than in a detached asset preview.",
        ],
        checklist: [
          "Specify the physical quantity being encoded and the apparent comparison the reader needs to make.",
          "Keep the target fixed when testing how surrounding size, decoration or brightness changes its interpretation.",
          "Inspect both light and dark contexts at the actual display dimensions and expected reading distance.",
          "Use direct values, shape or text when a precise interpretation should not depend on a colour impression alone.",
          "Record observations as observations; do not label a small informal review a validated perceptual experiment.",
        ],
      },
      {
        id: "organisation",
        title: "Context also changes what counts as the object",
        paragraphs: [
          "Sometimes the issue is not an object’s apparent size or brightness but which region becomes the object at all. Figure–ground organisation can assign a shared boundary to a central vessel or to adjacent profiles. [OpenStax’s Gestalt chapter](https://openstax.org/books/psychology-2e/pages/5-6-gestalt-principles-of-perception) introduces this organisation of visual scenes. It provides a different question from matching two measured lengths.",
          "The related figure–ground activity uses an authored reversible shape and attention cues. Its buttons change contrast as well as instructions, so a click is not proof that an involuntary perceptual reversal occurred. That limitation is useful: an honest design demonstration separates what the interface changed from what the reader experienced. Across all these examples, the transferable habit is to keep drawing values, task instructions and perceptual judgments individually inspectable, then consider how they interact in the real layout.",
        ],
        deeper: {
          title: "What a numeric slider adds to a visual match",
          text: "A slider marked with physical dimensions gives the reader information beyond appearance. This makes the activity transparent and accessible, but also prevents interpretation as a blinded psychophysical estimate. An exact numerical match can reflect that extra information rather than the absence of a contextual perceptual effect.",
        },
      },
    ],
    experiments: [
      {
        slug: "ebbinghaus-illusion",
        task: "Match central circles and remove their different surrounds.",
      },
      {
        slug: "muller-lyer-illusion",
        task: "Compare shafts before and after hiding endpoint fins.",
      },
      {
        slug: "simultaneous-contrast",
        task: "Adjust the grey patch and then equalise both backgrounds.",
      },
    ],
    sources: [
      {
        ...s.illusions,
        note: "Primary research context for geometrical-illusion comparisons.",
      },
      {
        ...s.gestalt,
        note: "University-level introduction to perceptual organisation and figure–ground relationships.",
      },
    ],
    reflection:
      "Which parts of your interface invite an apparent comparison that differs from the measured quantity you intended?",
  },
  {
    slug: "dutch-vs-all-pay-auctions-screening",
    title: "Dutch vs all-pay auctions: the payment rule changes the game",
    description:
      "Compare descending-price and all-pay auctions, calculate net payoffs, and explore why a menu of contracts can reveal private information through choices.",
    topic: "Games & cooperation",
    published: "2026-10-27",
    takeaway:
      "Before choosing a strategy, identify who pays, when the opportunity ends and what participants know. Different payment rules create different incentives.",
    intro:
      "An auction is not simply a contest to offer the largest number. A Dutch auction ends when someone accepts a falling price. An all-pay auction charges losing bidders too. A menu of contracts can use choice itself to reveal private information. These mechanisms make an engaging lesson because the rules are short, the consequences are visible and a superficially similar action can mean something quite different in another game.",
    sections: [
      {
        id: "dutch",
        title: "A falling price trades surplus against availability",
        paragraphs: [
          "In a Dutch auction, a posted price descends until a bidder accepts it. Waiting can improve the price paid if the item remains available, but another bidder can end the sale first. A private value tells you what the item is worth to you; it does not reveal how long rivals will wait or determine a universally optimal stopping price.",
          "Play the [Dutch auction game](/effects/dutch-auction). Your value is eighty, the clock begins at one hundred and each tick falls by five. Scripted rival thresholds are revealed after play. The highest is fifty, so fifty-five is the cheapest winning tick under the declared ordering rule. This result belongs to this discrete bot scenario. [Stanford’s algorithmic game-theory notes](https://theory.stanford.edu/~tim/notes.html) provide broader teaching material on auction and mechanism design; the game does not claim to solve strategic bidding under an unspecified distribution of rivals.",
        ],
      },
      {
        id: "all-pay",
        title: "In an all-pay contest, losing still costs something",
        paragraphs: [
          "An all-pay auction charges every bidder their bid while only the winner receives the prize, subject to the tie rule. Net payoff therefore subtracts the bid even after a loss. This can resemble contests with irrecoverable effort, but any real application needs a careful argument about how effort, winning probabilities and prize values are represented.",
          "The [all-pay auction game](/effects/all-pay-auction) uses a prize worth twelve and a rival who bids uniformly from one through ten. Highest bid wins and equal bids split the prize. A bid above twelve cannot generate a positive net payoff even if it wins outright. That observation does not solve the game against strategic opponents; it is a direct consequence of the specified prize and cost. Keep the payment rule visible before comparing this activity with a winner-pays auction.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: calculate an all-pay bid’s average payoff",
        paragraphs: [
          "Take a bid of four against the board’s declared uniform rival. Enumerating the ten equally likely rival bids is more informative than judging the strategy by one lucky outcome. All amounts below are invented game units, not monetary advice.",
        ],
        steps: [
          "Against rival bids one, two or three, your four-unit bid wins twelve and nets eight each time. There are three winning cases, contributing twenty-four units to the ten-case payoff sum.",
          "Against a rival bid of four, the prize is split and your net is six minus four, or two. Against bids five through ten, you lose and still pay four, contributing minus twenty-four across those six cases.",
          "Add the ten case payoffs and divide by ten: the expected net is 0.2. Compare that exact bot average with the realised result, then change the bid to see why one win cannot establish a profitable general strategy.",
        ],
      },
      {
        id: "screening",
        title: "A contract menu reveals information through self-selection",
        paragraphs: [
          "Screening begins with private information on one side of an interaction. A menu can make different types prefer different choices, but only if their utility comparisons actually support that separation. Calling one tier premium does not force a high-value customer to select it. The cheaper option and the option to walk away remain part of the calculation.",
          "Try [screening contracts](/effects/screening-contracts). Customers value a quality unit at four or eight. At prices four and twelve, the stated tie rule supports different quality choices. Raise the second price to fourteen and the high-value customer can prefer the cheaper tier instead. The [Nobel Prize overview of asymmetric-information research](https://www.nobelprize.org/prizes/economic-sciences/2001/summary/) provides context for screening and related mechanisms. This two-customer exercise isolates self-selection rather than representing a complete competitive market or an optimal pricing solution.",
        ],
      },
      {
        id: "checklist",
        title: "Read these rules before importing a strategy",
        paragraphs: [
          "A strategy learned in one mechanism can become costly when transferred to another with a different payment or information rule. Before generalising from a successful round, describe the mechanism in enough detail that another reader could replay the same choices. If a crucial detail is unknown, label it as uncertainty rather than filling it with an unstated convenient assumption.",
        ],
        checklist: [
          "Identify whether only the winner pays, all participants pay or some effort cost is sunk before allocation.",
          "Specify how the clock moves, who can act at a tick and how equal actions or bids are resolved.",
          "Separate your private value from beliefs about rival values and strategies.",
          "Compare net payoff with gross prize value, including the cost of losing.",
          "Distinguish a fixed scripted bot comparison from an equilibrium claim about strategic participants.",
        ],
      },
      {
        id: "application",
        title: "Use the games to ask better mechanism questions",
        paragraphs: [
          "Suppose a team is designing an internal idea contest. A large prize may encourage effort, but participants can spend time that remains costly even if they lose. The relevant question is not merely whether the winning idea is valuable; it also includes total effort, participation and what information evaluators observe. A small all-pay model can surface that question without estimating the actual costs.",
          "Likewise, a service menu can reveal preferences only under the choices and constraints customers actually face. An expensive tier might fail to separate users because the lower tier is already sufficient, because switching is costly, or because quality is misunderstood. The simulations offer a starting language for these questions. Treat their transparent arithmetic as a way to inspect incentives, then gather evidence about the people and constraints before turning a game result into a real policy.",
        ],
        deeper: {
          title: "Why these games do not report an equilibrium",
          text: "The Dutch rivals follow fixed thresholds and the all-pay rival follows a uniform distribution. Neither bot adapts to your strategy. An equilibrium analysis would require a complete description of information, values, feasible actions and mutual best responses; a single-agent payoff comparison supplies only part of that description.",
        },
      },
    ],
    experiments: [
      {
        slug: "dutch-auction",
        task: "Find the cheapest winning clock tick, then test the cost of waiting one tick longer.",
      },
      {
        slug: "all-pay-auction",
        task: "Compare your realised payoff with the exact average against ten rival bids.",
      },
      {
        slug: "screening-contracts",
        task: "Raise the premium price until the high-value type switches to the lower tier.",
      },
    ],
    sources: [
      {
        ...s.auctions,
        note: "University teaching collection on auctions and mechanism design.",
      },
      {
        ...s.screening,
        note: "Authoritative research overview of asymmetric information and screening.",
      },
    ],
    reflection:
      "Which rule, if changed, would reverse the strategy you currently think is sensible?",
  },
  {
    slug: "gettier-marys-room-chinese-room-knowledge",
    title:
      "Gettier, Mary’s room and the Chinese room: three different questions about knowing",
    description:
      "Explore justified true belief, first-person experience and symbol manipulation through three interactive thought experiments, with clear distinctions and further reading.",
    topic: "Philosophy in practice",
    published: "2026-10-27",
    takeaway:
      "Truth, justification, experience and understanding are different concepts. A successful answer to one question does not automatically settle the others.",
    intro:
      "Can a well-supported true belief still fail to be knowledge? Could someone know every physical fact about colour vision yet learn something on first seeing red? Does following a rulebook establish understanding? These thought experiments are interesting partly because each makes a different gap visible. Treating them as interchangeable puzzles about whether someone is smart misses the arguments they were designed to provoke.",
    sections: [
      {
        id: "gettier",
        title: "Gettier cases challenge a proposed sufficient condition",
        paragraphs: [
          "A justified true belief has three familiar ingredients: someone believes a proposition, it is true and they have justification for believing it. A Gettier-style case adds an accident that seems to disconnect the good reason from the truth. The challenge concerns whether those ingredients suffice for knowledge, not whether justification or truth is generally unimportant.",
          "In the [Gettier activity](/effects/gettier-problem), a reliable label supports the belief that a sealed parcel contains gold. The belief is true. Reveal a history in which the label was accidentally swapped while the parcel happened to contain gold independently. Compare that with the ordinary inspection history. The [Stanford analysis of knowledge](https://plato.stanford.edu/entries/knowledge-analysis/) surveys the philosophical problem and proposed responses. The parcel is an authored illustration rather than a reproduction of Gettier’s original examples.",
        ],
      },
      {
        id: "mary",
        title: "Mary asks what complete physical knowledge includes",
        paragraphs: [
          "Mary’s room stipulates that Mary knows every physical fact about colour vision while lacking colour experience. The question is whether first seeing red teaches her something, and what kind of gain that would be. Rejecting the stipulation, accepting a new fact and accepting a new ability are different responses to the argument.",
          "The [Mary’s room thought experiment](/effects/marys-room) records a prediction and a later interpretation. Its red swatch illustrates the scenario; it cannot empirically establish complete physical knowledge or decide physicalism. The [Stanford discussion of the knowledge argument](https://plato.stanford.edu/entries/qualia-knowledge/) distinguishes several responses, including ability, acquaintance and alternative ways of conceptualising facts. A careful discussion states which gain is alleged before claiming that the scenario proves a metaphysical conclusion.",
        ],
      },
      {
        id: "worked-example",
        title:
          "Worked example: audit a correct answer without changing the question",
        paragraphs: [
          "Imagine a system gives the correct response to a request. The three thought experiments invite different follow-up questions. They do not supply a single test that converts visible performance into a complete account of knowledge or consciousness.",
        ],
        steps: [
          "Use the parcel case to ask whether the evidence reliably tracked the truth or the answer happened to be correct by an independent accident. Keep truth and the connection between evidence and truth separate.",
          "Use Mary’s scenario to ask whether descriptive mastery and first-person acquaintance are the same kind of achievement. State whether you are claiming a new proposition, a new ability or another mode of access to known facts.",
          "Use the symbol-room game to ask what rule-compliant output establishes about the operator or the system as a whole. Do not infer that a correct lookup score settles the semantic or consciousness question being debated.",
        ],
      },
      {
        id: "room",
        title: "The Chinese room separates syntax from a claim about semantics",
        paragraphs: [
          "Searle’s Chinese room argument asks whether formal symbol manipulation is sufficient for understanding. An operator can follow rules without knowing the meanings of the symbols. A prominent reply shifts attention from the operator to the whole system. Other replies challenge how the thought experiment connects computation, intentionality and mental states.",
          "Play the [Chinese room lookup activity](/effects/chinese-room) before choosing an interpretation. Correctly matching a few symbols establishes compliance with that particular rulebook. It establishes neither the presence nor absence of understanding in a modern language system. For the argument and its disputed replies, follow the contextual reading on the experiment page. The activity keeps its small objective score separate from the reader’s philosophical judgment because those are different kinds of claim.",
        ],
      },
      {
        id: "checklist",
        title: "A practical argument map for reading thought experiments",
        paragraphs: [
          "A thought experiment works by holding some features fixed and asking whether an intuition or inference survives. Disagreement can concern the scenario’s possibility, a stipulated condition, the judgment it prompts or the final conclusion. Naming the disagreement helps avoid talking past someone who accepts one stage and rejects another. A memorable story is a beginning for analysis rather than a substitute for it.",
        ],
        checklist: [
          "Write the exact question: knowledge, experience, understanding or some other property.",
          "List the scenario’s stipulations separately from facts that would need evidence in an actual case.",
          "Identify the inference connecting the intuitive judgment to the broader philosophical conclusion.",
          "Compare the strongest relevant reply, including whether it changes the level of analysis.",
          "Record uncertainty or a revised judgment without treating a lack of consensus as a numerical failure.",
        ],
      },
      {
        id: "use",
        title: "Use distinctions before applying a dramatic conclusion",
        paragraphs: [
          "These cases can improve everyday discussion even when no philosophical debate is resolved. A correct report may be poorly supported; an expert may lack a practical skill; impressive task performance may leave a deeper interpretation disputed. Each observation becomes clearer when the claimed property and the evidence for it are specified rather than compressed into a broad statement that someone knows.",
          "They can also be misused. A toy lookup room is not a faithful model of every computational architecture. An accidentally true parcel label is not evidence that all reliable processes fail to produce knowledge. Mary’s impossible-to-verify completeness condition is not a result from colour science. Preserve the narrow argument before drawing an analogy. The reward is a better question: exactly which gap remains between the observed performance, the stipulated facts and the conclusion you want to defend?",
        ],
        deeper: {
          title: "An argument can fail at more than one stage",
          text: "Someone might accept that Mary learns something yet deny that the gain is a new nonphysical fact. Another reader might challenge the completeness stipulation itself. Those positions should not be grouped together as merely denying the intuition: they disagree with different premises or inferences.",
        },
      },
    ],
    experiments: [
      {
        slug: "gettier-problem",
        task: "Compare ordinary tracking with an accidentally true belief under the same initial evidence.",
      },
      {
        slug: "marys-room",
        task: "Record whether the alleged gain is a fact, ability, acquaintance or unresolved question.",
      },
      {
        slug: "chinese-room",
        task: "Follow the symbol book and separate the performance score from your interpretation.",
      },
    ],
    sources: [
      {
        ...s.gettier,
        note: "University philosophical reference on knowledge analysis and Gettier problems.",
      },
      {
        ...s.mary,
        note: "University philosophical reference on the knowledge argument and major replies.",
      },
    ],
    reflection:
      "Which premise or inference do you disagree with, and have you separated it from the story’s stipulated facts?",
  },
];
