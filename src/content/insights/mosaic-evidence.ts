import type { Insight } from "./types";
import { mosaicSources as s } from "@/data/mosaic-expansion";
export const mosaicEvidence: Insight[] = [
  {
    slug: "confidence-intervals-vs-statistical-power",
    title:
      "Confidence intervals vs statistical power: what an inconclusive study really tells you",
    description:
      "Learn what confidence intervals, power and planned sequential testing actually mean, with repeated-study experiments and a practical evidence checklist.",
    topic: "Research literacy",
    published: "2026-10-27",
    takeaway:
      "An interval describes uncertainty in an estimate; power describes a test procedure under a specified alternative. Neither turns an inconclusive study into proof of no effect.",
    intro:
      "A study reports no statistically significant difference. Does that mean nothing happened, the sample was too small, or the estimate was simply imprecise? Those are different possibilities. The useful next step is to inspect the effect estimate, its interval and the study design together. Three small experiments make those distinctions visible without requiring a statistics course.",
    sections: [
      {
        id: "coverage",
        title: "Start with the question an interval answers",
        paragraphs: [
          "A confidence interval comes from a rule applied to a sample. Under its assumptions, a 95% procedure covers the fixed population parameter in approximately 95% of repeated samples. It does not mean that 95% of individual observations lie inside the interval. It also does not assign a frequentist 95% probability to the fixed parameter after one interval has been observed.",
          "Open the [confidence intervals experiment](/effects/confidence-intervals). Forty synthetic studies estimate the same zero mean with known variance. Reveal the generating value and count the intervals that cover it. Then increase the sample size. Their widths shrink because the standard error is proportional to one divided by the square root of sample size. The coverage rule itself has not become a different confidence level. [Penn State’s interval lesson](https://online.stat.psu.edu/stat200/Lesson04) explains the sampling interpretation behind this distinction.",
        ],
      },
      {
        id: "power",
        title: "Power asks about a test under a particular effect",
        paragraphs: [
          "Power is a rejection probability under a specified alternative. Asking whether a study has enough power without naming an effect size is incomplete: the same design can detect a large shift reliably and miss a small shift often. A meaningful effect should be chosen for the decision, rather than selected afterwards to make the design look adequate.",
          "In the [statistical power simulator](/effects/statistical-power), observations have known standard deviation one and the test uses a two-sided critical value of 1.96. Change the true mean shift and sample size separately. The expected rejection probability is calculated from the model; the hundred simulated study outcomes are one fluctuating realisation. [Penn State’s power material](https://online.stat.psu.edu/stat415/Lesson09) provides the formal connection between alternatives, sample size and rejection probability.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: compare precision before making a claim",
        paragraphs: [
          "Use the following settings as a teaching comparison, not an estimate of any medical, commercial or social intervention. The experiment supplies the effect and variance by construction, which is exactly the information real investigators must justify rather than assume.",
        ],
        steps: [
          "Set the generating shift to 0.3 and the sample size to twenty. Record expected power and the number of rejections among the hundred simulated tests; do not treat those two numbers as identical quantities.",
          "Raise sample size to one hundred while preserving the effect and threshold. Compare the new power, then visit the interval board and observe how a larger sample narrows the uncertainty around repeated mean estimates.",
          "Return the generating shift to zero. Rejections are now false positives under the null, not discoveries of the previous shift. Keep the approximately five-percent test size separate from power at a meaningful nonzero alternative.",
        ],
      },
      {
        id: "decisions",
        title: "Ask whether uncertainty crosses your decision boundary",
        paragraphs: [
          "Suppose an organisation cares about whether a change saves enough time to justify its implementation cost. A narrow interval around a negligible saving and a broad interval spanning a loss and a useful gain have very different implications, even if both studies miss a conventional significance threshold. Statistical detection and practical value are not interchangeable objectives.",
          "Write the decision threshold before interpreting the result. Identify which values in the interval would lead you to adopt, reject or investigate further. This does not turn a confidence interval into a decision rule automatically; it makes the missing costs, benefits and uncertainty explicit. The right summary may be that the evidence rules out a large benefit but leaves a smaller one unresolved. That is more informative than declaring that nothing happened.",
        ],
      },
      {
        id: "checklist",
        title: "A short review before sharing an inconclusive result",
        paragraphs: [
          "Use this review to prevent a statistical label from replacing the question the study was meant to answer. A transparent design can still yield uncertainty; reporting that uncertainty accurately is useful progress rather than a failure to produce a headline. Keep exploratory findings visibly separate from decisions planned before the data arrived.",
        ],
        checklist: [
          "State the estimand, unit of measurement and population to which the result is intended to apply.",
          "Report an effect estimate and its uncertainty, alongside the test and assumptions used to obtain them.",
          "Name the practically meaningful alternative before discussing whether the design could detect it.",
          "Check selection, dependence and measurement problems that increasing sample size alone cannot remove.",
          "Record which unresolved values would actually change the next decision, rather than relying only on a significance label.",
        ],
      },
      {
        id: "stopping",
        title: "If you keep looking, use a design that expects you to",
        paragraphs: [
          "Repeatedly checking a fixed-sample test and stopping whenever it looks favourable changes the sampling procedure. The original fixed-sample guarantee need not survive. The [sequential probability ratio test](/effects/sequential-probability-ratio-test) instead accumulates likelihood evidence between two declared coin models and stops at a predeclared boundary. A stream that reaches the display cap without crossing remains inconclusive.",
          "That board is deliberately narrow: it compares probabilities 0.4 and 0.6, uses nominal error targets and includes discrete boundary overshoot. It is not a general replacement for study planning. The practical lesson is to make the observation and stopping process part of the design, then describe what the resulting evidence can support. Precision, power, sampling quality and stopping rules belong in the same conversation, while each retains its own meaning.",
        ],
        deeper: {
          title:
            "Why a hundred simulated tests can disagree with expected power",
          text: "The realised rejection count is a finite random count. Even when the model’s rejection probability is known, a batch of one hundred outcomes fluctuates around that expectation. This Monte Carlo variation is separate from uncertainty in the real-world effect, which the teaching model supplies directly.",
        },
      },
    ],
    experiments: [
      {
        slug: "confidence-intervals",
        task: "Reveal coverage, then increase sample size without changing the nominal interval rule.",
      },
      {
        slug: "statistical-power",
        task: "Hold the effect fixed while changing sample size, then set the effect to zero.",
      },
      {
        slug: "sequential-probability-ratio-test",
        task: "Follow a coin stream until a predeclared evidence boundary is crossed.",
      },
    ],
    sources: [
      {
        ...s.intervals,
        note: "University explanation of confidence intervals and their repeated-sampling meaning.",
      },
      {
        ...s.power,
        note: "University treatment of power, alternatives and sample-size planning.",
      },
    ],
    reflection:
      "Which effect sizes would change your decision, and does the evidence distinguish them from the values that would not?",
  },
  {
    slug: "bootstrap-resampling-anscombe-quartet-data-analysis",
    title:
      "Bootstrap resampling and Anscombe’s quartet: why a good summary still needs a plot",
    description:
      "Understand bootstrap confidence ranges, small-sample limitations, outlier sensitivity and Anscombe’s quartet through interactive examples and a reproducible review process.",
    topic: "Research literacy",
    published: "2026-10-27",
    takeaway:
      "Resampling explores uncertainty conditional on your observations. Plotting asks whether those observations have a structure your chosen statistic conceals.",
    intro:
      "A spreadsheet can produce a mean, a correlation and a plausible uncertainty range in seconds. The harder question is whether those calculations describe the evidence you actually have. Bootstrap resampling and Anscombe’s quartet address different parts of that problem. Used together, they encourage a workflow that inspects data before trusting a polished numerical answer.",
    sections: [
      {
        id: "empirical",
        title: "What the bootstrap actually resamples",
        paragraphs: [
          "The nonparametric bootstrap samples with replacement from the observations already available. Each replicate has the same size as the original sample, but some observations appear more than once and others disappear. Recomputing a statistic across many replicates provides an approximation to its sampling variability under conditions that need justification.",
          "The [bootstrap resampling board](/effects/bootstrap-resampling) starts with six values: 1, 2, 2, 4, 7 and 9. Inspect individual resamples before looking at the histogram. You can see exactly how repeated draws create different means without creating new observed values. [Efron’s original bootstrap paper](https://doi.org/10.1214/aos/1176344552) introduced the general resampling approach; the board is a deliberately small example rather than a claim that six observations are sufficient for reliable inference.",
        ],
      },
      {
        id: "structure",
        title: "A statistic can hide the feature that matters",
        paragraphs: [
          "A regression slope describes a particular linear summary. It does not say whether a relationship is curved, whether one point dominates the result, or whether the observations form a pattern that makes the model inappropriate. A correlation close to another correlation therefore need not imply that the datasets tell the same story.",
          "Switch among the four datasets in [Anscombe’s quartet](/effects/anscombes-quartet). Their rounded numerical summaries are very similar, but the plots show a broadly linear pattern, curvature, an unusual response and a highly influential x value. [Anscombe’s paper on graphical analysis](https://doi.org/10.1080/00031305.1973.10478966) is a direct argument for examining the observations graphically. The lesson is to inspect structure alongside summaries, rather than rejecting numerical analysis or treating every unusual point as an error.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: trace one estimate back to its observations",
        paragraphs: [
          "This sequence uses authored teaching data and the original rounded quartet coordinates. It is an audit of the calculation, not a statistical test that a real observation should be removed. Keep the original and modified datasets distinguishable throughout.",
        ],
        steps: [
          "Open the bootstrap board and calculate the original mean: the six values sum to twenty-five, giving about 4.17. Inspect a resample to see how repeated values change its mean even though every draw comes from the observed list.",
          "Toggle omission of nine and compare the new empirical distribution. The remaining sample mean is 3.2. Treat this as a sensitivity scenario, retaining the original sample rather than announcing that the largest observation was invalid.",
          "Open dataset four in the quartet and omit its largest-x point. Every remaining x equals eight, so a slope cannot be identified. The interface should report undefined rather than displaying a confident but meaningless fitted number.",
        ],
      },
      {
        id: "workflow",
        title: "Use a plot to choose what deserves investigation",
        paragraphs: [
          "A useful review begins with what a row represents. Identify the unit, collection process and variables before fitting a model. Plot the relationship and inspect suspicious records in context: an extreme value could be a transcription mistake, a genuine rare event, or evidence of another regime. Those explanations call for different actions.",
          "Once the dataset and estimand are clear, choose a statistic whose interpretation matches the task. Then use uncertainty analysis suited to the sampling process. Resampling individual rows assumes a different structure from resampling entire groups or time blocks. The simple Modic bootstrap deliberately assumes exchangeable observations; it does not solve clustered or dependent-data problems automatically. A sensible-looking histogram cannot supply a sampling argument that the analyst has not made.",
        ],
      },
      {
        id: "checklist",
        title: "Keep an inspectable analysis record",
        paragraphs: [
          "The goal is to make the answer auditable by a reader who did not construct the spreadsheet. Saving only the final coefficient makes it difficult to distinguish a robust pattern from a model choice, a data correction or a chance influential observation. A small record of decisions is often more useful than adding another decimal place.",
        ],
        checklist: [
          "Keep a raw-data view and define precisely what each observation and variable represents.",
          "Plot the relationship before choosing a functional form or interpreting a correlation.",
          "Document every exclusion with a reason independent of whether the result becomes more attractive.",
          "Record the resampling unit, statistic, replicate count and interval construction used in uncertainty analysis.",
          "Compare sensitivity scenarios without silently replacing the original analysis with the most convenient one.",
        ],
      },
      {
        id: "limits",
        title: "Uncertainty methods do not repair missing information",
        paragraphs: [
          "If the original sample excludes the people, events or tail outcomes relevant to the decision, repeatedly resampling it cannot recover them. A narrow bootstrap range can be a precise description of the wrong empirical distribution. Increasing the number of replicates reduces Monte Carlo roughness, but does not increase the number of independent observations collected.",
          "Measurement can also distort a relationship before resampling begins. The [regression dilution experiment](/effects/regression-dilution) explores one such mechanism: noise in an explanatory variable can weaken a fitted slope under its stated model. A useful report separates sampling variability, sensitivity to observations, model structure and measurement quality. These are complementary questions. Answering one carefully should make the remaining uncertainty more visible rather than giving the whole analysis an undeserved seal of reliability.",
        ],
        deeper: {
          title: "Why the percentile display is a teaching range",
          text: "The board orders two hundred bootstrap means and displays the fifth and 195th. With a tiny, skewed empirical sample, that finite percentile construction has no automatic population-coverage guarantee. Different interval methods and data structures can behave differently; the visible endpoints are conditional on the sample and simulation.",
        },
      },
    ],
    experiments: [
      {
        slug: "bootstrap-resampling",
        task: "Inspect individual resamples, then compare the empirical distribution with and without nine.",
      },
      {
        slug: "anscombes-quartet",
        task: "Switch plots and test what happens when the sole unusual x value is omitted.",
      },
      {
        slug: "regression-dilution",
        task: "Separate measurement error in a predictor from uncertainty due to sampling.",
      },
    ],
    sources: [
      {
        ...s.bootstrap,
        note: "Original statistical paper introducing bootstrap methods.",
      },
      {
        ...s.quartet,
        note: "Original quartet paper illustrating the importance of graphical analysis.",
      },
    ],
    reflection:
      "Which uncertainty in your analysis comes from sampling, and which comes from the way the evidence was measured or selected?",
  },
  {
    slug: "misinformation-memory-if-then-plans",
    title:
      "How to remember more accurately: misinformation, shared memory and if–then plans",
    description:
      "A practical guide to separating original evidence from later suggestions, locating team expertise and designing concrete if–then plans, with three interactive exercises.",
    topic: "Learning lab",
    published: "2026-10-27",
    takeaway:
      "Improve a memory workflow by separating what was observed, where reliable knowledge lives and what cue should trigger the next action.",
    intro:
      "You can remember a story confidently while losing track of which details you actually saw. A team can possess the right information while nobody knows whom to ask. A good intention can remain unused because no situation triggers it. These are different problems, and they call for different tools. The following exercises make each problem concrete before suggesting a small practical change.",
    sections: [
      {
        id: "source-memory",
        title: "Separate the event from the later description",
        paragraphs: [
          "Memory reports are not a simple replay button. Later wording, conversation and interpretation can affect what people report about an earlier event. The misinformation effect concerns misleading post-event information; it should not be used as a casual explanation for every disagreement or as a reason to dismiss someone’s account without evidence.",
          "Try the [misinformation exercise](/effects/misinformation-effect). Study a small scene, hide it, encounter a later question and report what you recall. The activity reveals the original rather than altering your answer to produce an effect. [Loftus and Palmer’s reconstruction study](https://doi.org/10.1016/S0022-5371%2874%2980011-3) provides primary research context for the influence of later questioning. The Modic scene is a warned, untimed illustration, with neither the controls nor the evidential strength of a laboratory experiment.",
        ],
      },
      {
        id: "directory",
        title: "A team needs to remember where knowledge is stored",
        paragraphs: [
          "Distributed expertise is useful only if it can be located. In a transactive memory system, people need not hold identical knowledge: they can also learn who knows a topic and how to retrieve that person’s contribution. A stale directory, inaccessible expert or mistaken assumption about someone’s responsibility can break that retrieval path.",
          "The [transactive memory game](/effects/transactive-memory) asks you to study a tiny expertise directory and route requests after it disappears. Your score measures those routing decisions, not a real team’s intelligence or the superiority of collaboration. As a practical exercise, ask whether your group can locate a source without relying on one person’s memory of everyone else. An ownership map should include a backup and an update process, especially when a task crosses several domains or the usual expert is away.",
        ],
      },
      {
        id: "worked-example",
        title:
          "Worked example: improve a handover without inventing a memory score",
        paragraphs: [
          "Consider a fictional operations team passing a small incident between shifts. The following workflow is an application proposal, not a measured result from the Modic games. Its value would need to be assessed in the team’s actual setting.",
        ],
        steps: [
          "Before the group discussion, record the directly observed event, time and source. Put later explanations in a separate field so a confident retelling cannot silently become the original observation.",
          "List who owns the equipment, customer history and technical diagnosis, including a backup for each. Route a test question through the directory and check whether the named person can actually retrieve the relevant record.",
          "Write an if–then rule: if a handover starts, then open the incident record before reading the summary aloud. Inspect whether that cue occurs reliably and whether the response is feasible during a busy shift.",
        ],
      },
      {
        id: "plans",
        title: "A concrete cue is more inspectable than a vague goal",
        paragraphs: [
          "An implementation intention connects a recognised situation to a specified response. The useful difference from a broad aspiration is operational: another person can ask whether the cue occurred and whether the planned response was possible. A plan can still be poorly chosen, forgotten or disrupted; specificity is not a guarantee of follow-through.",
          "Build rules in the [implementation intentions board](/effects/implementation-intentions). A new message and the beginning of a work block trigger the actions you select, and a six-event ledger shows exactly how the rules behave. [Gollwitzer’s implementation-intentions paper](https://doi.org/10.1037/0003-066X.54.7.493) supplies the research framing. The ledger itself is deterministic: it does not award fictional productivity points or predict the probability that a real person follows the rule. Use it to catch a plan whose literal execution would undermine its own goal.",
        ],
      },
      {
        id: "checklist",
        title: "A small memory-workflow checklist",
        paragraphs: [
          "Choose a modest process improvement that can be inspected, rather than promising perfect memory. A record can be incomplete, an expert can be wrong and a plan can be unrealistic. Combining them is useful when each has a defined role and there is a way to notice failure. Review the process after an actual handover, including cases where it added friction.",
        ],
        checklist: [
          "Label original observations separately from suggestions, interpretations and second-hand summaries.",
          "Attach a retrievable source or record to important factual claims rather than relying on confidence.",
          "Keep the expertise directory current, with ownership, access and an available backup.",
          "Choose a visible cue and a response small enough to carry out under ordinary conditions.",
          "Inspect actual use before claiming that the revised process improved accuracy or performance.",
        ],
      },
      {
        id: "limits",
        title: "Avoid turning a teaching exercise into a diagnosis",
        paragraphs: [
          "A correct memory answer does not prove immunity to suggestion, just as a wrong answer does not establish a specific psychological mechanism. The scene is tiny, the suggestion is disclosed and the reader knows an activity is underway. Those conditions are part of the interpretation, rather than awkward details to omit from a result.",
          "Likewise, routing six requests correctly is not evidence that a whole organisation has a well-functioning transactive memory system. The board excludes trust, communication costs and changes in expertise. The if–then ledger excludes motivation and competing obligations. The practical connection is a disciplined separation of questions: what was observed, where can a claim be checked, and what situation should trigger action? Improving that separation can make later investigation easier even before you have evidence of a performance gain.",
        ],
        deeper: {
          title: "Source monitoring is a different task from confidence",
          text: "A person can feel sure about a detail while being uncertain about where it came from. Asking for the source of a memory claim therefore supplies a different kind of information from asking how confident the person feels. Neither answer alone establishes accuracy; the original record remains valuable when available.",
        },
      },
    ],
    experiments: [
      {
        slug: "misinformation-effect",
        task: "Compare your recall with the original scene and identify the later suggested detail.",
      },
      {
        slug: "transactive-memory",
        task: "Route six requests using a studied expertise directory.",
      },
      {
        slug: "implementation-intentions",
        task: "Test whether your chosen cue–action rules behave as intended across six events.",
      },
    ],
    sources: [
      {
        ...s.misinformation,
        note: "Primary research on post-event wording and memory reports.",
      },
      {
        ...s.intentions,
        note: "Research framing for cue-linked action plans; the ledger is a teaching application.",
      },
    ],
    reflection:
      "Which error would your process catch: a mistaken observation, a lost source or a plan with no reliable trigger?",
  },
];
