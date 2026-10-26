import type { Insight } from "./types";
import { depthSources as s } from "@/data/depth-expansion";
export const deeperModels: Insight[] = [
  {
    slug: "correlation-vs-causation-confounding-natural-experiments",
    title:
      "Correlation vs causation: how to tell whether a change actually worked",
    description:
      "Understand confounding, difference in differences and instrumental variables with interactive examples and a practical checklist for evaluating causal claims.",
    topic: "Evidence & causality",
    published: "2026-10-26",
    takeaway:
      "A before-and-after difference is an observation. A causal explanation also needs a credible account of what would have happened without the intervention.",
    intro:
      "A team launches training and performance improves. A city changes a rule and employment rises. A product adds a feature and customers who use it spend more. Each observation is interesting; none by itself settles what caused the difference. This guide gives you a practical way to examine the comparison, identify the hidden assumption, and use Modic's causal experiments without needing to begin with regression equations.",
    sections: [
      {
        id: "question",
        title: "Start with the change you want to explain",
        paragraphs: [
          "Write the claim as an intervention: giving access to this course changes a specified outcome for a specified population over a specified period. That sentence is more useful than asking whether training and performance are correlated. It identifies the treatment, the result, the people and the time horizon. It also exposes ambiguities: being offered a course, enrolling in it and completing it are different interventions.",
          "The missing comparison is the same population without the intervention. You cannot usually observe both possibilities for the same person at the same time. Research designs try to construct a defensible substitute. Before choosing a statistical tool, ask why the observed comparison group should represent that missing possibility. A complex model cannot rescue a comparison whose assignment process has no plausible causal interpretation.",
        ],
      },
      {
        id: "confounding",
        title: "Check who selected into the treatment",
        paragraphs: [
          "In the [confounding experiment](/effects/confounding), treatment adds ten outcome units within each background group. Nevertheless, the combined treated group can look much stronger because it contains more people with a background advantage. The larger raw gap is partly a different mixture of people. Changing the treatment's composition changes the reported association even though its causal effect stays fixed.",
          "[Pearl and Paz's work on confounding equivalence](https://proceedings.mlr.press/r8/pearl10c.html) provides a graphical causal perspective on adjustment. For a practical first pass, draw arrows from plausible background conditions to both participation and outcome. Prior experience, motivation, eligibility and location are candidates to investigate, not a magic list to adjust automatically. Some measured variables are consequences of treatment or selection and can make adjustment worse.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: an impressive course result",
        paragraphs: [
          "These numbers are from Modic's authored model, not an evaluation of an actual course. The purpose is to audit what a combined average conceals. You can reproduce every arithmetic step before considering a real dataset, where the causal effect and group counterfactuals would remain uncertain.",
        ],
        steps: [
          "Set the advantaged treated share to seventy percent. Expected control mean is 32 and treated mean is 58, giving a raw gap of 26 units.",
          "Inspect background rows: control versus treated is 20 versus 30 in one group and 60 versus 70 in the other. Both differences are ten.",
          "Randomise expected assignment to balance both background shares at fifty percent. The combined gap becomes ten; the previous extra sixteen came from composition.",
        ],
      },
      {
        id: "changes",
        title: "Compare changes when starting levels differ",
        paragraphs: [
          "The [difference-in-differences experiment](/effects/difference-in-differences) starts two groups at different levels. That does not prevent a useful comparison of changes. If the untreated trends would have remained parallel, subtracting the comparison group's change removes the shared trend. The important assumption is about an unobserved future change, rather than a requirement that both groups begin with identical averages.",
          "Turn up the treated group's extra trend. The policy effect remains eight, but the estimate rises because it absorbs the trend difference. Show the no-policy line to inspect the failure directly. Real studies do not get that reveal button. They need institutional knowledge, diagnostics, robustness checks and a defensible design. A calm-looking pre-period graph is evidence to consider; it is not proof that nothing else changed after the intervention.",
        ],
      },
      {
        id: "instrument",
        title: "Use encouragement only if its shortcut is credible",
        paragraphs: [
          "The [instrumental-variables experiment](/effects/instrumental-variables) asks whether encouragement changes outcomes by changing treatment uptake. Divide the encouragement's outcome difference by its uptake difference. Under the displayed homogeneous model with no direct shortcut, that ratio recovers the treatment effect. Add a direct encouragement bonus and the same arithmetic produces the wrong answer.",
          "[Scott Cunningham's causal-inference textbook](https://mixtape.scunning.com/) develops these research designs in more depth. A useful invitation example is an encouragement assigned independently of potential outcomes that affects attendance but does not otherwise change the outcome. That exclusion claim needs an argument. In richer settings the estimated response may apply to people whose behaviour the invitation changes, rather than everyone. An almost irrelevant instrument is not rescued by an impressive-sounding name.",
        ],
      },
      {
        id: "checklist",
        title: "A causal-claim checklist you can actually use",
        paragraphs: [
          "Write a short design note before looking for a favourable result. Distinguish assumptions you can partially investigate from claims the design cannot verify directly. If a claim survives, the note should explain why the comparison is informative; if it fails, you should still know which observation was useful and which inference went beyond it.",
        ],
        checklist: [
          "Define treatment, outcome, population and time horizon in one sentence.",
          "Explain what would stand in for the untreated counterfactual.",
          "List plausible selection mechanisms and concurrent changes.",
          "Ask which design assumption would fail under each alternative explanation.",
          "Report uncertainty, spillovers and the population to which the result can apply.",
        ],
      },
      {
        id: "limits",
        title: "Keep the conclusion as narrow as the design",
        paragraphs: [
          "Correlation is valuable for prediction and description even when it cannot identify an intervention effect. A customer characteristic might help forecast retention without being something that would improve retention if changed. Keep that distinction in the wording of a recommendation. Saying a result predicts an outcome is a different claim from saying an intervention causes the outcome.",
          "The experiments make assumptions visible by giving you access to their data-generating rules. Real work is harder precisely because those rules are uncertain. Use the models to ask sharper questions, not to label an observational comparison causal merely because it resembles a familiar diagram. The most useful next action may be collecting better assignment information or running a well-designed experiment rather than adding another regression specification.",
        ],
      },
    ],
    experiments: [
      {
        slug: "confounding",
        task: "Balance expected assignment and account for the raw gap.",
      },
      {
        slug: "difference-in-differences",
        task: "Break parallel trends while holding the policy effect fixed.",
      },
      {
        slug: "instrumental-variables",
        task: "Add a direct encouragement effect and audit the ratio.",
      },
    ],
    sources: [
      {
        ...s.confounding,
        note: "A primary research perspective on confounding and adjustment.",
      },
      {
        ...s.causal,
        note: "The author's open textbook develops identification assumptions and research designs.",
      },
    ],
    reflection:
      "What would have happened without your most recent intervention, and why is your chosen comparison a credible substitute?",
  },
  {
    slug: "p-values-multiple-testing-false-discovery-rate",
    title:
      "P-values and multiple testing: why searching harder can create false discoveries",
    description:
      "Learn what false discovery rate means, how Benjamini–Hochberg works, and how to evaluate research claims without confusing a p-value with the probability a claim is true.",
    topic: "Research literacy",
    published: "2026-10-26",
    takeaway:
      "A collection of selected results needs a selection-aware error policy. A small p-value alone does not tell you the probability that a research claim is true.",
    intro:
      "You try several customer segments, dozens of metrics and multiple time windows. Eventually something looks significant. The tempting story is that persistence uncovered the answer. Another possibility is that the search created more opportunities for noise to look convincing. This guide explains multiple testing through a thirty-test experiment, then connects false discoveries with the practical costs of finding and missing useful evidence.",
    sections: [
      {
        id: "meaning",
        title: "What a p-value does—and does not—say",
        paragraphs: [
          "A p-value evaluates how incompatible a specified test statistic is with a null model under the test's assumptions. It is not the probability that the null hypothesis is true. It also does not measure effect size, practical value or the chance of a successful replication. Before interpreting the number, identify the null, the statistic, the sampling process and whether the analysis was chosen before inspecting the data.",
          "The same numerical threshold can mean different things in a single planned test and in a broad exploratory search. If you only report the smallest result, readers do not see the opportunities that produced it. Recording what was searched is therefore part of interpreting the evidence, rather than an administrative detail to add after a convincing result appears.",
        ],
      },
      {
        id: "search",
        title: "Why a family of tests changes the problem",
        paragraphs: [
          "A valid null p-value has a controlled probability of falling below a chosen threshold. Running many tests creates more chances for that to happen. The exact dependence structure matters, and counting tests is not always straightforward. Searching segments, thresholds, model variants and outcomes can introduce flexibility even when the final report contains just one tidy table.",
          "Open the [false-discovery-rate experiment](/effects/false-discovery-rate). It generates thirty independent tests: twenty-five nulls and five authored signals. You know the mix only because this is a teaching model. In a real analysis, the identity of true null hypotheses is usually unknown. The reveal button helps you distinguish what the selection rule knows from what the simulator knows behind the scenes.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: compare two discovery policies",
        paragraphs: [
          "Do not aim for a prescribed number of flags. The seeded dataset makes the comparison reproducible, but another seed can change the discoveries. The task is to explain how the rule selects evidence and what its error target means, including when nothing passes the rule.",
        ],
        steps: [
          "Choose a five-percent level and inspect unadjusted flags. Each p-value is compared with 0.05, regardless of its position among the other tests.",
          "Switch to Benjamini–Hochberg. Sort the thirty p-values and find the largest rank i satisfying p(i) ≤ i × 0.05 / 30; reject through that rank.",
          "Reveal synthetic truth and calculate false flags divided by all flags. Generate another round to see why that realised proportion is not a guaranteed batch-level ceiling.",
        ],
      },
      {
        id: "fdr",
        title: "False discovery rate is an expectation",
        paragraphs: [
          "The false discovery proportion is a batch-level quantity: false rejections divided by total rejections, defined as zero if there are none. False discovery rate is the expectation of that quantity over the procedure's repeated sampling. This is distinct from the chance of any false positive and from the expected share of null hypotheses rejected. Confusing those denominators makes error guarantees sound stronger or weaker than they are.",
          "[UC Berkeley's FDR notes](https://www.stat.berkeley.edu/~wfithian/fdr-dependence.pdf) discuss the role of dependence and formal control. The experiment uses independent valid null p-values to make the basic rule inspectable. It does not imply that any correlated collection of observational analyses inherits the same guarantee. The synthetic signal distribution is also not a study's estimated power or a recipe for deciding how many participants to recruit.",
        ],
      },
      {
        id: "tradeoff",
        title: "Connect discoveries with precision and recall",
        paragraphs: [
          "The [precision-and-recall game](/effects/precision-recall) gives a concrete denominator exercise. Opening a larger prefix retrieves more relevant items but can add irrelevant ones. Precision asks how much selected material is useful; recall asks how much useful material was found. These are related to the intuition behind false and missed discoveries, though a retrieval task and an inferential error guarantee are different mathematical objects.",
          "[Stanford's retrieval-evaluation chapter](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-of-ranked-retrieval-results-1.html) explains why ranked-list precision can rise and fall as recall increases. In research, demanding more evidence can reduce false claims while missing weaker real effects. The right policy depends on the scientific purpose and consequences. An exploratory lead for a later study is different from an action justified as established knowledge.",
        ],
      },
      {
        id: "checklist",
        title: "Make the search visible before declaring a winner",
        paragraphs: [
          "A clear analysis record separates a question chosen in advance from patterns discovered while exploring. Exploration is productive; its conclusions need language and follow-up that reflect how they were found. You can learn from a promising result without presenting it as if it were the only hypothesis anyone considered.",
        ],
        checklist: [
          "List outcomes, segments, windows and analysis variants that were searched.",
          "Define the hypothesis family and error criterion before interpreting adjusted results.",
          "Report effect sizes and uncertainty alongside significance decisions.",
          "Keep exploratory claims distinct from pre-specified confirmation.",
          "Plan an independent follow-up for a result selected from a large search.",
        ],
      },
      {
        id: "sample",
        title: "Small samples add another kind of surprise",
        paragraphs: [
          "The [law-of-small-numbers game](/effects/law-of-small-numbers) shows why tiny groups can produce extreme rates even without different underlying probabilities. Multiple testing concerns opportunities for selection; sample size concerns variability within those opportunities. Both can contribute to a dramatic winner that later looks ordinary. Increasing sample size and adjusting a test family solve different problems.",
          "Avoid replacing one shortcut with another, such as dismissing every small study or trusting every adjusted p-value. Ask what was measured, how groups were formed, how much searching occurred and what evidence would change your conclusion. A result can be statistically detectable but practically unimportant, and a non-discovery can remain compatible with meaningful effects the study could not resolve.",
        ],
      },
    ],
    experiments: [
      {
        slug: "false-discovery-rate",
        task: "Compare a fixed threshold with the BH step-up rule.",
      },
      {
        slug: "precision-recall",
        task: "Track the two denominators as you open more results.",
      },
      {
        slug: "law-of-small-numbers",
        task: "Compare extreme rates in small and large groups.",
      },
    ],
    sources: [
      {
        ...s.fdr,
        note: "University treatment of FDR control and dependence assumptions.",
      },
      {
        ...s.retrieval,
        note: "University textbook on ranked retrieval metrics and their tradeoffs.",
      },
    ],
    reflection:
      "If only your strongest result were published, what search history would a reader need to interpret it fairly?",
  },
  {
    slug: "natural-selection-vs-genetic-drift-explained",
    title: "Natural selection vs genetic drift: two ways populations change",
    description:
      "Compare natural selection, genetic drift and Hardy–Weinberg proportions through interactive population models, with clear examples and common misconceptions.",
    topic: "Evolution & chance",
    published: "2026-10-26",
    takeaway:
      "A rising allele frequency does not identify its cause. Differential reproduction and finite sampling can both change populations, and often operate together.",
    intro:
      "A variant becomes common. Was it advantageous, lucky, newly introduced, or part of a population that changed? Evolution is often reduced to a story about useful traits winning. That story leaves out sampling, inheritance and the distinction between allele frequencies and genotype proportions. Three simple experiments make those mechanisms visible before adding the complexity of real biological evidence.",
    sections: [
      {
        id: "units",
        title: "First identify what is changing",
        paragraphs: [
          "An allele is a version of a genetic sequence at a locus. Allele frequency describes the share of copies represented by that version. A genotype describes the combination carried by an individual at that locus. Those are related quantities, but changing how copies are paired can change genotype proportions without changing the allele frequency. Keeping the units clear prevents a large class of confusing evolutionary explanations.",
          "A population-level change also differs from an individual adjusting during its lifetime. The experiments here follow inherited alternatives across generations or construct genotype proportions from allele frequencies. They do not model an organism deliberately producing the variant it needs, or represent every trait as a single gene. Complex traits and real reproductive systems require richer models.",
        ],
      },
      {
        id: "selection",
        title: "Selection changes expected reproductive contribution",
        paragraphs: [
          "In [natural selection](/effects/natural-selection), one haploid alternative initially has relative fitness 1.2 and the other one. Fitness is a reproductive contribution within a specified environment. The recurrence weights current frequencies by those contributions. With no finite sampling in this model, the trajectory follows the same deterministic arithmetic every time the starting conditions and environment agree.",
          "Reverse the environment after several generations. The previously favoured alternative now has the lower relative contribution, and its frequency moves in the other direction. This is a useful correction to the idea that evolution is an inevitable ladder of improvement. The model has no universal goal, and its numerical fitness parameter does not express intelligence, moral value or a permanent superiority across environments.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: change the cause while keeping the start",
        paragraphs: [
          "Both activities begin at fifty-percent frequency, but their update rules answer different questions. The numbers are educational model parameters, not observations from a particular species. Record the rule beside each graph so the visual difference does not become a substitute for the explanation.",
        ],
        steps: [
          "In natural selection, begin at one half with relative fitness 1.2 versus one. One update gives 0.6 divided by 1.1, approximately 54.5%.",
          "In genetic drift, use thirty copies and sample a generation from one half. The realised result must be an integer count divided by thirty, and may move either way.",
          "Repeat the drift process, then compare a larger population. Equal fitness remains imposed, so wandering frequencies cannot be attributed to an authored selective advantage.",
        ],
      },
      {
        id: "drift",
        title: "Drift changes realised frequencies through sampling",
        paragraphs: [
          "The [genetic-drift experiment](/effects/genetic-drift) samples the next generation from the previous one. A population of thirty copies does not obtain exactly its expected count every generation. Neutral variants can rise, fall, become fixed or disappear without a fitness difference. Smaller populations tend to experience larger proportional sampling fluctuations under this model; that is a distributional statement rather than a rule for each individual path.",
          "[OpenStax's evolution chapter](https://openstax.org/books/concepts-biology/pages/11-2-mechanisms-of-evolution) places drift alongside selection, mutation and gene flow. In actual populations these processes can act simultaneously. A founder event can also alter composition without implying the founders were better adapted. Estimating what happened requires evidence beyond noticing that one alternative became common.",
        ],
      },
      {
        id: "pairing",
        title: "Hardy–Weinberg is a reference, not a default explanation",
        paragraphs: [
          "Set the allele frequency to one half in the [Hardy–Weinberg experiment](/effects/hardy-weinberg). Random union of gametes gives one quarter AA, one half Aa and one quarter aa. Switch to all homozygotes and the proportions become one half AA, zero Aa and one half aa. The allele total remains unchanged. You have altered pairing, not created or removed allele copies.",
          "[OpenStax's population-change discussion](https://openstax.org/books/concepts-biology/pages/11-1-discovering-how-populations-change) introduces the equilibrium assumptions. Departures can flag questions worth investigating but do not identify one mechanism on their own. Population structure, nonrandom mating and measurement issues can matter. In finite data, observed proportions also fluctuate around expectations, so exact agreement with textbook fractions is not a reasonable universal requirement.",
        ],
      },
      {
        id: "checklist",
        title: "A mechanism checklist for an evolutionary claim",
        paragraphs: [
          "When you encounter an explanation, ask which causal mechanism is being proposed and what would distinguish it from alternatives. A narrative about adaptation is easier to invent after seeing a result than to test beforehand. Good questions identify evidence that could challenge the story, not just examples that make it sound plausible.",
        ],
        checklist: [
          "Distinguish allele frequency, genotype proportion and an individual's phenotype.",
          "Specify the population, generation interval and inheritance model.",
          "Ask whether differential reproduction is measured or merely inferred from a rising frequency.",
          "Consider finite sampling, migration and mutation as alternative or additional mechanisms.",
          "Separate a mathematical model's expected path from observed biological counts.",
        ],
      },
      {
        id: "beyond",
        title: "Use simple models as contrasts, then restore reality",
        paragraphs: [
          "The models isolate mechanisms to help you recognise what each one can do. That clarity comes from exclusions: the selection board omits drift, while the drift board holds fitness equal and excludes mutation. A real population is not required to choose one of those boxes. The next useful question is how their effects combine, and which measurements let you estimate their relative contribution.",
          "Avoid turning these distinctions into social rankings or just-so explanations of human behaviour. Relative fitness in a toy recurrence is not a general-purpose score of a person or a policy. The valuable habit is more precise: describe the unit, identify the update rule, consider competing mechanisms and state what the evidence leaves unresolved. That habit applies well beyond the biology example without pretending every social process is genetic evolution.",
        ],
      },
    ],
    experiments: [
      {
        slug: "natural-selection",
        task: "Reverse a fitness advantage while preserving the population history.",
      },
      {
        slug: "genetic-drift",
        task: "Compare neutral sampling at two population sizes.",
      },
      {
        slug: "hardy-weinberg",
        task: "Change genotype pairing while holding allele frequency fixed.",
      },
    ],
    sources: [
      {
        ...s.evolution,
        note: "University textbook account of evolutionary mechanisms.",
      },
      {
        ...s.genetics,
        note: "University introduction to population change and Hardy–Weinberg assumptions.",
      },
    ],
    reflection:
      "What observation would distinguish a selective advantage from chance sampling in the frequency change you want to explain?",
  },
];
