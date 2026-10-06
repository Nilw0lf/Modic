import type { Insight } from "./types";

export const uncertainty: Insight[] = [
  {
    slug: "prediction-market-probabilities-explained",
    title: "What a 70% prediction-market probability actually means",
    description:
      "Read prediction-market prices more carefully: check the contract, liquidity, shared information, calibration, and the difference between a forecast and a decision.",
    topic: "Information & forecasts",
    published: "2026-10-07",
    takeaway:
      "A probability is an uncertain estimate about a precisely defined event. It is neither a promise nor an instruction to act.",
    intro:
      "A screenshot says an event has a 70% chance. It looks more precise than an analyst saying 'probably', so it is easy to treat the number as a fact about the future. But the meaning depends on the event definition, the market structure, the information available, and the time of the observation. You can learn to read these numbers without participating in a market or treating them as investment advice.",
    sections: [
      {
        id: "why-now",
        title: "Why these numbers need a reading guide",
        paragraphs: [
          "Prediction markets have attracted regulatory attention in 2026, including the [CFTC's March 2026 advance notice on prediction markets](https://www.cftc.gov/LawRegulation/FederalRegister/proposedrules/2026-05105.html). A consultation is not a final rule, and rules vary by jurisdiction. The useful educational question here is how to interpret a probability appearing in a headline, rather than which platform to use.",
          "Start by refusing to round a probability into certainty. A forecast of 70% leaves substantial room for the event not to happen. If the event fails to occur once, that does not by itself show that the forecast was foolish. To evaluate a forecasting method, you need many recorded forecasts and their outcomes.",
        ],
      },
      {
        id: "contract",
        title: "Read the event definition before the price",
        paragraphs: [
          "What exactly must happen, by what deadline, according to which source, for the contract to resolve? 'A policy will be announced' is different from 'a policy will take effect'. 'A candidate will win a nomination' is different from 'a candidate will hold office'. A screenshot can hide those distinctions while retaining the dramatic percentage.",
          "Also identify the quote. A last trade, an executable bid, an executable ask, and a displayed midpoint are not identical. Thin activity or a wide bid–ask spread can make one price a poor summary of what people can actually transact at. Treat the number as dated information from a particular mechanism, not as a timeless probability handed down by the crowd.",
        ],
      },
      {
        id: "crowds",
        title: "When many participants help—and when they do not",
        paragraphs: [
          "The [wisdom of crowds experiment](/effects/wisdom-of-crowds) lets you inspect what happens when independent errors average out, and what happens when estimates share a bias. Markets can aggregate information, but participants may rely on the same report, face similar incentives, or have unequal resources. Participation is not a guarantee of diverse evidence.",
          "Compare that with [information cascades](/effects/information-cascade). People may infer that earlier participants knew something and follow their action. The model does not reproduce a real trading venue; it helps identify a question worth asking: is the new movement based on new information, or on other people reacting to the same old information?",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: a project launch forecast",
        paragraphs: [
          "Imagine an illustrative internal forecast that a project will launch before Friday has risen from 40% to 70%. This is not a live market quote. The interpretation changes depending on why the estimate moved. A signed-off dependency is different evidence from a dozen colleagues repeating an optimistic comment.",
        ],
        steps: [
          "Define launch precisely: available to which users, with which required functions, by what time zone and deadline?",
          "Identify the new evidence and whether it is independent. Use [Bayesian updating](/effects/bayesian-updating) to see how the diagnostic strength of evidence matters.",
          "Keep a contingency for delay. Decide whether preparing it costs less than being unprepared, rather than assuming 70% makes preparation unnecessary.",
        ],
      },
      {
        id: "calibration",
        title: "Check calibration across forecasts",
        paragraphs: [
          "A well-calibrated collection of 70% forecasts should resolve positively about 70% of the time over an appropriate collection of comparable cases. That is a long-run property, not something one event can reveal. You also need enough observations and an evaluation set chosen before inspecting which examples make the forecaster look good.",
          "[Brier's original paper on probability forecasts](https://journals.ametsoc.org/doi/abs/10.1175/1520-0493%281950%29078%3C0001%3AVOFEIT%3E2.0.CO%3B2) provides a foundation for scoring probabilistic predictions. For a simple binary event, the commonly used score is the squared difference between the probability and the outcome coded as zero or one. Smaller is better. Evaluation should also compare against a sensible baseline, not only against another confident commentator.",
        ],
        deeper: {
          title: "A small scoring example",
          text: "For a binary event, a forecast of 0.7 scores (0.7 − 1)² = 0.09 if the event occurs, or (0.7 − 0)² = 0.49 if it does not. Average scores over a predefined set. One lucky correct call does not establish skill, and calibration alone does not show that forecasts distinguish easy cases from difficult ones.",
        },
      },
      {
        id: "action",
        title: "Convert a forecast into a decision carefully",
        paragraphs: [
          "The same probability can imply different actions for different people. If a delay would be mildly inconvenient, an expensive backup may not be worthwhile. If a delay would interrupt a critical service, the same forecast could support preparing a backup. Probability is one input; consequences and the available alternatives are other inputs.",
          "Explore [value of information](/effects/value-of-information) before chasing every update. Ask which missing fact could actually change your decision. A small movement from 70% to 72% may be irrelevant if your action remains the same. More decimal places can create the appearance of useful precision without supplying decision-relevant knowledge.",
        ],
        checklist: [
          "Read the event, deadline, and resolution rule.",
          "Identify the quote and the observation time.",
          "Ask what independent information changed.",
          "Separate forecast evaluation from your own decision costs.",
        ],
      },
      {
        id: "limits",
        title: "A useful number can still be an imperfect number",
        paragraphs: [
          "Fees, risk preferences, market access, liquidity, and contract design can complicate a direct price-to-probability interpretation. Treat a market estimate as one source to compare with other forecasts and evidence. Do not average several sources as though they are independent when all of them are copying the same signal.",
          "You can practise the skill with ordinary forecasts: delivery dates, exam preparation, or whether a meeting will finish on time. Record a probability before the outcome, define the event, and review a collection later. The learning comes from making uncertainty explicit and being accountable to evidence, not from finding the most dramatic screenshot.",
        ],
      },
    ],
    experiments: [
      {
        slug: "wisdom-of-crowds",
        task: "Compare independent estimates with a crowd sharing the same error.",
      },
      {
        slug: "bayesian-updating",
        task: "Change the strength of new evidence rather than simply counting opinions.",
      },
      {
        slug: "value-of-information",
        task: "Find which additional fact could change the action you take.",
      },
    ],
    sources: [
      {
        title: "CFTC — Prediction markets advance notice",
        url: "https://www.cftc.gov/LawRegulation/FederalRegister/proposedrules/2026-05105.html",
        note: "2026 · Regulatory consultation; not a final rule or platform recommendation.",
      },
      {
        title:
          "Glenn Brier — Verification of forecasts expressed in terms of probability",
        url: "https://journals.ametsoc.org/doi/abs/10.1175/1520-0493%281950%29078%3C0001%3AVOFEIT%3E2.0.CO%3B2",
        note: "1950 · Original probability-forecast scoring research.",
      },
    ],
    reflection:
      "What precise event would you define before assigning a probability to your next prediction?",
  },
  {
    slug: "el-nino-forecast-probability-planning",
    title: "El Niño forecasts: turn climate probabilities into a useful plan",
    description:
      "Learn what an El Niño forecast does and does not say about local weather, then use scenarios, base rates, and low-regret preparation to make a practical plan.",
    topic: "Systems & climate",
    published: "2026-10-07",
    takeaway:
      "A high probability of a climate pattern is not the same as certainty about weather at your address.",
    intro:
      "A seasonal outlook can sound decisive while leaving your practical question unanswered: should you change an outdoor event, a delivery schedule, or a backup plan? The missing step is often the connection between a broad climate pattern and the particular exposure you care about. Rather than treating a global forecast as a local instruction, use it as a reason to consult regional information and think through plausible consequences.",
    sections: [
      {
        id: "why-now",
        title: "Start with the dated forecast",
        paragraphs: [
          "The [WMO's September 2026 El Niño update](https://wmo.int/resources/publication-series/el-ninola-nina-updates/august-2026) reports firmly established El Niño conditions and a very high likelihood of persistence into early 2027. This is the outlook available when this article was written. Readers planning a later event should consult the newest update rather than treating this article as a live forecast.",
          "El Niño refers to a large-scale ocean–atmosphere pattern in the tropical Pacific. Its influence on temperature and rainfall varies across regions and seasons. A strong signal about the pattern does not specify the exact temperature, rainfall, or impact for one town on one day.",
        ],
      },
      {
        id: "three-questions",
        title: "Keep three probabilities separate",
        paragraphs: [
          "First, how likely is the large-scale climate pattern? Second, given that pattern and other conditions, how likely is a relevant local weather outcome? Third, if that outcome occurs, how likely is your activity to be disrupted? Collapsing these into one number removes the part of the analysis most connected to your own circumstances.",
          "For example, above-normal seasonal temperature is not a daily heat warning. A rainy season does not tell you which afternoon will be wet. Exposure also matters: two organisations in the same city can face different disruption because one works indoors and the other depends on outdoor equipment.",
        ],
      },
      {
        id: "base-rates",
        title: "Ask what 'above normal' means",
        paragraphs: [
          "A forecast category depends on a reference period and a definition. 'Above normal' is a comparison with a climatological baseline, not automatically a statement about an absolute dangerous threshold. Read the legend, the region, the lead time, and the baseline before interpreting the colour on a map.",
          "The [base rate experiment](/effects/base-rate-neglect) develops the habit of keeping the starting frequency in view. It does not model climate. Use its lesson to ask what normally happens in the relevant place and season, then how the forecast changes that distribution. For local warnings and safety instructions, consult the national or local meteorological service.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: planning an outdoor workshop",
        paragraphs: [
          "Imagine a community organiser deciding whether to reserve an indoor backup for a workshop several months away. All costs below are invented planning units, not a weather forecast or market price. Suppose holding the backup costs 50 units, and a weather-related cancellation would cost 300 units if no alternative exists.",
        ],
        steps: [
          "Define the disruption: weather that prevents the planned outdoor activity, not simply the presence of El Niño.",
          "In a simplified comparison where the backup completely avoids a 300-unit loss, 50 / 300 gives a break-even disruption probability of about 17%. Treat that as a sensitivity calculation, not an estimated local probability.",
          "Seek a regional outlook and test several plausible probabilities. Check the backup's limitations, cancellation terms, and the people affected before choosing a plan.",
        ],
      },
      {
        id: "robustness",
        title: "Prefer preparation that helps across scenarios",
        paragraphs: [
          "An action can be useful even if the specific forecast changes. Clarifying decision authority, checking equipment, agreeing communication channels, or choosing a flexible booking may help under several kinds of disruption. The [optionality experiment](/effects/optionality) offers a way to compare reversible choices with commitments that leave little room to respond.",
          "Low-regret does not mean free or automatically correct. A backup can consume money, time, or scarce space. Write down both its cost and the scenarios in which it helps. If an option only protects against one narrow event, consider whether a simpler arrangement covers several risks.",
        ],
      },
      {
        id: "updates",
        title: "Decide when new information should change the plan",
        paragraphs: [
          "Set review dates that match the decision. A seasonal outlook may inform early reservations; a short-range local forecast may inform the final schedule. Waiting for certainty can be costly if alternatives disappear, but committing too early can also waste flexibility. Identify the last useful date for each action.",
          "Try [Bayesian updating](/effects/bayesian-updating) to practise changing a belief when genuinely new evidence arrives. Then use [value of information](/effects/value-of-information) to ask whether another update could change your choice. Repeatedly checking the same forecast is not necessarily a better preparation process.",
        ],
        checklist: [
          "Name the local disruption you are planning for.",
          "Use the newest regional information and official warnings.",
          "Compare several plausible scenarios and their consequences.",
          "Set a review date and a clear trigger for changing the plan.",
        ],
      },
      {
        id: "limits",
        title: "Use the right source for the right decision",
        paragraphs: [
          "WMO's [El Niño and La Niña background](https://public.wmo.int/themes/el-nino-la-nina-phenomena) explains the broader phenomenon. Local forecasting services supply the location-specific information a real operational decision needs. Neither this article nor Modic's experiments are weather, medical, or emergency-warning tools.",
          "The transferable skill is to move from a headline probability to a defined exposure, a set of options, and an update schedule. You do not need to forecast every detail correctly to make a plan that handles more than one plausible future. You do need to know which assumptions your plan depends on and when those assumptions should be reviewed.",
        ],
      },
    ],
    experiments: [
      {
        slug: "base-rate-neglect",
        task: "Keep the background frequency separate from the new signal.",
      },
      {
        slug: "optionality",
        task: "Compare a flexible backup with an irreversible commitment.",
      },
      {
        slug: "value-of-information",
        task: "Ask whether waiting for another forecast could improve the decision.",
      },
    ],
    sources: [
      {
        title: "WMO — El Niño/La Niña Update, August 2026",
        url: "https://wmo.int/resources/publication-series/el-ninola-nina-updates/august-2026",
        note: "Published 3 September 2026 · Dated seasonal outlook; consult newer updates for current planning.",
      },
      {
        title: "WMO — El Niño / La Niña phenomena",
        url: "https://public.wmo.int/themes/el-nino-la-nina-phenomena",
        note: "Background and links to monitoring; regional impacts vary.",
      },
    ],
    reflection:
      "What preparation would remain useful even if the specific forecast turned out differently?",
  },
  {
    slug: "tariffs-supply-chains-bullwhip-effect",
    title: "Tariffs, panic orders, and the bullwhip effect in supply chains",
    description:
      "See how policy uncertainty, delayed deliveries, and duplicate orders can amplify supply-chain swings. Use a practical inventory-position check before reacting.",
    topic: "Markets & systems",
    published: "2026-10-07",
    takeaway:
      "Orders are not the same as final demand. Before reacting to a shortage, count what is already on the way.",
    intro:
      "When prices or trade rules may change, ordering early can seem sensible. But if retailers, distributors, and manufacturers all react to one another's orders, a modest change at the customer end can become a large swing upstream. Later, the goods arrive together and the apparent shortage becomes excess inventory. Understanding that mechanism is useful for a small shop as well as a global manufacturer.",
    sections: [
      {
        id: "why-now",
        title: "Why the trade discussion is also an inventory discussion",
        paragraphs: [
          "The [WTO's March 2026 Global Trade Outlook](https://www.wto.org/english/res_e/publications_e/gtos0326_e.htm) provides current context about trade developments and the outlook. Its discussion of trade timing and uncertainty makes an important distinction: shipments can move because firms change when they buy, not only because end customers need more goods. Consult current official rules for any actual tariff decision; this article does not describe a country's applicable rate.",
          "A retailer may advance an order to avoid a possible future cost. A wholesaler observing that order may infer stronger customer demand. If neither party distinguishes timing from consumption, the signal grows as it moves through the chain. Policy uncertainty can be one trigger, but delays, batching, and forecasting reactions can generate the mechanism without a tariff change.",
        ],
      },
      {
        id: "mechanism",
        title: "How a small signal gets amplified",
        paragraphs: [
          "The [bullwhip effect simulation](/effects/bullwhip-effect) makes the upstream amplification visible. Compare final demand with the orders produced at successive stages. Increase the response strength or delay and observe whether the chain settles or oscillates. The controls describe a teaching model, not a forecast for a real product.",
          "The causal loop is simple: an apparent shortage leads to larger orders; larger orders encourage stronger upstream reactions; delivery delays mean the new supply does not appear immediately; the shortage persists long enough to provoke another order. Eventually several reactions arrive together. Responding only to stock on the shelf misses the stock already committed in transit.",
        ],
      },
      {
        id: "inventory",
        title: "Calculate inventory position, not just shelf stock",
        paragraphs: [
          "A useful inventory-position check combines stock on hand, confirmed stock on order, and backorders or committed demand. The exact accounting depends on your business. The principle is to avoid acting as though a delivery that has not arrived was never ordered. Keep expected delivery dates and confidence in those dates visible.",
          "The [stocks and flows experiment](/effects/stocks-and-flows) helps separate a current stock from incoming and outgoing rates. A low stock can result from a temporary delivery delay or a sustained increase in consumption. Those situations may deserve different responses even when today's shelf looks identical.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: a shop awaiting a late shipment",
        paragraphs: [
          "Imagine a shop normally selling an illustrative 20 units per week. It has five units on hand and a confirmed shipment of 40 units due soon. A manager sees the five units and considers ordering another 60. These numbers are invented to explain the accounting, not to recommend a stock level.",
        ],
        steps: [
          "Separate customer sales from the manager's new order. Check whether weekly consumption has actually changed.",
          "Count the 40 confirmed units already on the way, then subtract any committed backorders. Investigate the shipment's reliability rather than treating it as either perfectly certain or nonexistent.",
          "Compare a small temporary response with a large permanent order. Record the assumption about delivery timing and review it when new information arrives.",
        ],
      },
      {
        id: "coordination",
        title: "Share the information that orders leave out",
        paragraphs: [
          "Orders can conceal end-customer sales, stock levels, promotions, and changes in ordering dates. Where possible, share those facts with the next stage of the chain. A distributor hearing 'we are ordering early because of uncertainty' has different information from one receiving an unexplained order spike.",
          "MIT's [supply-chain lecture on limited demand information](https://ocw.mit.edu/courses/esd-273j-logistics-and-supply-chain-management-fall-2009/resources/mitesd_273jf09_lec07/) covers forecasting and bullwhip mechanisms. Information sharing helps only if the data are timely, definitions match, and decision rules use them. A shared dashboard that everyone interprets differently can still produce coordinated overreaction.",
        ],
      },
      {
        id: "delays",
        title: "Beware of correcting yesterday's problem twice",
        paragraphs: [
          "Try the [cobweb model](/effects/cobweb-model) to see how delayed supply responses can create oscillation. It is a different model, but the connection is useful: current decisions can depend on a price or shortage that reflects past conditions. By the time new production arrives, those conditions may have changed.",
          "Choose a review rhythm that respects lead times. Record which orders were placed in response to which signal. If several managers independently try to fix the same shortage, consolidate the response before adding more commitments. A calm rule can still be wrong, but it is easier to evaluate than a sequence of undocumented emergency orders.",
        ],
        checklist: [
          "Measure customer consumption separately from replenishment orders.",
          "Count confirmed pipeline stock and committed demand.",
          "Document why an order differs from normal.",
          "Review the response after the relevant delivery delay.",
        ],
      },
      {
        id: "limits",
        title: "Do not blame every shortage on overreaction",
        paragraphs: [
          "Factories can close, routes can fail, demand can genuinely jump, and suppliers can provide unreliable dates. A real disruption may justify extra stock or another supplier. Those choices have costs, including cash tied up and goods that become obsolete. The simulation cannot determine the right buffer for your business.",
          "The practical gain is a cleaner diagnosis. Before assuming that a larger order solves the problem, ask which part is real consumption, which part is a timing change, and which part is a reaction to somebody else's reaction. That distinction can prevent an understandable precaution from becoming an avoidable second problem.",
        ],
      },
    ],
    experiments: [
      {
        slug: "bullwhip-effect",
        task: "Compare customer demand with the increasingly variable upstream orders.",
      },
      {
        slug: "stocks-and-flows",
        task: "Account for what is on hand, arriving, and leaving.",
      },
      {
        slug: "cobweb-model",
        task: "Observe how a delayed response can produce an overshoot.",
      },
    ],
    sources: [
      {
        title: "WTO — Global Trade Outlook and Statistics, March 2026",
        url: "https://www.wto.org/english/res_e/publications_e/gtos0326_e.htm",
        note: "March 2026 · Trade context and projections, not current tariff advice.",
      },
      {
        title:
          "MIT OpenCourseWare — Inventory models with limited demand information",
        url: "https://ocw.mit.edu/courses/esd-273j-logistics-and-supply-chain-management-fall-2009/resources/mitesd_273jf09_lec07/",
        note: "University teaching material on forecasting, inventory, and the bullwhip effect.",
      },
    ],
    reflection:
      "Which decision in your work reacts to a delayed signal—and what response is already in the pipeline?",
  },
  {
    slug: "ai-boom-diversification-shared-risk",
    title: "The AI boom and hidden concentration: many names, one shared risk",
    description:
      "Map shared dependencies across investments, vendors, and business operations. Learn why counting holdings or suppliers is not enough to establish diversification.",
    topic: "Markets & systems",
    published: "2026-10-07",
    takeaway:
      "Diversification depends on how exposures fail together, not only on how many different names appear on a list.",
    intro:
      "Ten investments can depend on the same growth story. Three software vendors can depend on the same cloud infrastructure. Several customers can rely on the same funding source. The names are different, but the underlying exposure may be similar. With AI investment and deployment prominent in current economic discussion, this is a useful time to practise looking through the labels to the dependencies underneath.",
    sections: [
      {
        id: "why-now",
        title: "A current story, a general risk mechanism",
        paragraphs: [
          "The [IMF's January 2026 economic commentary](https://www.imf.org/en/blogs/articles/2026/01/19/global-economy-shakes-off-tariff-shock-amid-tech-driven-boom) discusses the technology-driven boom and related risks. Its [July 2026 discussion of AI and financial stability](https://www.imf.org/en/blogs/articles/2026/07/23/how-central-banks-can-contain-financial-stability-risks-as-ai-accelerates-change) also examines vulnerabilities as adoption changes financial systems. These are dated institutional analyses, not a prediction that a particular asset or supplier will fail.",
          "You do not have to take a view on whether AI is overvalued to inspect concentration. A technology can be useful and still create correlated exposures. Likewise, a good business can be a poor fit for a particular risk constraint. The exercise here is a dependency map, not a recommendation to buy, sell, or choose a particular allocation.",
        ],
      },
      {
        id: "correlation",
        title: "Count drivers, not just names",
        paragraphs: [
          "In the [diversification simulation](/effects/diversification), change the relationship between outcomes while keeping the number of components in view. When outcomes move together, adding components provides less reduction in variability than independent outcomes would. The model's correlation settings are assumptions you choose, not measured forecasts for real securities.",
          "Write down the drivers behind each exposure: demand, financing, regulation, geography, infrastructure, and the customers paying the bill. Look for repeated entries. A fund, a direct holding, and your employer's revenue can all create exposure to the same industry even though they live in different parts of your personal spreadsheet.",
        ],
      },
      {
        id: "operations",
        title: "Use the same lens on operational resilience",
        paragraphs: [
          "A backup vendor is only partly useful if it shares the dependency that caused the primary vendor to fail. Two services may use the same hosting provider, authentication system, or upstream dataset. If the shared layer breaks, switching between brands may not restore the workflow.",
          "Explore [series and parallel reliability](/effects/series-parallel-reliability) to see why the arrangement matters. The simplified reliability model assumes the stated relationships; it does not verify a vendor's architecture. Use it to ask which component is truly redundant and which remains a common point of failure.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: two AI writing tools",
        paragraphs: [
          "Imagine a team using two fictional AI writing services so it can switch if one becomes unavailable. Both rely on the same upstream model provider, and the team's login depends on one identity service. The second subscription protects against some app-specific failures, but not every failure. This is a teaching scenario, not a claim about any real product.",
        ],
        steps: [
          "Map the path from the user to the final output: login, application, upstream service, stored data, and review process.",
          "Mark the shared dependencies. Name one failure that the backup covers and one it cannot cover.",
          "Test a small fallback, such as an approved manual workflow with accessible templates. Measure what can still be delivered and how long recovery takes.",
        ],
      },
      {
        id: "tail-risk",
        title: "An average can hide the scenario that matters",
        paragraphs: [
          "The [antifragility experiment](/effects/antifragility) helps you inspect how different response shapes behave as variability increases. It does not establish the response of a particular market or business. The useful question is whether your plan has considered outcomes outside the range that feels familiar, and whether larger disruptions cause disproportionately larger harm.",
          "Also inspect [Gambler’s Ruin](/effects/gamblers-ruin): some strategies become unacceptable because one path prevents you from continuing, even if the average outcome looks attractive. In an operational setting, that could mean being unable to serve a critical customer long enough to recover. Define the unacceptable state in concrete terms rather than using 'risky' as a vague label.",
        ],
      },
      {
        id: "map",
        title: "Make a one-page dependency map",
        paragraphs: [
          "Put exposures in rows and shared drivers in columns. Mark connections you know, and label uncertain ones as questions to investigate. Use an outage, a demand slowdown, or a financing interruption as a scenario. Ask which rows would be affected together and which fallback remains available.",
          "Do not turn the map into an artificial precision score. A guessed correlation of 0.73 is not more honest than a clearly stated qualitative uncertainty. For a financial decision, personal circumstances and professional advice may matter. For a team, bring the map to the people who know the technical and contractual details before changing critical services.",
        ],
        checklist: [
          "Look through funds and vendors to their underlying drivers.",
          "Mark shared infrastructure and customer dependencies.",
          "Define the disruption you cannot comfortably absorb.",
          "Test whether the fallback works under that specific scenario.",
        ],
      },
      {
        id: "limits",
        title: "Resilience has a cost; perfect independence is rare",
        paragraphs: [
          "Duplicating everything can be expensive and create complexity of its own. Common infrastructure can also be efficient and reliable. The aim is to understand the tradeoff, not to eliminate every shared dependency. Start with the few disruptions whose consequences would be hardest to handle.",
          "A practical review ends with one useful action: verify an unknown dependency, test a recovery process, or clarify which risk has been knowingly accepted. Adding another name to a list may feel like progress. Demonstrating that you can still operate when the shared driver fails is stronger evidence.",
        ],
      },
    ],
    experiments: [
      {
        slug: "diversification",
        task: "Hold the component count steady and vary how strongly outcomes move together.",
      },
      {
        slug: "series-parallel-reliability",
        task: "Compare true redundancy with a chain containing a shared failure point.",
      },
      {
        slug: "gamblers-ruin",
        task: "Identify the path that stops you from being able to continue.",
      },
    ],
    sources: [
      {
        title: "IMF — Global economy amid a tech-driven boom",
        url: "https://www.imf.org/en/blogs/articles/2026/01/19/global-economy-shakes-off-tariff-shock-amid-tech-driven-boom",
        note: "19 January 2026 · Economic outlook and risk context.",
      },
      {
        title: "IMF — AI and financial stability risks",
        url: "https://www.imf.org/en/blogs/articles/2026/07/23/how-central-banks-can-contain-financial-stability-risks-as-ai-accelerates-change",
        note: "23 July 2026 · Financial-system dependencies and resilience context.",
      },
    ],
    reflection:
      "Which two things you consider separate would stop working for the same underlying reason?",
  },
];
