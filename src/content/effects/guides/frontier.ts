import { guide as g } from "./types";

export const frontierGuides = {
  "stable-matching": g(
    "Stable matching assigns partners so that no unmatched pair would both prefer each other to their current assignments. Deferred acceptance is one way to construct such a matching under specified preference assumptions.",
    "An applicant proposes in preference order. A team keeps its favourite proposal received so far and releases a less-preferred applicant. A rejected applicant never needs to try that team again: the team can only replace its held offer with one it prefers more. The finite proposal process eventually stops.",
    "Choose any enabled applicant button and inspect the tentative assignments. A held offer is not final until everyone is matched. Read the history when an applicant is released. At completion, the blocking-pair count checks the actual rankings; zero does not mean everyone received a first choice.",
    [
      "Three applicants, one place per team",
      "Ari prefers Maple, and Bo also proposes to Maple, which ranks Bo above Ari.",
      "Maple holds Bo's offer and releases Ari, who moves to the next team on Ari's own list.",
      "Continue until all places are held. Check every unmatched applicant-team pair: stability rules out a mutually preferred deviation, not disappointment.",
    ],
    [
      "A stable assignment maximises everybody's happiness.",
      "Stability excludes blocking pairs under the stated preferences. It does not maximise summed satisfaction, guarantee equal outcomes, or resolve a contested definition of fairness.",
    ],
    [
      "Why are the matches tentative?",
      "A team may receive a more-preferred proposal later. Keeping offers tentative allows displaced applicants to continue while the team retains its best proposal so far.",
    ],
    "In an allocation you know, whose preferences are represented—and what would count as a mutually preferred change?",
  ),
  "battle-of-the-sexes": g(
    "The Battle of the Sexes is a coordination game in which both players prefer meeting to splitting up, but disagree about which coordinated outcome is best. It is also described as coordination with conflicting preferences.",
    "Meeting at Music pays you three and the partner two; meeting at Sport reverses those rewards. Going to different venues pays zero. Either shared venue is a pure equilibrium because a unilateral switch would destroy coordination, yet the players rank those equilibria differently.",
    "Change the bot's stated Music probability before choosing a venue. Compare the expected payoff of each choice with a sampled round. Totals accumulate realised tokens; the bot does not infer your intention or learn a convention. At a 50% Music probability, your Music expectation is 1.5 and Sport expectation is one.",
    [
      "Two teams selecting a meeting tool",
      "Both teams want one shared tool, but team A prefers Music and team B prefers Sport in the token example.",
      "A common agreement produces either the 3/2 or the 2/3 payoff, while incompatible choices produce 0/0.",
      "An agreement must solve both coordination and distribution of the advantage. Taking turns or negotiating may help in real repeated settings, but neither is built into this independent bot.",
    ],
    [
      "Both players wanting coordination means their interests are identical.",
      "They share a reason to meet but disagree about which meeting outcome they prefer. Selecting an equilibrium can therefore involve negotiation or a convention.",
    ],
    [
      "Does the best response to this bot identify the game's mixed equilibrium?",
      "No. The probability slider supplies an external partner policy. A mixed equilibrium requires both players' strategies to be mutual best responses, not just one response to a stipulated bot.",
    ],
    "Where does your team agree that coordination matters but disagree about the convention it should follow?",
  ),
  "cournot-competition": g(
    "Cournot competition models firms choosing production quantities while the market price depends on total output. A firm's best quantity depends on the output it expects from rivals.",
    "Adding output sells more units but lowers the common price. With this linear demand and cost of 20, profit is q×(80−q−rival) while price remains above cost. The best response to a fixed rival quantity is half the residual amount, max(0, (80−rival)/2).",
    "Set the rival's fixed quantity, then adjust your own output and submit. Compare profit with the best-response quantity reported by the board. When you increase output too far, more sales can accompany lower or negative profit. The bot's disclosed quantity is a learning aid rather than hidden simultaneous play.",
    [
      "A producer facing a rival's 20 units",
      "The rival produces 20 and you choose 20, giving price 60 and your profit 20×40=800 teaching tokens.",
      "Increase your production to 30: total output becomes 50, price becomes 50, and your profit becomes 30×30=900.",
      "At 40 units your profit returns to 800. The improvement stops because your extra production also lowers the margin on every unit.",
    ],
    [
      "Selling more units always increases profit.",
      "Revenue per unit falls as total output rises here, while each unit still costs 20. Past the best response, the margin reduction outweighs the additional sales.",
    ],
    [
      "What makes the symmetric Cournot benchmark an equilibrium?",
      "At 80/3 units each, each firm's output is the best response to the other's output under the continuous linear model. The challenge holds a rival quantity fixed so you can inspect that reasoning.",
    ],
    "Which quantity decision in your work changes the value or price of the units already being supplied?",
  ),
  "stackelberg-competition": g(
    "Stackelberg competition is a sequential quantity game where a leader commits output before a follower chooses its best response. Credible commitment changes the strategic calculation.",
    "The leader anticipates follower output of max(0, (80−leader)/2). A larger leader commitment partly displaces follower output. Under these demand and cost assumptions, the leader maximises profit at 40 and the follower responds with 20; the order of decisions changes the simultaneous benchmark.",
    "Move the commitment slider and observe the follower's calculated response. Submit to make the commitment explicit. The follower is an optimiser under a known equation, not a simulated person. Compare the displayed profits with the simultaneous Cournot benchmark before concluding that the sequence helped both firms.",
    [
      "Committing forty units before a follower",
      "With unit cost 20 and price 100−total output, the leader commits 40 units.",
      "The follower's best response is (80−40)/2=20, making total output 60 and market price 40.",
      "The leader earns 800 and the follower 400 tokens. The simultaneous benchmark gives about 711.11 to each, so the leader's advantage is accompanied by a lower follower payoff.",
    ],
    [
      "The first mover always wins more in a strategic interaction.",
      "The advantage here depends on a credible quantity commitment, known demand, constant costs, and the follower's response. Other games and reversible announcements can produce different outcomes.",
    ],
    [
      "Why not simply choose the largest possible commitment?",
      "Excess output lowers the price and eventually destroys margin. Anticipating a follower response improves the leader's decision, but it does not remove the demand constraint.",
    ],
    "What makes a commitment in your situation credible rather than an announcement that can easily be reversed?",
  ),
  "bertrand-competition": g(
    "Bertrand competition models firms setting prices, with demand allocation depending on those prices. For identical products in the simplest model, a lower-priced firm can capture the market.",
    "At equal prices the firms split demand. A one-token undercut captures all demand in this teaching game, but cuts the margin per unit. Going below the cost of 20 can generate a loss even while capturing sales. The sharp switch in demand relies on consumers treating the products as interchangeable.",
    "Compare matching the fixed rival price with undercutting by one token and with a much larger cut. Submit each price and track profit rather than only sales. The rival does not retaliate here, so these rounds inspect one-shot responses rather than reproduce a price war or equilibrium convergence.",
    [
      "Matching or undercutting a price of fifty",
      "Both shops post 50. Demand is 50 units, split equally, so your profit is 25×30=750 teaching tokens.",
      "Post 49 against the same fixed rival: demand becomes 51, all served by you, and profit is 51×29=1,479.",
      "A much lower price can reduce profit even with more customers. At 10, selling 90 units loses 900 because the cost remains 20.",
    ],
    [
      "The seller with the most customers must be doing best.",
      "Sales volume ignores the margin and total costs. In this model a below-cost seller wins demand while losing tokens on every unit.",
    ],
    [
      "Why do real firms often charge different prices without losing all sales?",
      "Products can differ in quality, convenience, trust, location, and capacity. Search costs also matter. Those features are intentionally absent from the identical-product model.",
    ],
    "Which feature makes your customers see competing products as different rather than interchangeable?",
  ),
  "war-of-attrition": g(
    "A war of attrition is a contest where persistence costs resources and the participant who outlasts the other receives a prize. The winner's net payoff includes the cost of waiting.",
    "Each extra round can preserve a chance to win, but it also consumes two tokens. The disclosed bot exits at a fixed patience limit. Because that rule is known, you can compare the prize with the total required cost without estimating a hidden opponent's strategy.",
    "Track the cost already paid, your payoff from exiting now, and the net payoff from outlasting the bot. Continuing six rounds costs the entire 12-token prize. Beyond that, winning produces a negative net return. The cost already paid is visible so that local incentives and total returns are not confused.",
    [
      "An eight-round rival in a twelve-token contest",
      "The prize is 12 tokens and the disclosed rival waits until round eight before exiting.",
      "Outlasting it requires eight Continue actions at a cost of two each, making your total cost 16.",
      "You win the prize but finish at 12−16=−4. An immediate exit would yield zero; winning is not by itself a measure of success.",
    ],
    [
      "Persistence pays because the final survivor gets the prize.",
      "Receiving a prize is different from earning a positive net payoff. Waiting costs can exceed its value, even when the rules guarantee eventual victory.",
    ],
    [
      "Is this the full equilibrium model of a war of attrition?",
      "No. A fixed, known cutoff strips away strategic uncertainty so you can inspect costs. The source considers richer timing and evolutionary questions that this board does not solve.",
    ],
    "What exit rule would you choose before entering a contest that charges you for every extra round?",
  ),
  "colonel-blotto": g(
    "Colonel Blotto is a family of allocation games in which players distribute limited resources across several simultaneous contests. Winning a field depends on both allocations, not on effort alone.",
    "Ten tokens spent on one field cannot be spent on another. Since each field is worth one point here, widening an already secure victory earns no extra points. Ties split the point. The allocation that succeeds against one opponent allocation can fail against a different one.",
    "Use minus and plus buttons to redistribute the ten tokens. Submit only after the full budget is allocated, then inspect the revealed bot resources on every field. New round changes the hidden allocation. The bot uses a stated random allocation rule, not an optimal mixed strategy.",
    [
      "Concentrating versus spreading a budget",
      "Against an illustrative rival allocation of 4/3/3, putting 10/0/0 wins only the first field for a score of one.",
      "Changing to 0/5/5 loses the first field but wins both other fields, producing a score of two.",
      "The second allocation is better against that specific rival. A rival choosing 0/5/5 instead would tie it, showing why an example is not a universally winning strategy.",
    ],
    [
      "Winning one field by a huge margin offsets losing the others.",
      "Field value is fixed in this board, so surplus tokens in a won field do not create extra points. Other Blotto variants use unequal values or different contest rules.",
    ],
    [
      "Why hide the opponent's allocation until submission?",
      "Simultaneous allocation would lose its strategic uncertainty if the rival's current choice were visible in advance. Revealing it afterward lets you learn without turning the contest into a known-target puzzle.",
    ],
    "Where are you spending extra resources to widen a win while leaving another important objective unsupported?",
  ),
  "price-of-anarchy": g(
    "The price of anarchy is the ratio between the cost of a worst equilibrium and the lowest feasible system cost, under a specified game and cost measure. It quantifies a possible efficiency loss from individual incentives.",
    "Each infinitesimal driver chooses a route with minimum personal delay. At 60 units on the variable road, both roads take 60 minutes and no driver improves by switching. But minimising total delay also accounts for the delay each extra user imposes on everyone already on that road.",
    "Compare Selfish equilibrium with System optimum, then try intermediate slider allocations. The displayed 1.18 ratio remains the equilibrium-to-optimum comparison; your chosen allocation has its own total cost. At the optimum, some users still prefer a faster route, so individual incentives alone do not maintain it.",
    [
      "Two roads carrying one hundred traffic units",
      "At the equilibrium, 60 use the variable road and 40 use the fixed road. Both take 60 minutes, giving 6,000 unit-minutes in total.",
      "Route 30 to the variable road and 70 to the fixed road: 30×30+70×60=5,100 unit-minutes.",
      "The ratio 6,000/5,100 is about 1.18. The example shows inefficiency in these invented roads, not a universal bound for traffic networks.",
    ],
    [
      "An equilibrium is automatically the best collective outcome.",
      "Equilibrium describes incentives to deviate, while optimality describes a chosen system objective. External congestion costs can separate those two ideas.",
    ],
    [
      "Why would fixed-road users resist the system optimum?",
      "At that allocation their road takes 60 minutes while the variable road takes 30. An individual infinitesimal user benefits by switching, even though many such switches raise the total delay.",
    ],
    "Which individual shortcut in your system imposes a cost on others that its user does not consider?",
  ),
  "complex-contagion": g(
    "Complex contagion is diffusion that requires reinforcement from multiple sources. A behaviour that needs two adopting neighbours can spread differently from information that passes after one exposure.",
    "A single active node can expose neighbours but cannot supply two independent active neighbours by itself. A nearby seed cluster can create the reinforcement needed for further adoption. Network placement therefore matters alongside the number of seeds.",
    "Start with one seed and the two-neighbour rule: this ring stalls. Try adjacent seeds and step the spread. Each step evaluates the previous active set simultaneously, preventing newly adopted nodes from triggering a whole cascade within the same click. Use Edit seeds to reset spread before changing the initial condition.",
    [
      "Trying a collaborative practice with peer reinforcement",
      "One person adopts on a ring where each node connects to two neighbours on each side and requires two active neighbours.",
      "With only that seed, every inactive node has at most one active neighbour, so no new adoption occurs.",
      "Seed two adjacent people instead. Nearby nodes now meet the threshold, and successive synchronous steps can extend the cluster across this particular ring.",
    ],
    [
      "One well-connected individual always makes a behaviour spread.",
      "A connection can convey awareness without supplying the multiple reinforcing contacts a complex contagion requires. Thresholds and network arrangement change what a seed can accomplish.",
    ],
    [
      "Does this model predict how a real community will respond?",
      "No. It assumes identical deterministic thresholds and irreversible adoption. Real people have different incentives, histories, and opportunities; the board isolates reinforcement as one mechanism.",
    ],
    "Which change around you requires encouragement from several peers rather than a single introduction?",
  ),
  "performative-prediction": g(
    "Performative prediction occurs when deploying a prediction changes the outcomes or data distribution the model tries to predict. The model becomes part of the environment instead of only observing it.",
    "A promoted product can receive more demand because it was forecast to be popular. Retraining on that new demand then absorbs the influence of the deployment. With a negative response, an announcement can also discourage the very activity it predicted. Learning and influencing must be distinguished.",
    "Deploy and retrain one cycle at a time. The solid line follows the changing prediction, while the dashed line keeps the original forecast fixed. Frozen-model demand is shown separately because deploying even that unchanged model affects demand. Change the response to restart from the same baseline and compare reinforcement with alternating corrections.",
    [
      "A popularity forecast with an invented response rule",
      "Begin at prediction 20 and response 0.5. Deploying produces demand 20+0.5×20=30.",
      "Retrain to 30, then deploy again: the same response rule produces demand 35.",
      "Further iterations approach 40 in this bounded teaching example. Reaching a stable number does not prove that the original demand forecast was accurate or that the feedback benefits users.",
    ],
    [
      "A forecast cannot affect outcomes because it only describes them.",
      "When forecasts guide allocation, recommendations, or incentives, those actions can change the subsequent outcome. A predictive model can then participate in generating its own training data.",
    ],
    [
      "Does a stable loop establish a desirable deployment?",
      "No. Stability means repeated updating stops changing much under the assumed response. Accuracy, social consequences, incentives, and the objective being optimised are separate questions.",
    ],
    "Which measurement in your work changes because people can see or act on the prediction about it?",
  ),
  "algorithmic-fairness": g(
    "Algorithmic fairness concerns criteria for evaluating how a decision system treats people or groups. Equal selection rates, equal error rates, and equal predictive value are different criteria and can conflict.",
    "A selected set contains true positives and false positives. Its positive predictive value depends both on detection performance and on the outcome frequency in the group. Similar sensitivity does not therefore imply equal predictive value. Choosing a threshold also changes who is selected and who is missed.",
    "Move each synthetic group's threshold and read the exact confusion counts before comparing percentages. The groups have different positive frequencies, not real demographic identities. Undefined predictive value means nobody was selected; it is not a measured zero. The illustration explores threshold tradeoffs and does not prove a calibration impossibility theorem.",
    [
      "Screening two invented applicant groups",
      "Group A has 20 actual positives among 100 cases; group B has 60. Both use the stated positive and negative score ranges.",
      "Apply the same threshold and compare the selected true positives and false positives. The identical rule need not produce identical predictive values.",
      "Change a threshold to improve one measure, then check every other measure and the people represented by the error counts before calling the outcome better.",
    ],
    [
      "One equal percentage proves that a system is fair.",
      "Equality in a particular metric does not resolve other consequences or establish a legal or ethical judgment. The metric's denominator, outcome labels, and context all matter.",
    ],
    [
      "Which fairness measure should I choose?",
      "The board cannot decide that. Consider the decision's purpose, costs of different errors, affected people, and applicable obligations. Make the chosen criterion and its tradeoffs explicit.",
    ],
    "When you call a decision rule fair, which outcome, error, and denominator do you mean?",
  ),
  "differential-privacy": g(
    "Differential privacy limits how much the probability of a released output can change when one person's contribution changes. The guarantee belongs to a specified random mechanism and privacy parameters.",
    "A count with sensitivity one can use Laplace noise of scale 1/epsilon. Smaller epsilon makes the output distributions for neighbouring counts more similar but adds more uncertainty. Releasing more independent answers spends more budget under composition, even if somebody later averages the answers.",
    "Release a count and inspect the latest value, noise scale, and cumulative epsilon. The true count of 40 is synthetic and intentionally public here. Changing epsilon affects future releases only. The mean may move closer to 40 after several releases, but that apparent accuracy has consumed more budget rather than created free information.",
    [
      "Two protected-count releases in a teaching model",
      "A first release uses epsilon 0.5, giving a Laplace scale of two around the synthetic count 40.",
      "Change epsilon to one and release again. The next scale is one, while the cumulative basic-composition budget becomes 1.5.",
      "Compare the two outputs or their mean, remembering that averaging is post-processing of already released information and does not refund either release's privacy cost.",
    ],
    [
      "Adding arbitrary noise automatically makes data private.",
      "The guarantee requires an appropriate sensitivity bound, a correctly calibrated mechanism, suitable randomness, and accounting for all releases. This seeded demonstration is not a production privacy implementation.",
    ],
    [
      "Why can a noisy count be below zero or above the dataset size?",
      "The unbounded Laplace mechanism can produce those outputs. A separately justified clipping step is post-processing; this board leaves values unmodified so you can inspect the noise.",
    ],
    "If you publish several statistics about the same people, where is their combined privacy cost being tracked?",
  ),
  "inattentional-blindness": g(
    "Inattentional blindness is failure to notice a visible but unexpected event while attention is occupied by another task. Presence in the visual field is different from conscious detection.",
    "Tracking a target consumes selective attention. An additional object may be visible yet receive little inspection because it is unrelated to the task. Expectations and similarity to attended objects can matter; this simple card demonstration does not estimate the strength of those effects.",
    "Count blue circles while advancing through eight cards, then report the total. The feedback asks whether you also noticed the star on card four. Review every card afterward. A correct total does not answer the noticing question, and missing either feature does not diagnose a general attention deficit.",
    [
      "A notice beside a busy counting task",
      "A reader focuses on the blue target symbols and remembers a running total as cards change.",
      "An additional star appears on one card without changing the circle-counting rule.",
      "Ask separately about the circle total and the additional object. The demonstration shows why an interface needs an explicit attention check rather than assuming visibility ensures noticing.",
    ],
    [
      "If something is clearly visible, every attentive viewer will notice it.",
      "Attention is selective and directed by a task. A visible object may be missed without being visually hidden, although individual results depend on the scene and prior knowledge.",
    ],
    [
      "What if I read the explanation before playing?",
      "Knowing the additional object changes expectations and the task. That is useful for learning, but your subsequent response cannot be treated as an uninformed replication of the research.",
    ],
    "Which important notice in an interface competes with the task its users are trying to finish?",
  ),
  "change-blindness": g(
    "Change blindness is difficulty detecting a change across successive views of a scene. Interruptions can remove the local transient cue that would otherwise draw attention to the changing location.",
    "When A and B are separated by a blank, the whole view disappears and reappears. The changed tile no longer supplies the only strong local transition. You may need to compare specific locations instead of relying on a broad impression that the scene looks familiar.",
    "Advance A, blank, B, blank with the gap enabled, then try direct A/B alternation. Select the tile you believe changes, or reveal an explicit comparison. Only one numbered tile changes shape; position and shape identify it without requiring colour discrimination. The task is self-paced and provides no clinical score.",
    [
      "Comparing two settings screens",
      "A user sees a twelve-field screen, briefly loses the view, then sees a version with one field changed.",
      "Without a highlighted field, the user may compare several locations before detecting the difference.",
      "Showing the specific old and new values directs attention to the change. In this board, Reveal change provides that explicit before-and-after comparison.",
    ],
    [
      "Missing a change means the viewer stored no information about the scene.",
      "Failure to detect a particular change does not establish complete absence of memory. Comparison, attention, and the cues available across views all influence detection.",
    ],
    [
      "Will the blank gap always make my attempt harder?",
      "Not necessarily. Scene simplicity, strategy, learning, and prior knowledge can dominate an individual trial. Compare the manipulation without turning one attempt into a general psychological conclusion.",
    ],
    "Where would highlighting a changed value communicate more clearly than silently replacing it?",
  ),
  "mere-exposure-effect": g(
    "The mere exposure effect describes an increase in liking that can follow repeated exposure to a stimulus under some conditions, even without an explicit reward or persuasive argument.",
    "Familiarity can make an item feel easier to process or more comfortable. But repetition can also create boredom, and initial attitudes affect the response. A neutral pattern shown more often need not become everybody's favourite. The software therefore records your ratings instead of predicting them.",
    "Rate both patterns before viewing the twelve exposure cards, then rate again. One appears nine times and the other three, with the frequent pattern and order seeded for each round. Compare each pattern with its own earlier rating. The result is your self-report, not evidence of a causal population effect.",
    [
      "Two unfamiliar symbols in a small personal demonstration",
      "Rate A and B independently before any repeated display, rather than assuming they start equally appealing.",
      "Advance through the exposure sequence, then give each symbol a new liking rating without trying to produce an expected answer.",
      "Inspect exposure counts and before-to-after changes. Increased liking is possible, but a decrease or unchanged rating is valid and the unblinded trial cannot establish causation.",
    ],
    [
      "The most familiar option must be the highest-quality option.",
      "Repeated exposure can affect preference without providing evidence of quality, accuracy, or suitability. Familiarity is a possible influence on liking, not a substitute for evaluation.",
    ],
    [
      "Does an unchanged rating mean the research is false?",
      "No. The effect describes findings under particular conditions across studies, not a guaranteed change in every individual. This informal demonstration lacks a control group and cannot test the literature.",
    ],
    "Which familiar option do you prefer—and what evidence besides familiarity supports that preference?",
  ),
};
