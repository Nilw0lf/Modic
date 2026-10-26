import type { Insight } from "./types";
import { horizonSources as s } from "@/data/horizons-expansion";
export const creativityAndCooperation: Insight[] = [
  {
    slug: "functional-fixedness-einstellung-effect-problem-solving",
    title:
      "Functional fixedness and the Einstellung effect: two ways a familiar solution can trap you",
    description:
      "Distinguish object fixedness from a habitual method, solve a jug puzzle and a workshop challenge, and use a practical reframing checklist for difficult problems.",
    topic: "Creativity & problem solving",
    published: "2026-10-27",
    takeaway:
      "When a solution feels obvious but cumbersome, separate the object's properties from its usual role and the current constraints from the method that worked before.",
    intro:
      "A box is for holding things. A reliable procedure is the way to solve the problem. Both statements can be useful until the task changes. Functional fixedness concerns the uses you consider for an object; the Einstellung effect concerns a familiar approach that can obscure an alternative. This guide makes the difference concrete with two puzzles and a small search experiment.",
    sections: [
      {
        id: "difference",
        title: "A fixed use and a fixed method are different obstacles",
        paragraphs: [
          "Functional fixedness concerns difficulty seeing an object beyond a familiar or presented function. A container may also have a supporting surface, but describing it only as packaging can hide that possibility. A mental set concerns an approach: a method worked before, so it remains easy to retrieve even when a new problem allows a shorter route. Neither label explains every failure to solve a puzzle.",
          "The primary references are [Duncker's On Problem-Solving](https://doi.org/10.1037/h0093599) and [Luchins's work on Einstellung](https://doi.org/10.1037/h0093502). Their research histories are more specific than the everyday phrase thinking outside the box. Use the concepts to identify what is being held fixed, then inspect whether that restriction belongs to the actual problem or to the way you have described it.",
        ],
      },
      {
        id: "objects",
        title: "Describe the object before naming its job",
        paragraphs: [
          "In the [functional-fixedness puzzle](/effects/functional-fixedness), a rigid box begins as the container for tacks. The beacon cannot be pierced, and the floor is unsuitable. Emptying the box makes it easier to consider the object as a supporting surface. Fastening it as a shelf and placing the beacon on it solves the stated digital puzzle without introducing a new tool.",
          "The important change is a representation of the available material. List properties such as rigid, hollow, flat, heavy, flexible or detachable before assuming that the usual job exhausts its possibilities. That does not make every imaginative use safe or effective. Real material choices need relevant practical checks; the game uses fictional constraints to isolate one kind of re-description.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: the shorter water-jug route",
        paragraphs: [
          "The [Einstellung jug activity](/effects/einstellung-effect) uses original numbers inspired by the mental-set question. Its short rehearsal is not a controlled training procedure. Solve it to inspect how two valid methods can differ in effort, rather than treating your first move as a psychological diagnosis.",
        ],
        steps: [
          "Rehearse B−A−2C on the three cards, then inspect the new capacities A=14, B=32 and C=4 with a target of ten units.",
          "The familiar arithmetic still works: 32−14−2×4=10. Carrying it out requires filling B, pouring into A, and handling C twice with an emptying step between.",
          "Try filling A and pouring into C instead. A retains 14−4=10 in two actions. The familiar answer was valid but not the shortest available route.",
        ],
      },
      {
        id: "constraints",
        title: "Separate a real constraint from a remembered convention",
        paragraphs: [
          "Write down what the task actually prohibits. In the jug game, pouring continues until one jug is empty or the destination is full; arbitrary partial pours are not allowed. In the workshop puzzle, the hard beacon case cannot be pierced. Those are genuine rules within the activity. By contrast, the assumption that the tack box must remain a container is not one of the stated rules.",
          "For a work problem, ask the same question carefully. A deadline, a required output format or an equipment limitation may be real. A sequence inherited from a previous project may simply be a convention. Testing an alternative is useful when it preserves the actual requirements. Ignoring a real constraint and calling the result creative does not solve the original problem.",
        ],
      },
      {
        id: "search",
        title: "Sometimes a better route begins with a temporarily worse step",
        paragraphs: [
          "The [simulated-annealing game](/effects/simulated-annealing) adds a different search issue. Its landscape contains a local minimum at four and a better minimum at sixteen, separated by higher energy. A rule that accepts only immediate improvements becomes trapped at the first minimum. Allowing some uphill proposals makes escape possible, though it does not guarantee success in a finite run.",
          "This is an analogy for search structure, not evidence that setbacks are inherently beneficial or that a person should accept arbitrary risks. The useful question is whether you are evaluating a complete alternative or rejecting it because of a temporary setup cost. Compare routes under the actual objective and constraints. Keep the best candidate found while deciding how much exploration the problem warrants.",
        ],
        deeper: {
          title: "What the puzzle score can establish",
          text: "A move count can establish that one legal route used fewer actions than another in this exact jug system. It cannot establish that a person has a stable creativity trait, that a particular mental process caused the route, or that the same route will generalise to a different task.",
        },
      },
      {
        id: "checklist",
        title: "A practical reframing pass before repeating the routine",
        paragraphs: [
          "Use a brief reframing pass when an approach works but feels unnecessarily complex. Keep the first workable solution as a fallback, then explore a small number of alternatives. A clear comparison is more informative than an unlimited brainstorm with no criterion for selecting a result.",
        ],
        checklist: [
          "State the goal independently of your current method.",
          "List the constraints that are explicitly required.",
          "Describe available objects by their properties and possible roles.",
          "Ask which steps exist only because a previous problem needed them.",
          "Compare legal alternatives on total effort and quality.",
          "Keep a stopping rule for exploration so search does not become the whole task.",
        ],
      },
      {
        id: "limits",
        title: "Familiar methods are useful until the comparison changes",
        paragraphs: [
          "Expertise and familiar routines often save effort. The point is not to distrust every practised response or replace efficient procedures with novelty for its own sake. A routine becomes worth questioning when the current problem's structure differs from the problem that made the routine useful. That is a specific trigger for inspection, not a general rejection of experience.",
          "The puzzles give exact constraints and immediate feedback, making the comparison unusually clean. Real problems often have uncertain requirements and costs. Use the concepts to make those assumptions visible: what is the object allowed to do, why is this method being reused, and what would count as a better result? A well-posed alternative can be more valuable than simply generating more ideas.",
        ],
      },
    ],
    experiments: [
      {
        slug: "functional-fixedness",
        task: "Repurpose a container without changing the puzzle's constraints.",
      },
      {
        slug: "einstellung-effect",
        task: "Compare two legal routes to ten units.",
      },
      {
        slug: "simulated-annealing",
        task: "Inspect the limit of immediate-improvement-only search.",
      },
    ],
    sources: [
      {
        ...s.fixed,
        note: "Duncker's primary work on problem solving and object use.",
      },
      {
        ...s.set,
        note: "Luchins's primary investigation of a familiar method obstructing alternatives.",
      },
    ],
    reflection:
      "Which restriction in your current approach is required by the problem, and which was inherited from an earlier solution?",
  },
  {
    slug: "shapley-value-banzhaf-voting-power-explained",
    title:
      "Shapley value vs voting power: sharing credit is different from being decisive",
    description:
      "Calculate a three-person Shapley allocation, compare Banzhaf power with vote weight, and inspect why truthful project mechanisms can still need outside funding.",
    topic: "Fairness & mechanisms",
    published: "2026-10-27",
    takeaway:
      "Contribution, pivotal voting power and incentive-compatible payments answer different questions. Choose the question and model before presenting one number as fairness.",
    intro:
      "Who deserves credit for a joint result? Who can change a board decision? Who should pay for a shared project? These sound like variations of the same allocation problem, but they require different information and rules. The Shapley value, Banzhaf index and a VCG public-project mechanism make those differences concrete with small examples you can calculate yourself.",
    sections: [
      {
        id: "question",
        title: "Choose what you want the number to represent",
        paragraphs: [
          "An allocation of value needs a model of what coalitions can create. A voting-power measure needs a rule for which coalitions can pass a decision. A payment mechanism needs preferences, an outcome rule and incentives for reporting information. Substituting one kind of number for another can give a precise-looking answer to the wrong question.",
          "For a real collaboration, begin by describing the decision the calculation is meant to support. Dividing revenue, recognising effort, assigning responsibility and predicting bargaining influence are distinct tasks. Even a mathematically well-defined allocation does not remove the need to justify its inputs or explain whose values the rule is intended to represent.",
        ],
      },
      {
        id: "shapley",
        title: "The Shapley value averages marginal contributions",
        paragraphs: [
          "[Shapley's original value for n-person games](https://www.rand.org/pubs/papers/P295.html) provides an allocation rule for a specified cooperative game. The [Shapley-value experiment](/effects/shapley-value) uses three participants. Each creates zero alone; AB creates sixty, AC twenty, BC forty and the full group ninety. The table is authored so the calculation can be inspected without uncertainty about the inputs.",
          "A participant's contribution depends on which others are already present. Joining an empty group can add zero, while joining a pair can add substantial value. Averaging over every possible order avoids privileging one arbitrary sequence of arrival. It does not prove that the coalition estimates reflect actual effort, or that averaging marginal contributions is the only defensible fairness principle.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: two joining orders and their average",
        paragraphs: [
          "Keep the coalition values fixed while switching order. This separates a change in marginal contribution from a change in the collaboration itself. The six permutations are equally weighted by the Shapley rule, not sampled according to a story about who actually arrived first.",
        ],
        steps: [
          "Inspect A→B→C. A adds zero, B increases value from zero to sixty, and C increases it from sixty to ninety, receiving thirty marginal units.",
          "Inspect B→C→A. B adds zero, C creates forty with B, and A increases the pair's forty to ninety, adding fifty.",
          "Average all six orders. The final allocation is A=30, B=40 and C=20, summing to the full ninety. Explain the coalition table before treating these numbers as a real compensation proposal.",
        ],
      },
      {
        id: "power",
        title: "Vote weight is different from pivotal opportunity",
        paragraphs: [
          "[Banzhaf's voting-power account](https://banzhaf.net/about/BanzhafIndexofVotingPower.html) asks when adding a voter changes a coalition from losing to winning. In the [Banzhaf experiment](/effects/banzhaf-power-index), weights are four, three and two with quota six. The four-vote member has three critical joins; the others have one each. Normalising gives sixty, twenty and twenty percent.",
          "Those values differ from the shares of vote weight. Change the quota and the critical-coalition structure can change while every weight stays fixed. This index treats possible coalitions equally; real alliances or agenda control can make some coalitions much more likely than others. It is therefore a defined structural measure, not a complete forecast of political influence.",
        ],
      },
      {
        id: "payments",
        title: "An incentive-compatible payment is another object again",
        paragraphs: [
          "The [VCG public-project game](/effects/vcg-public-project) asks how reported benefits determine construction and pivot payments. At benefits forty-five, thirty-five and ten, a sixty-cost project is built. Payments of fifteen, five and zero do not cover the cost. Positive reported surplus and a truthfulness property do not automatically imply budget balance.",
          "The game assumes an outside budget covers the forty-unit gap. That assumption should remain visible whenever the mechanism is discussed. A payment rule can be useful for eliciting information while being unsuitable as a self-financing institution. Ask separately about efficiency, incentives, funding, distribution and the reliability of the reported valuations rather than bundling them into the word fair.",
        ],
        deeper: {
          title: "Two different averages",
          text: "The Shapley calculation averages value increments over joining orders. The normalised Banzhaf calculation divides each voter's swing count by all voters' swing counts. The denominators encode different questions; neither average becomes a universal measure of personal worth.",
        },
      },
      {
        id: "checklist",
        title: "A model audit before using a fairness number",
        paragraphs: [
          "Write the assumptions next to the result, especially when the inputs are difficult to estimate. A clean arithmetic calculation can conceal a contestable valuation table. Sensitivity to plausible alternative inputs may be more informative than adding decimal places to a single allocation.",
        ],
        checklist: [
          "State whether the question concerns value, power, payments or responsibility.",
          "Explain how coalition values or voting weights were obtained.",
          "Specify the quota and treatment of possible coalitions.",
          "Check whether assigned values sum to the intended total.",
          "Identify any outside funding required by the rule.",
          "Separate mathematical properties from a claim of moral fairness.",
        ],
      },
      {
        id: "limits",
        title: "Precision does not remove the choice of a principle",
        paragraphs: [
          "A real team may create non-transferable benefits, disagree about counterfactual coalition output or face contractual rights that take priority over a modelled division. A board may have stable alliances that violate equal-coalition assumptions. These are not minor details to add after presenting the number; they help determine which model, if any, fits the decision.",
          "Use the experiments to sharpen a discussion rather than end it prematurely. Ask what would change the allocation, which member is pivotal under which quota, and who bears a funding shortfall. A useful quantitative rule makes those tradeoffs explicit. Its strength comes from answering a clearly specified question, not from transforming every difficult question about cooperation into the same formula.",
        ],
      },
    ],
    experiments: [
      {
        slug: "shapley-value",
        task: "Inspect order-specific contributions and the six-order average.",
      },
      {
        slug: "banzhaf-power-index",
        task: "Change the quota while preserving vote weights.",
      },
      {
        slug: "vcg-public-project",
        task: "Separate truthful incentives from budget balance.",
      },
    ],
    sources: [
      {
        ...s.shapley,
        note: "The primary cooperative-game allocation reference.",
      },
      {
        ...s.power,
        note: "The index's author explains voting power and weighted-voting applications.",
      },
    ],
    reflection:
      "What exactly should the number you call fair represent, and which assumptions would another participant reasonably dispute?",
  },
  {
    slug: "comparative-advantage-explained-opportunity-cost",
    title:
      "Comparative advantage explained: why the faster person need not do everything",
    description:
      "Work through a numerical trade example with labour budgets, opportunity costs and an exchange that benefits both sides, even when one producer is faster at both tasks.",
    topic: "Economics in practice",
    published: "2026-10-27",
    takeaway:
      "Absolute speed and opportunity cost are different comparisons. A feasible division of work can create gains even when one producer is more productive in every task.",
    intro:
      "One person is faster at both jobs. Should they do both? It depends on what each person gives up by allocating time to one task rather than the other. Comparative advantage provides a concrete opportunity-cost comparison. Modic's two-country game keeps labour budgets and consumption bundles visible, so you can check a mutually beneficial exchange without relying on a slogan about specialisation.",
    sections: [
      {
        id: "definition",
        title: "Absolute advantage compares direct input use",
        paragraphs: [
          "A producer has an absolute advantage when it needs fewer resources for a given output. Comparative advantage concerns the opportunity cost of producing one good in terms of another. Those rankings need not match. A person who is faster at everything still has limited time; allocating it to one activity forgoes what that same time could produce elsewhere.",
          "[OpenStax's trade chapter](https://openstax.org/books/principles-economics-2e/pages/33-1-absolute-and-comparative-advantage) develops the distinction associated with Ricardo. The useful first step is a consistent resource table. Compare hours per unit or units per hour without mixing them. An accidental inversion can reverse a claimed advantage even though the arithmetic later appears tidy.",
        ],
      },
      {
        id: "costs",
        title: "Calculate what each producer gives up",
        paragraphs: [
          "The [comparative-advantage game](/effects/comparative-advantage) gives A one hour per bread and two per cloth. B needs three hours per bread and four per cloth. A is absolutely faster at both. For A, one cloth costs the opportunity to make two bread. For B, one cloth costs four-thirds of a bread, so B has the lower cloth opportunity cost.",
          "For bread the comparison reverses: A forgoes half a cloth per bread, while B forgoes three-quarters. A therefore has the comparative advantage in bread. No claim about intelligence, effort or worth is involved. The result follows a specific resource table and could change if technology, quality requirements or constraints changed.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: both sides gain half a bread",
        paragraphs: [
          "Each country has twelve labour hours. The example uses partial specialisation so the final comparison preserves each side's initial cloth consumption. All quantities are invented and divisible; they are chosen so every production and exchange step can be checked.",
        ],
        steps: [
          "Begin with A producing six bread and three cloth, using six plus six hours. B produces two bread and one and a half cloth, also using six plus six hours.",
          "Reallocate to A producing nine bread and one and a half cloth, and B producing three cloth. Each still uses twelve hours; total cloth stays four and a half while bread rises from eight to nine.",
          "Exchange one and a half cloth from B for two and a half bread from A. A ends with 6.5 bread and three cloth; B with 2.5 bread and 1.5 cloth. Both gain half a bread without losing cloth.",
        ],
      },
      {
        id: "terms",
        title: "The terms of exchange determine who benefits",
        paragraphs: [
          "The same production gain does not make every payment acceptable. In the game, B offers one and a half cloth. If A pays less than two bread, B falls below its initial bread consumption. If A pays more than three, A falls below its initial bundle. Payments from two through three preserve both starting bundles; an interior payment gives each strictly more bread.",
          "This distinction separates creating surplus from dividing it. A production arrangement can increase total possibilities while a particular exchange allocates the gains unevenly. In actual trade or teamwork, people may also care about quality, timing, risk and rights. A numerical no-less-of-either-good check is a clear teaching criterion, not a complete description of preferences or bargaining power.",
        ],
      },
      {
        id: "work",
        title: "Apply opportunity cost without hiding coordination costs",
        paragraphs: [
          "The [opportunity-cost activity](/effects/opportunity-cost) helps translate the comparison to time allocation. List what a person or team forgoes when a scarce hour is assigned to one activity. Then include handoffs, checking and setup. A theoretical gain can disappear if coordination consumes more resources than the reallocation saves.",
          "[Baumol's cost-disease discussion at NYU](https://www.stern.nyu.edu/experience-stern/faculty-research/baumol-cost-disease) highlights another productivity distinction. Some activities scale output per hour faster than others. The [cost-disease model](/effects/baumol-cost-disease) makes those relative changes inspectable. It does not determine a trade arrangement, but it shows why a resource table should be updated instead of treated as a permanent ranking of tasks or workers.",
        ],
      },
      {
        id: "checklist",
        title: "A practical division-of-work comparison",
        paragraphs: [
          "Use a small table with one resource unit and a consistent output standard. A useful comparison should show how the proposed plan is feasible, how much it produces and how the results will be shared. Otherwise a claim about specialisation can conceal an overloaded person or a quality difference.",
        ],
        checklist: [
          "Specify hours per unit and a consistent definition of acceptable output.",
          "Calculate opportunity costs for both activities.",
          "Check each person's actual time budget.",
          "Include coordination, checking and transition costs.",
          "Compare the final bundles or outcomes for each participant.",
          "Revisit the table as skills and requirements change.",
        ],
      },
      {
        id: "limits",
        title:
          "A gain in the model is not a guarantee for every real participant",
        paragraphs: [
          "The two-country exercise omits internal distribution, unemployment during adjustment, learning effects, trade barriers and environmental consequences. It therefore cannot settle a real trade-policy debate. Its precise result is narrower: under the stated resource costs and exchange terms, both fictional producers can obtain more bread with no loss of cloth.",
          "That narrow result is still useful. It corrects the mistaken inference that being faster at everything rules out mutually beneficial exchange. For a real decision, retain the opportunity-cost logic while restoring the omitted constraints. Ask not only whether total output can rise, but whether the plan is feasible, the benefits reach the relevant people and the costs of changing the arrangement are worth paying.",
        ],
      },
    ],
    experiments: [
      {
        slug: "comparative-advantage",
        task: "Find a payment that preserves both starting consumption bundles.",
      },
      {
        slug: "opportunity-cost",
        task: "Name what an hour allocated to one task gives up.",
      },
      {
        slug: "baumol-cost-disease",
        task: "Inspect how different productivity growth changes relative unit costs.",
      },
    ],
    sources: [
      {
        ...s.trade,
        note: "University textbook account of absolute and comparative advantage.",
      },
      {
        ...s.baumol,
        note: "The economist's university discussion of uneven productivity and relative cost pressure.",
      },
    ],
    reflection:
      "What does each collaborator give up by doing the task they are fastest at, and does the proposed exchange share the gain?",
  },
];
