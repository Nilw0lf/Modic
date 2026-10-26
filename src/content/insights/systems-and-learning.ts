import type { Insight } from "./types";
import { depthSources as s } from "@/data/depth-expansion";
export const systemsAndLearning: Insight[] = [
  {
    slug: "feedback-loops-delay-overcorrection",
    title: "Why feedback loops go wrong: delay, overcorrection and oscillation",
    description:
      "Explore delayed feedback, resonance and the bullwhip effect with interactive models and a practical method for diagnosing unstable corrections.",
    topic: "Systems in practice",
    published: "2026-10-26",
    takeaway:
      "Before increasing the strength of a correction, check how old the measurement is and how much of the previous correction is still working through the system.",
    intro:
      "A queue looks long, so capacity changes. Inventory looks low, so orders increase. The next measurement still looks bad, so the response becomes stronger. Later, all those corrections arrive together. The problem may be a feedback loop reacting to its own history. This guide shows how delay changes a seemingly sensible rule, why repeated forcing is a separate source of oscillation, and how to investigate the difference.",
    sections: [
      {
        id: "loop",
        title: "Map the loop before blaming the person adjusting it",
        paragraphs: [
          "A feedback loop measures a system, compares that measurement with a target and applies an action intended to reduce the difference. Negative feedback means the action opposes the measured error. It does not mean the result is necessarily stable. A correction based on stale information can continue after the state has crossed the target, making the next error larger in the opposite direction.",
          "Draw the observation, decision, action and response as separate steps. Each can introduce delay. A dashboard might update slowly, an order might take time to arrive, or an action might affect the state gradually. Collapsing those steps into a single instantaneous arrow hides exactly the timing information needed to understand overcorrection.",
        ],
      },
      {
        id: "model",
        title: "Explore a controller with a transparent update rule",
        paragraphs: [
          "The [feedback-delay experiment](/effects/feedback-delay) starts a state at fifty and targets one hundred. Each update adds a chosen gain times the difference between the target and a delayed state. With delay zero, the action uses the latest value. With delay two, it uses information from two steps earlier. The same gain can behave very differently under those timing assumptions.",
          "[Åström and Murray's Feedback Systems](https://fbsbook.org/) develops the mathematical analysis of feedback and stability. Modic's board is a deliberately small discrete model, rather than a design tool for a physical controller. Its advantage is inspectability: you can explain every update. Its limit is that real systems may have inertia, saturation, nonlinearities and measurement errors absent from the recurrence.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: correcting an error that already vanished",
        paragraphs: [
          "Use the first few updates to understand the mechanism instead of inferring stability from a single final number. The two-step delay repeats the initial measurement until later states become available. These are authored state units, not temperatures, queue lengths or an actual factory's inventory.",
        ],
        steps: [
          "At gain 0.8 and delay two, the first update uses state fifty: the correction is forty and the new state is ninety.",
          "The next update still uses the initial fifty, giving another correction of forty and taking the state to one hundred thirty.",
          "The target has already been crossed, yet the controller is still reacting to old information. Continue the run, then compare a lower gain or shorter delay.",
        ],
      },
      {
        id: "forcing",
        title: "Distinguish delayed correction from resonance",
        paragraphs: [
          "The [resonance experiment](/effects/resonance) demonstrates a different mechanism: a damped oscillator responds to repeated external forcing. Drive frequency matters because the system's motion interacts with the timing of the force. Near a response peak, modest forcing can generate a large steady oscillation. Damping limits and reshapes that response.",
          "[OpenStax's forced-oscillation chapter](https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations) provides the physical setting. On the board, compare the sweep across frequencies with the displacement trace at one chosen frequency. A wavy graph alone does not identify resonance, a feedback instability or random variation. Look for the mechanism generating the motion, the location of energy input and the rule that relates action to state.",
        ],
      },
      {
        id: "inventory",
        title: "Why this matters when several decision makers react",
        paragraphs: [
          "The [bullwhip-effect experiment](/effects/bullwhip-effect) extends the question to supply chains. An organisation sees orders from the next stage rather than a complete, instantaneous picture of final demand. Inventory policies, lead times and updating decisions can amplify variation upstream. A reaction that looks reasonable from one local view can contribute to a much noisier combined system.",
          "Do not translate a toy controller's gain directly into a purchasing rule. Instead, use the mechanism to structure questions: which demand signal is observed, how much stock is already in transit, how often are policies revised, and what delays occur before the response is visible? Those questions can reveal overlapping corrections that a snapshot chart misses. Changing the reporting cadence can matter as much as changing the desired target.",
        ],
      },
      {
        id: "checklist",
        title: "A practical review before turning the correction up",
        paragraphs: [
          "A useful intervention starts with a timing map and a modest, reversible test where appropriate. Specify what evidence would show that your proposed change reduced error rather than merely moving it to another point in the cycle. Observe enough of the response to include delayed consequences.",
        ],
        checklist: [
          "Identify the target, measured state and action separately.",
          "Record measurement age, action lead time and response time.",
          "Account for earlier actions whose effects have not yet arrived.",
          "Change one policy parameter at a time in the model.",
          "Evaluate overshoot, oscillation and recovery as well as immediate movement toward target.",
        ],
      },
      {
        id: "limits",
        title: "Keep a teaching loop separate from a real control design",
        paragraphs: [
          "The board stops calculating if the magnitude exceeds one thousand. That is a numerical guard to keep the display manageable, not a limiter that stabilises the system. A real actuator limit would change the dynamics and might create additional behaviours. Likewise, the model's early delayed readings repeat its initial state; real systems need an explicit history or observation process.",
          "The broader lesson is about evidence timing. If a result is still reflecting decisions made under yesterday's conditions, applying today's strongest response may stack incompatible corrections. The appropriate response could involve a different gain, a better model, earlier observation or a redesigned action. Which one helps depends on the actual system. The experiment helps you ask that question precisely without promising a universal tuning rule.",
        ],
      },
    ],
    experiments: [
      {
        slug: "feedback-delay",
        task: "Compare the same gain at zero and two-step delay.",
      },
      {
        slug: "resonance",
        task: "Change forcing frequency and damping separately.",
      },
      {
        slug: "bullwhip-effect",
        task: "Look for variation amplified across decision stages.",
      },
    ],
    sources: [
      {
        ...s.feedback,
        note: "The authors' textbook develops feedback, modelling and stability.",
      },
      {
        ...s.resonance,
        note: "University physics treatment of forced oscillation and resonance.",
      },
    ],
    reflection:
      "Which current metric still reflects old actions, and are you already correcting for an effect that has not arrived?",
  },
  {
    slug: "interleaving-generation-cognitive-load-study-guide",
    title:
      "Interleaving, generation and cognitive load: a practical study experiment",
    description:
      "Design a clearer study session using mixed practice, answer generation and manageable task demands, with three interactive activities and a concrete review plan.",
    topic: "Learning lab",
    published: "2026-10-26",
    takeaway:
      "Choose practice that matches the later task. Producing an answer, selecting a procedure and managing competing demands are different learning challenges.",
    intro:
      "You can recognise a worked solution and still struggle with a blank page. You can repeat a formula correctly and choose the wrong formula on a mixed test. Study feels deceptively simple when the material supplies the next action for you. This guide uses three short activities to distinguish those difficulties and build a practical study session that tests the skill you actually need.",
    sections: [
      {
        id: "target",
        title: "Name the task your studying should prepare you for",
        paragraphs: [
          "Start with a concrete performance: explain an idea without looking, choose between two procedures, solve a new example, or recall a relationship after a delay. Those targets need different practice. Re-reading a definition may help familiarity while providing little evidence that you can retrieve it independently. Repeating only one problem type can make the procedure obvious before you have interpreted the problem.",
          "Do not use a single feeling of effort as your evaluation. A task can be demanding because it promotes useful processing, because its instructions are confusing, or because it assumes knowledge you do not yet have. Improving study requires separating these possibilities. The goal is to make the relevant learning work necessary while avoiding demands unrelated to it.",
        ],
      },
      {
        id: "mixed",
        title: "Interleaving practises deciding which method applies",
        paragraphs: [
          "In the [interleaving activity](/effects/interleaving), area and perimeter questions appear in blocks or alternating order. The same practice questions are available in each condition; only their order changes. Blocked questions let you keep using the previous procedure. Mixed questions require identifying the target again. The final test uses new rectangles and asks you to make that choice independently.",
          "[The UCLA Bjork Lab's research overview](https://bjorklab.psych.ucla.edu/research/) discusses interleaving, generation and other learning processes. Treat interleaving as purposeful mixing of relevant categories rather than constant distraction. If the learner cannot yet execute either procedure, some supported initial instruction may be needed. If the later task requires discrimination between similar cases, practising only isolated blocks may leave that decision untested.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: a twenty-minute rectangle session",
        paragraphs: [
          "This is an illustrative session plan, not a measured optimal dose. Adjust the duration to the learner and topic. The important design choice is that the final questions test procedure selection as well as calculation, and that feedback explains mistakes rather than simply reporting a total.",
        ],
        steps: [
          "Spend the first few minutes checking the meaning of area and perimeter with one worked example of each, including units and why the formulas differ.",
          "Answer a mixed set without a heading announcing the procedure. Before calculating, write whether the question asks for interior coverage or boundary length and why.",
          "Finish with new examples after putting the formulas away. Record whether each error came from procedure choice, arithmetic or misunderstanding the question; revisit the relevant step later.",
        ],
      },
      {
        id: "generate",
        title: "Generation adds an attempt before the answer",
        paragraphs: [
          "The [generation-effect activity](/effects/generation-effect) offers a read condition and a fragment-completion condition. Producing a target creates a different study action from seeing it already completed. The later recall form checks the specific targets actually shown. A plausible alternative word is not necessarily a misunderstanding; it may simply differ from the activity's intended association.",
          "For your own material, a useful generation prompt might be a definition with a meaningful gap, a prediction before a worked example or an explanation before checking a reference. Include corrective feedback so a wrong attempt does not remain the final information. Do not make the gap so underspecified that success depends on guessing the author's wording rather than understanding the concept.",
        ],
      },
      {
        id: "load",
        title: "Cognitive load asks what else the learner must hold",
        paragraphs: [
          "The [cognitive-load activity](/effects/cognitive-load) asks you to retain a tile sequence, optionally do arithmetic, then reconstruct the order. It is an informal illustration of competing demands. The interference condition changes retention time too, so a score difference cannot isolate a pure load effect. A single result is not a cognitive assessment.",
          "[John Sweller's account of cognitive load theory](https://www.unsw.edu.au/newsroom/news/2019/12/i-had-an-idea-in-the-1980s-and-to-my-surprise--it-changed-educat) relates instructional design to cognitive architecture. In a study page, avoidable demands might include hunting between a diagram and a distant key, deciphering inconsistent notation or remembering instructions across several screens. Reducing those burdens can preserve effort for the idea itself. It does not imply removing all challenge or supplying every answer immediately.",
        ],
      },
      {
        id: "checklist",
        title: "Build one session around a diagnosable mistake",
        paragraphs: [
          "Choose a small set of material so feedback can lead to an action. An error ledger is useful when its categories map to repairs. A calculation mistake calls for something different from selecting the wrong model. If every miss is recorded only as a low score, the practice produces less guidance for the next session.",
        ],
        checklist: [
          "State the later performance in observable terms.",
          "Provide enough initial support to make meaningful attempts possible.",
          "Mix relevant problem types when choosing among them is part of the target skill.",
          "Ask for an answer or explanation before revealing feedback.",
          "Separate mistakes in retrieval, method choice and execution.",
          "Check again with new material and an appropriate delay.",
        ],
      },
      {
        id: "evidence",
        title: "A personal demonstration is not a controlled study",
        paragraphs: [
          "Trying one condition and then resetting to another does not hold prior exposure constant. You already know the interface and may remember the answers. The three Modic activities deliberately report actual actions rather than inventing an improvement score. They show what each learning manipulation means, while the linked research addresses broader evidence under specified study conditions.",
          "Keep that distinction when evaluating a new study method. A productive comparison uses comparable material, a relevant assessment and enough delay to test more than immediate familiarity. It also respects differences in prior knowledge. The useful outcome is a better match between practice and the desired skill, with a clearer account of errors—not a promise that every effortful session will outperform every easier one.",
        ],
      },
    ],
    experiments: [
      {
        slug: "interleaving",
        task: "Notice the decision required when area and perimeter are mixed.",
      },
      {
        slug: "generation-effect",
        task: "Produce targets before seeing them and inspect exact recall.",
      },
      {
        slug: "cognitive-load",
        task: "Observe competing demands without treating the score as a diagnosis.",
      },
    ],
    sources: [
      {
        ...s.learning,
        note: "The university laboratory summarises its research programmes and links papers.",
      },
      {
        ...s.load,
        note: "The theory's originator discusses cognitive architecture and instructional design.",
      },
    ],
    reflection:
      "Does your current practice make you choose and produce what the final task requires, or does the page choose it for you?",
  },
  {
    slug: "brier-score-calibration-probability-forecasts",
    title: "Brier score explained: how to judge a probability forecast fairly",
    description:
      "Learn the Brier score formula, calibration and forecast resolution through a ten-event game, worked scoring example and practical forecasting-journal checklist.",
    topic: "Forecasting practice",
    published: "2026-10-26",
    takeaway:
      "Score probabilities before outcomes reshape your memory. A proper scoring rule rewards honest probabilities in expectation, while calibration asks a different question across groups of forecasts.",
    intro:
      "A forecast says eighty percent and the event fails to occur. Was the forecast wrong? A binary verdict throws away the very uncertainty the probability was meant to express. To evaluate probabilistic judgment, you need clearly resolved events, probabilities recorded in advance and a rule for comparing many forecasts. The Brier score provides one transparent starting point, but it is not the whole story.",
    sections: [
      {
        id: "formula",
        title: "The binary Brier score is squared probability error",
        paragraphs: [
          "For one event, encode occurrence as one and nonoccurrence as zero. Subtract that outcome from the forecast probability and square the difference. Average across events for the binary Brier score. The score ranges from zero to one under this convention, and lower is better. An eighty-percent forecast earns 0.04 if the event occurs and 0.64 if it does not.",
          "[Glenn Brier's original forecast-verification paper](https://doi.org/10.1175/1520-0493%281950%29078%3C0001%3AVOFEIT%3E2.0.CO%3B2) introduced a broader categorical formulation. The binary version used here scores one event probability and is half the sum over both binary categories. Naming the convention matters when comparing published numbers. You cannot compare scores reliably if one source doubles a binary score or averages across a substantially different set of cases.",
        ],
      },
      {
        id: "game",
        title: "Try committing forecasts before seeing the outcomes",
        paragraphs: [
          "The [Brier-score game](/effects/brier-score) gives ten synthetic events with known generating probabilities. Set your probabilities or copy the generator's, then commit. Outcomes are sampled independently from those known values and revealed only after the forecast controls lock. This prevents adjusting the probabilities after seeing which events occurred.",
          "The generator information makes this a teaching exercise rather than a forecasting competition. In a real journal you do not know the true probabilities. Here, knowing them lets you compare realised scores with expected loss. A less faithful forecast can win a small realised batch by luck even though the generating probability minimises expected squared error for each event.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: honest uncertainty can lose one round",
        paragraphs: [
          "Suppose the event truly has probability eighty percent. Compare forecasting eighty percent with forecasting certainty. The following arithmetic uses a stipulated probability to make the distinction between realised and expected scores inspectable; it is not a measured success rate for any real forecaster.",
        ],
        steps: [
          "If the event occurs, the eighty-percent forecast scores (0.8−1)² = 0.04, while a one-hundred-percent forecast scores zero and looks better that round.",
          "If the event fails, the scores are 0.64 and one. That less frequent outcome penalises the certainty forecast more heavily.",
          "Average using the true probability: honest forecasting has expected loss 0.8×0.04 + 0.2×0.64 = 0.16, versus 0.2 for certainty. The expected advantage does not guarantee winning every batch.",
        ],
      },
      {
        id: "calibration",
        title: "Calibration compares stated probabilities with frequencies",
        paragraphs: [
          "Among many comparable events forecast near seventy percent, do roughly seventy percent occur? That is the intuition behind calibration. The game groups forecasts into three bins and reports observed event rates, but ten cases produce very sparse groups. An empty group provides no evidence, and a group of two or three events cannot settle whether a forecaster is calibrated.",
          "Calibration alone also does not establish useful discrimination. A model that always predicts the overall event rate can be calibrated while failing to distinguish high- and low-risk cases. The [precision-and-recall experiment](/effects/precision-recall) offers a separate lesson about selecting cases and counting relevant outcomes. Classification thresholds, ranking quality and probability calibration should not be collapsed into a single claim that a system is accurate.",
        ],
      },
      {
        id: "reference",
        title: "Compare against a reference on the same cases",
        paragraphs: [
          "A raw score is easier to interpret alongside a sensible reference forecast scored on the identical events. The game shows the generator's realised score because the simulation knows it. In a real forecasting exercise, possible references include a pre-specified base rate or a simple model trained without using the evaluation outcomes. Choosing the reference after inspecting results can make a performance claim misleading.",
          "The [central-limit-theorem experiment](/effects/central-limit-theorem) helps separate variability in individual outcomes from variability in averages. Its assumptions should not be transferred uncritically to a journal of dependent events. Ten related election questions or ten milestones in the same project may provide less independent information than their count suggests. Evaluate the case mix and dependence alongside any average score.",
        ],
      },
      {
        id: "checklist",
        title: "Set up a forecasting journal you can audit",
        paragraphs: [
          "A forecasting record needs enough specificity that a different reader can resolve the event without guessing what you meant. A probability entered after the result is known is commentary rather than a forecast. Revisions can be useful, provided their timestamps are preserved and the evaluation rule says which forecast will be scored.",
        ],
        checklist: [
          "Write an event, deadline and unambiguous resolution criterion.",
          "Record probability and timestamp before resolution.",
          "Preserve revisions and choose an evaluation policy in advance.",
          "Score a reference forecast on the same cases.",
          "Inspect calibration with sample sizes and uncertainty visible.",
          "Review errors without rewriting the original question or probability.",
        ],
      },
      {
        id: "limits",
        title: "Use the score to learn, not to create false certainty",
        paragraphs: [
          "The NOAA memorandum on [verification of precipitation probabilities](https://www.weather.gov/media/wrh/online_publications/TMs/TM-25.pdf) illustrates a real verification context and explicitly distinguishes an abbreviated binary Brier convention. The scoring idea is portable, but the event definition and operational setting remain important. A score summarises forecast quality under a specified loss; it does not by itself tell you which action to take.",
          "Decisions also require consequences and constraints. A well-calibrated small probability can justify action when the cost of missing the event is large, while a likely event may not justify an expensive response. Keep forecasting, scoring and deciding connected but distinct. A good review asks what the probability meant, whether it was honestly stated, how the score compares with a reference and what information could improve the next forecast.",
        ],
      },
    ],
    experiments: [
      {
        slug: "brier-score",
        task: "Compare realised loss with the expected loss of honest probabilities.",
      },
      {
        slug: "precision-recall",
        task: "Distinguish case selection metrics from probability scoring.",
      },
      {
        slug: "central-limit-theorem",
        task: "Explore why averages fluctuate less under independent sampling.",
      },
    ],
    sources: [
      {
        ...s.brier,
        note: "The primary paper introducing probability forecast verification.",
      },
      {
        title: "NOAA — Verification of precipitation probabilities",
        url: "https://www.weather.gov/media/wrh/online_publications/TMs/TM-25.pdf",
        note: "An operational verification example explaining the binary score convention.",
      },
    ],
    reflection:
      "Could someone resolve and score your next forecast from the words you wrote before the outcome?",
  },
  {
    slug: "critical-path-method-project-bottlenecks",
    title:
      "Critical path method: find the work that actually changes your finish date",
    description:
      "Learn critical paths, slack and project acceleration through a six-task game, worked schedule example and a practical bottleneck-review checklist.",
    topic: "Work & constraints",
    published: "2026-10-26",
    takeaway:
      "A task can improve without the project finishing sooner. Follow dependencies, find the current longest paths and recalculate after every acceleration.",
    intro:
      "Everyone is busy, several tasks finish early, and launch still slips. The missing distinction may be between local progress and the dependency that determines the finish date. The critical path method makes that constraint explicit. This guide starts with a six-task game, then explains slack, competing paths and the assumptions that keep a simple schedule useful without turning it into a promise.",
    sections: [
      {
        id: "network",
        title: "A schedule begins with dependencies, not a priority list",
        paragraphs: [
          "List what must finish before each task can start. Two tasks that can run simultaneously contribute differently to elapsed project time from two tasks that must run sequentially. Adding every duration ignores parallel work; choosing the single longest task ignores dependencies. A project network represents those relationships so the earliest possible completion can be calculated under stated assumptions.",
          "The [critical-path game](/effects/critical-path) uses six tasks. Design A precedes Copy C and Build D. Permit B precedes Delivery E. Launch F waits for C, D and E. Each task has a certain duration, and resources are unlimited. The model therefore isolates dependency timing before introducing staffing conflicts or duration uncertainty.",
        ],
      },
      {
        id: "paths",
        title: "The critical path is a longest dependency path",
        paragraphs: [
          "A critical path is a dependency chain whose total duration determines the earliest project finish. There can be several equally long critical paths. In the game, the initial longest chain is A–D–F at ten days. A–C–F takes seven, and B–E–F takes nine. Finishing Copy sooner does not change when Launch can begin if Build still finishes later.",
          "The primary paper by [Kelley and Walker on critical-path planning](https://doi.org/10.1145/1460299.1460318) develops the method in its original scheduling setting. Modic's activity keeps its arithmetic small enough to check manually. A forward pass finds earliest finishes; a backward pass finds how late tasks can finish without delaying the project. The difference gives slack under the dependency-only schedule.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: spend acceleration where it matters",
        paragraphs: [
          "You have three fictional acceleration tokens. Each shortens one task by one day, with a minimum task duration of one. Tokens do not represent actual staffing or cost estimates. The goal is to understand why identical local time savings can have different effects on the launch date.",
        ],
        steps: [
          "Start with durations A=3, B=4, C=2, D=5, E=3, F=2. Verify A–D–F totals ten days and B–E–F totals nine.",
          "Spend a token on C. Its duration falls from two to one, but the longest path remains ten days. Reset and spend the token on D instead; the project falls to nine.",
          "Now A–D–F and B–E–F are both nine. Recalculate before using another token: shortening just one of these paths may leave the other path as the same launch constraint.",
        ],
      },
      {
        id: "slack",
        title: "Slack is timing flexibility, not a statement of importance",
        paragraphs: [
          "A task with slack can be delayed within that allowance without changing the modelled completion date. That does not make the task unimportant or safe to neglect. It may carry quality risk, require scarce expertise or become a future constraint. Slack is a property of the current schedule and assumptions, not a permanent label attached to a person or department.",
          "The game updates slack after each acceleration. This is why a static list of critical tasks quickly becomes stale. A change that removes one bottleneck may expose another. A useful team review asks which path now sets the finish, which tasks share that constraint and what new dependency information has appeared since the previous calculation.",
        ],
      },
      {
        id: "related",
        title: "Separate project paths from other kinds of bottleneck",
        paragraphs: [
          "[Amdahl's law](/effects/amdahls-law) asks how an unimproved fraction limits total speedup. It complements the critical-path lesson: local acceleration has a system-level ceiling. The models are not interchangeable, however. Amdahl's simple fraction model does not represent this game's branching dependency network, and a critical-path calculation does not automatically solve parallel computing performance.",
          "[Little's law](/effects/littles-law) concerns the relationship among average work in progress, throughput and time in a stable system. It can illuminate a work queue that surrounds a project schedule. A task may spend little time actively processed but much longer waiting. Dependency duration, resource capacity and queueing are distinct constraints. Identifying which one dominates helps avoid prescribing more staff for a dependency problem or a new task order for a capacity problem.",
        ],
      },
      {
        id: "checklist",
        title: "A practical review of the next finish-date claim",
        paragraphs: [
          "Build the smallest network that supports the decision. You do not need a diagram containing every minor activity to discover that two major prerequisites determine launch. You do need to identify real handoffs and update estimates when the work changes. Use the schedule as a shared reasoning aid with a visible owner for each assumption.",
        ],
        checklist: [
          "Define completion and list the prerequisites for each major task.",
          "Separate work that can overlap from work that must wait.",
          "Calculate current longest paths and slack.",
          "Evaluate acceleration against every path it affects.",
          "Recalculate after a duration or dependency changes.",
          "Record resource constraints and uncertainty that the simple network leaves out.",
        ],
      },
      {
        id: "uncertainty",
        title: "A deterministic finish date is not a delivery guarantee",
        paragraphs: [
          "The [Project Management Institute's history of CPM](https://www.pmi.org/learning/library/2019/04/07/15/10/origins-cpm-personal-history-3762) offers context from the method's development. The game deliberately omits the time-cost and practical coordination complexity of larger projects. Real durations can be uncertain, tasks can compete for the same specialist and accelerating work can increase error or rework.",
          "Treat a calculated earliest finish as conditional: if durations, dependencies and resources behave as assumed, this is the implication. Ask which assumption is most fragile and what contingency would help. A schedule becomes more useful when it exposes those conditions than when it supplies a precise-looking date with no explanation. The next good action is the one that changes the actual constraint while preserving the quality and purpose of the work.",
        ],
      },
    ],
    experiments: [
      {
        slug: "critical-path",
        task: "Use acceleration tokens and observe when launch actually moves.",
      },
      {
        slug: "amdahls-law",
        task: "Compare a local speedup with the total-system limit.",
      },
      {
        slug: "littles-law",
        task: "Distinguish throughput and waiting from dependency timing.",
      },
    ],
    sources: [
      {
        ...s.scheduling,
        note: "The original critical-path planning and scheduling paper.",
      },
      {
        title: "PMI — Origins of CPM: a personal history",
        url: "https://www.pmi.org/learning/library/2019/04/07/15/10/origins-cpm-personal-history-3762",
        note: "Historical account from the method's development.",
      },
    ],
    reflection:
      "Which specific dependency must finish earlier for your project's completion date to move?",
  },
];
