import type { Insight } from "./types";

export const workAndAi: Insight[] = [
  {
    slug: "will-ai-replace-my-job-task-audit",
    title: "Will AI replace my job? Start with a task audit, not a prediction",
    description:
      "A practical way to assess AI job exposure, find the real bottleneck in your work, and choose a small skill experiment without betting your career on a forecast.",
    topic: "AI & work",
    published: "2026-10-07",
    takeaway:
      "A job is a bundle of tasks. Test where AI changes that bundle before drawing conclusions about the whole career.",
    intro:
      "The question is understandable: if a tool can write, code, translate, and analyse, what is left for me? But a headline about an occupation is a poor plan for an individual. A better starting point is this week's work: which tasks take your time, which require trust, and which actually constrain the result? You can investigate those questions without pretending to know what the labour market will look like in five years.",
    sections: [
      {
        id: "why-now",
        title: "What the current evidence can tell you",
        paragraphs: [
          "The [ILO's June 2026 review](https://www.ilo.org/publications/impact-genai-jobs-productivity-and-work-organization-review-empirical) separates emerging productivity evidence from employment outcomes. It describes uneven gains and limited large-scale displacement in the evidence reviewed, alongside concerns about younger workers and job quality. That is a dated snapshot of a changing situation, not proof that a particular job is safe or doomed.",
          "Exposure means a technology could affect a task. Adoption means somebody uses it. Useful automation means the whole process improves after checking, coordination, and exceptions. Those are different stages. A demonstration of a good first draft does not establish that a business can remove the person who checks the draft, understands the customer, and owns the consequences. Equally, needing a human check does not mean the task's economics cannot change.",
        ],
      },
      {
        id: "task-audit",
        title: "Make a five-column task audit",
        paragraphs: [
          "List the recurring tasks you completed last week. For each one, record time spent, the output somebody needed, the cost of an error, how the result is checked, and the next person or system it depends on. Keep the units mundane: hours, handoffs, corrections, and waiting. A task called 'marketing' is too broad; 'turn interview notes into a draft case study' is something you can test.",
          "Mark which tasks are easy to reverse. Rewriting an internal draft is different from sending a customer a contractual commitment. Start with a reversible task where you already know how to recognise a good result. Otherwise an impressive output may simply conceal mistakes you cannot evaluate. The audit is not a score of your personal worth. It is a map of where tools, judgment, and coordination meet.",
        ],
      },
      {
        id: "bottleneck",
        title: "Find the bottleneck before buying speed",
        paragraphs: [
          "Suppose drafting is quick but approval takes days. Faster drafting can create a larger queue without improving delivery. Try [Amdahl's law](/effects/amdahls-law): make one part of the process dramatically faster while leaving the rest unchanged. Notice how the total improvement remains limited by work that the tool does not accelerate.",
          "Now look back at your audit. Ask whether the limiting step is execution, unclear requirements, access to data, review capacity, or permission to act. A useful AI skill may be less about producing more text and more about preparing better inputs or detecting errors sooner. Measure an end-to-end outcome, such as an accepted deliverable, rather than counting drafts generated.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: a customer-support team",
        paragraphs: [
          "Imagine a support agent spending an illustrative ten hours each week drafting replies and another ten investigating account histories, checking policies, and resolving unusual cases. These numbers are invented for teaching; they are not measurements of a real team. Halving drafting time would save five hours before verification and setup costs. It would not halve the entire workload.",
        ],
        steps: [
          "Choose one low-stakes reply type. Define an acceptable answer using the team's existing policy and have the normal reviewer check it.",
          "Compare several similar cases with and without the tool. Record total time, corrections, and whether the customer actually got a resolution.",
          "Review the results before expanding. If checking consumes the savings, improve the workflow or choose another task instead of hiding the cost.",
        ],
      },
      {
        id: "skill-bet",
        title: "Choose a skill bet with a small downside",
        paragraphs: [
          "The [opportunity cost experiment](/effects/opportunity-cost) makes an overlooked point concrete: time spent learning one tool is time unavailable for something else. Compare a narrow tool tutorial with a transferable skill such as writing clear requirements, evaluating evidence, or explaining tradeoffs. A transferable skill can remain useful even when a particular product changes.",
          "Use [optionality](/effects/optionality) to think about the shape of the decision. A short project that produces a portfolio example, a reusable checklist, and feedback from a real user creates several future paths. A costly commitment justified only by a single forecast leaves fewer ways to adapt. This is a planning principle, not a claim that every small experiment succeeds.",
        ],
      },
      {
        id: "measure",
        title: "Run a two-week learning experiment",
        paragraphs: [
          "Set one question: can I produce a better checked result for this task? Choose a fixed time budget and a stopping date. Save examples of failures as carefully as successes. Write down what you expected before the experiment, so you cannot quietly redefine success after seeing the output.",
          "Explore the [multi-armed bandit](/effects/multi-armed-bandit) to see why endlessly trying new options and prematurely committing to one option can both waste information. Your career is not that simulation: opportunities change, feedback is noisy, and relationships matter. The useful lesson is to make room for exploration while still finishing work that teaches you something.",
        ],
        checklist: [
          "Pick one reversible task, not an entire occupation.",
          "Measure checked output and total effort.",
          "Keep a record of failures and exceptions.",
          "Decide when to continue, change, or stop.",
        ],
      },
      {
        id: "limits",
        title: "What this approach does not settle",
        paragraphs: [
          "An individual audit cannot predict hiring decisions, bargaining power, or a company's strategy. A tool that helps you today may also change entry-level training opportunities tomorrow. Discuss changes with colleagues and managers rather than treating all workplace uncertainty as a personal optimisation problem.",
          "The [World Economic Forum's 2025 skills outlook](https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/) is useful context about employer expectations, but expectations are not realised outcomes. Combine broad reports with direct evidence from your own work. The practical question is not 'Can I predict the future perfectly?' It is 'What can I learn this month that leaves me better able to respond?'",
        ],
      },
    ],
    experiments: [
      {
        slug: "amdahls-law",
        task: "Speed up one task and observe the limit on the whole workflow.",
      },
      {
        slug: "optionality",
        task: "Compare a small reversible experiment with an all-in commitment.",
      },
      {
        slug: "multi-armed-bandit",
        task: "Balance exploring a new skill with using one that already works.",
      },
    ],
    sources: [
      {
        title:
          "ILO — The impact of GenAI on jobs, productivity and work organization",
        url: "https://www.ilo.org/publications/impact-genai-jobs-productivity-and-work-organization-review-empirical",
        note: "1 June 2026 · Review of emerging empirical evidence; not an individual career forecast.",
      },
      {
        title: "World Economic Forum — Future of Jobs Report: skills outlook",
        url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/",
        note: "2025 · Employer expectations and skills context.",
      },
    ],
    reflection:
      "Which task in your week would still matter if generating a first draft became almost free?",
  },
  {
    slug: "ai-energy-demand-jevons-paradox",
    title: "If AI gets more efficient, why can electricity demand still rise?",
    description:
      "Understand AI energy demand through Jevons paradox, a simple break-even calculation, and the difference between efficiency per task and total consumption.",
    topic: "Systems & climate",
    published: "2026-10-07",
    takeaway:
      "Total resource use depends on both consumption per task and the number of tasks. Improving one does not fix the other.",
    intro:
      "A smaller model, a faster chip, or a cheaper answer sounds like an obvious environmental improvement. At the task level, it can be. At the system level, the answer also depends on what people do with the new capacity. If they ask more questions, automate more steps, or run tools continuously, the efficiency gain and the demand increase pull in different directions. This is a useful arithmetic problem before it becomes an argument about technology.",
    sections: [
      {
        id: "why-now",
        title: "The current AI energy puzzle",
        paragraphs: [
          "In its [April 2026 update on AI and energy](https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions), the International Energy Agency reports falling power consumption per AI task alongside rising data-centre electricity demand. Its analysis also discusses physical constraints such as grid connections and equipment supply. This is the real-world reason to distinguish a better unit cost from a smaller total footprint.",
          "Data centres support more than AI, and different AI tasks have different resource requirements. Training, serving a short answer, generating video, and running a long agent workflow cannot be treated as one identical query. Be careful with any claim that gives one energy number for 'using AI' without describing the task and measurement boundary.",
        ],
      },
      {
        id: "arithmetic",
        title: "Do the two-number calculation first",
        paragraphs: [
          "In a simplified model, total electricity equals electricity per task multiplied by task count. If consumption per task falls by half, task count can double before total consumption returns to its starting level. More than doubling increases the total; less than doubling decreases it. There is no contradiction in becoming more efficient while using more electricity overall.",
          "This identity does not explain why demand changes. It only tells you what must be measured. You also need comparable tasks, a consistent time period, and the same system boundary. Adding cooling in one estimate but omitting it in another makes a tidy comparison misleading. Write down what the numerator includes before calculating a percentage improvement.",
        ],
      },
      {
        id: "rebound",
        title: "Where Jevons paradox enters",
        paragraphs: [
          "The [Jevons paradox experiment](/effects/jevons-paradox) illustrates how lower resource costs can encourage more use. Move the efficiency and demand-response controls separately. An efficiency improvement need not trigger enough extra activity to outweigh the savings; the result depends on the demand response you assume.",
          "Rebound describes savings being partly offset by greater use. A rebound large enough to increase total consumption is sometimes called backfire. Calling every efficiency improvement 'Jevons paradox' skips the important empirical question: how much does activity actually change? A tool may become more attractive because it is cheaper, faster, more capable, or easier to embed in other products. Those mechanisms should be investigated rather than assumed.",
        ],
        deeper: {
          title: "The break-even condition",
          text: "If the new energy per task is e times the old level and task count becomes n times larger, the total becomes e × n times the old total. With e = 0.6, break-even task growth is 1 / 0.6, or about 1.67 times. This is accounting under a fixed boundary, not a forecast of AI adoption.",
        },
      },
      {
        id: "worked-example",
        title: "A worked example: an internal assistant",
        paragraphs: [
          "Imagine an assistant using an arbitrary one unit of electricity per task and handling 1,000 tasks each month. A redesign cuts the unit requirement to 0.4. These are illustrative units, not measured watt-hours for a product. The redesign looks different if it changes how the organisation uses the assistant.",
        ],
        steps: [
          "Hold activity fixed: 0.4 × 1,000 gives 400 units, compared with the original 1,000.",
          "Add a new workflow: at 3,000 comparable tasks the total becomes 1,200 units, despite the better unit efficiency.",
          "Evaluate the additional work: ask whether those tasks replace another process, create useful new output, or simply generate more material to inspect.",
        ],
      },
      {
        id: "capacity",
        title: "Demand is not the same as unlimited capacity",
        paragraphs: [
          "A demand curve cannot manufacture transformers, water, land, or a grid connection. Use [stocks and flows](/effects/stocks-and-flows) to separate accumulated capacity from the rate at which capacity is added. Rapid demand growth can run into a slowly changing stock of infrastructure.",
          "The [Little's law experiment](/effects/littles-law) offers another lens: when arrivals exceed what a process can clear sustainably, waiting and work in progress become important. It does not model an electricity grid. It helps you ask where expansion queues form and whether extra capacity at one stage merely moves the bottleneck to another.",
        ],
      },
      {
        id: "practical",
        title: "A better checklist for an efficiency claim",
        paragraphs: [
          "When comparing tools or reading a headline, ask for absolute consumption as well as consumption per task. Then ask whether the tasks are equivalent in quality and complexity. A cheaper answer that requires repeated retries may not be cheaper per useful result. Keep operational energy separate from embodied impacts unless the analysis explicitly includes both.",
          "For a team deploying AI, a practical experiment is to track completed useful tasks, retries, and the total workload over a consistent period. A usage budget or a rule against unnecessary always-on processing can make the resource constraint visible. These are measurement choices; they are not a universal prescription for how every organisation should use AI.",
        ],
        checklist: [
          "What is included in the energy estimate?",
          "Is the output comparable in quality?",
          "Did task count or task complexity change?",
          "Are actual totals reported alongside projections?",
        ],
      },
      {
        id: "limits",
        title: "Efficiency is useful; total impact still needs evidence",
        paragraphs: [
          "The [IEA's Energy and AI analysis](https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai) discusses demand scenarios rather than a single inevitable future. Policy, infrastructure, adoption, and technical progress all affect the result. Electricity demand also does not translate into emissions through one universal multiplier: the generation mix and timing matter.",
          "The useful takeaway is to keep two questions on the page at once. How much resource does one useful task require? How many useful tasks are we choosing to perform? You can celebrate a real improvement in the first while still checking whether the second overwhelms it. That habit applies to transport, computing, heating, and many other efficiency debates.",
        ],
      },
    ],
    experiments: [
      {
        slug: "jevons-paradox",
        task: "Find the demand response at which an efficiency gain stops reducing total use.",
      },
      {
        slug: "stocks-and-flows",
        task: "Separate the infrastructure already available from the rate of new construction.",
      },
      {
        slug: "littles-law",
        task: "Observe how waiting changes when throughput becomes the constraint.",
      },
    ],
    sources: [
      {
        title: "IEA — Data centre electricity use surged in 2025",
        url: "https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions",
        note: "16 April 2026 · Current demand, efficiency, and infrastructure context.",
      },
      {
        title: "IEA — Energy demand from AI",
        url: "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai",
        note: "2025 · Scenario analysis; projections are not observed outcomes.",
      },
    ],
    reflection:
      "Where in your own work has making something faster led you to do much more of it?",
  },
  {
    slug: "study-with-ai-without-outsourcing-learning",
    title: "How to study with AI without outsourcing the learning",
    description:
      "Build an AI study routine around retrieval practice, feedback, and spaced review. Learn how to distinguish a polished answer from knowledge you can use alone.",
    topic: "Learning",
    published: "2026-10-07",
    takeaway:
      "Use AI to create practice and feedback. Test what you can explain when the assistant is closed.",
    intro:
      "You ask for an explanation, read it, and feel that the topic finally makes sense. Then a blank page or a new problem arrives and the understanding disappears. A fluent explanation can help, but recognising an answer and producing one are different activities. The aim of an AI study routine should be to increase what you can do independently, not only what you can complete while the tool is beside you.",
    sections: [
      {
        id: "why-now",
        title: "Why assisted performance is not the whole story",
        paragraphs: [
          "The [OECD Digital Education Outlook 2026](https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html) examines generative AI in education and the importance of pedagogical design. The distinction between completing a task with help and developing lasting capability is particularly useful for students trying to choose a study workflow. The report is context, not a guarantee that one prompt will improve everyone's learning.",
          "Set your goal before opening the assistant. Do you need to remember vocabulary, explain a mechanism, solve unfamiliar problems, or critique an argument? Those goals need different practice. A summary is a possible input to learning; it is rarely a complete test of whether learning happened.",
        ],
      },
      {
        id: "retrieval",
        title: "Start with retrieval, even when it feels uncomfortable",
        paragraphs: [
          "Close the notes and attempt an answer from memory. Write a rough definition, sketch the causal steps, or solve the first part of a problem. The gaps in that attempt tell you where help is needed. If you read the answer first, you lose some of that diagnostic information because familiar words can make an incomplete understanding feel complete.",
          "Explore the [testing effect](/effects/testing-effect) before planning your next session. Its teaching model helps you compare study strategies; its displayed values are not a forecast of your examination score. For research context, [Roediger and Karpicke's study](https://pubmed.ncbi.nlm.nih.gov/16507066/) examines how retrieval practice affects later retention in a specific experimental setting. The general lesson is to practise recalling, not merely recognising.",
        ],
      },
      {
        id: "feedback",
        title: "Ask for feedback on your attempt",
        paragraphs: [
          "Give the assistant your own explanation and ask it to identify missing steps, ambiguous claims, and one counterexample. A useful instruction is: 'Do not rewrite the whole answer yet. Ask one question that would reveal whether I understand the mechanism.' Then try to answer before asking for a complete solution.",
          "Check factual feedback against your course material or a reliable source. AI can confidently criticise a correct answer or approve an incorrect one. For mathematics, verify steps; for history, check dates and sources; for a practical skill, test the result. Feedback is valuable because it changes your next attempt, not because it sounds encouraging.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: learning Bayes' rule",
        paragraphs: [
          "Suppose you understand the words 'prior' and 'evidence' but cannot explain why a rare condition may remain unlikely after a positive test. Use an invented scenario rather than somebody's medical result. Your purpose is to understand conditional probability, not to interpret a real diagnosis.",
        ],
        steps: [
          "Predict the answer in plain language, then use the [base rate experiment](/effects/base-rate-neglect) to compare your intuition with counts of true and false positives.",
          "Explain the result without looking at the formula. Ask the assistant to challenge one step, and check that challenge against the experiment's assumptions.",
          "The next day, solve a different numerical example without the assistant. Record which part you still needed help with and practise that part again.",
        ],
      },
      {
        id: "spacing",
        title: "Space the practice around what you forget",
        paragraphs: [
          "The [forgetting curve](/effects/forgetting-curve) gives you a visual way to think about time and review. It is a simplified model, not a personal memory measurement. Use it as a reason to revisit a topic after a delay rather than assuming that one long session is enough.",
          "Keep a small review list with the concept, the mistake you made, and a fresh question. Review the explanation after trying the question, not before. If the question is always identical, you may learn the wording instead of the idea. Change the surface details while keeping the underlying structure, then explain why the same principle still applies.",
        ],
      },
      {
        id: "routine",
        title: "Try a simple session you can repeat",
        paragraphs: [
          "Spend a few minutes attempting one question unaided. Use the next part of the session to check errors and request a targeted explanation. Finish by closing everything and writing a short answer to a new question. The timings can vary; the important feature is an independent attempt at both ends.",
          "Try the [cognitive reflection experiment](/effects/cognitive-reflection) when you want to notice how quickly an attractive first answer can appear. Do not treat a game score as a measure of your intelligence. Use the pause between intuition and checking as a study habit: name the assumption that makes an answer seem obvious, then test it.",
        ],
        checklist: [
          "Attempt before asking.",
          "Request targeted feedback instead of a finished submission.",
          "Verify claims using course or primary materials.",
          "Return later with a new problem and no assistant.",
        ],
      },
      {
        id: "limits",
        title: "When a simpler tool is better",
        paragraphs: [
          "A textbook exercise with an answer key may give more dependable feedback than a conversational assistant. A teacher can diagnose a misconception across several attempts and understand the assessment criteria. Use those resources when available. Also follow your institution's rules about permitted assistance; a useful study method is different from submitting somebody else's work.",
          "If the assistant keeps producing material faster than you can evaluate it, reduce the output. One good question is often more useful than twenty pages of notes. A good session leaves evidence of changed capability: a clearer explanation, a solved unfamiliar problem, or a mistake you now know how to avoid. That evidence is worth more than the feeling of having been productive.",
        ],
      },
    ],
    experiments: [
      {
        slug: "testing-effect",
        task: "Compare retrieval practice with restudy under the teaching model.",
      },
      {
        slug: "forgetting-curve",
        task: "Change the review pattern and think about a schedule you could maintain.",
      },
      {
        slug: "base-rate-neglect",
        task: "Practise explaining a probability result without borrowing the answer.",
      },
    ],
    sources: [
      {
        title: "OECD — Digital Education Outlook 2026",
        url: "https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html",
        note: "2026 · Generative AI and educational design.",
      },
      {
        title: "Roediger & Karpicke — Test-enhanced learning",
        url: "https://pubmed.ncbi.nlm.nih.gov/16507066/",
        note: "2006 · Experimental research on retrieval practice and retention.",
      },
    ],
    reflection:
      "What could you explain or solve tomorrow without reopening today's AI conversation?",
  },
];
