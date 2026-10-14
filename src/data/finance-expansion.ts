import type { Entry } from "./expansion";
import type { Thinker } from "@/types/catalog";

const sources = {
  naval: {
    title: "Naval Ravikant — How to Get Rich",
    url: "https://nav.al/rich",
  },
  specific: {
    title: "Naval Ravikant — Specific Knowledge",
    url: "https://nav.al/specific-knowledge",
  },
  sharpe: {
    title: "William Sharpe — The Arithmetic of Active Management",
    url: "https://web.stanford.edu/~wfsharpe/art/active/active.htm",
  },
  retirement: {
    title: "William Sharpe — Retirement Income Analysis",
    url: "https://web.stanford.edu/~wfsharpe/RISMAT/RIAbook.pdf",
  },
  fisher: {
    title: "Irving Fisher — The Theory of Interest",
    url: "https://www.econlib.org/library/YPDBooks/Fisher/fshToI.html",
  },
  duration: {
    title: "Duke University — Duration measures",
    url: "https://people.duke.edu/~charvey/classes/ba350/bondval/duration.htm",
  },
  margin: {
    title: "SEC — Understanding margin accounts",
    url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-29",
  },
  allocation: {
    title: "SEC — Asset allocation and diversification",
    url: "https://www.investor.gov/introduction-investing/getting-started/asset-allocation",
  },
  dca: {
    title: "SEC — Dollar cost averaging",
    url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging",
  },
  minsky: {
    title: "Hyman Minsky — The Financial Instability Hypothesis",
    url: "https://www.levyinstitute.org/publications/the-financial-instability-hypothesis/",
  },
  disposition: {
    title: "Shefrin and Statman — Selling winners and riding losers",
    url: "https://doi.org/10.1111/j.1540-6261.1985.tb05002.x",
  },
  house: {
    title: "Thaler and Johnson — Gambling with the house money",
    url: "https://doi.org/10.1287/mnsc.36.6.643",
  },
  competence: {
    title: "Warren Buffett — 1996 shareholder letter",
    url: "https://www.berkshirehathaway.com/1996ar/1996.html",
  },
  valuation: {
    title:
      "Harry Markowitz — Foundations of Portfolio Theory; discussion of John Burr Williams",
    url: "https://www.nobelprize.org/uploads/2018/06/markowitz-lecture.pdf",
  },
  volatility: {
    title: "Paul Samuelson — Geometric mean and investment sequences",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC389451/",
  },
};
type Lesson = Omit<Entry, "controls" | "preset" | "challenge">;
const lessons: Lesson[] = [
  {
    id: "volatility-drag",
    name: "Volatility Drag",
    categories: ["finance", "probability"],
    format: "simulation",
    description:
      "Arrange return tiles and discover why an average gain can hide a loss.",
    title: "An average is not a bank balance.",
    question:
      "Build a four-period return path. Compare your actual compounded balance with a constant arithmetic-average return.",
    idea: "Volatility drag is the gap between an arithmetic average of returns and compound growth. Multiplying unequal return factors can produce less growth than repeatedly applying their average.",
    mechanism:
      "Start with 100 tokens. Four return tiles multiply wealth by 1+r. The comparison compounds the arithmetic mean of the selected returns for four periods. No deposits, withdrawals, fees, or taxes occur. Tiles can be reordered without changing the endpoint, although the path changes.",
    example:
      "A +50% gain followed by −50% leaves 75 from an initial 100 despite a zero arithmetic mean.",
    limitation:
      "The return tiles are invented. This arithmetic illustration does not imply that minimum volatility is always the best portfolio or resolve Samuelson's critique of universally maximising geometric growth.",
    thinker: "samuelson",
    source: sources.volatility,
    related: ["compound-growth", "ruin"],
  },
  {
    id: "sequence-of-returns",
    name: "Sequence of Returns Risk",
    categories: ["finance", "risk"],
    format: "game",
    description: "Move the crash year and try to fund the same withdrawals.",
    title: "The same returns can fund different retirements.",
    question:
      "Reorder five return cards and set an end-of-period withdrawal. Which sequence preserves the most tokens?",
    idea: "Sequence risk is the sensitivity of a portfolio with external cash flows to the order of returns. Withdrawals after early losses can leave less capital participating in later recoveries.",
    mechanism:
      "Start at 100. Five fixed returns are −30%, −10%, +10%, +20%, +30%. After each return, withdraw the selected 0–20 tokens. Wealth cannot fall below zero; any unpaid withdrawal accumulates as a shortfall. A reversed path supplies the comparison.",
    example:
      "Two hypothetical retirees with the same return factors can end with different balances when they both make withdrawals.",
    limitation:
      "Five invented periods and fixed nominal withdrawals do not estimate retirement success. Inflation, longevity, taxes, and other income are omitted.",
    thinker: "sharpe",
    source: sources.retirement,
    related: ["compound-growth", "volatility-drag"],
  },
  {
    id: "fee-drag",
    name: "Investment Fee Drag",
    categories: ["finance", "markets"],
    format: "simulation",
    description:
      "Run two identical portfolios and watch small charges widen their gap.",
    title: "Costs take away capital that could keep compounding.",
    question:
      "Choose a return, annual fee, and horizon. Follow the fee-paying portfolio against an identical no-fee benchmark.",
    idea: "Investment fee drag includes fees paid and the future growth those removed amounts no longer earn. Small recurring percentage costs can accumulate over a long horizon.",
    mechanism:
      "Start at 1,000 tokens. Each year first applies the stated gross return, then deducts the fee as a percentage of that year's resulting balance. A no-fee portfolio uses the same return. The dashboard separates fees paid from the total final-balance gap.",
    example:
      "Compare a 1% fee with a 0.2% fee while keeping return and time identical; inspect both direct charges and foregone growth.",
    limitation:
      "Constant returns and annual deductions simplify real products. No service quality, taxes, transaction costs, or market outperformance are inferred; a fee is not itself evidence of a poor service.",
    thinker: "sharpe",
    source: sources.sharpe,
    related: ["compound-growth", "opportunity-cost"],
  },
  {
    id: "real-return",
    name: "Real Return and Inflation",
    categories: ["finance", "markets"],
    format: "simulation",
    description:
      "Grow your token balance, then price the shopping basket it can buy.",
    title: "More money can still buy less.",
    question:
      "Set nominal growth and inflation. Compare your account with the changing price of one original shopping basket.",
    idea: "Real return measures the change in purchasing power after inflation. The exact one-period relationship is (1+nominal return)/(1+inflation)−1.",
    mechanism:
      "A 100-token balance and a 10-token basket evolve for ten years at constant chosen rates. Nominal wealth, basket price, and baskets affordable are computed separately. The exact real rate is compared with the subtraction approximation.",
    example:
      "At 5% nominal growth and 8% inflation, the balance rises while its purchasing power falls.",
    limitation:
      "The basket and constant rates are synthetic. Actual personal inflation can differ from an index; taxes, changing consumption, and investment risk are omitted.",
    thinker: "fisher",
    source: sources.fisher,
    related: ["compound-growth", "fee-drag"],
  },
  {
    id: "bond-duration",
    name: "Bond Duration",
    categories: ["finance", "markets"],
    format: "simulation",
    description:
      "Shock a bond's yield and compare the exact price with a duration estimate.",
    title: "Distant cash flows move more when discount rates change.",
    question:
      "Choose a coupon and maturity, then move the yield shock. Compare the exact price change with a first-order approximation.",
    idea: "Macaulay duration is the present-value-weighted time of a bond's cash flows. Modified duration approximates its proportional price response to a small change in yield.",
    mechanism:
      "A 100-face-value annual-coupon bond is priced at a base yield of 5%. Reprice at 5% plus the selected shock. Duration uses discounted annual payments including principal; modified duration divides by 1.05. The estimate is base price × (1−modified duration × yield change).",
    example:
      "Compare two- and ten-year bonds with the same coupon under a one-percentage-point yield increase.",
    limitation:
      "This fixed-cash-flow, annual-compounding model omits credit losses, embedded options, and nonparallel yield-curve changes. Duration is a local approximation, not an exact rule for large shocks.",
    thinker: "macaulay",
    source: sources.duration,
    related: ["discounted-cash-flow", "real-return"],
  },
  {
    id: "discounted-cash-flow",
    name: "Discounted Cash Flow",
    categories: ["finance", "decisions"],
    format: "game",
    description:
      "Bid for a five-year cash-flow stream, then stress your assumptions.",
    title: "A precise value can depend on an uncertain story.",
    question:
      "Choose growth and discount rates, then bid for five annual payments. Does the price fit your assumptions?",
    idea: "Discounted cash flow converts specified future cash payments into a present value using a discount rate. A valuation is conditional on the cash-flow and discount assumptions.",
    mechanism:
      "The first year pays 20 tokens; subsequent payments grow at the selected rate for five years. Present value sums cash_t/(1+discount)^t. There is no terminal value. A bid from 20 to 160 is compared with that five-payment value; the stress button lowers growth and raises the discount rate.",
    example:
      "A bid below an optimistic calculation can become above value when the underlying assumptions change.",
    limitation:
      "Payments are hypothetical and not guaranteed. This finite project has no residual sale value, taxes, or financing structure. The displayed number is not a stock target or a claim that Williams invented discounting.",
    thinker: "williams",
    source: sources.valuation,
    related: ["opportunity-cost", "value-of-information"],
  },
  {
    id: "margin-calls",
    name: "Margin Calls",
    categories: ["finance", "risk"],
    format: "game",
    description:
      "Borrow to buy, survive a price shock, and decide how to repair the account.",
    title: "Your debt stays while the asset price moves.",
    question:
      "Choose initial leverage, reveal market rounds, and meet any maintenance breach by depositing tokens or selling assets.",
    idea: "A margin call occurs when account equity is insufficient for a required maintenance level. Borrowing magnifies the effect of asset-price changes on equity and may force liquidation.",
    mechanism:
      "Start with equity 100, gross assets equal to 100×leverage, and debt equal to assets−100. Four disclosed teaching shocks apply to assets. Maintenance requires equity/assets≥30%. Deposit adds outside cash to assets; the alternative sells assets and repays debt to reach the threshold when equity is positive. Outside deposits are tracked separately from profit.",
    example:
      "With 3× leverage, a 20% asset loss changes equity from 100 to 40, a 60% equity loss before interest.",
    limitation:
      "The 30% threshold is a stipulated teaching rule, not a broker's promise. Real brokers may liquidate without advance notice, change requirements, and charge interest. Debt can exceed assets; loss can exceed initial equity.",
    source: sources.margin,
    related: ["ruin", "minsky-financing"],
  },
  {
    id: "portfolio-rebalancing",
    name: "Portfolio Rebalancing",
    categories: ["finance", "decisions"],
    format: "game",
    description:
      "Keep a target mix through market rounds, or let the winner take over.",
    title: "A target allocation does not maintain itself.",
    question:
      "Manage two assets through six rounds. Rebalance to 50/50 when you choose, and compare with untouched buy-and-hold.",
    idea: "Rebalancing restores a portfolio's target weights after unequal returns change its allocation. It manages exposure; it does not guarantee higher returns.",
    mechanism:
      "Start with 500 tokens in each asset. Each round applies a fixed return to both managed and untouched holdings. Rebalance subtracts a fee based on the absolute pre-fee one-way transfer and splits the remaining managed wealth equally. Costs are cumulative; the benchmark never trades.",
    example:
      "A strong gain in one asset can shift a balanced allocation toward that asset without an explicit decision to take more exposure.",
    limitation:
      "The fictional assets and six rounds do not represent a stock/bond forecast. The fee convention is simplified; taxes, bid-ask spreads, contributions, and optimal timing are omitted.",
    thinker: "markowitz",
    source: sources.allocation,
    related: ["diversification", "fee-drag"],
  },
  {
    id: "dollar-cost-averaging",
    name: "Dollar-Cost Averaging",
    categories: ["finance", "markets"],
    format: "simulation",
    description:
      "Buy equal token amounts through a rise, fall, or recovery and compare timing.",
    title: "A regular contribution buys different numbers of shares.",
    question:
      "Choose an invented price path. Advance purchases from a 600-token cash pot and compare six equal instalments with investing it all at the start.",
    idea: "Dollar-cost averaging invests a fixed monetary amount at regular intervals, purchasing more units at lower prices and fewer at higher prices.",
    mechanism:
      "Six periods each invest 100 tokens. Fractional units are allowed. The lump-sum comparison invests 600 at the first price. Both are valued at each displayed price, including uninvested staged cash, which earns zero. Rising, falling, and recovery paths are selectable.",
    example:
      "The staged strategy can buy more shares during a fall, yet delayed exposure can trail lump-sum investing during a rise.",
    limitation:
      "These paths are invented and selected after the fact. Staging an existing cash pot differs from investing income as it arrives. No dominance claim, costs, taxes, or cash interest are assumed.",
    source: sources.dca,
    related: ["compound-growth", "random-walk"],
  },
  {
    id: "disposition-effect",
    name: "Disposition Effect",
    categories: ["finance", "behavior"],
    format: "game",
    description:
      "Choose what to sell, then change only the purchase-price labels.",
    title: "The entry price is not the future payoff.",
    question:
      "Sell one of two equal-current-value assets. Compare choices across four cards with different cost bases and explicit hypothetical future values.",
    idea: "The disposition effect is a tendency to realise gains more readily than losses. A purchase-price reference can influence selling even when it does not change the forward-looking opportunity.",
    mechanism:
      "Each asset currently sells for 100. One has stipulated next-period value 120 and the other 80; which one is better alternates. Purchase bases change between paired cards while forward payoffs remain identical. Selling yields 100 plus the kept asset's next value. Choices and purchase gain/loss labels are recorded, not diagnosed.",
    example:
      "Selling an asset simply because it shows a gain can discard the better forward-looking option in this deliberately transparent task.",
    limitation:
      "The future values are supplied for learning, not forecasts. Taxes, liquidity needs, risk, and diversification can rationally affect a real sale; a few choices do not establish a psychological trait.",
    thinker: "shefrin",
    coThinkers: ["statman"],
    source: sources.disposition,
    related: ["mental-accounting", "sunk-cost-fallacy"],
  },
  {
    id: "house-money-effect",
    name: "House Money Effect",
    categories: ["finance", "behavior", "probability"],
    format: "game",
    description:
      "Make the same risky choice with a different story about where the money came from.",
    title: "A windfall still belongs to you.",
    question:
      "Choose a sure 110 or a 50/50 chance of 90 or 130 from the same current wealth of 100. Compare two origin frames.",
    idea: "The house money effect describes increased willingness to take risk following a prior gain. Treating recent winnings as separate from other wealth can change a decision without changing its payoff distribution.",
    mechanism:
      "Both frames start the current decision at 100: saved tokens versus 80 plus a 20-token gain. The choice is sure 110 or a fair draw between 90 and 130; both have expected value 110. Record both choices before revealing a shared seeded draw for the risky option.",
    example:
      "The same possible loss may feel different when it is described as giving back a windfall rather than spending savings.",
    limitation:
      "This unblinded, fixed-order comparison is not a controlled psychological study. Neither choice is universally correct; preferences for risk can differ. No actual money is used.",
    thinker: "thaler",
    coThinkers: ["johnson"],
    source: sources.house,
    related: ["mental-accounting", "framing-effect"],
  },
  {
    id: "minsky-financing",
    name: "Minsky's Financing Regimes",
    categories: ["finance", "complexity"],
    format: "game",
    description:
      "Run a treasury desk and discover what needs refinancing when rates change.",
    title: "A business can look solvent while depending on another loan.",
    question:
      "Manage operating income, debt service, and a reserve. Add a debt-funded project or settle a quarter; a disclosed stress arrives after three quarters.",
    idea: "Minsky distinguishes hedge finance, where income covers interest and scheduled principal; speculative finance, where it covers interest but requires refinancing principal; and Ponzi finance, where income does not cover interest.",
    mechanism:
      "Begin with debt 200, reserve 40, income 30, and quarterly interest 5%. Scheduled principal is up to 20. A project adds 100 debt and 5 income, with the loan spent on the project. Each settlement uses reserve plus income to pay interest and principal, borrows any shortfall, and reduces debt by principal paid. After quarter three, the interest rate becomes 12% and income falls by 15. Regime labels use operating income, not the reserve.",
    example:
      "A reserve can temporarily pay a bill even when ongoing income cannot support the financing arrangement.",
    limitation:
      "This small cash-flow game is not a macroeconomic model or crisis forecast. Refinancing is always available here so fragility can be inspected; real credit can close abruptly.",
    thinker: "minsky",
    source: sources.minsky,
    related: ["stocks-and-flows", "margin-calls"],
  },
  {
    id: "permissionless-leverage",
    name: "Permissionless Leverage",
    categories: ["finance", "markets", "decisions"],
    format: "game",
    description:
      "Split a twelve-hour studio week between service work and a reusable product.",
    title: "Build once does not mean earn automatically.",
    question:
      "Allocate twelve hours to billable service or product building. Launch at small and large audiences and inspect costs, quality, and repeat delivery.",
    idea: "Naval Ravikant discusses code and media as forms of leverage that can scale without hiring a worker for every additional customer. Reusable output separates production effort from repeated distribution.",
    mechanism:
      "Service pays 10 tokens per hour. A reusable product costs 10 tokens per build hour; quality rises linearly to full quality at eight hours. Product revenue is users×quality×2 and delivery costs users×0.1. Compare combined first-launch net income with an all-service week; repeat launches reuse the product and omit the already-paid build cost.",
    example:
      "A template or software tool can be distributed repeatedly, while a new bespoke service usually needs more delivery time.",
    limitation:
      "This equation is authored for teaching, not Naval's formula or an income prediction. Audiences are supplied, not earned; demand, competition, maintenance, access, and failure still matter. This is not borrowed-money leverage.",
    thinker: "naval",
    source: sources.naval,
    related: ["network", "opportunity-cost"],
  },
  {
    id: "specific-knowledge",
    name: "Specific Knowledge",
    categories: ["finance", "decisions", "learning"],
    format: "game",
    description:
      "Combine three skill cards, then test your mix against a customer brief.",
    title: "A useful skill combination needs a real problem.",
    question:
      "Select three skills for a concrete brief. Test the combination, switch briefs, and see which knowledge transfers and which needs work.",
    idea: "Naval's specific knowledge describes distinctive capabilities developed through curiosity, practice, and experience, rather than interchangeable training alone.",
    mechanism:
      "Choose three of six cards: coding, design, logistics, teaching, writing, and data analysis. Three customer briefs each disclose a required combination. Each matching skill earns ten illustrative fit points and all three add a twenty-point complementarity bonus. Switching the brief preserves your selection for comparison.",
    example:
      "Coding and logistics experience may combine usefully for a delivery tool, while teaching and writing can better fit an educational project.",
    limitation:
      "The disclosed checklist and points are invented. They do not measure a person's value, guarantee income, or capture Naval's full idea. These skills are learnable; the concept does not require an innate talent claim.",
    thinker: "naval",
    source: sources.specific,
    related: ["multi-armed-bandit", "testing-effect"],
  },
  {
    id: "circle-of-competence",
    name: "Circle of Competence",
    categories: ["finance", "decisions", "risk"],
    format: "game",
    description:
      "Buy or pass six fictional deals using the uncertainty range you actually have.",
    title: "Passing is a decision, too.",
    question:
      "Review six offers. Familiar deals have a narrower value range; unfamiliar ones have a wider range. Buy one unit or pass, then inspect the realised value.",
    idea: "A circle of competence is the set of situations whose economics and uncertainties a decision maker understands well enough to evaluate. Knowing the boundary matters more than confidently claiming universal expertise.",
    mechanism:
      "Six seeded deals alternate stated value ranges of 80–120 and 30–170 tokens. Values are sampled uniformly within the range; asks range from 70 to 130. One unit can be bought or passed per card. Realised net gain accumulates and each decision remains visible in a ledger.",
    example:
      "A narrower range can support a robust price comparison, but even an unfamiliar offer may be attractive under a sufficiently low price and explicitly stated assumptions.",
    limitation:
      "The game supplies reliable ranges and probabilities that real investors seldom know. Passing does not guarantee a better realised result, and familiar is not the same as safe. It does not evaluate a real person's competence.",
    thinker: "buffett",
    source: sources.competence,
    related: ["value-of-information", "zero-risk-bias"],
  },
];
export const financeEntries: Entry[] = lessons.map((e) => ({
  ...e,
  controls: [],
  preset: {},
  challenge: "",
  attributionStatus: "provisional",
  relationship: "ASSOCIATED_WITH",
}));
const people = [
  [
    "naval",
    "Naval Ravikant",
    "Entrepreneur and investor whose essays discuss wealth creation, specific knowledge, judgment, and code and media leverage.",
  ],
  [
    "buffett",
    "Warren Buffett",
    "Investor and shareholder-letter author associated with business valuation and knowing the boundaries of one's circle of competence.",
  ],
  [
    "sharpe",
    "William Sharpe",
    "Economist whose work examines portfolio theory, investment costs, and retirement income analysis.",
  ],
  [
    "fisher",
    "Irving Fisher",
    "Economist and author of The Theory of Interest, whose work distinguishes monetary returns from purchasing power.",
  ],
  [
    "macaulay",
    "Frederick Macaulay",
    "Economist whose 1938 work introduced the present-value-weighted duration of bond payments.",
  ],
  [
    "williams",
    "John Burr Williams",
    "Author of The Theory of Investment Value, known for analysing securities through discounted future payments.",
  ],
  [
    "minsky",
    "Hyman Minsky",
    "Economist whose financial instability hypothesis examines debt, cash flows, and the fragility of financing arrangements.",
  ],
  [
    "shefrin",
    "Hersh Shefrin",
    "Economist and coauthor of research on the disposition effect and behavioural finance.",
  ],
  [
    "statman",
    "Meir Statman",
    "Finance researcher and author whose work studies investor behaviour and the disposition effect.",
  ],
  [
    "samuelson",
    "Paul Samuelson",
    "Economist whose work on financial risk cautions against treating long-run geometric growth as a universally optimal objective.",
  ],
];
export const financeThinkers: Thinker[] = people.map(
  ([id, name, description]) => ({
    id,
    name,
    description,
    areaIds: ["finance", "decisions"],
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }),
);
