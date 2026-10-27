import { mosaicEntries } from "@/data/mosaic-expansion";
import { guide, type ReaderGuide } from "./types";
type Note = [
  string,
  string,
  [string, string, string, string],
  [string, string],
  [string, string],
  string,
];
const notes: Note[] = [
  [
    "flanker-effect",
    "Read matching and conflicting accuracy separately. A wrong key is an observed response, not a simulated slowing effect.",
    [
      "One centre arrow among distractors",
      "Inspect the central arrow before choosing left or right on the first trial.",
      "Continue through all ten trials, including the five with conflicting neighbours.",
      "Compare actual correct counts across conditions without interpreting this tiny untimed result as a reaction-time study.",
    ],
    [
      "Everyone must perform worse on the conflicting cards.",
      "A participant can answer every card correctly. The interface records that result instead of manufacturing a difference.",
    ],
    [
      "Why is there no speed score?",
      "Manual browser timing and ten unblinded trials do not reproduce a controlled reaction-time experiment; accuracy is the transparent outcome here.",
    ],
    "Which nearby cue competes with the action your user actually needs?",
  ],
  [
    "ebbinghaus-illusion",
    "Separate apparent equality from the radius difference revealed after you remove the surrounds.",
    [
      "Matching circles in context",
      "Keep the left central circle fixed and adjust the right circle to an apparent match.",
      "Record the match and remove the neighbouring circles while preserving both central radii.",
      "Read the physical difference as your selected adjustment, with numeric cues and screen settings still uncontrolled.",
    ],
    [
      "The surrounding circles physically resize the centre.",
      "Only your slider changes a central radius. The surrounds change context, while the recorded dimensions remain inspectable.",
    ],
    [
      "What if I choose exactly twenty?",
      "An exact physical match is a valid response. One self-adjustment neither proves nor disproves a general perceptual effect.",
    ],
    "Would the same chart mark look different in a more crowded panel?",
  ],
  [
    "muller-lyer-illusion",
    "The comparison concerns the horizontal shafts. Fins do not count toward the reported shaft length.",
    [
      "A length comparison with fins",
      "Adjust the lower shaft while both sets of opposing endpoint fins remain visible.",
      "Hide the fins and compare the fixed upper length of 240 with your selected lower length.",
      "Restore the fins to inspect context again; the drawing does not impose a particular perceptual error.",
    ],
    [
      "The longer overall decoration must contain the longer shaft.",
      "Overall decoration and endpoint-to-endpoint shaft length are different quantities. The reveal isolates the quantity being compared.",
    ],
    [
      "Is the selected difference an illusion-strength measurement?",
      "It is a record of one adjustment with visible numeric information, not a calibrated or controlled psychophysical estimate.",
    ],
    "Which decorative endpoints might change how a reader estimates distance?",
  ],
  [
    "simultaneous-contrast",
    "Compare RGB channels only as drawing specifications. Their difference is not a measured luminance difference.",
    [
      "Two patches on different surrounds",
      "Adjust the right patch until it appears to match the left patch on your display.",
      "Equalise the backgrounds without changing either inner square’s channel values.",
      "Compare the recorded values with the appearance and keep the uncontrolled screen conditions in mind.",
    ],
    [
      "Equal RGB guarantees equal appearance in every context.",
      "RGB specifies input values. Perceived brightness depends on context and display conditions as well as those values.",
    ],
    [
      "Does this calibrate my monitor?",
      "No. There is no physical luminance measurement, standard viewing environment or validated calibration procedure in this activity.",
    ],
    "Have you tested a colour against every background where it will be used?",
  ],
  [
    "figure-ground",
    "The cue records an instruction and changes contrast. It never reports that your perception actually switched.",
    [
      "One boundary, two organisations",
      "Inspect the neutral authored drawing for a central vessel or facing profiles.",
      "Choose a vessel cue and then a faces cue, following different sides of the same boundary.",
      "Describe which organisation stands out without interpreting a button choice as proof of an involuntary percept.",
    ],
    [
      "An ambiguous picture must look the same to every viewer.",
      "A shared drawing can support different organisations. Attention and context can make one interpretation more salient.",
    ],
    [
      "Is the original Rubin image reproduced here?",
      "This is an authored teaching drawing in the reversible figure–ground tradition, not a reproduction or validated version of a particular historical stimulus.",
    ],
    "What object does the negative space in your design invite people to see?",
  ],
  [
    "misinformation-effect",
    "Only the recalled colour and count are scored against the original scene; the later question is a suggestion, not an observation.",
    [
      "Keep the scene separate from the retelling",
      "Study the three blue vans and two green crates before hiding the original scene.",
      "Read the later question and answer the colour and count questions from your own recall.",
      "Reveal the original and distinguish any recall mismatch from proof of a particular memory mechanism.",
    ],
    [
      "Confident recall guarantees an unchanged memory.",
      "Confidence and accuracy are different. A later description can become part of what someone reports, but this small activity cannot isolate that cause.",
    ],
    [
      "What if the warning helps me resist the suggestion?",
      "That is a legitimate outcome. The disclosed teaching activity prioritises understanding over reproducing the conditions of a blinded memory study.",
    ],
    "Which detail came from the event and which from a later account?",
  ],
  [
    "false-consensus-effect",
    "The estimate error is relative to this stipulated twelve-person panel, not to a population prevalence.",
    [
      "Estimate support before inspecting a panel",
      "Select quiet or collaborative work as your own preference before estimating peer agreement.",
      "Reveal the panel containing four quiet-work and eight collaborative-work preferences.",
      "Compare your estimate with the relevant fraction while recognising that one error cannot diagnose false consensus.",
    ],
    [
      "People who resemble me are a representative audience.",
      "Similarity can be informative, but representativeness requires a sampling argument rather than a personal feeling of familiarity.",
    ],
    [
      "Does an accurate guess show I have no bias?",
      "One correct guess is compatible with many reasoning processes. This activity illustrates an estimation question rather than measuring a stable trait.",
    ],
    "Which audience would you need to sample before generalising your preference?",
  ],
  [
    "fundamental-attribution-error",
    "The revised rating belongs to the reader. The interface does not choose how much the role information should change it.",
    [
      "The quizmaster’s hidden advantage",
      "Rate the quizmaster’s ability using the initially visible six-versus-two performance comparison.",
      "Inspect the randomly assigned roles and the quizmaster’s control over private questions.",
      "Record a later rating and identify what the score does and does not reveal about underlying ability.",
    ],
    [
      "A better score always proves greater underlying ability.",
      "An outcome can reflect ability, opportunity and task design. A role advantage can change the evidence supplied by a score.",
    ],
    [
      "Must I reduce my ability rating?",
      "No. Your judgment is recorded without a prescribed answer; the useful step is considering the revealed situational constraint explicitly.",
    ],
    "Who had control over the task that produced the result you are judging?",
  ],
  [
    "transactive-memory",
    "Routing accuracy measures recall of this directory, not whether distributed expertise outperforms individual memory in a real team.",
    [
      "Find the teammate who holds the knowledge",
      "Study the navigation, tools and power-equipment responsibilities assigned to the three teammates.",
      "Hide the directory and route each of the six item requests to the person listed for that domain.",
      "Compare actual routing answers with the directory and note any knowledge-location confusion.",
    ],
    [
      "A team remembers only what every member individually knows.",
      "Members can contribute complementary knowledge when they know where expertise resides and can retrieve it reliably.",
    ],
    [
      "Why not make everyone memorise every item?",
      "The task highlights locating expertise rather than duplicating all knowledge. Real teams still need redundancy, access and maintenance of the directory.",
    ],
    "Which expertise would become difficult to find if one colleague were absent?",
  ],
  [
    "implementation-intentions",
    "The event ledger applies your exact cue–action rules. It does not estimate how often you would follow them outside the interface.",
    [
      "Turn an intention into an event rule",
      "Choose a concrete action for the new-message cue and another for the start of a work block.",
      "Run the authored sequence and inspect which events trigger which chosen actions.",
      "Revise a rule if its literal application would interrupt the goal you meant it to support.",
    ],
    [
      "Any if–then sentence guarantees successful behaviour change.",
      "A cue and response must be feasible and relevant, and following the plan still depends on circumstances that this ledger does not model.",
    ],
    [
      "Where is the productivity score?",
      "No productivity effect is assumed or measured. The observable result is whether the stated rule routes each event to the intended action.",
    ],
    "Is your trigger recognisable at the moment the response should occur?",
  ],
  [
    "confidence-intervals",
    "Count intervals containing zero after the reveal. Coverage is a property of the repeated procedure, not a posterior probability for one fixed interval.",
    [
      "Forty studies of a fixed mean",
      "Generate forty independent Normal sample means with the selected sample size and known variance.",
      "Reveal the fixed generating mean of zero and inspect which intervals cross its vertical reference line.",
      "Increase sample size to narrow intervals while keeping the same nominal long-run coverage rule.",
    ],
    [
      "A 95% interval contains 95% of observations.",
      "The interval estimates a population parameter. It is not a prediction interval for individual observations or a description of their central spread.",
    ],
    [
      "Must exactly thirty-eight intervals contain zero?",
      "No. Ninety-five percent is a long-run procedure rate under the assumptions; a batch of forty can have a different realised count.",
    ],
    "Which parameter, sampling process and interval procedure justify your uncertainty statement?",
  ],
  [
    "statistical-power",
    "Expected power and the rejection fraction from a hundred studies answer related but different questions; finite simulation counts fluctuate.",
    [
      "An effect that a small study can miss",
      "Set a positive standardised mean difference and inspect expected two-sided z-test power.",
      "Increase sample size while preserving the generating effect and the fixed rejection threshold.",
      "Set the effect to zero and interpret rejections as false positives rather than successful detection of a real shift.",
    ],
    [
      "A non-significant test proves the effect is zero.",
      "A test can fail to reject despite a nonzero effect, particularly when the sampling distribution is broad relative to that effect.",
    ],
    [
      "Does high power make an estimate unbiased?",
      "Power concerns rejection probability under a specified alternative. It does not repair selection bias, confounding, measurement error or an inappropriate model.",
    ],
    "What effect size would matter before you decide how much evidence to collect?",
  ],
  [
    "sequential-probability-ratio-test",
    "Read the accumulated log likelihood ratio against the declared boundaries. A capped unresolved stream remains inconclusive.",
    [
      "A coin stream with a planned stopping rule",
      "Choose the generating coin before observing the sequence under hypotheses 0.4 and 0.6.",
      "Observe outcomes and add or subtract log 1.5 until the first crossing of a log-nine boundary.",
      "Interpret the selected hypothesis as a model-dependent decision, retaining nominal error and overshoot limitations.",
    ],
    [
      "Repeatedly looking at any p-value preserves its fixed-sample error guarantee.",
      "Optional stopping needs an appropriate design. This board uses likelihood-ratio boundaries intended for sequential observations.",
    ],
    [
      "What happens if neither boundary is crossed?",
      "After the display cap of two hundred observations, the result is inconclusive; the interface does not silently choose a hypothesis.",
    ],
    "Was the stopping rule chosen before the evidence started arriving?",
  ],
  [
    "bootstrap-resampling",
    "The histogram describes means of resamples from the observed empirical distribution, not new observations from the unknown population.",
    [
      "A six-value sample and its resampled means",
      "Inspect the observed values one, two, two, four, seven and nine before generating resamples.",
      "Open an individual size-six resample to see repeated observations and its calculated mean.",
      "Omit nine and compare the changed range, recognising this as sensitivity analysis rather than correction of an outlier.",
    ],
    [
      "Resampling creates information about outcomes the sample never captured.",
      "The empirical bootstrap can reuse observed values in new combinations, but it cannot discover an absent tail or undo biased sampling.",
    ],
    [
      "Are the percentile endpoints guaranteed to cover the population mean?",
      "No. Small samples, skew and estimator behaviour affect coverage; the displayed fifth and 195th ordered means are a teaching percentile range.",
    ],
    "Which important population behaviour might be absent from the sample you are resampling?",
  ],
  [
    "anscombes-quartet",
    "Plot shape and point influence matter even when rounded slopes and correlations look nearly identical.",
    [
      "Four regressions with matching summaries",
      "Switch among the four original rounded datasets and compare their least-squares summaries.",
      "Inspect curvature, an unusual response and the leverage point rather than relying on a correlation alone.",
      "In dataset four omit the largest-x point; all remaining x values equal eight, making slope and correlation undefined.",
    ],
    [
      "The same correlation means the same relationship.",
      "A summary can conceal nonlinearity, leverage and outliers. Similar correlation coefficients do not establish interchangeable data structures.",
    ],
    [
      "Why does removing a point sometimes remove the slope entirely?",
      "Least-squares slope divides by variation in x. With no variation in x, the denominator is zero and a finite slope is unidentified.",
    ],
    "What would you plot before trusting the next numerical summary you receive?",
  ],
  [
    "loan-amortization",
    "Compare remaining principal at the same month along both paths. A lower final interest total is not a lower selected monthly payment.",
    [
      "Repay a fictional ten-thousand-unit loan",
      "Use the initial fixed annual rate and term to inspect the base level monthly payment.",
      "Add a fixed extra payment and compare the shortened schedule at identical calendar months.",
      "Inspect the payoff month and total interest, keeping unrounded amounts and omitted fees separate from an actual contract.",
    ],
    [
      "Every equal monthly payment repays the same principal amount.",
      "Interest is charged on the changing balance first, so the principal component generally grows as outstanding principal falls.",
    ],
    [
      "Why is the final payment smaller?",
      "The model caps payment at remaining principal plus that month’s interest, preventing a negative final balance or an unnecessary overpayment.",
    ],
    "Which portion of your payment actually reduces the balance on which future interest accrues?",
  ],
  [
    "debt-snowball-avalanche",
    "Compare both schedules under the identical monthly budget. First payoff timing and total interest are separate outcomes.",
    [
      "Allocate one budget across three debts",
      "Inspect the three balances, rates and twenty-five-unit minimum payments before choosing a priority.",
      "Pay several months under one rule and note when a complete debt disappears from the active list.",
      "Compare complete plans under the same budget, without assuming the model captured motivation, fees or a changing income.",
    ],
    [
      "The quickest first payoff must minimise total interest.",
      "Small balances can disappear quickly even when a larger debt has a higher rate. The two objectives need not select the same repayment order.",
    ],
    [
      "Does the model recommend a personal debt plan?",
      "It compares declared arithmetic rules only. Actual minimums, penalties, cash-flow needs and sustained adherence can change a practical decision.",
    ],
    "Are you optimising first completion, interest cost or a realistic ability to maintain payments?",
  ],
  [
    "bond-convexity",
    "Compare exact price and both approximations at the selected yield shift. A convexity measure is a sensitivity, not a return forecast.",
    [
      "Reprice a fixed-coupon bond",
      "Start with the face-one-hundred bond paying five annually at a five-percent yield.",
      "Move the yield by one percentage point and compare linear and quadratic estimates with exact discounting.",
      "Try a larger move or longer maturity to inspect where a local approximation becomes less accurate.",
    ],
    [
      "Duration exactly predicts every yield-driven price change.",
      "Duration is a first derivative evaluated locally. Convexity adds curvature, and even the second-order approximation can diverge for larger changes.",
    ],
    [
      "Do all bonds have this same positive curvature?",
      "No. Embedded options and changing cash flows can alter the relationship; this board uses an option-free fixed-payment bond.",
    ],
    "How large a move can your local sensitivity reasonably approximate?",
  ],
  [
    "dividend-irrelevance",
    "Add retained share value and after-tax cash. A higher share count after reinvestment does not itself mean greater wealth.",
    [
      "A cash distribution from a fictional firm",
      "Pay twenty units from a firm worth one hundred with ten outstanding shares and no tax.",
      "Combine the holder’s eight-unit remaining share value with two units of received cash to recover ten.",
      "Introduce dividend tax and inspect the lost cash, then toggle reinvestment without attributing new value to the extra shares.",
    ],
    [
      "A dividend is extra wealth on top of an unchanged firm value.",
      "A cash distribution removes cash from the firm in the benchmark accounting. Whether payout matters in practice depends on assumptions the benchmark deliberately removes.",
    ],
    [
      "Is the thinker association an invention claim for every payout idea?",
      "No. Modigliani and Miller are associated with the benchmark proposition; the teaching accounting also uses a contextual source and provisional editorial associations.",
    ],
    "Did the distribution create value, move value or lose value through a friction?",
  ],
  [
    "efficient-frontier",
    "The upper branch is efficient only within the two assumed assets and the stated no-shorting constraint.",
    [
      "Mix two hypothetical return streams",
      "Set correlation to zero and vary the weight of the higher-return, higher-volatility second asset.",
      "Reveal the minimum-variance point and compare lower-return points that take more risk than it does.",
      "Change correlation to inspect how diversification opportunities depend on an uncertain input, not just on asset count.",
    ],
    [
      "An efficient portfolio is guaranteed safe or profitable.",
      "Efficiency describes a tradeoff between supplied mean and variance within a feasible set; it does not guarantee realised returns or capture every form of risk.",
    ],
    [
      "Why can adding a riskier asset initially reduce portfolio volatility?",
      "The covariance term can offset some individual variance when returns are not perfectly correlated. The exact reduction depends on weights and the supplied correlation.",
    ],
    "Which estimated input would move your supposed frontier most if it were wrong?",
  ],
  [
    "dutch-auction",
    "Your profit is eighty minus the accepted price; passing a rival’s threshold ends the opportunity rather than giving you a cheaper item.",
    [
      "Stop a descending price clock",
      "Lower the initial one-hundred-unit clock in five-unit ticks while your value stays eighty.",
      "Accept at fifty-five to win against the scripted highest rival threshold of fifty.",
      "In a reset attempt lower to fifty and observe the rival purchase, separating this bot demonstration from an equilibrium bidding prescription.",
    ],
    [
      "Waiting always improves the auction outcome.",
      "A lower price improves surplus only if the item remains available. A rival can end the auction before the next acceptable tick.",
    ],
    [
      "Why is fifty-five the cheapest winning price here?",
      "The discrete clock lets a rival accept as soon as a tick reaches fifty. Fifty-five is the preceding tick, under the declared ordering rule.",
    ],
    "What information would change how long you were willing to wait?",
  ],
  [
    "all-pay-auction",
    "Net payoff subtracts your bid whether you win, tie or lose. The ten-case average describes only the declared uniform rival.",
    [
      "Buy a chance at a twelve-unit prize",
      "Select an integer bid while the rival’s one-through-ten bid remains hidden.",
      "Submit once and subtract the full bid from either twelve, six on a tie, or zero on a loss.",
      "Compare that realised payoff with the exact ten-rival average without interpreting one win as evidence of a profitable strategy.",
    ],
    [
      "Only the winning bidder pays in every auction.",
      "All-pay rules explicitly charge everyone. This difference changes expected costs and can make aggressive losing effort expensive.",
    ],
    [
      "Does the game solve a strategic all-pay equilibrium?",
      "No. It compares choices against a fixed uniform bot; changing the rival strategy or tie rule would change the payoff calculation.",
    ],
    "Which effort costs remain even when you do not receive the prize?",
  ],
  [
    "common-knowledge",
    "Count simultaneous silent rounds under the same public protocol; a public announcement removes a world that private observation alone may not remove.",
    [
      "Three blue hats and a public fact",
      "Keep all three hats blue and enable the public announcement that at least one is blue.",
      "Hear two silent rounds as participants eliminate worlds in which someone would have known earlier.",
      "Hear the third-round deduction, then reset without the announcement to see why silence no longer starts the same induction.",
    ],
    [
      "Everyone privately knowing a fact makes it common knowledge.",
      "Mutual knowledge includes what each person knows about others’ knowledge at every level. A public event can change these higher-order beliefs.",
    ],
    [
      "Why does nobody act on the first round with three blue hats?",
      "Each blue-hatted person still considers a world with only the other two blue, where those people would also initially be unsure.",
    ],
    "Does your coordination message establish that others know everyone received it?",
  ],
  [
    "screening-contracts",
    "The customer chooses from the entire menu, including opting out. A seller cannot assign contracts simply by naming a target audience.",
    [
      "Two tiers and two private values",
      "Set quality-one price to four and quality-two price to twelve with the stated production costs.",
      "Inspect each customer’s utility from both tiers and the higher-quality tie rule to see separating choices.",
      "Raise the high price to fourteen and observe both customers selecting the lower tier, reducing total seller profit in this example.",
    ],
    [
      "A high-value customer automatically buys the expensive tier.",
      "The customer compares net utilities across all options. A cheaper tier can provide more surplus even when willingness to pay is high.",
    ],
    [
      "What role does the outside option play?",
      "A negative-utility purchase is rejected in favour of zero utility, while the declared tie rule handles exact equality transparently.",
    ],
    "Would the customer you hope to upsell actually prefer your cheaper option?",
  ],
  [
    "tiebout-sorting",
    "Gross benefits after tax and moving-cost-adjusted benefits are displayed separately, with capacity fixed at two homes per town.",
    [
      "Improve fit without creating extra homes",
      "Start with one park lover and one quiet lover in each of the two towns.",
      "With zero moving cost, swap the misplaced households to raise aggregate benefits from seventeen to twenty-eight.",
      "Reset with moving cost six and perform the same two-household swap; net benefits become sixteen, below the initial seventeen.",
    ],
    [
      "Better residential fit makes any move socially beneficial.",
      "Mobility costs can outweigh the fit gain, and aggregate benefits omit distribution, exclusion and externalities even when the arithmetic improves.",
    ],
    [
      "Are service bundles funded endogenously here?",
      "No. Taxes and benefits are fixed to isolate preference fit and moving costs; the activity is not a complete local-public-finance model.",
    ],
    "Who lacks the practical option to move in the system you are analysing?",
  ],
  [
    "le-chatelier-principle",
    "The direction label comes from comparing Q with K; equilibrating changes composition while preserving the current total A plus B.",
    [
      "Add reactant to a balanced vessel",
      "Begin with fifty A and fifty B at equilibrium constant one, so Q equals one.",
      "Add ten A to lower Q below K, then predict net conversion toward B before equilibrating.",
      "Equilibrate to fifty-five of each and check that the total stays one hundred ten rather than reverting to its original value.",
    ],
    [
      "Equilibrium restores every original concentration.",
      "The system reaches a composition satisfying the equilibrium condition under the new constraint; added material changes the conserved total.",
    ],
    [
      "Why is there no reaction-time animation?",
      "The endpoint is calculated algebraically without rate constants. An invented speed would add an unsupported kinetic claim.",
    ],
    "Which quantity is conserved after your disturbance, and which ratio must settle?",
  ],
  [
    "law-of-the-minimum",
    "The smallest resource index determines yield. A token spent elsewhere can change a bar without changing the outcome.",
    [
      "Reach seventy with six tokens",
      "Inspect initial nitrogen thirty, phosphorus sixty and light eighty, giving yield thirty.",
      "Spend four tokens on nitrogen and one on phosphorus, lifting both limiting indices to seventy.",
      "Compare a wasted early light token with the same token directed to the current bottleneck, remembering the minimum rule is an authored simplification.",
    ],
    [
      "More of any useful input must immediately increase output.",
      "An input that is already abundant need not relax the binding constraint. Real systems may also have interacting limits beyond this strict minimum rule.",
    ],
    [
      "Does the lowest raw resource amount always limit a real plant?",
      "The relevant comparison is availability relative to requirement, not arbitrary raw quantities; the board uses normalised teaching indices.",
    ],
    "What would become the next constraint if you removed today’s bottleneck?",
  ],
  [
    "ice-albedo-feedback",
    "Compare trajectories at the same sunlight and feedback setting. Thermal-step counts are not years or calibrated climate time.",
    [
      "One sunlight value, two starting states",
      "Run the cold initial state at incoming sunlight 1,360 with ice feedback enabled.",
      "Switch to the warm initial state under the same sunlight and run the same number of thermal steps.",
      "Disable feedback to separate initial-state persistence from the temperature-dependent reflectivity mechanism, without extrapolating a global forecast.",
    ],
    [
      "Positive feedback means temperature always increases.",
      "Positive means reinforcing: an initial cooling can increase reflectivity and reinforce further cooling just as warming can reinforce ice loss.",
    ],
    [
      "Does this show when real Earth will cross a tipping point?",
      "No. Its parameters and time steps are teaching assumptions; missing geography, clouds, ocean dynamics and carbon feedbacks prevent that inference.",
    ],
    "Which loop reinforces a change, and what other processes could counter it?",
  ],
  [
    "synchronization",
    "A stable phase gap indicates frequency locking, not necessarily equal phase. Plot wraps at plus or minus pi are coordinate changes.",
    [
      "Couple two initially different rhythms",
      "Advance the uncoupled oscillators to see the phase difference drift under speeds one and one point four.",
      "Raise coupling above zero point two and allow several model time units for a stable gap to emerge.",
      "Compare the bounded gap with the uncoupled drift while retaining the finite integration and two-node assumptions.",
    ],
    [
      "Synchronisation requires both hands to point in exactly the same direction.",
      "Frequency-locked oscillators can maintain a stable nonzero phase difference when their natural frequencies differ.",
    ],
    [
      "Why does the phase plot sometimes jump vertically?",
      "Angles are wrapped to the interval from minus pi to pi; crossing that reporting boundary does not make the physical oscillator jump.",
    ],
    "Are two processes sharing a frequency, a phase, or only an occasional coincidence?",
  ],
  [
    "paradox-of-enrichment",
    "Late-window minima and maxima describe the displayed trajectory. A low numerical population is not an extinction event in this deterministic model.",
    [
      "Enrich a predator–prey system",
      "Run carrying capacity one point five for two hundred model time units and inspect late population variation.",
      "Increase capacity to six and restart from the same prey and predator indices to expose larger sustained oscillations.",
      "Compare the late-window prey range and identify the saturating predation feedback rather than assuming more resources guarantee stability.",
    ],
    [
      "More available food always stabilises every population.",
      "In some consumer–resource systems, enrichment amplifies delayed interactions and destabilises coexistence. This is conditional, not a universal ecological law.",
    ],
    [
      "Where does the threshold seven-thirds come from?",
      "It is the local stability boundary for the fixed growth, handling, conversion and mortality values in this particular Rosenzweig–MacArthur model.",
    ],
    "Could improving an average resource level worsen the system’s lowest trough?",
  ],
  [
    "dijkstras-algorithm",
    "Tentative distances are upper bounds that can improve. Settled distances are certified only because every edge weight is nonnegative.",
    [
      "A cheap route with several edges",
      "Settle A and compare its direct tentative costs to B and C in the weighted graph.",
      "Settle B to improve C through the cheaper two-edge route, then continue through C and D.",
      "Settle E at total cost seven and trace A–B–C–D–E rather than counting connections as if every edge had equal cost.",
    ],
    [
      "The path with the fewest connections is always cheapest.",
      "Unequal edge weights make total weight, rather than edge count, the relevant objective. A longer sequence can have a lower cost.",
    ],
    [
      "Can this settling logic handle negative edges?",
      "No. A negative edge can later create a cheaper route to a supposedly final node, invalidating the argument used here.",
    ],
    "Are you minimising the number of steps or their actual accumulated cost?",
  ],
  [
    "a-star-search",
    "Read path length and expanded cells as separate outcomes. Changing walls or heuristic restarts the search so comparisons remain interpretable.",
    [
      "Guide a route through an editable maze",
      "Find a route with weight zero and record expanded cells and the returned path length.",
      "Restart using weight one, whose Manhattan estimate never overstates remaining cost on this orthogonal unit grid.",
      "Try weight three or edit walls, comparing actual results without assuming weighted search always returns the same shortest path.",
    ],
    [
      "A stronger heuristic weight always gives an equally good path faster.",
      "Overweighting the estimate can reduce exploration but sacrifices the admissibility guarantee. Some maps return the same route, others need not.",
    ],
    [
      "What happens if walls isolate the goal?",
      "The open set is exhausted and the board reports no route; it does not draw a path through walls or invent a distance.",
    ],
    "Which solution-quality guarantee are you willing to exchange for less search?",
  ],
  [
    "beladys-anomaly",
    "Compare fault counts after the same number of requests. A larger FIFO cache has a different eviction history, not simply the smaller cache plus one page.",
    [
      "A twelve-request cache counterexample",
      "Replay the full declared stream through the three-slot and four-slot FIFO caches.",
      "Inspect the complete fault totals of nine and ten, tracing the queue contents where their histories diverge.",
      "Switch to LRU and replay the identical requests to see why the policy’s inclusion property changes the conclusion.",
    ],
    [
      "Increasing cache capacity can never increase misses under any policy.",
      "FIFO is not a stack policy and can exhibit the anomaly. LRU retains the inclusion property that prevents it under the same request stream.",
    ],
    [
      "Does the example mean a smaller cache is generally better?",
      "No. It is a counterexample to a universal claim, not a workload distribution or a recommendation for smaller memory.",
    ],
    "Does your performance assumption depend on a policy property you have actually checked?",
  ],
  [
    "no-free-lunch",
    "The exact family averages matter more than one hidden objective. Uniformly averaging a different family changes the information available to exploit.",
    [
      "Add structure to a four-location search",
      "Probe an objective from the sixteen equally likely binary functions using one non-repeating order.",
      "Compare the exact mean probe cost of one point eight seven five for both orders over that unrestricted family.",
      "Restrict to nondecreasing objectives and compare left-to-right average two point eight with right-to-left one point six.",
    ],
    [
      "No free lunch says algorithm design cannot improve anything.",
      "The result identifies assumptions under which advantages cancel. Practical tasks are structured, so choosing suitable assumptions can make design valuable.",
    ],
    [
      "Why count four probes when no location contains one?",
      "Exhausting the domain certifies failure and costs four queries. Counting only successful objectives would change the stated comparison.",
    ],
    "What structure makes your chosen algorithm preferable on the tasks that actually occur?",
  ],
  [
    "gerrymandering",
    "Toggle maps without changing voters for the controlled comparison. Clicking a voter changes a different variable: the vote geography itself.",
    [
      "Translate the same twenty-five votes into seats",
      "Keep the initial thirteen A votes and twelve B votes, with five people in every district.",
      "Compare four A seats under row districts with two A seats under column districts, preserving all votes.",
      "Edit a voter and compare both maps again, distinguishing map effects from changed preferences and avoiding claims of real-world intent.",
    ],
    [
      "A vote–seat mismatch alone proves illegal gerrymandering.",
      "Representation depends on geography, map constraints and electoral rules; legal and intent judgments require evidence beyond a single mismatch.",
    ],
    [
      "Are the row and column districts comparable in population?",
      "Yes. Every district contains exactly five equal-population cells and remains contiguous under either of these two maps.",
    ],
    "What comparison maps and constraints would make a representation claim persuasive?",
  ],
  [
    "buridans-ass",
    "Both routes always have equal current value. Waiting reduces that shared value; the random button supplies a choice rather than information.",
    [
      "Resolve a tie with an opportunity cost",
      "Inspect two routes each initially worth ten and confirm that no hidden difference is promised.",
      "Wait three turns and observe both available rewards fall to seven under the explicit cost rule.",
      "Choose either route or use the fair tie-breaker, recovering the same seven rather than an improved estimate.",
    ],
    [
      "A rational decision always needs one option to be strictly better.",
      "When equivalent options are available and delay is costly, an arbitrary fair tie-breaker can implement a choice without discovering a comparative advantage.",
    ],
    [
      "Does this mean deliberation is generally pointless?",
      "No. Real investigation can reveal valuable differences. The lesson depends on the stipulated perfect tie and absence of new information here.",
    ],
    "What stopping rule would tell you that two low-stakes options are close enough?",
  ],
  [
    "marys-room",
    "Before-and-after interpretations are judgments about an argument. Seeing the red panel is not evidence that a metaphysical position has won.",
    [
      "Separate kinds of learning in Mary’s room",
      "Accept the scenario’s stipulated complete physical knowledge before choosing a prediction about Mary’s first colour experience.",
      "Reveal the red illustration and consider whether the alleged gain is a fact, ability, acquaintance or no new knowledge.",
      "Record a later interpretation and identify which premise or inference your position accepts or rejects.",
    ],
    [
      "Knowing the physical facts obviously settles what an experience is like.",
      "That is the point disputed by the knowledge argument. Responses distinguish new facts from new abilities or modes of knowing, rather than assuming one definition resolves it.",
    ],
    [
      "Is this a real experiment about colour deprivation?",
      "No. Mary’s complete physical knowledge is a philosophical stipulation that the interface cannot empirically establish or reproduce.",
    ],
    "When you say someone learned something new, which kind of knowledge do you mean?",
  ],
  [
    "gettier-problem",
    "Truth and initial justification are stipulated in both histories. The changed variable is how the supporting label connects to the true contents.",
    [
      "A label that happens to be right",
      "Judge a belief that a reliably labelled sealed parcel contains gold, with truth and justification initially supplied.",
      "Reveal the accidental label swap and the independent coincidence that this parcel also contains gold.",
      "Compare the ordinary tracking history and articulate why your knowledge judgment does or does not change despite the same true proposition.",
    ],
    [
      "Every justified true belief must be knowledge.",
      "Gettier-style cases challenge sufficiency by introducing relevant epistemic luck. Competing theories propose different ways to handle that challenge.",
    ],
    [
      "Does the parcel reproduce Gettier’s original example?",
      "It is an authored Gettier-style illustration of accidental truth, not a claim to reproduce either original case word for word.",
    ],
    "Would your reason still have supported the same answer if the truth had been different?",
  ],
  [
    "chinese-room",
    "The numerical score concerns exact lookup compliance. The later philosophical interpretation is recorded separately and has no correctness score.",
    [
      "Follow a rulebook without supplied meanings",
      "Read the four symbol mappings before answering each incoming symbol with the specified output.",
      "Complete three messages and inspect how many outputs followed the book exactly.",
      "Consider the operator and system-level replies without treating successful lookup as proof of understanding or proof of its absence.",
    ],
    [
      "Correct output by itself settles whether a system understands.",
      "The argument disputes that inference, and the systems reply disputes the argument’s focus on the operator. This small board cannot resolve the debate.",
    ],
    [
      "Does the activity simulate an actual language model?",
      "No. A four-rule lookup is deliberately limited and supplies no semantics; modern systems require separate empirical and philosophical analysis.",
    ],
    "Which claim does your performance test establish, and which claim are you adding beyond it?",
  ],
  [
    "repugnant-conclusion",
    "Total and average evaluations apply different rules to the same invented populations. Neither is silently treated as the ethically correct answer.",
    [
      "Double the total while reducing each life’s score",
      "Keep World A at one hundred people with well-being ten, giving total one thousand.",
      "Set World B to ten thousand people at well-being zero point two, giving total two thousand but a much lower average.",
      "Compare the two evaluation rules and record your own judgment, recognising the positive invented scale and missing ethical dimensions.",
    ],
    [
      "A larger welfare total automatically means every person is better off.",
      "Totals can rise through population size while individual well-being falls. Whether the larger total makes a world better requires an additional ethical argument.",
    ],
    [
      "Does average welfare avoid every population-ethics problem?",
      "No. Different aggregation rules face different challenges; the board isolates one tension without presenting a complete ethical theory.",
    ],
    "What would justify aggregating this outcome across different numbers of people?",
  ],
];
export const mosaicGuides: Record<string, ReaderGuide> = Object.fromEntries(
  notes.map(([id, read, example, misconception, qa, reflection]) => {
    const e = mosaicEntries.find((e) => e.id === id)!;
    return [
      id,
      guide(e.idea, e.mechanism, read, example, misconception, qa, reflection),
    ];
  }),
);
