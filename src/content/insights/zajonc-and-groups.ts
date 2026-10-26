import type { Insight } from "./types";
import { horizonSources as s } from "@/data/horizons-expansion";
export const zajoncAndGroups: Insight[] = [
  {
    slug: "robert-zajonc-explained-beyond-mere-exposure",
    title:
      "Robert Zajonc explained: habits, audiences, feelings and familiarity",
    description:
      "Explore Robert Zajonc beyond mere exposure through social facilitation, affective priming and separate liking-versus-recognition judgments, with practical experiments.",
    topic: "Zajonc & social psychology",
    published: "2026-10-27",
    takeaway:
      "Being familiar, being liked, being remembered and being easy to perform are different properties. Zajonc's work offers questions about their relationships, not one rule that explains every response.",
    intro:
      "Robert Zajonc is often introduced through the mere exposure effect: repeated encounters can affect liking. His work also asks what happens to habitual responses around other people, how affect relates to cognition, and whether preference and recognition are the same judgment. This guide connects four Modic activities while keeping their questions, methods and limitations distinct.",
    sections: [
      {
        id: "questions",
        title: "Start with four questions rather than one personality theory",
        paragraphs: [
          "Does an audience make the most likely response more likely? Can repeated exposure change liking? Can prior affective context influence an evaluation? Can someone prefer a previously encountered stimulus without accurately identifying it as old? These questions overlap, but an answer to one does not automatically settle the others. They concern performance, exposure, evaluation and memory, each requiring an appropriate way to observe the proposed relationship.",
          "Avoid turning this research programme into a claim that people never think or that all preferences can be manipulated predictably. A psychological proposal can be useful precisely because it identifies a distinction that everyday language collapses. The activities below make those distinctions inspectable. They do not place the reader inside the original laboratory procedures or infer a psychological profile from a few clicks.",
        ],
      },
      {
        id: "audience",
        title: "An audience can strengthen the wrong response",
        paragraphs: [
          "[Zajonc's social-facilitation account](https://cdn.isr.umich.edu/pubFiles/historicPublications/Socialfalicitation_2280_.PDF) emphasises dominant responses. The useful distinction is whether the response most likely to occur is appropriate for the current task. A familiar routine and a reversal of that routine can therefore respond differently to the same proposed strengthening mechanism. Task difficulty is a clue to investigate, rather than a sufficient explanation on its own.",
          "In the [social-facilitation experiment](/effects/social-facilitation), the model habit chooses A. The ordinary instruction requires A, while the reversed instruction requires B. Adding the audience term strengthens A in both cases. Expected correctness rises in one case and falls in the other. That direction follows the authored rule; the numerical percentages are not historical effect sizes or a forecast of how you perform while watched.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: keep the habit, reverse the instruction",
        paragraphs: [
          "Use the same habit and audience settings for both tasks. The goal is to explain a direction change without pretending that the simulator measured your nervous system. Its coefficients are teaching choices, so the meaningful result is the relationship among the rule, the required response and the output.",
        ],
        steps: [
          "With habit strength one, the model chooses A with probability about 73.1%. Adding audience boost one raises that probability to about 88.1%.",
          "When A is required, those probabilities are also correctness probabilities. The audience term improves expected correctness under the stipulated mechanism.",
          "Reverse the instruction to require B. Correctness is now about 26.9% alone and 11.9% with the boost. A stronger habit has become a disadvantage because the task changed.",
        ],
      },
      {
        id: "memory",
        title: "Liking is a response; recognition is another response",
        paragraphs: [
          "[Kunst-Wilson and Zajonc's affective-discrimination research](https://pubmed.ncbi.nlm.nih.gov/7352271/) examined preference and recognition under degraded exposures. That distinction is more precise than saying that a familiar feeling proves someone remembers an encounter. An old–new judgment can be checked against exposure history. A preference judgment records which option someone likes; it does not become wrong because another option is objectively older.",
          "The [liking-and-recognition activity](/effects/liking-and-recognition) records both judgments separately for original patterns. Its study cards are fully visible and untimed. It therefore illustrates the measurement distinction while deliberately avoiding a claim to reproduce limited-awareness conditions. Eight responses can invite a useful question, but they cannot establish an unconscious mechanism or a reliable individual dissociation.",
        ],
      },
      {
        id: "exposure-context",
        title: "Exposure and affective context are different manipulations",
        paragraphs: [
          "In [mere exposure](/effects/mere-exposure-effect), readers rate two patterns, encounter one more often, then rate them again. The software reports actual exposure counts and rating changes. It never manufactures an increase in liking. Familiarity, boredom, initial preference and knowledge of the task can all matter when interpreting an informal attempt.",
          "The [affective-priming activity](/effects/affective-priming) changes visible context words before pattern ratings. That manipulation differs from simply showing an item more often. A response following DELIGHT is not automatically caused by the word, especially in a small unblinded activity. Record the context and inspect the design before replacing an observed rating difference with a confident causal story.",
        ],
      },
      {
        id: "checklist",
        title: "A practical reading checklist for Zajonc-related claims",
        paragraphs: [
          "When a headline invokes Zajonc, identify the exact task and response before applying it. A performance result is not a memory result, and an exposure manipulation is not a demonstration of every theory about affect. Read the proposed explanation alongside alternative explanations and the actual measurement conditions.",
        ],
        checklist: [
          "Identify whether the outcome is accuracy, speed, preference or recognition.",
          "Ask which response is dominant and whether it is appropriate.",
          "Separate visible exposure from degraded or masked exposure.",
          "Check whether ratings were supplied by participants or assumed by a model.",
          "Distinguish a personal demonstration from a controlled comparison.",
          "State what additional evidence would challenge the explanation.",
        ],
      },
      {
        id: "application",
        title: "Use the distinctions to improve a real learning task",
        paragraphs: [
          "Suppose you are preparing a demonstration of a new workflow. First ask whether the old workflow remains the dominant response. Practise the specific changed step rather than assuming general familiarity will transfer. Then evaluate the new workflow with a task that requires the correct response, not merely a rating that it feels familiar. Preference can be informative without serving as a substitute for demonstrated use.",
          "For a design review, keep initial liking, remembered exposure and task success in separate columns. That simple record prevents one positive impression from becoming evidence for every desirable property. The point of these activities is a better question and a clearer observation. Their small samples and transparent teaching rules are useful for learning the distinction, while the linked primary research is where the historical claims and methods should be examined.",
        ],
      },
    ],
    experiments: [
      {
        slug: "social-facilitation",
        task: "Reverse the task while preserving the dominant response.",
      },
      {
        slug: "liking-and-recognition",
        task: "Record preference and memory as separate judgments.",
      },
      {
        slug: "affective-priming",
        task: "Inspect actual ratings after visible contexts.",
      },
    ],
    sources: [
      {
        ...s.facilitation,
        note: "Zajonc's primary account of dominant responses and social facilitation.",
      },
      {
        ...s.recognition,
        note: "Primary research distinguishing affective preference from old–new recognition.",
      },
    ],
    reflection:
      "Which property of an option have you been treating as evidence for a different property: familiarity, liking, memory or successful performance?",
  },
  {
    slug: "social-facilitation-audience-performance-zajonc",
    title:
      "Social facilitation: why an audience can help a routine and disrupt a new task",
    description:
      "Understand Zajonc's dominant-response account of social facilitation, compare familiar and reversed tasks, and design a clearer rehearsal without invented performance claims.",
    topic: "Performance & practice",
    published: "2026-10-27",
    takeaway:
      "Before asking whether people help or hurt performance, ask which response their presence is strengthening and whether that response fits the task.",
    intro:
      "You can perform a routine smoothly in front of others and stumble when the instructions change. The difference is not explained by a blanket rule that audiences are good or bad. Social facilitation research asks how the social setting interacts with the response a task is likely to elicit. Modic's model makes one historical explanation explicit so you can test its logic without mistaking it for a measurement of your personal performance.",
    sections: [
      {
        id: "definition",
        title: "What social facilitation means in this account",
        paragraphs: [
          "Social facilitation broadly concerns performance changes in the presence of other people. In the dominant-response account associated with Robert Zajonc, the central question is whether a strengthened response helps the current task. A well-learned correct action can benefit; a likely but incorrect action can interfere. The same proposed mechanism can therefore produce outcomes in opposite directions.",
          "The primary [Social Facilitation paper](https://cdn.isr.umich.edu/pubFiles/historicPublications/Socialfalicitation_2280_.PDF) is the starting reference for that account. Treat it as an explanation to examine, with a particular research history, rather than a universal law about confidence. Audiences can involve evaluation, attention, relationships and incentives as well as mere presence. A single teaching model cannot include all those features.",
        ],
      },
      {
        id: "dominance",
        title: "Dominant does not mean correct or desirable",
        paragraphs: [
          "A dominant response is the response most likely under the relevant conditions. It might be an appropriate practised action, an obsolete shortcut or a response that conflicts with a new instruction. Describing it as dominant does not praise it. That vocabulary helps explain why simply practising more of the old task may not prepare you for a changed version.",
          "The [social-facilitation experiment](/effects/social-facilitation) fixes a habit favouring A and lets you reverse the required response. The audience parameter raises the log-odds of A, not an abstract performance score. Read the instruction before reading the result. If the instruction requires B, improving the strength of A lowers correctness by construction. The output follows a specified response rule rather than a judgment about the reader's skill.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: the same boost, a different result",
        paragraphs: [
          "Use a small comparison you can explain before running the sampled attempts. Expected probabilities describe the model's rule. The hundred-attempt results then add sampling variation, so neither individual batch nor a pleasing graph should be treated as the historical result itself.",
        ],
        steps: [
          "Keep the default habit and audience boost. With A required, compare the expected correctness alone and with the audience term, then simulate one hundred paired attempts.",
          "Reverse the task instruction to B without changing the habit or boost. Explain why the expected direction changes before reading the new sampled counts.",
          "Set the audience boost to zero. The expected difference vanishes because the model no longer changes response probability between conditions; this is an inspectable model check, not a psychological finding.",
        ],
      },
      {
        id: "practice",
        title: "Rehearse the decision that changes, not just the motion",
        paragraphs: [
          "A practical rehearsal question is whether you must select a new response or simply execute an already selected one. If a familiar keyboard shortcut now does the wrong thing, practice should require detecting the changed context and selecting the appropriate action. Repeating an unchanged routine can build fluency while leaving that decision untested.",
          "The [interleaving activity](/effects/interleaving) offers a complementary example. Mixed area and perimeter problems require selecting a procedure instead of repeating whichever procedure the previous question supplied. It does not test an audience effect, but it helps distinguish performing a known method from deciding which method applies. Keep those learning targets separate when interpreting a rehearsal score.",
        ],
      },
      {
        id: "evidence",
        title: "Do not infer an explanation from a score difference alone",
        paragraphs: [
          "A later primary study, [social facilitation of dominant and subordinate responses](https://www.sciencedirect.com/science/article/pii/0022103166900771), addresses the response distinction directly. In your own comparison, a performance difference could also reflect changed instructions, feedback, practice, fatigue or the people involved. Observing a difference is the beginning of an explanation, not an automatic identification of its cause.",
          "The [cognitive-load activity](/effects/cognitive-load) demonstrates another source of competing task demands. Its arithmetic condition also changes retention time, so the interface states that it cannot isolate a pure load effect. Apply the same discipline to audience comparisons: record what else changed and resist giving the most memorable theory all the explanatory credit.",
        ],
        deeper: {
          title: "Inside the teaching equation",
          text: "If s is habit strength and a is the authored audience boost, P(A) is logistic(s) alone and logistic(s+a) with the boost. Correctness is P(A) when A is required and 1−P(A) when B is required. This explicitly produces opposite directions without fitting any human effect size.",
        },
      },
      {
        id: "checklist",
        title: "A rehearsal note with useful observations",
        paragraphs: [
          "Write a compact note before making a performance claim. Include the response that must change and the evidence that would show the practice transferred. This makes the result more useful than remembering only that a public attempt felt difficult or a private attempt went well.",
        ],
        checklist: [
          "State the exact task and the required response.",
          "Identify an existing habit that could conflict with it.",
          "Record social setting, timing, feedback and prior attempts.",
          "Measure the actual outcome needed: accuracy, speed or both.",
          "Use new cases when checking transfer rather than only repeating a memorised sequence.",
        ],
      },
      {
        id: "limits",
        title: "An informal activity does not diagnose performance anxiety",
        paragraphs: [
          "The model contains no assessment of stress, personality or mental health. Its audience coefficient is a slider precisely because it is an assumption the reader can inspect. A person can have several competing responses, and real tasks involve more than a binary A-versus-B choice. A result from this board cannot establish which mechanism explains an individual's real presentation or exam.",
          "Use it to improve the specificity of a question: what response is likely, what response is required, and what changed between conditions? That sequence can guide better observation and more relevant practice while leaving individual explanations open. The benefit of the exercise is a testable account of the task, rather than a promise that a particular audience arrangement will always improve the next attempt.",
        ],
      },
    ],
    experiments: [
      {
        slug: "social-facilitation",
        task: "Compare an appropriate habit with a reversed instruction.",
      },
      {
        slug: "interleaving",
        task: "Practise choosing the method before executing it.",
      },
      {
        slug: "cognitive-load",
        task: "Inspect competing demands and their interpretation limits.",
      },
    ],
    sources: [
      { ...s.facilitation, note: "Primary theoretical account from Zajonc." },
      {
        title: "Zajonc and Sales — Dominant and subordinate responses",
        url: "https://www.sciencedirect.com/science/article/pii/0022103166900771",
        note: "Primary research focused on the response distinction.",
      },
    ],
    reflection:
      "Which part of a task needs a new response rather than a stronger version of an old response?",
  },
  {
    slug: "affective-priming-vs-mere-exposure-liking-recognition",
    title:
      "Affective priming vs mere exposure: what a feeling can—and cannot—tell you",
    description:
      "Separate context effects, repeated exposure, preference and recognition with Zajonc-related activities, actual rating records and practical guidance for reading psychological claims.",
    topic: "Perception & judgment",
    published: "2026-10-27",
    takeaway:
      "A preference is an observation worth recording. Explaining why it occurred requires a design that separates exposure, context, memory and other plausible causes.",
    intro:
      "A symbol seems warmer after a positive word. A familiar option feels easier to choose. You like a pattern without being sure where you saw it. These experiences can sound like the same effect, but they involve different manipulations and different responses. This guide separates them using three Modic activities that preserve your actual judgments instead of making the expected theory appear automatically.",
    sections: [
      {
        id: "distinctions",
        title: "Separate what changed from what was measured",
        paragraphs: [
          "Mere exposure changes encounter frequency. Affective priming changes preceding affective context. Recognition asks whether a stimulus was encountered before; liking asks which option is preferred or how pleasant it seems. The manipulation and the response are different parts of an experiment. A useful explanation names both, rather than putting every familiarity-related result under one label.",
          "A rating difference alone does not reveal which process produced it. The target may differ, the context may supply an explicit clue, or the task may make its intended comparison obvious. Keeping a record of what appeared and what the reader actually selected makes those alternatives easier to discuss. It does not remove them, but it avoids replacing an observed response with a theoretical assumption.",
        ],
      },
      {
        id: "priming",
        title: "Affective priming depends on exposure conditions",
        paragraphs: [
          "[Murphy and Zajonc's primary study](https://pubmed.ncbi.nlm.nih.gov/8505704/) examined affective priming under particular stimulus-exposure and awareness conditions. The words optimal and suboptimal exposure refer to a research manipulation, not a recommendation that a web page flash material briefly and call the result unconscious. Timing, masking, awareness measures and comparison conditions matter to the interpretation.",
          "The [affective-priming activity](/effects/affective-priming) instead uses visible DELIGHT, DREAD and NEUTRAL contexts with manual advancement. You supply each rating. Its summary is a record of those ratings, not a causal estimate or proof of an unconscious response. The design intentionally prioritises an inspectable learning activity over an unsupported claim that ordinary browser interaction recreates a subliminal experiment.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: audit the rating record",
        paragraphs: [
          "Complete the activity without aiming to make a particular context win. You are observing one attempt under visible conditions. The most valuable result is an explanation of what the recorded differences mean and what additional controls would be needed, including if there is no difference at all.",
        ],
        steps: [
          "Rate each original pattern after the displayed context using one for unpleasant and five for pleasant. Keep the saved ratings as entered rather than revising them to fit a theory.",
          "Inspect the ratings grouped by visible context. A mean is a summary of those responses; it does not identify what caused them or establish awareness conditions.",
          "List alternative explanations such as symbol preference, presentation order, repetition and knowing the task. Decide which change to the design would address each explanation before proposing a causal conclusion.",
        ],
      },
      {
        id: "recognition",
        title: "Preference and old–new memory need separate questions",
        paragraphs: [
          "[Kunst-Wilson and Zajonc](https://pubmed.ncbi.nlm.nih.gov/7352271/) investigated affective discrimination and recognition under degraded exposures. The measurement distinction is straightforward even when the research interpretation is more demanding: asking what someone likes is different from testing whether they can identify a previously encountered target. The two responses should not be silently substituted for one another.",
          "In [liking and recognition](/effects/liking-and-recognition), each pair receives both judgments. The preference is recorded without being marked wrong; the old–new judgment can be checked against the study sequence. Its ordinary visible study cards and repeated targets mean it cannot establish the original limited-recognition result. A difference between two small counts is a prompt to examine methods, not a statistical dissociation by itself.",
        ],
      },
      {
        id: "exposure",
        title: "Repeated exposure is another hypothesis to inspect",
        paragraphs: [
          "The [mere-exposure activity](/effects/mere-exposure-effect) asks for ratings before and after unequal exposure counts. It reports the actual change rather than awarding a simulated increase in liking. A familiar pattern can become more liked, less liked or unchanged in a particular informal attempt. That honesty matters: a demonstration that forces the expected result teaches the label while concealing the uncertainty.",
          "When evaluating an unfamiliar product or idea, consider familiarity separately from evidence of usefulness. Something can be familiar and poor, novel and useful, or liked for reasons unrelated to the task. A careful review can record preference while also asking whether the option meets requirements and whether a reader can use it successfully. Those are complementary observations, not interchangeable scores.",
        ],
      },
      {
        id: "checklist",
        title: "A context-aware evaluation record",
        paragraphs: [
          "You do not need to deny an immediate reaction to examine it carefully. Record the reaction first, then evaluate the evidence relevant to the decision. The record should make it possible to tell a preference judgment from a claim about quality, memory or causal influence.",
        ],
        checklist: [
          "Name the context and exposure history you actually know.",
          "Record the response before explaining it.",
          "Separate liking from recognition and task success.",
          "Ask whether the target, order or instructions changed too.",
          "Avoid calling an exposure subliminal without an appropriate method.",
          "Treat small informal comparisons as demonstrations with limits.",
        ],
      },
      {
        id: "application",
        title: "Use a feeling as a starting point for inquiry",
        paragraphs: [
          "For a design review, one practical approach is to collect an initial preference, a reason if the reviewer can supply one, and a separate task-based observation. A reason supplied after the fact is not guaranteed access to the complete process that produced a response. Equally, uncertainty about the process does not make the response meaningless. It tells you what evidence is still missing.",
          "The lesson is a disciplined separation: what appeared, what was reported, what changed and what the design can establish. These activities make each part visible and leave room for an unchanged or unexpected response. That is more useful for learning than a page that declares a psychological effect happened to every reader, regardless of the ratings they actually gave.",
        ],
      },
    ],
    experiments: [
      {
        slug: "affective-priming",
        task: "Inspect context-grouped ratings without assuming their cause.",
      },
      {
        slug: "liking-and-recognition",
        task: "Answer preference and recognition questions separately.",
      },
      {
        slug: "mere-exposure-effect",
        task: "Compare actual rating changes with actual exposure counts.",
      },
    ],
    sources: [
      {
        ...s.priming,
        note: "Primary affective-priming study with explicit exposure conditions.",
      },
      {
        ...s.recognition,
        note: "Primary study distinguishing affective discrimination and recognition.",
      },
    ],
    reflection:
      "What extra evidence would turn your explanation of a preference from a plausible story into a defensible claim?",
  },
  {
    slug: "pluralistic-ignorance-abilene-paradox-team-decisions",
    title:
      "Pluralistic ignorance and the Abilene paradox: when agreement hides what people want",
    description:
      "Learn why visible compliance can misrepresent private preferences, compare two group-decision problems, and use a practical preference-checking routine.",
    topic: "Teams & collective decisions",
    published: "2026-10-27",
    takeaway:
      "Public agreement is evidence about what people said or did. It is not a direct measurement of what each person privately prefers or believes others prefer.",
    intro:
      "Everyone attends the meeting, so the organiser assumes everyone wants it. Nobody objects to the proposed trip, so the group books it. Later, people say they would have preferred a different plan. Before blaming indecision or dishonesty, examine the information available when each person answered. Pluralistic ignorance and the Abilene paradox offer related but distinct ways to inspect that gap.",
    sections: [
      {
        id: "belief",
        title: "Pluralistic ignorance is a mistaken social belief",
        paragraphs: [
          "Pluralistic ignorance concerns a mismatch between private attitudes and beliefs about other people's attitudes. Visible behaviour can sustain the mismatch when people treat compliance as enthusiasm. If several people do the same thing while privately wishing otherwise, each can mistakenly interpret the others' behaviour as evidence that their own preference is unusual.",
          "[Prentice and Miller's research](https://collaborate.princeton.edu/en/publications/pluralistic-ignorance-and-alcohol-use-on-campus-some-consequences/) examined misperceived social norms in a specific campus setting. That research does not imply that every quiet team shares one hidden preference. It supplies a question to investigate: what do members privately prefer, what do they believe others prefer, and what observation supports that belief? Those are distinct pieces of information.",
        ],
      },
      {
        id: "meeting",
        title: "Visible attendance can conceal different reasons",
        paragraphs: [
          "In [pluralistic ignorance](/effects/pluralistic-ignorance), eight fictional teammates attend late meetings. The simulation stipulates that six prefer an earlier time while everyone assumes others mostly want the late time. Before the preference poll, attendance alone cannot tell you that split. After the reveal, the contrast is obvious because the teaching model knows the private responses.",
          "Real attendance can reflect a requirement, coordination cost, loyalty or a belief that alternatives are unavailable. Even a genuine preference poll may reveal that the preferred time is infeasible. Correcting a belief is useful, but it is not the same as solving the practical scheduling problem. Keep support, constraints and willingness to act in separate parts of the decision note.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: ask a different question before booking",
        paragraphs: [
          "The following comparison uses the authored overnight-trip scenario. Its outcome is deliberately clean so the mechanism can be inspected. A real group may have mixed preferences rather than unanimous private opposition, and the procedure should be capable of revealing that too.",
        ],
        steps: [
          "In the Abilene activity, privately prefer staying while hearing colleagues say the trip is fine. Choose the agreement path and inspect the eventual private-preference ledger.",
          "Reset and ask for private preferences before committing. In this specified scenario all four prefer staying, so the trip is cancelled instead of booked.",
          "Compare outcomes while holding preferences fixed. The change comes from the information procedure, not a newly discovered dislike of travel or a claim that polling always produces unanimity.",
        ],
      },
      {
        id: "abilene",
        title: "The Abilene paradox concerns a group action",
        paragraphs: [
          "[Jerry Harvey's Abilene account](https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Group_Dynamics/Harvey_Abilene_Paradox.pdf) frames the issue as managing agreement: a group can take an action contrary to members' private wishes because they misread the apparent consensus. This is different from a group consciously accepting a compromise among genuinely competing preferences. The distinction matters because the appropriate next question differs.",
          "The [Abilene game](/effects/abilene-paradox) gives each colleague a reason for a public yes. Those reasons point to beliefs about others, not an actual wish to take the trip. Read the ledger rather than concluding simply that agreement is bad. Agreement can be sincere and valuable. The problem is treating an unexamined public signal as a complete account of the members' preferences.",
        ],
      },
      {
        id: "cascade",
        title: "Agreement can also follow the order in which people speak",
        paragraphs: [
          "An [information cascade](/effects/information-cascade) is another mechanism to distinguish. A later person may follow observed prior actions even when their own private signal differs. The group can appear increasingly certain without receiving the amount of independent evidence the visible agreement suggests. That is an information aggregation issue, not necessarily the same all-opposed scenario as the Abilene example.",
          "Before a meeting, independent written judgments can preserve information that would otherwise be overwritten by the first confident answer. They are useful when the task actually benefits from independent evidence or preferences. They also need an interpretation plan: anonymity does not automatically eliminate pressure, and a majority answer does not settle a factual question or establish a fair outcome.",
        ],
      },
      {
        id: "checklist",
        title: "A short preference-checking routine",
        paragraphs: [
          "Choose a low-burden procedure that fits the decision and makes disagreement usable. The aim is to improve the information available before commitment, rather than collecting a poll merely to validate a plan already chosen. Separate a person's own preference from what they predict the group prefers.",
        ],
        checklist: [
          "Ask for individual preferences before summarising apparent support.",
          "Ask separately what each person believes others prefer.",
          "Record constraints that could explain public compliance.",
          "Offer a clear way to state uncertainty or withhold judgment.",
          "Explain how the information will affect the decision.",
          "Recheck after a concrete alternative becomes available.",
        ],
      },
      {
        id: "limits",
        title: "A useful poll still needs a decision rule",
        paragraphs: [
          "Revealing private preferences can expose a mistaken belief, but the group still needs to decide how preferences, responsibilities and constraints will be handled. A meeting time may advantage one person and disadvantage another. A preference count does not automatically specify whose needs should take priority. That requires a defensible rule and a chance to understand consequences.",
          "Treat these concepts as prompts for better questions rather than labels to apply to colleagues after a disappointing outcome. Ask what information each person had, what the procedure made easy to express and what commitment was made before alternatives were examined. The practical improvement is a clearer record of preferences and beliefs, with room for genuine disagreement, rather than a promise that every group secretly wants the same thing.",
        ],
      },
    ],
    experiments: [
      {
        slug: "pluralistic-ignorance",
        task: "Compare public attendance with an anonymous private-preference reveal.",
      },
      {
        slug: "abilene-paradox",
        task: "Change the information procedure while keeping preferences fixed.",
      },
      {
        slug: "information-cascade",
        task: "Inspect what later people learn from earlier actions.",
      },
    ],
    sources: [
      { ...s.norms, note: "Primary research on misperceiving a social norm." },
      {
        ...s.abilene,
        note: "Harvey's account of the management-of-agreement problem.",
      },
    ],
    reflection:
      "What independent preference or private signal might disappear if your next discussion starts with an apparent consensus?",
  },
];
