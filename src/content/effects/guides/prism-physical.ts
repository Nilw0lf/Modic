import type { PrismNote } from "./prism";
export const prismPhysicalNotes: PrismNote[] = [
  [
    "doppler-effect",
    "Positive velocity means motion toward the observer on the right. Compare emitted and observed frequency without interpreting circle size as loudness.",
    [
      "A moving source with an unchanged note",
      "Keep emitted frequency at 440 Hz with source velocity zero.",
      "Raise approach velocity to about 114 m/s and inspect the observed frequency near 660 Hz.",
      "Reverse velocity to obtain a lower received frequency while preserving the emitted note.",
    ],
    [
      "A higher received pitch means the source emitted a higher note.",
      "Relative motion can change the arrival spacing of wavefronts without changing the source’s emitted frequency.",
    ],
    [
      "Why is light not calculated with this same formula?",
      "The board models sound relative to still air. Light’s relativistic frequency shift needs a different propagation account.",
    ],
    "Which motion and reference medium explain the frequency you observed?",
  ],
  [
    "snells-law",
    "Compare angles from the normal. A total-internal-reflection result means no propagating refracted ray under these indices, not an angle beyond ninety degrees.",
    [
      "Crossing the critical-angle boundary",
      "Begin with air-to-glass incidence at thirty-five degrees and inspect the smaller transmitted angle.",
      "Reverse the media to glass-to-air, then raise incidence above forty-two degrees.",
      "Read total internal reflection rather than expecting the formula to return a physical transmitted angle.",
    ],
    [
      "Light always bends toward the normal on entering another material.",
      "The direction depends on the relative refractive indices. Entering a lower-index medium bends the transmitted ray away from the normal.",
    ],
    [
      "Does the ray drawing say how much energy was reflected?",
      "No. It shows directions and the critical case; partial reflection intensities and polarisation are omitted.",
    ],
    "Are you comparing an angle with the normal or with the boundary surface?",
  ],
  [
    "inverse-square-law",
    "The distance-one scale stays fixed when distance changes. Intensity and spherical spreading area move inversely rather than both growing together.",
    [
      "Double distance from an ideal point source",
      "Leave source scale at one hundred and start at distance one.",
      "Move to distance two and compare intensity twenty-five with area ratio four.",
      "Move to distance four to obtain intensity 6.25, preserving the same source scale.",
    ],
    [
      "Twice the distance always means half the intensity.",
      "Uniform spherical spreading increases area with squared distance, giving a quarter of the intensity at twice the radius.",
    ],
    [
      "Does the law apply next to every lamp?",
      "No. The point-source and propagation assumptions can fail for extended emitters, near fields and obstructed or absorbing paths.",
    ],
    "What geometry justifies the distance exponent in your application?",
  ],
  [
    "double-slit-interference",
    "Read bright and dark bands as normalised intensity. The one-slit baseline removes modulation without modelling a finite-width diffraction envelope.",
    [
      "Pack fringes by separating the sources",
      "Set wavelength to 550 nm and slit separation to 0.25 mm.",
      "Double separation to 0.5 mm while holding the one-metre screen distance fixed.",
      "Compare fringe spacing falling from 2.2 mm to 1.1 mm rather than assuming a brighter source changed the spacing.",
    ],
    [
      "A wider separation must spread the interference bands farther apart.",
      "The small-angle fringe spacing is wavelength times distance divided by slit separation, so greater separation packs bands closer.",
    ],
    [
      "Where are individual photon impacts in this display?",
      "This is an ideal continuous wave-intensity calculation, with no particle detection, counting noise or which-path apparatus.",
    ],
    "Which parameter changes phase difference across the screen rather than merely overall brightness?",
  ],
  [
    "photoelectric-effect",
    "The maximum electron energy is conditional on emission. Positive available energy with zero photon flux does not imply electrons are currently arriving.",
    [
      "Energy threshold versus photon flux",
      "Set work function to two eV and wavelength to eight hundred nm.",
      "Raise photon flux and observe that below-threshold photons still produce no emission here.",
      "Shorten wavelength to four hundred nm, giving photon energy 3.1 eV and maximum kinetic energy 1.1 eV.",
    ],
    [
      "Enough weak photons always accumulate to release an electron in this model.",
      "The ideal one-photon account requires each absorbed photon to exceed the work function; increasing below-threshold flux does not change that energy.",
    ],
    [
      "Are the electron icons a calibrated current?",
      "No. Their count encodes relative photon flux under a declared ideal yield, not a measured emission rate.",
    ],
    "Did you change energy per quantum or the number of incident quanta?",
  ],
  [
    "ohms-law",
    "Equivalent resistance and source current concern the entire selected network; an individual branch need not carry that total current.",
    [
      "Reconnect the same two resistors",
      "Set voltage to twelve and adjustable resistance to ten ohms.",
      "Compare series resistance twenty ohms and current 0.6 A with parallel resistance five ohms and current 2.4 A.",
      "Keep voltage fixed while checking why total electrical power rises under the lower equivalent resistance.",
    ],
    [
      "Adding another resistor always lowers total source current.",
      "A parallel path can lower equivalent resistance, increasing current drawn from an ideal constant-voltage source.",
    ],
    [
      "Can I use these values to select real components?",
      "Actual supplies, heating and component ratings need additional information; this ideal teaching calculation is not electrical-work guidance.",
    ],
    "Are you reasoning about a branch resistance or the whole network’s equivalent resistance?",
  ],
  [
    "kirchhoffs-laws",
    "At balance the midpoint potentials match, so connecting the bridge does not create midpoint current. Source and return currents still need not be zero.",
    [
      "Find the null in a resistor bridge",
      "Keep the fixed divider resistors at ten, twenty and fifteen ohms.",
      "Adjust the lower-right resistor to thirty ohms and inspect equal midpoint potentials.",
      "Open and reconnect the bridge, confirming zero cross-current at balance while the source still supplies the divider branches.",
    ],
    [
      "A zero bridge current means the entire circuit has no current.",
      "Equal midpoint potentials remove that branch’s driving voltage, while other complete branches can still carry current.",
    ],
    [
      "Why solve nodal equations instead of adding all resistors?",
      "The connected bridge is not a simple series chain; node balance accounts for how currents split and recombine.",
    ],
    "Which node or loop conservation statement constrains the quantity you want to infer?",
  ],
  [
    "bernoulli-flow",
    "The same selected volume flow passes both sections. The higher local velocity comes from smaller area, with pressure changing to preserve the ideal energy balance.",
    [
      "A constriction at fixed volume flow",
      "Set volume flow to one litre per second with first area four square centimetres.",
      "Set second area to one and compare speeds 2.5 and ten metres per second.",
      "Read second pressure about 353.13 kPa, below the initial four hundred, under the equal-height ideal assumptions.",
    ],
    [
      "Faster fluid must have higher static pressure everywhere.",
      "In this ideal horizontal streamline comparison, increased kinetic energy accompanies lower static pressure; added pumps or losses change the balance.",
    ],
    [
      "Does the pipe’s drawn height measure cross-section exactly?",
      "No. The pipe is schematic; numerical areas and calculated velocities define the model, not the two-dimensional illustration.",
    ],
    "Are flow rate, velocity and pressure being treated as distinct quantities?",
  ],
  [
    "elastic-collision",
    "Check momentum and energy totals as well as individual speeds. A negative final velocity means reversal along the selected one-dimensional axis.",
    [
      "Swap velocities with equal ideal masses",
      "Set both cart masses to one kilogram and resolve the collision.",
      "Inspect A stopping and B taking the original four-metre-per-second velocity.",
      "Raise B’s mass and repeat, observing A’s possible rebound while the total conserved quantities remain unchanged.",
    ],
    [
      "Conserving momentum alone makes a collision elastic.",
      "An elastic collision also conserves kinetic energy. Other collisions can conserve momentum while dissipating kinetic energy into internal modes.",
    ],
    [
      "What does a rebound’s negative sign represent?",
      "It is motion opposite to the initial positive axis, not negative speed magnitude or negative kinetic energy.",
    ],
    "Which conserved total can distinguish the collision models you are comparing?",
  ],
  [
    "archimedes-principle",
    "Compare total mass with maximum displaced-fluid mass. Floating immersion adjusts to weight; full immersion supplies only the maximum available buoyant force.",
    [
      "Float the same sealed object in two fluids",
      "Choose mass eight kilograms and exterior volume ten litres in water.",
      "Inspect partial immersion with support capacity ten kilograms, then switch to oil of density eight hundred.",
      "The same object reaches neutral full immersion in the oil rather than retaining the water immersion fraction.",
    ],
    [
      "Only the shell material’s density determines whether a sealed object floats.",
      "The average density of total mass over exterior displaced volume includes sealed air space and determines this ideal comparison.",
    ],
    [
      "Does the shown position predict sinking speed?",
      "No. A sinking object is drawn fully immersed; drag, acceleration and shape-dependent stability are not calculated.",
    ],
    "Which exterior volume actually displaces the surrounding fluid?",
  ],
  [
    "island-biogeography",
    "Richness is an expected count index. The equilibrium turnover rate can remain positive even when the richness trajectory has stopped changing visibly.",
    [
      "Stable richness with ongoing replacement",
      "Set maximum immigration six and maximum extinction three with a source pool of one hundred.",
      "Run successive time blocks toward equilibrium richness about 66.67.",
      "Inspect turnover two species per model time unit at equilibrium without inferring which species arrive or leave.",
    ],
    [
      "An unchanged species count proves that species identities are unchanged.",
      "Immigration and extinction can balance in number while replacing identities. This model reports richness and expected turnover separately.",
    ],
    [
      "Why does the zero-rate case not display a unique equilibrium?",
      "If neither immigration nor extinction occurs, every initial richness remains unchanged; division by zero would invent a unique answer.",
    ],
    "Would a stable total hide substantial replacement within the system?",
  ],
  [
    "metapopulation",
    "The curve shows mean-field occupied fraction rather than a literal integer number of patches. Compare colonisation with local extinction before reading a positive equilibrium.",
    [
      "Regional persistence despite local extinction",
      "Leave colonisation at 0.5 and local extinction at 0.2.",
      "Advance the model and compare occupancy with the positive equilibrium of 0.6.",
      "Raise local extinction above colonisation and observe the loss of a positive equilibrium under the same mean-field rule.",
    ],
    [
      "Every local extinction implies the entire regional species disappears.",
      "Dispersal can recolonise empty patches when regional colonisation is sufficient, although finite spatial systems can have additional risks.",
    ],
    [
      "Does the model identify which real habitat corridor to protect?",
      "No. All patches are treated equally; spatial distance, quality and actual dispersal mechanisms are absent.",
    ],
    "What maintains recolonisation after a local population is lost?",
  ],
  [
    "trophic-cascade",
    "Compare matching time horizons and initial plant and herbivore states. A top-predator change can have indirect consequences without a direct predator–plant link.",
    [
      "Remove a consumer one level above the grazer",
      "Run the three-level system with the initial top predator present.",
      "Restart without the predator while retaining the same initial plant and herbivore indices.",
      "Compare both direct consumer responses and later vegetation rather than assuming every population changes in the same direction.",
    ],
    [
      "A predator affects only the species it directly eats.",
      "Changing an intermediate consumer can indirectly affect another trophic level, although food-web alternatives can alter the sign and size of the response.",
    ],
    [
      "Are these curves an estimate for a named ecosystem?",
      "No. Rates and starting indices are invented to expose a possible interaction, with no empirical species calibration.",
    ],
    "Which indirect pathway should you inspect beyond the first visible interaction?",
  ],
  [
    "hamiltons-rule",
    "Correct classifications refer only to the supplied marginal fitness condition. They are not ethical scores or predictions about what a person will choose.",
    [
      "Compare relatedness-weighted benefit with cost",
      "For the first act multiply relatedness one-half by benefit three.",
      "Compare 1.5 with cost one and classify the simple condition as favouring the act.",
      "Contrast the one-eighth-relatedness act with benefit four and cost one, where the weighted benefit is only one-half.",
    ],
    [
      "Hamilton’s rule is a moral instruction to favour family.",
      "The inequality is a biological reproductive-fitness condition under assumptions; it does not determine moral obligations or human motives.",
    ],
    [
      "Why are B and C not measured in money?",
      "They represent stipulated comparable marginal reproductive effects, not personal utility or a household financial payoff.",
    ],
    "Are the benefit, cost and relatedness defined on compatible biological terms?",
  ],
  [
    "frequency-dependent-selection",
    "Fitness changes with the current frequency rather than remaining fixed across generations. The chosen rule determines whether rarity is advantageous.",
    [
      "Reverse the stability of an interior balance",
      "Begin with A at twenty percent and choose rare-type advantage.",
      "Advance generations and inspect movement toward one-half under the stated fitness functions.",
      "Restart with common-type advantage and compare movement away from the one-half balance.",
    ],
    [
      "A rare type always has a selective advantage.",
      "Negative frequency dependence can favour rarity; positive frequency dependence can instead favour the already common type.",
    ],
    [
      "Is the one-half equilibrium a measured natural frequency?",
      "No. It follows from the symmetric teaching fitness functions, with no empirical organism or strategy calibration.",
    ],
    "Would becoming common change the advantage of the type you are observing?",
  ],
  [
    "binary-search",
    "The remaining range uses reliable ordered comparisons. A successful guess ends the game instead of pretending another split is required.",
    [
      "Find one of thirty-two ordered targets",
      "Use the midpoint button for the first guess and inspect the surviving interval.",
      "Continue taking midpoints, discarding the side excluded by each lower-or-higher result.",
      "Count the equality-tested guesses and compare with the six-guess worst-case bound.",
    ],
    [
      "Binary search finds arbitrary unordered records without preparation.",
      "The method requires order or a monotonic comparison that safely discards a region. Establishing that structure can itself cost work.",
    ],
    [
      "Why can thirty-two candidates need six guesses?",
      "The game counts the final equality test as a guess; identifying an endpoint can require that extra comparison after narrowing.",
    ],
    "Which comparison lets you safely discard an entire group of candidates?",
  ],
  [
    "sorting-algorithms",
    "A pass is an outer-loop operation, not a unit of equal computation. Read key comparisons and writes separately for the same starting list.",
    [
      "One list, two cost ledgers",
      "Step through insertion sort on seven, two, nine, one, five and three.",
      "Restart selection sort on the identical initial order and inspect its comparison and write totals.",
      "Compare sorted outputs and cost conventions without inferring runtime from the number of displayed passes.",
    ],
    [
      "The algorithm with fewer visible passes necessarily did less work.",
      "A pass can contain different amounts of searching and moving. The board counts two concrete operations rather than treating animation steps as work.",
    ],
    [
      "Why count a held-key write even when its position stays the same?",
      "That is the stated insertion implementation. Explicit conventions make comparisons auditable instead of silently changing the accounting.",
    ],
    "Which operation is actually expensive in the environment where you will sort?",
  ],
  [
    "huffman-coding",
    "Weighted average code length describes the supplied source mix. The actual short message can have a different mix and need not become shorter.",
    [
      "Build and use a four-symbol prefix code",
      "Inspect codewords for weights fifty, twenty-five, fifteen and ten.",
      "Encode the default message and compare its bit count with two bits per symbol.",
      "Change A’s weight to rebuild the code and distinguish expected source savings from the length of this particular message.",
    ],
    [
      "A compression code must shorten every possible input.",
      "A short code for frequent symbols can lengthen rare ones, and transmitting the codebook also costs space outside this toy comparison.",
    ],
    [
      "Can one codeword be the prefix of another here?",
      "No. Huffman construction yields a binary prefix code, permitting unambiguous symbol boundaries without the displayed visual separators.",
    ],
    "Does the message you are encoding resemble the frequency model used to design its code?",
  ],
  [
    "consistent-hashing",
    "Compare original and current owners for each unchanged key. Remapping is limited by the ring rule, while balance is a separate question.",
    [
      "Add a server inside one ownership interval",
      "Inspect original server positions ten, thirty-five, sixty and eighty-five.",
      "Add server fifty and identify keys between thirty-five and fifty that change owners.",
      "Verify that keys elsewhere retain their original owners, including wraparound assignments.",
    ],
    [
      "Limited remapping guarantees equal load on all servers.",
      "Remapping and balance are different properties. This small fixed ring lacks virtual nodes and supplies no balanced-load guarantee.",
    ],
    [
      "Why does a key larger than the final server wrap around?",
      "The ordered space is a ring, so the first clockwise server after the endpoint is the smallest listed position.",
    ],
    "Are you trying to minimise moved keys, balance work, or provide replication?",
  ],
  [
    "bloom-filter",
    "Read a positive result as possibly present, then compare with the exact teaching ledger. An unset query bit can rule out insertion under this implementation.",
    [
      "Find a positive result for a word never inserted",
      "Insert apple so its two hash positions become set in the twenty-four-bit filter.",
      "Use the false-positive search to locate an uninserted candidate whose two positions are already set.",
      "Query that candidate and compare possibly-present output with the separate exact insertion ledger.",
    ],
    [
      "A positive Bloom-filter answer proves membership.",
      "Different words can share set bits, so positives require a definitive follow-up when correctness matters. Unset bits establish absence in this insertion-only model.",
    ],
    [
      "Does the filter itself remember the exact words?",
      "No. The exact list is retained only for explanation in this activity; it would defeat the compact-filter purpose if treated as part of the filter.",
    ],
    "Which operation can tolerate an approximate precheck followed by exact verification?",
  ],
  [
    "sampling-bias",
    "Frame support is an exact fictional quantity here. A larger count within the same incomplete frame cannot add households the frame excludes.",
    [
      "Count the households an online survey cannot reach",
      "Choose the online-only frame and read support seventy-five percent among eighty households.",
      "Reveal the offline group of twenty households with five supporters.",
      "Combine sixty-five supporters across all one hundred households to distinguish population support from online-frame support.",
    ],
    [
      "A very large response count guarantees a representative survey.",
      "Selection and coverage can remain systematically incomplete as the number of responses grows; more of the same frame does not remove the gap.",
    ],
    [
      "Does this town estimate actual online survey bias?",
      "No. The numbers are authored to isolate a coverage mechanism, without claiming prevalence or a measured effect in a real population.",
    ],
    "Who has no route into the sample that supports your estimate?",
  ],
  [
    "publication-bias",
    "Visible signed means can remain near zero under symmetric two-sided selection. Inspect which absolute estimates became visible, not only their average sign.",
    [
      "Open the drawer behind significant results",
      "Inspect the selective journal’s visible estimates from the true-zero study generator.",
      "Open the file drawer to reveal every one of the hundred synthetic studies.",
      "Compare the selected extreme estimates with the complete distribution, preserving the same realised batch.",
    ],
    [
      "Publication selection must always create a positive average effect.",
      "Two-sided selection can retain both positive and negative extremes. Exaggerated absolute magnitude and a biased signed average are different outcomes.",
    ],
    [
      "Is the hidden-study count a statistic about real journals?",
      "No. The significance-only rule is stipulated for a teaching batch, not estimated from publication practices in any field.",
    ],
    "What result-selection rule separates the evidence you see from the evidence collected?",
  ],
  [
    "ecological-fallacy",
    "The district summaries describe groups. The detailed cells are required before making a claim about individuals within either district.",
    [
      "Unpack a district-level association",
      "Compare district A’s eighty-percent access and seventy-percent pass rate with B’s twenty and thirty percent.",
      "Reveal the access-by-passing cells separately within each district.",
      "Observe equal within-district pass rates for access and non-access groups without interpreting this example as a causal finding about libraries.",
    ],
    [
      "A positive group-level association must hold within each group.",
      "Differences between groups can generate an aggregate pattern without the corresponding within-group relationship; the level of analysis matters.",
    ],
    [
      "Does this prove aggregate research is useless?",
      "No. Aggregate data can answer group-level questions and support other inferences with justified assumptions; the unsupported level change is the problem.",
    ],
    "At which level were the observations collected and at which level is the conclusion being stated?",
  ],
  [
    "range-restriction",
    "The same generated points remain in the background. Only the selected x range changes; population correlation and finite-sample correlation are separate quantities.",
    [
      "Select a narrow band without changing the process",
      "Begin with a broad absolute-x bound to retain most of the synthetic population.",
      "Narrow the bound and compare the restricted sample size and correlation with the full sample.",
      "Treat the change as conditional on this selection rule and finite sample rather than a universal correction factor.",
    ],
    [
      "A lower selected-sample correlation proves the original relationship weakened.",
      "Selection can reduce variable range and alter the observed association while leaving the generating mechanism unchanged.",
    ],
    [
      "Why is the displayed full correlation not exactly 0.7?",
      "The generator uses population correlation 0.7, but two hundred realised observations have their own fluctuating sample correlation.",
    ],
    "Which part of the predictor’s range was excluded before your relationship was measured?",
  ],
  [
    "robust-statistics",
    "The moving observation changes all summaries of the same seven values. A stable median is a sensitivity property, not proof that the extreme record is wrong.",
    [
      "Move one value far from its neighbours",
      "Keep the six fixed observations near ten and start the seventh at ten.",
      "Move the seventh value to two hundred and compare the changing mean with the median.",
      "Inspect the trimmed mean and retain the original record while deciding what further investigation its extremeness warrants.",
    ],
    [
      "A robust summary identifies which observation should be deleted.",
      "Resistance to specified contamination does not diagnose data quality. An unusual observation may be genuine and important to the estimand.",
    ],
    [
      "Why does a negative observation have no left-pointing meter?",
      "The meter is nonnegative and clips its graphic at zero; the signed value remains explicitly reported, so the bar is not a signed-axis plot.",
    ],
    "Which departures from your assumptions should the chosen summary resist?",
  ],
];
