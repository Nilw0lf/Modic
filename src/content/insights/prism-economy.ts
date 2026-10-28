import type { Insight } from "./types";
import { prismSources as s } from "@/data/prism-sources";
export const prismEconomy: Insight[] = [
  {
    slug: "tax-incidence-monopsony-who-really-pays",
    title:
      "Tax incidence and monopsony: who really pays when market rules change?",
    description:
      "Trace a tax wedge and a single buyer’s hiring decision with worked numbers, clear market assumptions and practical questions about bargaining alternatives.",
    topic: "Markets & incentives",
    published: "2026-10-28",
    takeaway:
      "Legal payment rules do not determine the entire economic burden. Trace how prices, quantities and outside options respond under the actual market structure.",
    intro:
      "A tax may be collected from a seller while part of its burden reaches buyers through a higher price. A firm may be able to hire another worker only by raising the wage it pays existing workers too. Both examples show why a visible payment is only the beginning of a market explanation. Tax incidence and monopsony make different mechanisms inspectable, while a monetary example shows how an imposed exchange rule can change what people choose to spend.",
    sections: [
      {
        id: "wedge",
        title: "Tax incidence follows the response of buyers and sellers",
        paragraphs: [
          "Tax incidence asks how the economic burden of a tax is distributed after the market responds. In a competitive model, a per-unit tax creates a wedge between the price buyers pay and the price sellers receive. The quantity adjusts until buyer demand and seller supply agree at those two prices. Calling the tax a seller tax does not make the buyer’s price stay fixed.",
          "Open the [tax-incidence simulation](/effects/tax-incidence) and compare buyer and seller prices against the no-tax baseline. [OpenStax’s discussion of elasticity and pricing](" +
            s.tax.url +
            ") explains why responsiveness matters for tax burdens. The Modic curves are deliberately fixed linear schedules. Its burden split is a consequence of those slopes, not an estimate for a particular country, product or proposed tax.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: follow a thirty-unit tax",
        paragraphs: [
          "Use the teaching demand P = 100 − Q and supply P = 2Q. The currency and quantity units are invented so the arithmetic can be checked without relying on external measurements.",
        ],
        steps: [
          "With no tax, equate 100 − Q and 2Q. Quantity is 100/3 and the common price is 200/3. Save this common price as the baseline for both sides.",
          "Add a thirty-unit tax wedge. Solve 100 − Q = 2Q + 30 to obtain Q = 70/3. Buyers pay 230/3 while sellers receive 140/3; the difference between those prices is exactly thirty.",
          "Compare with the baseline. Buyers pay ten more per unit and sellers receive twenty less. Revenue is 30 × 70/3 = 700. The lost-trade triangle is a separate efficiency measure, not another recipient of that revenue.",
        ],
      },
      {
        id: "buyer-power",
        title: "Monopsony changes the cost of adding a worker",
        paragraphs: [
          "Monopsony concerns buyer-side market power. In the simple uniform-wage labor model, a large employer faces an upward-sloping labor-supply curve. Hiring more workers requires a higher wage, and the employer pays that wage to its existing workers as well. The marginal expenditure on another worker therefore exceeds the wage of that worker alone.",
          "The [monopsony hiring simulation](/effects/monopsony) separates wage, marginal labor cost and marginal revenue product. [OpenStax’s treatment of imperfectly competitive labor markets](" +
            s.monopsony.url +
            ") gives the textbook context. With the toy schedules, profit-maximising employment is thirty, compared with forty-five at the competitive intersection. Those values depend on the supplied functions and uniform-wage rule; a single employer in a town is not enough information to estimate an actual wage markdown.",
        ],
      },
      {
        id: "rules",
        title: "Gresham’s law makes the exchange rule explicit",
        paragraphs: [
          "A related lesson about constraints appears in [Gresham’s-law spending game](/effects/greshams-law). Two coins have equal face values under a compulsory exchange rule but different commodity values. A spender can conserve the more valuable material by using the lower-value coin at the fixed face-value rate. The mechanism depends on how coins are accepted and valued in transactions.",
          "Allow commodity-based pricing and the spending comparison changes. This is why a slogan about bad money driving out good needs its institutional qualifications. It does not show that inferior products always eliminate superior ones, nor does it explain every change in currency use. Like the tax wedge and uniform-wage rule, the exchange convention belongs inside the model rather than in a footnote added after the conclusion.",
        ],
        deeper: {
          title: "Comparative statics is not a complete policy evaluation",
          text: "The tax board compares equilibria before and after a wedge using unchanged supply and demand curves. It does not model enforcement, public spending benefits, distributional weights or long-run investment. The monopsony board omits search frictions and bargaining. A useful policy analysis can need these additional mechanisms as well as the small model’s arithmetic.",
        },
      },
      {
        id: "checklist",
        title: "Questions for evaluating a market claim",
        paragraphs: [
          "Before accepting a conclusion about who pays, ask for the mechanism that moves the burden. These checks help identify which extra evidence would make the explanation useful.",
        ],
        checklist: [
          "Separate the person who legally remits a payment from the person whose real income or surplus changes after prices and quantities adjust.",
          "Identify alternatives on both sides: substitute products, other employers, other workers, different locations and the time needed to switch.",
          "State the pricing rule. Are wages uniform, prices negotiated, coins accepted at face value, or contracts fixed for a period?",
          "Keep revenue transfers, lost trades and other welfare consequences separate. Do not add them indiscriminately or assume a model’s efficiency measure captures every policy objective.",
        ],
      },
      {
        id: "use",
        title: "Translate the model into an evidence request",
        paragraphs: [
          "For a proposed product tax, useful evidence includes how demand and supply respond over the relevant time horizon. For an employment claim, examine realistic outside options, hiring patterns and wage-setting institutions. For a currency claim, examine acceptance rules and relative valuations. Each question is more specific than asking whether markets generally work well.",
          "If your question concerns economy-wide output rather than one market, the [expenditure-multiplier activity](/effects/expenditure-multiplier) and [Solow-growth model](/effects/solow-growth) change the unit of analysis. They also change the assumptions. Move between models deliberately: a short-run spending chain, a long-run capital path and a single-market tax wedge do not answer the same policy question.",
        ],
      },
    ],
    experiments: [
      {
        slug: "tax-incidence",
        task: "Add a per-unit tax and compare prices, revenue and lost trades with the original equilibrium.",
      },
      {
        slug: "monopsony",
        task: "Choose employment and compare wage, marginal expenditure and the competitive benchmark.",
      },
      {
        slug: "greshams-law",
        task: "Change the coin-pricing rule and inspect the material value you retain.",
      },
    ],
    sources: [
      {
        ...s.tax,
        note: "Textbook explanation of responsiveness and tax incidence.",
      },
      {
        ...s.monopsony,
        note: "Textbook account of employer market power and labor-market assumptions.",
      },
    ],
    reflection:
      "For a market claim you recently heard, what adjustment or outside option would determine who ultimately bears the cost?",
  },
  {
    slug: "put-call-parity-covered-interest-parity-explained",
    title:
      "Put–call parity and covered interest parity: compare matching cash flows",
    description:
      "Understand two financial parity relationships through cash-flow replication, a worked option example and a checklist of timing, funding and contract assumptions.",
    topic: "Finance & risk",
    published: "2026-10-28",
    takeaway:
      "A parity relationship compares packages with matching contractual cash flows. Before calling a price gap an opportunity, check that the packages really match and that all implementation costs are included.",
    intro:
      "Two financial packages can look different while delivering the same terminal payoff under stated assumptions. Put–call parity compares European option packages. Covered interest parity compares two ways to obtain a fixed future currency amount with exchange risk covered. Their appeal is that they start from cash flows you can write down, but a simple identity does not supply a practical trading recommendation. Contract details and funding constraints determine whether a classroom comparison survives implementation.",
    sections: [
      {
        id: "options",
        title: "Put–call parity matches two terminal payoffs",
        paragraphs: [
          "For European options with the same strike and maturity on a non-dividend-paying stock, one share plus a put pays the greater of the terminal stock price and the strike. A call plus enough cash to deliver the strike at maturity pays the same amount. Under the idealised assumptions, equal future cash flows imply equal present costs: S + P = C + discounted K.",
          "Use the [put–call-parity experiment](/effects/put-call-parity) to move the terminal stock price across the strike. [Stoll’s primary paper on put and call prices](" +
            s.parity.url +
            ") provides the historical research context. The board focuses on the payoff identity and matched financing. It omits dividends, early exercise, trading fees, bid–ask spreads and restrictions on short sales, so its displayed gap is a model consistency check.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: replicate a one-hundred-unit floor",
        paragraphs: [
          "Take the board’s invented inputs: stock price 100, strike 100, one year to maturity, annual effective rate 5% and put price 8. These are teaching values rather than market quotations.",
        ],
        steps: [
          "Buy the stock and put for a combined cost of 108. If the terminal stock price is 70, the stock pays 70 and the put pays 30, producing 100. If the terminal price is 130, the put expires and the package pays 130.",
          "Discount the strike: 100 / 1.05 is about 95.24. A call priced about 12.76 plus that deposit also costs 108. At maturity the deposit becomes 100 and the call adds any stock value above 100.",
          "Use an overpriced-option preset and compare both initial costs while varying the terminal price. The model’s payoff equality remains. Before translating the gap into a strategy, add borrowing terms, spreads, shorting availability and every cash flow omitted by the board.",
        ],
      },
      {
        id: "currency",
        title: "Covered interest parity compares currency funding routes",
        paragraphs: [
          "A domestic deposit and a foreign deposit with a forward exchange contract can be arranged to produce the same future domestic-currency amount. The forward contract fixes the conversion rate in advance, so the comparison does not require forecasting the future spot rate. A consistent exchange-rate quote convention is essential: reversing the quote reverses which factors multiply and divide.",
          "In the [covered-interest-parity simulation](/effects/covered-interest-parity), the spot quote is domestic units per foreign unit. Starting with 100 domestic units, the domestic route yields 105. At spot 2, the foreign route buys 50 foreign units, grows to 51 and converts at the forward rate. Equality requires a forward rate of 105/51. Change the terminal spot rate to see why only the unhedged comparison changes with it.",
        ],
      },
      {
        id: "frictions",
        title: "Observed deviations require an institutional explanation",
        paragraphs: [
          "The [BIS analysis of covered interest parity](" +
            s.cip.url +
            ") explains why balance-sheet capacity, hedging demand and intermediation costs matter when comparing real markets. A price relationship can remain a useful reference even when trading it is costly or constrained. Calling every deviation irrational skips the question of which participant could actually execute and finance the offsetting positions.",
          "Do not infer from covered parity that the uncovered foreign deposit has the same expected or realised return as a domestic deposit. Its currency conversion is uncertain. Similarly, a payoff floor in the option example is part of a paid-for package under contractual assumptions, not a general promise that stock ownership has become riskless or that an advertised product carries no counterparty risk.",
        ],
        deeper: {
          title: "Compare dates as carefully as amounts",
          text: "A matched cash-flow argument requires matching currencies, maturities, settlement conventions and intermediate payments. A dividend before expiry, an exercise right on another date or collateral posted during the trade can change the comparison. Write a dated ledger before simplifying it into one equation; the equation should compress the ledger, not conceal a missing payment.",
        },
      },
      {
        id: "checklist",
        title: "A cash-flow replication checklist",
        paragraphs: [
          "These questions make the comparison inspectable even if you never plan to trade the instruments. They help distinguish arithmetic consistency from economic feasibility.",
        ],
        checklist: [
          "List each instrument’s initial payment, intermediate obligations and terminal payoff. Check the result below, at and above any option strike.",
          "Use one currency quote convention throughout. Label whether the quoted number means domestic per foreign unit or its reciprocal.",
          "State whether rates are simple, periodically compounded or continuous, and use matching maturities when discounting.",
          "Add spreads, funding terms, collateral, taxes, execution timing and constraints before interpreting a theoretical cost difference as an implementable opportunity.",
        ],
      },
      {
        id: "preference",
        title: "Equal payoffs and desirable risks are separate questions",
        paragraphs: [
          "Parity reasoning compares contractual packages under a model. Choosing how much risk to retain is another problem. The [insurance-deductible activity](/effects/insurance-deductibles) compares outcome distributions with a stated utility function, while [drawdown recovery](/effects/drawdown-recovery) traces how losses change the base from which later returns compound. Neither replaces the cash-flow identity.",
          "A useful reading habit is to name the type of claim: an algebraic identity, an equilibrium relationship, a historical observation or a preference-based decision. The strength of one type does not automatically transfer to another. Matching terminal values can be exact within a small model while the choice of a real position remains dependent on circumstances the model does not contain.",
        ],
      },
    ],
    experiments: [
      {
        slug: "put-call-parity",
        task: "Match stock-plus-put with call-plus-cash across terminal stock prices.",
      },
      {
        slug: "covered-interest-parity",
        task: "Compare hedged currency funding routes and perturb the forward rate.",
      },
      {
        slug: "insurance-deductibles",
        task: "Separate expected wealth from risk preference under an explicit utility function.",
      },
    ],
    sources: [
      {
        ...s.parity,
        note: "Primary treatment of the relationship between put and call option prices.",
      },
      {
        ...s.cip,
        note: "Institutional account of covered interest parity and observed market deviations.",
      },
    ],
    reflection:
      "Which apparently equivalent financial packages would stop matching once you include timing, intermediate payments or funding terms?",
  },
  {
    slug: "newsvendor-vs-economic-order-quantity-inventory",
    title:
      "Newsvendor vs economic order quantity: choose the right inventory model",
    description:
      "Compare uncertain one-period demand with repeat replenishment, calculate a small newsvendor example and connect inventory decisions with variability and queueing.",
    topic: "Systems in practice",
    published: "2026-10-28",
    takeaway:
      "Start with the inventory decision: a one-shot commitment under uncertain demand needs a different model from repeat replenishment with a steady demand rate.",
    intro:
      "A bakery deciding tomorrow’s fresh batch faces a different problem from a workshop replenishing a durable component throughout the year. Both hold inventory, but the cost of leftovers, the timing of replenishment and the uncertainty in demand differ. The newsvendor problem and economic order quantity make those differences explicit. A third model, Kingman’s queueing approximation, helps explain why filling every moment of capacity can create long waits even when average demand looks manageable.",
    sections: [
      {
        id: "one-period",
        title: "The newsvendor balances too much against too little",
        paragraphs: [
          "The newsvendor chooses a quantity before demand is known for a selling period. Unsold units have a salvage value, while an unmet sale loses a contribution margin. Ordering more reduces shortage exposure but increases leftover exposure. The best quantity under the stated objective depends on both the demand distribution and this asymmetry of costs.",
          "Play the [newsvendor inventory game](/effects/newsvendor-problem) by choosing a quantity, observing a demand draw and comparing realised profit with expected profit. [MIT’s supply-chain planning materials](" +
            s.inventory.url +
            ") give the broader inventory context. A lucky high-demand round does not prove that a large order was the best decision in advance. Compare the same policy across the full specified distribution, not only the outcome it happened to produce.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: choose a quantity with salvage value",
        paragraphs: [
          "The game uses invented demand values 20, 40, 60, 80 and 100 with probabilities 0.1, 0.2, 0.4, 0.2 and 0.1. Each unit costs 6, sells for 10 and salvages for 2.",
        ],
        steps: [
          "Calculate the cost of being one unit short as 10 − 6 = 4 and the cost of one leftover unit as 6 − 2 = 4. The critical cumulative probability is 4 / (4 + 4) = 0.5.",
          "Accumulate demand probabilities: the distribution reaches 0.3 at forty units and 0.7 at sixty. The smallest quantity reaching the one-half threshold is sixty. This selects a policy before observing the round’s demand.",
          "At quantity sixty, profits across the five demand outcomes are −80, 80, 240, 240 and 240. Weight them by their probabilities to obtain expected profit 176. Compare another quantity using the same demand distribution rather than comparing two different lucky draws.",
        ],
      },
      {
        id: "repeat",
        title: "Economic order quantity balances ordering against holding",
        paragraphs: [
          "Economic order quantity, or EOQ, assumes a steady demand rate, a fixed cost per order, a holding cost per unit per year and instantaneous replenishment under the simplified model. Larger batches mean fewer orders but more average stock. With no shortages and the other assumptions fixed, the relevant annual cost is ordering cost plus holding cost: DS/Q + HQ/2.",
          "In the [EOQ simulation](/effects/economic-order-quantity), annual demand is 1,200 units, ordering cost is 40 and holding cost is 2. A batch of 100 has relevant annual cost 580. The square-root optimum is about 219 units, with cost about 438. These values omit purchase expenditure that does not change with the batch size. Quantity discounts, spoilage, uncertain lead time and capacity limits can change the appropriate model.",
        ],
      },
      {
        id: "variability",
        title: "Queueing adds a capacity question",
        paragraphs: [
          "A supply system also needs time to process orders or serve customers. In [Kingman’s approximation](/effects/kingmans-approximation), mean waiting time grows with variability and with utilisation relative to spare capacity. The model describes a stable single-server queue approximately; it is not a universal exact formula for a warehouse or an entire production network.",
          "[Kingman’s original paper](" +
            s.kingman.url +
            ") supplies the heavy-traffic research context. The board’s mean service time of two minutes, utilisation 0.7 and arrival and service coefficients of variation equal to one give an approximate queue wait of 4.67 minutes. Reducing both variability measures to 0.5 gives about 1.17 minutes while mean service and utilisation remain fixed. Changing averages alone would miss that distinction.",
        ],
        deeper: {
          title: "Optimise the policy before judging one outcome",
          text: "Expected profit averages possible outcomes under a stated probability model. Realised profit is one draw from that model. A policy can be reasonable before a draw and still produce a loss. Conversely, a poor policy can get lucky. Evaluate whether the probabilities, costs and objective were appropriate, then use repeated outcomes to learn where those assumptions need revision.",
        },
      },
      {
        id: "checklist",
        title: "Choose a model around the decision",
        paragraphs: [
          "Answer these before using an inventory formula. Each question changes either the feasible actions or the cost of making the wrong commitment.",
        ],
        checklist: [
          "Is this a one-period commitment or a repeating replenishment decision? State when an order is placed and when demand becomes known.",
          "What happens to leftovers and unmet demand? Distinguish salvage, disposal, lost sales, backorders and reputational effects rather than using one generic shortage penalty.",
          "Are demand, delivery and processing times predictable enough for the selected model? Use observations to investigate variability instead of assuming it away.",
          "Compare policies under the same scenarios and objective. Check constraints such as storage, cash, minimum batches and service commitments before using an unconstrained optimum.",
        ],
      },
      {
        id: "next",
        title: "Extend the exercise without making it opaque",
        paragraphs: [
          "If your next question is which available task to serve first, try [shortest-job-first scheduling](/effects/shortest-job-first). It uses jobs available at time zero with known durations, so a reduced mean wait has a clear interpretation. Real scheduling may add unknown durations, priorities and arrivals that require a different rule.",
          "If the question is how production experience affects unit cost, try [Wright’s law](/effects/wrights-law). Its learning curve is a selected scenario rather than a forecast of guaranteed improvement. Keeping these questions separate lets you combine inventory, capacity and learning carefully without hiding uncertainty behind a single impressive-looking dashboard.",
        ],
      },
    ],
    experiments: [
      {
        slug: "newsvendor-problem",
        task: "Commit to a batch before demand, then compare realised and distribution-weighted profit.",
      },
      {
        slug: "economic-order-quantity",
        task: "Balance annual ordering and holding costs while varying the batch size.",
      },
      {
        slug: "kingmans-approximation",
        task: "Change variability and utilisation separately to inspect approximate waiting time.",
      },
    ],
    sources: [
      {
        ...s.inventory,
        note: "University teaching materials on inventory and supply-chain planning.",
      },
      {
        ...s.kingman,
        note: "Primary research behind the single-server heavy-traffic approximation.",
      },
    ],
    reflection:
      "Which assumption would most change your inventory decision: demand uncertainty, leftover value, replenishment timing or capacity?",
  },
];
