import { guide as g } from "./types";

export const strategyGuides = {
  antifragility: g(
    "Antifragility describes a response that benefits from variation within a relevant range. It differs from robustness, which resists change without necessarily gaining from it.",
    "The input average is not enough to determine the output average when the response is curved. A convex response can gain from spread; a concave one can lose from it. Benefits depend on the response and on surviving the shocks.",
    "Hold the average shock at zero and change its spread. Comparing all three curves under the same inputs isolates response shape. The invented quadratic payoffs illustrate convexity rather than measuring a real system's resilience.",
    [
      "A portfolio of small experiments",
      "A team can stop unsuccessful trials at a limited cost while expanding an unusually successful one.",
      "Greater variation can create more valuable successes if downside stays bounded and the team has enough reserve to continue.",
      "That asymmetry is useful only while the losses remain manageable and the successes can actually scale.",
    ],
    [
      "Any stress makes a system stronger.",
      "Excessive shocks can destroy a system or change its response. Benefiting from some variation does not imply benefiting from every shock.",
    ],
    [
      "How do I distinguish antifragile from robust?",
      "Ask what happens to the payoff when uncertainty increases under comparable average inputs. A robust response remains relatively unchanged; an antifragile response improves over the range being considered.",
    ],
    "Which costs are capped, which benefits can expand, and where would a shock become destructive?",
  ),
  "barbell-strategy": g(
    "A barbell strategy separates a protected allocation from a smaller risky exposure, making the location of downside risk explicit rather than spreading similar risk everywhere.",
    "The structure matters because the risky part can fail without consuming the full reserve. But calling an allocation safe does not make it safe: common dependencies, access restrictions, and assumed protections need examination.",
    "Compare the protected reserve with the risky payoff across scenarios. Change both allocation and downside assumptions. The total's apparent floor depends on the reserve remaining available and outside the risky exposure.",
    [
      "A team funds exploration",
      "A team reserves most of its resources for essential operations and assigns a smaller budget to uncertain prototypes.",
      "A failed prototype consumes only that budget if contracts and commitments do not spread losses to the reserve.",
      "The useful separation is operational, not merely a label on a spreadsheet.",
    ],
    [
      "A barbell eliminates risk.",
      "It redistributes and limits specified exposures under assumptions. Reserve failure, hidden leverage, and shared dependencies can undermine the intended protection.",
    ],
    [
      "Is a barbell always better than diversification?",
      "No. They describe different design choices. Diversification spreads exposures; a barbell emphasizes separation of a protected base and risky upside. Their value depends on costs, correlations, and objectives.",
    ],
    "Could the supposedly isolated risky activity still create obligations for your reserve?",
  ),
  optionality: g(
    "Optionality is the value of having a right to act without an obligation. An option can limit a specified downside while preserving access to favorable outcomes.",
    "You can decline an unfavorable opportunity, which makes the payoff asymmetric. However, preserving that choice may have a cost. Flexibility is useful when information arrives before the decision and you are still able to act on it.",
    "Compare the option payoff with an obligation under the same scenarios. Account for the option's cost, exercise rule, and expiration rather than looking only at its upside.",
    [
      "A small prototype before a full rollout",
      "A prototype costs five units and helps a team learn whether a larger project is promising.",
      "The team can proceed after a strong result or decline after a weak one, provided it has not already committed to the full expense.",
      "The prototype buys a decision after more information, but that flexibility must be worth its initial cost.",
    ],
    [
      "An option has no downside.",
      "The underlying commitment may be avoidable, but premiums, search effort, maintenance costs, and missed alternatives can still be losses.",
    ],
    [
      "When does flexibility have little value?",
      "When no relevant information arrives before the choice, when acting later is impossible, or when the cost of preserving the option exceeds the benefit. More possible choices is not automatically more usable value.",
    ],
    "What will you know later, and can you genuinely wait to commit until then?",
  ),
  "skin-in-the-game": g(
    "Skin in the game concerns whether a decision-maker shares the downside of the risks they create, rather than receiving rewards while passing losses to others.",
    "A payoff arrangement can make a risky action attractive to the chooser even when it is unattractive to the whole group. Sharing consequences can change that comparison, but alignment also depends on information, authority, and the kind of loss involved.",
    "Compare the chooser's payoff with the total payoff as downside sharing changes. A shift in the preferred action reveals an incentive mechanism, not a diagnosis of any particular person's motives.",
    [
      "A recommendation with asymmetric rewards",
      "An adviser receives a bonus when a project succeeds but loses nothing when it fails.",
      "If some failure cost falls on the adviser, their private comparison changes even though the project's physical outcomes do not.",
      "Assess who bears the loss before assuming a recommendation reflects the interests of everyone affected.",
    ],
    [
      "Bearing some downside guarantees good decisions.",
      "Shared risk can improve alignment but does not create knowledge or remove mistakes. The exposure may also be too small or different from the harm others face.",
    ],
    [
      "How does this relate to the principal–agent problem?",
      "Both examine incentive misalignment. Skin in the game emphasizes sharing consequences; principal–agent analysis also considers hidden information, effort, contracts, and delegated authority.",
    ],
    "Who can choose the risk, and who cannot avoid paying for its consequences?",
  ),
  "turkey-problem": g(
    "The turkey problem illustrates how a reassuring history can fail to reveal a mechanism that abruptly ends the pattern. Repeated favorable observations do not exhaust all possible causes.",
    "A forecast based only on recent outcomes may become increasingly confident while ignoring a scheduled or structural change. The issue is not that history is useless; it is that extrapolation depends on whether the generating process remains relevant.",
    "Compare what the trend estimate sees with the mechanism that produces the abrupt change. The teaching model deliberately includes a break, so it demonstrates a blind spot rather than estimating the frequency of real surprises.",
    [
      "A service depends on one supplier",
      "A supplier delivers reliably for months and a team treats that streak as evidence of continued availability.",
      "A known contract expiry or a single fragile dependency can end the service despite the reassuring record.",
      "Investigate the conditions that sustain reliability alongside the observed streak.",
    ],
    [
      "Past data never tells us anything.",
      "Past data can be valuable when the process and sampling are understood. The warning is against treating a favorable record as protection from omitted failure mechanisms.",
    ],
    [
      "Is this the same as the gambler's fallacy?",
      "No. The gambler's fallacy expects independent outcomes to compensate for a streak. The turkey problem concerns misplaced confidence when the assumed process omits a break or hidden mechanism.",
    ],
    "What could terminate this pattern without giving much warning in the recent observations?",
  ),
  "stag-hunt": g(
    "The Stag Hunt is a coordination game in which mutual cooperation offers a valuable payoff, but a safer individual choice can be preferable when cooperation is uncertain.",
    "The obstacle is confidence about the other person's action. Unlike a Prisoner's Dilemma, cooperating can be the best response to cooperation. Several stable outcomes may exist, and the group can remain at the less rewarding one.",
    "Compare each action against both possible opponent actions. Change the expected chance of cooperation and find where the preferred action changes. The threshold depends on the specified payoffs.",
    [
      "Two teams adopt a shared standard",
      "Both teams gain most if they adopt compatible tools together, while unilateral adoption is costly.",
      "Each can remain with a familiar tool that provides a smaller but more dependable benefit.",
      "Clear commitments and evidence of joint adoption can make the shared improvement easier to coordinate.",
    ],
    [
      "Cooperation is individually irrational in every social dilemma.",
      "In a Stag Hunt, cooperation is attractive when the other player cooperates. Uncertainty about coordination creates the tension.",
    ],
    [
      "How is Stag Hunt different from the Prisoner's Dilemma?",
      "Defection is individually dominant in a standard one-shot Prisoner's Dilemma. In Stag Hunt, the best response changes with the other player's action, making assurance and coordination central.",
    ],
    "Would you choose the shared goal if you knew the other person would commit?",
  ),
  "chicken-game": g(
    "The Chicken Game models a conflict in which each player wants the other to yield, while mutual escalation is worse than a one-sided concession.",
    "Holding firm is attractive if the opponent yields. Yielding becomes attractive if the opponent holds firm. This creates a different strategic structure from games where the same action wins against every response.",
    "Read the mutual-escalation cell before choosing a move. As the opponent's chance of escalation rises, compare the expected gain from standing firm with the potential conflict cost.",
    [
      "A deadline dispute",
      "Two teams each want the other to take responsibility for an urgent shared task.",
      "Either concession resolves the task, but if both refuse, the missed deadline harms both.",
      "The incentive to make the other side yield coexists with a shared reason to prevent mutual refusal.",
    ],
    [
      "Standing firm is always the strongest move.",
      "Its payoff depends on the other side yielding. Against another firm response, it can create the worst joint outcome.",
    ],
    [
      "Why can commitment be risky here?",
      "A commitment can influence the opponent's expectations, but it can also remove flexibility. If both sides become unable to yield, the mutual-escalation outcome becomes more difficult to avoid.",
    ],
    "What happens if both sides use the strategy each hopes will intimidate the other?",
  ),
  "matching-pennies": g(
    "Matching Pennies is a two-player zero-sum game: one player wins when the choices match, and the other wins when they differ.",
    "No fixed choice is safe against someone who can predict it. Randomization prevents systematic exploitation under the symmetric payoff rules. A mixed strategy is a probability distribution over actions, not indecision after choosing.",
    "Vary the opponent's choice frequency and compare expected payoffs. At a balanced mix, the symmetric game gives no predictable advantage to either pure choice. Changing the payoff table would change the relevant mix.",
    [
      "A predictable defender",
      "A defender always guards the left side, while an attacker benefits from choosing the other side.",
      "Once the pattern is known, the attacker can exploit it even if left was a reasonable choice initially.",
      "An unpredictable strategy can be valuable when your opponent's gain depends on anticipating your action.",
    ],
    [
      "Random play means ignoring strategy.",
      "Strategic randomization deliberately uses probabilities to prevent an opponent from exploiting a pattern.",
    ],
    [
      "Should every mixed strategy use fifty-fifty odds?",
      "No. The equal mix fits the symmetric Matching Pennies payoffs. In other games, optimal probabilities can differ because the gains and losses are unequal.",
    ],
    "Would an opponent who knows your pattern be able to profit from it?",
  ),
  "coordination-game": g(
    "A coordination game rewards compatible choices. Focal points are shared cues that help people coordinate when they cannot communicate directly.",
    "Your preferred action may depend more on what others will choose than on the option's intrinsic features. A convention, prominent label, or familiar location can become useful because each person expects the other to recognize it.",
    "Compare coordinated and mismatched cells in the payoff table. Adjust the opponent's likely choice and see how your best response changes. A focal label helps only when expectations about it are sufficiently shared.",
    [
      "A meeting place without messages",
      "Two friends must choose a meeting point from several equally convenient locations.",
      "A well-known landmark may attract both because each expects the other to notice its prominence.",
      "The landmark's value comes partly from a shared expectation, rather than superior physical convenience.",
    ],
    [
      "A focal point is objectively best.",
      "It can work because it is mutually recognizable. A different group or culture may coordinate on another cue.",
    ],
    [
      "Can coordination succeed at an inferior option?",
      "Yes. Compatible choices can be stable even if another shared choice would make everyone better off. Switching may require coordinated expectations rather than individual optimization alone.",
    ],
    "Which clue would both players expect the other to recognize?",
  ),
  "public-goods": g(
    "A public goods game explores the tension between personally costly contributions and benefits shared by the whole group, including people who do not contribute.",
    "A contribution may produce a net group benefit while returning only a fraction of that benefit to its contributor. The resulting incentive to free ride can reduce provision even when everyone prefers a well-funded shared resource.",
    "Compare the contributor's marginal return with the total group's return. A multiplier above one does not alone make contributing individually profitable; the way the return is divided matters.",
    [
      "A four-person shared pot",
      "Suppose each contributed unit creates two units of benefit, divided equally among four people.",
      "The contributor pays one unit and receives half a unit back. The group gains one unit overall, but the contributor loses half relative to holding their unit.",
      "The conflict comes from the difference between private and collective returns.",
    ],
    [
      "If the group gains, every contributor must gain individually.",
      "A shared return can be spread so thinly that the contributor receives less than their personal cost.",
    ],
    [
      "What could change cooperation?",
      "Repeated interaction, communication, matching contributions, enforceable rules, and concern for others can change incentives or preferences. The simple game isolates one allocation mechanism.",
    ],
    "How much of the benefit of your contribution comes back to you?",
  ),
  "ultimatum-game": g(
    "In the Ultimatum Game, one player proposes how to divide a pot and the other can accept or reject. Rejection leaves both with nothing under the standard rules.",
    "A positive offer may be financially better than zero yet still be rejected. Fairness, expectations, and the cost of tolerating an unequal split can enter preferences. An offer's arithmetic payoff is not a full model of every person's decision.",
    "Vary the offer and rejection threshold. Compare the proposer's possible gain with the chance of losing the entire pot. The programmed threshold is an assumption rather than a prediction of an individual responder.",
    [
      "Splitting a ten-unit pot",
      "A proposer offers the responder one unit and keeps nine.",
      "Acceptance gives the responder one; rejection gives both zero. Whether the offer is accepted depends on more than the money totals if fairness matters.",
      "A proposer considering rejection risk may choose a larger offer even when a smaller accepted offer would pay more.",
    ],
    [
      "Rejecting any positive offer proves irrationality.",
      "That conclusion assumes monetary payoff is the responder's only objective. Preferences can also include fairness or willingness to punish an unequal proposal.",
    ],
    [
      "How is this different from the Dictator Game?",
      "In the Dictator Game, the recipient cannot reject the proposed allocation. The Ultimatum Game adds that veto, which changes the proposer's incentives.",
    ],
    "Does a proposal account for what the responder values and what they can refuse?",
  ),
  "nash-bargaining": g(
    "Nash bargaining models a negotiated outcome by comparing each side's gain from agreement with what it would receive if no agreement were reached.",
    "The disagreement point is part of the bargain. An equal final split can produce unequal gains when the alternatives differ. The Nash solution maximizes a product of gains within a feasible set under specified assumptions.",
    "Move the disagreement payoffs and inspect the surplus each party receives above its fallback. Distinguish an equal division of the total from an equal division of the gains available through agreement.",
    [
      "A ten-unit agreement",
      "One person can secure two units without a deal and the other can secure zero.",
      "A six–four allocation gives each four units above their fallback. A five–five allocation gives gains of three and five.",
      "The fallback changes how the same total is interpreted in the symmetric bargaining model.",
    ],
    [
      "A fair bargain always divides the total equally.",
      "The model evaluates gains above disagreement, so different alternatives can justify different total allocations under its assumptions.",
    ],
    [
      "Does the Nash solution predict every negotiation?",
      "No. It is a structured solution concept. Time pressure, bargaining power, incomplete information, indivisible goods, and unequal weights can alter the process and the appropriate model.",
    ],
    "What does each side actually get if the negotiation fails?",
  ),
  "vickrey-auction": g(
    "A Vickrey auction is a sealed-bid second-price auction: the highest bidder wins and pays the second-highest bid under the standard single-item rules.",
    "Your bid decides whether you win; rivals' bids set the price. Under private values and the usual assumptions, truthful bidding avoids winning above your value or missing a purchase below it. These properties depend on the auction design.",
    "Hold rival bids fixed while changing your bid. Notice that raising an already winning bid need not increase the payment, while bidding beyond your value can make a loss possible.",
    [
      "A bidder values an item at 80",
      "The strongest rival bid is 60. A truthful bid of 80 wins at a payment of 60.",
      "If the strongest rival instead bids 90, bidding 100 would win but require paying 90 for an item worth only 80 to this bidder.",
      "The second-price rule separates the winning threshold from the price and makes overbidding risky.",
    ],
    [
      "A higher winning bid always means a higher payment.",
      "In this auction, the payment is determined by the strongest competing bid, provided the auction follows the stated rules.",
    ],
    [
      "Does truthful bidding remain best in every auction?",
      "No. The result belongs to a specific private-value second-price setting. Common values, budgets, collusion, multiple items, and different payment rules can change the incentives.",
    ],
    "Does your bid determine the price, the allocation, or both?",
  ),
  "winners-curse": g(
    "The winner's curse arises in common-value auctions when winning selects an unusually high estimate, making the winner vulnerable to overpaying.",
    "Several bidders estimate the same underlying value with noise. The largest estimate is disproportionately likely to contain a positive error. Winning is therefore information about your estimate, not just evidence that you found a bargain.",
    "Increase estimation noise or the number of bidders and compare the winning bid with the shared value. One profitable win does not remove the selection effect; inspect repeated outcomes and the model's assumptions.",
    [
      "Bidding for an uncertain lot",
      "Three bidders estimate the same lot at 90, 100, and 120, while its actual value is 100.",
      "A first-price winner paying 120 loses 20, despite having the most optimistic estimate.",
      "The highest estimate's selection is what creates the problem; the numerical example is illustrative, not a universal adjustment rule.",
    ],
    [
      "Winning means my estimate was the most accurate.",
      "Winning may instead mean your estimate had the largest upward error. Accuracy and optimism are different properties.",
    ],
    [
      "Is winner's curse the same as paying too much for a private-value item?",
      "No. In a common-value setting, bids provide noisy information about a shared unknown value. With private values, a bidder may legitimately value the same item more than others.",
    ],
    "What does the fact that your estimate beat everyone else's tell you about possible estimation error?",
  ),
  "market-for-lemons": g(
    "The market for lemons explains how asymmetric information about quality can discourage high-quality sellers and reduce the quality available in a market.",
    "A buyer unable to identify quality may offer a price based on the expected mix. Good sellers can reject that price, leaving a worse mix. Buyers then adjust their expectations again, creating a feedback between participation and information.",
    "Compare the buyer's offered price with sellers' reservation values. Track which sellers remain rather than assuming the initial quality distribution persists after the offer changes.",
    [
      "A used-product marketplace",
      "Buyers cannot distinguish reliable products from defective ones and offer a price reflecting the average quality.",
      "Reliable-product sellers whose reservation value exceeds that price exit the market.",
      "The remaining mix lowers expected quality, potentially causing buyers to reduce offers further.",
    ],
    [
      "Low quality is always caused by careless buyers.",
      "The model can produce adverse selection even when buyers act sensibly with the information available to them.",
    ],
    [
      "What can reduce the lemons problem?",
      "Credible inspections, warranties, reputation, and verifiable disclosures can help distinguish quality. Their effectiveness depends on whether signals are reliable and difficult for low-quality sellers to imitate.",
    ],
    "Who knows the quality before purchase, and how can they credibly communicate it?",
  ),
};
