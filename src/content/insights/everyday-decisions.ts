import type { Insight } from "./types";

export const everydayDecisions: Insight[] = [
  {
    slug: "ai-voice-scams-verify-before-you-trust",
    title: "AI voice scams: verify the request, not just the voice",
    description:
      "A practical verification routine for suspicious calls, messages, and payment requests, explained through signal detection, base rates, and value of information.",
    topic: "Everyday decisions",
    published: "2026-10-07",
    takeaway:
      "A familiar voice is a clue, not authentication. Check the request through a separate channel you already trust.",
    intro:
      "A caller sounds like someone you know. They are frightened, rushed, and asking you to act immediately. You may be tempted to listen harder for an artificial accent or a strange pause. But the more useful question is whether the request can be confirmed independently. You do not have to become an expert deepfake detector to create a better verification process.",
    sections: [
      {
        id: "why-now",
        title: "What has changed, and what has not",
        paragraphs: [
          "[Google's June 2026 fraud and scams advisory](https://blog.google/innovation-and-ai/technology/safety-security/fraud-scams-advisory-june-2026/) discusses evolving scam tactics and the use of AI. It is a provider's account of observed threats, not a census of every fraudulent call. The technology matters, but the familiar mechanisms of urgency, impersonation, and payment pressure still matter too.",
          "The [FTC's advice on AI family-emergency scams](https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes) recommends contacting the supposed caller through a known number. That changes the source of evidence. Instead of asking the suspicious message to prove itself, you ask a channel established before the message arrived.",
        ],
      },
      {
        id: "decision",
        title: "Separate identity, story, and requested action",
        paragraphs: [
          "A convincing voice does not prove a payment request is authorised. Even a real account or real colleague can be compromised, confused, or relaying somebody else's claim. Check three things separately: who is communicating, whether the story is accurate, and whether the requested action follows the normal process.",
          "This distinction helps with messages as well as calls. A familiar logo, an existing conversation thread, or a plausible invoice is evidence about appearance. It is not enough to justify changing bank details or sharing a verification code. If a request bypasses the procedure that usually protects the action, the bypass itself deserves attention.",
        ],
      },
      {
        id: "signals",
        title: "Why looking for one giveaway can fail",
        paragraphs: [
          "The [signal detection experiment](/effects/signal-detection) shows the tradeoff between missed threats and false alarms. Moving the threshold changes both. A rule that marks every unfamiliar message as fraudulent catches more suspicious cases but also blocks ordinary communication. A permissive rule makes communication easy but can miss harmful requests.",
          "The point is not to calculate a perfect threshold for your family. It is to match verification to the consequences. A routine scheduling message and an urgent request to transfer money should not need identical evidence. A separate callback may be a modest inconvenience compared with an irreversible action.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: an urgent change of payment details",
        paragraphs: [
          "Imagine a small business receiving a message that appears to come from a regular supplier. It says the bank account has changed and today's invoice must be paid immediately. This is an invented scenario, not an allegation about a particular supplier. The safest useful response is a process, not an argument with the sender.",
        ],
        steps: [
          "Pause the payment and identify the unusual element: new account details plus pressure to skip the usual check.",
          "Contact the supplier using the number already stored in your records, rather than a number supplied in the suspicious message.",
          "Have the normal authorised person confirm the change and record the result. If the request cannot be verified, keep the payment paused and follow the organisation's fraud procedure.",
        ],
      },
      {
        id: "base-rates",
        title: "Use base rates without turning them into reassurance",
        paragraphs: [
          "In [base rate neglect](/effects/base-rate-neglect), change the frequency of the underlying event while holding the signal's accuracy fixed. Notice how the meaning of a positive signal changes. A message being unusual is not the same thing as it being fraudulent; the surrounding context affects how much weight to give the clue.",
          "You usually do not know a reliable numerical fraud rate for a specific incoming call. Do not invent one or assume that a low average risk makes a high-consequence request safe. The practical lesson is to avoid judging the entire situation from a single vivid cue, whether that cue is a familiar voice or a frightening warning.",
        ],
      },
      {
        id: "routine",
        title: "Make verification easy before an emergency",
        paragraphs: [
          "Keep trusted contact details accessible. Agree that an unusual financial request can be paused without anyone taking offence. In a team, decide who can approve a changed account and how the check is documented. A family can agree to call back through an existing number rather than relying on a voice alone. A shared phrase can be an additional check, but should not be the only one.",
          "Try [value of information](/effects/value-of-information) to compare the cost of a check with how much it can improve a decision. A verification step earns its place when it provides independent evidence that could change the action. Re-reading the same message many times may feel like checking while adding little new information.",
        ],
        checklist: [
          "Pause pressure-driven or unusual requests.",
          "Use contact details established independently of the request.",
          "Do not share account verification codes with an unsolicited caller.",
          "Keep normal approval and payment controls in place.",
        ],
      },
      {
        id: "afterwards",
        title: "If you already acted, switch from judging to responding",
        paragraphs: [
          "If money or account access may have been exposed, contact the relevant bank or service through its official channel promptly and follow its incident process. Preserve messages and transaction details. Reporting routes depend on your country; the FTC guidance linked here describes the US context. The important habit is to seek practical help quickly rather than spending the first hour debating how convincing the message sounded.",
          "No checklist catches every attack. A verified callback can still encounter a compromised account, and a rushed colleague may make a mistake. Layer checks around actions that are hard to reverse. Good processes also make it easy to admit uncertainty: people should be able to say 'I need to verify this' without being punished for slowing down.",
        ],
      },
    ],
    experiments: [
      {
        slug: "signal-detection",
        task: "Observe the tradeoff between misses and false alarms.",
      },
      {
        slug: "base-rate-neglect",
        task: "See why the context changes what a suspicious signal means.",
      },
      {
        slug: "value-of-information",
        task: "Compare another look at the same clue with a genuinely informative check.",
      },
    ],
    sources: [
      {
        title: "Google — June 2026 frauds and scams advisory",
        url: "https://blog.google/innovation-and-ai/technology/safety-security/fraud-scams-advisory-june-2026/",
        note: "June 2026 · First-party account of observed scam tactics.",
      },
      {
        title: "FTC — Scammers use AI to enhance family emergency schemes",
        url: "https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes",
        note: "2023 · Independent callback guidance; US reporting context.",
      },
    ],
    reflection:
      "Which action in your household or team should always trigger an independent verification step?",
  },
  {
    slug: "subscription-traps-defaults-and-cancellation",
    title:
      "Why free trials become forgotten subscriptions—and how to audit them",
    description:
      "Understand subscription renewals through defaults, present bias, and sunk costs. Use a practical recurring-bill audit with a clear keep-or-cancel decision.",
    topic: "Everyday decisions",
    published: "2026-10-07",
    takeaway:
      "Decide about the next billing period using expected use, then make the renewal or cancellation outcome explicit.",
    intro:
      "A subscription is easy to start when the benefit is immediate and the bill feels distant. Months later, the charge can become background noise. The difficult part is often not arithmetic. It is remembering that the decision keeps repeating, finding the cancellation route, and separating future value from money already spent. A recurring-bill audit turns an invisible default into a choice you can actually review.",
    sections: [
      {
        id: "why-now",
        title: "Why cancellation design deserves attention",
        paragraphs: [
          "The [FTC's Uber case record](https://www.ftc.gov/legal-library/browse/cases-proceedings/2423092-uber-ftc-v), updated in May 2026, describes allegations concerning billing, consent, and cancellation for Uber One. The listed case is pending: a complaint is not a final finding. It is a current example of why the path out of a subscription can matter as much as the path in.",
          "This article does not determine anyone's legal rights or a service's current cancellation policy. Policies and consumer protections vary. It uses the issue to explain how defaults and friction affect decisions, and to build a record-based audit you can apply to your own services.",
        ],
      },
      {
        id: "defaults",
        title: "The default makes doing nothing an action",
        paragraphs: [
          "With automatic renewal, inaction produces another paid period. In the [default effect experiment](/effects/default-effect), compare choices when the starting option changes. A default can reduce effort, signal what is normal, or simply survive because changing it requires attention. None of those mechanisms proves that the default matches your preference today.",
          "Separate consent at signup from value at renewal. You may have wanted the service three months ago and not want it now. A fair review asks what the coming period is likely to provide. Treating the original signup as a permanent decision lets changing circumstances disappear from view.",
        ],
      },
      {
        id: "present-bias",
        title: "The trial benefit arrives before the renewal task",
        paragraphs: [
          "The [present bias experiment](/effects/present-bias) helps explain why a small immediate benefit can outweigh a future inconvenience in the moment. 'I will cancel later' sounds easy when later has no calendar slot. When later arrives, cancelling competes with whatever else is urgent that day.",
          "A reminder is useful when it is placed before the actual renewal deadline and contains the next action. 'Review video subscription; open billing settings; confirm the end date' is easier to act on than a vague alert saying 'subscriptions'. The reminder cannot remove a confusing interface, but it reduces the chance that the decision never reaches your attention.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: review the next month",
        paragraphs: [
          "Imagine a learning app costing an illustrative 12 units each month. You used it twice last month and expect to use it twice next month. Six units per anticipated session is a way to make the tradeoff visible, not an objective test of whether the service is worth it. The sessions might be valuable, or a free alternative might meet the same need.",
        ],
        steps: [
          "List the renewal date, price, expected use, and the best realistic alternative. Use actual billing records rather than memory.",
          "Ask whether you would sign up today for the coming month at that price. Exclude previous payments from this question.",
          "If you cancel, complete the provider's process and save the confirmation and effective end date. Check the next statement to see whether the expected outcome happened.",
        ],
      },
      {
        id: "sunk-costs",
        title: "Do not make the next payment defend the last one",
        paragraphs: [
          "The [sunk cost fallacy game](/effects/sunk-cost-fallacy) asks you to notice when past spending starts steering a new choice. 'I have paid for six months, so I should keep going until I get my money's worth' confuses a recovery wish with the value of the next payment. Cancelling cannot erase the old bill, but renewing cannot erase it either.",
          "There can be valid future reasons to stay: stored work, a team dependency, a discount you will actually use, or costs of switching. Write those reasons down separately. The aim is not to cancel everything. It is to avoid allowing an irrelevant past expense to masquerade as a future benefit.",
        ],
      },
      {
        id: "audit",
        title: "Build a one-page recurring-bill audit",
        paragraphs: [
          "Review a sensible span of account statements because annual subscriptions will not all appear in the latest month. Include app-store billing and bundled services. Record each service in one place, with the account used and the cancellation route. Avoid storing passwords in the audit itself.",
          "The [mental accounting experiment](/effects/mental-accounting) is useful here: small bills can seem harmless in separate categories while their combined cost remains substantial. Add up the recurring total, but also review each service's purpose. A single low-use service can be valuable insurance against a specific inconvenience; a heavily used service can still have a cheaper equivalent.",
        ],
        checklist: [
          "Find charges across bank, card, and app-store records.",
          "Record price, renewal date, expected use, and alternatives.",
          "Choose keep, change, or cancel for the coming period.",
          "Save confirmations and verify the next billing outcome.",
        ],
      },
      {
        id: "limits",
        title: "A clearer choice is not a guarantee of an easy exit",
        paragraphs: [
          "Cancellation problems are not always a failure of self-control. Interface design, unclear terms, technical faults, and provider conduct can all matter. If a charge appears unauthorised or continues after a confirmed cancellation, use the service's official support route and the relevant payment provider's dispute process. Keep a record of dates and messages.",
          "The [FTC's report on dark patterns](https://www.ftc.gov/reports/bringing-dark-patterns-light) provides broader context about design practices that can impair consumer choice. The practical question for your audit remains concrete: what evidence would show that the renewal decision you made was actually carried out? Finish the audit by checking the outcome, rather than stopping when you find the button.",
        ],
      },
    ],
    experiments: [
      {
        slug: "default-effect",
        task: "Compare the same choice under a different starting option.",
      },
      {
        slug: "present-bias",
        task: "Notice how an immediate reward competes with a future task.",
      },
      {
        slug: "sunk-cost-fallacy",
        task: "Practise evaluating the next decision without defending past spending.",
      },
    ],
    sources: [
      {
        title: "FTC — Uber case record",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/2423092-uber-ftc-v",
        note: "Updated 4 May 2026 · Pending allegations, not a final judgment.",
      },
      {
        title: "FTC — Bringing Dark Patterns to Light",
        url: "https://www.ftc.gov/reports/bringing-dark-patterns-light",
        note: "2022 · Consumer-choice and interface-design context.",
      },
    ],
    reflection:
      "Which recurring charge would you choose differently if you had to actively approve it today?",
  },
  {
    slug: "news-feed-availability-bias-risk",
    title: "Why your news feed can make rare events feel common",
    description:
      "Use availability bias, base rates, and independent evidence to assess alarming headlines without confusing repeated coverage with the frequency of an event.",
    topic: "Information & forecasts",
    published: "2026-10-07",
    takeaway:
      "Count events in a defined population, not impressions in a feed. Repetition and independence are different things.",
    intro:
      "You see several alarming clips before breakfast and feel that a particular danger is suddenly everywhere. The feeling may be understandable, but it is not yet a frequency estimate. A feed is a selection of material delivered to you. It is not a random sample of all the things happening in the world. You need a denominator, a time period, and a way to distinguish several reports of one event from several separate events.",
    sections: [
      {
        id: "why-now",
        title: "The way people encounter news is changing",
        paragraphs: [
          "The [Reuters Institute's 2026 Digital News Report](https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/dnr-executive-summary) describes the growing role of social and video platforms in the markets surveyed, alongside concerns about trust and information quality. Its audience survey does not establish that a particular algorithm causes a particular person's fear. It does make the source and selection of news worth examining.",
          "A platform can carry reliable reporting and misleading material in the same scroll. Evaluate the claim and its provenance rather than treating the platform itself as a truth label. The most useful question is often not 'Is social media bad?' but 'What information did this specific item leave out?'",
        ],
      },
      {
        id: "availability",
        title: "Easy to remember is not the same as likely",
        paragraphs: [
          "Availability is the tendency to use ease of recall as a cue when judging frequency or probability. A vivid story, a recent experience, or repeated exposure can make examples easy to retrieve. That can be informative when recall reflects a representative experience. It can mislead when the examples are selected for drama or delivered repeatedly.",
          "Try the [availability heuristic experiment](/effects/availability-heuristic). Notice whether salient examples change your estimate before the underlying frequency changes. The original [Tversky and Kahneman paper](https://doi.org/10.1016/0010-0285%2873%2990033-9) describes the heuristic; it does not claim that every worried reaction is irrational. Sometimes the danger really has increased. You still need evidence that distinguishes that possibility from changing exposure.",
        ],
      },
      {
        id: "denominator",
        title: "Write down the missing denominator",
        paragraphs: [
          "A count of incidents means little without the number of opportunities for those incidents to happen. Ten failures among a hundred uses and ten among a million uses describe different situations. You also need comparable definitions: a change in reporting rules can alter a recorded count without an equivalent change in the underlying event.",
          "The [base rate experiment](/effects/base-rate-neglect) makes the denominator visible. Transfer the habit, not the model's invented values, to news reading. Ask: among which people, products, journeys, or time periods was this count observed? If the article does not provide that context, treat your probability estimate as unfinished.",
        ],
      },
      {
        id: "worked-example",
        title: "A worked example: five clips, one incident",
        paragraphs: [
          "Imagine five creators discussing a single product failure. Two repost the same footage, another quotes the first creator, and two add commentary. This is an invented media scenario. Five items in your feed are not evidence of five failures, and five confident voices are not necessarily five independent investigations.",
        ],
        steps: [
          "Trace each item to its earliest available source and identify whether the underlying incident is the same.",
          "Look for the relevant denominator and a consistent comparison period. Separate an observed incident from an estimate of prevalence.",
          "Decide what action the evidence supports: investigate further, take a proportionate precaution, or withhold a numerical conclusion.",
        ],
      },
      {
        id: "independence",
        title: "Look for independent evidence, not another agreeing voice",
        paragraphs: [
          "The [wisdom of crowds experiment](/effects/wisdom-of-crowds) lets you compare diverse estimates with estimates that share error. More opinions help less when everyone relies on the same mistaken input. In a news context, a different website is not automatically a different source: several articles may cite one press release or one anonymous account.",
          "Search for a measurement, an original document, or a reporter who actually checked the claim. Also try [confirmation bias](/effects/confirmation-bias): notice how easy it is to select a test that agrees with the belief you already hold. Write down what would count against your current interpretation before looking for more material.",
        ],
      },
      {
        id: "routine",
        title: "Use a three-minute headline check",
        paragraphs: [
          "Restate the claim in a testable sentence. 'Everything is getting dangerous' is not testable; 'reported failures per unit increased in this period' is. Find the original source, the date of the event, and the date of the coverage. An old clip recirculating today is not a new occurrence.",
          "Then ask whether the evidence changes a decision you need to make. Not every alarming story requires another hour of monitoring. A useful information routine has a stopping point: once you have enough evidence for the relevant action, more repeated coverage can increase emotional intensity without improving the decision.",
        ],
        checklist: [
          "What exactly is claimed?",
          "What is the population and time period?",
          "Are reports about independent events or the same event?",
          "What evidence would change my interpretation?",
        ],
      },
      {
        id: "limits",
        title: "Do not use the bias label to dismiss real problems",
        paragraphs: [
          "Calling a concern 'availability bias' is not a rebuttal. A memorable story can reveal a real failure that deserves attention even when its frequency is unknown. People affected by a harm also need more than a reminder that it is rare. Distinguish the question of prevalence from the question of what should be done about a documented incident.",
          "The practical aim is calibrated attention. You can take a report seriously while refusing to infer a trend from a handful of selected examples. If you cannot find the denominator, say so. An honest incomplete estimate is more useful than a precise number built from impressions.",
        ],
      },
    ],
    experiments: [
      {
        slug: "availability-heuristic",
        task: "Compare how memorable examples affect an estimate.",
      },
      {
        slug: "wisdom-of-crowds",
        task: "Add shared error and see why more voices are not always more evidence.",
      },
      {
        slug: "confirmation-bias",
        task: "Choose a test that could challenge your first explanation.",
      },
    ],
    sources: [
      {
        title: "Reuters Institute — Digital News Report 2026: key findings",
        url: "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/dnr-executive-summary",
        note: "16 June 2026 · Audience survey; not a causal algorithm experiment.",
      },
      {
        title:
          "Tversky & Kahneman — Availability: a heuristic for judging frequency and probability",
        url: "https://doi.org/10.1016/0010-0285%2873%2990033-9",
        note: "1973 · Original research on availability judgments.",
      },
    ],
    reflection:
      "Which belief feels well supported because you encounter it often—and what independent evidence supports it?",
  },
];
