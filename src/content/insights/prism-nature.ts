import type { Insight } from "./types";
import { prismSources as s } from "@/data/prism-sources";
export const prismNature: Insight[] = [
  {
    slug: "doppler-effect-frequency-vs-intensity",
    title:
      "The Doppler effect explained: pitch, intensity and photon energy are different questions",
    description:
      "Move a sound source, inspect inverse-square spreading and test a photoelectric threshold to understand what changes frequency, intensity and energy per photon.",
    topic: "Perception & judgment",
    published: "2026-10-28",
    takeaway:
      "First identify the quantity that changed. Relative motion can change received frequency; distance changes ideal spreading intensity; photon flux and photon energy play different roles.",
    intro:
      "A passing siren changes pitch. A distant lamp becomes dimmer. Brighter light can still fail to release electrons from a surface. These observations involve waves, but they do not have the same explanation. Three simple experiments help separate received frequency, spatial intensity and energy per quantum before an appealing analogy turns into the wrong formula.",
    sections: [
      {
        id: "motion",
        title: "A moving source changes the spacing of arriving wavefronts",
        paragraphs: [
          "A source can emit the same note while a stationary listener receives a different frequency. For sound in still air, moving toward the listener compresses the spacing of successive wavefronts on that side. Moving away stretches it. The emitted frequency and the received frequency therefore need separate labels.",
          "In the [Doppler activity](/effects/doppler-effect), sound speed is fixed at 343 metres per second and the listener is to the source’s right. Positive velocity means approach. The formula multiplies emitted frequency by 343 divided by 343 minus source velocity. [OpenStax’s sound chapter](https://openstax.org/books/college-physics-2e/pages/17-4-doppler-effect-and-sonic-booms) supplies the physical context. This is a classical sound-source comparison, with neither wind nor a moving listener and no claim that the same formula describes relativistic light.",
        ],
      },
      {
        id: "spreading",
        title:
          "Distance changes an ideal spreading intensity without changing the note",
        paragraphs: [
          "The [inverse-square experiment](/effects/inverse-square-law) holds a source scale fixed while changing distance. Uniform spherical spreading makes the available surface area grow as radius squared, so intensity per unit area falls as the reciprocal square. Doubling distance gives a quarter of the reference intensity under those assumptions, rather than half.",
          "That calculation asks a different question from the Doppler calculation. A stationary source and listener can be separated farther while keeping frequency unchanged. Actual sound loudness and visual brightness also involve perception, absorption, geometry and the environment. The drawing does not convert a relative intensity into a calibrated loudness judgment. Before using a distance rule, identify whether the source is sufficiently point-like and whether obstructions or absorption invalidate the assumed spreading mechanism.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: change one physical quantity at a time",
        paragraphs: [
          "Use the following settings as a controlled tour of the teaching models. They are not measurements of a particular siren or lighting system, and each comparison preserves the other relevant inputs.",
        ],
        steps: [
          "Set emitted sound frequency to 440 Hz and velocity to zero. Raise approach velocity to about 114 metres per second and read an observed frequency near 660 Hz, while the emitted-frequency control remains unchanged.",
          "Open the inverse-square activity with scale one hundred. Compare intensity one hundred at distance one with twenty-five at distance two. The difference follows spreading area and supplies no new sound-frequency calculation.",
          "In the photoelectric model, keep work function two eV and choose wavelength eight hundred nm. Raise photon flux without crossing the energy threshold, then shorten wavelength to four hundred nm and inspect permitted electron energy 1.1 eV.",
        ],
      },
      {
        id: "quanta",
        title: "More photons need not mean more energy per photon",
        paragraphs: [
          "The [photoelectric activity](/effects/photoelectric-effect) uses approximate photon energy 1240 divided by wavelength in nanometres, measured in electronvolts. At a fixed wavelength, increasing the supplied photon flux changes how many photons are available, not the energy each carries. Below the work-function threshold, increasing flux does not release electrons in this ideal one-photon model.",
          "[OpenStax’s photoelectric explanation](https://openstax.org/books/university-physics-volume-3/pages/6-2-photoelectric-effect) describes why frequency and intensity play distinct experimental roles. The Modic icons are deliberately labelled relative flux rather than measured current. Surface efficiency, collection voltage and a laboratory instrument are absent. The useful inference is conditional: ask whether an outcome requires sufficient energy in each interaction, a larger number of interactions, or both. Do not treat every stronger-looking input as interchangeable.",
        ],
      },
      {
        id: "checklist",
        title: "A practical checklist for a wave explanation",
        paragraphs: [
          "A reliable explanation begins with observable quantities and a reference frame. This helps when reviewing a classroom diagram, a product claim or an informal account of why a signal changed. The aim is not to memorise a formula for every situation, but to avoid carrying the assumptions from one model into another without noticing.",
        ],
        checklist: [
          "Label emitted frequency separately from observed frequency and state which object moves relative to which medium.",
          "Define intensity, flux or perceived brightness explicitly rather than using stronger as a substitute for a measured quantity.",
          "Check the geometry and losses before applying an inverse-square distance relation.",
          "Distinguish energy per photon from the number of photons supplied in an interval.",
          "Keep units and model limits beside the result so another reader can reconstruct the calculation.",
        ],
      },
      {
        id: "next",
        title: "Direction and interference add further questions",
        paragraphs: [
          "Wave behaviour also includes direction and phase. The [refraction lab](/effects/snells-law) changes ray direction across media, while the [double-slit activity](/effects/double-slit-interference) creates intensity bands from differences in phase. Neither effect should be explained solely by saying that light became stronger or weaker. The relevant variables are refractive index, angle, wavelength, separation and the conditions that make coherent interference possible.",
          "Use the experiments as distinct models with explicit inputs rather than as one universal wave simulator. A successful calculation of received pitch does not establish perceived loudness; a bright fringe does not by itself describe a single detected photon. That separation makes the practical explanation more useful. Once the quantity, mechanism and assumptions are named, the next observation needed to distinguish explanations usually becomes clearer.",
        ],
        deeper: {
          title: "What the Doppler denominator assumes",
          text: "The displayed denominator changes the distance between emitted fronts in a stationary propagation medium. Source speed remains below sound speed, and the observer is stationary. A moving observer changes the encounter rate differently; a relativistic light calculation requires another model altogether.",
        },
      },
    ],
    experiments: [
      {
        slug: "doppler-effect",
        task: "Change source velocity while preserving the emitted note.",
      },
      {
        slug: "inverse-square-law",
        task: "Double distance and compare intensity with area ratio.",
      },
      {
        slug: "photoelectric-effect",
        task: "Try changing flux before changing the energy per photon.",
      },
    ],
    sources: [
      {
        ...s.doppler,
        note: "University-level physical account of the sound Doppler effect.",
      },
      {
        ...s.photo,
        note: "University-level explanation of photon-energy thresholds and intensity distinctions.",
      },
    ],
    reflection:
      "Which quantity would you measure to distinguish a change in the source from a change in propagation or reception?",
  },
  {
    slug: "ohms-law-vs-kirchhoffs-laws",
    title:
      "Ohm’s law vs Kirchhoff’s laws: read the circuit before doing the arithmetic",
    description:
      "Compare series and parallel resistance, balance a bridge and understand why current conservation does not make every branch current equal.",
    topic: "Systems in practice",
    published: "2026-10-28",
    takeaway:
      "Ohm’s law relates quantities across an element; Kirchhoff’s laws constrain how connected elements share currents and voltages. The circuit structure determines which equations belong together.",
    intro:
      "A resistor value does not tell you the current until you know how the component is connected and what drives it. Two identical resistors can produce four times as much source current in one arrangement as another at the same voltage. A bridge can have zero current in one branch while drawing current elsewhere. Reading the network comes before choosing the shortcut.",
    sections: [
      {
        id: "element",
        title: "Ohm’s law describes an element under stated conditions",
        paragraphs: [
          "For an ideal ohmic element, voltage equals current times resistance. That relation connects a voltage difference across the element with the current through it. It does not say that every resistor in a connected circuit has the full source voltage or carries the source’s total current.",
          "Start with the [Ohm’s law activity](/effects/ohms-law). It supplies an ideal source, a fixed ten-ohm resistor and a second adjustable resistor. [OpenStax’s circuit introduction](https://openstax.org/books/college-physics-2e/pages/20-2-ohms-law-resistance-and-simple-circuits) explains the element relationship and its conditions. The simulator holds resistance and source behaviour ideal; heating, power ratings and supply limitations are intentionally absent. Its values should be used to understand the equation, not as instructions for constructing real electrical equipment.",
        ],
      },
      {
        id: "network",
        title: "Series and parallel describe different constraints",
        paragraphs: [
          "In a simple series chain, the same current passes through the components and voltage drops add. In parallel, branches share their endpoint voltage while their currents add at a junction. These descriptions are not interchangeable visual styles: they tell you which quantities are constrained to match.",
          "With two ten-ohm resistors, equivalent resistance is twenty in series and five in parallel. A twelve-volt ideal source therefore supplies 0.6 A or 2.4 A respectively. The extra branch can increase total current because it provides another path across the same voltage. This is why counting components without tracing connections is a poor shortcut. Record source current, branch current and element voltage as different variables until the network equations establish their relationship.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: find a bridge balance",
        paragraphs: [
          "The [Kirchhoff bridge puzzle](/effects/kirchhoffs-laws) supplies two voltage-divider branches linked at their midpoints. Its values are hypothetical, and the added midpoint resistor prevents treating every component as a single series chain.",
        ],
        steps: [
          "Inspect the left divider with ten ohms above and twenty below, and the right divider with fifteen above and an adjustable lower resistor. Keep the ideal source at twelve volts and leave the midpoint bridge connected.",
          "Set the lower-right resistor to thirty ohms. Both midpoint potentials become eight volts, so the voltage across the joining bridge is zero even though the source still supplies current to the dividers.",
          "Open and reconnect the midpoint bridge at this balanced setting. Compare the zero cross-current with equal source and return currents, separating a null in one branch from a circuit with no current anywhere.",
        ],
      },
      {
        id: "balance",
        title: "Kirchhoff supplies conservation across the connected system",
        paragraphs: [
          "Kirchhoff’s current law balances current into and out of a node. The voltage law balances potential changes around a loop under the circuit assumptions. Together with element relations, these constraints determine the network rather than merely describing one isolated resistor.",
          "[OpenStax’s Kirchhoff chapter](https://openstax.org/books/college-physics-2e/pages/21-3-kirchhoffs-rules) gives the formal context. In the Modic bridge, two nodal equations determine the unknown midpoint potentials. When the bridge is unbalanced, its current affects both dividers, so calculating each as if the joining resistor were absent gives an inconsistent answer. A useful check is whether independently computed source and return currents agree. Conservation provides a way to detect an error before interpreting a polished decimal result.",
        ],
      },
      {
        id: "checklist",
        title: "Five questions before solving a circuit diagram",
        paragraphs: [
          "Even a small circuit can become confusing if the labels silently change meaning. A short annotation pass often prevents more mistakes than another round of calculator work. Keep the assumptions on the page, especially when translating a network into a simplified equivalent resistance or an analogy with another flow system.",
        ],
        checklist: [
          "Identify nodes and shared endpoints before deciding which components are in series or parallel.",
          "Label each voltage as a difference between two nodes, with a consistent reference and sign convention.",
          "Distinguish source current from branch currents and check balance at the relevant junctions.",
          "Check whether a connected bridge or additional path invalidates an isolated-divider shortcut.",
          "Retain the ideal-element and steady-circuit assumptions rather than inferring real thermal or safety behaviour.",
        ],
      },
      {
        id: "analogy",
        title: "A flow analogy helps only if its limits stay visible",
        paragraphs: [
          "The [Bernoulli flow activity](/effects/bernoulli-flow) also distinguishes conserved throughput from local state variables. The same volume flow passes two pipe sections while local velocity changes with area. That can help a reader appreciate why one total flow is not identical to every local quantity, but water pressure and electrical voltage are not a licence to transfer equations indiscriminately.",
          "Bernoulli’s ideal-flow energy balance has its own assumptions about viscosity, height and streamline behaviour. Ohmic resistance represents a different relation. Use the analogy to ask a structural question, such as where a flow splits or what a difference drives, then return to the correct element law. The stronger habit is to pair local relations with system constraints and test both, rather than trusting a familiar formula before identifying what the diagram actually connects.",
        ],
        deeper: {
          title: "Why an unbalanced bridge needs simultaneous equations",
          text: "Current through the midpoint resistor depends on the difference between both unknown node potentials. Each node balance therefore contains both unknowns. Solving one divider independently ignores that coupling; the null setting is a special case where the cross-current vanishes.",
        },
      },
    ],
    experiments: [
      {
        slug: "ohms-law",
        task: "Reconnect equal resistors and compare equivalent resistance and source current.",
      },
      {
        slug: "kirchhoffs-laws",
        task: "Find the lower-right resistance that nulls the midpoint current.",
      },
      {
        slug: "bernoulli-flow",
        task: "Compare a conserved throughput with changing local speed and pressure.",
      },
    ],
    sources: [
      {
        ...s.ohm,
        note: "University-level explanation of the voltage–current relationship for ohmic elements.",
      },
      {
        ...s.kirchhoff,
        note: "University-level explanation of network current and voltage balance.",
      },
    ],
    reflection:
      "Which equation describes an element, and which constraint comes from how the elements are connected?",
  },
  {
    slug: "island-biogeography-vs-metapopulations",
    title:
      "Island biogeography and metapopulations: stable counts can hide constant turnover",
    description:
      "Compare species richness, habitat occupancy and trophic cascades with worked ecological models, clear limits and practical questions about persistence.",
    topic: "Systems & climate",
    published: "2026-10-28",
    takeaway:
      "A stable total does not mean nothing changed. Species richness, occupied habitat and population size are different state variables governed by different interactions.",
    intro:
      "An island can retain roughly the same number of species while their identities change. A species can persist across a region while disappearing from individual patches. A predator change can alter vegetation indirectly. These are three different ecological questions. Small models make the distinctions visible and help identify which observations would matter before interpreting a stable headline count.",
    sections: [
      {
        id: "richness",
        title: "Species richness is a count, not a list of identities",
        paragraphs: [
          "Equilibrium island biogeography balances immigration from a larger source pool with local extinction. As an island contains more of the possible species, fewer absent species remain available to arrive; the model’s extinction flow can rise with richness. Their balance can stabilise the count while still replacing which species are present.",
          "The [island biogeography model](/effects/island-biogeography) has a pool of one hundred possible species and explicit immigration and extinction functions. [MacArthur and Wilson’s foundational book](https://press.princeton.edu/books/paperback/9780691088365/the-theory-of-island-biogeography) provides the research framework. The Modic curve is an expected-richness teaching calculation, not a forecast for a named island. It omits species identities, speciation and habitat differences, so an equilibrium count must not be presented as evidence that community composition is unchanged.",
        ],
      },
      {
        id: "occupancy",
        title: "Patch occupancy asks whether a regional network persists",
        paragraphs: [
          "A metapopulation concerns local populations connected by dispersal. A local extinction can be followed by recolonisation if occupied patches supply enough colonists and suitable empty habitat remains. Regional persistence therefore differs from the survival of every individual patch population.",
          "In the [Levins metapopulation activity](/effects/metapopulation), occupied fraction p changes through cp(1−p) minus ep. Colonisation requires both an occupied source and an empty destination in the mean-field account. [Levins’s original population-model paper](https://doi.org/10.1093/besa/15.3.237) gives primary context. The continuous fraction is not a literal census of a few patches. Spatial isolation, differences in patch quality and finite chance can matter greatly outside the homogeneous deterministic approximation.",
        ],
      },
      {
        id: "worked-example",
        title:
          "Worked example: interpret two equilibria without mixing their units",
        paragraphs: [
          "Keep the two teaching models separate while comparing their logic. One describes species richness on an island; the other describes the fraction of habitat occupied by a particular population. Neither set of coefficients is an empirical estimate.",
        ],
        steps: [
          "In island biogeography, set maximum immigration six and maximum extinction three. The equilibrium richness is one hundred times six divided by nine, about 66.67, with expected immigration and extinction both equal to two.",
          "In the metapopulation model, set colonisation 0.5 and local extinction 0.2. The positive equilibrium occupied fraction is one minus 0.2 divided by 0.5, or 0.6, describing occupancy rather than a species count.",
          "Raise local extinction above colonisation and inspect the loss of positive occupancy equilibrium in that model. Do not transfer this threshold to the island model or assume it directly measures a real habitat’s extinction risk.",
        ],
      },
      {
        id: "indirect",
        title: "Interactions can change a state without acting on it directly",
        paragraphs: [
          "The [trophic cascade experiment](/effects/trophic-cascade) adds another distinction. A top predator affects herbivores directly, and changing herbivores can alter plants indirectly. Looking only at the species directly eaten by the predator would miss part of that mechanism. The plant, herbivore and predator curves are population indices, which differ again from richness and occupancy.",
          "Compare runs from the same initial plant and herbivore values over matching time horizons, changing only the initial top-predator presence. The fixed equations are chosen to make an interaction inspectable, not to claim that every food web responds identically. Alternative prey, behaviour, migration and habitat can alter a real cascade. Use the model to name a possible pathway and an observation to collect, rather than treating the curve’s shape as evidence that the pathway operates in a particular ecosystem.",
        ],
      },
      {
        id: "checklist",
        title: "Define persistence before evaluating an ecological change",
        paragraphs: [
          "A conservation discussion can sound contradictory when participants use the same word for different outcomes. A stable richness count, high occupied fraction and a large local population can move in different directions. Write the state variable and observation process first, then ask how the proposed intervention changes the mechanism governing that variable.",
        ],
        checklist: [
          "Specify whether the outcome is species richness, identities, occupied fraction or population abundance.",
          "Separate a stable total from turnover among the members contributing to that total.",
          "Identify what connects local patches and whether colonisation can reach the places that become empty.",
          "Compare matching initial conditions and time horizons when isolating a proposed interaction.",
          "List missing spatial, behavioural and stochastic processes before interpreting a deterministic equilibrium as security.",
        ],
      },
      {
        id: "application",
        title: "Turn the model into a question for evidence",
        paragraphs: [
          "Suppose a monitoring programme reports an unchanged annual species count. A useful follow-up asks whether the same species remain, whether arrivals replace losses and whether the count masks changes in abundance. If the programme tracks occupancy, ask which patches can recolonise and which remain isolated. The data needed depend on the claim, not on which curve looks reassuring.",
          "A good model also clarifies what would change the interpretation. If dispersal is too spatially restricted for mean-field mixing, the occupancy calculation needs a different structure. If species interactions drive vegetation changes, a richness total alone may miss the response. The practical value of these experiments is therefore a clearer measurement plan: define persistence, identify the mechanism and choose observations capable of distinguishing stability from replacement or temporary compensation.",
        ],
        deeper: {
          title: "Why positive turnover can coexist with fixed richness",
          text: "At the island equilibrium, expected immigration and extinction flows are equal, so their difference is zero. The flows themselves need not be zero. A net state change and the gross movements producing it are different quantities, just as a balanced account can contain continuing transactions.",
        },
      },
    ],
    experiments: [
      {
        slug: "island-biogeography",
        task: "Compare equilibrium richness with nonzero immigration and extinction flows.",
      },
      {
        slug: "metapopulation",
        task: "Raise local extinction relative to colonisation and inspect occupancy persistence.",
      },
      {
        slug: "trophic-cascade",
        task: "Trace an indirect vegetation response after changing a top predator.",
      },
    ],
    sources: [
      {
        ...s.island,
        note: "Foundational book framing equilibrium island biogeography; full text may require access.",
      },
      {
        ...s.metapop,
        note: "Primary paper providing context for regional population persistence and heterogeneity.",
      },
    ],
    reflection:
      "Which ecological state is stable, and what ongoing movement or replacement might that stability conceal?",
  },
];
