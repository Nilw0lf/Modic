import { guide as g } from "./types";
export const philosophyGuides = {
  "dichotomy-of-control": g(
    "The dichotomy of control distinguishes what is up to a person's choice and judgment from external circumstances and outcomes. Epictetus uses the distinction within an ethical account of agency, not as a promise of emotional invulnerability.",
    "A plan can improve preparation without determining the world it encounters. Allocating effort to an external wish cannot produce preparation in this toy model; replaying the weather holds your decision fixed while varying what follows.",
    "Spend six tokens, commit, and replay weather. Compare preparation with operational result rather than treating a lucky outcome as evidence of a wise choice. The model's effort coefficients are invented.",
    [
      "One plan crossing three weather conditions",
      "Allocate three tokens to checks and three to practice: preparation is 3×3+3×2=15 units.",
      "With weather −4 the operational result is eleven. Replay the same plan with weather +4 and the result is nineteen.",
      "Preparation remains fifteen in both cases. A changed result does not show that your committed actions changed.",
    ],
    [
      "Anything outside total control deserves no action.",
      "Influence and complete control differ. Responsible choices can address uncertain conditions without guaranteeing them; the simple board deliberately separates preparation and weather.",
    ],
    [
      "Are the operational units measuring Stoic virtue?",
      "No. They make one causal separation visible. Ethical judgment, real human constraints, and the quality of reasons cannot be reduced to these points.",
    ],
    "Which action remains worth taking even when you cannot guarantee its outcome?",
  ),
  "veil-of-ignorance": g(
    "The veil of ignorance is Rawls's restriction on information about one's eventual social position when justifying principles of justice. It invites impartial reasoning rather than merely guessing which position will win a lottery.",
    "Knowing your own receipt can distort the defence of a common rule. Withholding that fact lets minimum, total, equality, and other reasons be considered before personal advantage is revealed.",
    "Compare every policy's four receipts, floor, and total. Commit before revealing the seeded role. Your personal result is one outcome under an invented uniform draw, not a test of Rawls's full theory.",
    [
      "Choosing a rule before learning your position",
      "Equal shares allocates six to each of four positions, giving total twenty-four and floor six.",
      "The high-total policy allocates 1/5/9/17, giving total thirty-two and floor one. Both numbers matter to the comparison.",
      "Reveal your role only after commitment. Ask whether the reason for your choice still addresses the person who receives the lowest amount.",
    ],
    [
      "The veil mechanically proves that equal token shares are just.",
      "The activity omits liberties, opportunities, institutions, and Rawls's arguments. Token comparisons make a question visible without selecting a universally correct principle.",
    ],
    [
      "Does Rawls assume each position has a known equal probability?",
      "Not as a straightforward premise of the original position. Modic's uniform draw is a teaching device, and Rawls's reasoning about the choice situation is more demanding.",
    ],
    "Could you defend your preferred rule without knowing which position you would occupy?",
  ),
  "trolley-problem": g(
    "The trolley problem compares stylised choices about harm to investigate whether consequences, intention, duties, and using people as means support different moral judgments.",
    "Two cases can share the same stipulated headcount while differing in the structure of intervention. A reason that supports switching a track may not support pushing a person, and that difference needs explanation rather than a personality label.",
    "Choose an action and a reason in each case, or withhold judgment. Read the ledger's consequences alongside the reasons you recorded. There is no numerical morality grade.",
    [
      "Keeping the numbers while changing the intervention",
      "The switch case stipulates that intervention redirects a threat from five people to one.",
      "The bridge case stipulates that pushing one person stops the threat to five; the person is used in stopping it.",
      "Compare your choices and explain which distinction matters. Equal outcomes alone need not settle whether your reasons transfer.",
    ],
    [
      "The dilemma has one solution that the software can calculate.",
      "Arithmetic can report stipulated consequences, but the ethical criteria and relevant distinctions remain disputed. The software does not infer a complete moral theory from two choices.",
    ],
    [
      "Why include a withhold-judgment option?",
      "Artificial assumptions can be challenged, and a reader may need more reflection before endorsing a lethal choice. The exercise should make reasons inspectable rather than force a verdict.",
    ],
    "Which feature of an action matters to your judgment besides the number of people affected?",
  ),
  "experience-machine": g(
    "The experience machine asks whether pleasurable experience is all that matters to a good life, or whether actual achievement, relationships, and contact with reality also have value.",
    "Holding pleasantness equal makes other differences harder to hide inside a claim that one option simply feels better. A reader's preference can point toward a value without proving that value's universal priority.",
    "Choose across three paired cards and record a reason. Each pair stipulates equal pleasantness while changing achievement, connection, or informed control. The final ledger reports choices, not a validated measure of wellbeing.",
    [
      "A novel felt and a novel written",
      "One option supplies the pleasant experience of completing a novel without an actual novel being produced.",
      "The other supplies actual authorship with equally pleasant experience under the card's stipulated assumptions.",
      "If you distinguish them, name what matters beyond the experience itself. If you do not, explain why actuality makes no difference in that comparison.",
    ],
    [
      "Choosing reality proves that virtual experiences have no value.",
      "Real virtual activities can involve genuine learning, relationships, and achievements. The cleanly separated machine case is a philosophical stipulation, not a classification of every technology.",
    ],
    [
      "Is a preference for the machine an incorrect answer?",
      "No. The activity makes a theoretical question concrete and records your reasoning. It does not settle the philosophy of wellbeing or assign a superior personality type.",
    ],
    "What do you value doing or being that cannot be described only as having a pleasant experience?",
  ),
  "ship-of-theseus": g(
    "The Ship of Theseus explores how an object can persist as its material parts change. Reassembling its removed parts adds a rival claim grounded in original material rather than maintenance history.",
    "Continuous repair preserves one chain of use while relocating old components. When the components form a second ship, continuity of history and continuity of matter no longer identify the same candidate.",
    "Replace original planks and reassemble the stored originals in the second hull. Follow each material transfer before choosing an identity criterion. The board reports part counts but never equates them with percentages of identity.",
    [
      "Two ships and one history",
      "Replace all eight planks of the maintained ship over the sequence of repair actions.",
      "Use the eight stored originals to build the second hull, so the original material is conserved rather than duplicated.",
      "Choose a criterion and compare the two ships. Material continuity and maintained history now support different candidates.",
    ],
    [
      "The ship with more original planks must be the original by definition.",
      "That conclusion already adopts a material criterion. The puzzle asks why that criterion should govern instead of another account of persistence.",
    ],
    [
      "Does this settle who a person is after changing over time?",
      "No. Artefact identity and personal identity involve different questions. The ship can clarify a tension without proving a theory of persons or consciousness.",
    ],
    "When something changes, which continuity are you actually relying on when you call it the same thing?",
  ),
  "sorites-paradox": g(
    "The sorites paradox concerns vague predicates: clear endpoints combine with the tempting thought that a tiny change cannot alter classification, leading through repeated steps toward an implausible conclusion.",
    "If one grain never changes heapness, repeated removal seems to preserve a heap down to one grain. The tension concerns the tolerance premise and language's boundaries, not an arithmetic failure to count grains.",
    "Record labels for neighbouring counts and inspect the ledger's transitions. Borderline is available. The software highlights your adjacent label changes without declaring a correct semantic boundary.",
    [
      "A tiny change and a different label",
      "At a chosen count, record whether the displayed pile is a heap, not a heap, or borderline.",
      "Add one grain and classify again. Repeat near the point where your confidence or label changes.",
      "Inspect adjacent records. A practical boundary in your decisions does not automatically identify the unique meaning of heap.",
    ],
    [
      "A useful numerical threshold resolves every problem of vagueness.",
      "Operational rules can specify a boundary for a task while ordinary language remains context-sensitive or vague. Philosophical accounts disagree about how to explain that fact.",
    ],
    [
      "Does choosing borderline solve the paradox by itself?",
      "Not necessarily. It may honestly describe uncertainty, but theorists still ask where borderline cases begin and how the underlying inference should be understood.",
    ],
    "Where do you need a practical threshold while recognising that ordinary language has no obvious exact boundary?",
  ),
  "hedonic-adaptation": g(
    "Hedonic adaptation concerns how responses to circumstances change as those circumstances become familiar. It is a variable phenomenon, not a universal law that every person returns to an immutable happiness baseline.",
    "A temporary boost can decay while further boosts make the response rise again. Comparing that pattern with a no-decay counterfactual isolates one teaching mechanism, but the decay parameter is assumed rather than measured.",
    "Spend upgrade credits and let periods pass. The solid response decays by the chosen retention factor; the dashed response preserves the same purchases. The horizontal sequence logs actions, so it does not imply equal time between an upgrade and a wait.",
    [
      "A boost under a chosen retention rule",
      "Spend one upgrade at the default retention of 0.5, creating ten illustrative response units.",
      "Let one period pass: five remain. Another period leaves 2.5, while the persistent counterfactual remains at ten.",
      "Compare an immediate second upgrade with waiting. The gap illustrates the stipulated dynamics, not a forecast for any person's happiness.",
    ],
    [
      "People adapt completely to every life change, so circumstances do not matter.",
      "Adaptation differs across events and people, and some changes have persistent effects. The model intentionally permits a retention of one instead of claiming universal complete decay.",
    ],
    [
      "Is a low response a mental-health assessment?",
      "No. These are authored units in a small mathematical illustration. They do not measure a reader's mood, suffering, wellbeing, or clinical needs.",
    ],
    "Which improvement has become less noticeable, and which benefit remains valuable even when novelty fades?",
  ),
  "occams-razor": g(
    "Occam's razor is a family of principles favouring economy of explanation when other relevant considerations are equal. Simplicity is a guide to inquiry rather than a guarantee that a short account is true.",
    "Several rules can fit the same finite observations exactly. A more elaborate rule may add unsupported flexibility, yet real structure can also be complex. A prediction on new data supplies information that training fit alone lacks.",
    "Compare the rules on the three training points, commit to a prediction at x=4, and reveal its error. Switch teaching worlds to see a case where the shorter rule succeeds and a case where it misses real structure.",
    [
      "Two exact fits and one new observation",
      "The observations at x=1, 2, and 3 are two, four, and six. Both displayed rules match all three.",
      "At x=4, the short rule predicts eight while the elaborate rule predicts fourteen.",
      "Reveal the teaching world. An exact training fit did not distinguish the candidates, and the shorter rule is not guaranteed to match the new observation.",
    ],
    [
      "The simplest explanation must be true.",
      "Simplicity can be a reason to prefer a candidate provisionally, but evidence and explanatory adequacy remain necessary. Choosing an easy story does not eliminate alternatives.",
    ],
    [
      "Does this prove that complex models always overfit?",
      "No. The Curved world makes the extra structure useful. The toy comparison shows why limited observations and a simplicity preference cannot substitute for testing.",
    ],
    "Which extra assumption in an explanation makes a testable prediction, and which merely decorates the story?",
  ),
  falsifiability: g(
    "Falsifiability asks whether a claim rules out possible observations. A claim that can accommodate every result has not identified a condition under which observation could count against it.",
    "A universal colour claim excludes authentic counterexamples. Blue badges are compatible with it; an amber badge contradicts it under the stipulated noiseless assumptions. An explanation that declares every anomaly an exception removes that risk of failure.",
    "Inspect cards and compare Testable with Evasive mode. The same evidence produces different responses because the failure condition changes. Do not confuse surviving several checks with proving all future factory output is blue.",
    [
      "A factory claim meets an amber badge",
      "Begin with the universal statement that every badge from the factory is blue.",
      "Inspect blue badges, then the amber card. Under the game's verified-origin and noiseless assumptions, the amber badge is a counterexample.",
      "Switch to the evasive explanation. If no colour is allowed to challenge it, the explanation has lost the specific test condition that made the first claim risky.",
    ],
    [
      "Any anomalous observation immediately requires abandoning a scientific theory.",
      "Real testing also depends on measurement, provenance, and auxiliary assumptions. Responsible inquiry checks anomalies rather than treating every report as an infallible counterexample.",
    ],
    [
      "Is an unfalsifiable statement automatically meaningless?",
      "No. A demarcation criterion concerns a proposed relation to empirical testing. It does not make every ethical, mathematical, or metaphysical statement meaningless.",
    ],
    "Before your next test, what result would count against the explanation you prefer?",
  ),
  "categorical-imperative": g(
    "Kant's categorical imperative includes a universal-law formulation asking whether a maxim could be willed as a universal law. A maxim describes a policy of action, not merely an isolated outcome.",
    "A false promise can seek the benefit of a reliable practice while exempting the speaker from its conditions. Generalising the policy raises a question about whether the practice on which the action depends could still function.",
    "Compare One exception with Everyone adopts it. The invented lending threshold makes dependence on others' reliability visible. Loan totals do not themselves determine Kantian moral permissibility.",
    [
      "An exception inside a reliable practice",
      "With one false promise among ten, nine promises remain reliable and this toy lender extends loans.",
      "Let everyone adopt false promising. No reliable promises remain, and the stated lender rule stops lending.",
      "Ask whether the intended act relied on others not adopting its maxim. The simulation illustrates that dependence without proving Kant's full argument.",
    ],
    [
      "Kantian ethics simply says to choose the rule with the best total outcome.",
      "Universalisation tests the proposed maxim and its consistency, not just a sum of consequences. The numerical threshold is a teaching assumption rather than the moral law.",
    ],
    [
      "Is this the complete categorical imperative?",
      "No. Kant develops multiple formulations and a much larger moral theory. This board isolates the false-promise example's dependence on a shared practice.",
    ],
    "Which exception do you want for yourself, and what would your reason look like if everyone used it?",
  ),
  utilitarianism: g(
    "Utilitarian approaches evaluate actions through implications for wellbeing. Aggregating benefits raises questions about distribution, comparison, quality, uncertainty, and the treatment of individuals.",
    "Diminishing benefit schedules can make an extra resource token help one group more than another. Maximising the total and protecting the smaller gain are distinct criteria and can select different resource splits.",
    "Move a token between the groups and open the complete split table. Read each group's gain, total, and minimum. These are invented comparable benefit units, not measured welfare or a verdict about real people.",
    [
      "Two criteria over the same five tokens",
      "Allocate two tokens to A and three to B, producing gains fourteen and fifteen: total twenty-nine and minimum fourteen.",
      "Allocate three to A and two to B, producing eighteen and eleven: total twenty-nine and minimum eleven.",
      "The total ties while the minimum differs. A criterion selecting on total alone leaves a distributive question unresolved.",
    ],
    [
      "A larger total automatically answers every ethical question.",
      "That judgment adopts a substantive criterion. Rights, distribution, uncertainty, and the meaning of the units remain questions rather than disappearing inside the arithmetic.",
    ],
    [
      "Does the gain table reproduce Mill's ethical theory?",
      "No. It isolates an aggregation problem. Mill's account includes distinctions and arguments about pleasures, rules, and morality that the simple schedules do not represent.",
    ],
    "When you report a collective benefit, whose outcome could disappear inside the total?",
  ),
  "moral-luck": g(
    "Moral luck concerns the tension between responsibility judgments and factors outside an agent's control. Resultant luck asks how differing outcomes affect judgments of otherwise similar conduct.",
    "Two agents can take the same risk while chance determines whether a bad consequence follows. A changed evaluation can therefore reflect outcome information rather than a difference in the original choice.",
    "Rate conduct before revealing deliveries, then rate again afterward. Compare actual rating changes. One damaged and one intact parcel are paired by design to isolate outcomes, not to estimate risk or diagnose bias.",
    [
      "Identical skipped checks, different deliveries",
      "Both couriers knowingly skip the same protective check under identical stipulated risk.",
      "One artwork shipment is revealed as damaged and the other intact, with the assignment seeded for the demonstration.",
      "Reassess responsibility and compare with the earlier ratings. Ask which reason changed and whether that reason concerns conduct, outcome, or both.",
    ],
    [
      "A fortunate outcome proves that the original conduct was careful.",
      "A result can be lucky even when the action's evidence and risk remain unchanged. Conversely, a bad result alone does not establish that an otherwise reasonable decision was negligent.",
    ],
    [
      "Do equal initial actions require equal final judgments?",
      "That is part of the philosophical question, not the game's answer. Different accounts distinguish blame, responsibility, repair, and legal liability in different ways.",
    ],
    "When you evaluate a decision, what belongs to its quality and what belongs to the luck of its outcome?",
  ),
  "epistemic-injustice": g(
    "Epistemic injustice concerns wrongs to people in their role as knowers. Testimonial injustice can involve identity prejudice causing a person to receive less credibility than the evidence warrants.",
    "A status label can affect whose report receives attention. Stipulating equal observations and expertise lets the activity ask whether a changed evaluation rests on relevant information or an unsupported stereotype.",
    "Rate anonymous witnesses, reveal roles, and rate again. The report and competence check stay identical. A difference in ratings is a prompt to inspect reasons, not sufficient evidence that the reader committed testimonial injustice.",
    [
      "An unchanged report with newly visible roles",
      "Both witnesses saw the same valve leak and achieved ten out of ten on the same technical check.",
      "After anonymous ratings, reveal that one is an established manager and the other a new apprentice.",
      "Compare the new ratings with the old ones. Which additional fact about the actual report or relevant expertise justifies any changed credibility?",
    ],
    [
      "Every difference in credibility is an injustice.",
      "Evidence, relevant competence, reliability, and context can justify differences. Fricker's account specifically examines wrongs involving factors such as identity prejudice, not every disagreement about testimony.",
    ],
    [
      "Why make expertise equal by stipulation?",
      "It isolates one possible role-label effect. In real settings, the competence evidence and social context need investigation rather than being assumed equal or irrelevant.",
    ],
    "Whose relevant knowledge might your process miss because a role label speaks louder than their evidence?",
  ),
  "capability-approach": g(
    "The capability approach examines substantive opportunities people can genuinely access. Resources are means, capabilities are feasible options, and functionings concern actual doing or being.",
    "Equal personal resources can coexist with different conversion conditions. Transport, infrastructure, and social arrangements can determine whether a resource holder can actually use an opportunity.",
    "Fund and undo the three access projects while comparing Central and Remote. Personal tokens stay equal; available options change. The board records options without forcing any resident to exercise them or summing their wellbeing.",
    [
      "The same money, different practical options",
      "Central and Remote each start with four personal tokens, but only Central has access to the three stated services.",
      "Use two public tokens for a bus, opening training access in Remote without changing either neighbourhood's personal resource allocation.",
      "Compare available options before and after. The intervention changes a conversion condition rather than proving that residents now achieve identical outcomes.",
    ],
    [
      "Giving everyone equal resources guarantees equal freedom.",
      "Different personal, social, and environmental conditions can change what resources make feasible. Equality of inputs alone does not establish equality of substantive opportunity.",
    ],
    [
      "Why not give the neighbourhoods a happiness score?",
      "The activity distinguishes options from subjective satisfaction and achieved outcomes. Assigning one welfare number would conceal distinctions the capability approach asks readers to examine.",
    ],
    "Which barrier prevents a resource that looks adequate on paper from becoming a real option?",
  ),
  "zenos-paradox": g(
    "Zeno's dichotomy challenges motion by dividing a journey into successively smaller distances. A convergent-series model distinguishes infinitely many conceptual intervals from an infinite total duration.",
    "Distances one-half, one-quarter, one-eighth, and so on have bounded partial sums. If corresponding durations also shrink, their sum is bounded; assigning a full time unit to every subdivision produces a different time model.",
    "Advance finite half-distance steps and compare shrinking time with fixed time. Distance is identical in both modes, while accumulated time differs. The explicit limit is separate from every displayed finite partial sum.",
    [
      "The first three half-distance subdivisions",
      "The first step travels one-half of the track in one-half time unit under shrinking-time mode.",
      "The next steps add one-quarter and one-eighth, leaving total distance and time each at seven-eighths.",
      "Switch to fixed time per step: distance stays seven-eighths after three steps, but accumulated time becomes three. The time assumption changed, not the distance arithmetic.",
    ],
    [
      "Infinitely many positive terms must have an infinite sum.",
      "A positive series can converge when its terms decrease suitably. Counting infinitely many subdivisions is different from establishing the sum of their magnitudes.",
    ],
    [
      "Does the last button press reach the mathematical limit?",
      "No. After sixteen finite steps, a positive remainder still exists. The board states the limit separately instead of falsely calling a rounded display an exact arrival.",
    ],
    "Where are you confusing the number of tasks or subdivisions with the total time they require?",
  ),
};
