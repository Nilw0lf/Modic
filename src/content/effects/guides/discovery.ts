import { guide as g } from "./types";
export const discoveryGuides = {
  "wason-selection": g(
    "The Wason selection task asks which cases must be inspected to test a conditional rule, such as “if a vowel, then an even number.”",
    "A counterexample needs both a vowel and an odd number. A vowel card might hide that odd number; an odd-number card might hide that vowel. An even card cannot contradict the stated rule, whatever letter it hides.",
    "Select A and 7, then check your selection. Notice why the task asks for potential violations rather than examples that merely agree. The reverse rule, “every even number has a vowel,” was never stated.",
    [
      "Auditing an approval policy",
      "A team requires every urgent request to have an approval.",
      "Inspect urgent requests for missing approvals and unapproved requests for urgency.",
      "Ordinary approved requests can confirm compliance without detecting the cases that would break the rule.",
    ],
    [
      "Checking only positive examples proves a rule.",
      "A compatible example does not exclude counterexamples elsewhere. The necessary inspection depends on what could violate the specific rule.",
    ],
    [
      "Why does 7 matter when the rule mentions vowels?",
      "Its unseen side might be a vowel. That would pair the first condition with a violation of the required second condition.",
    ],
    "What would count as a concrete counterexample to a rule you currently trust?",
  ),
  "cognitive-reflection": g(
    "Cognitive reflection is the habit or ability to inspect an intuitive answer before accepting it, especially when that answer conflicts with the problem’s constraints.",
    "The combined price and the price difference are two separate requirements. Calling the spoon 20 gives a mug of 120 and a total of 140, so that appealing answer does not satisfy the total.",
    "Try substituting each proposed answer into both conditions. A spoon of 10 and a mug of 110 meet the total of 120 and difference of 100. Knowing this puzzle already changes what the exercise asks of you.",
    [
      "Checking a purchase estimate",
      "A combined purchase costs 120 and the larger item costs 100 more.",
      "Write x for the smaller item, making the larger x+100.",
      "Solving 2x+100=120 gives x=10; verification catches the shortcut that ignores one constraint.",
    ],
    [
      "A wrong first answer reveals low intelligence.",
      "One brief arithmetic item is affected by experience and interpretation and cannot establish general ability.",
    ],
    [
      "Must good thinking always be slow?",
      "No. Reflection is useful when a quick answer deserves checking; many practiced responses are accurate and efficient.",
    ],
    "Which familiar estimate would benefit from a quick substitution or boundary check?",
  ),
  "newcomb-problem": g(
    "Newcomb’s problem is a choice between a sealed predicted prize and that prize plus a visible smaller reward, used to examine competing principles of decision.",
    "Conditional reasoning asks what contents tend to accompany each choice under the prediction rule. Causal reasoning asks what taking an additional box changes when those contents have already been fixed. The comparisons need not give the same recommendation.",
    "Change the stipulated accuracy and compare the conditional means. A sampled outcome illustrates that model only. Also read the fixed-contents comparison: adding the open box always adds ten to whatever is already there.",
    [
      "A 90% accurate stipulated predictor",
      "With one-box predictions rewarded by 1,000, taking one box has conditional mean 900.",
      "Taking both has conditional mean 100+10=110 under the same predictive convention.",
      "Holding the sealed contents fixed instead makes the second box add ten; distinguish these questions before interpreting the choice.",
    ],
    [
      "The game proves that a present choice changes the past.",
      "The conditional prediction model does not imply backward causation and cannot settle the philosophical dispute.",
    ],
    [
      "Why are two expected comparisons shown?",
      "They make their assumptions explicit: predictive association is different from a causal intervention holding prior events fixed.",
    ],
    "Are you using a prediction to describe outcomes, or a causal claim to decide what changing an action does?",
  ),
  "dollar-auction": g(
    "The dollar auction is a contest where both the highest bidder and the runner-up pay their final bids, while only the highest bidder receives the prize.",
    "A runner-up may compare a certain existing loss with the chance to regain the lead. That local comparison can encourage another bid even after the winning bid would exceed the prize. The payment rule creates the trap.",
    "Track your standing bid after the bot responds. Stopping costs that bid; winning costs the final winning bid minus the prize. The bot’s disclosed cutoff lets you inspect a finite escalation without guessing its intentions.",
    [
      "Following a bid past the prize",
      "The prize is 20. After your bid of 19, the bot bids 20.",
      "You could stop and pay 19, or bid 21; the bot is programmed to continue up to 26.",
      "Eventually bidding 27 wins the prize but nets minus seven, showing why winning a contest need not create a positive return.",
    ],
    [
      "Winning means the strategy was profitable.",
      "Net return includes what the winner paid. A prize can be smaller than its acquisition cost.",
    ],
    [
      "Is the bot strategically intelligent?",
      "No. Its fixed cutoff is visible so you can study the payment incentives without treating the outcome as human behavior.",
    ],
    "Before entering a contest, what exit rule would limit exposure to escalation?",
  ),
  "travelers-dilemma": g(
    "The traveler’s dilemma rewards the lower of two claims and penalizes the higher, creating an incentive to undercut a matching claim.",
    "A small reduction can earn the bonus while lowering the common base payment. Repeating that argument through successively lower claims can point toward low claims, despite much larger joint payments being available at high matching claims.",
    "The partner always claims 18 here. Submit several claims and compare both payments. Adjusting the bonus changes the incentive; it does not turn the fixed bot into an empirical model of people.",
    [
      "A one-token undercut",
      "Two claims of 18 with bonus two pay each traveler 18.",
      "A claim of 17 against 18 pays the lower claimant 19 and the higher claimant 15.",
      "The undercut improves one payment while lowering their combined total from 36 to 34.",
    ],
    [
      "Lower claims always improve the outcome.",
      "They may improve one player’s relative payoff in a particular matchup while reducing total returns or that player’s own absolute payment.",
    ],
    [
      "Why is the partner’s claim disclosed?",
      "It isolates how the payment rule works before adding uncertainty about another player’s choice.",
    ],
    "Which incentive intended to reveal honesty might instead reward strategic undercutting?",
  ),
  nim: g(
    "Nim is a two-player game of removing objects from piles, with a complete strategy for the normal rule in which taking the last object wins.",
    "A move changes only one pile. The bitwise XOR of pile sizes identifies balanced positions: from a nonzero nim-sum, a legal move can make it zero, while any legal move from zero makes it nonzero.",
    "Watch the remaining pile sizes after the bot responds. It makes the nim-sum zero whenever possible. Try a different opening after Reset and compare the positions you leave, rather than only how many stones you take.",
    [
      "A winning opening",
      "Piles 3, 4 and 5 have nim-sum 3 XOR 4 XOR 5 = 2.",
      "Removing two from the first pile leaves 1, 4 and 5, whose XOR is zero.",
      "Against perfect replies, preserving that balanced position after your moves gives a route to taking the last stone.",
    ],
    [
      "Taking the largest number of stones is always best.",
      "The structure of the remaining piles matters. A smaller removal can leave the opponent a losing position.",
    ],
    [
      "Does this strategy also apply when taking the last stone loses?",
      "Not unchanged. That misère variant needs different treatment near the end of the game.",
    ],
    "Can you identify a move that improves your future position without maximizing the immediate gain?",
  ),
  "penneys-game": g(
    "Penney’s game races coin-flip patterns until one appears first; the competition is nontransitive because overlap gives different patterns advantages against different rivals.",
    "Every particular three-flip block has probability one eighth under a fair coin. But the game uses overlapping blocks in one continuous stream, so partial matches and interruptions affect the first-arrival race.",
    "Choose a pattern, inspect the opponent’s counter-pattern and race several times. The outcome records the actual generated sequence. Wins in a handful of races need not reflect the exact long-run advantage.",
    [
      "The HHH versus THH race",
      "You select HHH and the opponent selects THH.",
      "If the first three flips are HHH you win immediately; after any tails, two subsequent heads complete THH before HHH.",
      "The opponent’s advantage comes from the overlap structure, despite equal isolated three-flip probabilities.",
    ],
    [
      "Equal pattern frequencies mean an even race.",
      "First arrival in overlapping sequences is a different event from appearing in one isolated block.",
    ],
    [
      "Does the counter-pattern guarantee a win?",
      "No. It gives a probability advantage under fair independent flips, not certainty in an individual race.",
    ],
    "Where are you comparing event frequencies when the actual question concerns order or first arrival?",
  ),
  "nontransitive-dice": g(
    "Nontransitive dice form a cycle of pairwise winning probabilities, so no single die is favored against all of the others.",
    "A die’s average face value does not specify how often it exceeds another die’s roll. Counting all face pairings makes the opponent-dependent comparison explicit and can reveal a cycle.",
    "Inspect the six equally likely faces of each die and roll repeatedly. The counter-die is deliberately chosen against your selection. The displayed exact chance comes from all 36 pairings, while your win count is a finite sample.",
    [
      "A cycle without a best die",
      "A beats B in 20 of 36 pairs; B beats C in 20; C beats A in 20.",
      "After choosing A, the opponent chooses C, leaving your chance at 16 of 36.",
      "Changing to another die changes the opponent too, so there is no universally favored first choice.",
    ],
    [
      "The highest average face must win most often.",
      "Winning probability counts comparisons, whereas the mean also weights the size of unusually high faces.",
    ],
    [
      "Are these ordinary dice?",
      "No. Their repeated face values were constructed to illustrate a nontransitive comparison.",
    ],
    "Does a ranking you use remain valid when the comparison partner changes?",
  ),
  "ikea-effect": g(
    "The IKEA effect describes increased subjective valuation associated with successfully making an object, rather than merely receiving it ready-made.",
    "Participation can attach personal meaning or ownership to a result. That preference is not necessarily irrational, but it should be distinguished from evidence that the object performs better.",
    "Complete the three tiles and rate the result before viewing the identical ready-made version. The activity records your rating; it does not manufacture a comparison score or claim to reproduce a laboratory effect.",
    [
      "Comparing an internal tool",
      "A team has spent a month making a dashboard and prefers it to a purchased one.",
      "Compare task completion with names and origins hidden, while separately asking about customization and attachment.",
      "A preference for the built tool may reflect real utility, personal investment, or both; separate those reasons before choosing.",
    ],
    [
      "Enjoying something you made is always a mistake.",
      "Personal meaning can be a legitimate benefit. The problem is confusing attachment with independent performance evidence.",
    ],
    [
      "Why require completing the picture?",
      "The source research distinguishes successful creation from effort alone. This small activity illustrates completion without measuring that distinction experimentally.",
    ],
    "Would you choose the same design if you did not know who built it?",
  ),
  "barnum-effect": g(
    "The Barnum effect, also called the Forer effect, is the apparent personal fit of descriptions that are broad enough to apply to many people.",
    "Flexible statements permit readers to find confirming examples in their own lives. A flattering or balanced description may feel insightful while lacking information that distinguishes one person from another.",
    "Rate the description, then reveal that everyone sees exactly the same text. A high rating may indicate that the description fits, but cannot show that it was personalized or that its source knows you.",
    [
      "Evaluating a personality reading",
      "A report says someone enjoys company but also needs independence.",
      "The reader finds examples of both tendencies and judges the statement accurate.",
      "Ask whether the same wording fits many others and what observation would count against the report.",
    ],
    [
      "An accurate-sounding description must come from personal insight.",
      "General statements can be compatible with your experience without distinguishing you from other readers.",
    ],
    [
      "Did the game analyze any personal information?",
      "No. Its fixed description and local rating demonstrate the distinction between fit and personalization.",
    ],
    "What specific prediction would make a description more informative than a statement given to everyone?",
  ),
  "illusion-of-control": g(
    "The illusion of control is perceived influence over outcomes whose chance mechanism is not changed by the action in question.",
    "Choosing, participating or using familiar skill cues can feel causally relevant even when the generator ignores those inputs. Actual control requires a mechanism linking the action to the probability of the outcome.",
    "Change the launch pad and predict several coins. The pad never enters the calculation, while the fair outcome sequence does. A run of matches can occur by chance and does not establish influence.",
    [
      "A choice without changed odds",
      "A raffle draws uniformly from a fixed set of tickets.",
      "Choosing your own ticket can increase a feeling of involvement.",
      "If the draw remains uniform and the tickets equivalent, that choice does not improve the ticket’s chance.",
    ],
    [
      "A winning streak proves the chosen button works.",
      "Chance can produce streaks. Evidence for control must compare the mechanism and suitably measured outcomes.",
    ],
    [
      "Why let me choose a pad at all?",
      "It separates an engaging choice from a causally relevant one. The distinction is disclosed rather than concealed.",
    ],
    "Which choices give you agency, and which actually alter the probability you care about?",
  ),
  "recognition-heuristic": g(
    "The recognition heuristic uses recognition of one option and lack of recognition of another as a cue to infer a criterion such as size.",
    "Recognition can be useful when the environment makes larger or more relevant objects more likely to be encountered. It can fail when familiarity comes from unrelated exposure, promotion or an unrepresentative sample.",
    "Choose between the fictional shop names, then reveal their invented sales and choose again. This example intentionally breaks the familiar-name cue; it does not show that recognition is always ineffective.",
    [
      "A name cue that misses the criterion",
      "Familiar Market has invented sales of 40 while Qev Shop has 70.",
      "A familiar name may initially suggest the larger shop.",
      "Once the sales criterion is disclosed, use that evidence rather than treating name familiarity as decisive.",
    ],
    [
      "A shortcut is either always smart or always foolish.",
      "Its accuracy depends on whether its cue relates to the criterion in the relevant environment.",
    ],
    [
      "Is this measuring my recognition memory?",
      "No. It uses suggestive fictional names to illustrate cue validity, with no population inference from your answer.",
    ],
    "What makes recognition informative in the environment where you rely on it?",
  ),
  "serial-position-effect": g(
    "The serial position effect is variation in recall with an item’s position in a sequence, often including advantages for early and late items under particular conditions.",
    "Early items may receive more rehearsal, while recent items can remain especially accessible at immediate recall. Presentation speed, distraction, delay and task instructions change the observed pattern.",
    "Advance through the list once, hide it and enter remembered words. The result labels each actual position as recalled or missed. It does not impose a U-shaped curve on your answers.",
    [
      "Reviewing a short instruction list",
      "A speaker gives eight unfamiliar steps without a written reference.",
      "A listener recalls some early and late steps but misses several middle steps.",
      "A checklist can support the whole sequence; one observed recall pattern is insufficient to establish a general layout rule.",
    ],
    [
      "The first and last items are always remembered.",
      "Position-related advantages are tendencies under specific conditions, not guaranteed outcomes for every person or list.",
    ],
    [
      "Why are presentation times not prescribed?",
      "Self-paced reading makes the activity accessible, but also limits comparison with controlled serial-position studies.",
    ],
    "What support would help someone remember every step rather than relying on its position?",
  ),
  "testing-effect": g(
    "The testing effect, or retrieval-practice effect, is improved later retention from attempting to retrieve learned material under suitable conditions.",
    "Retrieval gives practice accessing information and reveals gaps that rereading can hide. Corrective feedback helps avoid leaving an unsuccessful or mistaken retrieval unaddressed.",
    "Study the three pairs, hide them and attempt their partners before checking. Your score reports immediate retrieval only. To explore lasting learning, practice again after a meaningful delay rather than interpreting one score as retention evidence.",
    [
      "Studying an unfamiliar term",
      "Read a term and its meaning, then close the notes.",
      "Try explaining the meaning from memory before comparing with the original.",
      "Use feedback to repair omissions and revisit later; immediate fluency alone does not establish durable recall.",
    ],
    [
      "A practice score immediately proves long-term learning.",
      "Delayed retention is a different outcome. A brief activity demonstrates a study method without measuring a long-term advantage.",
    ],
    [
      "Does retrieval replace all study?",
      "No. Initial learning and feedback remain important, especially when the learner cannot yet retrieve the material accurately.",
    ],
    "Which part of your study routine asks you to produce an answer before seeing it?",
  ),
  "affect-heuristic": g(
    "The affect heuristic uses an overall positive or negative feeling as a shortcut when assessing an option’s risks or benefits.",
    "An appealing impression can make benefits easier to notice and costs less salient. Those feelings may be relevant to preferences, but a stated numerical criterion still requires evidence about outcomes.",
    "Make an initial choice from names, reveal the invented benefit and cost figures, then choose again. The feedback records both choices and identifies the higher net benefit without diagnosing your judgment.",
    [
      "A project with an inviting name",
      "Bright Horizon offers benefit 20 at cost 8; Storm Plan offers 25 at cost 7.",
      "Their invented net benefits are 12 and 18 respectively.",
      "If maximizing net benefit is the criterion, the less inviting name should not outweigh the relevant outcome comparison.",
    ],
    [
      "Emotions have no place in decisions.",
      "Feelings can represent important preferences. The useful distinction is between a preference and an unsupported inference about risk or benefit.",
    ],
    [
      "Does changing my choice prove an affect bias?",
      "No. The initial stage deliberately withholds evidence, so revising a choice can simply reflect learning new information.",
    ],
    "Are you evaluating an option’s measured properties or your reaction to how it is described?",
  ),
  "scope-insensitivity": g(
    "Scope insensitivity is weak responsiveness in valuation to the scale of a benefit or harm, relative to the comparison or decision criterion being considered.",
    "A concrete story can dominate an abstract count. But limited scales and values beyond total outcomes also matter: a five-point rating cannot represent an unrestricted proportional willingness to pay.",
    "Rate both projects and compare the responses. Cost and success are stipulated equal, while outcomes rise from ten to one hundred. Interpret the bounded rating cautiously and state the criterion you want an actual allocation to follow.",
    [
      "Comparing equally costly projects",
      "One invented rescue saves ten birds; another saves one hundred with the same certainty and cost.",
      "Under a criterion of maximizing birds saved, the second supplies ten times the outcome.",
      "Other legitimate considerations would need to be specified; an emotional response alone does not state the allocation rule.",
    ],
    [
      "Every ethical valuation must rise exactly with the count.",
      "Values can include urgency, distribution and duties. Also, a bounded rating cannot express tenfold value.",
    ],
    [
      "What does this activity measure?",
      "Only your two local ratings. It illustrates the comparison while avoiding a claim about moral correctness or a diagnosed bias.",
    ],
    "Which outcome count belongs in your decision, and which other values need to be stated explicitly?",
  ),
  "st-petersburg-paradox": g(
    "The St. Petersburg paradox concerns a lottery with infinite expected monetary payoff in its ideal unbounded form, despite finite willingness to pay to enter.",
    "As the prize doubles, its probability halves, leaving a constant contribution from each possible stopping time. Infinitely many such contributions make the unbounded expectation diverge; a cap changes the game and makes the expectation finite.",
    "Compare exact capped expectation with the mean and median of 200 samples. Raising the cap changes rare prizes much more than typical results. Resample to see why one batch can give a misleading sense of the average.",
    [
      "An eight-flip cap",
      "First heads pays 2, 4, 8 and so on, with a maximum of 256.",
      "First-head outcomes on flips one through seven contribute seven units to expectation; the combined capped tail contributes two.",
      "The exact mean is nine, while a small sample can miss the rare large payouts and have a different mean.",
    ],
    [
      "Infinite expected value guarantees an enormous payment.",
      "Expectation weights possible outcomes; it is not a guaranteed or typical payout. A real finite cap also removes the infinite expectation.",
    ],
    [
      "Why does the final tail contribute two?",
      "The probability of no heads in the first seven flips is 1/128, and all such histories pay 256 under the stipulated cap rule.",
    ],
    "Does an average hide outcomes that are too rare for your experience or resources to absorb?",
  ),
  "hawk-dove": g(
    "The hawk–dove game models escalation and yielding when the value of a resource competes with the cost of fighting.",
    "An escalating strategy gains against a yielding opponent but may lose value in fights with other escalators. Its expected payoff therefore changes with the opponent mix, rather than being an inherent property of aggression.",
    "Move the hawk share and compare the two payoff curves at the selected mix. A higher fighting cost shifts their crossing. The display is an expected-payoff comparison, not a time evolution of the population.",
    [
      "Equal payoffs at half hawks",
      "Resource value ten and fighting cost twenty give hawk–hawk payoff minus five.",
      "At a 50% hawk mix, hawk payoff is 0.5×(-5)+0.5×10=2.5; dove payoff is 0.5×0+0.5×5=2.5.",
      "The equal-payoff fraction is value divided by cost in this model; it does not imply every real population must have that composition.",
    ],
    [
      "One strategy is always more successful.",
      "Success depends on both the payoff structure and how often each opponent strategy is encountered.",
    ],
    [
      "Does the chart predict evolutionary change?",
      "No. That would require explicit reproduction or adaptation dynamics in addition to these payoff comparisons.",
    ],
    "How does widespread adoption of a competitive strategy change the incentive that made it attractive?",
  ),
  "condorcet-cycle": g(
    "The Condorcet voting paradox occurs when pairwise majority preferences cycle even though each voter has a consistent ranking.",
    "Different pairs can be decided by different coalitions. Adding majority comparisons does not preserve the transitivity of the individual rankings, so a candidate who defeats every rival need not exist.",
    "At three voters in each group, compare all three vote counts. Increase the first group and notice when the cycle disappears. The bars show votes for the named side, not vote shares from three independent elections.",
    [
      "A committee with three ranking groups",
      "Three prefer A>B>C, three B>C>A and three C>A>B.",
      "Six prefer A to B, six prefer B to C, and six prefer C to A.",
      "Each majority is valid, but their cycle prevents a single candidate from beating both rivals.",
    ],
    [
      "A cycling majority means individual voters contradict themselves.",
      "Every individual ranking can remain consistent. The inconsistency arises in the aggregated pairwise relation.",
    ],
    [
      "Why might agenda order matter?",
      "A sequential pairwise process can eliminate an option before its favorable matchup occurs; a cycle makes the order consequential.",
    ],
    "Does your group decision rule specify what happens when no option defeats every other one?",
  ),
  "alabama-paradox": g(
    "The Alabama paradox is a loss of allocation for a group when the total number of seats rises under Hamilton’s largest-remainder method, with populations unchanged.",
    "Each larger house size changes fractional quotas. The ranking of their remainders can change, moving the final whole seats between groups even while every underlying quota increases.",
    "Compare four and five total seats for the fixed populations. Inspect both quotas and actual allocations. The smallest group’s quota increases while its allocated seat disappears, separating proportional amounts from indivisible assignments.",
    [
      "Four seats become five",
      "Populations 5, 3 and 1 yield four-seat quotas about 2.22, 1.33 and 0.44, allocating 2, 1 and 1.",
      "At five seats, quotas are about 2.78, 1.67 and 0.56; the two remainder seats go to A and B, allocating 3, 2 and 0.",
      "Group C’s proportional quota rises but its whole-seat allocation falls, illustrating the Alabama paradox with unchanged populations.",
    ],
    [
      "Proportional quotas guarantee every group’s allocation rises.",
      "Quotas are fractions; a rounding rule can distribute indivisible seats differently. House-size monotonicity is a separate property.",
    ],
    [
      "Does the paradox happen at every increase?",
      "No. It requires particular population shares and house sizes; the experiment should display a verified transition.",
    ],
    "What monotonicity or fairness property does your allocation method need to preserve?",
  ),
  "gini-coefficient": g(
    "The Gini coefficient measures relative inequality in a distribution using pairwise differences or the gap between its Lorenz curve and equal shares.",
    "Scaling everyone’s holdings by the same positive factor leaves relative inequality unchanged. Moving a fixed total toward one holder increases pairwise differences, but does not by itself say whether anyone has enough.",
    "Shift the top holder’s share and inspect both Gini and the Lorenz curve. The total remains one hundred. For five holders, this uncorrected population calculation reaches 0.8 when one person owns everything.",
    [
      "A fixed pool with unequal shares",
      "With a top share of sixty, the other four each receive ten.",
      "The Lorenz curve accumulates the lowest holdings first: forty tokens are held by the bottom 80% of people.",
      "The population Gini is 0.4; doubling every holding would preserve it while changing average resources.",
    ],
    [
      "Gini is a complete measure of fairness or poverty.",
      "It describes relative distribution, not needs, living standards, opportunities or the justice of a particular allocation.",
    ],
    [
      "Why does the maximum here stop below one?",
      "In a finite five-person population, the uncorrected pairwise formula’s maximum is (5−1)/5. Other conventions can apply finite-sample adjustments.",
    ],
    "Which facts about a distribution would you need in addition to its inequality index?",
  ),
  "polya-urn": g(
    "A Pólya urn is a reinforced drawing process in which selecting a color changes the probability of selecting it again.",
    "Replacement preserves the original ball and added matching balls increase that color’s share. An early random difference becomes part of the next probability, making otherwise identical initial systems follow different histories.",
    "Compare the three histories starting from one blue and one orange. Increase reinforcement or the number of draws and resample. Separation is possible without a predetermined winner or a guaranteed complete monopoly.",
    [
      "An early blue draw",
      "Start with one ball of each color and add one matching ball after a draw.",
      "A first blue draw leaves two blue and one orange, raising the next blue probability from one half to two thirds.",
      "A subsequent orange draw can narrow the difference; reinforcement changes probabilities, not the certainty of the next event.",
    ],
    [
      "An early lead guarantees permanent domination.",
      "Reinforcement can preserve and amplify differences, but outcomes remain random and the model does not impose a complete takeover.",
    ],
    [
      "How is this different from independent coin flips?",
      "A fair coin retains the same chance after each flip; the urn’s composition explicitly changes after every draw.",
    ],
    "What feedback in your system rewards an existing lead, and what keeps new alternatives viable?",
  ),
  "galton-board": g(
    "A Galton board builds a binomial distribution by accumulating independent left–right choices across successive rows of pegs.",
    "Many paths can reach a central bin, while far fewer paths reach an extreme. Counting those paths produces the exact binomial probabilities; with more rows its standardized shape approaches a normal distribution.",
    "Drop two hundred balls and compare observed bins with exact expected counts. Resample to distinguish the distribution’s shape from one finite batch. The simulation counts right turns rather than modeling physical collisions.",
    [
      "Eight rows of choices",
      "Every path has eight independent fair steps, so there are 256 equally likely paths.",
      "Seventy paths contain exactly four right turns, giving central probability 70/256.",
      "Two hundred balls therefore have expected central count about 54.69, but an observed count can be above or below that number.",
    ],
    [
      "The exact expected count must be a whole observed count.",
      "Expectation averages over possible batches and can be fractional; a particular batch contains an integer number of balls.",
    ],
    [
      "Does every collection of small influences produce a bell curve?",
      "No. Independence, distributional conditions and scaling matter; heavy tails or dependence can change the result.",
    ],
    "Are your observed totals built from independent contributions, or do those contributions share a cause?",
  ),
  percolation: g(
    "Percolation studies connected paths in randomly open structures, including whether local open sites form a crossing through a larger system.",
    "An open fraction is only part of the story. Sites must connect in the permitted directions, and a closed barrier can block passage even when many other sites are open.",
    "Increase the opening probability while keeping the same seeded board. Blue tiles are connected to the top; rose tiles are open but unreachable. Resample to compare arrangements with the same opening chance.",
    [
      "A porous crossing",
      "Some tiles in a ten-by-ten board are open, but none connect the top to the bottom.",
      "Opening one tile that joins two previously separate regions can complete a crossing.",
      "A small local change may create global connectivity; the important tile depends on the surrounding arrangement.",
    ],
    [
      "The same open percentage guarantees the same connectivity.",
      "Different arrangements can have different paths and barriers. This small board cannot establish an infinite-grid threshold.",
    ],
    [
      "Why do diagonal contacts not count?",
      "The model defines connectivity through shared edges. Changing that rule changes the paths and the relevant percolation problem.",
    ],
    "Which local connection would turn separate parts of your system into a functioning route?",
  ),
  diffusion: g(
    "Diffusion is the spreading of a concentration through local random motion or equivalent concentration-gradient transport.",
    "More material leaves a highly concentrated cell than arrives from a dilute neighbor. The net result smooths differences even though the underlying movement need not aim toward emptier locations.",
    "Advance the mixing steps and watch the central concentration fall while neighboring concentrations rise. The total remains one hundred because the row is closed; no dye is allowed to escape its boundaries.",
    [
      "One step from a concentrated center",
      "A single central cell starts with one hundred units.",
      "One step retains sixty centrally and moves twenty to each adjacent cell.",
      "The distribution changes but the total remains one hundred, separating spreading from loss of material.",
    ],
    [
      "A falling local concentration means material disappeared.",
      "Material can move elsewhere. Distinguish local concentration from the total across the system and any flow through its boundaries.",
    ],
    [
      "Why does the boundary retain some dye?",
      "The closed-row rule keeps the outward share inside, ensuring conservation rather than simulating an absorbing boundary.",
    ],
    "When a quantity falls in one location, where could it have moved?",
  ),
  "cobweb-model": g(
    "The cobweb model describes price oscillations created when supply responds to an earlier price while demand responds to the current market.",
    "A high past price encourages supply; that larger supply can lower the next price, which then reduces later supply. Whether this alternation shrinks or grows depends on the relative response strengths.",
    "Change the response ratio around one. Below one the deviation shrinks, at one it repeats, and above one it grows. The chart measures deviation from equilibrium, so a negative value means below balance rather than a negative selling price.",
    [
      "A damped response",
      "Start one unit above equilibrium with response ratio 0.7.",
      "The next deviations are −0.7, +0.49 and −0.343.",
      "Alternating signs show overshoot, while decreasing magnitudes show convergence under the stipulated linear response.",
    ],
    [
      "Oscillation always indicates an unstable system.",
      "An oscillating system can converge if the deviations shrink. Distinguish direction changes from increasing amplitude.",
    ],
    [
      "What makes the delay important?",
      "Production follows the previous signal, so the supply decision can be out of step with the market it later enters.",
    ],
    "Which decisions in your system respond to information that may already be out of date?",
  ),
  "series-parallel-reliability": g(
    "Series and parallel reliability distinguish a system requiring every component to work from a system requiring at least one functioning path.",
    "Under independence, multiplying success probabilities gives the all-working series probability. Multiplying failure probabilities gives the all-failed parallel probability, whose complement is system success.",
    "Compare identical components at the same reliability and period. Adding components hurts the required chain but helps the independent fallback arrangement. Read the independence caveat before applying that comparison to real backups.",
    [
      "Three components at 90% reliability",
      "A series chain works with probability 0.9³=0.729.",
      "A parallel arrangement fails only if all three fail: 0.1³=0.001.",
      "Its success probability is 0.999, provided the three failures are genuinely independent and any working component is sufficient.",
    ],
    [
      "Three copies guarantee independent protection.",
      "Copies may share power, location, configuration or upstream services. A common cause can defeat all of them together.",
    ],
    [
      "Are these probabilities lifetimes?",
      "No. They describe working over the same specified period, with no repair or switching failures modeled.",
    ],
    "What shared cause could disable your apparently separate backups?",
  ),
  "small-world-shortcuts": g(
    "Small-world shortcuts illustrate how a few long-range links can reduce network distances while many local connections remain.",
    "A local ring makes distant nodes require several hops. A bridge skips part of that ring, creating shorter routes for multiple pairs without removing their original options.",
    "Compare average shortest path and the opposite-node route as you add links. The blue added edges are bridges. This teaching model adds edges; it does not reproduce the original fixed-edge rewiring procedure.",
    [
      "A route across a ring",
      "Twenty nodes each connect to their two nearest neighbors on either side.",
      "Moving from node one to node eleven requires five hops in the original ring.",
      "A suitable long-range link can shorten that journey and other paths; the added link’s endpoints determine which routes benefit.",
    ],
    [
      "More connections make every person equally central.",
      "A new bridge changes some routes more than others. Short distances and equal centrality are separate properties.",
    ],
    [
      "Can an added link increase shortest-path distance here?",
      "No. All previous edges remain, so every old route is still available; the shortest permitted route cannot become longer.",
    ],
    "Which bridge between communities would reduce unnecessary intermediaries?",
  ),
  "bayesian-updating": g(
    "Bayesian updating revises the probability of a hypothesis using the likelihood of observed evidence under that hypothesis and its alternatives.",
    "Evidence is informative through a comparison: blue is more likely in urn A than in urn B. Multiplying prior odds by that likelihood ratio produces posterior odds, which become the starting odds for the next independent observation.",
    "Advance the number of draws and inspect the observed color sequence. Blue favors A and orange favors B. Changing the prior can change both the sampled hidden urn and the update, so compare runs with the stated settings in mind.",
    [
      "A blue draw followed by orange",
      "Starting odds for A are one to one. A blue draw multiplies them by 7/3, making probability 70%.",
      "An orange draw multiplies those odds by 3/7, bringing them back to one to one.",
      "The evidence balances under these particular known likelihoods; repeated or dependent evidence would require a different model.",
    ],
    [
      "A posterior probability proves a hypothesis true.",
      "It expresses uncertainty under the prior and likelihood assumptions. Changing those assumptions can change the result.",
    ],
    [
      "Why draw with replacement?",
      "It keeps each urn’s composition fixed and makes the repeated observations conditionally independent given the hidden urn.",
    ],
    "What assumptions make a new observation genuinely additional evidence?",
  ),
  hysteresis: g(
    "Hysteresis is dependence of a system’s current response on its input history, so the same present input can correspond to different states.",
    "Separate turn-on and turn-off thresholds create a memory band. Inside that band the input is insufficient to determine the state without knowing whether the system previously crossed one of the boundaries.",
    "Move the signal above sixty and then to fifty; the switch stays on. Move it below forty and back to fifty; it stays off. Compare the single-threshold switch, which changes solely at fifty.",
    [
      "Two histories at the same input",
      "Starting off, a signal rises from thirty to seventy and turns the switch on.",
      "Returning to fifty leaves it on; falling to thirty turns it off, and returning to fifty leaves it off.",
      "The identical final signal produces different states because the paths crossed different switching thresholds.",
    ],
    [
      "The same input must always produce the same output.",
      "That is true only when the response has no relevant hidden state or history. Hysteresis explicitly retains such a state.",
    ],
    [
      "How can this help with noise?",
      "Small fluctuations within the band do not repeatedly toggle the memory switch, unlike fluctuations around a single threshold.",
    ],
    "Where would retaining a previous state be more useful than reacting to every small fluctuation?",
  ),
};
