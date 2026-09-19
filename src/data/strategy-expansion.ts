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
const taleb = {
  title: "Nassim Nicholas Taleb — Antifragile: a graphical tour",
  url: "https://www.fooledbyrandomness.com/graphicaltour.pdf",
};
const games = {
  title: "MIT OpenCourseWare — Game Theory lecture notes",
  url: "https://ocw.mit.edu/courses/14-126-game-theory-spring-2016/bba04a523a1daeeeffee6c9f2377af17_MIT14_126S16_gametheory.pdf",
};
const nash = {
  title: "PNAS — The Nash equilibrium: a perspective",
  url: "https://doi.org/10.1073/pnas.0308738101",
};
export const strategyEntries: Entry[] = [
  {
    id: "antifragility",
    name: "Antifragility",
    thinker: "taleb",
    categories: ["risk", "complexity"],
    description:
      "The shape of a response determines whether variation helps or hurts.",
    title: "Same average. Different exposure.",
    question:
      "Spread two equally likely shocks apart while holding their average fixed. Compare fragile, robust and convex responses.",
    controls: [
      c("spread", "Shock size", 0, 40, 15),
      c("curvature", "Response curvature", 1, 5, 2),
    ],
    challenge: "Double the shock",
    preset: { spread: 30 },
    idea: "Taleb connects antifragility with benefiting from variation through a convex response. Robustness is a different property: resistance to change.",
    mechanism:
      "Two equally likely inputs are −s and +s. Payoffs are 100 − kx²/100 (fragile), 100 (robust), and 100 + kx²/100 (convex). The graph plots their equally weighted means across shock sizes. All three receive the same input distribution.",
    example:
      "Compare a system whose failures accelerate under load with a portfolio of small experiments whose losses are capped and successes can expand.",
    limitation:
      "These quadratic response functions are invented teaching examples, not calibrated systems. The benefit depends on the response remaining convex over the relevant range; extreme shocks may change it.",
    source: {
      title: "Taleb — Convexity and science",
      url: "https://fooledbyrandomness.com/ConvexityScience.pdf",
    },
  },
  {
    id: "barbell-strategy",
    name: "Barbell Strategy",
    thinker: "taleb",
    categories: ["risk", "decisions"],
    description:
      "Separate a protected reserve from a small, explicitly risky allocation.",
    title: "Protect a floor. Leave room for upside.",
    question:
      "Allocate 100 units between a protected reserve and a risky project. Stress the project from total loss to a large gain.",
    controls: [
      c("allocation", "Risky allocation", 0, 100, 10, "%"),
      c("return", "Project return", -100, 500, 100, "%"),
    ],
    challenge: "Lose the risky project",
    preset: { return: -100 },
    idea: "Taleb's barbell separates strongly protected resources from exposure with substantial upside. Its protection depends on keeping the safe side safe and the risky loss bounded.",
    mechanism:
      "Terminal units = 100 − allocation + allocation × (1 + return/100). The comparison allocates all 100 units to the same risky project. The reserve earns zero, the project cannot lose more than its stake, and there is no borrowing.",
    example:
      "A team might protect its operating budget while funding a small experimental product, rather than putting essential operations at risk.",
    limitation:
      "This is a one-period resource allocation model, not a portfolio recommendation. Inflation, counterparty failure, costs and leverage can invalidate the protected-floor assumption.",
    source: taleb,
  },
  {
    id: "optionality",
    name: "Optionality",
    thinker: "taleb",
    categories: ["risk", "decisions"],
    description:
      "The right to act without an obligation changes the downside of uncertainty.",
    title: "A choice is worth something. It also costs.",
    question:
      "Compare a reversible pilot with a commitment. Change the upside and the cost of keeping your choice open.",
    controls: [
      c("value", "Project value", 0, 200, 120),
      c("cost", "Pilot cost", 0, 50, 10),
      c("exercise", "Full launch cost", 20, 150, 80),
    ],
    challenge: "Try a disappointing project",
    preset: { value: 30 },
    idea: "Optionality gives a decision maker a way to participate in favorable outcomes while declining unfavorable ones. Paying too much for that flexibility can erase its benefit.",
    mechanism:
      "Commitment payoff = value − launch cost. Pilot payoff = max(value − launch cost, 0) − pilot cost. The pilot is assumed to reveal value perfectly before the launch decision. These are terminal payoffs, not an option-pricing formula.",
    example:
      "Test demand with a small prototype before committing to production; compare the value of being able to stop with the cost of the prototype.",
    limitation:
      "Real pilots reveal incomplete information and may delay entry. The model omits financing, time, competition and probabilities of project outcomes.",
    source: taleb,
  },
  {
    id: "skin-in-the-game",
    name: "Skin in the Game",
    thinker: "taleb",
    categories: ["risk", "games"],
    description:
      "Who receives the upside—and who bears the loss—can change a decision.",
    title: "Move the downside onto the decision maker.",
    question:
      "An agent chooses between a safe project and a risky one. Change how much of the risky loss the agent must share.",
    controls: [
      c("liability", "Agent share of loss", 0, 100, 0, "%"),
      c("failure", "Risky failure chance", 0, 100, 20, "%"),
      c("loss", "Failure loss", 20, 300, 100),
    ],
    challenge: "Require full downside sharing",
    preset: { liability: 100 },
    idea: "Taleb's skin-in-the-game principle asks whether people exposed to a decision's upside also face its downside.",
    mechanism:
      "Safe project: principal receives 8, agent receives 2. Risky success: principal receives 30, agent receives 10. Failure destroys L; the agent pays share × L and the principal pays the rest. The agent chooses the larger expected payoff, with ties favoring safety. Displayed payoffs transfer losses without double-counting them.",
    example:
      "Explore why a bonus tied only to successful launches may encourage different choices than a contract that also shares failure costs.",
    limitation:
      "Risk-neutral expected payoffs, enforceable liability and known probabilities are assumptions. Incentives do not capture ethics, ability, insurance or limited wealth.",
    source: {
      title: "Taleb — Skin in the Game",
      url: "https://www.fooledbyrandomness.com/incerto.pdf",
    },
  },
  {
    id: "turkey-problem",
    name: "Turkey Problem",
    thinker: "taleb",
    categories: ["risk", "probability"],
    description:
      "A long reassuring history can miss the mechanism that ends it.",
    title: "The past looks safest just before the break.",
    question:
      "Reveal a sequence of feeding days. Move the hidden regime-change day and compare a naive forecast with what actually happens.",
    controls: [
      c("day", "Days revealed", 1, 150, 80),
      c("breakday", "Regime change day", 20, 140, 100),
    ],
    challenge: "Reveal the break",
    preset: { day: 120, breakday: 100 },
    idea: "Taleb's turkey illustration highlights the danger of inferring safety from repeated benign observations while missing the process generating them.",
    mechanism:
      "Daily outcome is +1 before the chosen break and −100 from the break onward. A deliberately naive next-day forecast uses (positive days + 1)/(observed days + 2), as if days were exchangeable Bernoulli trials. The plotted history never shows days beyond the reveal control.",
    example:
      "A supplier can deliver reliably until a single unmodeled dependency fails. Studying that dependency may matter more than extending a streak chart.",
    limitation:
      "The break is set by you, not predicted. This deterministic story does not estimate real rare-event probabilities or show that Bayesian reasoning itself is invalid; it exposes a misspecified stationary model.",
    source: {
      title: "Taleb and Blyth — The Black Swan of Cairo",
      url: "https://fooledbyrandomness.com/ForeignAffairs.pdf",
    },
  },
  {
    id: "stag-hunt",
    name: "Stag Hunt",
    categories: ["games", "decisions"],
    description:
      "A valuable shared goal can require confidence that others will join.",
    title: "Trust changes the best move.",
    question:
      "Choose a joint hunt or a safe solo task. Set the chance your partner joins and play rounds against that policy.",
    controls: [
      c("opponent", "Partner chooses joint hunt", 0, 100, 60, "%"),
      c("reward", "Joint success reward", 4, 12, 8),
    ],
    challenge: "Lower confidence in your partner",
    preset: { opponent: 20 },
    format: "game",
    idea: "In an assurance game, cooperation is attractive when others cooperate. A safe alternative can keep both people in a less valuable outcome.",
    mechanism:
      "Joint/joint pays R to each. Joint/solo pays 0 and 3; solo/joint pays 3 and 0; solo/solo pays 3 each. The joint action has expected payoff pR; solo pays 3. Best-response cells mark pure Nash equilibria, allowing ties.",
    example:
      "Two firms may both benefit from adopting a compatible standard, yet each may wait for assurance that the other will invest.",
    limitation:
      "The opponent uses a fixed independent probability and does not learn. Payoffs are fictional and the model does not represent all trust relationships.",
    source: games,
  },
  {
    id: "chicken-game",
    name: "Chicken Game",
    thinker: "schelling",
    categories: ["games", "decisions"],
    description:
      "Each side wants the other to yield, but mutual escalation is costly.",
    title: "When both sides refuse to yield.",
    question:
      "Choose yield or hold firm. Increase the cost of mutual escalation and compare expected payoffs.",
    controls: [
      c("opponent", "Opponent holds firm", 0, 100, 40, "%"),
      c("damage", "Mutual escalation cost", 5, 50, 20),
    ],
    challenge: "Make escalation likely",
    preset: { opponent: 90 },
    format: "game",
    idea: "Schelling studied strategic conflict, including how threats and commitments affect choices. Chicken illustrates the danger when each side prefers the other to back down.",
    mechanism:
      "Hold/hold pays −D each; hold/yield pays 5 and 0; yield/hold pays 0 and 5; yield/yield pays 2 each. Opponent choices are independent draws with the chosen probability. Pure equilibria are highlighted from both players' best responses.",
    example:
      "Two departments may threaten to block a shared plan unless the other concedes, even though stalemate harms both.",
    limitation:
      "A payoff table cannot capture real conflict, communication or credible commitment. This toy opponent never adapts to threats.",
    source: {
      title: "Nobel committee — Schelling and strategic conflict",
      url: "https://www.nobelprize.org/uploads/2018/06/popular-economicsciences2005.pdf",
    },
  },
  {
    id: "matching-pennies",
    name: "Matching Pennies",
    thinker: "nash",
    categories: ["games", "probability"],
    description:
      "A predictable choice can be exploited even when neither pure choice is best.",
    title: "Can you stay unpredictable?",
    question:
      "You win when the choices match. Your opponent wins when they differ. Change its bias and compare heads with tails.",
    controls: [
      c("opponent", "Opponent chooses heads", 0, 100, 65, "%"),
      c("stake", "Points per round", 1, 10, 1),
    ],
    challenge: "Remove the opponent's bias",
    preset: { opponent: 50 },
    format: "game",
    idea: "Mixed strategies randomize over actions. Matching pennies has no pure Nash equilibrium: after any fixed pair of choices, one player wants to change.",
    mechanism:
      "Matching choices pay A +s and B −s; different choices reverse the payoffs. A's expected heads payoff is s(2p−1), and tails is its negative. At a 50/50 opponent, both pay zero in expectation. In equilibrium both randomize equally.",
    example:
      "A predictable inspection schedule can be exploited. Randomization can make a pattern harder to anticipate.",
    limitation:
      "This is a zero-sum game with a fixed opponent policy. It does not imply that random behavior is best in general.",
    source: nash,
  },
  {
    id: "coordination-game",
    name: "Coordination & Focal Points",
    thinker: "schelling",
    categories: ["games", "behavior"],
    description:
      "A shared convention can help people choose the same place without talking.",
    title: "Meet at the same place.",
    question:
      "Pick the station or the park. Move your belief about your partner's choice and see when your best response changes.",
    controls: [
      c("opponent", "Partner chooses station", 0, 100, 50, "%"),
      c("reward", "Reward for meeting", 2, 20, 10),
    ],
    challenge: "Make the station a focal point",
    preset: { opponent: 90 },
    format: "game",
    idea: "Schelling's focal points are salient choices that can coordinate expectations when several outcomes work.",
    mechanism:
      "Matching locations pay R to both; different locations pay 0. Expected station payoff is pR and park payoff is (1−p)R. The slider represents an assumed shared cue's effect on beliefs, not a measured psychological law.",
    example:
      "A familiar landmark, standard file format or common meeting time can become a coordination convention.",
    limitation:
      "No location is inherently focal in the model. Real salience depends on culture, context and shared knowledge.",
    source: {
      title: "Nobel committee — Schelling and coordination",
      url: "https://www.nobelprize.org/uploads/2018/06/popular-economicsciences2005.pdf",
    },
  },
  {
    id: "public-goods",
    name: "Public Goods Game",
    thinker: "ostrom",
    categories: ["games", "markets"],
    description:
      "A contribution can benefit the whole group while costing the contributor.",
    title: "What happens when everyone helps—or waits?",
    question:
      "Contribute from a 20-unit endowment to a shared fund. Compare your earnings with those of another group member.",
    controls: [
      c("contribution", "Your contribution", 0, 20, 10),
      c("others", "Each other's contribution", 0, 20, 10),
      c("multiplier", "Shared fund multiplier", 1, 4, 2, "×", 0.1),
    ],
    challenge: "Contribute nothing",
    preset: { contribution: 0 },
    idea: "Collective-action problems arise when individual incentives and group benefits differ. Ostrom's research shows why institutions and community rules matter to shared-resource governance.",
    mechanism:
      "Four people each start with 20. The total contribution is multiplied by m and split equally. Your payoff is 20−c+m(c+3o)/4; another person's is 20−o+m(c+3o)/4. Each extra unit you give returns m/4 privately and m to the group.",
    example:
      "Shared documentation, neighborhood maintenance and open-source work can benefit people who contribute different amounts.",
    limitation:
      "This one-shot model excludes punishment, reciprocity, communication and institutions. It is not a claim that real communities inevitably free-ride.",
    source: {
      title: "Elinor Ostrom — Beyond Markets and States",
      url: "https://www.nobelprize.org/uploads/2018/06/ostrom_lecture.pdf",
    },
  },
  {
    id: "ultimatum-game",
    name: "Ultimatum Game",
    categories: ["games", "behavior"],
    description: "An offer can be profitable and still be rejected.",
    title: "Make an offer the other side accepts.",
    question:
      "Split 100 units. Adjust a simulated responder's minimum acceptable share and see the cost of a rejected offer.",
    controls: [
      c("offer", "Offer to responder", 0, 100, 30),
      c("threshold", "Responder's minimum share", 0, 100, 25),
    ],
    challenge: "Test a rejected offer",
    preset: { offer: 10, threshold: 30 },
    idea: "Ultimatum experiments separate the proposer's choice from a responder's power to reject. Assumptions about acceptance determine which offers succeed.",
    mechanism:
      "The responder accepts when offered at least its threshold. Acceptance pays the proposer 100−offer and the responder offer; rejection pays both zero. The threshold is a user-defined deterministic policy, not a prediction about fairness preferences.",
    example:
      "A seller's theoretically profitable proposal can fail if the buyer views its terms as unacceptable.",
    limitation:
      "Real thresholds are unknown, context-dependent and variable. The model does not claim a universal fair split or reproduce measured human behavior.",
    source: {
      title:
        "Güth, Schmittberger and Schwarze — An experimental analysis of ultimatum bargaining",
      url: "https://doi.org/10.1016/0167-2681(82)90011-7",
    },
  },
  {
    id: "nash-bargaining",
    name: "Nash Bargaining",
    thinker: "nash",
    categories: ["games", "decisions"],
    description:
      "A negotiated split depends on what each side can get without a deal.",
    title: "Your outside option changes the agreement.",
    question:
      "Divide 100 units between two parties. Change their fallback payoffs and compare feasible splits using the Nash product.",
    controls: [
      c("fallbackA", "A's outside option", 0, 80, 20),
      c("fallbackB", "B's outside option", 0, 80, 10),
    ],
    challenge: "Make agreement impossible",
    preset: { fallbackA: 70, fallbackB: 60 },
    idea: "The Nash bargaining solution selects a feasible agreement by maximizing the product of gains above disagreement payoffs, under its axioms.",
    mechanism:
      "A receives x and B receives 100−x. Feasible gains require x≥a and 100−x≥b. With equal bargaining weights, x*=a+(100−a−b)/2 when a+b≤100. If a+b>100, there is no individually rational agreement and each takes its outside option.",
    example:
      "A credible alternative supplier or job offer can affect negotiations by changing the payoff available without agreement.",
    limitation:
      "This is a cooperative solution with transferable, linear utility and equal weights. It does not simulate a sequence of offers or say that all negotiations follow this solution.",
    source: nash,
  },
  {
    id: "vickrey-auction",
    name: "Vickrey Auction",
    thinker: "vickrey",
    categories: ["games", "markets"],
    description:
      "Paying the second-highest bid changes the incentive to report your value.",
    title: "Your bid decides whether you win. Not what you pay.",
    question:
      "Set your private value, bid, and the highest rival bid. Compare your payoff in first-price and second-price auctions.",
    controls: [
      c("bid", "Your bid", 0, 100, 60),
      c("value", "Your private value", 0, 100, 60),
      c("rival", "Highest rival bid", 0, 100, 45),
    ],
    challenge: "Overbid for a low-value item",
    preset: { bid: 90, value: 30, rival: 70 },
    idea: "William Vickrey analyzed auctions in which the highest bidder wins but pays the second-highest bid. Under private-value assumptions, bidding your value is weakly dominant.",
    mechanism:
      "You win only when your bid exceeds the rival maximum; ties go to the rival. Second-price utility is value−rival if you win, otherwise zero. First-price utility is value−bid if you win. Rivals are held fixed while your bid changes.",
    example:
      "Auction rules can make truthful reporting more attractive, rather than relying on bidders to volunteer private information.",
    limitation:
      "The result assumes independent private values, no collusion, no budget constraint and no effect of losing on utility. It does not transfer unchanged to common-value auctions.",
    source: {
      title: "Nobel committee — Vickrey and auction incentives",
      url: "https://www.nobelprize.org/prizes/economic-sciences/1996/press-release/",
    },
  },
  {
    id: "winners-curse",
    name: "Winner’s Curse",
    thinker: "milgrom",
    categories: ["games", "markets"],
    description:
      "The highest estimate may be the one with the largest upward error.",
    title: "Winning selects the most optimistic estimate.",
    question:
      "Run 1,000 auctions for an item worth 100. Increase the number of bidders or their uncertainty, then reduce their bids.",
    controls: [
      c("bidders", "Bidders", 2, 30, 8),
      c("noise", "Estimate error range", 0, 80, 30),
      c("discount", "Bid reduction", 0, 80, 0),
    ],
    challenge: "Add more competitors",
    preset: { bidders: 30 },
    idea: "Common-value auctions expose bidders to selection: winning provides information about how optimistic their estimate was. Milgrom and Wilson's work studies auctions with such information problems.",
    mechanism:
      "Each estimate is independently uniform between 100−e and 100+e. Every bidder submits max(0, estimate−reduction). The highest bid wins and pays its bid. The plot compares the running mean winning bid with the true value across 1,000 seeded auctions.",
    example:
      "A company bidding for an uncertain project can win precisely because its cost estimate was the most optimistic.",
    limitation:
      "These bidders use a naive shared rule, not equilibrium bidding. A common reduction can improve a winner's margin here without changing who wins; real competition and seller reserves complicate that trade-off.",
    source: {
      title: "Nobel committee — Milgrom, Wilson and the winner's curse",
      url: "https://www.nobelprize.org/uploads/2020/09/popular-economicsciencesprize2020.pdf",
    },
  },
  {
    id: "market-for-lemons",
    name: "Market for Lemons",
    thinker: "akerlof",
    categories: ["markets", "games"],
    description:
      "When buyers cannot observe quality, good products can leave the market.",
    title: "Watch hidden quality unravel a market.",
    question:
      "Buyers offer the expected value of products still for sale. Change buyers' value for quality and reveal successive market rounds.",
    controls: [
      c("premium", "Buyer value per quality unit", 1, 2.5, 1.5, "×", 0.1),
      c("rounds", "Market rounds", 1, 15, 8),
    ],
    challenge: "Increase gains from trade",
    preset: { premium: 2.2 },
    idea: "Akerlof's lemons model explains how asymmetric information can drive high-quality goods out of a market.",
    mechanism:
      "There are 100 sellers with qualities 1 through 100 and reservation prices equal to quality. Buyers value each at m×quality but see only the available pool. Round zero offers m times the initial mean quality. Each next round retains sellers whose quality is no greater than the previous price, then updates the offer to m times their mean. With no sellers, price is zero.",
    example:
      "Inspection, warranties or trustworthy certification can help a used-goods market distinguish quality instead of pricing everything from an average.",
    limitation:
      "This discrete iterative teaching model is not Akerlof's exact original model. Sellers do not re-enter and buyers have identical values. There are no warranties or strategic signals.",
    source: {
      title: "George Akerlof — Writing The Market for Lemons",
      url: "https://www.nobelprize.org/prizes/economic-sciences/2001/akerlof/article/",
    },
  },
];

export const strategyThinkers: Thinker[] = [
  {
    id: "nash",
    slug: "john-nash",
    name: "John Nash",
    description:
      "Mathematician whose work formalized non-cooperative equilibrium and axiomatic bargaining, central tools for analyzing strategic interaction.",
    areaIds: ["games", "decisions"],
  },
  {
    id: "vickrey",
    slug: "william-vickrey",
    name: "William Vickrey",
    description:
      "Economist known for auction theory and incentive design, including the second-price sealed-bid auction.",
    areaIds: ["games", "markets"],
  },
  {
    id: "milgrom",
    slug: "paul-milgrom",
    name: "Paul Milgrom",
    description:
      "Economist and author of Putting Auction Theory to Work, known for research on auctions, information and market design.",
    areaIds: ["games", "markets"],
  },
  {
    id: "akerlof",
    slug: "george-akerlof",
    name: "George Akerlof",
    description:
      "Economist and coauthor of Animal Spirits, known for studying asymmetric information and quality uncertainty in The Market for Lemons.",
    areaIds: ["markets", "behavior"],
  },
];
