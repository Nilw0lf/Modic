import type { Insight } from "./types";
import { mosaicSources as s } from "@/data/mosaic-expansion";
export const mosaicSystems: Insight[] = [
  {
    slug: "dijkstra-vs-a-star-search-explained",
    title:
      "Dijkstra vs A*: shortest paths, useful heuristics and the cost of searching",
    description:
      "Trace Dijkstra’s algorithm, edit an A* maze and compare path length with expanded states. Learn when heuristic guarantees apply and why faster search can change solution quality.",
    topic: "Systems in practice",
    published: "2026-10-27",
    takeaway:
      "A route’s cost and the work needed to find it are separate outcomes. A heuristic can guide search, but its assumptions determine what solution-quality guarantee survives.",
    intro:
      "A navigation algorithm has two jobs that are easy to confuse: return a good route and avoid examining too many possibilities while finding it. Dijkstra’s algorithm and A* address this tradeoff in related ways. A small weighted graph and an editable maze make the difference visible, including why an apparently stronger shortcut can sacrifice a guarantee rather than simply improve the same algorithm.",
    sections: [
      {
        id: "dijkstra",
        title: "Dijkstra settles the cheapest tentative distance",
        paragraphs: [
          "Dijkstra’s algorithm starts with distance zero at the source and unknown distances elsewhere. It repeatedly selects the unvisited node with the smallest tentative distance, marks that distance final and tries improving neighbouring distances through it. The key assumption is that edge weights are nonnegative: an unexplored continuation cannot later supply a cheaper route through a negative surprise.",
          "Trace the [Dijkstra graph](/effects/dijkstras-algorithm) one step at a time. Watch a direct tentative route improve through an intermediate node. [Dijkstra’s original shortest-path note](https://doi.org/10.1007/BF01386390) is the primary reference. The authored network is deliberately small so every update is inspectable. Its cheapest path has more edges than some alternatives, illustrating why fewest connections and lowest accumulated weight are not the same objective when edges have different costs.",
        ],
      },
      {
        id: "astar",
        title: "A* adds an estimate of what remains",
        paragraphs: [
          "A* prioritises states by g + h: the cost already incurred plus a heuristic estimate of remaining cost. A useful estimate can focus exploration toward the goal. Conditions such as admissibility and consistency matter for shortest-path guarantees, along with details of how the search handles previously examined states.",
          "In the [A* maze](/effects/a-star-search), moves are orthogonal and each costs one. Manhattan distance counts the minimum horizontal and vertical moves in the absence of walls. It never overstates the remaining path cost here and is consistent. [Hart, Nilsson and Raphael’s original paper](https://doi.org/10.1109/TSSC.1968.300136) provides the formal heuristic-search framework. The board exposes a weight on this estimate: zero removes its guidance, one uses the valid grid heuristic and three overweights it. The latter is a different tradeoff, not a stronger optimality guarantee.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: keep route quality and search work separate",
        paragraphs: [
          "Use the built-in maze first so the terrain remains constant across comparisons. The returned path length is counted in unit moves; expanded cells report the work visible in this implementation. These are algorithmic counts, not browser timing benchmarks.",
        ],
        steps: [
          "Choose heuristic weight zero and find a route. Record its length and the number of expanded cells, retaining the original wall layout. This is uniform-cost search on the unit grid, without a directional estimate.",
          "Choose weight one, which restarts the same map, and search again. Compare both outputs. The admissible consistent estimate preserves shortest-path correctness here, while its guidance can change how many cells are expanded.",
          "Choose weight three and inspect the actual returned route. Then edit walls and repeat. It may match the shortest path on a particular map, but that observation does not restore a general shortest-path guarantee for an overweighted heuristic.",
        ],
      },
      {
        id: "design",
        title: "The modelled cost needs to match the real task",
        paragraphs: [
          "A grid’s one-unit step is a modelling choice. Actual routes can have different travel times, risks, tolls or accessibility constraints. If the cost function omits what the user values, solving it perfectly may still produce an unsuitable route. Similarly, a heuristic that was valid for one movement rule can become invalid when diagonal moves or cheaper long connections are added.",
          "Before optimising the search implementation, define the state, available actions, edge costs and success condition. Decide what happens when no route exists. The Modic maze exhausts its frontier and reports no route rather than drawing a line through a wall. That failure case is part of correctness. Search quality is easier to assess when the algorithm’s objective and the application’s actual requirement have been written in the same terms.",
        ],
      },
      {
        id: "checklist",
        title: "A review checklist for heuristic search",
        paragraphs: [
          "A visually direct route can be expensive and a fast-looking animation can conceal extensive computation. Use observable counts and stated guarantees instead of impressions. When comparing implementations, keep the graph, start, goal and cost model fixed; when changing those inputs, describe the comparison as a new task rather than evidence that the previous result was wrong.",
        ],
        checklist: [
          "Specify whether the objective is edge count, distance, time or another accumulated cost.",
          "Check that nonnegative weights support Dijkstra’s settling argument.",
          "Show why the heuristic is a lower bound under the actual movement and cost rules.",
          "Report returned path cost separately from expansions, memory use and measured runtime.",
          "Test unreachable goals and changed maps, and state when a weighted heuristic sacrifices optimality.",
        ],
      },
      {
        id: "assumptions",
        title: "No universal winner without a task distribution",
        paragraphs: [
          "The [no free lunch activity](/effects/no-free-lunch) provides a useful companion question. Two search orders have equal average probe costs across a tiny uniform unrestricted family of binary objectives. Restrict the family to ordered objectives and one order becomes better. The advantage comes from structure in the task family, not from a universal claim that one direction is inherently smarter.",
          "That finite illustration is not a theorem about every practical path planner. Its connection is methodological: identify what structure justifies your chosen method. A* uses a goal-distance estimate because spatial structure can be useful. Dijkstra remains a clean baseline when that guidance is unavailable or inappropriate. The most informative comparison explains why the assumptions fit the task, measures the outcomes the application needs and preserves the guarantee that the implementation actually supplies.",
        ],
        deeper: {
          title: "Why overweighting Manhattan distance changes the argument",
          text: "With weight one, Manhattan distance is a lower bound on remaining unit-grid travel cost. Multiplying it by three can make it exceed that cost. Prioritising this inflated estimate can reach a goal before a cheaper alternative is explored; a successful shortest path on one maze does not prove the inflated estimate admissible.",
        },
      },
    ],
    experiments: [
      {
        slug: "dijkstras-algorithm",
        task: "Settle all five nodes and trace why the cheapest route costs seven.",
      },
      {
        slug: "a-star-search",
        task: "Compare weights zero, one and three on the same maze before editing walls.",
      },
      {
        slug: "no-free-lunch",
        task: "Restrict the objective family and inspect how a search-order advantage appears.",
      },
    ],
    sources: [
      {
        ...s.dijkstra,
        note: "Original primary paper on the nonnegative-weight shortest-path method.",
      },
      {
        ...s.astar,
        note: "Original primary paper formalising heuristic search.",
      },
    ],
    reflection:
      "Which property of your real task makes the heuristic useful, and which guarantee does your implementation preserve?",
  },
  {
    slug: "paradox-of-enrichment-more-resources-stability",
    title:
      "The paradox of enrichment: why more resources can make a system less stable",
    description:
      "Explore predator–prey oscillations, carrying capacity and Liebig’s limiting resource with simple experiments, a worked scenario and careful real-world boundaries.",
    topic: "Systems & climate",
    published: "2026-10-27",
    takeaway:
      "Increasing a resource can improve a growth opportunity while also changing feedback and stability. Ask about variability and troughs as well as averages.",
    intro:
      "More food sounds like an obvious improvement for an ecosystem. In some consumer–resource models it can instead destabilise coexistence and produce larger oscillations. That is the paradox of enrichment. Understanding it does not require believing that resources are generally bad. It requires separating a resource constraint from the feedback generated when interacting populations respond to it over time.",
    sections: [
      {
        id: "capacity",
        title: "Carrying capacity is not the population at every moment",
        paragraphs: [
          "A logistic growth model describes how a population’s growth changes as it approaches a carrying-capacity parameter. That parameter is a feature of the modelled environment, not a promise that the population immediately equals it. Introduce a consumer and the outcome also depends on consumption, reproduction and the timing of their interaction.",
          "The [logistic growth experiment](/effects/logistic-growth) is a useful first stop before adding predators. Then open the [paradox of enrichment simulator](/effects/paradox-of-enrichment). It combines logistic prey growth with a saturating consumption response. More prey does not let each predator consume without limit. This saturation changes how strongly predators can regulate abundant prey, creating a route from a resource increase to a change in the stability of coexistence.",
        ],
      },
      {
        id: "mechanism",
        title: "The paradox is a conditional dynamical result",
        paragraphs: [
          "In [Rosenzweig’s original enrichment paper](https://jxshix.people.wm.edu/2009-harbin-course/classic/rosenzweig-science-1971.pdf), enrichment can destabilise exploitation ecosystems under the model’s conditions. That is a theoretical claim about interactions and stability, not a universal empirical rule that every increase in food causes extinction. Actual systems can have adaptation, spatial refuges, alternative prey and many other mechanisms absent from a small model.",
          "The Modic board fixes prey growth at one, the handling constant at one, predator conversion at 0.5 and mortality at 0.2. For these values, the coexistence equilibrium loses local stability when carrying capacity exceeds seven-thirds. The graph displays the resulting deterministic trajectories rather than adding random disasters or assigning an extinction probability. Keep the parameter-specific threshold attached to those equations instead of transferring it to an unnamed real species.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: compare variation after enrichment",
        paragraphs: [
          "Run both settings from the same initial prey and predator indices, 0.7 and 0.3. These are dimensionless teaching populations, and the time units are model units. The controlled comparison changes carrying capacity while preserving the other declared parameters.",
        ],
        steps: [
          "Set carrying capacity to 1.5 and run for two hundred model time units. Inspect the later portion of both curves and record the prey minimum and maximum in the displayed last-quarter window.",
          "Raise carrying capacity to six, restart from the same initial values and run for the same duration. Compare the late-window range rather than assuming that a higher capacity simply shifts both populations upward by a constant amount.",
          "Identify whether oscillation amplitude increased and where the prey trough lies. Describe the result as behaviour of the stated model, without treating a small positive numerical population as an observed extinction or a real-world forecast.",
        ],
      },
      {
        id: "minimum",
        title: "A limiting-resource rule answers a different question",
        paragraphs: [
          "[Liebig’s law of the minimum](/effects/law-of-the-minimum) highlights a binding resource constraint. The game starts with nitrogen, phosphorus and light indices of thirty, sixty and eighty. Yield is their minimum. Spending a token on already abundant light leaves the current output unchanged, while improving nitrogen initially raises it. These normalised values are an authored bottleneck rule, not fertilizer guidance.",
          "[OpenStax’s discussion of environmental population limits](https://openstax.org/books/biology-2e/pages/45-3-environmental-limits-to-population-growth) provides broader biological context on resource constraints and growth. The distinction matters: identifying the current limiting input does not tell you the complete dynamic response after the limit is relaxed. A strict minimum rule isolates a constraint; the predator–prey model adds interacting feedback. Neither should silently replace the other when answering a question about stability.",
        ],
      },
      {
        id: "checklist",
        title: "Questions before declaring a resource increase successful",
        paragraphs: [
          "An intervention can be evaluated at several levels: immediate output, equilibrium, variability, resilience and distribution of benefits. Choosing only one can hide a meaningful tradeoff. Use the model to identify what to observe next, rather than using a dramatic theoretical result as a substitute for evidence about a real ecosystem or organisation.",
        ],
        checklist: [
          "Name the resource being increased and the constraint it is supposed to relax.",
          "Separate an immediate response from a change in the long-run equilibrium or its local stability.",
          "Inspect ranges and troughs in addition to averages or carrying-capacity parameters.",
          "List the feedback, saturation, delays and spatial processes included or omitted from the model.",
          "Choose observations that could distinguish the proposed mechanism from other explanations in the actual system.",
        ],
      },
      {
        id: "transfer",
        title: "Apply the question carefully outside ecology",
        paragraphs: [
          "The broad question travels: could improving one input change the feedback that governs the whole system? The exact ecological conclusion does not automatically travel with it. Adding staff, money or computing capacity to an organisation is not equivalent to increasing prey carrying capacity, and calling a disappointing result a paradox does not establish a common mechanism.",
          "A useful analogy specifies corresponding states, interactions and constraints, then looks for evidence. If those correspondences are weak, keep the ecological model as a prompt to investigate variability rather than a prediction. In the experiment, stable coexistence, large cycles and numerical troughs have precise meanings supplied by equations. In an application, those terms need operational definitions. More resources may help, hurt or change little; the point is to examine the feedback and the outcome that matter rather than assuming the sign in advance.",
        ],
        deeper: {
          title:
            "Why the coexistence prey level can stay fixed while stability changes",
          text: "At a positive predator equilibrium, predator growth must balance mortality. Under the fixed conversion and handling values, that condition fixes prey at two-thirds. Increasing carrying capacity can change predator equilibrium and the local dynamics around coexistence even though that prey equilibrium condition remains the same.",
        },
      },
    ],
    experiments: [
      {
        slug: "paradox-of-enrichment",
        task: "Compare capacities 1.5 and six over the same two-hundred-unit horizon.",
      },
      {
        slug: "law-of-the-minimum",
        task: "Reach yield seventy by improving the binding resource rather than the tallest bar.",
      },
      {
        slug: "logistic-growth",
        task: "Distinguish the carrying-capacity parameter from a population’s current state.",
      },
    ],
    sources: [
      {
        ...s.enrichment,
        note: "Original primary paper on enrichment and exploitation-system stability.",
      },
      {
        ...s.minimum,
        note: "University-level biology material on resources and population limits.",
      },
    ],
    reflection:
      "Which outcome would reveal a harmful change in variability even if the average resource level improved?",
  },
];
