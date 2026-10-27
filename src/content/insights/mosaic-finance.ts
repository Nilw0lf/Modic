import type { Insight } from "./types";
import { mosaicSources as s } from "@/data/mosaic-expansion";
export const mosaicFinance: Insight[] = [
  {
    slug: "debt-snowball-vs-avalanche-amortization",
    title:
      "Debt snowball vs avalanche: compare the interest, the first win and the payment schedule",
    description:
      "Explore snowball and avalanche repayment with identical budgets, then use amortization to understand principal, interest and extra payments in a transparent example.",
    topic: "Money & investing",
    published: "2026-10-27",
    takeaway:
      "Compare repayment methods using the same budget and actual contract assumptions. First payoff timing, lifetime interest and a feasible monthly commitment are different objectives.",
    intro:
      "The snowball method targets the smallest debt; the avalanche method targets the highest interest rate. That difference is easy to explain and surprisingly easy to compare unfairly. If one plan quietly uses a larger budget, different minimum payments or an unrealistic commitment, the result is no longer a comparison of repayment order alone. Start with a transparent schedule, then inspect what the arithmetic leaves out.",
    sections: [
      {
        id: "rules",
        title: "Name the repayment rule before comparing outcomes",
        paragraphs: [
          "Both methods normally begin by keeping up with required minimums and directing available extra money to a priority debt. Snowball chooses the smallest balance; avalanche chooses the highest rate. Clearing one debt can free payment capacity for another. A fair teaching comparison keeps the total budget fixed and makes that reallocation explicit.",
          "The [CFPB debt-reduction worksheet](https://www.consumerfinance.gov/documents/5782/cfpb_ymyg-toolkit_reducing-debt-worksheet.pdf) distinguishes the highest-interest and snowball approaches. In Modic’s [debt snowball versus avalanche simulator](/effects/debt-snowball-avalanche), the three fictional balances are 800, 2,000 and 5,000 at annual rates of 18%, 8% and 24%. Each active debt receives up to twenty-five per month before the remaining budget follows the selected rule. These are invented teaching contracts, not typical market rates or minimum-payment recommendations.",
        ],
      },
      {
        id: "interest",
        title: "A payment is not the same thing as principal repaid",
        paragraphs: [
          "Interest is calculated on an outstanding balance. Part of a payment covers that interest; the remainder reduces principal. Under a fixed-rate amortizing loan with equal payments, the interest component generally falls as the balance shrinks, so more of each later payment can reduce principal. The total paid and the balance remaining are therefore different quantities.",
          "Open the [loan amortization calculator](/effects/loan-amortization) and inspect a hypothetical ten-thousand-unit loan. Adding a fixed extra payment reduces the balance sooner and changes later interest in this model. The [CFPB explanation of paying down a mortgage](https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/) describes the principal–interest split for amortizing payments. The Modic calculation omits fees, insurance, taxes, penalties and rate changes, so it should be read as arithmetic instruction rather than a quote for a real loan.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: isolate the first month",
        paragraphs: [
          "Use a three-hundred-unit monthly budget in the debt board. Before comparing complete plans, trace one month by hand. This helps catch whether a spreadsheet applies interest before payment, handles minimums consistently and counts the same money twice.",
        ],
        steps: [
          "Calculate opening monthly interest: twelve on the 800 balance, about 13.33 on the 2,000 balance and one hundred on the 5,000 balance. Total initial interest is about 125.33 under the declared annual-rate-divided-by-twelve rule.",
          "Pay twenty-five to each debt, leaving 225 from the same three-hundred budget. Avalanche directs that extra to the 24% debt; snowball directs it to the smallest balance. The total payment is identical, while the remaining balances differ.",
          "Advance both schedules and compare total interest with the month of first payoff. Record both outcomes rather than naming one winner from a single preferred metric, and retain the model’s assumptions beside the result.",
        ],
      },
      {
        id: "behaviour",
        title: "Do not manufacture motivation inside an interest model",
        paragraphs: [
          "A quick first payoff can feel encouraging. That does not authorise a calculator to invent an adherence benefit and quietly add it to one method. The Modic board holds payments constant and reports arithmetic outcomes only. It does not know whether an individual would continue either plan through an emergency, a changed income or a frustrating delay.",
          "A practical comparison can acknowledge that distinction without pretending the behavioural question is irrelevant. First inspect the cost of different orders under sustained equal payments. Then separately ask which budget is feasible, what contingency protects essential spending and how progress will be tracked. If a different commitment is more realistic, label it as a different scenario. Keeping these questions separate makes the tradeoff visible instead of hiding it behind an apparently objective total.",
        ],
      },
      {
        id: "checklist",
        title: "What to collect before using a real repayment schedule",
        paragraphs: [
          "The teaching model is useful because every rule is visible. A real account may calculate daily interest, change a promotional rate, require a balance-linked minimum or allocate payments under contractual rules. Those details can change the result substantially. Build the comparison from statements and contract terms rather than transferring the board’s simplified inputs into a personal plan unchanged.",
        ],
        checklist: [
          "List each current balance, applicable rate, required minimum and any scheduled rate change.",
          "Keep the total payment budget identical when isolating repayment-order effects.",
          "Check how extra payments are applied, including any fees, restrictions or prepayment terms.",
          "Compare remaining principal at matching dates, total interest and first completion timing separately.",
          "Include an explicit contingency for changing cash flow rather than assuming perfect payment adherence.",
        ],
      },
      {
        id: "other-rates",
        title:
          "The rate you pay and the rate you discount are related, but distinct",
        paragraphs: [
          "The loan board follows a borrower’s contracted balance. Bond valuation instead discounts promised future cash flows at a market-required yield. Both involve time and rates, but changing a market yield does not rewrite a fixed loan’s promised payment schedule. Confusing those operations can make an explanation sound convincing while changing the question halfway through.",
          "The [bond convexity experiment](/effects/bond-convexity) is a useful next step: it holds a fictional bond’s payments fixed and changes the discount yield. Compare exact repricing with duration and convexity approximations. Together, the three activities teach a reusable habit: identify which cash flows are fixed, which rate is changing and which decision the model evaluates. The numerical result becomes much easier to interpret when those three items are named before choosing an action.",
        ],
        deeper: {
          title: "Why the last payment is capped",
          text: "A fixed payment plus extra principal can exceed the final amount due. The amortization model therefore pays no more than outstanding principal plus that month’s interest. This prevents a negative balance and distinguishes the scheduled recurring amount from the actual last payment.",
        },
      },
    ],
    experiments: [
      {
        slug: "debt-snowball-avalanche",
        task: "Compare first payoff and interest with a fixed monthly budget of three hundred.",
      },
      {
        slug: "loan-amortization",
        task: "Add extra principal and inspect the balance at matching months.",
      },
      {
        slug: "bond-convexity",
        task: "Hold promised payments fixed and change the discount yield.",
      },
    ],
    sources: [
      {
        ...s.debt,
        note: "Official comparison of highest-interest and smallest-balance repayment approaches.",
      },
      {
        ...s.loan,
        note: "Official explanation of principal, interest and amortizing payments.",
      },
    ],
    reflection:
      "Which result are you trying to improve, and have you kept the budget and contract assumptions consistent across the comparison?",
  },
  {
    slug: "efficient-frontier-correlation-diversification",
    title:
      "The efficient frontier explained: why correlation matters more than counting investments",
    description:
      "Build a two-asset efficient frontier, inspect minimum variance and learn why estimated returns, correlation and bond curvature limit simple portfolio comparisons.",
    topic: "Money & investing",
    published: "2026-10-27",
    takeaway:
      "A frontier is efficient relative to supplied assumptions and available choices. It is a map of a modelled tradeoff, not a promise about future returns.",
    intro:
      "Two portfolios can contain the same number of investments and offer very different diversification. What matters in a mean–variance model is not merely how many assets appear in the list, but how their returns move together, their weights and the expected returns and variances supplied to the calculation. A two-asset experiment is enough to make the central tradeoff visible.",
    sections: [
      {
        id: "definition",
        title: "Efficiency means a comparison within a feasible set",
        paragraphs: [
          "A mean–variance efficient portfolio offers the highest expected return available for a given variance, or the lowest variance for its expected return, within the choices allowed by the model. A dominated portfolio has an available alternative with a more favourable combination. Neither term means that the investment is safe, suitable or certain to earn its expected return.",
          "[Markowitz’s portfolio-selection paper](https://doi.org/10.1111/j.1540-6261.1952.tb01525.x) provides the foundational framework. In the [efficient frontier simulator](/effects/efficient-frontier), two hypothetical assets have expected returns of 5% and 9% and standard deviations of 10% and 20%. Weights are nonnegative and sum to one. These inputs are supplied teaching assumptions, not estimates of named investments. The displayed frontier is therefore conditional on a very small feasible set and a particular definition of risk.",
        ],
      },
      {
        id: "covariance",
        title: "The covariance term changes the shape of the opportunity",
        paragraphs: [
          "Expected portfolio return is a weighted average of the two supplied means. Variance also includes covariance: the way the two returns move together. With imperfect correlation, some fluctuations offset, so a mix can have less volatility than either asset alone. This benefit depends on the weights and relationship between returns rather than on a generic label such as diversified.",
          "The board lets you change correlation while leaving individual means and standard deviations fixed. Watch the curve move and reveal the minimum-variance point. On one side of that point, a portfolio can have lower expected return and higher risk than another available mix. On the efficient branch, moving toward higher expected return requires accepting more modelled volatility. The calculation describes that tradeoff without deciding how a particular reader should value it.",
        ],
      },
      {
        id: "worked-example",
        title: "Worked example: inspect a mix instead of assuming a benefit",
        paragraphs: [
          "Set correlation to zero and allocate thirty percent to the second asset. The following arithmetic comes entirely from the board’s invented moments. It illustrates covariance accounting rather than a forecast of realised investment performance.",
        ],
        steps: [
          "Compute expected return as 0.7 times five plus 0.3 times nine, giving 6.2 percent. The weighted mean is straightforward, but it does not determine the portfolio’s standard deviation.",
          "Calculate variance in squared-percentage units as 100 times 0.7 squared plus 400 times 0.3 squared. With zero correlation the cross term vanishes, giving eighty-five and a standard deviation of about 9.22 percent.",
          "Change correlation to one while keeping the same weights. Standard deviation becomes thirteen percent. The same two assets and allocation now supply less diversification because the assumed return movements no longer offset.",
        ],
      },
      {
        id: "estimation",
        title: "A clean curve can conceal uncertain inputs",
        paragraphs: [
          "Real expected returns and covariances are not printed on assets. They must be estimated or assumed, and the answer can change when the period, data quality or market conditions change. A mathematically efficient point under one set of inputs can be inefficient under another. The precision of the plotted curve should not be confused with confidence in those inputs.",
          "The [diversification experiment](/effects/diversification) is useful for exploring co-movement separately from a recommendation. Ask what happens if correlations rise during a period when protection is most valuable. Also ask what standard deviation misses: losses can be asymmetric, trading can become costly and a commitment may be hard to unwind. Adding these dimensions changes the decision problem rather than merely adjusting a label on the same chart.",
        ],
      },
      {
        id: "checklist",
        title: "Five questions to attach to a frontier chart",
        paragraphs: [
          "A useful frontier graphic should be accompanied by enough information to reconstruct its meaning. Without that information, readers can easily compare points generated from different assets, time horizons or constraints as though they occupied one shared opportunity set. Use the following questions to turn the picture into an inspectable model rather than an allocation instruction.",
        ],
        checklist: [
          "Which assets, weights and restrictions define the feasible portfolios being compared?",
          "Are expected returns assumptions, historical averages or estimates from a stated forecasting model?",
          "What data and time horizon support the covariance and correlation inputs?",
          "Which risks, fees, taxes and liquidity constraints are omitted from the variance measure?",
          "How does the apparently preferred point change when important assumptions move together?",
        ],
      },
      {
        id: "curvature",
        title: "One risk number need not capture a nonlinear exposure",
        paragraphs: [
          "A portfolio can also contain exposures whose response to market changes is curved. For a simple option-free bond, price is a nonlinear function of yield. Duration approximates the local slope; convexity adds a second-order correction. A single sensitivity evaluated at one point is not an exact description of every possible rate move.",
          "Explore this distinction in the [bond convexity board](/effects/bond-convexity), which compares exact discounting with linear and quadratic estimates for fixed cash flows. [University of Virginia’s duration and convexity note](https://store.darden.virginia.edu/duration-and-convexity) provide university context on interest-rate sensitivity. This extension does not invalidate mean–variance analysis; it identifies another modelling layer. First define the exposure and scenario, then decide which approximation is adequate. A useful model is one whose limits remain visible when the decision becomes more demanding.",
        ],
        deeper: {
          title: "The two-asset variance equation",
          text: "With second-asset weight w, the board uses variance 100(1−w)² + 400w² + 400ρw(1−w), expressed in squared-percentage units. Taking its square root gives standard deviation. Minimisation is constrained to weights from zero to one; allowing short positions would change the feasible set.",
        },
      },
    ],
    experiments: [
      {
        slug: "efficient-frontier",
        task: "Hold weights fixed and vary correlation before finding the minimum-variance point.",
      },
      {
        slug: "diversification",
        task: "Explore why common movements can limit the benefit of adding assets.",
      },
      {
        slug: "bond-convexity",
        task: "Compare a local risk approximation with exact repricing under a larger move.",
      },
    ],
    sources: [
      {
        ...s.frontier,
        note: "Foundational primary paper on mean–variance portfolio selection.",
      },
      {
        ...s.bond,
        note: "University teaching note on fixed-income valuation and interest-rate sensitivity; full note may require purchase.",
      },
    ],
    reflection:
      "Which uncertain assumption would most change the portfolio comparison you are treating as precise?",
  },
];
