import type { Entry, Control } from "./expansion";
import type { Thinker } from "@/types/catalog";

type Spec = {
  id: string;
  name: string;
  thinker?: string;
  categories: string[];
  format?: Entry["format"];
  description: string;
  question: string;
  controls: Control[];
  challenge: string;
  preset: Record<string, number>;
  idea: string;
  mechanism: string;
  example: string;
  limitation: string;
  source: [string, string];
};
const c = (
  key: string,
  label: string,
  min: number,
  max: number,
  value: number,
  suffix = "",
  step = 1,
): Control => ({ key, label, min, max, value, suffix, step });
const source = {
  shannon: [
    "Claude Shannon — A Mathematical Theory of Communication",
    "https://doi.org/10.1002/j.1538-7305.1948.tb00917.x",
  ],
  kahneman: [
    "Tversky and Kahneman — The Framing of Decisions",
    "https://doi.org/10.1126/science.211.4481.453",
  ],
  thaler: [
    "Richard Thaler — Nobel Prize Lecture",
    "https://www.nobelprize.org/uploads/2018/01/thaler-lecture.pdf",
  ],
  sir: [
    "Kermack–McKendrick epidemic model — mathematical review",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC7316089/",
  ],
} as const;
const specs: Spec[] = [
  {
    id: "secretary-problem",
    name: "Secretary Problem",
    thinker: "gardner",
    categories: ["decisions", "probability"],
    format: "game",
    description:
      "Stopping too early and searching forever can both lose the best candidate.",
    question: "How long should you search before committing?",
    controls: [c("skip", "Candidates to observe first", 0, 19, 7)],
    challenge: "Observe the first 12",
    preset: { skip: 12 },
    idea: "A stopping rule trades learning about the field against the risk of letting the best option go.",
    mechanism:
      "Twenty candidate qualities are shuffled without replacement. Observe the first skip candidates, then accept the first later candidate better than all observed; if none appears, accept the last. The plotted exact success rate enumerates each possible location of the best candidate and the best earlier rank.",
    example:
      "Interviewing applicants one by one when rejected applicants cannot be recalled.",
    limitation:
      "The classic rule assumes random order, independent rankings and no recall; real hiring seldom does.",
    source: [
      "Martin Gardner — Mathematical Games: the secretary problem",
      "https://www.scientificamerican.com/article/mathematical-games-1960-02/",
    ],
  },
  {
    id: "multi-armed-bandit",
    name: "Explore or Exploit",
    thinker: "thompson",
    categories: ["decisions", "information"],
    format: "game",
    description:
      "Trying an uncertain option can teach you something, even when another seems better now.",
    question: "Which machine would you play next?",
    controls: [c("explore", "Exploration chance", 0, 100, 20, "%")],
    challenge: "Explore often",
    preset: { explore: 70 },
    idea: "A bandit problem asks how to balance immediate reward and learning from experiments.",
    mechanism:
      "Three seeded machines have fixed hidden win chances. The comparison agent uses epsilon-greedy choice over sample means, beginning with one trial of each. The oracle always chooses the best hidden chance. The plot shows cumulative reward over 60 rounds.",
    example:
      "Trying a new page design while still showing the strongest current design.",
    limitation:
      "Independent stationary rewards and a single epsilon rule omit changing audiences, costs and delayed outcomes.",
    source: [
      "William R. Thompson — On the Likelihood that One Unknown Probability Exceeds Another",
      "https://doi.org/10.1093/biomet/25.3-4.285",
    ],
  },
  {
    id: "coupon-collector",
    name: "Coupon Collector",
    categories: ["probability", "learning"],
    format: "simulation",
    description:
      "The final missing item can take much longer than the first few.",
    question: "How many draws to finish the set?",
    controls: [c("types", "Unique items", 3, 30, 12)],
    challenge: "Try a larger set",
    preset: { types: 25 },
    idea: "Collecting every equally likely type has a long tail because duplicates become common near completion.",
    mechanism:
      "Independent draws are uniform across the selected types. Exact expected draws to collect k types equal N times the sum of 1/(N-i) for i from zero to k-1. A seeded run shows one possible path.",
    example:
      "Planning how many random packs may be needed to complete a collection.",
    limitation:
      "Real items may have different rarity and draws may not be independent.",
    source: [
      "Eric Weisstein — Coupon Collector's Problem",
      "https://mathworld.wolfram.com/CouponCollectorsProblem.html",
    ],
  },
  {
    id: "gamblers-fallacy",
    name: "Gambler’s Fallacy",
    thinker: "tversky",
    categories: ["probability", "behavior"],
    format: "game",
    description:
      "A streak can feel like it makes the opposite result due, even when trials are independent.",
    question: "After a streak, what is the next flip's chance?",
    controls: [c("streak", "Heads in a row", 0, 12, 6)],
    challenge: "Make a long streak",
    preset: { streak: 12 },
    idea: "Independent random events do not remember the sequence before them.",
    mechanism:
      "The fair-coin chance of heads on the next flip remains 50% after any specified streak. The plot contrasts that with the declining chance of having seen the whole streak beforehand, (1/2)^n.",
    example:
      "Avoid treating a losing run in a fair game as evidence that a win is owed.",
    limitation:
      "If the device is biased or conditions change, past results can be informative; independence is an assumption.",
    source: [
      "Tversky and Kahneman — Judgment under Uncertainty",
      "https://doi.org/10.1126/science.185.4157.1124",
    ],
  },
  {
    id: "inspection-paradox",
    name: "Inspection Paradox",
    categories: ["probability", "operations"],
    format: "simulation",
    description:
      "A random arrival is more likely to land in a long gap than a short one.",
    question: "Why does the typical wait feel longer?",
    controls: [c("long", "Share of long intervals", 5, 80, 25, "%")],
    challenge: "Make long gaps common",
    preset: { long: 70 },
    idea: "Sampling a process at a random time weights intervals by their length.",
    mechanism:
      "Short intervals last 2 minutes and long intervals last 10. The mean interval is the frequency-weighted average; a random arrival sees the length-biased average E[L²]/E[L]. Its expected residual wait is E[L²]/(2E[L]) for uniformly sampled time inside intervals.",
    example:
      "A passenger arriving without a timetable experiences a different average bus interval than the average printed gap.",
    limitation:
      "This is an ideal stationary renewal process with two interval lengths; scheduled arrivals change the result.",
    source: [
      "W. Feller — An Introduction to Probability Theory, Vol. II",
      "https://archive.org/details/introductiontopr0002fell",
    ],
  },
  {
    id: "benfords-law",
    name: "Benford’s Law",
    thinker: "benford",
    categories: ["probability", "information"],
    format: "game",
    description:
      "Leading digits in scale-spanning measurements are often far from uniform.",
    question: "Which first digit is most common?",
    controls: [c("digit", "First digit", 1, 9, 1)],
    challenge: "Try digit 9",
    preset: { digit: 9 },
    idea: "In many scale-invariant collections, smaller first digits occupy a larger fraction of logarithmic space.",
    mechanism:
      "The theoretical first-digit probability is log10(1+1/d). The chart shows digits one through nine and highlights the chosen digit.",
    example:
      "Use first-digit patterns as one screening clue when auditing suitable numeric data.",
    limitation:
      "This is not a fraud detector by itself; assigned numbers, narrow ranges and many other data sets do not follow this law.",
    source: [
      "Frank Benford — The Law of Anomalous Numbers",
      "https://doi.org/10.1090/S0002-9904-1938-06720-9",
    ],
  },
  {
    id: "signal-detection",
    name: "Signal Detection",
    categories: ["information", "decisions"],
    format: "game",
    description:
      "A stricter threshold reduces false alarms but can miss real signals.",
    question: "Would you flag this signal?",
    controls: [
      c("threshold", "Decision threshold", 0, 100, 50),
      c("signal", "Signal strength", 10, 90, 65),
    ],
    challenge: "Set a stricter threshold",
    preset: { threshold: 75 },
    idea: "Detection separates the quality of evidence from the cost of acting on it.",
    mechanism:
      "Noise scores are uniform 0–100. Signal scores are uniform between max(0, signal strength − 25) and min(100, signal strength + 25). A score at or above the threshold is flagged. The chart shows exact hit and false-alarm probabilities.",
    example:
      "Moderating content where a strict rule misses some harmful items and a loose rule flags harmless ones.",
    limitation:
      "Uniform toy score distributions and equal cases are pedagogical, not a calibrated real detector.",
    source: [
      "Green and Swets — Signal Detection Theory and Psychophysics",
      "https://books.google.com/books/about/Signal_Detection_Theory_and_Psychophysic.html?id=E-04zQEACAAJ",
    ],
  },
  {
    id: "shannon-entropy",
    name: "Shannon Entropy",
    thinker: "shannon",
    categories: ["information", "probability"],
    format: "game",
    description:
      "A fair binary event carries more uncertainty than one that almost always repeats.",
    question: "Which coin is harder to predict?",
    controls: [c("heads", "Chance of heads", 1, 99, 50, "%")],
    challenge: "Make the coin nearly certain",
    preset: { heads: 95 },
    idea: "Entropy measures average surprise under a specified probability model.",
    mechanism:
      "For a binary event with probability p, H(p)=−p log₂ p−(1−p) log₂(1−p) bits. Entropy peaks at one bit for p=0.5 and approaches zero at the extremes.",
    example:
      "Estimate how much information a yes/no answer may carry when one answer is rare.",
    limitation:
      "Entropy describes uncertainty in a model, not meaning or usefulness of the message.",
    source: [...source.shannon],
  },
  {
    id: "noisy-channel",
    name: "Noisy Channel",
    thinker: "shannon",
    categories: ["information", "complexity"],
    format: "simulation",
    description:
      "Repeating a bit can overcome some errors but uses extra capacity.",
    question: "When does redundancy help?",
    controls: [c("error", "Bit error chance", 0, 45, 15, "%")],
    challenge: "Make the channel noisy",
    preset: { error: 40 },
    idea: "Redundancy can protect a message from independent transmission errors.",
    mechanism:
      "A raw bit is wrong with chance p. Repeating it three times and taking the majority is wrong with chance 3p²−2p³, assuming independent flips. A seeded sample transmits one three-bit word.",
    example:
      "Error-correcting codes help messages survive imperfect storage or communication.",
    limitation:
      "Triple repetition is inefficient and assumes independent bit errors; real codes and channels are more complex.",
    source: [...source.shannon],
  },
  {
    id: "braess-paradox",
    name: "Braess’s Paradox",
    thinker: "braess",
    categories: ["operations", "games"],
    format: "game",
    description:
      "An extra shortcut can make selfish routing slower for everyone.",
    question: "Would you open the shortcut?",
    controls: [c("traffic", "Traffic demand", 2000, 5000, 4000, " cars", 1000)],
    challenge: "Try 3,000 cars",
    preset: { traffic: 3000 },
    idea: "Individual route choices can make a new connection harmful at equilibrium.",
    mechanism:
      "In the classic four-node toy network, two outer links each cost flow/100 minutes, two fixed links each cost 45 minutes, and the shortcut costs zero. Route flows are solved by enumerating symmetric equilibrium choices. The chart compares equilibrium travel time with and without the shortcut over demand.",
    example:
      "Road planners can test whether a new link changes route incentives rather than only adding capacity.",
    limitation:
      "The model assumes identical travelers and deterministic travel-time functions; real road networks require calibration.",
    source: [
      "Dietrich Braess — On a Paradox of Traffic Planning",
      "https://homepage.ruhr-uni-bochum.de/Dietrich.Braess/paradox.pdf",
    ],
  },
  {
    id: "amdahls-law",
    name: "Amdahl’s Law",
    thinker: "amdahl",
    categories: ["operations", "information"],
    format: "simulation",
    description:
      "A part that cannot be sped up limits the gain from adding more workers.",
    question: "How many processors are worth adding?",
    controls: [
      c("parallel", "Parallelizable work", 10, 99, 80, "%"),
      c("workers", "Processors", 1, 32, 8),
    ],
    challenge: "Make almost all work parallel",
    preset: { parallel: 98 },
    idea: "Speeding up one part of a job leaves the untouched part as a bottleneck.",
    mechanism:
      "Speedup with n processors is 1/[(1−p)+p/n], where p is the parallelizable share. The plot shows speedup for 1–32 processors at the selected share.",
    example:
      "Estimate whether parallelizing a slow data task will justify more servers.",
    limitation:
      "Coordination overhead and changing workload are excluded, so real gains can be smaller.",
    source: [
      "Gene Amdahl — Validity of the Single Processor Approach",
      "https://www.cs.cmu.edu/~18742/papers/Amdahl1967.pdf",
    ],
  },
  {
    id: "littles-law",
    name: "Little’s Law",
    thinker: "little",
    categories: ["operations", "markets"],
    format: "calculator",
    description:
      "More items in a stable process usually means a longer time spent inside it.",
    question: "How long does work sit in the system?",
    controls: [
      c("arrivals", "Arrivals per hour", 1, 30, 8),
      c("work", "Items in system", 1, 100, 24),
    ],
    challenge: "Double the backlog",
    preset: { work: 48 },
    idea: "In a stable queue, average inventory equals throughput multiplied by average time in the system.",
    mechanism:
      "W=L/λ, where L is average items in the system and λ is completed items per hour. The chart shows time for a range of average inventories at the chosen throughput.",
    example:
      "Use tickets in progress and tickets completed per day to estimate average response time.",
    limitation:
      "The identity uses long-run averages in a stable system; a growing backlog cannot be summarized by one steady-state W.",
    source: [
      "John Little — A Proof for the Queuing Formula",
      "https://doi.org/10.1287/opre.9.3.383",
    ],
  },
  {
    id: "bullwhip-effect",
    name: "Bullwhip Effect",
    thinker: "forrester",
    categories: ["operations", "markets"],
    format: "game",
    description:
      "Small customer changes can become larger swings in upstream orders.",
    question: "How would you restock after a demand surprise?",
    controls: [
      c("reaction", "Restock reaction", 0, 200, 120, "%"),
      c("shock", "Demand jump", 0, 30, 10),
    ],
    challenge: "React less aggressively",
    preset: { reaction: 40 },
    idea: "Forecasting and inventory adjustments can amplify variation as orders travel through a chain.",
    mechanism:
      "Demand starts at 20, jumps by the chosen amount on day 4, then returns. Each stage orders its current input plus reaction × the change in that input from the previous day, clipped at zero. The plot shows retail demand and a two-stage illustrative order chain.",
    example:
      "A retailer ordering extra after a short sale spike may send a much larger signal to suppliers.",
    limitation:
      "This is a transparent amplification toy, not an inventory-optimized supply chain with lead times or backorders.",
    source: [
      "Jay Forrester — Industrial Dynamics After the First Decade",
      "https://doi.org/10.1287/mnsc.14.7.398",
    ],
  },
  {
    id: "jevons-paradox",
    name: "Jevons Paradox",
    thinker: "jevons",
    categories: ["markets", "ecology"],
    format: "simulation",
    description:
      "A more efficient tool can increase total resource use if demand expands enough.",
    question: "Does efficiency actually save the resource?",
    controls: [
      c("efficiency", "Efficiency improvement", 0, 80, 30, "%"),
      c("rebound", "Demand response", 0, 200, 100, "%"),
    ],
    challenge: "Try a strong rebound",
    preset: { rebound: 180 },
    idea: "Unit savings and behavioral response must be considered together.",
    mechanism:
      "Baseline use is 100. Each task consumes 1−e times as much resource, while task count grows by 1+rebound×e. Total use is 100(1−e)(1+rebound×e); rebound is a chosen response coefficient.",
    example: "Cheaper travel per mile may encourage more miles traveled.",
    limitation:
      "Rebound strength is a scenario assumption, not an estimate of any specific technology or policy.",
    source: [
      "William Stanley Jevons — The Coal Question",
      "https://www.inist.org/Library/1865.Jevons.The_Coal_Question.Macmillan.pdf",
    ],
  },
  {
    id: "pareto-concentration",
    name: "Pareto Concentration",
    thinker: "pareto",
    categories: ["markets", "probability"],
    format: "simulation",
    description:
      "A small fraction can account for a large share when values have a heavy tail.",
    question: "How much does the top fifth hold?",
    controls: [c("shape", "Tail exponent", 12, 40, 20, " / 10")],
    challenge: "Make the tail heavier",
    preset: { shape: 12 },
    idea: "The top-share rule depends on a distribution; it is not always exactly 80/20.",
    mechanism:
      "For a Pareto distribution with exponent α=shape/10>1, the top q share is q^(1−1/α). The plot shows the share owned by the top 1–50%.",
    example:
      "Compare whether a few products account for most sales in an uneven portfolio.",
    limitation:
      "This is one stylized distribution; a measured top share does not prove the underlying mechanism.",
    source: [
      "Vilfredo Pareto — Cours d'économie politique",
      "https://da.dl.itc.u-tokyo.ac.jp/portal/en/assets/1e27c557954e440ccc321167786a2272",
    ],
  },
  {
    id: "zipfs-law",
    name: "Zipf’s Law",
    thinker: "zipf",
    categories: ["information", "probability"],
    format: "simulation",
    description:
      "A ranked item can appear roughly in inverse proportion to its rank.",
    question: "How steep is the rank curve?",
    controls: [c("exponent", "Rank exponent", 0, 20, 10, " / 10")],
    challenge: "Make ranks nearly flat",
    preset: { exponent: 1 },
    idea: "Rank-frequency patterns can be highly uneven without a sharp cutoff.",
    mechanism:
      "Twenty ranks receive weights proportional to 1/r^s, normalized to 100%. The plot displays their relative frequencies as the exponent changes.",
    example:
      "Examine why a few words appear far more often than most others in a text corpus.",
    limitation:
      "The exponent varies by data set and range; a good-looking rank plot alone does not establish a universal law.",
    source: [
      "George Zipf — Human Behavior and the Principle of Least Effort",
      "https://openlibrary.org/books/OL14729942M/Human_behavior_and_the_principle_of_least_effort",
    ],
  },
  {
    id: "sir-epidemic",
    name: "SIR Spread Model",
    thinker: "kermack",
    categories: ["ecology", "complexity"],
    format: "agent-model",
    description:
      "Contact and recovery rates change the shape of an outbreak in a closed population.",
    question: "Can you flatten the illustrative curve?",
    controls: [
      c("contact", "Daily contact rate", 5, 50, 25, "%"),
      c("recovery", "Daily recovery rate", 5, 30, 12, "%"),
    ],
    challenge: "Reduce contact",
    preset: { contact: 10 },
    idea: "Spread and recovery compete as people move between susceptible, infectious and removed groups.",
    mechanism:
      "A closed population starts 99% susceptible and 1% infectious. Each discrete day, new infections are βSI and recoveries are γI, with fractions of the whole population; values are clamped to available compartments. The plot runs 80 days.",
    example:
      "Understand why the same starting cases can produce different trajectories under different contact assumptions.",
    limitation:
      "No age structure, immunity loss, births, geography or behavior changes; this is educational and not a health forecast.",
    source: [...source.sir],
  },
  {
    id: "logistic-growth",
    name: "Logistic Growth",
    thinker: "verhulst",
    categories: ["ecology", "complexity"],
    format: "simulation",
    description: "Growth slows as a population approaches a finite capacity.",
    question: "What happens near the limit?",
    controls: [
      c("growth", "Growth rate", 5, 60, 25, "%"),
      c("capacity", "Carrying capacity", 50, 200, 100),
    ],
    challenge: "Lower the capacity",
    preset: { capacity: 60 },
    idea: "Growth proportional to both current size and remaining room creates an S-shaped path.",
    mechanism:
      "Starting from 5, each period adds rN(1−N/K), with r=growth/100 and K=capacity, for 50 periods.",
    example:
      "Sketch adoption or population growth when space and resources constrain expansion.",
    limitation:
      "Capacity and growth rate are fixed; real ecosystems and markets can shift abruptly.",
    source: [
      "P. F. Verhulst — Notice sur la loi que la population suit dans son accroissement",
      "https://www.scienceopen.com/document?vid=b51b58ae-889e-49ac-bc75-759cffcdc238",
    ],
  },
  {
    id: "predator-prey",
    name: "Predator–Prey Cycles",
    thinker: "volterra",
    categories: ["ecology", "complexity"],
    format: "simulation",
    description: "Two interacting populations can rise and fall out of phase.",
    question: "Can predators and prey coexist?",
    controls: [
      c("predators", "Initial predators", 2, 40, 15),
      c("food", "Prey growth", 5, 50, 25, "%"),
    ],
    challenge: "Start with many predators",
    preset: { predators: 35 },
    idea: "Predators need prey to grow; prey lose population when predators are abundant.",
    mechanism:
      "Discrete Euler steps approximate dX/dt=αX−βXY and dY/dt=δXY−γY. Initial prey is 50, α=food/100, β=.006, δ=.002 and γ=.18. A step of .2 is run for 100 ticks.",
    example:
      "Explore why predator peaks can lag behind prey peaks in a simplified food web.",
    limitation:
      "This minimal two-species model ignores migration, saturation and seasonality; its oscillations are not a forecast.",
    source: [
      "Lotka–Volterra equations and SIR models — review",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC7857083/",
    ],
  },
  {
    id: "allee-effect",
    name: "Allee Effect",
    thinker: "allee",
    categories: ["ecology", "complexity"],
    format: "simulation",
    description:
      "A very small population may struggle to recover even when resources are available.",
    question: "Can a population cross its survival threshold?",
    controls: [
      c("start", "Starting population", 1, 80, 20),
      c("threshold", "Critical population", 5, 50, 30),
    ],
    challenge: "Start above the threshold",
    preset: { start: 60 },
    idea: "In a strong Allee effect, per-capita growth can be negative below a critical population.",
    mechanism:
      "Each period N changes by .18N(1−N/100)(N/A−1), where A is the chosen threshold, with values clipped at zero and 100. The plot runs 60 periods.",
    example:
      "Think about reintroducing a species when too few individuals may fail to find mates or cooperate.",
    limitation:
      "The threshold is hypothetical and the model omits age, habitat and environmental noise.",
    source: [
      "W. C. Allee — Animal Aggregations",
      "https://www.biodiversitylibrary.org/page/6881653",
    ],
  },
  {
    id: "social-tipping",
    name: "Social Tipping Point",
    thinker: "schelling",
    categories: ["social", "complexity"],
    format: "agent-model",
    description:
      "A small change in visible adoption can trigger a larger collective shift.",
    question: "How many people need to go first?",
    controls: [
      c("seed", "Early adopters", 0, 80, 25, "%"),
      c("threshold", "Adoption threshold", 10, 70, 40, "%"),
    ],
    challenge: "Cross the threshold",
    preset: { seed: 60 },
    idea: "Threshold decisions create feedback: adoption changes what the next person sees.",
    mechanism:
      "One hundred agents have fixed personal thresholds spread evenly over threshold ±20 points. At each round, all remaining agents whose threshold is at or below last round's adoption share adopt. The seed share starts adopted. The plot runs 20 simultaneous rounds.",
    example:
      "A new workplace practice can remain rare until enough colleagues use it visibly.",
    limitation:
      "People differ only in one threshold and have identical visibility; real networks are not fully mixed.",
    source: [
      "Thomas Schelling — Micromotives and Macrobehavior",
      "https://wwnorton.com/books/micromotives-and-macrobehavior/",
    ],
  },
  {
    id: "framing-effect",
    name: "Framing Effect",
    thinker: "kahneman",
    categories: ["behavior", "decisions"],
    format: "game",
    description:
      "Equivalent outcomes can feel different when described as gains or losses.",
    question: "Would you choose the safe plan or the gamble?",
    controls: [c("at-risk", "People at risk", 100, 900, 600)],
    challenge: "Compare a larger group",
    preset: { "at-risk": 900 },
    idea: "Changing a description can shift attention without changing the underlying outcomes.",
    mechanism:
      "A safe plan preserves one-third of the chosen group. A gamble preserves everyone with probability one-third and nobody otherwise. The losses frame states the same options as two-thirds lost for sure versus a two-thirds chance all are lost. Expected lives preserved are equal.",
    example:
      "Compare policy options by converting both gain and loss language into the same outcome table.",
    limitation:
      "The game displays a classic equivalence; it does not estimate your framing susceptibility from one answer.",
    source: [...source.kahneman],
  },
  {
    id: "endowment-effect",
    name: "Endowment Effect",
    thinker: "thaler",
    categories: ["behavior", "markets"],
    format: "game",
    description:
      "Owning an item can change the price at which someone is willing to give it up.",
    question: "Would you buy it, keep it, or sell it?",
    controls: [
      c("value", "Personal value", 10, 100, 50),
      c("price", "Market price", 10, 100, 60),
    ],
    challenge: "Raise the market price",
    preset: { price: 90 },
    idea: "A reference point can make giving up an owned item feel unlike buying the same item.",
    mechanism:
      "A neutral benchmark buys if value exceeds price and sells if price exceeds value. The play panel asks for both choices without claiming a fixed human bias; the chart shows net value = personal value−price across prices.",
    example:
      "Compare a seller's asking price with what they would pay to acquire the same object.",
    limitation:
      "Ownership effects vary by context; the simple value/price calculation is a benchmark, not a psychological prediction.",
    source: [...source.thaler],
  },
  {
    id: "decoy-effect",
    name: "Decoy Effect",
    thinker: "huber",
    categories: ["behavior", "markets"],
    format: "game",
    description:
      "An inferior third option can change how two original options are compared.",
    question: "Does a decoy change your choice?",
    controls: [c("decoy", "Decoy closeness", 0, 100, 60, "%")],
    challenge: "Remove the decoy",
    preset: { decoy: 0 },
    idea: "A dominated option may make its nearby competitor easier to justify.",
    mechanism:
      "Compare A (quality 70, price 40) with B (quality 90, price 70). A decoy has quality 70+20×closeness and price 70, so B dominates it when present. The interactive game records your choice with and without the decoy; no population share is inferred.",
    example:
      "Notice when a pricing tier seems to exist mainly to make another tier look attractive.",
    limitation:
      "Choice shifts are context dependent; this page is a choice exercise, not a fitted behavioral model.",
    source: [
      "Huber, Payne and Puto — Adding Asymmetrically Dominated Alternatives",
      "https://doi.org/10.1086/208899",
    ],
  },
  {
    id: "peak-end-rule",
    name: "Peak–End Rule",
    thinker: "kahneman",
    categories: ["behavior", "learning"],
    format: "game",
    description:
      "A remembered experience may emphasize its strongest moment and its ending.",
    question: "Which experience would you repeat?",
    controls: [c("ending", "Final moment score", 0, 10, 8)],
    challenge: "Give it a poor ending",
    preset: { ending: 1 },
    idea: "A simple peak–end summary can differ from the average of every moment.",
    mechanism:
      "Experience A has scores [6,6,6,6,ending]; B has [4,7,7,7,6]. The plot compares cumulative average and a peak–end score equal to the mean of maximum and final score.",
    example:
      "When evaluating an event, compare the full record with the moments that stand out in memory.",
    limitation:
      "Human memory is not literally a two-number formula, and negative experiences can behave differently.",
    source: [
      "Fredrickson and Kahneman — Duration Neglect in Retrospective Evaluations",
      "https://pubmed.ncbi.nlm.nih.gov/8355141/",
    ],
  },
  {
    id: "planning-fallacy",
    name: "Planning Fallacy",
    thinker: "kahneman",
    categories: ["behavior", "operations"],
    format: "game",
    description:
      "A project can take longer than the inside-view estimate suggests.",
    question: "How much time would you budget?",
    controls: [
      c("estimate", "Your best-case estimate", 1, 20, 8, " days"),
      c("buffer", "Contingency buffer", 0, 100, 25, "%"),
    ],
    challenge: "Add a larger buffer",
    preset: { buffer: 80 },
    idea: "Forecasting only the imagined plan can miss variation from similar past projects.",
    mechanism:
      "A seeded teaching sample adds delay of 0–12 days to the best-case estimate across 100 hypothetical projects. The buffer adds estimate×buffer/100; the plot compares budgeted time and the sampled completion distribution.",
    example:
      "Use outcomes of previous similar tasks to set a schedule, then compare your planned buffer.",
    limitation:
      "Uniform delay is illustrative, not a calibrated reference class for your project.",
    source: [
      "Buehler, Griffin and Ross — Exploring the Planning Fallacy",
      "https://doi.org/10.1037/0022-3514.67.3.366",
    ],
  },
  {
    id: "bass-diffusion",
    name: "Diffusion of Innovations",
    thinker: "bass",
    categories: ["social", "markets"],
    format: "simulation",
    description:
      "Early adopters and imitation can create an S-shaped adoption curve.",
    question: "What makes adoption take off?",
    controls: [
      c("innovation", "Independent adoption", 1, 12, 3, "%"),
      c("imitation", "Social imitation", 5, 70, 35, "%"),
    ],
    challenge: "Increase imitation",
    preset: { imitation: 65 },
    idea: "Adoption can come from independent discovery and from seeing others adopt.",
    mechanism:
      "The Bass toy update is ΔF=(p+qF)(1−F), where F is cumulative share, p=innovation/100 and q=imitation/100. Starting at zero, the chart runs 30 periods.",
    example:
      "Explore how word of mouth changes the shape of a new product's rollout.",
    limitation:
      "A fixed total market and constant coefficients are strong assumptions; the curve alone is not a sales forecast.",
    source: [
      "Frank Bass — A New Product Growth Model for Consumer Durables",
      "https://doi.org/10.1287/mnsc.15.5.215",
    ],
  },
  {
    id: "median-voter",
    name: "Median Voter Game",
    thinker: "downs",
    categories: ["social", "games"],
    format: "game",
    description:
      "Moving toward the middle can win more nearby voters in a simple one-dimensional election.",
    question: "Where would you place your platform?",
    controls: [
      c("you", "Your platform", 0, 100, 35),
      c("rival", "Other platform", 0, 100, 70),
    ],
    challenge: "Move toward the center",
    preset: { you: 50 },
    idea: "When voters choose the nearer of two positions, location determines vote share.",
    mechanism:
      "One hundred and one voters sit at integer positions 0–100 and choose the nearest of two platforms; exact ties split equally. The plot shows your vote share for every possible platform holding the rival fixed.",
    example:
      "See why two competitors may cluster near the middle of a one-issue spectrum.",
    limitation:
      "Actual voting has many dimensions, turnout differences, identity and more than two candidates.",
    source: [
      "Anthony Downs — An Economic Theory of Democracy",
      "https://openlibrary.org/books/OL18519148M/An_economic_theory_of_democracy",
    ],
  },
  {
    id: "el-farol-bar",
    name: "El Farol Bar Game",
    thinker: "arthur",
    categories: ["social", "games"],
    format: "game",
    description:
      "If everyone expects a quiet venue, the venue may become crowded.",
    question: "Would you go tonight?",
    controls: [
      c("expect", "Expected attendance", 0, 100, 55, "%"),
      c("capacity", "Comfort limit", 20, 90, 60, "%"),
    ],
    challenge: "Expect a busy night",
    preset: { expect: 85 },
    idea: "The payoff to attending depends on how many other people independently make the same forecast.",
    mechanism:
      "Ninety-nine other agents independently go with probability 1−expected-attendance/100, a transparent toy response to the public expectation. A seeded round samples turnout; your attendance adds one. Going pays +1 if total attendance is at or below capacity, −1 otherwise; staying yields zero.",
    example:
      "Decide whether to visit a popular place when everyone has the same crowd forecast.",
    limitation:
      "Other agents use a fixed response rule, not Arthur's adaptive heterogeneous forecasting strategies.",
    source: [
      "W. Brian Arthur — Inductive Reasoning and Bounded Rationality",
      "https://sites.santafe.edu/~wbarthur/Papers/El_Farol.pdf",
    ],
  },
  {
    id: "tullock-contest",
    name: "Tullock Contest",
    thinker: "tullock",
    categories: ["games", "markets"],
    format: "game",
    description:
      "Spending more effort raises your chance of winning but everyone pays their effort cost.",
    question: "How much would you spend to win the prize?",
    controls: [
      c("effort", "Your effort", 0, 100, 30),
      c("rival", "Rival effort", 1, 100, 40),
    ],
    challenge: "Try a much larger effort",
    preset: { effort: 80 },
    idea: "A probabilistic contest rewards relative effort while making every contestant bear their own cost.",
    mechanism:
      "The prize is worth 100. Your win chance is your effort divided by the sum of both efforts. Your expected net payoff is 100×win chance−your effort; a seeded play samples one winner and subtracts your effort whether you win or lose.",
    example:
      "Two teams spending resources on a single prize may dissipate much of its value in competition.",
    limitation:
      "The rival effort is fixed and known; real contests have uncertain strategies and varied effort effectiveness.",
    source: [
      "Gordon Tullock — Efficient Rent Seeking",
      "https://mason.gmu.edu/~gtulloc1/Books.htm",
    ],
  },
];

export const atlasEntries: Entry[] = specs.map((e) => ({
  id: e.id,
  name: e.name,
  thinker: e.thinker,
  categories: e.categories,
  format: e.format,
  description: e.description,
  title: e.question,
  question: e.description,
  controls: e.controls,
  challenge: e.challenge,
  preset: e.preset,
  idea: e.idea,
  mechanism: e.mechanism,
  example: e.example,
  limitation: e.limitation,
  source: { title: e.source[0], url: e.source[1] },
}));
export const atlasIds = new Set(atlasEntries.map((e) => e.id));
export const atlasThinkers: Thinker[] = [
  [
    "gardner",
    "Martin Gardner",
    "Mathematics writer who introduced the game of googol to a broad audience.",
    ["decisions", "probability"],
  ],
  [
    "thompson",
    "William R. Thompson",
    "Statistician whose probability-matching work influenced bandit algorithms.",
    ["decisions", "information"],
  ],
  [
    "benford",
    "Frank Benford",
    "Physicist associated with the leading-digit law in scale-spanning data.",
    ["probability", "information"],
  ],
  [
    "shannon",
    "Claude Shannon",
    "Mathematician who founded modern information theory and quantified message uncertainty.",
    ["information", "probability"],
  ],
  [
    "braess",
    "Dietrich Braess",
    "Mathematician known for a traffic-network paradox about added routes.",
    ["operations", "games"],
  ],
  [
    "amdahl",
    "Gene Amdahl",
    "Computer architect known for the limits of parallel speedup.",
    ["operations", "information"],
  ],
  [
    "little",
    "John D. C. Little",
    "Operations researcher who proved the queueing relation L=λW.",
    ["operations", "markets"],
  ],
  [
    "forrester",
    "Jay Forrester",
    "Systems scientist who studied industrial feedback and supply-chain dynamics.",
    ["operations", "complexity"],
  ],
  [
    "jevons",
    "William Stanley Jevons",
    "Economist whose study of coal examined how efficiency can expand use.",
    ["markets", "ecology"],
  ],
  [
    "pareto",
    "Vilfredo Pareto",
    "Economist associated with mathematical studies of uneven distributions.",
    ["markets", "probability"],
  ],
  [
    "zipf",
    "George Zipf",
    "Linguist known for rank-frequency regularities in language.",
    ["information", "probability"],
  ],
  [
    "kermack",
    "William Kermack",
    "Mathematician who co-developed influential epidemic models with Anderson McKendrick.",
    ["ecology", "complexity"],
  ],
  [
    "verhulst",
    "Pierre François Verhulst",
    "Mathematician associated with logistic population growth.",
    ["ecology", "complexity"],
  ],
  [
    "volterra",
    "Vito Volterra",
    "Mathematician who modeled interacting predator and prey populations.",
    ["ecology", "complexity"],
  ],
  [
    "allee",
    "Warder Clyde Allee",
    "Ecologist who studied how cooperation and density can affect population growth.",
    ["ecology", "complexity"],
  ],
  [
    "huber",
    "Joel Huber",
    "Consumer researcher who coauthored early work on asymmetric dominance in choice.",
    ["behavior", "markets"],
  ],
  [
    "bass",
    "Frank Bass",
    "Marketing scientist known for a quantitative model of product adoption.",
    ["social", "markets"],
  ],
  [
    "downs",
    "Anthony Downs",
    "Economist whose models examined political competition and voter location.",
    ["social", "games"],
  ],
  [
    "arthur",
    "W. Brian Arthur",
    "Complexity economist known for the El Farol bar problem.",
    ["social", "games"],
  ],
  [
    "tullock",
    "Gordon Tullock",
    "Economist whose contest models examined costly competition for fixed prizes.",
    ["games", "markets"],
  ],
].map(([id, name, description, areaIds]) => ({
  id: id as string,
  slug: (name as string)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, ""),
  name: name as string,
  description: description as string,
  areaIds: areaIds as string[],
}));
