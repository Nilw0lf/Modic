import { guide as g } from "./types";

export const atlasGuides = {
  "secretary-problem": g(
    "The secretary problem is an optimal stopping problem: when should you stop searching and accept an option if rejected options cannot be recalled?",
    "An observation period gives you a benchmark, but waiting consumes opportunities. With randomly ordered candidates and a goal of choosing the single best, an effective rule is to observe first, then accept the next candidate who beats everything observed.",
    "Compare different observation periods over many runs. A successful hire in one round does not establish a better policy; compare the frequency of finding the best candidate under the same rules.",
    [
      "A search with no second chances",
      "You must choose from 20 candidates interviewed in random order, and cannot return to anyone rejected.",
      "Observe the first seven without hiring. Then accept the first later candidate who beats your previous benchmark.",
      "You exchange some missed early opportunities for a more informed stopping rule. Sometimes the best candidate was in the observation group.",
    ],
    [
      "Always reject exactly 37% of real opportunities.",
      "The familiar approximate rule depends on random order, a known horizon, no recall, and a very specific objective. Real hiring rarely satisfies all four.",
    ],
    [
      "What changes if I can return to earlier options?",
      "Recall changes the cost of waiting and therefore the stopping problem. The benchmark policy here is designed for irreversible rejection.",
    ],
    "What would make further searching worth more than accepting the best option available now?",
  ),
  "multi-armed-bandit": g(
    "The multi-armed bandit problem describes the tradeoff between exploration, which discovers better options, and exploitation, which uses the best option known so far.",
    "Early results are noisy. An option that wins once may be weak, while a promising option may initially lose. Exploring buys information at the cost of occasionally choosing a lower-paying option. The value of that information depends on how many decisions remain.",
    "Change exploration and compare cumulative reward over the same horizon. The oracle benchmark knows the best machine in advance; it shows the cost of learning, not an achievable strategy for someone without that knowledge.",
    [
      "Choosing a newsletter subject line",
      "Three subject lines have unknown response rates. You can test them over repeated sends.",
      "Send some messages using alternatives while giving most traffic to the current leader.",
      "The tests can discover a better line, but their cost matters more when only a few sends remain.",
    ],
    [
      "The first winner deserves all future choices.",
      "A small sample can misidentify the best option. Continued exploration helps correct that mistake, especially over a long horizon.",
    ],
    [
      "Does this experiment use Thompson sampling?",
      "The automated comparison uses an exploration-based policy, not Thompson sampling. Several algorithms solve bandit problems using different ways to represent uncertainty.",
    ],
    "How much future opportunity remains to benefit from what you learn today?",
  ),
  "coupon-collector": g(
    "The coupon collector problem asks how many random draws it takes to obtain every type in a collection, including repeated draws of types already collected.",
    "Early discoveries are easy because almost everything is new. Near completion, most draws are duplicates. With equally likely types, collecting all n types takes n times the harmonic sum on average, rather than merely n draws.",
    "Watch the pace slow near the final missing type. Compare many collections: an average completion time does not promise that your particular collection will finish by that point.",
    [
      "Four equally likely stickers",
      "Each packet contains one of four sticker types, with equal probability.",
      "The expected time to complete the set is 4 × (1 + 1/2 + 1/3 + 1/4), about 8.33 packets.",
      "Once only one type is missing, each new packet has just a one-in-four chance of completing the set.",
    ],
    [
      "Four types should take about four packets.",
      "That would require avoiding duplicates. Random sampling with replacement repeatedly spends draws on types you already have.",
    ],
    [
      "What if one collectible is rare?",
      "Unequal probabilities change the expectation. A rare final type can dominate the waiting time, so the equal-probability formula no longer applies.",
    ],
    "Which missing item could become the bottleneck in completing your collection or coverage?",
  ),
  "gamblers-fallacy": g(
    "The gambler's fallacy is the belief that an independent random process must soon compensate for a recent streak, making the opposite outcome more likely next.",
    "A long-run balance does not create a short-run debt. For an independent fair coin, the mechanism generating the next toss has no memory of earlier tosses. More observations can dilute a past imbalance without requiring a corrective streak.",
    "After a streak, distinguish the probability of the next toss from the probability of a whole specified sequence. Earlier outcomes are already known when you predict the next one.",
    [
      "Five heads in a row",
      "A fair coin has produced five heads. You now choose whether the next toss will be heads or tails.",
      "The chance of tails on that next independent toss is still 50%.",
      "Six specified heads were unlikely before the sequence began, but that does not make tails more likely after five have happened.",
    ],
    [
      "A streak proves the opposite result is due.",
      "Independence means previous outcomes do not change the next probability. A suspected biased coin is a different question about the mechanism.",
    ],
    [
      "Can a streak ever be useful evidence?",
      "Yes, if the probability is unknown or outcomes are dependent. It may inform a hypothesis about bias or changing conditions; it still does not create a compensating obligation.",
    ],
    "Does the process remember its past, or are you supplying the memory yourself?",
  ),
  "inspection-paradox": g(
    "The inspection paradox occurs when observing a process at a random time disproportionately samples its longer intervals, making your experience differ from the average interval.",
    "Long gaps occupy more of the timeline, so they are easier to land inside. For random arrivals between renewal events, waiting depends on the variability of intervals as well as their mean. Averaging the timetable alone misses that weighting.",
    "Change the share of long gaps and compare the ordinary mean interval, length-biased interval, and random-arrival wait. These summaries weight the same gaps differently; changing their share changes both the mean and the variability.",
    [
      "Two bus timetables with the same mean",
      "A perfectly regular bus every ten minutes gives a random passenger an average five-minute wait.",
      "If each gap is independently five or fifteen minutes with equal probability, the mean gap remains ten, but the average random-arrival wait is 6.25 minutes.",
      "Long gaps catch more passengers. Equal mean service intervals need not imply equal waiting experiences.",
    ],
    [
      "Half the average gap is always the average wait.",
      "That shortcut works for regular intervals. Variability increases the chance of arriving during an unusually long interval.",
    ],
    [
      "Where else does length-biased sampling appear?",
      "A randomly encountered ongoing job may be unusually long, and a random user may experience a busier period. The sampling method determines what receives extra weight.",
    ],
    "Are you sampling events equally, or sampling the time those events occupy?",
  ),
  "benfords-law": g(
    "Benford's Law describes a leading-digit pattern in some datasets: smaller first digits occur more often, with 1 appearing about 30% of the time.",
    "Processes spanning multiple orders of magnitude can distribute values approximately evenly on a logarithmic scale. Leading digits then occupy unequal portions of each logarithmic decade. This is different from selecting single digits uniformly.",
    "Compare observed leading digits with the reference pattern and inspect how the data was generated. A close or poor fit is informative only when the dataset is suitable for this comparison.",
    [
      "Numbers across scales",
      "Imagine measurements spread across many scales, from tens to millions.",
      "On the Benford reference curve, a leading 1 has probability log10(2), about 30.1%; a leading 9 has about 4.6%.",
      "The imbalance comes from logarithmic intervals, not from the digit 1 having a special causal influence.",
    ],
    [
      "Any non-Benford dataset contains fraud.",
      "Assigned IDs, narrow ranges, minimums, and rounding can break the pattern naturally. A mismatch is not evidence of fraud by itself.",
    ],
    [
      "Should telephone numbers follow Benford's Law?",
      "Usually no. Their digits are assigned under numbering rules rather than generated by a scale-spanning measurement process.",
    ],
    "What generates these numbers, and does that process justify the reference pattern?",
  ),
  "signal-detection": g(
    "Signal detection theory separates sensitivity to a signal from the decision threshold used to report it, exposing the tradeoff between misses and false alarms.",
    "When signal and noise overlap, no threshold perfectly separates them. Lowering the threshold catches more signals but also flags more noise. Better separation can improve both; merely changing the threshold usually moves along a tradeoff.",
    "Adjust signal strength separately from the threshold. Track hits, misses, and false alarms together: a high hit rate alone does not show that a flag is reliable.",
    [
      "An alert for unusual activity",
      "A monitoring system assigns scores to both ordinary activity and genuine incidents.",
      "Lowering the alert threshold catches weaker incidents and also admits more ordinary activity.",
      "Whether that change helps depends on the frequency of incidents and the costs of investigating alerts versus missing them.",
    ],
    [
      "More alerts mean a more accurate detector.",
      "Alert volume can rise simply because the threshold is lower. Sensitivity and decision policy are different properties.",
    ],
    [
      "Why can a detector with many hits still produce mostly false alerts?",
      "If genuine events are rare, the much larger noise population can contribute many false alarms. You need the base rate as well as hit and false-alarm rates.",
    ],
    "Which mistake is more costly here, and how common is the signal?",
  ),
  "shannon-entropy": g(
    "Shannon entropy measures the average uncertainty of a probability distribution, expressed in bits when logarithms use base two.",
    "An outcome that was unlikely carries more surprise when it occurs. Entropy averages that surprise across all outcomes, weighting each by its probability. A predictable binary source has low entropy; an evenly balanced one has the maximum of one bit per outcome.",
    "Move the binary probability toward certainty and compare the average uncertainty. Do not confuse the surprise of one rare outcome with the average entropy of the entire source.",
    [
      "Predicting a coin-like source",
      "One source produces heads half the time. Another always produces heads.",
      "The balanced source has one bit of entropy per independent output; the certain source has zero.",
      "The difference measures uncertainty about the output, not whether either output is meaningful to a person.",
    ],
    [
      "High entropy means valuable or intelligent information.",
      "Entropy describes a probability pattern. It does not measure truth, usefulness, or meaning.",
    ],
    [
      "Can a rare event be surprising in a low-entropy system?",
      "Yes. A nearly certain source has low average uncertainty, but its rare alternative can carry a large amount of surprise when it occurs.",
    ],
    "Are you measuring unpredictability, or the value of understanding the message?",
  ),
  "noisy-channel": g(
    "A noisy channel can corrupt a transmitted message. Error-correcting codes add structured redundancy so a receiver can recover information despite some errors.",
    "Repeating a bit three times allows a majority vote to correct a single flipped bit. With independent errors below a one-half probability, this can reduce the final error rate. The improvement costs extra transmission capacity.",
    "Compare the raw message with the decoded repeated message at the same noise level. Check both recovered accuracy and the amount of redundancy, rather than judging accuracy alone.",
    [
      "Sending one bit three times",
      "You want to transmit 1, so the repetition code sends 111.",
      "Noise changes it to 101. Majority voting still decodes it as 1.",
      "Two flips would defeat this correction. Redundancy protects against a specified class of errors, not every possible failure.",
    ],
    [
      "Repeating a message always guarantees delivery.",
      "Multiple errors, correlated failures, or sufficiently strong noise can still break a code. The simple repetition model is not an optimal communication system.",
    ],
    [
      "Why not add unlimited repetition?",
      "Each added copy uses bandwidth and time. Better codes can distribute redundancy more efficiently than repeating every bit.",
    ],
    "What failures should a message survive, and how much extra capacity can you afford?",
  ),
  "braess-paradox": g(
    "Braess's Paradox shows that adding a route can make everyone's journey slower when travelers independently choose routes that benefit themselves.",
    "A shortcut changes incentives throughout the network. Each driver can find it personally attractive while the resulting combined traffic congests shared roads. The individually stable routing pattern need not minimize total travel time.",
    "Toggle the shortcut while keeping demand fixed, then compare equilibrium journey times. Try other demand levels: the paradox depends on congestion and route costs rather than appearing in every network.",
    [
      "A shortcut that slows the commute",
      "In the classic teaching network, 4,000 drivers split between two routes and take 65 minutes.",
      "A free connecting road makes a different route attractive. If everyone follows it, the two congestion-sensitive segments each take 40 minutes.",
      "The new equilibrium takes 80 minutes. A new option changed collective behavior enough to outweigh its apparent benefit.",
    ],
    [
      "More roads always reduce travel time.",
      "Additional capacity can help, but an added connection can also change incentives. Network design and routing behavior must be assessed together.",
    ],
    [
      "Does closing a road always help?",
      "No. This example demonstrates a possibility under particular congestion costs. A real closure requires an assessment of the actual network and demand.",
    ],
    "Could an individually attractive shortcut overload the resources everyone shares?",
  ),
  "amdahls-law": g(
    "Amdahl's Law describes the limit on speeding up a fixed task when only part of the work can run in parallel.",
    "Workers can share the parallel portion, but the serial portion still takes its original time. As more workers are added, the serial work becomes the bottleneck. The formula assumes perfect sharing and excludes extra coordination overhead.",
    "Increase worker count while holding the parallel fraction fixed. Notice the diminishing improvement and compare it with the ceiling set by the serial fraction.",
    [
      "Four workers on a partly shared job",
      "A task takes ten hours: two hours must happen serially and eight can be divided perfectly.",
      "With four workers, parallel work takes two hours, so the whole job takes four hours: a 2.5× speedup.",
      "Even infinitely many workers cannot remove the two serial hours. The ideal maximum speedup is 5×.",
    ],
    [
      "Twice as many workers always finish twice as fast.",
      "Serial work and coordination can limit the improvement. The simple model already has a ceiling before overhead is added.",
    ],
    [
      "What if the workload grows with the team?",
      "That is a different scaling question. Amdahl's fixed-workload comparison does not automatically describe larger problems enabled by more resources.",
    ],
    "Which part of your process must finish before other work can proceed?",
  ),
  "littles-law": g(
    "Little's Law connects average work in a stable system, average throughput, and average time in the system: L = λW.",
    "If items enter and leave at a stable long-run rate, spending longer in the system means more items are present on average. The relationship concerns averages over a consistent boundary, including waiting if waiting is inside that boundary.",
    "Compare the number of items in the system, the throughput rate, and the implied time. Keep units consistent and avoid treating a steadily growing backlog as a stable queue.",
    [
      "A team's open work",
      "A team completes eight tasks per week and has 24 tasks in progress on average.",
      "Little's Law gives an average time in the system of 24 ÷ 8 = three weeks.",
      "Reducing open work can reduce lead time if throughput and the system boundary stay comparable.",
    ],
    [
      "Every task will finish in exactly three weeks.",
      "The relationship describes averages. Individual tasks can vary widely, and changing the process can change throughput too.",
    ],
    [
      "Does the arrival rate always equal throughput?",
      "In a stable system over a suitable observation period, they balance on average. If arrivals persistently exceed departures, the backlog grows and a stationary interpretation is inappropriate.",
    ],
    "Have you measured waiting and active work within the same boundary?",
  ),
  "bullwhip-effect": g(
    "The bullwhip effect is the amplification of demand variation as orders move upstream through a supply chain, from customers toward producers.",
    "Each stage sees orders rather than the original demand signal. Reacting strongly to a recent change can turn a small customer fluctuation into a larger replenishment change, which the next stage then interprets as demand. Delays and forecasting rules can compound it.",
    "Compare customer demand with orders at each stage. Increasing reaction strength tests the ordering policy; it does not mean customers suddenly wanted the largest upstream order.",
    [
      "A promotion travels upstream",
      "A shop experiences a temporary jump in sales during a short promotion.",
      "The shop replenishes aggressively. Its distributor responds to that unusually large order with an even larger factory order.",
      "The factory may see a dramatic spike even though the original consumer change was modest and temporary.",
    ],
    [
      "A factory order spike proves a matching sales boom.",
      "Orders combine final demand with inventory policies and expectations. Upstream variation can be created by the response itself.",
    ],
    [
      "What can reduce amplification?",
      "Sharing final demand information, coordinating replenishment, and evaluating forecast reactions can help. The best policy depends on lead times, costs, and service requirements omitted from this small model.",
    ],
    "Are you reacting to customer demand, or to someone else's reaction to it?",
  ),
  "jevons-paradox": g(
    "Jevons's Paradox describes a case where greater resource efficiency encourages enough additional use that total resource consumption rises instead of falling.",
    "Efficiency reduces resource use per unit of service, but may make that service cheaper or more attractive. Total consumption multiplies resource use per unit by the number of units used. A rebound can offset some savings; backfire occurs only when it offsets more than all of them.",
    "Separate efficiency gains from the change in usage. Compare total resource use with the original baseline rather than looking only at consumption per task.",
    [
      "Cheaper computation, more computation",
      "A service initially runs 100 tasks using one energy unit each.",
      "An improvement halves energy per task. If use rises to 300 tasks, consumption becomes 150 units.",
      "Each task is more efficient, yet total consumption rises. If usage stayed at 100 tasks, consumption would fall to 50.",
    ],
    [
      "Every efficiency improvement increases consumption.",
      "Rebound varies. It can be small, partial, or large enough to cause backfire; efficiency alone does not determine the total.",
    ],
    [
      "Is partial rebound the same as the paradox?",
      "No. Partial rebound reduces the expected savings while still leaving total use lower. The stronger paradox involves total use exceeding the original baseline.",
    ],
    "What happens to the number of tasks when each task becomes cheaper?",
  ),
  "pareto-concentration": g(
    "Pareto concentration describes uneven distributions in which a relatively small share of participants, products, or events accounts for a large share of the total.",
    "A heavy right tail means unusually large values carry substantial weight. The shape parameter controls how concentrated the model becomes. A useful concentration summary depends on the actual distribution; the familiar 80/20 split is a heuristic rather than a guaranteed ratio.",
    "Change tail shape and compare the share held by the top group. Look at both the typical observation and the total, because a few large observations can pull them apart.",
    [
      "Finding a support bottleneck",
      "A team records time spent on support cases and discovers that a small group of cases consumes much of its effort.",
      "It studies those cases separately instead of treating the average case as representative.",
      "The concentration suggests where investigation could help, but does not establish that exactly 20% of cases use exactly 80% of time.",
    ],
    [
      "Every real dataset obeys the 80/20 rule.",
      "Concentration is empirical. Some datasets are fairly even; others are much more concentrated than 80/20.",
    ],
    [
      "Does concentration imply the largest contributors are always the best targets?",
      "No. Their contribution, causes, and cost of changing them matter. A descriptive ranking is not automatically an intervention strategy.",
    ],
    "Which small group drives the total, and what explains its outsized contribution?",
  ),
  "zipfs-law": g(
    "Zipf's Law describes a rank-frequency pattern in which frequency is approximately inversely proportional to rank, famously observed in word usage.",
    "Ordering items by frequency reveals a steep head and a long tail. With exponent one, the second-ranked item has roughly half the frequency of the first, and the tenth about one tenth. Other exponents give different levels of concentration.",
    "Adjust the exponent and compare the ranked curve. The rank plot summarizes frequency differences; it does not identify a single mechanism that must have produced them.",
    [
      "Common words and a long tail",
      "A vocabulary dataset is sorted from the most common word to the least common.",
      "Under an ideal exponent-one pattern, a first-ranked frequency of 1,000 corresponds to about 500 at rank two and 100 at rank ten.",
      "Many rare words can collectively matter even when each one contributes very little.",
    ],
    [
      "A Zipf-like curve proves one universal cause.",
      "Different processes can generate similar ranked patterns. A visual fit is a starting point for investigation, not a causal explanation.",
    ],
    [
      "How does this differ from the Pareto idea?",
      "Zipf emphasizes frequencies ordered by rank. Pareto usually describes a tail distribution of values. They are related under particular assumptions but are not interchangeable measurements.",
    ],
    "Does the long tail matter collectively even when its individual entries seem negligible?",
  ),
  "sir-epidemic": g(
    "The SIR model divides a population into susceptible, infectious, and recovered groups to explore how transmission and recovery can shape an epidemic.",
    "New infections depend on contact between susceptible and infectious people, while recovery moves people out of the infectious group. An outbreak can slow as the susceptible pool shrinks, even if the transmission parameter itself stays fixed.",
    "Compare new movement between groups with the number currently infectious. Change transmission and recovery separately, and remember that these curves describe a simplified closed population rather than an actual forecast.",
    [
      "A spreading infection in a closed group",
      "Nearly everyone starts susceptible, with a small infectious group and no new arrivals.",
      "Transmission initially increases infections. Later, more people have recovered and fewer remain susceptible.",
      "The infectious group can peak and decline because the conditions for further spread change through the outbreak itself.",
    ],
    [
      "A downward curve means the organism became less transmissible.",
      "In this model, susceptible depletion can cause decline without a change in the transmission parameter. Real outbreaks have many additional influences.",
    ],
    [
      "Are these curves suitable for predicting my local outbreak?",
      "No. They omit contact networks, changing behavior, testing, age differences, and other important factors. They illustrate feedback, not a calibrated local forecast.",
    ],
    "Is a changing outcome caused by a changed parameter or by a changing population state?",
  ),
  "logistic-growth": g(
    "Logistic growth describes a population or quantity that grows quickly when resources are abundant, then slows as it approaches a carrying capacity.",
    "The growth term combines the amount already present with the remaining fraction of capacity. Per-capita growth declines as crowding rises. In the continuous model, total growth is largest around half of capacity, rather than at the final plateau.",
    "Compare the growth rate with the level. A curve that keeps rising can still be growing more slowly. The carrying capacity is an assumption of this model, not a measured permanent limit for every real system.",
    [
      "A bounded population",
      "A habitat has an illustrative carrying capacity of 100, and begins with a population of five.",
      "Growth accelerates as the population expands, then slows as it approaches the assumed limit.",
      "The leveling curve reflects resource constraints. A higher capacity would change the eventual level, not merely the speed of reaching it.",
    ],
    [
      "Slower growth means the population is shrinking.",
      "A positive but decreasing growth rate still raises the population. Decline requires the change itself to become negative.",
    ],
    [
      "Can carrying capacity change?",
      "Yes. Resources, technology, competition, and environmental conditions can change it. A fixed capacity is a teaching simplification.",
    ],
    "Are you comparing total size, growth per period, or growth per participant?",
  ),
  "predator-prey": g(
    "Predator–prey models explore feedback between a resource population and the consumers that depend on it, sometimes producing cycles with delayed peaks.",
    "More prey supports predator growth. More predators then put pressure on prey, reducing the food available for later predator growth. The two populations affect each other's future rather than simply moving together at the same moment.",
    "Track which population peaks first and how the other follows. Changing food conditions or initial predator numbers changes the trajectory; the plotted cycle is not a fixed calendar for real ecosystems.",
    [
      "A resource and its consumers",
      "A prey population expands while predators are relatively scarce.",
      "More available food allows predators to increase. Their increased consumption then reduces prey.",
      "Predators may peak after prey, because their growth reflects earlier abundance. The delayed response is part of the feedback.",
    ],
    [
      "More predators permanently solve prey overpopulation.",
      "Reducing prey also reduces the resource supporting predators. The effects propagate through both populations and can change over time.",
    ],
    [
      "Do real populations follow these exact cycles?",
      "No. Weather, migration, multiple species, disease, and resource limits alter real dynamics. This simplified interaction helps explain a possible mechanism.",
    ],
    "Which response depends on a resource level that has already started changing?",
  ),
  "allee-effect": g(
    "The Allee effect describes situations where individuals do worse at very low population density; a strong Allee effect can create a threshold below which a population declines.",
    "Sparse populations may struggle to find mates, cooperate, or defend themselves. In the strong-threshold model, initial size determines whether growth begins or decline continues. This differs from logistic growth, where a small positive population can grow under the usual assumptions.",
    "Move initial population above and below the threshold, keeping capacity fixed. The dividing point is imposed by the teaching model; it is not a universal population size applicable across species.",
    [
      "A population needs enough partners",
      "A species relies on finding partners, and a small isolated group starts below an illustrative viability threshold.",
      "Adding enough individuals to cross that threshold changes its modeled direction from decline to growth.",
      "The same habitat can produce different outcomes depending on starting conditions, even before the upper resource limit matters.",
    ],
    [
      "Every small population is doomed.",
      "Thresholds depend on mechanisms and conditions. A weak Allee effect reduces growth at low density without necessarily creating a critical threshold.",
    ],
    [
      "How is the lower threshold different from carrying capacity?",
      "The lower threshold concerns difficulty sustaining growth when too few individuals are present. Carrying capacity concerns resource constraints when many are present.",
    ],
    "Does this system need a minimum viable group as well as enough resources?",
  ),
  "social-tipping": g(
    "Social tipping models explore how a small initial group can trigger wider adoption when people join after enough others around them have joined.",
    "Adoption changes the social signal observed by people who have not yet joined. Some then cross their thresholds, adding to the signal for others. The size of the cascade depends on the distribution of thresholds and who can see whom.",
    "Compare the initial seed with final adoption. A large jump near one setting reflects these model thresholds and visibility assumptions, not a universal percentage required for social change.",
    [
      "Introducing a shared practice",
      "A team considers a new practice. Some people join immediately, while others wait until enough colleagues use it.",
      "An initial group persuades the most willing holdouts, whose participation can bring the next group across its threshold.",
      "The process may cascade or stall. Different thresholds or social connections would produce different results.",
    ],
    [
      "Any sufficiently vocal minority will inevitably persuade everyone.",
      "A cascade requires the right threshold and visibility conditions. Some populations remain resistant even after an initial group adopts.",
    ],
    [
      "Does this model include persuasion or changing minds?",
      "Its simple adoption rule responds to observed participation. It does not model arguments, trust, network structure, or people abandoning the behavior.",
    ],
    "Who is close to joining, and whose participation would they actually observe?",
  ),
  "framing-effect": g(
    "The framing effect occurs when presenting equivalent choices as gains or losses changes how people evaluate them, despite the underlying outcomes staying the same.",
    "A reference point makes outcomes feel like preserving something or losing it. Changing that presentation can change risk preference. Matching expected values alone is insufficient: the safe option and gamble have different distributions even when each option is equivalent across frames.",
    "Translate both frames into the same outcome units before comparing your decisions. The experiment explores a choice pattern, rather than diagnosing a stable trait from one answer.",
    [
      "The same policy in two frames",
      "Of 600 people, a policy certainly saves 200; another offers a one-third chance of saving all 600 and a two-thirds chance of saving none.",
      "The first can instead be described as 400 certainly dying. The gamble can be described with the equivalent death outcomes.",
      "If your preferred policy changes only with the wording, the frame influenced the choice despite unchanged outcomes.",
    ],
    [
      "Equal expected values mean identical options.",
      "Certainty and a gamble have different risk profiles. Framing compares each option with its own equivalent description, not the two options as identical distributions.",
    ],
    [
      "How can I reduce an unwanted framing influence?",
      "Rewrite every option in the same terms, including probabilities and all outcomes. Then consider your objective and risk preference using that common representation.",
    ],
    "Would you choose differently if every gain were expressed as the corresponding loss?",
  ),
  "endowment-effect": g(
    "The endowment effect describes a tendency to value an item more when you own it, often expressed as a gap between willingness to pay and willingness to accept.",
    "Ownership can make giving something up feel like a loss relative to the current situation. But observed buying and selling prices can also reflect transaction costs, information, or wealth. A price gap needs interpretation rather than an automatic psychological label.",
    "Compare buyer and seller perspectives with the underlying item held fixed. The ownership premium in this experiment is an illustrative setting, not a measurement of how strongly you or everyone else experiences the effect.",
    [
      "A mug changes hands",
      "Before owning a mug, someone would pay at most eight units for it.",
      "After receiving the same mug, they ask twelve units to part with it.",
      "Ownership may have changed the reference point, even though the object's physical properties did not change.",
    ],
    [
      "Every buying–selling gap proves irrationality.",
      "Different costs, constraints, and beliefs can justify a gap. The endowment interpretation requires considering those alternatives.",
    ],
    [
      "Is this the same as sentimental value?",
      "Sentimental value is one possible source of attachment. The endowment effect concerns a broader ownership-related valuation shift, including ordinary interchangeable goods.",
    ],
    "Would you buy this item at the price you now require to give it up?",
  ),
  "decoy-effect": g(
    "The decoy effect describes a choice shift caused by adding an option that is clearly worse than one existing option but not clearly worse than every alternative.",
    "The added option can make its dominating neighbor easier to justify. People may compare local pairs rather than evaluating every option against a stable set of preferences. The underlying attributes of the original choices have not improved.",
    "Choose before and after the third option appears. Check which option dominates the decoy and whether your comparison changed; one person's response is not proof of a universal effect.",
    [
      "A subscription comparison",
      "A reader compares a low-cost basic plan with a more expensive plan offering additional features.",
      "A third plan appears at nearly the premium price but with fewer features than the premium plan.",
      "The premium plan now has an easy comparison win, although its price and features are unchanged.",
    ],
    [
      "A third option necessarily makes the target objectively better.",
      "Its value has not changed. What changed is the comparison context, which may or may not affect a person's choice.",
    ],
    [
      "How can I evaluate an offer without being steered by a decoy?",
      "List the features you need and the prices you would accept before comparing the menu. Evaluate the original options against those criteria.",
    ],
    "Did the option improve, or did the menu supply a more flattering comparison?",
  ),
  "peak-end-rule": g(
    "The peak–end rule describes how evaluations of an experience can give disproportionate weight to its most intense moment and its ending, rather than its full duration.",
    "Remembered evaluation and the sum of moment-to-moment experience are different summaries. A simplified peak-and-ending score can rank experiences differently from an average. That formula illustrates a possible weighting pattern, not a complete model of human memory.",
    "Compare the average experience with the peak–end score as the ending changes. Notice when the rankings diverge, while keeping the rest of the sequence in view.",
    [
      "An uneven day out",
      "One outing is pleasant throughout but ends badly. Another has mixed moments and finishes especially well.",
      "You compare the entire sequence with a summary emphasizing the strongest moment and the ending.",
      "The remembered favorite may differ from the option with the better overall average. Both perspectives contain information.",
    ],
    [
      "Only the peak and ending matter to people.",
      "Duration, context, expectations, and other moments can matter too. The rule describes a tendency, not a universal memory algorithm.",
    ],
    [
      "Should a good ending excuse a bad experience?",
      "No. A favorable memory is not a substitute for good conditions throughout. Compare remembered satisfaction with the actual sequence of experiences.",
    ],
    "Are you improving the whole experience or only its most memorable moments?",
  ),
  "planning-fallacy": g(
    "The planning fallacy is a tendency to underestimate the time or resources needed for a task, even when similar past tasks took longer than expected.",
    "An inside view focuses on the plan working as intended. An outside view asks how comparable projects actually performed, including interruptions and revisions. A buffer can help, but its size should reflect relevant experience rather than an arbitrary feeling of caution.",
    "Compare the best-case estimate with the simulated completion distribution and the deadline including your buffer. These generated delays are teaching examples, not evidence about your actual project.",
    [
      "An eight-day plan",
      "A team estimates eight days of direct work and promises delivery in eight calendar days.",
      "It adds a 25% buffer, moving the deadline to ten days, then compares it with delays seen on similar projects.",
      "Two extra days may still be insufficient. A realistic estimate needs a reference class, not just a percentage added to an optimistic plan.",
    ],
    [
      "Adding any buffer makes an estimate realistic.",
      "The starting estimate may already omit substantial work. A buffer is useful only when its adequacy is checked against a relevant range of outcomes.",
    ],
    [
      "What is a reference class?",
      "A group of sufficiently similar completed tasks whose actual outcomes can inform the new estimate. Choosing comparable work matters as much as collecting a large sample.",
    ],
    "What happened on the last several projects that resembled this one?",
  ),
  "bass-diffusion": g(
    "The Bass diffusion model explores adoption driven by both external influence and imitation, producing patterns in new and cumulative adoption over time.",
    "External influence can seed adoption before there are many existing users. Imitation grows with the adopted share, while the remaining pool shrinks as people join. The interaction can create a peak in new adoption followed by a plateau in cumulative adoption.",
    "Distinguish new adopters per period from all adopters to date. Adjust external influence and imitation separately rather than assuming a steeper cumulative curve identifies which mechanism caused it.",
    [
      "A new product reaches a market",
      "Early customers adopt through direct exposure even when few peers use the product.",
      "As users accumulate, imitation encourages further adoption. Eventually fewer potential first-time adopters remain.",
      "New adoption can slow while cumulative adoption keeps rising. A declining flow is different from users leaving.",
    ],
    [
      "Every S-shaped adoption curve proves imitation.",
      "Other processes can produce similar shapes. The Bass model is one explanation with explicit parameters, not proof of a mechanism from appearance alone.",
    ],
    [
      "Is this the whole theory of diffusion of innovations?",
      "No. Bass models a specific aggregate adoption process. Broader diffusion research also examines communication, social networks, attributes of innovations, and different adopter groups.",
    ],
    "Are you tracking new adoption, the installed base, or continued use?",
  ),
  "median-voter": g(
    "The median voter theorem explains why, under specific assumptions, the position preferred by the median voter can defeat other positions in majority comparisons.",
    "On a single policy line with single-peaked preferences, moving away from the median leaves at least half of voters on the other side. In a simple two-candidate location game, competition can pull candidates toward the middle of the electorate.",
    "Move a candidate's position and compare vote shares under the stated voter preferences. The middle of this simulated distribution is an assumption; it need not match a real electorate's policy median.",
    [
      "Choosing a meeting time",
      "Five people prefer times at 9, 10, 11, 12, and 13, and each dislikes times more as they move away from their own ideal.",
      "The median preference is 11. In a pairwise vote against an earlier or later time, at least three people prefer 11.",
      "The result comes from the one-dimensional, single-peaked structure, not from every person preferring the same time.",
    ],
    [
      "Real elections must always be won by a centrist.",
      "Multiple issues, turnout, parties, unequal information, and non-single-peaked preferences can change the result. The theorem's assumptions matter.",
    ],
    [
      "Does median mean average?",
      "No. The median splits ordered voters into two halves. An extreme preference can move the arithmetic mean without changing the median.",
    ],
    "Can the relevant preferences be placed on one line with one preferred point each?",
  ),
  "el-farol-bar": g(
    "The El Farol bar problem explores a coordination dilemma: an activity is attractive when not too many people choose it, but everyone is trying to anticipate everyone else.",
    "A prediction can change the outcome it predicts. If many people expect a quiet evening and attend, it becomes crowded. If many expect crowds and stay home, it becomes quiet. Mixed attendance can avoid perfect synchronization, without guaranteeing a good evening.",
    "Change the attendance probability and compare crowding with missed opportunities. The bots in this simplified experiment use probability rules; they do not reproduce the full adaptive forecasting process of Arthur's original problem.",
    [
      "A small venue",
      "Ten friends each enjoy a venue only when total attendance stays at six or fewer.",
      "If all expect space and go, everyone encounters a crowd. If all expect crowding and stay home, the venue is empty.",
      "Their choices help create the condition they are trying to predict, making a single shared forecast difficult to sustain.",
    ],
    [
      "A correct crowd forecast stays correct after everyone follows it.",
      "Following the forecast changes attendance. That feedback can invalidate the original prediction.",
    ],
    [
      "Why use randomized attendance?",
      "Independent randomization can spread participation across evenings and reduce synchronized decisions. It still produces variation, and it is not the only possible coordination mechanism.",
    ],
    "Could everyone acting on the same prediction make that prediction fail?",
  ),
  "tullock-contest": g(
    "A Tullock contest models competition in which costly effort increases the probability of winning a prize, while effort costs are paid even by the loser.",
    "More effort can improve your chance relative to rivals, but each extra unit also has a direct cost. When rivals respond, participants can expend substantial resources competing over a prize without increasing its size. The contest rule determines how sharply effort translates into advantage.",
    "Compare winning probability with expected payoff after effort cost. A higher chance of winning is not automatically a better decision if buying that chance costs too much.",
    [
      "Two teams compete for a prize",
      "Two teams each spend ten units competing for a 30-unit prize, with equal chances of winning.",
      "Each has an expected prize of fifteen units and an expected payoff of five after its ten-unit cost.",
      "Raising effort may improve one team's chance, but the extra cost and the rival's response must be included.",
    ],
    [
      "Winning probability is the same as return on effort.",
      "Return depends on prize size, cost, and competing effort. Losers still bear their costs under this contest rule.",
    ],
    [
      "Does this describe every competition?",
      "No. Some contests refund costs, reward multiple winners, or produce useful output from effort. This model isolates a costly competition for a specified prize.",
    ],
    "Does extra competitive effort create value or mostly redistribute the chance of winning?",
  ),
};
