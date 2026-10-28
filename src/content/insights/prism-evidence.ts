import type { Insight } from "./types";
import { prismSources as s } from "@/data/prism-sources";
export const prismEvidence: Insight[] = [
  {
    slug: "binary-search-bloom-filter-consistent-hashing",
    title:
      "Binary search, Bloom filters and consistent hashing solve different lookup problems",
    description:
      "Choose an ordered search, approximate membership filter or ownership ring by understanding its guarantee, data assumptions and cost of a wrong answer.",
    topic: "Systems in practice",
    published: "2026-10-28",
    takeaway:
      "Start with the question: where is an ordered target, could a key exist, or which server owns it? A fast answer to the wrong lookup question is still the wrong tool.",
    intro:
      "Several techniques can make a system’s lookup path faster, yet their guarantees differ sharply. Binary search narrows an ordered range. A Bloom filter can reject definitely absent keys while admitting some false positives. Consistent hashing assigns ownership when servers join or leave. The easiest way to understand the distinction is to operate each mechanism and inspect what it actually promises.",
    sections: [
      {
        id: "ordered",
        title: "Binary search spends comparisons to eliminate candidates",
        paragraphs: [
          "An ordered target space lets a comparison remove more than one candidate at a time. A midpoint divides the remaining possibilities, and a reliable lower-or-higher answer identifies which side can be discarded. Without that ordering or monotonic comparison, the same elimination would not be justified.",
          "Play the [binary-search guessing game](/effects/binary-search) with a hidden integer between one and thirty-two. Compare arbitrary guesses with the midpoint button and count the actual equality-tested guesses. [NIST’s definition of binary search](https://xlinux.nist.gov/dads/HTML/binarySearch.html) states the algorithmic setting. The game’s six-guess worst-case bound includes the final equality check. It does not include the cost of sorting an unordered collection or maintaining an order while records change, which can matter more than the lookup itself.",
        ],
      },
      {
        id: "approximate",
        title: "A Bloom filter answers a weaker membership question",
        paragraphs: [
          "A Bloom filter represents inserted keys through set bits at hashed positions. If a queried key requires an unset bit, that key has not been inserted under the insertion-only rules. If all required bits are set, the key is only possibly present: other inserted keys may have set them.",
          "In the [Bloom-filter playground](/effects/bloom-filter), insert a word and search for a nonmember whose bits are already set. The exact teaching ledger exposes the false positive; it is not part of the compact filter. [Bloom’s original paper](https://doi.org/10.1145/362686.362692) frames the storage–error tradeoff. The Modic implementation deliberately uses tiny storage and simple deterministic hashes to make collisions easy to inspect. It supplies no cryptographic or adversarial-input guarantee and does not assume those hashes are independent uniform draws.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: trace a database precheck",
        paragraphs: [
          "Imagine an application that can afford an occasional unnecessary database lookup but must not skip a genuinely present inserted key. The following is a design sketch using the toy filter, not a production configuration or performance measurement.",
        ],
        steps: [
          "Insert apple into the twenty-four-bit teaching filter and query apple. Its required positions are set, so the filter returns possibly present; the separate ledger confirms insertion rather than making the filter itself exact.",
          "Use the false-positive search and query the proposed uninserted candidate. A possibly-present result now leads to an unnecessary exact lookup, which is the permitted error in this hypothetical application.",
          "Query a word with an unset required bit to reject it without the expensive lookup. Before using the design, check whether deletion, concurrency or inconsistent filter updates could break the insertion-only absence guarantee.",
        ],
      },
      {
        id: "ownership",
        title: "Consistent hashing decides where a key belongs",
        paragraphs: [
          "The [consistent-hashing ring](/effects/consistent-hashing) asks another question entirely. It assigns each fixed key to the next clockwise server position. Adding a server changes ownership for keys in one preceding interval rather than applying a new modulo rule to every key. This can reduce the remapping work required by membership changes.",
          "Limited movement does not guarantee balanced load. The toy ring has no virtual nodes, replicas or realistic key distribution, and some servers can own more keys than others. Inspect both the ownership ledger and the number moved. A membership filter cannot replace this ownership rule, just as an ownership ring cannot establish whether the requested record exists. A real system can use all three techniques at different stages, provided each stage’s answer and failure conditions are explicit.",
        ],
      },
      {
        id: "checklist",
        title: "Choose the guarantee before choosing the data structure",
        paragraphs: [
          "A design discussion becomes clearer when it names the allowed error and the expensive operation. A lookup can be exact yet costly to maintain, approximate yet useful as a precheck, or primarily about distributing work rather than finding data. Evaluate the whole path rather than a short standalone demonstration that excludes its update and verification costs.",
        ],
        checklist: [
          "Specify whether the task is ordered search, membership testing or assignment to an owner.",
          "Check what structure the method requires and who maintains that structure during updates.",
          "State whether a positive or negative answer can be wrong under the implemented rules.",
          "Include follow-up verification, update consistency and failure recovery in the system design.",
          "Measure remapping and balance separately rather than treating either as a complete distributed-system guarantee.",
        ],
      },
      {
        id: "cost",
        title: "Count the operation that actually limits the system",
        paragraphs: [
          "The [sorting comparison](/effects/sorting-algorithms) offers a related warning: comparisons and array writes are different costs. An algorithm with fewer displayed passes may still perform more expensive operations. Likewise, a compressed representation can save bits while adding a codebook or decoding requirement, as the [Huffman coding activity](/effects/huffman-coding) makes visible.",
          "Use these activities to practise tracing a mechanism, then benchmark the actual workload and implementation. Network latency, storage layout, cache behaviour and update patterns can dominate the costs omitted by a tiny board. The transferable skill is to say exactly what an algorithm answers, what assumptions justify that answer and which resources the surrounding system spends to obtain and maintain it. That produces a more useful comparison than asking which lookup technique is simply fastest.",
        ],
        deeper: {
          title: "Why possible membership is still useful",
          text: "A precheck can save work when definitely-absent queries are common and false positives only cause a safe exact lookup. Its usefulness depends on the workload, filter size, hashing and maintenance policy. The guarantee is narrower than an exact dictionary, and that narrower guarantee should remain visible to callers.",
        },
      },
    ],
    experiments: [
      {
        slug: "binary-search",
        task: "Find the target using successive midpoint comparisons.",
      },
      {
        slug: "bloom-filter",
        task: "Generate and inspect a false positive against the exact teaching ledger.",
      },
      {
        slug: "consistent-hashing",
        task: "Add a server and identify the interval of keys whose ownership changes.",
      },
    ],
    sources: [
      {
        ...s.binary,
        note: "Authoritative algorithm definition and its ordered-search setting.",
      },
      {
        ...s.bloom,
        note: "Primary paper introducing the hash-storage tradeoff with allowable errors.",
      },
    ],
    reflection:
      "Which wrong answer can your application tolerate, and where will an approximate answer be checked exactly?",
  },
  {
    slug: "sampling-bias-publication-bias-ecological-fallacy",
    title:
      "Sampling bias vs publication bias: why more visible data can still mislead",
    description:
      "Audit who entered a sample, which studies became visible and whether a group pattern supports an individual claim, with worked examples and a practical review checklist.",
    topic: "Evidence & causality",
    published: "2026-10-28",
    takeaway:
      "Ask three separate questions: who could enter the sample, which results became visible, and whether the conclusion stays at the level the data support.",
    intro:
      "A large dataset can exclude a crucial group. A collection of published studies can omit the results that failed a selection rule. A district-level pattern can be incorrectly attributed to individuals. These errors occur at different stages, and adding another decimal place will not fix them. A useful evidence audit traces the route from the intended population to the claim a reader is asked to accept.",
    sections: [
      {
        id: "coverage",
        title: "Coverage comes before response count",
        paragraphs: [
          "The sampling frame defines who has a route into a study. If an online-only survey excludes offline households and the excluded group differs on the outcome, increasing online responses cannot close that coverage gap. This is a different issue from ordinary random variation among representative samples.",
          "The [sampling-bias activity](/effects/sampling-bias) uses an invented town with eighty online and twenty offline households. Sixty online households support a proposal; only five offline households do. The complete ledger makes the target quantity known, allowing you to inspect the selection mechanism directly. [OpenStax’s sampling chapter](https://openstax.org/books/introductory-statistics-2e/pages/1-2-data-sampling-and-variation-in-data-and-sampling) provides university-level context. The numbers do not estimate real internet access or political opinion; their purpose is to separate a coverage problem from an impressive-looking response count.",
        ],
      },
      {
        id: "availability",
        title: "Publication adds a selection stage after data collection",
        paragraphs: [
          "Publication bias concerns which results become available to readers. Even if each underlying study follows the stated sampling model, selecting what is shown according to its findings changes the visible evidence. The missing results matter because the visible subset was not chosen independently of the statistic being interpreted.",
          "Open the [publication-bias file drawer](/effects/publication-bias). One hundred synthetic studies estimate a true mean of zero, but a journal displays only two-sided z scores beyond 1.96. [Rosenthal’s file-drawer paper](https://doi.org/10.1037/0033-2909.86.3.638) supplies primary methodological context. Notice that selected absolute estimates are exaggerated even when positive and negative estimates balance to a signed mean near zero. A small selected mean does not by itself show that selection is harmless, just as this stipulated rule does not measure actual publication practices in a field.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: reconstruct the excluded population",
        paragraphs: [
          "Use the fictional household counts to make the target, frame and selected estimate explicit. The arithmetic is exact because the complete population is supplied; a real survey usually requires additional information to assess the missing group.",
        ],
        steps: [
          "Choose the online-only frame and calculate sixty supporters among eighty households, giving seventy-five percent. This is an accurate summary of the selected frame even though it is not the complete-town support rate.",
          "Reveal twenty offline households with five supporters. Combining groups gives sixty-five supporters among one hundred households, or sixty-five percent, which differs by ten percentage points from the online summary.",
          "Imagine collecting more online responses without adding offline access. Precision within that frame could improve, but the unsupported population generalisation remains. Document the frame rather than describing the gap as ordinary sampling noise.",
        ],
      },
      {
        id: "levels",
        title: "A correct group summary can still support the wrong inference",
        paragraphs: [
          "The [ecological-fallacy exercise](/effects/ecological-fallacy) shows two districts with a positive relationship between library access and passing. Detailed cells then reveal that access and passing are unrelated within each district in the stipulated table. The between-district association does not establish the same individual relationship or a causal effect of access.",
          "This does not make aggregate evidence useless. It means the level of the claim needs justification. A district-level resource question can be answered at that level; an individual causal claim needs more. Keep the group summary, the individual comparison and the causal interpretation separately labelled. Otherwise an accurate calculation can be repeated confidently while the unsupported step occurs in the sentence describing what the calculation supposedly means.",
        ],
      },
      {
        id: "checklist",
        title: "A short selection audit before sharing a result",
        paragraphs: [
          "Treat this as an evidence map rather than a checklist that mechanically certifies a study. Several selection stages can interact, and one can remain unresolved even when another is well documented. The useful output is a clear statement of what was observed, what remains missing and which conclusions depend on assumptions about that missing information.",
        ],
        checklist: [
          "Name the intended population and identify who had no opportunity to enter the sampling frame.",
          "Separate nonresponse, coverage and random variation rather than treating them as one generic uncertainty.",
          "Ask whether result availability depended on significance, direction, novelty or another outcome-related filter.",
          "Keep aggregate descriptions distinct from claims about individuals and from causal explanations.",
          "Report the assumptions needed to extend beyond the observed frame or visible set of studies.",
        ],
      },
      {
        id: "sensitivity",
        title: "A robust summary does not repair selection",
        paragraphs: [
          "The [robust-statistics board](/effects/robust-statistics) shows how a median can resist one extreme observation while an arithmetic mean moves substantially. That is useful sensitivity analysis, but it does not recover people excluded from a sample or studies hidden in a file drawer. Resistance to one departure is not a general guarantee that the evidence answers the intended question.",
          "Likewise, [range restriction](/effects/range-restriction) changes observed correlation by selecting a narrow predictor band while preserving the generating relationship. Each board isolates a particular stage of the problem. Use the distinctions together: inspect the frame, availability rule, measurement and level of inference before selecting a numerical summary. More data can improve an answer only after it is clear which question those data are actually positioned to answer.",
        ],
        deeper: {
          title: "Precision can improve around the wrong target",
          text: "An estimate can become less variable within a selected frame while remaining systematically different from the population quantity of interest. The exact online support rate in the toy is seventy-five percent; knowing it perfectly would still not turn it into the town’s sixty-five-percent support rate.",
        },
      },
    ],
    experiments: [
      {
        slug: "sampling-bias",
        task: "Compare a complete population rate with an exact online-frame rate.",
      },
      {
        slug: "publication-bias",
        task: "Open the drawer and inspect the selection of absolute study estimates.",
      },
      {
        slug: "ecological-fallacy",
        task: "Unpack a district summary into individual-level cells before generalising.",
      },
    ],
    sources: [
      {
        ...s.sampling,
        note: "University-level introduction to sampling and selection problems.",
      },
      {
        ...s.publication,
        note: "Primary methodological discussion of hidden null results.",
      },
    ],
    reflection:
      "At which selection stage would the missing information most change the claim you are making?",
  },
  {
    slug: "bertrands-paradox-random-chords-explained",
    title:
      "Bertrand’s paradox explained: random is a procedure, not a complete probability model",
    description:
      "Compare three random-chord protocols, then use Poisson arrivals and random-walk occupation to understand why informal randomness claims can hide different questions.",
    topic: "Probability & paradoxes",
    published: "2026-10-28",
    takeaway:
      "Specify how the random object is generated. Symmetry, fairness and a constant average rate do not uniquely determine every finite-path probability you might ask about.",
    intro:
      "What is the probability that a random chord is longer than the side of an inscribed equilateral triangle? The surprising part is that random chord is not yet a complete instruction. Different precise procedures produce different answers. The same habit of asking for the generator also helps with arrival streams, waiting times and claims that a fair process should look balanced in every short run.",
    sections: [
      {
        id: "question",
        title: "Keep the geometry fixed while changing the measure",
        paragraphs: [
          "For a unit circle, an inscribed equilateral triangle has side length square root of three. A chord’s length depends on the distance of its midpoint from the centre: the chord exceeds that threshold when this distance is below one-half. Those geometric facts stay the same across the three protocols in the experiment.",
          "The [Bertrand chord board](/effects/bertrands-chord-paradox) changes how the chord is sampled. It can choose random endpoints, a uniformly distributed radial midpoint distance, or a midpoint uniformly distributed over disk area. [Jaynes’s discussion of the well-posed problem](https://doi.org/10.1007/BF00709116) supplies primary context for the importance of a defined sampling question. The activity explicitly compares protocols rather than announcing that every use of random chord must refer to one uniquely intended physical mechanism.",
        ],
      },
      {
        id: "area",
        title: "Uniform radius and uniform area are not the same instruction",
        paragraphs: [
          "A ring of equal radial thickness covers more area near a circle’s edge than near its centre. Sampling the radius uniformly therefore does not sample locations uniformly over disk area. For uniform area, the midpoint radius is the square root of a uniform draw between zero and one.",
          "That difference changes the fraction of midpoints within radius one-half. Uniform radius gives one-half; uniform area gives one-quarter because area scales with squared radius. Choosing random endpoints gives another distance distribution and the one-third answer. These probabilities are not rival arithmetic solutions to the same fully specified procedure. They are answers to distinct procedures that the informal wording left unresolved. Drawing more chords estimates the chosen procedure more precisely; it cannot decide which procedure the speaker originally meant.",
        ],
      },
      {
        id: "worked-example",
        title:
          "Worked example: estimate the answer only after choosing the generator",
        paragraphs: [
          "The board uses pseudo-random teaching draws and a fixed geometric threshold. Compare its finite fractions with the exact probabilities without demanding exact agreement in a batch of one hundred.",
        ],
        steps: [
          "Choose random endpoints and draw one hundred chords. Count the chords whose midpoint distance is below one-half and compare the realised long-chord fraction with one-third under this protocol.",
          "Switch to uniform radius and generate a new batch under that measure. The reference probability becomes one-half even though the circle and length threshold have not changed.",
          "Switch to uniform midpoint area and inspect the one-quarter reference. Explain the square-root radius transform before treating the new estimate as another observation of the earlier protocol.",
        ],
      },
      {
        id: "arrivals",
        title: "A constant rate does not mean a regular timetable",
        paragraphs: [
          "The [Poisson-arrival activity](/effects/poisson-process) poses a different generation question. Independent exponential gaps create arrivals at a constant average rate. The count in a short interval fluctuates and the gaps are uneven, even though the rate parameter does not change. A scheduled arrival process would have a different structure.",
          "[MIT’s stochastic-process course notes](https://ocw.mit.edu/courses/6-262-discrete-stochastic-processes-spring-2011/pages/course-notes/) provide university material on this process. In the board, two expected arrivals per minute imply twenty over ten minutes in expectation and a mean gap of one-half minute. They do not require twenty arrivals in each realised stream. State whether independent increments and a constant rate are plausible before using that model for demand, calls or visits with rush hours and dependence.",
        ],
      },
      {
        id: "checklist",
        title: "Questions to ask whenever a probability sounds obvious",
        paragraphs: [
          "A clear generator often resolves an apparent paradox faster than another formula. It also makes a simulation auditable: a reader should be able to reproduce the sampling rule, target event and conditioning information. If those differ between explanations, compare the models explicitly rather than averaging their answers or choosing the one that feels most symmetric.",
        ],
        checklist: [
          "Define the random object and the exact procedure or probability measure used to generate it.",
          "Specify the event being counted and the units or geometry that define its threshold.",
          "Distinguish a uniform coordinate from a uniform area, volume or other transformed quantity.",
          "Keep expected values across repetitions separate from requirements on every realised sample path.",
          "Name the conditioning information before assuming that an elapsed wait changes the next event’s odds.",
        ],
      },
      {
        id: "paths",
        title: "Fair paths need not spend equal time on each side",
        paragraphs: [
          "The [arcsine occupation activity](/effects/arcsine-law) offers another useful surprise. Symmetric random walks can average near one-half positive occupation across many histories while individual walks spend much of the finite horizon on one side. Symmetry of an ensemble does not force each realised history to resemble the average history.",
          "The [memoryless waiting board](/effects/memoryless-property) similarly separates the initial rarity of a long unsuccessful wait from the unchanged next-attempt probability under independent geometric trials. Neither model should be applied by naming it alone. Check the generator, conditioning and question first. A good simulation makes those choices visible, and a good explanation preserves them when moving from a toy example to a real observation.",
        ],
        deeper: {
          title: "Why a coordinate transformation changes a uniform draw",
          text: "Uniform sampling refers to a measure, not to every possible coordinate simultaneously. Transforming a uniform radius into an area coordinate squares it; transforming a uniform area draw back into radius takes a square root. The distribution changes unless the transformation’s effect is accounted for.",
        },
      },
    ],
    experiments: [
      {
        slug: "bertrands-chord-paradox",
        task: "Compare three sampling measures under the same length threshold.",
      },
      {
        slug: "poisson-process",
        task: "Reveal uneven arrivals under a fixed average event rate.",
      },
      {
        slug: "arcsine-law",
        task: "Compare average occupation with the spread across individual walk histories.",
      },
    ],
    sources: [
      {
        ...s.chord,
        note: "Primary discussion of specifying the random-chord problem.",
      },
      {
        ...s.poisson,
        note: "University course notes on Poisson and related stochastic processes.",
      },
    ],
    reflection:
      "What generator and conditioning information are missing from the probability statement you initially found obvious?",
  },
];
