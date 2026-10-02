import { guide as g } from "./types";

export const coreGuides = {
  "lindy-effect": g(
    "The Lindy Effect is a longevity heuristic: for some non-perishable ideas and practices, a longer surviving history can be evidence of a longer remaining life.",
    "Survival is informative when repeated challenges test enduring usefulness. A proof does not wear out like a battery. But age alone cannot tell you whether persistence came from usefulness, institutional protection, or a lack of alternatives.",
    "Change observed age while holding the other controls fixed, then change Lindy strength. If age matters only when strength is positive, you are seeing an assumed relationship—not an independent discovery about old things.",
    [
      "Choosing a reference book",
      "Two books explain the same topic: one is new, and one has remained in use for decades.",
      "Ask what kept the older book useful and whether the subject has changed. A timeless proof and an obsolete software manual face different conditions.",
      "Use longevity as one piece of evidence alongside accuracy, relevance, and the reason the work survived.",
    ],
    [
      "An old idea must be correct.",
      "Longevity is not a truth test. Persistent misconceptions can survive too; the mechanism behind survival matters.",
    ],
    [
      "Does the Lindy Effect apply to people?",
      "Not in the same straightforward way. Biological aging involves wear, disease, and changing hazards. A claim about non-perishable ideas cannot be transferred to a person's remaining lifespan.",
    ],
    "Name an old practice you trust. What has it survived, and what could make that history stop being informative?",
  ),
  "fat-tails": g(
    "Fat tails describe distributions in which extreme outcomes are more probable than under a thin-tailed comparison, such as a normal distribution.",
    "When a few large observations account for much of a total, the average can change sharply after one more event. This makes the shape of the tail important, even if most everyday observations look unremarkable.",
    "Compare typical outcomes with the contribution of the largest observations. A stable-looking center says little about whether the model gives enough weight to rare, consequential events.",
    [
      "A service with occasional huge jobs",
      "Most requests take little time, but a few require hours of processing.",
      "An average based on a quiet week may underestimate the resources needed when one large job arrives.",
      "Inspect extremes and capacity constraints alongside the average; do not assume every workload follows a bell curve.",
    ],
    [
      "Fat-tailed means that disasters happen all the time.",
      "An extreme event can still be rare. The claim is about its probability relative to a specified alternative model.",
    ],
    [
      "Are every skewed distribution and every power law fat-tailed?",
      "Skewness describes asymmetry, while tail behavior describes how probabilities decline far from the center. These properties are related in some distributions but are not interchangeable.",
    ],
    "Which single unusually large outcome could dominate a total you normally describe using an average?",
  ),
  "kelly-criterion": g(
    "The Kelly criterion is a position-sizing rule that maximizes expected logarithmic wealth in a specified model of repeated uncertain payoffs.",
    "An edge does not make every stake sensible. Larger stakes increase gains when you win and the damage when you lose. Logarithmic growth puts special weight on preserving the resources needed to participate in later rounds.",
    "Compare arithmetic expected gain with growth along a repeated path. The stake with the highest average one-round payoff need not produce the strongest long-run compound growth.",
    [
      "An illustrative repeated bet",
      "Suppose a fair even-money payoff is offered on an event with a correctly known 60% win chance.",
      "The simple binary Kelly formula gives 2p − 1 = 20% as its model optimum, not an instruction for a real wager.",
      "Changing the probability, payoff, or constraints changes the result; uncertain estimates make the optimum especially sensitive.",
    ],
    [
      "Kelly guarantees that wealth increases.",
      "It optimizes a particular expected growth objective. Losing runs and substantial drawdowns remain possible.",
    ],
    [
      "Why does a probability estimate matter so much?",
      "The calculated edge comes directly from that estimate. If the estimated win chance overstates the true chance, a supposedly optimal stake can be too large or belong to a game with no edge at all.",
    ],
    "Which matters more in your model: knowing the edge precisely, or choosing a stake from an imprecise estimate?",
  ),
  "gamblers-ruin": g(
    "Gambler's ruin is the risk that finite resources reach a stopping boundary before a favorable average can translate into a successful journey.",
    "A population of parallel lives can include a few large winners and many terminated paths. A single participant experiences one sequence and cannot borrow the gains from those other lives to recover after stopping.",
    "Inspect the ruined share, surviving paths, and the typical outcome together. Then change stake size while keeping the win chance fixed. A favorable edge and the ability to stay in the game answer different questions.",
    [
      "A small project budget",
      "A team has enough reserve to survive several failed experiments, but not unlimited failures.",
      "Doubling the cost of each attempt reduces how many setbacks the same reserve can absorb, even if the success rate stays unchanged.",
      "Treat the stopping boundary and the amount at risk as part of the decision, rather than considering only the average return.",
    ],
    [
      "A positive average payoff rules out ruin.",
      "An average describes the distribution of outcomes. It does not protect a particular path from reaching an absorbing boundary.",
    ],
    [
      "Does ruin always mean literally reaching zero?",
      "No. It can mean falling below a minimum operating reserve, losing access to credit, or crossing another defined threshold. The boundary and time horizon must be specified.",
    ],
    "What would make a sequence of recoverable setbacks become an irreversible failure?",
  ),
  "base-rate-neglect": g(
    "Base rate neglect is overlooking how common an event was before receiving new evidence. A reliable signal can still produce many false positives when its target is rare.",
    "A detection rate starts with actual targets; a positive predictive value starts with flagged cases. These are different groups. Count true and false flags before interpreting the meaning of one flag.",
    "Lower the spam prevalence while keeping detection and false alarms fixed. The fraction of flags that are genuine falls because there are many more non-spam messages available to generate false alarms.",
    [
      "A spam filter flags a message",
      "Among 1,000 messages, suppose 10 are spam and the filter catches 9 of them.",
      "A 5% false alarm rate among 990 legitimate messages adds about 49.5 false flags in expectation.",
      "About 9 out of 58.5 expected flags are spam: roughly 15.4%, despite a 90% detection rate.",
    ],
    [
      "A 90% detection rate means a flag is 90% likely to be correct.",
      "That swaps the conditioning. You also need prevalence and the false alarm rate to interpret a flag.",
    ],
    [
      "Which base rate should I use?",
      "Use the population from which the case was drawn. A broad average can be misleading if a specific subgroup has a different prevalence or if the signal behaves differently within it.",
    ],
    "Before trusting a striking signal, which denominator would you count?",
  ),
  "regression-to-the-mean": g(
    "Regression to the mean is the tendency for an unusually high or low measurement to be followed by a less extreme one when repeated measurements are imperfectly correlated.",
    "A standout result often combines a persistent component with temporary luck or measurement noise. Selecting the extremes also selects unusual noise. On a later measurement, that temporary component need not repeat.",
    "Compare first and second scores for the selected extreme group. Lower correlation produces more movement toward the population average; it does not force every individual point to move in that direction.",
    [
      "A team rebounds after a bad week",
      "Choose teams because their first-week results were unusually poor.",
      "Some had bad luck as well as weak performance. A second week with different luck may look better without any intervention.",
      "A comparison group helps distinguish this selection effect from an improvement caused by a new policy.",
    ],
    [
      "Every extreme score must move toward the average next time.",
      "Regression describes a conditional tendency across observations, not a rule that determines the next result for one person.",
    ],
    [
      "Is regression to the mean the same as genuine improvement?",
      "No. Improvement changes an underlying process; regression can happen with stable ability and fresh noise. Both may occur together, so the before-and-after difference alone is insufficient.",
    ],
    "Was a group chosen because its first result was extreme? How would that affect a before-and-after comparison?",
  ),
  "goodharts-law": g(
    "Goodhart's Law describes how a measure can lose its usefulness as a proxy when people are rewarded for optimizing the measure itself.",
    "A metric can track quality before becoming a target. Once incentives change, people may improve the number through shortcuts that do not improve the underlying goal. The important question is how behavior adapts.",
    "Keep the goal and the proxy separate. Evidence of a higher reported score is not enough; look for a corresponding improvement in the outcome the metric was meant to represent.",
    [
      "A support team's speed target",
      "A company uses average ticket-closing time as a rough measure of responsiveness.",
      "If closing tickets quickly becomes the only rewarded behavior, staff may close unresolved cases or avoid difficult ones.",
      "Pair speed with resolution quality and follow-up outcomes so the incentive reflects the actual service goal.",
    ],
    [
      "All targets inevitably fail.",
      "The risk depends on incentives, the proxy's connection to the goal, and the available ways to game it. Some targets remain useful.",
    ],
    [
      "How is Goodhart's Law different from ordinary measurement error?",
      "Measurement error can exist before a target is introduced. Goodhart-style problems emphasize how optimizing the target changes behavior and can weaken the relationship between the measure and the objective.",
    ],
    "How could someone improve your favorite metric without improving the thing you care about?",
  ),
  "survivorship-bias": g(
    "Survivorship bias is a selection error: drawing conclusions from cases that remain visible while overlooking cases removed by failure, exit, or filtering.",
    "The visible group answers a question about survivors. It may not answer the question you intended about everyone who began. The missing cases can change both the average result and the apparent causes of success.",
    "Identify what allowed a case into the sample and what removed others. Reconstruct the starting population before treating a common feature of successful cases as a recipe for success.",
    [
      "Studying successful businesses",
      "You interview thriving firms and find that many took ambitious risks.",
      "Firms that took similar risks and closed down are absent from the interviews.",
      "Compare success and failure among all firms that took the risk before claiming the behavior caused success.",
    ],
    [
      "A pattern among winners explains how to win.",
      "It could also be common among failures. A pattern's predictive value requires information about the comparison group.",
    ],
    [
      "Is survivorship bias always an overly optimistic estimate?",
      "Often, but not necessarily. The selection process determines the direction of the distortion. The central issue is that omitted cases differ in ways relevant to the conclusion.",
    ],
    "Who is missing from the evidence you can see, and why did they disappear?",
  ),
  "power-laws": g(
    "A power law describes a relationship in which one quantity scales as a fixed power of another. Certain power-law distributions produce strong concentration in a long tail.",
    "Equal percentage changes matter more than equal absolute changes in a scaling relationship. In the rank-based experiment, a larger exponent gives the highest-ranked pages more traffic and leaves less for the rest.",
    "Compare the top-tenth traffic share with the average visits per page. Resampling changes the realized counts, while changing the exponent changes the underlying allocation probabilities.",
    [
      "A site depends on a few popular pages",
      "Imagine 100 pages receiving a fixed total number of visits.",
      "An even allocation spreads attention broadly; a steep rank distribution makes a handful of pages responsible for much of the traffic.",
      "The total may look healthy while the typical page receives little. Concentration also exposes dependence on the leaders.",
    ],
    [
      "Any skewed chart proves a power law.",
      "Other distributions can look similar. Establishing a power law requires statistical comparison over an appropriate range, not just a straight-looking plot.",
    ],
    [
      "How is this different from the Pareto principle?",
      "The Pareto principle is a rough concentration heuristic. A power law is a particular mathematical relationship. Neither guarantees that exactly 20% of cases produce 80% of the total.",
    ],
    "Would you rather know the average contribution or how dependent the total is on its largest contributors?",
  ),
  "loss-aversion": g(
    "Loss aversion is the tendency for a loss relative to a reference point to have more psychological weight than a comparable gain.",
    "A change is evaluated against what someone treats as normal or already theirs. This helps explain why the same final outcome may feel different when presented as a gain or a loss. The size of the effect varies across settings.",
    "Identify the reference point before comparing gains and losses. A preference for safety alone does not establish loss aversion, because ordinary risk aversion can produce caution without a special response to losses.",
    [
      "A discount versus a surcharge",
      "A purchase can be presented as saving five units off a listed price or paying five extra units over a lower reference price.",
      "Even with the same final cost, the reference point changes which adjustment looks like a gain or a loss.",
      "Rewrite both options using the same baseline before deciding whether the framing affects your preference.",
    ],
    [
      "Every loss hurts exactly twice as much as a gain helps.",
      "There is no universal multiplier for all people, decisions, or stakes. The reference point and context matter.",
    ],
    [
      "Is loss aversion the same as the endowment effect?",
      "They are related ideas. The endowment effect concerns valuation differences associated with ownership, while loss aversion concerns the relative weight of losses and gains. Ownership may change the reference point.",
    ],
    "What baseline makes an outcome feel like a loss rather than a smaller gain?",
  ),
  "network-effects": g(
    "Network effects occur when a product or service's usefulness depends on how many other people participate—and, often, which people they are.",
    "A communication network has more possible connections as membership grows. But possible pairs are not actual conversations. Relevance, compatibility, and participation determine whether those potential connections create value.",
    "Change membership and connection probability separately. Adding people increases possible pairs; low connection probability can still leave many isolated members. Read potential connectivity and realized connectivity together.",
    [
      "A class chooses a messaging app",
      "One student installs an excellent app that no classmates use.",
      "A less elaborate app becomes more useful to that student if their study group already participates there.",
      "The relevant network is the people the student wants to reach, not simply the platform's worldwide user count.",
    ],
    [
      "Every extra user makes a network better.",
      "Congestion, spam, incompatible needs, and irrelevant participants can reduce value. Network effects need a mechanism, not just a growing number.",
    ],
    [
      "How are network effects different from economies of scale?",
      "Network effects change user value through participation. Economies of scale change production costs as output grows. A business can have either, both, or neither.",
    ],
    "Whose participation would make a tool more useful to you, and whose would make little difference?",
  ),
  "principal-agent-problem": g(
    "The principal–agent problem arises when someone delegates a task to another person whose incentives or information differ from their own.",
    "Delegation is useful, but effort and quality are often hard to observe. An agent may choose what benefits them under the contract, even when the principal would prefer a different action. Information and incentives interact.",
    "Separate who chooses the action, who observes its consequences, who receives the reward, and who bears the cost. A mismatch in any of these can explain behavior that otherwise seems puzzling.",
    [
      "A repair contract",
      "A customer wants a durable repair, while a contractor is paid only for finishing quickly.",
      "If hidden shortcuts reduce the contractor's time without an immediate visible failure, the contract rewards behavior the customer dislikes.",
      "Verification, warranties, and incentives tied to durability can help align the task with the customer's objective.",
    ],
    [
      "A principal–agent problem means the agent is dishonest.",
      "Even honest people can respond to a poorly designed incentive. The problem can arise from conflicting goals or incomplete information.",
    ],
    [
      "Can monitoring solve the problem completely?",
      "Monitoring can help, but it has costs and may measure the wrong things. Contract design, trust, professional standards, and clearer objectives can matter alongside observation.",
    ],
    "If you delegated a task, what behavior would your payment rule actually reward?",
  ),
  "risk-of-ruin": g(
    "Risk of ruin is the probability of crossing a failure boundary over a stated period. It is a property of a model, a threshold, and a time horizon.",
    "Failure risk accumulates across exposures, and the size of each loss determines how much room remains for recovery. A system can have attractive ordinary outcomes yet remain vulnerable to an absorbing failure state.",
    "State exactly what counts as ruin before comparing scenarios. A probability of dropping below an operating reserve within one year cannot be compared directly with a lifetime probability of reaching zero.",
    [
      "A reserve for uncertain expenses",
      "A project defines failure as having fewer than ten resource units left, not literally exhausting every unit.",
      "The same sequence of expenses can cross that boundary earlier than a zero-balance boundary.",
      "Choose the boundary because it reflects when the project can no longer continue, then evaluate the stated horizon.",
    ],
    [
      "Risk of ruin is one fixed number for a strategy.",
      "Starting reserves, dependence, stake sizes, stopping rules, and the horizon all change the probability.",
    ],
    [
      "How is risk of ruin related to gambler's ruin?",
      "Gambler's ruin is a classic model of boundary crossing with finite resources. Risk of ruin is a broader term used for specified failure thresholds in other stochastic processes.",
    ],
    "Which boundary represents inability to continue, and how long must the system survive?",
  ),
  ergodicity: g(
    "Ergodicity concerns when a time average along a process agrees with an average across its statistical ensemble. It depends on the process and the quantity being averaged.",
    "A snapshot of many parallel outcomes and one person's long sequence answer different questions. Multiplicative changes can create a striking gap between expected wealth and typical compound growth without that gap alone proving an ergodic theorem.",
    "Specify whether you are averaging wealth levels, percentage changes, or logarithmic growth. Then distinguish a finite simulation from a statement about limiting averages over time.",
    [
      "Two multiplicative changes",
      "Start at 100 and apply a 50% gain followed by a 40% loss.",
      "The arithmetic mean of the two percentage changes is +5%, but the balance becomes 100 × 1.5 × 0.6 = 90.",
      "Compounding depends on products. An average percentage change alone does not describe the wealth path.",
    ],
    [
      "Any difference between the mean and median proves non-ergodicity.",
      "Different summary statistics can disagree in many distributions. Ergodicity requires a specified process, observable, and averaging limit.",
    ],
    [
      "Why distinguish time and ensemble averages?",
      "A policy chosen from the average across possible worlds may not match the experience of one repeated path. The distinction helps identify which outcome the decision-maker actually faces.",
    ],
    "Does the average you are using describe many people at once or one person's experience through time?",
  ),
};
