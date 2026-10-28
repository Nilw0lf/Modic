import type { PrismNote } from "./prism";
export const prismMindNotes: PrismNote[] = [
  [
    "poisson-process",
    "Event rate is an expectation, not a timetable. The count revealed so far and expected count over that duration can differ substantially.",
    [
      "Reveal a constant-rate arrival stream",
      "Choose two expected arrivals per minute before revealing the first minute.",
      "Reveal successive minutes and inspect uneven gaps in the same seeded event stream.",
      "Compare the realised ten-minute total with expectation twenty without demanding exact equality.",
    ],
    [
      "A constant arrival rate means equal spacing between events.",
      "The homogeneous Poisson model has random exponential gaps; its rate describes average events per unit time, not periodic scheduling.",
    ],
    [
      "Would this model represent a scheduled bus exactly?",
      "No. Schedules, time-varying service and dependence between arrivals can violate the stationary independent-increments assumptions.",
    ],
    "Is your arrival assumption about a mean rate or an actual schedule?",
  ],
  [
    "memoryless-property",
    "The chance of initially reaching a long wait becomes small, while the conditional next-attempt probability stays fixed under independence.",
    [
      "Separate elapsed rarity from remaining odds",
      "Set already observed failures to zero and inspect the next-attempt probability twenty percent.",
      "Raise previous failures to thirty while keeping the next-three-attempt window fixed.",
      "Read the unchanged chance 48.8 percent of at least one success in those three future attempts.",
    ],
    [
      "A long unsuccessful wait makes an independent success due.",
      "The conditional future distribution stays the same for geometric attempts; the rarity of the observed past does not change the next independent trial.",
    ],
    [
      "Does memorylessness describe worn-out equipment?",
      "Not automatically. Age-dependent failure rates violate the constant-probability model, making elapsed age relevant information.",
    ],
    "Which assumption makes elapsed waiting irrelevant to the remaining distribution?",
  ],
  [
    "randomised-response",
    "The raw prevalence estimate can exceed the parameter’s range through sampling noise. Keeping it unclipped exposes that limitation rather than hiding it.",
    [
      "Recover a population signal from deliberate noise",
      "Keep the fictional trait prevalence forty percent and collect one hundred reports.",
      "Compare the realised yes fraction with expected yes fraction 0.45 under the declared coin protocol.",
      "Apply twice the yes fraction minus one-half and distinguish estimation error from an incorrect reporting formula.",
    ],
    [
      "Deliberately random answers make every aggregate estimate impossible.",
      "A known reporting mechanism can preserve recoverable population information while obscuring individual answers, subject to compliance and sampling assumptions.",
    ],
    [
      "Is this a production anonymity guarantee?",
      "No. The teaching protocol assumes perfect compliance and synthetic respondents; implementation, disclosure and adversarial issues require additional analysis.",
    ],
    "Which random mechanism and compliance assumption make the aggregate inversion valid?",
  ],
  [
    "arcsine-law",
    "The average occupation fraction and the distribution of individual occupation fractions answer different questions. Fair increments do not enforce equal time in each realised path.",
    [
      "Look beyond a fair walk’s average sign",
      "Generate a batch of twenty one-hundred-step symmetric walks and inspect occupation bins.",
      "Increase the batch size to reduce the roughness of the histogram without changing each walk’s horizon.",
      "Compare the mean near one-half with the number of walks spending below twenty or above eighty percent positive.",
    ],
    [
      "Fair random walks spend about half of every finite path above zero.",
      "Symmetry governs ensemble averages, while individual histories can remain on one side for much of the horizon.",
    ],
    [
      "Is the plotted histogram the exact continuous arcsine density?",
      "No. It records finite discrete walks under a declared zero convention; the continuous law is a limiting reference.",
    ],
    "Have you mistaken a symmetric average across histories for a typical pattern within each history?",
  ],
  [
    "bertrands-chord-paradox",
    "Length comparisons use the same unit circle and √3 threshold. Different midpoint-distance measures, rather than arithmetic errors, explain the protocol probabilities.",
    [
      "Give random chord three precise meanings",
      "Draw a batch under random endpoints and compare its long-chord fraction with one-third.",
      "Switch to uniform radial midpoint distance and compare the new batch with one-half.",
      "Switch to uniform midpoint area, where distance is square root of a uniform draw, and compare with one-quarter.",
    ],
    [
      "Calling a chord random already specifies its probability distribution.",
      "A randomisation instruction must define a sampling measure. Different physical or mathematical protocols can answer different precise questions.",
    ],
    [
      "Why take a square root for uniform midpoint area?",
      "Disk area grows with squared radius, so uniform area corresponds to radius equal to the square root of a uniform unit draw.",
    ],
    "Which sampling mechanism hides inside the word random in your question?",
  ],
  [
    "chunking",
    "Compare the recalled sequence with the exact original. Presentation blocks and meaningful learned chunks should not be treated as identical psychological constructs.",
    [
      "Group a sequence without changing its digits",
      "Study the seeded eight digits using the grouped or ungrouped layout.",
      "Hide the sequence and enter exactly eight recalled digits before checking.",
      "Read the actual position-match count without treating one self-paced result as a capacity measurement.",
    ],
    [
      "Visible grouping automatically proves a working-memory benefit.",
      "Useful chunks often exploit learned structure. Arbitrary spacing, numeric cues and study time can influence one attempt without isolating that mechanism.",
    ],
    [
      "Can I conclude eight digits exceed everyone’s memory span?",
      "No. The activity supplies neither a standardised span procedure nor controlled timing, and individuals can use many strategies.",
    ],
    "What prior knowledge makes your proposed grouping a meaningful unit?",
  ],
  [
    "von-restorff-effect",
    "The ledger preserves actual recall for every original item. The distinctive word is not silently counted correct merely because it was highlighted.",
    [
      "Recall a distinctive item among ordinary words",
      "Study eight words, noting the differently styled forest item in context.",
      "Hide the list and enter recalled words separated by commas.",
      "Inspect whether forest and the ordinary items were reported, retaining the uncontrolled exposure and warning as limitations.",
    ],
    [
      "Highlighting any item guarantees that it will be remembered.",
      "Distinctiveness can support recall in relevant conditions, but salience, task, attention and context all matter; this activity imposes no benefit.",
    ],
    [
      "Why is there no claim of a measured isolation effect?",
      "There is no matched control group or calibrated exposure, so the ledger records a response rather than isolating a causal effect.",
    ],
    "Would this item remain distinctive if every item received the same emphasis?",
  ],
  [
    "dual-coding",
    "A correct pair count concerns these four mappings. It does not establish that a person has a fixed visual or verbal learning style.",
    [
      "Add a second representation to an arbitrary mapping",
      "Study four code-to-word pairs with text alone or the optional visual cues.",
      "Hide the pairs and choose the word for each presented code.",
      "Count your actual correct mappings while separating multiple representations from a validated individual learning preference.",
    ],
    [
      "Dual coding means teaching only in someone’s preferred sensory style.",
      "The account concerns representational systems and retrieval routes, not a rule that learners should be assigned one fixed modality.",
    ],
    [
      "Does the icon condition isolate a causal advantage?",
      "No. Exposure time, prior associations and the authored cues are uncontrolled; one recall attempt is illustrative rather than an experiment establishing a benefit.",
    ],
    "Does the second representation add relevant structure or merely decoration?",
  ],
  [
    "spacing-effect",
    "The schedule manipulates intervening items, not a fixed elapsed delay. Immediate recall and long-term retention remain different outcomes.",
    [
      "Separate repeated code-pair exposures",
      "Choose blocked or interleaved exposures before advancing the study sequence.",
      "Inspect eight cards so each of four pairs appears exactly twice.",
      "Complete recall and interpret the actual count without converting this short manual schedule into a long-term retention forecast.",
    ],
    [
      "Spacing research provides one universally optimal review interval.",
      "Useful intervals depend on retention goals, material and timing. This display changes item separation without calibrating those broader conditions.",
    ],
    [
      "Why does the activity not delay each card for days?",
      "It makes the schedule inspectable within a short visit, while explicitly limiting what immediate performance can show about distributed practice.",
    ],
    "How far into the future must the learning remain useful?",
  ],
  [
    "prospective-memory",
    "Parity accuracy, completed cue actions and false alarms are separate outcomes. The correct secondary action must occur before the primary answer advances the card.",
    [
      "Remember a future action during another task",
      "Read the initial intention to deliver a parcel when a star appears.",
      "Classify each number as odd or even while carrying out that intention on the two starred cards.",
      "Compare primary accuracy, cue-action hits and non-cue actions rather than combining them into a clinical memory score.",
    ],
    [
      "Remembering a task later is the same as remembering to act at the right cue.",
      "Prospective memory includes initiating the intended action when the relevant situation occurs, not just recognising the instruction afterwards.",
    ],
    [
      "Does a missed star show an everyday memory disorder?",
      "No. This tiny warned untimed activity has no diagnostic validity or standardised assessment conditions.",
    ],
    "What cue will reliably appear while you are occupied with something else?",
  ],
  [
    "cognitive-dissonance",
    "The character’s conflict is supplied by the story; changes in discomfort are ratings entered by the reader, not psychological effects generated by the interface.",
    [
      "Inspect three ways to address an inconsistency",
      "Read the fictional evening priority and conflicting optional overtime commitment.",
      "Explore changing behaviour, reassessing the priority or adding an exceptional-week justification.",
      "Compare your entered ratings while identifying which part of the belief–action relation each response actually changes.",
    ],
    [
      "Every explanation after a difficult choice is dishonest rationalisation.",
      "A response may revise behaviour, update a belief with good reasons or add a justification. Evaluating its truth requires more than noticing discomfort reduction.",
    ],
    [
      "Does the activity detect unconscious self-justification?",
      "No. It records explicit judgments about a disclosed scenario and cannot infer an unconscious mechanism.",
    ],
    "Did the response improve the evidence, change the action, or only reduce the felt inconsistency?",
  ],
  [
    "psychological-reactance",
    "The later preference is preserved whether it changes or stays the same. A controlling message is displayed as a scenario, not as an actual restriction of available controls.",
    [
      "Consider a threat to an ordinary choice",
      "Record a tea-or-coffee preference before choosing a message condition.",
      "Read either the neutral invitation or the controlling instruction while both options remain available.",
      "Record the later preference and distinguish a changed response from evidence that one particular motivational mechanism caused it.",
    ],
    [
      "A controlling message must make every recipient choose its opposite.",
      "Responses to threatened freedom depend on context and interpretation. The display does not force or predict an individual reversal.",
    ],
    [
      "Can a preference switch be explained without reactance?",
      "Yes. Reconsideration, demand awareness or other reasons can change a response; this disclosed activity cannot isolate causation.",
    ],
    "Is the instruction unnecessarily threatening an option the reader values?",
  ],
  [
    "choice-overload",
    "The objective is an inspectable requirement match. The interface reports selection accuracy without assigning a larger catalog a fictional time or satisfaction penalty.",
    [
      "Find the same adequate plan in two assortments",
      "Use the goal of at least fourteen storage units, flexibility and price within thirty.",
      "Inspect four or twelve offers, keeping the cheapest qualifying offer D at fourteen in either catalog.",
      "Choose an offer and compare its attributes with the goal before generalising about assortment size.",
    ],
    [
      "More options always make a decision worse.",
      "Larger assortments can help or hinder depending on goals, preferences and organisation. This task supplies a goal rather than presupposing an overload effect.",
    ],
    [
      "Why is there no automatic overload score?",
      "Actual time and satisfaction are not measured here. Manufactured penalties would confuse the concept with an assumed outcome.",
    ],
    "Which filter corresponds to the criterion that actually governs this decision?",
  ],
  [
    "negativity-bias",
    "The negative-item weight is an explicit chosen assumption. Your initial impression is reported separately so neither number is mislabelled a measured psychological parameter.",
    [
      "Reweight mixed feedback without changing the ratings",
      "Record an impression of four ratings of eight and one rating of two.",
      "Reveal the unweighted mean of 6.8, then increase the illustrative negative-item weight.",
      "Compare the changed weighted result with your original rating while asking whether diagnostic relevance justifies the extra weight.",
    ],
    [
      "Giving negative evidence extra weight is always irrational.",
      "Asymmetric relevance can justify unequal weights. A negativity-bias claim needs an appropriate comparison of positive and negative information.",
    ],
    [
      "Does the slider estimate my personal negativity coefficient?",
      "No. It is a freely selected teaching input with no fitted measurement procedure or causal interpretation.",
    ],
    "Is the negative item more informative, or merely more emotionally salient?",
  ],
  [
    "effort-discounting",
    "Tokens are earned only when the selected route’s steps are completed. The modelled net value is separate from those earned tokens and from actual subjective effort.",
    [
      "Compare reward and effort on two routes",
      "At cost per step one, compare short-route net value two with long-route net value six.",
      "Increase cost per step to three and inspect how the declared linear tradeoff changes both values.",
      "Choose a route and complete its steps, without treating the clicks as a fitted measure of motivation.",
    ],
    [
      "A larger nominal reward must be the more attractive option.",
      "The effort required can reduce subjective value, but the relevant cost function and constraints must be specified rather than inferred from reward alone.",
    ],
    [
      "Why is the linear cost not presented as a research estimate?",
      "The coefficients are authored to expose a tradeoff; real effort valuation can be nonlinear and requires an appropriate measurement task.",
    ],
    "What cost or constraint makes the larger reward less appealing?",
  ],
  [
    "correlated-equilibrium",
    "Use conditional incentives after each recommendation, not only the unconditional average payoff. The partner’s obedience is a supplied part of this game.",
    [
      "Compare following a device with ignoring it",
      "Play recommendations while following the device and inspect the Go/Wait histories.",
      "Compare expected payoff 1.5 with always-Go payoff minus one and always-Wait payoff one-half.",
      "Check that deviating after either recommendation lowers payoff against the implied partner action.",
    ],
    [
      "Correlated equilibrium is just independent random play by both players.",
      "The device supplies a joint distribution and information through recommendations. Here opposite recommendations avoid the collisions caused by independent half-probability Go choices.",
    ],
    [
      "Does this device solve every coordination problem?",
      "No. The incentive inequalities depend on the declared game and information; another payoff matrix can invalidate obedience.",
    ],
    "What does your recommendation reveal about the other participant’s likely action?",
  ],
  [
    "bayesian-persuasion",
    "The positive message’s posterior falls as more bad states enter it. A more frequent message can become unpersuasive once it crosses the receiver’s decision threshold.",
    [
      "Pool states up to a credible boundary",
      "Start with every good state labelled positive and forty percent of bad states labelled positive.",
      "Set the exact bad-state boundary three-sevenths to obtain posterior one-half and total investment probability 0.6.",
      "Increase pooling beyond that boundary and inspect the receiver’s refusal under the declared threshold and tie rule.",
    ],
    [
      "Adding more positive messages always increases persuasion.",
      "A receiver who knows the selection policy updates on how the message was produced. Excess pooling can destroy the message’s decision relevance.",
    ],
    [
      "Why does the exact boundary use investment at equality?",
      "The model explicitly resolves posterior one-half in favour of investment. A different tie rule changes the boundary outcome.",
    ],
    "Which commitment and selection policy makes the message credible to its receiver?",
  ],
  [
    "cheap-talk",
    "Receiver payoffs are scored against the hidden states, while the two sender policies remain disclosed scripts rather than strategic equilibrium solutions.",
    [
      "Evaluate a message under different incentive policies",
      "Choose an aligned truthful sender before the six-state sequence begins.",
      "Select high or low after each message and inspect the final state-and-payoff ledger.",
      "Reset with the always-high sender and identify which information its message no longer distinguishes.",
    ],
    [
      "Any misalignment makes informative communication impossible.",
      "Cheap-talk models can support partial information under some preferences and beliefs. This always-high bot is only a particular uninformative policy.",
    ],
    [
      "Is the sender learning from my responses?",
      "No. The specified message rule is fixed throughout the round and does not adapt strategically to the receiver.",
    ],
    "What would make this sender willing to communicate a distinction truthfully?",
  ],
  [
    "top-trading-cycles",
    "Finalised cycles remove both their participants and owned houses. Remaining preference comparisons concern only what is still available.",
    [
      "Trade around a three-person cycle",
      "Inspect A preferring B’s house, B preferring C’s and C preferring A’s.",
      "Execute the cycle to assign each person their favourite house without money.",
      "Reset to the own-house-first profile and execute self-cycles, comparing a different strict preference configuration.",
    ],
    [
      "Every useful exchange must be possible as a bilateral swap.",
      "A cycle involving several owners can implement trades that cannot be described as a single mutually desirable two-person exchange.",
    ],
    [
      "Are the houses reassigned by comparing prices?",
      "No. This housing-market model uses strict ordinal preferences and initial ownership rather than money or market-price estimates.",
    ],
    "Could a longer exchange cycle make compatible preferences easier to satisfy?",
  ],
  [
    "iterated-dominance",
    "A removable strategy must lose strictly to some other active strategy at every active opponent action. A single favourable comparison is insufficient.",
    [
      "Reduce a payoff matrix using valid eliminations",
      "Remove row B after verifying that row A beats it at all three columns.",
      "Remove column M and column R when the column player’s strictly better remaining alternative is checked across active rows.",
      "With only L left, remove row C and inspect the surviving A,L profile.",
    ],
    [
      "A strategy is dominated if it loses in one cell.",
      "Strict dominance compares an alternative against every currently possible opponent response, so one bad outcome does not establish removal.",
    ],
    [
      "Would the same rule safely remove all weakly dominated strategies?",
      "Weak dominance has additional order and interpretation subtleties. This activity deliberately uses only strict payoff inequalities.",
    ],
    "Have you checked the opponent response that makes your preferred elimination fail?",
  ],
  [
    "solow-growth",
    "Capital, output and consumption are separate per-worker quantities. The eventual higher capital stock does not imply permanently higher growth with technology fixed.",
    [
      "Save more during a capital-accumulation transition",
      "Begin with saving share 0.2 and initial capital one, giving consumption 0.8.",
      "Raise saving to 0.4 at the same initial capital and observe immediate consumption fall to 0.6.",
      "Advance periods toward the higher capital equilibrium sixteen, comparing a transition with a permanent growth-rate claim.",
    ],
    [
      "A higher saving rate permanently raises per-worker growth in this fixed-technology model.",
      "Saving changes the steady-state capital and output levels here. Sustained long-run per-worker growth requires a driver absent from the simplified model.",
    ],
    [
      "Are model periods years for a particular country?",
      "No. Time and capital units are abstract, with no country data or calibrated depreciation and production estimates.",
    ],
    "Are you describing a level, a transition rate or a long-run growth rate?",
  ],
  [
    "expenditure-multiplier",
    "Displayed rounds form a partial geometric sum. The infinite total follows the declared leakages and fixed-price assumptions rather than an estimated policy effect.",
    [
      "Trace twenty units through a simple spending chain",
      "Set initial spending twenty and marginal propensity to consume 0.6.",
      "Add rounds of twelve, 7.2 and subsequent smaller amounts while tracking the partial total.",
      "Compare with the model limit fifty without calling that number a measured national fiscal multiplier.",
    ],
    [
      "Every economy must have multiplier one divided by one minus MPC.",
      "That formula belongs to a restrictive expenditure model. Taxes, imports, prices, capacity and financing conditions change the feedback and empirical outcome.",
    ],
    [
      "Why does another round never exceed the previous one here?",
      "MPC is constrained below one, so each induced spending round is a smaller fraction of the last.",
    ],
    "Which leakages and resource limits were excluded from the multiplier being quoted?",
  ],
  [
    "tax-incidence",
    "Buyer price and seller net price differ by the tax wedge. Formal remittance and economic burden are not treated as the same quantity.",
    [
      "Split a thirty-unit tax under known slopes",
      "Start from the untaxed equilibrium quantity one hundred divided by three.",
      "Set the tax to thirty and inspect quantity seventy divided by three.",
      "Compare the buyer burden ten and seller burden twenty, which follow the specified supply and demand slopes.",
    ],
    [
      "The party who remits the tax necessarily bears its whole economic cost.",
      "Price adjustment can distribute the burden across both sides of a market, depending on responsiveness and the market structure.",
    ],
    [
      "Are one-third and two-thirds universal incidence shares?",
      "No. They come from this particular linear demand slope minus one and supply slope two, not a general tax rule.",
    ],
    "Which behavioural responsiveness determines the burden beyond the legal payment instruction?",
  ],
  [
    "monopsony",
    "Marginal labour cost includes the wage effect on existing workers. Compare a complete profit calculation with the wage alone.",
    [
      "Find the single employer’s hiring benchmark",
      "Vary employment while reading wage 10+L and marginal revenue product 100−L.",
      "Inspect profit near L thirty, where marginal revenue product equals marginal labour cost 10+2L.",
      "Reveal the competitive benchmark L forty-five and distinguish its wage condition from the employer’s marginal-cost condition.",
    ],
    [
      "Hiring cost for one additional worker is only that worker’s wage.",
      "With a uniform wage that rises with employment, expanding the workforce also raises pay for existing workers in this model.",
    ],
    [
      "Does this prove a particular employer has monopsony power?",
      "No. The single-buyer structure and curves are stipulated, and actual market power requires evidence beyond this illustrative calculation.",
    ],
    "Which payments to existing workers change when employment expands?",
  ],
  [
    "greshams-law",
    "Both monies have equal legal face value only in the first regime. The commodity-pricing regime changes units required to buy the same goods.",
    [
      "Spend low-valued money under fixed acceptance",
      "Choose the equal-face-value rule and buy goods worth 0.6 using the low-metal money.",
      "Compare retained commodity value 1.52 with 1.28 if the high-metal money is spent instead.",
      "Switch to commodity-value pricing and inspect equal retained value 1.4 for either divisible payment.",
    ],
    [
      "Gresham’s law says inferior products always defeat superior products.",
      "The monetary argument depends on a valuation or acceptance rule that overvalues one money relative to another, not a universal competitive-products claim.",
    ],
    [
      "Why permit fractions of coins in the example?",
      "Divisible units isolate the value accounting without denomination constraints; they are an explicit simplification rather than a historical transaction reconstruction.",
    ],
    "What enforced valuation makes one form of money more attractive to spend than retain?",
  ],
];
