import { guide as g } from "./types";

export const playGuides = {
  "simpsons-paradox": g(
    "Simpson's Paradox occurs when a relationship seen within subgroups changes direction after the groups are combined, because the groups contribute different weights.",
    "A total rate mixes performance with case composition. If one option handles mostly difficult cases and another mostly easy ones, the aggregate can reverse the comparison within each difficulty level. The appropriate grouping depends on the causal question.",
    "Balance the case mix while holding subgroup rates fixed. If the overall winner changes, the comparison was partly driven by weights rather than a change in either program's subgroup performance.",
    [
      "Two programs handle different cases",
      "Program A succeeds at 90% of easy cases and 30% of hard cases; B succeeds at 80% and 20% respectively.",
      "If A has only 10% easy cases, its total is 36%. If B has 90% easy cases, its total is 74%.",
      "A leads in each subgroup but trails overall. The different case mixes explain the reversal.",
    ],
    [
      "The subgroup result is always the correct result.",
      "Aggregation and conditioning answer different questions. Choosing what to control requires context and, for causal claims, a causal model.",
    ],
    [
      "How can I recognize a misleading aggregate?",
      "Look for groups with different baseline difficulty and different proportions across the compared options. Compute rates within groups and then check how the weights affect the combined result.",
    ],
    "Is the headline rate comparing performance, case mix, or both?",
  ),
  "ellsberg-urn": g(
    "Ellsberg's paradox explores ambiguity aversion: people may prefer bets with known probabilities over bets whose probabilities are unspecified.",
    "Risk with known odds and uncertainty about the odds are different information states. Assigning an unknown probability its midpoint is a modeling choice, not knowledge that the midpoint is correct. Preferences can depend on that distinction.",
    "Compare the known urn with the full range of outcomes consistent with the ambiguous urn. Treat the displayed hidden composition as one illustrative possibility, not information available when you made the initial choice.",
    [
      "Two urns, different information",
      "One urn is known to contain equal numbers of red and black balls. Another has the same total but an undisclosed color split.",
      "A red-ball bet has a known one-half chance in the first urn; its chance in the second is not established by the total alone.",
      "Preferring the first can reflect a response to missing probability information, rather than a difference in the stated reward.",
    ],
    [
      "An unknown chance is automatically fifty-fifty.",
      "Equal plausibility of verbal descriptions does not identify the urn's composition. A midpoint requires an additional assumption.",
    ],
    [
      "How is ambiguity different from ordinary risk?",
      "Ordinary risk often describes uncertainty about an outcome with a specified probability model. Ambiguity concerns uncertainty about which probabilities or model to use.",
    ],
    "Are you uncertain about the outcome, the probability, or both?",
  ),
  "allais-paradox": g(
    "The Allais paradox compares lottery choices that can reveal a tension with the independence axiom of expected utility theory, often involving a special preference for certainty.",
    "The same common outcome is removed or changed across two choice problems. Under the independence axiom, that shared component should not reverse the ranking of the remaining alternatives. Some preference patterns reverse it anyway.",
    "Make both choices before evaluating the paired result. Look at how common probability components change, not just at the largest prize or the expected monetary payoff in isolation.",
    [
      "Comparing two pairs of lotteries",
      "In the first pair, one option has a guaranteed payoff while another introduces a small chance of receiving nothing.",
      "In the second pair, a shared outcome is changed so that both options are uncertain.",
      "A preference reversal can indicate that certainty received a special weight inconsistent with the stated independence comparison.",
    ],
    [
      "Choosing something other than the highest expected payout proves irrationality.",
      "Expected utility allows attitudes toward risk. The paradox concerns a specific consistency axiom across choices, not merely maximizing average money.",
    ],
    [
      "Does this experiment tell me which lottery to choose?",
      "It helps you inspect the consistency and assumptions behind your preferences. It does not establish one correct preference for every person or reproduce an entire theory of decision-making.",
    ],
    "Would your preference survive replacing a shared outcome in both options?",
  ),
  "information-cascade": g(
    "An information cascade can occur when people following earlier actions stop acting on their own private evidence, causing later choices to convey less new information.",
    "Earlier actions may be useful signals, but many copied actions need not represent many independent observations. Once behavior becomes sufficiently persuasive, private clues can be suppressed and even a mistaken cascade can persist.",
    "Compare public choices with private signals. A long run of identical actions is more informative if it reflects independent evidence than if later players are copying the same earlier decisions.",
    [
      "A queue forms outside a restaurant",
      "Two early visitors enter based on their own clues about quality.",
      "Later visitors see the queue and join despite weak private impressions, assuming the earlier visitors knew more.",
      "The crowd grows, but the additional bodies may contain little additional independent evidence about quality.",
    ],
    [
      "Ten people agreeing means ten independent confirmations.",
      "Their decisions can be dependent if each inferred quality from the same earlier actions.",
    ],
    [
      "Can a rational individual join a mistaken cascade?",
      "Yes. Given limited private information and persuasive public actions, following can be sensible locally even when the collective conclusion is wrong. Revealing new independent information may change it.",
    ],
    "How many independent observations lie behind the apparent consensus?",
  ),
  "threshold-public-good": g(
    "A threshold public good provides its shared benefit only when contributions reach a minimum level, making success depend on coordination as well as generosity.",
    "A contribution can be decisive near the threshold and ineffective far below it. The consequences of failed funding also matter: refund rules and unrecoverable contributions create different incentives.",
    "Compare expected total contributions with the funding threshold. Watch whether your contribution is pivotal, and read the model's failure rule before assuming that money is automatically refunded.",
    [
      "A shared project needs ten units",
      "Other contributors have committed eight units and you can add two.",
      "Your contribution crosses the threshold, while adding one leaves the project below its stated requirement.",
      "The same two units can have different value when others have contributed only three or have already contributed ten.",
    ],
    [
      "Every contribution has the same effect.",
      "Near a threshold, a small contribution can determine success. Its effect depends on what others have already committed.",
    ],
    [
      "How does this differ from a linear public goods game?",
      "In a linear game, each extra contribution adds benefit gradually. A threshold game includes a discontinuity: a shared benefit appears only after enough resources are committed.",
    ],
    "Is your contribution adding a little value or deciding whether the project exists at all?",
  ),
  "trust-game": g(
    "The Trust Game studies an exchange in which one person transfers resources that grow before another person decides how much to return.",
    "The first transfer creates a larger potential joint payoff but exposes the sender to the receiver's choice. The sender cannot infer a guaranteed return from the multiplier alone. Expectations and reciprocity affect the interaction.",
    "Compare the amount sent, the enlarged pot, and the amount returned. Increasing the multiplier creates more possible surplus; changing the return rule determines how that surplus is actually shared.",
    [
      "A transfer creates a larger pot",
      "A sender gives four units, which become twelve for the receiver under a threefold multiplier.",
      "Returning four restores the transferred amount; returning six shares more of the resulting benefit with the sender.",
      "The size of the total and the fairness or profitability of the exchange are separate questions.",
    ],
    [
      "A larger multiplier guarantees a better deal for the sender.",
      "The sender's payoff also depends on what the receiver returns. More possible surplus is not a promise of reciprocity.",
    ],
    [
      "Does this measure whether someone is trustworthy in real life?",
      "A simplified game reveals behavior under its stated stakes and rules. It does not establish a person's character across settings with different relationships, information, and consequences.",
    ],
    "Which part of the outcome is controlled by your partner after you commit?",
  ),
  "centipede-game": g(
    "The Centipede Game is a sequential game in which passing can enlarge the available pot, while either player can stop at their turn and take the specified allocation.",
    "Backward induction starts at the final decision and reasons toward the beginning. Under particular payoff and knowledge assumptions it can recommend stopping early, even though mutual passing could create larger joint rewards.",
    "Compare the current take payoff with the possible payoff after passing and the opponent's chance of continuing. The bot's programmed continuation rule is different from assuming a fully rational opponent throughout.",
    [
      "A growing shared opportunity",
      "Two partners alternate decisions about whether to take the current allocation or let the opportunity grow.",
      "Passing creates a larger pot but also lets the other partner choose whether you get another turn.",
      "The attraction of continued growth competes with the risk that someone stops before your hoped-for payoff.",
    ],
    [
      "A larger future pot makes passing automatically best.",
      "Your future share depends on future choices by both players. The total alone does not determine your expected payoff.",
    ],
    [
      "Why might people pass in experiments?",
      "People may value cooperation, expect different reasoning, learn through play, or doubt the assumptions of backward induction. The theoretical prediction and observed choices are distinct objects.",
    ],
    "What must you believe about the next player for passing to be worthwhile?",
  ),
  "volunteers-dilemma": g(
    "The Volunteer's Dilemma occurs when everyone benefits if at least one person takes a costly action, but each person would prefer someone else to bear the cost.",
    "Waiting may work if someone else acts. When everyone reasons that way, the necessary action can remain undone. Larger groups create more possible volunteers but can also change each individual's willingness to take responsibility.",
    "Change group size and each other person's assumed volunteering chance separately. More people raises the chance that somebody acts when that individual probability is fixed; real probabilities need not remain fixed as groups grow.",
    [
      "Someone needs to report an outage",
      "Five people notice a shared problem that one report could fix.",
      "Each assumes someone else will report it, so everyone may wait despite wanting the repair.",
      "An explicit assignment can resolve uncertainty about responsibility without requiring every person to duplicate the task.",
    ],
    [
      "A larger group always means the task will be done.",
      "That follows only under specific assumptions about individual behavior. If willingness falls with group size, the overall result can differ.",
    ],
    [
      "How is this different from a threshold public good?",
      "The volunteer model needs at least one action rather than a total funding level. It highlights responsibility and the personal cost of being the actor.",
    ],
    "Has responsibility been assigned, or is everyone assuming someone else will act?",
  ),
  "beauty-contest": g(
    "The Beauty Contest Game asks players to predict other players' expectations. In this version, the target is two-thirds of the average number chosen by the group.",
    "A sensible guess depends on how far others reason about one another. Starting from a guess near fifty, one reasoning step suggests roughly thirty-three, another roughly twenty-two, and so on. The depth assumed for others matters.",
    "Move the opponent reasoning-depth control and compare your guess with the resulting target. Your own guess also changes the group's average, so the best response is not simply two-thirds of an average that excludes you.",
    [
      "Reasoning about a group's guesses",
      "If everyone else begins near fifty, a lower number near two-thirds of that value looks promising.",
      "If others anticipate the same adjustment, the likely average falls and the useful guess falls with it.",
      "Prediction requires an assumption about actual opponents, not only a chain of increasingly sophisticated calculations.",
    ],
    [
      "The deepest reasoning always wins.",
      "A guess can be too low when other players use shallower reasoning. Performance depends on the group you actually face.",
    ],
    [
      "How does this relate to Keynes's metaphor?",
      "Keynes described choices influenced by expectations of what other people would favor. The later number game isolates that recursive-expectation idea; it is not a complete model of financial markets.",
    ],
    "Are you predicting the object's value or what others believe others will choose?",
  ),
  "hotelling-location": g(
    "Hotelling's location game explores spatial competition: sellers choose positions partly in response to where customers and competitors are located.",
    "With uniform customers, equal prices, and nearest-shop choice, the midpoint between two shops divides their customers. Moving toward a rival can capture more of one side while reducing geographic separation between options.",
    "Inspect the customer split and the full best-response curve. Holding the rival fixed is different from predicting where both rivals move after responding to one another.",
    [
      "Two stalls on a 100-unit street",
      "Place shops at 25 and 75 with customers spread uniformly along the street.",
      "Their midpoint is 50, giving each half the customers. Moving the first shop to 49 moves the midpoint to 62.",
      "The moving shop captures a larger side of the street under these assumptions, even though customers may travel differently.",
    ],
    [
      "Clustering always gives customers the best locations.",
      "A seller's market-share incentive and customers' travel costs are different objectives. The simple competition rule need not minimize total travel.",
    ],
    [
      "Why don't all real shops converge on one point?",
      "Prices, quality differences, uneven customer density, multiple competitors, space constraints, and travel behavior change the incentives. This model fixes those factors to isolate location competition.",
    ],
    "Does the location that helps one seller also reduce travel for the customers?",
  ),
};
