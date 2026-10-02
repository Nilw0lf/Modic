import { guide as g } from "./types";
export const simpleGuides = {
  "stroop-effect": g(
    "The Stroop effect is interference between reading a word and naming its ink color, especially when the word and color disagree.",
    "A well-practiced response can compete with the response a task requires. Reading the word is useful in most situations, but here the relevant cue is its ink. Resolving conflicting cues can take time and produce errors.",
    "Name the ink on each trial. Compare the matching and conflicting averages after all eight responses, including errors. Either average can be larger in a small round; practice and device effects prevent a laboratory interpretation.",
    [
      "Conflicting cues on a dashboard",
      "A status indicator says READY but uses a color that the team usually associates with an error.",
      "The user must decide which cue to trust instead of immediately recognizing a consistent signal.",
      "Align text and color meanings, and keep a textual status available for people who cannot distinguish the colors.",
    ],
    [
      "A slower conflicting response proves poor attention.",
      "Many factors affect a browser response, and this task deliberately introduces competing cues. A short round cannot diagnose attention.",
    ],
    [
      "Why does the game ask for the ink instead of the word?",
      "That instruction makes the competing response visible. If you simply read the word, the task would not ask you to suppress the more familiar interpretation in the same way.",
    ],
    "Where does your interface ask someone to resolve two cues that disagree?",
  ),
  "fitts-law": g(
    "Fitts's Law relates pointing movement time to the distance to a target and its width: farther or narrower targets generally require more precise movement.",
    "The pointer must cover distance while landing inside an acceptable region. A larger target tolerates a wider range of endpoints. The difficulty index captures the ratio between distance and width; actual time requires coefficients fitted to a particular task and device.",
    "Start from the same button and hit the target several times. Compare size and distance separately. The difficulty index is not a predicted number of milliseconds, and keyboard selection does not measure pointing distance.",
    [
      "A frequently used control",
      "An editor's tiny confirmation button sits far from the area where a user is working.",
      "A wider control closer to the relevant interaction reduces its pointing difficulty under comparable conditions.",
      "The improvement concerns reaching the control, not whether the action is understandable or correct.",
    ],
    [
      "The largest possible button always creates the best interface.",
      "Targeting effort is only one design concern. Hierarchy, accidental activation, screen space and accessibility also matter.",
    ],
    [
      "Why is target width relative to distance important?",
      "Doubling both produces the same ratio in this difficulty formula. Changing one without the other changes how precise the movement must be relative to its travel.",
    ],
    "Which frequent action asks for unnecessary travel or precision?",
  ),
  "hicks-law": g(
    "The Hick–Hyman law, often called Hick's Law, relates choice response time to the uncertainty among possible responses under specified conditions.",
    "When several outcomes can require different actions, the user must determine which response applies. Equally likely alternatives carry more uncertainty as their number grows. A familiar organization can also reduce search and interpretation demands, which are not captured by counting choices alone.",
    "Start a search and select the named item. Try multiple rounds before comparing menu sizes. The displayed bits describe theoretical uncertainty; your time includes reading and visual search, so this is not a fitted laboratory response-time curve.",
    [
      "Finding an action in a menu",
      "A screen offers twelve unfamiliar actions with similar labels.",
      "Grouping related actions and improving their names may help a user identify the relevant one without simply deleting choices.",
      "Evaluate the actual task: fewer visible choices may shift effort into hidden menus rather than eliminate it.",
    ],
    [
      "Every menu should contain as few items as possible.",
      "Reducing visible items can add navigation or obscure needed features. Organization, familiarity and the task affect the result.",
    ],
    [
      "Do all choices have the same uncertainty?",
      "No. The experiment uses equal selection probabilities. When some responses are much more likely, their probability distribution changes the relevant uncertainty.",
    ],
    "Does the user face too many possibilities, unclear labels, or unnecessary search?",
  ),
  "conjunction-fallacy": g(
    "The conjunction fallacy treats two events happening together as more probable than one of those events alone, violating the inclusion relationship between their sets.",
    "A detailed story may resemble a person's description better than a broad statement does. That resemblance does not expand the set of outcomes: everyone satisfying both conditions also satisfies the first. The relationship holds without assuming independence.",
    "Interpret the broad statement as including people who also satisfy the additional condition. Choose, then read the subset explanation. The game does not provide enough information to calculate either absolute probability.",
    [
      "A detailed project forecast",
      "A forecast says a product will succeed. Another says it will succeed and launch ahead of schedule.",
      "Every outcome counted by the second forecast is already counted by the first.",
      "The extra condition can make the description more compelling while making its event no more probable.",
    ],
    [
      "A more convincing story must be more probable.",
      "Narrative fit and probability are different. Additional required events narrow a scenario, even when they make it easier to imagine.",
    ],
    [
      "What if the two events are strongly related?",
      "Dependence changes the size of their overlap but not the subset rule. The overlap cannot exceed either whole set.",
    ],
    "Which extra conditions have quietly been added to the prediction?",
  ),
  "availability-heuristic": g(
    "The availability heuristic judges frequency or probability partly through how readily examples come to mind, which may reflect salience rather than representative counts.",
    "Your memory samples what was encountered and noticed. A selected feed can repeat dramatic examples while omitting routine events. Ease of recall then mixes an event's frequency with the process that made it visible.",
    "Predict from the fictional headlines, then compare the complete record of 80 routine delays and 20 failures. The feed and the full record have different compositions. These invented counts demonstrate selection rather than describe any real outlet.",
    [
      "Prioritizing reliability work",
      "A team remembers two dramatic failures and few ordinary delays from the last review.",
      "Its incident log shows many more delays than failures, while failures have higher cost per event.",
      "Use frequency and severity together. Neither the most memorable event nor the largest count alone determines priority.",
    ],
    [
      "A memorable rare event should be ignored.",
      "Rare events can matter enormously. The correction is to separate frequency, severity and visibility, not to dismiss vivid evidence.",
    ],
    [
      "When is recall a useful clue?",
      "Recall can be informative when exposure is reasonably representative and comparable. Check what could be missing or disproportionately repeated before turning that clue into a frequency estimate.",
    ],
    "What reporting process made these examples easy to remember?",
  ),
  "halo-effect": g(
    "The halo effect is the influence of an overall impression or a salient trait on judgments about other attributes, even when those attributes need separate evidence.",
    "A strong first impression can become a shortcut for filling in missing information. Once someone seems impressive, their unrelated abilities may seem impressive too. A criterion-specific evaluation makes that inference easier to examine.",
    "Choose from the introductions, reveal the work scores, and choose again. The objective is explicitly work-sample performance. This scripted contrast is a prompt for reflection, not a measurement of your personal bias.",
    [
      "Reviewing a product proposal",
      "A beautifully presented proposal creates a favorable first impression.",
      "The team separately checks technical feasibility, user evidence and cost instead of scoring every category from presentation quality.",
      "A polished presentation can remain valuable without becoming evidence for every unrelated claim.",
    ],
    [
      "Good presentation means weak substance.",
      "No. The effect concerns unjustified spillover between judgments, not an inverse relationship between polish and ability.",
    ],
    [
      "Can a negative impression spill over too?",
      "Yes. An unfavorable overall impression can depress judgments about unrelated qualities. Separating criteria helps examine both directions of spillover.",
    ],
    "Which rating is based on direct evidence, and which inherits your overall impression?",
  ),
  "mental-accounting": g(
    "Mental accounting places money and outcomes into psychological categories, allowing the label of an expense or loss to influence a later decision.",
    "A ticket loss may feel like using the entertainment budget twice, while a cash loss may feel unrelated to the outing. Yet the next purchase can have the same consequences for the overall budget. Categories organize decisions but can obscure equivalence.",
    "Answer both ticket questions before comparing them. Buying leaves 60 spendable units and one usable ticket in either case. Different answers are a cue to inspect the category labels, not proof that every budgeting rule is wrong.",
    [
      "Replacing a lost ticket",
      "Start with 100 units. Spending 20 on a ticket and losing it leaves 80 units and no usable ticket.",
      "Losing 20 units of cash before buying also leaves 80 units and no usable ticket.",
      "A new 20-unit purchase has the same forward budget effect in both situations, under the game's assumptions.",
    ],
    [
      "Separate budgets are inherently irrational.",
      "Categories can help honor commitments and control spending. The issue is whether their labels obscure consequences relevant to the current objective.",
    ],
    [
      "What would make the two situations genuinely different?",
      "Refunds, replaceable booking records, different obligations or recoverable value could change the options. The game excludes those differences to isolate the category effect.",
    ],
    "What changes if you evaluate this choice against the whole remaining budget?",
  ),
  "zero-risk-bias": g(
    "Zero-risk bias favors eliminating one risk completely over an alternative that prevents more comparable harm overall while leaving some risk in place.",
    "A clean zero is emotionally and operationally attractive. But when costs and severity are equal, total expected harm may be the relevant comparison. Eliminating five expected incidents prevents fewer than reducing a different source by fifteen.",
    "Compare remaining totals after each choice: eliminating A leaves 50 expected incidents, while reducing B leaves 40. These are expected counts per period, not probabilities that should sum to one.",
    [
      "Two reliability fixes",
      "Source A contributes five expected incidents and source B contributes fifty, all with the same assumed cost per incident.",
      "One equal-cost fix removes A; another prevents fifteen incidents from B.",
      "The second prevents more incidents overall even though neither source reaches zero. Different severities could change the preferred allocation.",
    ],
    [
      "The option with zero risk in one component is safest overall.",
      "One component's zero can coexist with a larger remaining total elsewhere. Define the overall objective and compare comparable consequences.",
    ],
    [
      "Could complete elimination still be the right choice?",
      "Yes. Particular duties, severe consequences, dependencies or uncertainty may favor it. The simplified game deliberately holds those factors aside.",
    ],
    "Are you minimizing total harm or pursuing a zero in the most visible category?",
  ),
  "default-effect": g(
    "The default effect is the influence of a preselected option or no-action outcome on a decision, through mechanisms such as effort, perceived endorsement or attachment to the starting choice.",
    "A default supplies a path requiring less action. People may also interpret it as a suggestion or familiar baseline. Changing the starting selection can therefore alter choices without changing the alternatives themselves.",
    "Compare the same two plans before and after switching the default. The prices and features stay fixed. Your confirmation shows a choice under that presentation, not why you made it or how a whole population would respond.",
    [
      "A settings screen",
      "A service preselects an optional feature during setup.",
      "The user can keep it without an additional action, while removing it requires noticing and changing the control.",
      "Show the default clearly and explain the consequence, so the easy path remains an informed choice.",
    ],
    [
      "Choosing the default always means being manipulated.",
      "A default may match someone's informed preference or offer a helpful starting point. The question is whether its meaning and alternatives are understood.",
    ],
    [
      "How is a default different from a recommendation?",
      "A recommendation offers advice; a default determines the selected or no-action result. A default may be interpreted as advice, but that interpretation need not be justified.",
    ],
    "What happens if the person takes no further action, and is that consequence clear?",
  ),
  "dunning-kruger-effect": g(
    "The Dunning–Kruger effect concerns patterns of self-assessment and performance: recognizing mistakes can itself require knowledge of the task being judged.",
    "Being confident and being correct are distinct. Someone may lack the information needed both to answer well and to recognize an error. But statistical patterns also depend on measurement, noise and task design, so a popular cartoon is not a universal learning trajectory.",
    "Record confidence before each answer is revealed. Compare average confidence with accuracy after five questions, then treat the difference as a small-sample observation. The exercise does not establish a Dunning–Kruger effect in you.",
    [
      "Checking forecast calibration",
      "A team records confidence for each forecast before seeing what happened.",
      "Across many comparable forecasts made with 80% confidence, it checks whether roughly 80% were correct.",
      "Feedback can reveal overconfidence or underconfidence in that task. A few misses cannot establish a person's general competence.",
    ],
    [
      "High confidence proves someone has little knowledge.",
      "Experts can be appropriately confident, and novices can be uncertain. Confidence alone does not identify performance or the research effect.",
    ],
    [
      "Is this the familiar mountain-shaped confidence curve?",
      "No. The exercise records actual answers and stated confidence. The well-known cartoon should not be treated as the original study's measured universal curve.",
    ],
    "What feedback would help you learn whether your confidence matches your accuracy?",
  ),
  "berksons-paradox": g(
    "Berkson's paradox is a selection bias in which conditioning on a shared consequence of two variables can create an association absent from the original population.",
    "If either strength is sufficient for selection, a selected person with a low value on one trait must often have a high value on the other. That constraint makes the selected sample look like a tradeoff even though the original traits were independent.",
    "Toggle the shortlist and compare the dot pattern and correlation. No applicant's score changes. Only the rule for including applicants in the displayed sample changes.",
    [
      "An either-skill shortlist",
      "A pool contains every combination of writing and coding scores from one to ten equally often.",
      "Admission requires writing at least eight OR coding at least eight, so low-low pairs disappear.",
      "Among admitted applicants, low writing implies high coding and vice versa. The negative association is induced by selection.",
    ],
    [
      "A negative shortlist correlation proves the skills conflict.",
      "The admission rule can create that pattern. Check the broader population and the selection process before asserting a causal tradeoff.",
    ],
    [
      "How does this differ from ordinary confounding?",
      "Here the conditioning variable is influenced by the traits being compared. Conditioning on that common consequence can introduce a relationship rather than remove a preexisting common-cause influence.",
    ],
    "Which rule determined who was allowed into the dataset?",
  ),
  "friendship-paradox": g(
    "The friendship paradox shows how sampling people through friendship links can yield a higher average connection count than sampling people equally.",
    "A person with many connections appears at the end of many links. Their inclusion chance is therefore proportional to degree when sampling edge endpoints. The link-based mean is a degree-weighted average, which emphasizes well-connected people.",
    "Increase the star's leaves and compare the ordinary mean degree with the edge-endpoint mean. The latter is not a claim about every person's friends or each person's separately averaged neighbor count.",
    [
      "A six-leaf star",
      "Six people each know one central person, who knows all six.",
      "The ordinary average degree is twelve divided by seven, about 1.71. The mean degree at a randomly sampled edge endpoint is 3.5.",
      "The center appears repeatedly in link-based sampling, giving it more influence on that second average.",
    ],
    [
      "Everyone's friends must have more friends than they do.",
      "The central person in the example has fewer-connected friends. The paradox is an aggregate sampling result, not a universal individual experience.",
    ],
    [
      "When are the two means equal?",
      "In a regular undirected network where every person has the same degree, link weighting cannot favor a more connected group, so the means agree.",
    ],
    "Are your participants sampled directly or found through someone else's connections?",
  ),
  "wisdom-of-crowds": g(
    "Wisdom of crowds describes how aggregating estimates can improve accuracy when different people's errors partly cancel, while shared biases can persist.",
    "Independent noise averages down as the sample grows. A common offset is added to every estimate and therefore remains in their mean. More people helps with the former, but counting more versions of the same error does not remove the latter.",
    "Change crowd size and shared bias separately. Compare average absolute errors across 200 generated crowds. The chart's bands show one analytic noise standard error around the biased mean, not a guarantee that every crowd lies inside them.",
    [
      "Independent estimates before discussion",
      "A group estimates a quantity separately, using different observations.",
      "Its high and low errors can partly cancel. If everyone first sees the same misleading anchor, their estimates may all shift together.",
      "Protect independence before aggregation, and check shared assumptions as well as headcount.",
    ],
    [
      "A bigger crowd must produce a more accurate answer.",
      "Shared bias, bad information and unsuitable aggregation can survive or grow with the crowd. Size alone does not establish wisdom.",
    ],
    [
      "Why use multiple simulated crowds?",
      "One crowd can happen to be unusually accurate or inaccurate. Repeating the same probability model helps separate the average pattern from one lucky draw.",
    ],
    "Which errors are independent, and which assumption could make everyone wrong together?",
  ),
  "value-of-information": g(
    "The value of information is the improvement in a decision objective made possible by learning before choosing, compared with the best decision available without that information.",
    "Information creates value through the actions it enables. If a clue tells you to proceed in favorable states and abstain in unfavorable ones, it can prevent losses. Its cost must then be compared with that improvement, not with the full payoff of the project.",
    "Compare launching, skipping and buying perfect information using expected payoffs before playing one outcome. The displayed gross value is before information cost; the realized result of one round can differ from every expected value.",
    [
      "A project with a perfect test",
      "Success probability is 40%; launching pays +80 on success and −40 otherwise. Its expected payoff is eight.",
      "Free perfect information lets you launch only on success, worth 32 in expectation. Its gross improvement is 24.",
      "A ten-unit information cost leaves an expected payoff of 22, which exceeds the best no-information choice of eight.",
    ],
    [
      "An interesting report is automatically worth its cost.",
      "Its decision value depends on accuracy, whether it changes an action, the stakes and the price. Interesting information and useful decision information can differ.",
    ],
    [
      "Why is perfect information only a benchmark?",
      "Real clues are incomplete and can be wrong. Under the same decision objective, free perfect information gives an upper benchmark for what a less informative signal can achieve.",
    ],
    "What would you do differently after seeing each possible result?",
  ),
  diversification: g(
    "Diversification combines exposures to reduce the impact of fluctuations that do not move together; its effectiveness depends on allocation and correlation.",
    "Two labels do not necessarily represent two independent risks. When changes coincide, combining them offers little cancellation. When their fluctuations differ, one can offset some of the other's variation. The chosen weighting determines how much each contributes.",
    "Start with equal weights and change correlation. Both exposures have standard deviation ten units. The combined number is a variability measure under these assumptions, not a forecast of return or a complete measure of loss risk.",
    [
      "Two equal exposures",
      "Each exposure has standard deviation ten and receives half the allocation.",
      "At zero correlation, the combined standard deviation is about 7.07. At perfect positive correlation, it remains ten.",
      "The split stays identical; changing dependence changes the benefit. The special perfectly negative case cancels fluctuations at equal weights in this symmetric model.",
    ],
    [
      "Owning more named exposures guarantees less risk.",
      "Their common drivers can make them behave like one exposure. Unequal weights, tail dependence and changing correlations also matter.",
    ],
    [
      "Does zero standard deviation here mean nothing can go wrong?",
      "No. The cancellation follows exact symmetric assumptions. Real exposures can have unequal variation, changing dependence and risks outside the model.",
    ],
    "Which apparently separate exposures depend on the same underlying condition?",
  ),
  "random-walk": g(
    "A random walk accumulates successive random steps, so an unbiased step mechanism can produce paths that end far from the starting point.",
    "Equal chances of moving left and right give zero expected position, but squared distance increases with the number of independent steps. Positive and negative endpoints can cancel in a mean even when each traveler is far from home.",
    "Resample and compare mean position with mean absolute distance. The chart displays five paths, while statistics use twenty. The square-root reference is theoretical root mean squared distance, a different summary from mean absolute distance.",
    [
      "Balanced steps without a balanced outcome",
      "A walker makes 100 independent steps, each one unit left or right with equal probability.",
      "Expected final position is zero, while root mean squared position is ten units.",
      "The neutral average does not promise that a particular traveler returns home or remains near the origin.",
    ],
    [
      "A fair process must soon compensate for its past drift.",
      "Independent steps have no corrective memory. An accumulated imbalance does not change the probability of the next step.",
    ],
    [
      "Does this experiment prove eventual return?",
      "No. Finite paths cannot establish an infinite-horizon recurrence result. The theorem's conditions, including dimension and step rules, must be specified separately.",
    ],
    "Does your average hide large distances in opposite directions?",
  ),
  "tragedy-of-the-anticommons": g(
    "The tragedy of the anticommons describes underuse caused by fragmented rights to exclude: several separate permissions can block activity that would otherwise be useful.",
    "Each permission holder controls a necessary part of the project. Small fees or barriers can accumulate until the whole activity is no longer viable. This differs from overuse in an ungoverned commons, where users can extract while sharing the cost.",
    "Add all permission fees before choosing to proceed. Then lower a fee or change the number of required permissions. The project's underlying value stays at sixty, allowing you to isolate the coordination barrier.",
    [
      "A project needs six licenses",
      "A project creates sixty units of value but requires six permissions costing twelve each.",
      "The total fee is seventy-two, leaving net value −12. If each fee becomes four, the total becomes twenty-four and net value becomes 36.",
      "The same project changes viability because of the combined permission cost, not because its technical value improved.",
    ],
    [
      "Every permission is an unnecessary obstacle.",
      "Rights and safeguards can serve legitimate purposes. The concept asks how fragmented control affects coordination, not whether protections should always be removed.",
    ],
    [
      "Is this simply the tragedy of the commons?",
      "They emphasize different failures. Commons problems often involve overuse under weak exclusion; anticommons problems involve underuse when multiple parties can block access.",
    ],
    "What is the combined cost of securing every necessary agreement?",
  ),
  "minority-game": g(
    "A minority game rewards players for choosing the less crowded of two sides, making an action's value depend on how many others choose it.",
    "An attractive side can cease to be attractive when others imitate it. The payoff cannot be determined from the action alone. The participant also contributes to attendance, so evaluating the crowd without counting your own choice misses part of the rule.",
    "Choose A or B and compare the 101-person totals. The exact winning probabilities use the fixed bot behavior. A few victories do not demonstrate a strategy that would succeed against adapting opponents.",
    [
      "Choosing the quieter service",
      "One hundred other users choose between two equivalent services; you choose too.",
      "If most others tend to choose A, B is more likely to be the minority. If everyone learns that pattern and switches, the advantage can move.",
      "The fixed-bot game demonstrates crowd-dependent payoff but leaves that adaptive response out.",
    ],
    [
      "Always oppose the crowd and you will win.",
      "You need a relevant prediction of the actual crowd, and others can respond. Being contrarian is not an advantage by itself.",
    ],
    [
      "Why are there 101 participants?",
      "An odd total prevents equal attendance between the two sides. Your own choice is counted with the hundred bots when deciding which group is smaller.",
    ],
    "Would this option still be attractive if everyone noticed the same advantage?",
  ),
  "rock-paper-scissors": g(
    "Rock, Paper, Scissors is a game of cyclic dominance: each action beats one alternative and loses to another, so predictable pure choices can be exploited.",
    "A mixed strategy specifies probabilities over actions before the outcome is known. With symmetric payoffs, a uniform mix protects against exploitation in expectation. Against a known fixed bias, a particular pure action may instead offer a positive expected score.",
    "Increase the bot's rock probability, then compare paper's expected score with actual rounds. The bot divides its remaining probability equally between paper and scissors. A winning expectation does not guarantee winning the next round.",
    [
      "A bot favors rock",
      "The bot chooses rock 80% of the time, and paper or scissors 10% each.",
      "Always choosing paper wins 80%, draws 10%, and loses 10%, giving expected score +0.7 per round.",
      "A uniform human mix gives zero expected score. It protects against an unknown opponent, but does not exploit this known fixed bias.",
    ],
    [
      "One move is intrinsically strongest.",
      "Every move has a counter. Its expected value depends on the opponent's probabilities and the payoff rules.",
    ],
    [
      "Does randomizing mean choosing whatever feels random?",
      "Not necessarily. People can produce predictable sequences while feeling spontaneous. A mixed strategy is a defined probability rule, not just a lack of conscious planning.",
    ],
    "Are you protecting against prediction or exploiting a known pattern?",
  ),
  "stocks-and-flows": g(
    "Stocks and flows distinguish an accumulated quantity from the rates adding to or removing from it, explaining why a reduced inflow can still leave a level rising.",
    "The stored amount changes by inflow minus actual outflow over time. Rates describe change; the stock retains previous accumulation. A tank with finite capacity can overflow, and an empty tank cannot supply its full drain capacity.",
    "Run five minutes at a time and watch the stored amount. Compare the selected minute with the full curve. The drain control sets a maximum, while actual drainage is limited by the water available.",
    [
      "A backlog keeps rising",
      "A team has forty unfinished tasks, receives six per day and completes four.",
      "Its backlog grows by two per day. Reducing arrivals to five slows the growth but does not reverse it.",
      "To shrink the backlog under comparable conditions, completions must exceed arrivals. A smaller growth rate is not a smaller stock.",
    ],
    [
      "Reducing the inflow immediately reduces the accumulated level.",
      "The direction depends on net flow. The existing stock persists until removals exceed additions, apart from other mechanisms.",
    ],
    [
      "Why can the drain capacity differ from actual outflow?",
      "A drain capable of seven units cannot remove seven when fewer are available. Capacity and realized flow should be measured separately.",
    ],
    "Are you trying to change the rate of accumulation or the amount already accumulated?",
  ),
};
