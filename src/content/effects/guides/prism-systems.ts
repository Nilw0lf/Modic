import type { PrismNote } from "./prism";
export const prismSystemsNotes: PrismNote[] = [
  [
    "put-call-parity",
    "Initial cost and terminal payoff belong to different dates. The two portfolios’ equal terminal payoffs persist across the selected stock-price scenarios.",
    [
      "Check replication before discussing market direction",
      "Keep matched quotes and compare call-plus-bond cost with put-plus-share cost.",
      "Move terminal stock price below and above strike one hundred, checking equal payoffs in both regions.",
      "Choose the overpriced-call preset and observe initial cost differ by three while terminal payoff difference remains zero.",
    ],
    [
      "An option price inconsistency is simply a forecast that the stock will rise.",
      "Put–call parity compares replicating payoffs under no-arbitrage assumptions. It does not require a directional prediction about the stock.",
    ],
    [
      "Can I execute the displayed difference as a real trade?",
      "The benchmark omits spreads, borrowing restrictions, exercise features and dividends, so a model mismatch alone is not an execution plan.",
    ],
    "Do the portfolios match in every relevant terminal state, not just the scenario you prefer?",
  ],
  [
    "covered-interest-parity",
    "Future spot enters the unhedged route only. The forward hedge converts the matured foreign amount at the agreed forward price.",
    [
      "Remove exchange-rate uncertainty from one comparison",
      "Keep ideal parity and the hedge on, producing domestic terminal value one hundred five through either route.",
      "Change realised future spot and inspect the unchanged hedged foreign-route value.",
      "Turn the hedge off so future spot matters, then distinguish exchange-rate exposure from the forward-pricing benchmark.",
    ],
    [
      "The parity forward rate predicts the exchange rate that must occur later.",
      "The forward rate equates hedged investment routes under assumptions; it is not a guarantee about a future spot outcome.",
    ],
    [
      "Why might a real cross-currency basis persist?",
      "Funding, credit, transaction and balance-sheet constraints can prevent the frictionless trades assumed by the simple parity argument.",
    ],
    "Which future cash flow is fixed by the hedge and which remains exposed?",
  ],
  [
    "insurance-deductibles",
    "Expected final wealth and the log-utility certainty equivalent are different evaluations of the same two-state outcomes.",
    [
      "Compare fair insurance with retaining the entire loss",
      "Set premium loading zero and deductible forty to inspect uninsured wealth one hundred or sixty.",
      "Reduce deductible to zero, yielding a fair premium ten and wealth ninety in either state.",
      "Compare unchanged expected wealth ninety with the changed certainty equivalent under the stated risk-averse utility benchmark.",
    ],
    [
      "Equal expected wealth means every risk preference must be indifferent.",
      "A risk-averse utility function can value reduced variability even when average wealth is unchanged; different preferences or costs change the comparison.",
    ],
    [
      "Is log utility a measurement of my insurance preferences?",
      "No. It is a supplied benchmark, with no personal calibration, real contract analysis or recommendation.",
    ],
    "Are you optimising expected money, a utility criterion or a constraint on a possible loss?",
  ],
  [
    "liquidity-mismatch",
    "Unpaid early claims remain among remaining claims. Maturity assets reflect any long holdings destroyed by early liquidation, not their original eventual payoff.",
    [
      "Meet early claims by selling long assets cheaply",
      "Choose reserves ten and early withdrawals ten, leaving the long asset intact.",
      "Set early requests thirty and settle, requiring liquidation of all forty long-asset units at one-half each.",
      "Compare maturity assets per remaining claim with the first scenario, keeping strategic run beliefs outside this balance-sheet exercise.",
    ],
    [
      "An asset with a positive eventual payoff can always meet immediate liabilities at that value.",
      "Timing and liquidation discounts matter: an asset’s maturity value does not necessarily provide enough cash for short-notice withdrawals.",
    ],
    [
      "Does this scenario identify which real bank will fail?",
      "No. It omits actual balance sheets, insurance, central-bank access and strategic beliefs, so it cannot assess an institution’s solvency.",
    ],
    "What value is lost when a long asset must fund a claim earlier than planned?",
  ],
  [
    "drawdown-recovery",
    "Current drawdown can return to zero after recovery while maximum historical drawdown remains recorded. Required gain uses current wealth as its denominator.",
    [
      "Lose half, then gain half",
      "Apply a fifty-percent loss to wealth one hundred, leaving fifty.",
      "Apply a fifty-percent gain to the reduced base, leaving seventy-five rather than restoring one hundred.",
      "Compare current drawdown twenty-five percent, maximum drawdown fifty percent and required recovery gain about 33.3 percent.",
    ],
    [
      "Equal percentage losses and gains cancel each other.",
      "Percentage changes apply to different bases after the first move; recovering a loss generally requires a larger percentage gain.",
    ],
    [
      "Does a recovered path erase its maximum drawdown?",
      "No. Maximum drawdown summarises the worst peak-to-trough decline over the recorded history, even after a new peak is reached.",
    ],
    "Which denominator is being used for the loss and for the recovery?",
  ],
  [
    "newsvendor-problem",
    "Expected profit weights all declared demand scenarios. The realised sales day supplies one payoff and cannot by itself establish the quality of the ordering policy.",
    [
      "Order against a declared five-point demand distribution",
      "Choose quantity sixty with unit cost six, selling price ten and salvage value two.",
      "Inspect the profit ledger and expected profit one hundred seventy-six before revealing demand.",
      "Commit the order and compare realised profit with its expectation, retaining the same probabilities rather than judging the policy only by luck.",
    ],
    [
      "The order with the best expected profit wins on every realised day.",
      "A distribution-based optimum balances overage and underage costs; another order can outperform it under a particular realised demand.",
    ],
    [
      "Why does this example target a demand median?",
      "Underage and overage costs are both four, giving critical fractile one-half under the declared one-period model.",
    ],
    "Which demand distribution and shortage-versus-excess costs justify your order?",
  ],
  [
    "economic-order-quantity",
    "Annual ordering and holding costs are computed from the same selected batch size. Purchase cost is omitted because its unit price is unchanged across choices.",
    [
      "Trade frequent orders for average inventory",
      "Select order quantity one hundred and inspect twelve annual orders with average inventory fifty.",
      "Increase batch size and observe ordering cost fall while holding cost rises.",
      "Reveal the optimum about 219.09 units and compare its relevant annual cost about 438.18 with nearby choices.",
    ],
    [
      "The fewest orders always give the cheapest inventory policy.",
      "Larger batches save setup costs but increase average holdings. The classic optimum balances both terms under its assumptions.",
    ],
    [
      "Why can the annual order count be fractional?",
      "It is a long-run average under steady demand, not an instruction to place a literal fraction of a purchase order.",
    ],
    "Which holding cost grows when you reduce ordering frequency?",
  ],
  [
    "kingmans-approximation",
    "Read all outputs as approximations from one stationary single-server model. A higher utilisation denominator amplifies the effect of supplied variability.",
    [
      "Keep utilisation while changing variability",
      "At utilisation seventy percent and both coefficients of variation one, inspect approximate queue wait about 4.67 minutes.",
      "Reduce both variability coefficients to one-half while leaving mean service and utilisation fixed.",
      "Compare wait about 1.17 minutes, then raise utilisation to inspect why spare capacity matters to delay.",
    ],
    [
      "Equal average demand and capacity summaries determine queueing delay completely.",
      "Variability and utilisation interact, so systems with similar averages can have very different waiting under appropriate queueing assumptions.",
    ],
    [
      "Is the zero-variability result an exact prediction for every scheduled service?",
      "No. The formula is a model approximation, and real schedules, dependence or multiple servers may violate its conditions.",
    ],
    "Which source of variability is being hidden by your average workload figure?",
  ],
  [
    "wrights-law",
    "The horizontal progress variable counts doublings of cumulative output. It is neither calendar time nor the count of individual additional units.",
    [
      "Apply a progress ratio twice",
      "Keep the progress ratio at eighty percent with initial unit-cost index one thousand.",
      "Double cumulative output once to obtain unit cost eight hundred.",
      "Double again to output four and unit cost six hundred forty, distinguishing a second proportional reduction from a fixed subtraction.",
    ],
    [
      "An eighty-percent progress ratio means costs fall eighty percent each year.",
      "It means cost becomes eighty percent of its previous value per cumulative-output doubling under this convention, with no year assigned.",
    ],
    [
      "Is the unit-cost convention interchangeable with cumulative-average cost?",
      "No. Historical learning-curve accounting can use different conventions; the board explicitly models unit cost at cumulative production levels.",
    ],
    "Which cumulative-output assumption turns an observed relationship into a future projection?",
  ],
  [
    "shortest-job-first",
    "Compare average waits only across complete schedules of the same five jobs. Partial-schedule averages reflect different job subsets.",
    [
      "Reduce average waiting without changing final completion",
      "Use arrival order for durations eight, two, six, one and three; inspect the waiting ledger.",
      "Switch to shortest-job-first order D, B, E, C, A and compare mean wait falling from 10.2 to 4.4.",
      "Observe that both complete non-idling schedules still finish at time twenty, separating makespan from mean waiting.",
    ],
    [
      "Finishing the final job at the same time makes all schedules equivalent.",
      "Different orders redistribute completion and waiting times among jobs even when total processing work and makespan stay fixed.",
    ],
    [
      "Does shortest-job-first solve fairness for an ongoing queue?",
      "No. Unknown durations, changing arrivals, priorities and starvation concerns introduce objectives absent from the simultaneous-arrival toy.",
    ],
    "Whose waiting time changes when you reorder work without changing its total duration?",
  ],
  [
    "strength-of-weak-ties",
    "Reachability counts distinct nodes accessible through remaining paths. A weak label is stipulated separately from the bridge’s structural role.",
    [
      "Remove a bridge rather than a redundant edge",
      "Inspect two three-person triangles joined through edge three–four.",
      "Remove the weak bridge and count only three reachable people from person one.",
      "Restore the graph and remove strong edge one–two, preserving alternative paths to all six people.",
    ],
    [
      "Every weak tie is structurally indispensable.",
      "The example makes one weak tie a bridge, but actual tie strength and bridge status are separate properties that need evidence.",
    ],
    [
      "Does reachability measure the value of a real relationship?",
      "No. It ignores information quality, trust, availability and other reasons a relationship can matter.",
    ],
    "Which connection supplies access to a circle that your other connections do not reach?",
  ],
  [
    "bounded-confidence",
    "Confidence components are defined by current opinion distances and ε. They need not equal a measured political group or a permanently settled cluster.",
    [
      "Widen the set of opinions allowed to interact",
      "Set confidence bound one so all eight initial opinions interact.",
      "Advance five rounds and inspect common opinion one-half under equal averaging.",
      "Reset with a narrow bound and compare which separate components can still exchange influence.",
    ],
    [
      "Averaging opinions always produces one shared consensus.",
      "If the confidence rule disconnects influence, separate groups can persist. Consensus depends on interaction structure and update assumptions.",
    ],
    [
      "Is ε an empirically measured openness score?",
      "No. It is an authored distance threshold on a synthetic opinion scale, without psychological or political calibration.",
    ],
    "Who is excluded from influencing whom by the rule defining a nearby opinion?",
  ],
  [
    "voter-model",
    "Counts follow actual seeded copying updates. Consensus is absorbing because copying identical neighbours cannot introduce a missing opinion.",
    [
      "Reach agreement without receiving new information",
      "Begin with four A and four B opinions arranged on the eight-node ring.",
      "Copy neighbours in small or twenty-update batches and inspect the fluctuating B count.",
      "If consensus appears, note that future copying preserves it without establishing that the consensus opinion is correct.",
    ],
    [
      "Consensus itself proves that the agreed belief has strong independent evidence.",
      "This model can generate agreement through copying alone, with no truth signal or independently evaluated information.",
    ],
    [
      "Why can a batch include updates after everyone agrees?",
      "The batch replays the declared number of updates; once consensus is reached those additional copies leave the state unchanged.",
    ],
    "How much of the agreement you observe could come from a shared source rather than independent support?",
  ],
  [
    "degroot-learning",
    "The limiting belief weights initial agents by network influence, not necessarily equal head counts. Stubbornness changes the update rule rather than adding evidence.",
    [
      "Compare repeated averaging with a fixed source",
      "Start with beliefs zero, 0.4 and one under the ordinary averaging weights.",
      "Exchange beliefs toward limit 0.45, comparing that with the simple initial arithmetic mean about 0.467.",
      "Reset with agent A stubborn at zero and inspect the others being pulled toward that fixed value.",
    ],
    [
      "Repeated averaging automatically counts each person’s evidence once.",
      "Network paths repeatedly reuse beliefs and create unequal influence. This deterministic social averaging is not independent-evidence aggregation.",
    ],
    [
      "Does convergence prove accuracy?",
      "No. The process supplies no external truth or new evidence, so agreement and correctness remain separate questions.",
    ],
    "Which agent’s initial belief receives extra influence from the communication weights?",
  ],
  [
    "homophily",
    "Compare actual edge counts with the supplied connection probabilities. The total number of edges is not held fixed while the preference changes.",
    [
      "Change a mechanism that favours similar-group links",
      "Inspect the twelve nodes in two groups of six at an intermediate preference.",
      "Increase preference while preserving the random draws and compare within-group and cross-group links.",
      "Distinguish the stipulated preference mechanism from an inference about why a real observed network looks similar.",
    ],
    [
      "Similarity among friends must be caused by an active preference for similar people.",
      "Shared settings, geography and institutions can also shape opportunities for contact; a network pattern alone does not identify one mechanism.",
    ],
    [
      "Why does the number of links change with the slider?",
      "The model changes within- and cross-group probabilities rather than rewiring a fixed number of edges.",
    ],
    "What opportunities to meet were available before you attributed a network pattern to preference?",
  ],
  [
    "brain-in-a-vat",
    "Both columns intentionally supply identical experiences. Adding another stipulated matching observation does not produce a discriminating clue.",
    [
      "Compare explanations with identical observations",
      "Inspect the apparent clock reading under the ordinary and simulated-world scenarios.",
      "Reveal the cup and voice experiences, which are also stipulated identical.",
      "Record which conclusion those clues support while keeping broader philosophical replies separate from the text-matching exercise.",
    ],
    [
      "The matching clues prove that a perfect simulation actually exists.",
      "The scenario assumes an indistinguishable alternative to explore knowledge claims; it does not establish technological possibility or actual deception.",
    ],
    [
      "Why associate Descartes with a later brain-in-a-vat formulation?",
      "His method of radical doubt supplies historical context. The profile association does not attribute authorship of the later vat scenario to him.",
    ],
    "Would the proposed alternative predict any observation different from the account you currently favour?",
  ],
  [
    "twin-earth",
    "Chemical difference is a stipulation revealed by the interface, not a discovery from identical-looking droplets. Meaning and reference are the philosophical questions.",
    [
      "Keep inner states while changing the external liquid",
      "Compare the internally identical pre-chemistry speakers using the term water.",
      "Reveal the scenario’s H₂O and XYZ compositions despite matching ordinary appearances.",
      "Record whether external environment helps fix reference, without treating a selected interpretation as an experimentally settled theory.",
    ],
    [
      "The Twin Earth display proves XYZ is a real substance found elsewhere.",
      "XYZ is an invented philosophical device used to separate internal associations from environmental reference conditions.",
    ],
    [
      "Does the example demand one interpretation of meaning?",
      "It motivates an externalist argument, but competing responses dispute assumptions or implications; the board records that disagreement.",
    ],
    "Which part of a word’s use depends on its speaker and which on the surrounding world?",
  ],
  [
    "non-identity-problem",
    "Compare the identity labels before making a worse-off claim. Positive welfare in one row does not by itself establish that a policy is permissible.",
    [
      "Change who exists under the alternative policy",
      "Inspect the same-person mode, where A has welfare forty or eighty under the two policies.",
      "Switch to different people so the cleaner policy brings B rather than A into existence.",
      "Identify why A’s counterfactual life at eighty is no longer supplied, while ethical questions about the policies remain.",
    ],
    [
      "If a different person would exist, every identity-affecting policy is justified.",
      "A missing simple person-level harm comparison does not settle rights, distribution or broader obligations to future people.",
    ],
    [
      "Are forty and eighty empirical measures of possible lives?",
      "No. They are positive invented indices used to expose an identity-dependent comparison, not measurements or policy forecasts.",
    ],
    "Does the counterfactual change someone’s life or change which person has a life?",
  ],
  [
    "utility-monster",
    "Total utility follows the supplied extreme scale. The allocation cap is an additional chosen constraint rather than a theorem derived from aggregation.",
    [
      "Inspect what an unrestricted total rewards",
      "Allocate all ten tokens to the ordinary group and read total utility twenty.",
      "Move tokens to the monster and inspect total utility rising while ordinary utility falls.",
      "Enable the three-token cap and identify the new constraint separately from your preferred ethical justification.",
    ],
    [
      "A larger utility total guarantees an acceptable distribution.",
      "The monster case challenges that inference by constructing extreme marginal gains for one recipient; evaluating the distribution needs additional ethical reasoning.",
    ],
    [
      "Does the cap solve every aggregation problem?",
      "No. It illustrates adding a constraint but does not justify that particular cap or supply a complete account of fair allocation.",
    ],
    "Which principle would stop a supplied aggregate objective from concentrating everything in one recipient?",
  ],
  [
    "new-riddle-of-induction",
    "Both predicates fit the observed pre-cutoff emeralds. The board displays rival projections rather than generating evidence that one colour transition actually occurs.",
    [
      "Fit the same past with green and grue",
      "Observe several green emeralds before the declared cutoff time T.",
      "Compare the green and grue rules’ identical fit to those observations.",
      "Consider a newly observed emerald after T and inspect their different predictions, then articulate a principle of projectibility.",
    ],
    [
      "Any rule fitting the past is automatically as useful a projection as every other.",
      "The riddle asks what justifies projecting some predicates rather than others; matching observed cases alone does not provide that whole account.",
    ],
    [
      "Is the future emerald shown changing colour at the cutoff?",
      "No. The board compares predicate-defined predictions and does not assert a physical process or future observation that settles the philosophical issue.",
    ],
    "What makes the description you extrapolate more projectible than an alternative that fits the same history?",
  ],
];
