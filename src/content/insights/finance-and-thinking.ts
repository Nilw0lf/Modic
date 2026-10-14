import type { Insight } from "./types";

export const financeAndThinking: Insight[] = [
  {
    slug: "compound-interest-explained-formula-fees-inflation",
    title:
      "Compound interest explained: the formula, the fees, and the purchasing power",
    description:
      "Understand compound interest with worked examples, then explore how investment fees, inflation, and uneven returns change the result in Modic's experiments.",
    topic: "Money & investing",
    published: "2026-10-14",
    takeaway:
      "Compounding multiplies growth factors. A useful calculation also states its costs, cash-flow timing, and purchasing-power assumptions.",
    intro:
      "A compound-interest calculator can produce a beautifully precise number without telling you whether its assumptions are plausible. The useful skill is understanding what the number represents. Start with a small calculation you can check by hand, then change one assumption at a time. This guide connects the formula to working experiments so you can distinguish the mechanics of growth from a promise about your future finances.",
    sections: [
      {
        id: "meaning",
        title: "What is compound interest?",
        paragraphs: [
          "Compound interest means interest can earn further interest because it remains in the balance. In an annual fixed-rate example, each year's new balance becomes the next year's starting point. Simple interest instead calculates each period's interest on the original principal. The difference is small at first and can become substantial over repeated periods. Neither description says that a particular investment offers a fixed or guaranteed return.",
          "Open the [compound growth experiment](/effects/compound-growth) and keep the starting amount and rate unchanged while increasing the horizon. Inspect the path rather than only its endpoint. The model isolates repeated multiplication, so it can teach the mechanism clearly. When you apply that mechanism elsewhere, keep the distinction between a known contractual rate and an uncertain investment return visible.",
        ],
      },
      {
        id: "formula",
        title: "The compound-interest formula and what every term means",
        paragraphs: [
          "For principal P, quoted nominal annual rate r, n equal compounding periods per year, and t years, the fixed-rate formula is A=P(1+r/n)^(nt). Write r as a decimal: 5% becomes 0.05. The formula assumes the stated periodic rate applies throughout, interest stays invested, and there are no additional deposits or withdrawals. Changing those conditions changes the calculation you need.",
          "An effective annual rate is already the result of one year's compounding. Do not divide it by twelve and call that an exact monthly conversion. If the effective annual rate is R, the equivalent constant monthly factor is (1+R)^(1/12). Products can have their own conventions; inspect the rate definition rather than assuming two similar-looking percentages mean the same thing.",
        ],
        deeper: {
          title: "Adding regular deposits",
          text: "For deposits C at each period's end and a constant periodic rate i, their future value is C×((1+i)^N−1)/i, plus the compounded initial balance. Beginning-of-period deposits receive one extra factor of (1+i). At i=0, the contribution term is C×N. This identity describes timing under fixed assumptions, not uncertain market performance.",
        },
      },
      {
        id: "worked-example",
        title: "A worked example you can calculate without a spreadsheet",
        paragraphs: [
          "Use 1,000 teaching tokens and a constant 5% annual rate for three years. There are no costs or cash flows. This deliberately small example makes the changing interest base visible and avoids hiding the mechanism behind a thirty-year projection. You can replace the units with any consistent currency, but the rate is an assumption rather than an offered product.",
        ],
        steps: [
          "Year one: 1,000×1.05=1,050. The interest for that year is fifty.",
          "Year two: 1,050×1.05=1,102.50. Interest is now 52.50 because the first year's interest also participates.",
          "Year three: 1,102.50×1.05=1,157.625. Compare with simple interest, which would end at 1,150; the extra 7.625 comes from interest earning interest.",
        ],
      },
      {
        id: "fees",
        title: "Why a small annual fee changes more than one year's bill",
        paragraphs: [
          "The [investment fee drag experiment](/effects/fee-drag) compares two portfolios with the same gross return. One pays an annual percentage charge after that year's growth; the other does not. Read the fees actually paid separately from the final balance gap. Under positive continuing growth, the gap also includes returns the removed capital no longer earns. That is why adding the cash charges alone can understate the ending difference.",
          "The [SEC's fee bulletin](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated) explains why ongoing costs deserve attention. Use a model comparison to understand the arithmetic, then inspect the actual prospectus and fee base. A lower fee does not establish that a service is suitable or that gross returns will be identical. Those are separate judgments from the calculation.",
        ],
      },
      {
        id: "inflation",
        title: "Separate the balance from what it can buy",
        paragraphs: [
          "The [real return and inflation experiment](/effects/real-return) prices an original shopping basket alongside a growing account. It is possible for the balance to rise while the number of baskets affordable falls. If nominal growth is 5% and basket prices rise 8%, the exact annual purchasing-power change is 1.05/1.08−1, about −2.78%. Subtracting the rates gives a rough approximation, not the exact ratio.",
          "When comparing a future target with current expenses, put both in the same units. A nominal future amount and today's purchasing-power target are different descriptions. Your personal basket may also change or rise differently from a general price index. The experiment uses constant invented rates to make this distinction inspectable; it does not forecast inflation or define your household's needs.",
        ],
      },
      {
        id: "uneven-returns",
        title: "Average investment returns are not a fixed interest rate",
        paragraphs: [
          "Try the [volatility drag experiment](/effects/volatility-drag). A 50% gain followed by a 50% loss takes 100 to 150 and then to 75. The arithmetic average is zero, yet the balance is down. Each percentage applies to a different base. A constant average line is a constructed comparison, not evidence that you could buy an asset offering that smooth path.",
          "Cash flows introduce another distinction. In [sequence of returns risk](/effects/sequence-of-returns), rearranging the same return cards can change the final balance when withdrawals occur. Remove the withdrawals and the endpoint becomes order-independent. Keep them and a loss early in the sequence can leave less capital for later gains. A headline average hides both the multiplication and the interaction with cash flows.",
        ],
      },
      {
        id: "calculator-checklist",
        title: "A practical calculator checklist",
        paragraphs: [
          "The [Investor.gov compound-interest calculator](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator) makes starting amounts, contributions, rates, and time explicit. Whatever calculator you use, write down its assumptions beside the result. A number should be reproducible from its inputs, and a scenario should be recognisable as a scenario rather than quietly becoming a forecast.",
          "Compare several plausible assumptions instead of selecting one attractive rate and forgetting it. The goal is to learn which input matters most, where the model is incomplete, and what information you still need. Avoid comparing one calculation with fees and inflation against another without them; an apparently better result can simply be using a more flattering definition of the balance.",
        ],
        checklist: [
          "Is the rate nominal, effective, contractual, or hypothetical?",
          "When do contributions and withdrawals occur?",
          "Which costs and taxes are included?",
          "Is the result nominal money or purchasing power?",
          "What changes if returns vary instead of staying constant?",
        ],
      },
      {
        id: "next-step",
        title: "Use the model to ask a better question",
        paragraphs: [
          "Choose one real calculation you have encountered, such as a savings illustration or a fee comparison. Recreate its assumptions before changing anything. Then alter one input and describe why the outcome changed. This develops a more transferable skill than remembering a large endpoint or a familiar slogan about starting early.",
          "Compounding is powerful as a mathematical relationship, but the inputs remain the important uncertainty. A clear explanation should help you distinguish available resources, future obligations, costs, and risk. It should not turn a teaching curve into an assurance about investment performance. Keep the model useful by keeping its boundaries visible.",
        ],
      },
    ],
    experiments: [
      {
        slug: "compound-growth",
        task: "Keep the rate fixed and lengthen the horizon; identify when interest begins earning noticeable interest.",
      },
      {
        slug: "fee-drag",
        task: "Compare 0.2% and 2% fees under identical gross returns, separating direct charges from the ending gap.",
      },
      {
        slug: "real-return",
        task: "Use the preset where nominal money grows but purchasing power falls.",
      },
    ],
    sources: [
      {
        title: "Investor.gov compound-interest calculator",
        url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
        note: "Official calculator exposing the inputs used in a fixed-assumption illustration.",
      },
      {
        title: "SEC: how fees and expenses affect a portfolio",
        url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated",
        note: "Investor-education reading on costs; no particular product or return is recommended here.",
      },
    ],
    reflection:
      "Which assumption in a growth illustration would change your interpretation most if it were made explicit?",
  },
  {
    slug: "sunk-cost-fallacy-examples-relationships-projects",
    title:
      "Sunk cost fallacy: examples, relationships, and a better next decision",
    description:
      "Learn what the sunk cost fallacy means, distinguish past costs from future consequences, and practise a clear decision process with interactive examples.",
    topic: "Everyday decisions",
    published: "2026-10-14",
    takeaway:
      "A past cost can explain how you arrived here without deciding what is best from here. Compare the future consequences of the available choices.",
    intro:
      "You have already spent months on a project, paid for a course, or invested years in a relationship. Stopping can feel like admitting the whole effort was wasted. The sunk cost fallacy names one way that feeling can distort the next decision. Understanding it does not mean treating people as interchangeable projects or dismissing commitments. It means separating what cannot be recovered from what each available action can still change.",
    sections: [
      {
        id: "definition",
        title: "What does sunk cost fallacy mean?",
        paragraphs: [
          "A sunk cost is a cost that cannot be recovered through the choices now available. The fallacy occurs when that irrecoverable amount becomes a reason to continue even though the forward-looking comparison does not support continuing. The important question is not whether the earlier spending was large. It is whether the next action can change it, and what that action changes instead.",
          "In the [sunk cost fallacy experiment](/effects/sunk-cost-fallacy), distinguish past spending from the future payoffs. Watch what happens to the recommended comparison when only the past cost changes. The model isolates a decision mechanism. Real commitments involve uncertainty, other people, and consequences beyond the simple amounts on the board, so use the exercise to structure questions rather than automate an answer.",
        ],
      },
      {
        id: "distinctions",
        title: "Not every consequence of a past decision is sunk",
        paragraphs: [
          "A nonrefundable ticket is different from a refundable ticket. A previous payment is different from an avoidable cancellation charge. Training already completed may be sunk as an expense while still creating skills that affect what you can do next. Classifying the original spending correctly does not require ignoring every continuing benefit or obligation related to it.",
          "Write separate lines for irrecoverable costs, recoverable resources, future benefits, future costs, and switching consequences. This prevents an overcorrection where someone uses the phrase sunk cost to erase legitimate contractual duties or transition needs. The [opportunity cost experiment](/effects/opportunity-cost) adds another line: what the same time or money could do elsewhere if you stop committing it here.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: finish the project or change direction?",
        paragraphs: [
          "Consider an invented project with eighty tokens already spent, forty needed to finish, and an expected future benefit of thirty. An alternative uses the same remaining time and costs twenty for an expected benefit of thirty-five. These amounts are stipulated teaching values, not a business forecast. They let us compare the future choices without hiding the past spending inside either option.",
        ],
        steps: [
          "Record eighty as irrecoverable under both available choices. Continuing does not make it return, and changing direction does not create a second loss of eighty.",
          "Compare the future net amounts: finishing offers thirty minus forty, or −10; the alternative offers thirty-five minus twenty, or +15, under the stated assumptions.",
          "Check uncertainty, commitments, and switching effects before deciding. If those assumptions remain credible, the future comparison favours changing direction; the eighty explains the history rather than overturning the comparison.",
        ],
      },
      {
        id: "relationships",
        title:
          "How the idea applies to relationships without reducing them to money",
        paragraphs: [
          "People search for sunk cost fallacy in relationships because shared history can feel like an obligation to preserve any current arrangement. But years together do not fit a simple profit formula. Care, trust, responsibilities, mutual willingness to change, and future wellbeing matter. A useful question is whether the relationship's next chapter has a credible path that both people want, rather than whether the past deserves respect.",
          "Acknowledge the past without requiring it to determine the future. Ask what can improve, what evidence supports that possibility, what boundaries or support are needed, and what each person is willing to do. These questions are not a rule to stay or leave. If safety or coercion is involved, a cost-benefit game is the wrong decision tool; appropriate human support and safety take precedence.",
        ],
      },
      {
        id: "mechanisms",
        title: "Why persistence can feel like repairing the original decision",
        paragraphs: [
          "[Arkes and Blumer's research on sunk costs](https://doi.org/10.1016/0749-5978%2885%2990049-4) examines how earlier investments influence subsequent choices. One practical concern is that continuing can feel like proving the first decision was sensible. Yet a new expense does not alter the earlier information or guarantee recovery. A decision made under uncertainty can have been reasonable at the time and still deserve revision now.",
          "In the [disposition effect game](/effects/disposition-effect), a purchase-price label can influence what someone sells even when the forward payoffs stay unchanged. In the [war of attrition game](/effects/war-of-attrition), being last to quit can win the prize while producing an overall loss. These are different concepts, but both make it easier to see why emotionally satisfying persistence and a good prospective outcome can diverge.",
        ],
      },
      {
        id: "decision-routine",
        title: "A five-minute routine before spending more",
        paragraphs: [
          "Begin with the next decision, not a judgment of your entire history. Write what continuing actually requires, what stopping frees up, and which alternative is available. Specify a review date and observable progress rather than making an indefinite promise to give the effort one more chance. A bounded trial can produce information; repeated unbounded extensions can simply postpone evaluation.",
          "[OpenStax's discussion of opportunity cost](https://openstax.org/books/principles-economics-3e/pages/2-1-how-individuals-make-choices-based-on-their-budget-constraint) provides a useful companion: scarce resources have alternative uses. That does not require monetising everything important. It asks which other goal cannot receive attention while this one continues. A clear alternative makes the decision more concrete than a general feeling that you should not waste what you already spent.",
        ],
        checklist: [
          "What past cost is genuinely unrecoverable?",
          "What benefit or obligation still exists regardless of the sunk expense?",
          "What does the next step cost from today?",
          "What is the best available alternative?",
          "What evidence and review date would justify continuing?",
        ],
      },
      {
        id: "misconceptions",
        title:
          "Leaving is not automatically rational, and staying is not automatically a fallacy",
        paragraphs: [
          "Continuing can be sensible when future benefits exceed future costs, when transition consequences are significant, or when another trial is likely to produce valuable information. Stopping can be costly too. The fallacy is not persistence itself; it is using an irrecoverable expense to replace the forward-looking comparison. The same outward action can come from careful reasoning or from a misleading reference point.",
          "Nor should every disappointment trigger a change. Long projects include difficult periods, and many commitments deserve sustained work. The task is to distinguish a credible reason to continue from a refusal to re-evaluate. Ask someone who is not defending the original choice to review the assumptions. Give them enough information to challenge the forecast rather than merely ask them to approve your preferred conclusion.",
        ],
      },
      {
        id: "practice",
        title: "Practise on a low-stakes decision first",
        paragraphs: [
          "Choose an unfinished book, unused subscription, or optional hobby purchase. List what is recoverable and what is not, then compare your next hour with its alternative. A small example makes the distinction easier to practise before applying it to a high-stakes project. It also reveals how often the sentence I already paid for it substitutes for an actual description of future value.",
          "The outcome might be continuing. That is fine if the reason is what the next step offers. Learning this concept is successful when the justification becomes clearer, not when every commitment is abandoned. Respecting effort and revising a decision can coexist. Neither requires pretending the earlier experience had no value.",
        ],
      },
    ],
    experiments: [
      {
        slug: "sunk-cost-fallacy",
        task: "Change past spending while holding future consequences fixed; explain which inputs should affect the next choice.",
      },
      {
        slug: "opportunity-cost",
        task: "Compare the next use of resources with a concrete alternative, rather than with doing nothing.",
      },
      {
        slug: "war-of-attrition",
        task: "Outlast the bot at a high patience limit and inspect whether winning still produces a net loss.",
      },
    ],
    sources: [
      {
        title: "Arkes and Blumer: The psychology of sunk cost",
        url: "https://doi.org/10.1016/0749-5978%2885%2990049-4",
        note: "Original research; the examples in this guide are independently authored teaching scenarios.",
      },
      {
        title: "OpenStax: choices and opportunity cost",
        url: "https://openstax.org/books/principles-economics-3e/pages/2-1-how-individuals-make-choices-based-on-their-budget-constraint",
        note: "Introductory economics reading on comparing alternative uses of limited resources.",
      },
    ],
    reflection:
      "Which commitment would you evaluate differently if you had inherited the situation today rather than made its first decision?",
  },
  {
    slug: "confirmation-bias-examples-how-to-avoid",
    title:
      "Confirmation bias: examples and a practical way to test your beliefs",
    description:
      "Understand confirmation bias through a reasoning game, real decision examples, and a usable checklist for seeking evidence that distinguishes competing explanations.",
    topic: "Thinking clearly",
    published: "2026-10-14",
    takeaway:
      "A useful test is one on which plausible explanations disagree. Another agreeing example may add very little information.",
    intro:
      "Confirmation bias is easy to recognise in somebody else's argument and surprisingly difficult to notice in your own investigation. You may be gathering real evidence, asking sincere questions, and still choosing tests that protect your favourite explanation. This guide develops a practical alternative: write a competing account, predict where it differs, and look for that difference. Modic's reasoning games let you practise the process with immediate feedback.",
    sections: [
      {
        id: "definition",
        title: "What is confirmation bias?",
        paragraphs: [
          "Confirmation bias is a tendency to seek, interpret, or remember evidence in ways that favour an existing belief. It is broader than deliberately ignoring facts. A person can run a test honestly yet choose examples that would fit several possible explanations. The test returns true information, but that information may not identify the explanation the person thinks it confirms.",
          "[Nickerson's review of confirmation bias](https://www.waikato.ac.nz/assets/Uploads/News-and-events/News/2021/nickerson1998.pdf) surveys this broader pattern. Use the idea as a question about your process rather than an insult or a diagnosis. Disagreeing with you does not establish that someone is biased, and having a strong belief does not make that belief false. The issue is how evidence is selected and weighed.",
        ],
      },
      {
        id: "game",
        title: "Start with a rule you can actually test",
        paragraphs: [
          "Open the [confirmation bias experiment](/effects/confirmation-bias) before reading the next section if you want to try its hidden rule unaided. The opening sequence is 2, 4, 6. You can submit triples and receive truthful feedback about whether they fit. Your first explanation might focus on even numbers, equal spacing, ascending order, or some combination. The exercise asks what each test can actually tell you.",
          "A triple such as 8, 10, 12 can fit both equal-spaced even numbers and a broader increasing-number rule. Acceptance therefore does not distinguish those hypotheses. Repeating similar accepted examples can increase confidence without narrowing the explanation. This is a small, noiseless task; real decisions are messier, but the difference between confirming and discriminating evidence still transfers.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: design a test that separates two rules",
        paragraphs: [
          "This walkthrough reveals the task's rule, so play first if you want the surprise. Suppose your candidate explanation requires equally spaced even numbers, while a rival explanation accepts any strictly increasing triple. Both fit the opening example. The useful next test is something the rival accepts and your first rule rejects, rather than another obvious fit for both.",
        ],
        steps: [
          "Write the two hypotheses explicitly. For the narrow rule, 1, 2, 9 should be rejected; for the increasing-number rule, it should be accepted.",
          "Submit 1, 2, 9. The game's acceptance rules out the narrow hypothesis as the complete rule, although it does not by itself prove every detail of the broader one.",
          "Test a descending or repeated-number triple, then compare the pattern of feedback. Reveal the rule only after recording what would make each explanation fail.",
        ],
      },
      {
        id: "everyday-examples",
        title: "Examples in work, health information, and investing",
        paragraphs: [
          "A team believes a discount caused a sales increase. It lists successful discounted weeks but does not compare similar weeks without discounts or check whether advertising changed simultaneously. An investor expects a company to recover and reads only commentary agreeing with that forecast. A reader researching a symptom searches for one feared explanation rather than a range of possibilities. In each case, the search can become organised around preserving a conclusion.",
          "The corrective move is not to give every explanation equal weight. Some have weak support, and expertise matters. Ask what relevant observation separates credible alternatives. For a business decision, that might be a comparison group or a pilot. For a consequential health question, it may mean using qualified medical evaluation rather than trying to diagnose yourself through selective search results. The concept improves the evidence process; it does not replace domain expertise.",
        ],
      },
      {
        id: "selection",
        title: "Ask what evidence would be expected under the alternative",
        paragraphs: [
          "[Wason's original hypothesis-testing paper](https://doi.org/10.1080/17470216008416717) supplies the historical reasoning-task context. The game is a teaching implementation, not a personality test. Its central lesson is to compare predictions from rival rules. Before gathering more evidence, write the result each explanation predicts. An observation shared by both can be real and useful, yet weak for choosing between them.",
          "The [Wason selection task](/effects/wason-selection) offers another chance to inspect whether a selected case could expose a rule violation. The [Bayesian updating experiment](/effects/bayesian-updating) then shows why evidence should change confidence in relation to its likelihood, not merely its emotional vividness. These tools address different parts of reasoning: choosing the observation and interpreting what it means after it arrives.",
        ],
      },
      {
        id: "routine",
        title: "A practical confirmation-bias checklist",
        paragraphs: [
          "Before making a consequential choice, write one sentence for the favoured explanation and one for a plausible rival. Specify a result that would reduce confidence in the first. Record the prediction before you observe the outcome, because after-the-fact explanations can make almost any result seem expected. You do not need an elaborate research programme to make a small decision more falsifiable.",
          "Ask a colleague to challenge the evidence selection, not simply argue for the opposite conclusion. A productive review might ask whether the sample excludes failures, whether a changed denominator explains the result, or whether your proposed test would come out the same under the rival. The [value of information experiment](/effects/value-of-information) helps distinguish useful investigation from collecting more material that cannot change the action.",
        ],
        checklist: [
          "What exactly do I believe, and how confident am I?",
          "What plausible alternative fits what I already observed?",
          "Where do the alternatives make different predictions?",
          "What result would make me revise my view?",
          "Could the information change my decision enough to justify collecting it?",
        ],
      },
      {
        id: "misconception",
        title: "Avoid two common overcorrections",
        paragraphs: [
          "First, searching for disconfirming evidence does not require abandoning a well-supported belief after one anomaly. Measurements can be noisy and observations can be mistaken. Inspect reliability and the total body of evidence. A good process makes revision possible without making confidence infinitely fragile. The noiseless yes/no game deliberately omits this important real-world complication.",
          "Second, balance is not achieved by giving unsupported claims the same credibility as established evidence. A serious rival needs a reason to be considered. Your aim is to find informative differences between plausible explanations, not to manufacture uncertainty around every conclusion. Clear thinking includes both openness to correction and proportionate weighting of the available evidence.",
        ],
      },
      {
        id: "practice",
        title: "Try a small decision log",
        paragraphs: [
          "Choose a question you will revisit within a month. Record the hypothesis, rival, predicted result, planned observation, and action you would take under each outcome. When the review date arrives, compare the original predictions with the evidence. Notice whether you are changing the success definition after seeing the result or explaining away the result that previously would have mattered.",
          "The benefit is not a badge proving you have eliminated bias. It is an inspectable record that makes your reasoning easier to revise. Keep the scope small enough to complete. One carefully chosen observation can teach more than a folder full of agreeable examples, especially when you can explain why that observation distinguished the alternatives.",
        ],
      },
    ],
    experiments: [
      {
        slug: "confirmation-bias",
        task: "Write two candidate rules and choose a triple on which their predictions differ.",
      },
      {
        slug: "wason-selection",
        task: "Choose cases capable of exposing a rule violation rather than only a confirming example.",
      },
      {
        slug: "bayesian-updating",
        task: "Compare how evidence changes a prior belief under different likelihood assumptions.",
      },
    ],
    sources: [
      {
        title: "Nickerson: Confirmation bias review",
        url: "https://www.waikato.ac.nz/assets/Uploads/News-and-events/News/2021/nickerson1998.pdf",
        note: "Research review hosted by a university; the checklist here is an original practical application.",
      },
      {
        title: "Wason: failure to eliminate hypotheses",
        url: "https://doi.org/10.1080/17470216008416717",
        note: "Original hypothesis-testing research that provides context for the interactive rule task.",
      },
    ],
    reflection:
      "What observation would genuinely reduce confidence in a belief you are currently trying to confirm?",
  },
  {
    slug: "portfolio-diversification-explained-correlation-rebalancing",
    title:
      "Portfolio diversification explained: correlation, concentration, and rebalancing",
    description:
      "Learn why owning more investments is not enough, how correlation changes diversification, and what rebalancing can and cannot do through practical simulations.",
    topic: "Money & investing",
    published: "2026-10-14",
    takeaway:
      "Diversification depends on how exposures move together. Counting holdings does not reveal their shared risks or preserve a target allocation.",
    intro:
      "A portfolio can contain dozens of holdings and still make one large bet. Different names may rely on the same customers, financing conditions, geography, or market narrative. To understand diversification, move beyond the count of positions and inspect their weights and relationships. This guide uses Modic's existing two-exposure model and the new rebalancing game to make those relationships concrete without recommending particular investments.",
    sections: [
      {
        id: "meaning",
        title: "What is portfolio diversification?",
        paragraphs: [
          "Diversification spreads exposure across holdings whose outcomes are not identical. It can reduce the influence of a single adverse outcome and, under a specified model, reduce aggregate variability. It cannot guarantee a gain or eliminate every shared shock. Different investments can still respond similarly to inflation, funding pressure, or a broad change in risk appetite.",
          "The [SEC's asset-allocation guidance](https://www.investor.gov/introduction-investing/getting-started/asset-allocation) distinguishes spreading holdings from selecting an overall asset mix. Those are related decisions, but neither is determined by counting positions. A portfolio's purpose, horizon, liquidity needs, and risk tolerance matter. This article explains the model mechanics rather than providing a suitable allocation for an individual reader.",
        ],
      },
      {
        id: "correlation",
        title: "Why correlation matters more than a list of names",
        paragraphs: [
          "Correlation measures how two quantities tend to vary together, under a specified measurement period and definition. In the [diversification experiment](/effects/diversification), both hypothetical exposures have standard deviation ten. The correlation control changes how much their fluctuations offset or reinforce each other. It does not change a company's quality, expected return, or valuation; those features are deliberately outside this model.",
          "A zero correlation does not mean that two real assets can never fall together. A positive correlation does not mean they move identically every day. Historical estimates depend on the data window, and relationships can change. Use the model to understand a conditional relationship, then ask how reliable the estimated inputs would be before using the result as a description of a real portfolio.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: two equally variable exposures",
        paragraphs: [
          "Take two invented exposures with standard deviation ten each and put half the portfolio in each. The formula combines their variances and covariance. These units are abstract model variability, not forecast annual percentage returns or a recommendation to use a 50/50 investment mix. The equal inputs keep the effect of correlation easy to inspect.",
        ],
        steps: [
          "Set the share in A to 50% and correlation to zero. Combined standard deviation is 10×√0.5, about 7.07 units.",
          "Keep the weights unchanged and raise correlation to +1. Combined variability becomes ten: splitting between perfectly co-moving exposures produces no offset in this model.",
          "Set correlation to −1. Equal opposite fluctuations cancel in this idealised pair, giving zero variability; exact persistent cancellation is a strong assumption, not a realistic guarantee to pursue from this game.",
        ],
      },
      {
        id: "math",
        title: "The portfolio formula tells you which inputs matter",
        paragraphs: [
          "For weight w in A, weight 1−w in B, equal standard deviation σ, and correlation ρ, the model's standard deviation is σ×√(w²+(1−w)²+2ρw(1−w)). Weights and correlation both matter. A portfolio mostly concentrated in A behaves differently from an equal split even when the holdings are the same. Unequal real-world asset volatilities require the more general covariance formula.",
          "[Markowitz's Nobel lecture](https://www.nobelprize.org/uploads/2018/06/markowitz-lecture.pdf) provides foundational portfolio-theory context. The interactive model is intentionally smaller than a portfolio optimisation problem. It does not estimate expected returns or select an efficient frontier. Its value is letting you see one relationship clearly before dealing with the uncertainty of inputs and the competing objectives of an actual investment plan.",
        ],
        deeper: {
          title: "Different variability in the two holdings",
          text: "The general two-asset variance is w²σA²+(1−w)²σB²+2w(1−w)ρσAσB. Taking its square root gives standard deviation. An apparently balanced money allocation can still have unbalanced variability contributions when σA and σB differ.",
        },
      },
      {
        id: "concentration",
        title: "Look for shared mechanisms and outsized weights",
        paragraphs: [
          "Write down the biggest positions and the mechanisms each depends on. A broad-sounding set may still be concentrated in one industry, customer base, country, or financing environment. You do not need to calculate a precise correlation to identify that all the holdings need the same favourable event. This qualitative map complements, rather than replaces, the quantitative measurement.",
          "The [Pareto concentration experiment](/effects/pareto-concentration) helps separate the number of contributors from the share dominated by the largest ones. A portfolio's exposure can be concentrated even when the small tail contains many names. Ask how a loss in the largest holding affects the whole, and whether a shared event could hurt several of the largest positions together.",
        ],
      },
      {
        id: "rebalancing",
        title: "Why a target mix drifts—and what restoring it costs",
        paragraphs: [
          "In the [portfolio rebalancing game](/effects/portfolio-rebalancing), start with 500 tokens in each fictional asset. Reveal a market round and inspect how unequal returns change the weights. A 20% gain in A with no change in B leaves 600 and 500, so A is about 54.55% of the total. The allocation changed even though you did not choose a new target.",
          "Restoring the target reduces that drift but incurs the game's disclosed charge on the pre-fee one-way transfer. Compare with the untouched portfolio under the same shocks. Rebalancing may help on a reversing path or trail when one asset keeps outperforming. It controls exposure; it does not create a guaranteed return premium. Real taxes, spreads, and contribution flows introduce further choices omitted by this short game.",
        ],
      },
      {
        id: "risk-boundaries",
        title: "Diversification is not a substitute for sizing risk",
        paragraphs: [
          "A portfolio can be spread across holdings yet still expose essential resources to losses it cannot tolerate. The [gambler's ruin experiment](/effects/gamblers-ruin) explores how repeated bets and stakes interact with a failure threshold. It is not an investment-market model, but it makes an important boundary tangible: surviving long enough to use future opportunities depends on more than an attractive average outcome.",
          "Likewise, borrowed exposure can introduce maintenance demands regardless of how many holdings you own. The [margin-call game](/effects/margin-calls) keeps debt visible while assets move. Diversification and leverage answer different questions. A collection of correlated positions financed with debt can combine a shared loss with forced action, making the financing arrangement part of the risk analysis.",
        ],
      },
      {
        id: "checklist",
        title: "A practical diversification review",
        paragraphs: [
          "Create a one-page exposure map before searching for another holding to add. Record the major weights, common drivers, expected cash needs, and the reasons behind the target mix. Then ask which new information would change that map. If a new holding shares the dominant driver, adding its name may add complexity without addressing the concentration you meant to reduce.",
          "Keep the distinction between model output and evidence. A calculator can show precisely what a chosen correlation implies without showing whether that correlation will persist. Document estimates as estimates, and review exposure when circumstances change. Good learning makes the dependencies legible; it does not supply an allocation that remains appropriate for every reader and every market.",
        ],
        checklist: [
          "Which positions dominate the total weight?",
          "Which underlying events affect several holdings at once?",
          "How were variability and correlation estimated?",
          "Has the allocation drifted from its intended purpose?",
          "What liquidity, debt, tax, or trading-cost constraints affect changes?",
        ],
      },
    ],
    experiments: [
      {
        slug: "diversification",
        task: "Hold weights at 50/50 and compare correlations −1, 0, and +1.",
      },
      {
        slug: "portfolio-rebalancing",
        task: "Reveal unequal returns and decide whether the changed exposure justifies a trade at the stated fee.",
      },
      {
        slug: "pareto-concentration",
        task: "Compare the number of contributors with the fraction dominated by the largest contributors.",
      },
    ],
    sources: [
      {
        title: "SEC: asset allocation and diversification",
        url: "https://www.investor.gov/introduction-investing/getting-started/asset-allocation",
        note: "Official investor education; individual suitability is outside this tutorial.",
      },
      {
        title: "Markowitz: Foundations of Portfolio Theory",
        url: "https://www.nobelprize.org/uploads/2018/06/markowitz-lecture.pdf",
        note: "Primary lecture on portfolio theory; Modic's two-asset board isolates one covariance relationship.",
      },
    ],
    reflection:
      "If you grouped your holdings by the event they depend on rather than their names, how diversified would the portfolio look?",
  },
  {
    slug: "naval-ravikant-wealth-specific-knowledge-leverage",
    title:
      "Naval Ravikant's wealth ideas: specific knowledge, leverage, and a practical experiment",
    description:
      "Explore Naval's ideas about wealth, specific knowledge, and code or media leverage, with business-building games and a small, evidence-seeking project plan.",
    topic: "Work & wealth",
    published: "2026-10-14",
    takeaway:
      "A useful capability, reusable output, and genuine demand are different requirements. Test them separately before treating a wealth principle as an income forecast.",
    intro:
      "Naval Ravikant's ideas about wealth are often compressed into slogans about building once or finding unique knowledge. Those phrases can start a useful inquiry, but they can also hide the difficult work of solving a problem and reaching people who need the solution. This guide reads the ideas as a set of questions you can test. Modic's original games provide simplified decision environments; their points and income equations are teaching devices, not formulas supplied or endorsed by Naval.",
    sections: [
      {
        id: "framework",
        title: "Start with the actual idea, not a get-rich shortcut",
        paragraphs: [
          "In [Naval's How to Get Rich conversations](https://nav.al/rich), knowledge, accountability, judgment, and leverage appear as complementary ingredients. Code and media can be reusable forms of output; financial capital and labour introduce other kinds of scale and dependence. The framework is worth reading in context. None of those ingredients supplies a guaranteed opportunity, audience, or income level on its own.",
          "For a practical application, separate four questions: which problem can you understand, what useful output can you create, how will it reach people, and what evidence would show it works? Those questions make the framework operational without treating a successful author's perspective as an empirical forecast for every reader. Modic's games isolate small tradeoffs, leaving the harder business uncertainties visible.",
        ],
      },
      {
        id: "specific",
        title:
          "Specific knowledge is easier to investigate through a concrete problem",
        paragraphs: [
          "The [specific knowledge game](/effects/specific-knowledge) asks you to combine three skills for a disclosed customer brief. Coding, logistics, and data analysis fit the local delivery-tool task; design, teaching, and writing fit the educational task. The point is not that these combinations are universally best. It is that usefulness depends on a problem and on how capabilities complement each other.",
          "Look for evidence from projects, recurring questions people ask you, or unusual combinations of experience. Avoid turning the concept into a test of whether you were born exceptional. A capability can grow through practice and feedback. Ask what someone can do better after using your work, and whether you can demonstrate that improvement with a small output rather than a broad personal-brand claim.",
        ],
      },
      {
        id: "leverage",
        title: "Reusable output changes costs; it does not create demand",
        paragraphs: [
          "In [permissionless leverage](/effects/permissionless-leverage), divide a twelve-hour studio week between service work and building a reusable product. A supplied audience can use the product repeatedly, with a smaller delivery charge per use. Try the small and large audiences before repeating distribution. The first build has a cost, while later distributions reuse it. A low-copying-cost output can still lose money on its first launch.",
          "The supplied audience is a deliberate simplification. In the real world, distribution, trust, support, competition, and maintenance consume effort too. Do not read the score as a forecast. Instead, explain which cost repeats with every customer and which is shared across many uses. A template, article, or small tool can make that distinction tangible without requiring a large startup or an elaborate launch.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: a small tool before a large business",
        paragraphs: [
          "Imagine someone with experience helping local shops who wants to create a simple delivery tracker. This is an original teaching scenario, not a case study of an actual company. The immediate goal is to test usefulness and distribution before investing months in a polished platform. Use the game for cost intuition, then replace its assumed demand with observations from real conversations.",
        ],
        steps: [
          "Define one task: help a shop see delayed deliveries without opening several spreadsheets. Identify the domain knowledge and delivery skills needed for that task.",
          "Build the smallest usable output and have one willing user try it on a real workflow. Record where it saves effort, where it causes confusion, and what support it requires.",
          "Only then test repeat use or distribution to another user. Compare the new delivery and support cost with the work reused from the first version; revise before expanding.",
        ],
      },
      {
        id: "opportunity-cost",
        title: "Include the work you are giving up",
        paragraphs: [
          "The [opportunity cost experiment](/effects/opportunity-cost) is a useful companion to the studio game. Hours spent building cannot simultaneously produce the same service output. If you compare a product's revenue with zero, you can make an expensive experiment look attractive. Compare it with a real available alternative, while recognising that learning and future options can also have value.",
          "A small experiment can be worthwhile even when its first return is low, provided you can explain what it teaches and how you will limit the downside. The [explore or exploit experiment](/effects/multi-armed-bandit) examines spending effort on an uncertain option versus a currently better-known one. It does not tell you which career to choose; it makes the cost of learning and the benefit of better information visible.",
        ],
      },
      {
        id: "long-term",
        title: "Long-term thinking needs feedback and boundaries",
        paragraphs: [
          "[Naval's discussion of long-term games](https://nav.al/long-term) emphasises continuity in relationships and repeated work. In a practical project, continuity can help experience, trust, and useful output accumulate. It should not mean ignoring evidence of failure or giving an experiment an unlimited budget. A durable effort still needs criteria for improvement and a reason the next step is valuable.",
          "Use the [compound growth experiment](/effects/compound-growth) as a mathematical analogy for repeated accumulation, not as proof that every relationship or skill grows at a fixed percentage. Real learning can plateau, outputs can become obsolete, and cooperation can break down. Define what is accumulating in your situation and what would interrupt it. A metaphor becomes more useful when its limits are clear.",
        ],
      },
      {
        id: "judgment",
        title: "Do not confuse more reach with better judgment",
        paragraphs: [
          "Reusable output can distribute a mistake as efficiently as a good idea. That makes verification and context important. The [circle of competence game](/effects/circle-of-competence) encourages inspecting the range of outcomes you can justify before buying or passing an offer. Its reliable ranges are invented, but the habit of marking what you understand and what you are assuming transfers to a business decision.",
          "Consider the cost of being wrong for the person using the output, not only for its creator. A helpful design makes uncertainty, limitations, and support needs visible. Scaling an unclear explanation or unreliable tool can increase confusion rather than value. Accountability can be practised through honest claims, a way to receive corrections, and a willingness to fix what your work gets wrong.",
        ],
      },
      {
        id: "plan",
        title: "A practical two-week learning project",
        paragraphs: [
          "Pick a problem small enough to investigate in two weeks. The objective is not to establish that you have discovered your lifelong source of wealth. It is to complete a learning loop: understand a need, make an output, observe its use, and compare the result with your original expectation. Choose an effort limit that leaves essential responsibilities intact.",
          "Finish with a short decision note. Describe what worked, what did not, what was actually reusable, and what you still assumed about demand. Decide whether the next small step earns its time. This gives you evidence that slogans cannot provide. Repeatable learning can be a useful outcome even when the first project does not become a business.",
        ],
        checklist: [
          "One concrete user and task, rather than a broad audience promise.",
          "A small output demonstrating the relevant capability.",
          "A record of actual use, support needs, and feedback.",
          "An explicit time and spending limit.",
          "A next-step decision based on what changed, not on how inspiring the framework sounded.",
        ],
      },
    ],
    experiments: [
      {
        slug: "specific-knowledge",
        task: "Complete one customer brief, then switch briefs and inspect which capabilities transfer.",
      },
      {
        slug: "permissionless-leverage",
        task: "Compare a tiny audience with a larger one and separate build costs from repeat delivery.",
      },
      {
        slug: "opportunity-cost",
        task: "Describe the available alternative to the hours used by a new project.",
      },
    ],
    sources: [
      {
        title: "Naval Ravikant: How to Get Rich",
        url: "https://nav.al/rich",
        note: "Primary conversations; the studio equations and examples here are Modic's independent teaching design.",
      },
      {
        title: "Naval Ravikant: Play long-term games with long-term people",
        url: "https://nav.al/long-term",
        note: "Primary discussion of continuity and long-term thinking, not a promise of fixed compounding rates.",
      },
    ],
    reflection:
      "What small useful output would test both your knowledge of a problem and whether someone wants the solution?",
  },
];
