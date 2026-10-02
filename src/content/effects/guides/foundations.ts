import { guide as g } from "./types";

export const foundationGuides = {
  "monty-hall": g(
    "The Monty Hall problem is a conditional probability puzzle: switching doors wins with probability two-thirds when an informed host always reveals a losing unchosen door and offers a switch.",
    "Your first choice has a one-third chance of being right. The other two doors collectively have two-thirds. The host's constrained reveal concentrates that remaining chance on the one unchosen door left closed; it does not reset the original choice.",
    "Compare many stay and switch trials. The advantage depends on the host knowing the prize location and following the stated reveal rule. An uninformed or selective host creates a different problem.",
    [
      "Imagine 300 independent rounds",
      "About 100 initial choices are correct and about 200 are wrong in expectation.",
      "Staying wins in the first group. Switching wins in the second because the informed host removes the other losing door.",
      "Switching therefore wins about 200 rounds, although actual finite counts fluctuate.",
    ],
    [
      "Two closed doors means fifty-fifty.",
      "The route by which the host removed a door carries information. Counting doors without accounting for that process loses it.",
    ],
    [
      "Why doesn't the host's reveal change my original chance?",
      "Under the standard rule, the host can reveal a losing door whether your first choice is right or wrong. Your choice still has its original one-third chance; the alternative inherits the two-thirds chance that you initially missed.",
    ],
    "Which host rule would make the usual switching argument stop applying?",
  ),
  "birthday-paradox": g(
    "The birthday paradox is the surprising probability that at least two people in a group share a birthday: under 365 equally likely independent birthdays, the chance exceeds one-half at 23 people.",
    "The question concerns any matching pair, not whether somebody matches you. A group of 23 contains 253 pairs. Those many opportunities explain why a collision becomes plausible with far fewer than 365 people.",
    "Increase group size and compare the sampled room with the calculated collision probability. One room without a match does not contradict a high probability; it is one outcome from the model.",
    [
      "Compare two birthday questions",
      "You enter a room with 22 other people. The chance that someone shares your particular birthday is about 5.9% under the model.",
      "The chance of any match among all 23 people is about 50.7%, because every pair counts.",
      "Specify whose match you are asking about before choosing the probability calculation.",
    ],
    [
      "At 23 people, someone is certain to match.",
      "A probability just above one-half still leaves many rooms with no shared birthday.",
    ],
    [
      "Does the birthday paradox apply outside birthdays?",
      "The collision idea also applies when many items are assigned to a finite set of identifiers. The precise calculation depends on the identifier space, assignment probabilities, and independence assumptions.",
    ],
    "Are you counting a match with one chosen item or a match between any two items?",
  ),
  "law-of-large-numbers": g(
    "The law of large numbers explains why a sample average or proportion becomes more likely to be close to its expected value as suitable repeated observations accumulate.",
    "An early surprise has a large effect on a small sample. Later it becomes a smaller part of the total. Independent trials need not compensate for earlier results; their accumulated relative fluctuations become smaller.",
    "Watch the running proportion rather than only the difference in counts. A curve may move away from its target temporarily, even as a larger sample makes large proportional errors less likely.",
    [
      "Five heads arrive in a row",
      "After five fair tosses that all show heads, the observed heads share is 100%.",
      "The next toss still has a 50% heads probability. Additional ordinary tosses dilute the influence of the first five.",
      "Long-run stabilization occurs through accumulation, not because tails becomes due.",
    ],
    [
      "A long sample must balance itself exactly.",
      "Convergence concerns proportions or averages under assumptions. It is neither exact balance at a finite point nor a promise about the next trial.",
    ],
    [
      "Does more data always make an estimate better?",
      "A larger representative sample can reduce sampling noise. It does not fix selection bias, incorrect measurement, dependence, or a changing process. Those require attention to how the data were collected.",
    ],
    "Which is shrinking in relative importance: an early result or the uncertainty of the next trial?",
  ),
  "compound-growth": g(
    "Compound growth applies each period's percentage change to the current total, so earlier gains also participate in later growth.",
    "Simple interest adds the same amount based on the starting balance. Compounding uses a changing base. The gap can be small initially and large later; inflation separately changes the purchasing power of the nominal total.",
    "Compare the compounded balance, simple-interest balance, and inflation-adjusted value at the same horizon. A growing nominal number does not necessarily mean equivalent growth in what it can buy.",
    [
      "Two years at a fixed 10%",
      "Start with 100 units and apply a 10% increase: the first-year total is 110.",
      "The second increase is 10% of 110, or 11, producing 121. Simple interest would produce 120.",
      "The extra unit comes from growth on the previous gain, not an increase in the assumed rate.",
    ],
    [
      "A smooth growth curve predicts actual returns.",
      "The curve shows arithmetic under fixed rates. Real returns, costs, and inflation can vary, so the model is a scenario rather than a forecast.",
    ],
    [
      "Can compounding work against me?",
      "Yes. Recurring charges, debt interest, and repeated percentage losses can also compound. The same multiplication rule applies even when the resulting change is unwanted.",
    ],
    "Is the percentage change applied to the initial amount or to the evolving total?",
  ),
  "diminishing-returns": g(
    "Diminishing returns means that adding another unit of one input produces less additional output when other relevant conditions are held fixed.",
    "Total output can still rise while marginal output falls. The next unit's contribution, not just the accumulated total, reveals the pattern. A bottleneck in another input often explains why more of the same resource helps less.",
    "Compare the total output with the gain from one additional input. A curve that flattens can still be increasing; a lower marginal gain is different from a negative gain.",
    [
      "More people in a small kitchen",
      "The first additional cook helps a busy restaurant use an idle station.",
      "Later cooks must share the same limited ovens and workspace, so each adds less usable output.",
      "Expanding the workspace may change the relationship; the pattern assumes those other resources stayed fixed.",
    ],
    [
      "Diminishing returns means output is falling.",
      "It means the extra output from another input is falling. Total output may continue increasing.",
    ],
    [
      "How is this different from diseconomies of scale?",
      "Diminishing returns typically varies one input while holding others fixed. Diseconomies of scale concerns rising average costs as the scale of an operation increases. They ask different questions.",
    ],
    "What is the next unit contributing, and which other resource is becoming the bottleneck?",
  ),
  "opportunity-cost": g(
    "Opportunity cost is the value of the best feasible alternative you give up when choosing an action. It includes forgone time and outcomes, not just money spent.",
    "A choice is attractive relative to what you could otherwise do with the same resources. Listing every possible alternative and adding their values together would exaggerate the cost, because you could not take them all simultaneously.",
    "Compare the chosen option with the strongest available alternative under the same budget or time constraint. Changing the alternative can change the opportunity cost even if the chosen option stays identical.",
    [
      "An evening has one open slot",
      "You can attend a workshop you value at eight units or finish a project you value at six.",
      "Choosing the workshop gives up the project. The opportunity cost is the six-unit alternative, not every activity you can imagine.",
      "If the project later becomes urgent and more valuable, the comparison changes even though the workshop has not changed.",
    ],
    [
      "A free activity has no cost.",
      "An activity with no price can still use time, attention, or capacity that has a valuable alternative use.",
    ],
    [
      "Should I include money already spent?",
      "Irrecoverable past spending is a sunk cost. Opportunity cost concerns the alternatives available now. Recoverable resources and future obligations may still belong in the current decision.",
    ],
    "What is the best realistic thing you cannot do if you choose this option?",
  ),
  "sunk-cost-fallacy": g(
    "The sunk cost fallacy is allowing an irrecoverable past expense to determine a choice that should depend on future costs, benefits, and available alternatives.",
    "Past spending can create pressure to justify an earlier decision. But money that cannot be recovered is unchanged by what you choose next. Relevant differences lie in the consequences of continuing, switching, or stopping from this point onward.",
    "Increase past spending without changing future benefits or costs. A rational forward comparison should stay the same. Separately changing a cancellation charge or recoverable asset can legitimately change the choice.",
    [
      "Finishing an unwanted course",
      "You paid 100 units for a non-refundable course and have two sessions remaining.",
      "Attending uses time worth 30 units to you but provides only 10 units of future benefit. The past 100 is unchanged by either choice.",
      "Assess the remaining sessions on their future consequences; completing them cannot undo the earlier payment.",
    ],
    [
      "Ignoring sunk costs means ignoring all history.",
      "History can reveal quality, probabilities, or commitments. The issue is treating irrecoverable spending itself as an additional benefit of continuing.",
    ],
    [
      "What if stopping has a penalty?",
      "A future cancellation penalty is relevant because the decision can change whether you pay it. The distinction is between consequences you can still affect and expenses you cannot recover.",
    ],
    "If you inherited this situation today without making the original purchase, what would you choose next?",
  ),
  "anchoring-bias": g(
    "Anchoring bias is the influence of an initial number or reference point on a later estimate, including when the starting value is weak or irrelevant evidence.",
    "An anchor can shape which values feel plausible and where adjustment begins. Moving away from it is not enough if the adjustment remains insufficient. Relevant starting information may be useful; arbitrary numbers deserve a different treatment.",
    "Change the anchor while holding the independent evidence fixed. The model makes anchoring influence explicit through its controls; it does not measure your susceptibility or prove that every estimate follows the displayed formula.",
    [
      "Estimating a job's duration",
      "Someone suggests the work should take four hours before anyone examines the requirements.",
      "The group adjusts upward to six hours, but an independent breakdown supports twelve.",
      "Generate an estimate from the actual tasks before comparing it with the initial suggestion.",
    ],
    [
      "Any use of a reference number is a bias.",
      "A relevant, well-supported reference may be informative. Bias arises when the starting value receives more influence than the evidence justifies.",
    ],
    [
      "How can I reduce anchoring in an estimate?",
      "Build an independent estimate, consider a plausible range, and examine reasons the initial value could be wrong. These practices improve the comparison; they do not guarantee immunity to anchoring.",
    ],
    "Which number arrived first, and what evidence supports it?",
  ),
  "confirmation-bias": g(
    "Confirmation bias is favoring information or tests that support an existing belief while giving less attention to evidence that could challenge it.",
    "A result compatible with your theory may also be compatible with several rivals. A useful test separates the explanations. In the sequence game, examples that fit a narrower guessed rule can all fit a broader hidden rule too.",
    "Try a sequence your theory rejects, not just another one it accepts. The feedback becomes informative when competing rules predict different answers. A single positive test rarely identifies the only possible rule.",
    [
      "Guessing a sequence rule",
      "You see 2, 4, 6 and guess that the rule is increasing even numbers.",
      "Testing 8, 10, 12 supports that guess but also fits many broader rules. Testing 3, 5, 9 distinguishes the even-number guess from a strictly increasing rule.",
      "Design a test that could make you revise your explanation, then use the result to compare alternatives.",
    ],
    [
      "Finding supporting evidence proves my explanation.",
      "Support is useful only in relation to what other explanations would predict. Several theories can explain the same observation.",
    ],
    [
      "Does confirmation bias mean my belief is false?",
      "No. A correct belief can be tested poorly too. The bias concerns how evidence is sought and interpreted, not whether the initial conclusion happens to be right.",
    ],
    "What observation would make you change your mind, and have you looked for it?",
  ),
  "present-bias": g(
    "Present bias gives an immediate reward extra weight relative to a delayed one, beyond the discounting applied between future rewards.",
    "A preference can reverse when a planned choice becomes immediate. Someone may prefer a larger reward next month over a smaller one next week, yet choose the smaller reward when it is available now. That timing change is the key distinction.",
    "Compare today-versus-later choices with later-versus-even-later choices. Change the immediate premium separately from the general discount rate to see which part creates the reversal.",
    [
      "A plan meets a tempting moment",
      "On Sunday, you intend to work on a useful project on Tuesday rather than take a small distraction.",
      "When Tuesday arrives, the distraction is immediate and the project's benefit remains delayed.",
      "A change in timing can reverse the preference even if the project's underlying value has not changed.",
    ],
    [
      "Choosing an immediate reward always shows present bias.",
      "An immediate option may rationally be better because of urgency, uncertainty, or opportunity costs. The model isolates timing preferences under simplified conditions.",
    ],
    [
      "Is present bias the same as impatience?",
      "General impatience discounts later rewards. Present bias adds a special preference for now, which can create inconsistency between a future plan and the choice made when the moment arrives.",
    ],
    "Would you make the same choice if both options were shifted equally far into the future?",
  ),
  "forgetting-curve": g(
    "A forgetting curve describes how access to learned information can decline over time. Spaced repetition changes the timing of retrieval and review to support retention.",
    "Forgetting is not always a smooth personal trajectory. Difficulty, prior knowledge, sleep, and the way you practice all matter. The model separates a chosen decay rate from review events so their effects can be examined clearly.",
    "Watch retention between reviews, not only immediately after one. Compare a schedule over the full horizon. A high score just after rereading says less about later recall than a successful retrieval after a delay.",
    [
      "Learning ten new terms",
      "You read ten definitions and can recognize them immediately afterward.",
      "A later attempt to explain them without looking reveals which ideas are still accessible. Reviews spread across time create additional retrieval opportunities.",
      "Assess learning at a useful delay rather than equating familiarity during study with lasting recall.",
    ],
    [
      "Everyone follows one universal forgetting rate.",
      "The displayed rate is an assumption. Actual retention varies with material, learners, context, and practice.",
    ],
    [
      "Why distinguish rereading from retrieval practice?",
      "Rereading exposes you to the answer; retrieval asks you to produce it. A feeling of familiarity may exceed what you can recall unaided, so the distinction matters when evaluating your study method.",
    ],
    "Can you explain yesterday's idea without seeing its definition?",
  ),
  "tragedy-of-the-commons": g(
    "The tragedy of the commons describes how individual use of a shared resource can exceed what the resource can sustain when users lack effective coordination or rules.",
    "Each person receives the immediate benefit of extra extraction while sharing its broader cost. That incentive can push total demand above replenishment. Communities can also create institutions that change the incentive and avoid depletion.",
    "Compare extraction with regeneration and inspect the resource stock over time. A short-term rise in personal benefit can coexist with a falling stock that reduces everyone's future options.",
    [
      "A shared water supply",
      "Five users draw from a reservoir that replenishes ten units per period.",
      "If each draws three units, total extraction is fifteen. The stock falls by five units before other losses or inflows are considered.",
      "A sustainable agreement must connect individual use to the shared replenishment limit and address how the rule is enforced.",
    ],
    [
      "Shared resources are always doomed.",
      "The dilemma is conditional on incentives and governance. Communities can develop monitoring, rules, sanctions, and coordination suited to their setting.",
    ],
    [
      "Is a commons the same as open access?",
      "No. A resource can be shared under clear membership and use rules. Open access lacks effective exclusion, which can create a different set of incentives and pressures.",
    ],
    "Who receives the benefit of an extra unit, and who pays its future cost?",
  ),
  "prisoners-dilemma": g(
    "The Prisoner's Dilemma is a game in which each player is individually tempted to defect, yet mutual cooperation gives both a better payoff than mutual defection.",
    "In the one-shot game, defection beats cooperation against either action by the other player. Repetition changes the situation: actions can affect future responses. Reciprocity can help sustain cooperation, but errors and the horizon can disrupt it.",
    "Read the payoff table before comparing strategies. In repeated rounds, inspect both cumulative payoff and cooperation. A strategy's performance depends on its opponent and on the noise level, not simply on its name.",
    [
      "Two partners share information",
      "Both benefit when each shares useful information, but one can gain by withholding while receiving the other's contribution.",
      "If both withhold, they lose the benefit they could have created together.",
      "Repeated interaction and credible responses may change incentives, while a one-time anonymous exchange leaves the original tension intact.",
    ],
    [
      "The best individual move creates the best joint outcome.",
      "In this payoff structure, individually dominant defection leads to a joint result worse than mutual cooperation.",
    ],
    [
      "Is tit for tat always the best strategy?",
      "No. Its results depend on opponents, payoffs, mistakes, and repetition. Noise can trigger retaliation cycles; forgiveness and other adaptations may help in some environments.",
    ],
    "What would make cooperation worthwhile after accounting for the other player's future response?",
  ),
  "schelling-segregation": g(
    "Schelling's segregation model shows how individual preferences about nearby neighbors can generate substantial separation at the population level.",
    "The final pattern need not be anyone's explicit goal. Each move changes another person's neighborhood, creating a chain of responses. Local decisions and global outcomes operate at different scales.",
    "Vary the tolerance threshold, then resample the initial arrangement. Compare local satisfaction with overall separation. The pattern illustrates a mechanism under the specified moving rule, not a complete explanation of real segregation.",
    [
      "A mixed neighborhood changes gradually",
      "People initially live in a mixed arrangement but prefer at least some neighbors of their own type.",
      "One person moves to satisfy that preference, changing the neighborhood composition for others and prompting further moves.",
      "The resulting clusters can be stronger than the segregation any single person requested.",
    ],
    [
      "A segregated outcome proves everyone wanted complete segregation.",
      "A collective pattern can emerge from weaker local preferences. Real outcomes can also involve policies, constraints, discrimination, and history omitted by this model.",
    ],
    [
      "Does a low preference threshold guarantee integration?",
      "No. Starting conditions, available vacancies, moving rules, and path dependence can affect the final arrangement. Compare multiple runs before treating one outcome as representative.",
    ],
    "Could many reasonable local choices combine into a collective outcome nobody intended?",
  ),
  "butterfly-effect": g(
    "The butterfly effect refers to sensitive dependence on initial conditions: small starting differences can grow substantially in a deterministic nonlinear system.",
    "Deterministic means the update rule determines the next state. It does not guarantee that limited-precision measurements permit useful long-range prediction. Repeated amplification can turn a tiny input difference into a large later divergence.",
    "Compare nearby starting states under the same rule, then change the system parameter. Not every parameter produces chaotic behavior. A short overlap followed by divergence is more informative than a single final difference.",
    [
      "Two almost identical forecasts",
      "Two model runs start from values that differ by a tiny amount and use the same update rule.",
      "At a sensitive parameter setting, repeated updates amplify the discrepancy until the trajectories separate.",
      "The uncertainty comes from initial precision within the model, rather than an extra random event added at every step.",
    ],
    [
      "Chaos means the system has no rules.",
      "A chaotic system can follow a completely specified deterministic rule. The difficulty is prediction under uncertainty about starting conditions.",
    ],
    [
      "Does every small change cause a huge outcome?",
      "No. Sensitivity depends on the system, parameter regime, and time horizon. Stable dynamics can dampen differences, while some nonlinear regimes amplify them.",
    ],
    "Is your prediction limited by randomness in the rule or by uncertainty about the initial state?",
  ),
};
