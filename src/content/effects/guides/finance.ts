import { guide as g } from "./types";
export const financeGuides = {
  "volatility-drag": g(
    "Volatility drag describes why a sequence's compound growth can be lower than growth calculated from its arithmetic average. Returns operate on a changing balance, not an unchanged starting amount.",
    "A gain and an equal percentage loss do not cancel: the second percentage applies to a different balance. For positive growth factors, their geometric mean cannot exceed their arithmetic mean. This is arithmetic, not a claim that every risky investment is undesirable.",
    "Change return tiles and compare the two curves. The dashed path applies the arithmetic mean each period. Move a return earlier to change the journey while preserving the product; there are no cash flows in this board.",
    [
      "A rise and fall that do not cancel",
      "Begin with 100 teaching tokens and apply a 50% gain, taking the balance to 150.",
      "Apply a 50% loss to 150, leaving 75 rather than the original 100.",
      "The arithmetic mean is zero, but the compound result is a 25% loss. Reversing these two factors still ends at 75 when there are no withdrawals.",
    ],
    [
      "A zero average return guarantees that the balance is unchanged.",
      "An arithmetic mean adds returns, whereas accumulated wealth multiplies their factors. Unequal factors can leave a very different balance.",
    ],
    [
      "Does the smooth line represent a safer asset I could actually buy?",
      "No. It is a constructed comparison that repeatedly applies the same mean. Availability, uncertainty, and investment suitability are outside the demonstration.",
    ],
    "Which report in your work summarises a changing balance with an average that hides its actual path?",
  ),
  "sequence-of-returns": g(
    "Sequence of returns risk arises when changing the order of returns changes an outcome because money enters or leaves along the way. Withdrawals make the timing of losses consequential.",
    "A withdrawal after a decline removes a larger fraction of the remaining balance. Later gains then apply to less capital. Without cash flows, reordering these fixed multiplicative factors leaves the endpoint unchanged, although the interim balances differ.",
    "Move the five cards earlier or use Put gains first. Compare your final balance with the reversed path and inspect unpaid withdrawals. Set the withdrawal to zero before comparing again to isolate the cash-flow mechanism.",
    [
      "Two invented periods with a withdrawal",
      "Start at 100, take a 30% loss, and withdraw ten: 60 remains after the first period.",
      "A subsequent 30% gain followed by another ten-token withdrawal leaves 68.",
      "Reverse those returns: 100 becomes 120 after the first withdrawal, then 74 after the second. The return product is the same; the withdrawal timing differs.",
    ],
    [
      "Identical average returns imply identical withdrawal outcomes.",
      "Cash flows interact with the changing portfolio. Their timing and size matter alongside the return factors and the way an average is calculated.",
    ],
    [
      "What does an unpaid withdrawal mean here?",
      "If the balance cannot meet the requested payment, it pays what remains and records the gap. The game does not assume borrowing or secretly allow negative portfolio wealth.",
    ],
    "Which essential expense would force you to remove funds after a decline rather than wait for an uncertain recovery?",
  ),
  "fee-drag": g(
    "Investment fee drag is the reduction in accumulated wealth caused by investment charges and the subsequent returns that the removed capital no longer earns. Direct fees and the final wealth gap are different quantities.",
    "Each annual deduction lowers the amount available for later compounding. The no-fee comparison therefore diverges by more than the sum of charges when positive growth continues. The timing and fee base affect the calculation.",
    "Hold return and horizon fixed while comparing the fee presets. Read Fees actually paid separately from Final balance gap. The model first grows the balance, then charges the fee against that year's resulting amount.",
    [
      "One annual charge and its next-year consequence",
      "Begin with 1,000 tokens and a 6% gross return; before the first fee, the balance is 1,060.",
      "A 1% charge removes 10.60, leaving 1,049.40 to participate in the next period.",
      "The removed 10.60 also misses later growth. Compare both direct fees and the ending gap rather than treating the first charge as the whole cost.",
    ],
    [
      "The cheapest service must be the best service.",
      "A cost comparison alone does not establish service quality, risk, suitability, or outcomes. The board holds gross returns equal to isolate the arithmetic of costs.",
    ],
    [
      "Is subtracting the fee from the return exact in this board?",
      "No. Because the fee is applied after growth, the net factor is (1+return)×(1−fee). Other products may use different timing and charging conventions.",
    ],
    "Which recurring charge looks small per period but deserves evaluation over the full period you expect to use the service?",
  ),
  "real-return": g(
    "Real return measures the change in purchasing power after accounting for inflation. A larger nominal balance can still purchase fewer goods when their prices rise faster.",
    "Nominal growth changes the account; inflation changes the price of the basket. Dividing the account growth factor by the price growth factor gives the real growth factor. Subtracting inflation from nominal return is only an approximation.",
    "Advance years and watch the basket price as well as the account. The More money, fewer baskets preset shows why both numbers are needed. Changing rates recomputes the chosen constant-rate scenario from the starting year.",
    [
      "A growing account facing faster prices",
      "Start with 100 tokens and a ten-token basket, so ten baskets are affordable.",
      "After one year of 5% nominal growth and 8% inflation, the account is 105 and each basket costs 10.80.",
      "You can buy about 9.72 baskets. The exact real return is 1.05/1.08−1, about −2.78%, despite the higher nominal balance.",
    ],
    [
      "A positive nominal return always preserves purchasing power.",
      "Purchasing power depends on the relevant price changes too. Taxes and personal consumption patterns can make an individual's real outcome differ from a broad index.",
    ],
    [
      "Why show an original basket instead of a general inflation forecast?",
      "A fixed teaching basket makes the denominator explicit. Its price changes are chosen assumptions and do not represent your expenses or a predicted national inflation rate.",
    ],
    "When you compare future income with today's expenses, are both expressed in the same purchasing-power terms?",
  ),
  "bond-duration": g(
    "Bond duration connects the timing of fixed cash payments with sensitivity to yield changes. Macaulay duration weights payment times by present value; modified duration gives a local price-change approximation.",
    "Payments further away are discounted over more periods. Increasing yield therefore reduces their present values more strongly. Coupon payments return some value earlier, so duration is generally below maturity for a positive-coupon bond.",
    "Compare short and long maturities at the same coupon. Increase the yield shock and inspect the divergence between the exact price and the duration estimate. Expand the payment table to see which discounted flows receive the most weight.",
    [
      "A five-year zero-coupon teaching bond",
      "Set coupon to zero and maturity to five. All 100 face-value tokens arrive in year five.",
      "At a 5% annual yield, price is 100/1.05⁵, about 78.35, and Macaulay duration is five years.",
      "Raise yield to 6% and reprice exactly. Modified duration supplies an approximation, while the exact discount calculation captures the curve's nonlinearity.",
    ],
    [
      "Duration is always identical to maturity.",
      "Only the fixed zero-coupon example places all payment value at maturity. Earlier coupons generally shorten the present-value-weighted average payment time.",
    ],
    [
      "Why does the estimate miss the exact price?",
      "Modified duration uses a first-order change around the base yield. A bond price is nonlinear in yield, so approximation error generally grows as the shock grows.",
    ],
    "Which promised payment looks stable in cash terms but changes value when the discount rate changes?",
  ),
  "discounted-cash-flow": g(
    "Discounted cash flow, or DCF, values specified future payments in today's units. Its result depends on the amounts, timing, discount rate, and any included residual value.",
    "A later payment receives more discounting than an earlier payment. Higher assumed cash-flow growth raises this project's value; a higher discount rate lowers it. Exact calculation does not make uncertain assumptions exact.",
    "Read each year's cash payment and present value before submitting a bid. Stress the assumptions after bidding to see how the same price can cross from below to above the calculated value. This project stops after five payments, with no terminal value.",
    [
      "A finite project paying twenty each year",
      "Set growth to zero, keeping all five annual cash payments at twenty teaching tokens.",
      "At an 8% discount rate, their total present value is about 79.85, rather than the undiscounted total of 100.",
      "A bid of 80 is close to that calculation. A changed discount rate or payment assumption changes the comparison without changing the submitted price.",
    ],
    [
      "More decimal places make a valuation more certain.",
      "Precision in arithmetic does not remove uncertainty in future cash flows or the chosen discount rate. Sensitivity analysis can be more informative than extra decimal places.",
    ],
    [
      "Why does this project have no terminal value?",
      "It is a deliberately finite payment stream. Continuing businesses often need a separate residual-value assumption, which can dominate a valuation and deserves explicit scrutiny.",
    ],
    "Which assumption drives most of a value estimate you use, and what would make you revise it?",
  ),
  "margin-calls": g(
    "A margin call reflects a breach of required equity relative to assets in a borrowing-supported account. Asset prices can fall while debt remains, magnifying losses on the owner's equity.",
    "Equity equals assets minus debt. A loss on all gross assets is borne by the smaller equity base. A maintenance breach may require extra capital or debt reduction; a forced sale can alter the remaining exposure even when it leaves equity unchanged immediately.",
    "Open an account and reveal each market move. A breach blocks the next move until you deposit outside cash or sell assets to repay debt. Read Net gain after contributions so an injection is not mistaken for an investment gain.",
    [
      "Three-times leverage during a price decline",
      "With 100 equity and 3× gross leverage, assets are 300 and debt is 200.",
      "A 20% asset decline leaves assets of 240 and equity of 40: a 60% loss on the original equity.",
      "Equity/assets is about 16.67%, below this game's 30% requirement. Adding cash or reducing debt changes the ratio; the account loss has not disappeared.",
    ],
    [
      "The maximum loss is always the original equity.",
      "Borrowing can leave debt above the remaining assets. Real accounts can owe more than their initial equity, and liquidation does not automatically erase that obligation.",
    ],
    [
      "Why does the cash deposit exceed the apparent equity shortfall?",
      "A cash deposit increases both equity and account assets. The required amount solves (equity+deposit)/(assets+deposit)=maintenance, rather than treating the asset denominator as fixed.",
    ],
    "Which obligation would remain unchanged if the asset supporting it suddenly lost value?",
  ),
  "portfolio-rebalancing": g(
    "Portfolio rebalancing restores target allocation weights after differing returns move a portfolio away from its intended mix. It is a rule for exposure, not a promise of outperformance.",
    "When one holding grows faster, it becomes a larger share of total wealth. Restoring weights sells some of the overweight holding and reallocates to the other. Costs reduce wealth, and subsequent returns determine whether the trade helps or hurts this particular path.",
    "Reveal a round, inspect the weight bar, and decide whether to rebalance. Compare your managed wealth with the untouched portfolio under exactly the same return shocks. Trading fees apply to the stated pre-fee one-way transfer.",
    [
      "Restoring a balanced pair after unequal growth",
      "Begin with 500 tokens in each asset, a 50/50 allocation.",
      "If A rises 20% and B is unchanged, the amounts become 600 and 500, making A about 54.55% of the total.",
      "A no-cost rebalance would transfer 50 and leave 550 in each. With the selected fee, the remaining total is slightly lower and is split equally.",
    ],
    [
      "A rebalance automatically improves future returns.",
      "Restoring exposure can reduce an unwanted concentration, but the overweight asset may keep outperforming. Fees and taxes can also make trading costly.",
    ],
    [
      "Why keep an untouched benchmark?",
      "Both portfolios receive the same invented shocks. Their difference isolates the chosen reallocations and charges rather than comparing two unrelated market paths.",
    ],
    "What allocation change have you accepted passively because a previous winner kept growing?",
  ),
  "dollar-cost-averaging": g(
    "Dollar-cost averaging invests a fixed monetary amount at regular intervals. Lower prices buy more units and higher prices buy fewer, changing the average cost per unit.",
    "A staged purchase leaves part of an existing cash pot uninvested until later. This can help on a falling path and reduce participation on a rising path. Investing new income as it arrives is a different cash-availability problem.",
    "Advance six equal purchases and read both fractional shares and remaining cash. Compare rising, falling, and recovery scenarios. Staged wealth includes uninvested cash, so neither strategy gets an artificial advantage from ignoring part of its starting resources.",
    [
      "Two equal purchases at different prices",
      "A staged buyer invests 100 tokens at a price of twenty and receives five shares.",
      "Another 100 at a price of ten buys ten more shares, giving fifteen shares for 200 tokens.",
      "Average cost is 200/15, about 13.33, not the arithmetic average price of fifteen. Whether this beats an available lump sum still depends on the complete path.",
    ],
    [
      "Regular purchases always beat a lump sum.",
      "Staging helps on some paths and trails on others. Price evolution, cash availability, cash interest, transaction costs, and risk preferences all affect a comparison.",
    ],
    [
      "Why does the recovery path end with more staged shares?",
      "Equal amounts buy more shares at its temporarily lower prices. The invented recovery later values those extra shares more highly, but that recovery was not guaranteed in advance.",
    ],
    "Are you choosing how to invest money already available, or how to invest income that has not yet arrived?",
  ),
  "disposition-effect": g(
    "The disposition effect is a tendency to realise investment gains more readily than losses. A gain or loss relative to purchase price can become a reference point for deciding what to sell.",
    "Realising a gain may feel like confirming a successful decision, while selling below purchase price makes a loss explicit. Neither feeling directly determines the asset's prospective payoff. Other reasons for selling, including taxes and diversification, can be valid.",
    "Choose which asset to sell across four cards. Paired cards preserve current and hypothetical future values while changing the purchase bases. Compare your own paired choices rather than treating the game as a diagnosis.",
    [
      "Two assets with different forward opportunities",
      "Both assets currently sell for 100, but this teaching card specifies next values of 120 for A and 80 for B.",
      "Selling B and keeping A gives 100 cash plus 120 next-period value, a total of 220.",
      "Swap the purchase-price labels while keeping those payoffs fixed. The forward-looking comparison remains 220 versus 180, though the realised-gain story changes.",
    ],
    [
      "Selling a loser is always the right decision.",
      "The relevant comparison is forward-looking and context-dependent. A loss label alone provides no universal rule, just as a gain label does not prove an asset should be sold.",
    ],
    [
      "Why disclose the future values?",
      "Doing so isolates the purchase-price reference in a transparent puzzle. Real future values are uncertain, so this is not a recommendation to predict a price and trade on it.",
    ],
    "If you had no memory of your entry price, what evidence would support keeping or selling the position today?",
  ),
  "house-money-effect": g(
    "The house money effect describes greater willingness to take risk following prior gains. Recent winnings may be mentally separated from existing wealth even though both now belong to the decision maker.",
    "An origin story can change the reference point for a possible loss. Losing newly won money may feel like returning a bonus, while an identical loss from savings may feel more serious. Current final-wealth outcomes need not change with that story.",
    "Make a choice in each frame before the shared draw is revealed. Both begin at 100 and offer the same sure or risky final wealth. The report shows your actual choices, not an invented increase in risk appetite.",
    [
      "The same current wealth with two histories",
      "One frame says the current 100 tokens came from savings; the other says 80 became 100 after a gain.",
      "Each offers sure final wealth 110 or a 50/50 chance of 90 or 130, with an expected value of 110.",
      "Compare the two choices. A difference is a prompt to consider framing, not proof of a stable bias or evidence that either risk preference is wrong.",
    ],
    [
      "Winnings are not really my money yet.",
      "Once received, the gain is part of current wealth. Its history can affect feelings, but a later loss still reduces resources available for other uses.",
    ],
    [
      "Is choosing the gamble irrational?",
      "Not necessarily. The outcomes have equal expected values but different risk. Preferences over risk matter; the activity compares a frame change rather than assigning a universal correct choice.",
    ],
    "Do you apply different spending or risk rules to a windfall than to an equal amount of saved income?",
  ),
  "minsky-financing": g(
    "Minsky's financing regimes distinguish how operating income covers debt service: hedge finance covers interest and principal, speculative finance covers interest but needs principal refinancing, and Ponzi finance cannot cover interest from income.",
    "A reserve can pay today's bill while recurring income remains insufficient. A debt-funded expansion can add income yet increase interest faster. A higher rate or weaker income can move an arrangement into a more refinancing-dependent regime.",
    "Settle quarters and inspect the ledger, reserve, and new borrowing. Add projects to compare the income gain with additional debt. The stress after the third quarter is disclosed; regime labels use the income flow rather than treating accumulated reserves as recurring revenue.",
    [
      "A project that changes coverage",
      "Initial debt 200 at 5% requires interest ten, and scheduled principal twenty. Income thirty exactly covers both.",
      "Add a project: debt becomes 300 and income thirty-five. Interest fifteen plus principal twenty remains covered before the stress.",
      "After the disclosed rate rise and income reduction, check coverage again. Borrowing can maintain a payment while making the future arrangement more fragile.",
    ],
    [
      "Being able to pay today's invoice proves the financing is self-sustaining.",
      "A reserve or new loan can cover a payment despite an ongoing income gap. Income, liquid assets, and refinancing availability answer different questions.",
    ],
    [
      "Why does the game keep offering refinancing?",
      "Unlimited credit isolates the accumulation of dependence on borrowing. Real credit can stop or become much more costly, a major limitation of this small treasury model.",
    ],
    "Which payment is supported by recurring income, and which depends on a reserve or somebody agreeing to lend again?",
  ),
  "permissionless-leverage": g(
    "Permissionless leverage is Naval Ravikant's discussion of scalable code and media output that need not require hiring a new worker for every additional customer. Reusability differs from borrowing to amplify financial exposure.",
    "A reusable product has an upfront creation cost and a lower incremental delivery cost. A larger audience or repeated distribution can spread that cost across more uses. Weak demand, maintenance, and competition can prevent the hoped-for payoff.",
    "Allocate twelve first-week hours, launch, and compare combined net income with an all-service week. Repeat distribution reuses the paid-for product. Change the supplied audience to see how the first build can lose money when too few people use it.",
    [
      "A reusable tool reaching a supplied audience",
      "Allocate eight build hours and four service hours. Service earns forty and the game's build charge is eighty.",
      "At twenty users, full-quality product revenue is forty and delivery costs two, making first-launch combined net income −2.",
      "Repeat distribution without another build charge. The same small product now adds thirty-eight net tokens per launch, but the audience and low maintenance costs remain assumed.",
    ],
    [
      "Code or media guarantees passive income.",
      "Low copying costs do not guarantee demand, distribution, reliability, or profit. The board supplies audiences to isolate scale rather than simulate the difficult process of earning them.",
    ],
    [
      "Are these numbers Naval's formula for wealth?",
      "No. They are Modic's original teaching assumptions. The source discusses principles of leverage, while the game makes one narrow production-cost tradeoff explicit.",
    ],
    "What useful output could you reuse, and what evidence shows that someone actually wants it?",
  ),
  "specific-knowledge": g(
    "Specific knowledge, in Naval's framework, refers to distinctive capabilities developed through curiosity, experience, and practice. A complementary skill mix can fit a particular problem better than an interchangeable general credential.",
    "Skills create value in relation to a task. Knowing a domain and a delivery method can complement each other; more unrelated skills do not automatically solve an unmet need. The game uses a visible brief so the connection can be inspected.",
    "Choose exactly three cards, test the mix, then change the customer brief while retaining it. Matching needs earn points and completing the stated combination adds a bonus. Those points represent checklist fit, not income or innate potential.",
    [
      "Combining skills for a delivery tool",
      "The local-shop brief needs coding, logistics, and data analysis under the game's disclosed checklist.",
      "Choosing those three covers every listed need and adds the authored complementarity bonus.",
      "Switch to an educational brief. The same mix may leave teaching or writing needs uncovered, showing why usefulness depends on context rather than a universal ranking of skills.",
    ],
    [
      "Specific knowledge means a fixed talent that cannot be learned.",
      "Practice, projects, and experience can build distinctive capabilities. The concept does not justify treating a person's present skill set as a permanent ceiling.",
    ],
    [
      "How can I test a useful combination outside the game?",
      "Choose a concrete problem, talk to the people experiencing it, and create a small useful output. Feedback from its use is more informative than an invented skill score.",
    ],
    "Which two experiences do you combine naturally, and whose concrete problem could that combination help solve?",
  ),
  "circle-of-competence": g(
    "A circle of competence is the boundary of situations whose economics and uncertainties a decision maker can evaluate. Buffett's formulation emphasises knowing that boundary rather than making it as large as possible.",
    "An honest uncertainty range exposes possible adverse outcomes. A familiar model can have a narrower range, but price still matters and unfamiliar does not mean automatically worthless. Passing avoids a purchase without guaranteeing that its realised value would have been poor.",
    "Review six offers, choose Buy or Pass, and read the revealed value and ledger. Compare worst-case net gain with expected value before choosing. The supplied uniform ranges are reliable teaching information, an advantage real investors rarely possess.",
    [
      "A narrow range and a low ask",
      "A fictional familiar deal has a stated value range of eighty to 120 and an asking price of seventy.",
      "Every value in that supplied range exceeds the ask, while a different ask of 110 would allow a loss.",
      "The label familiar is unchanged, but the price changes the decision. In the real world, scrutinise whether the range itself deserves confidence.",
    ],
    [
      "A familiar business must be a safe purchase at any price.",
      "Understanding a business does not remove valuation, financing, or operational risk. Competence supports evaluation; it does not erase the price paid or guarantee an outcome.",
    ],
    [
      "Does a missed profitable offer prove that passing was wrong?",
      "A realised outcome alone does not determine the quality of a decision under uncertainty. Compare the evidence and possible outcomes available at the time.",
    ],
    "Where can you explain the downside from evidence, and where are you borrowing confidence from a familiar story?",
  ),
};
