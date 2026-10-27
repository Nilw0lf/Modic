"use client";
import { useState } from "react";
import {
  amortise,
  debtPlan,
  bond,
  portfolio,
  minVariance,
} from "@/lib/simulations/mosaic";
import { Actions, Chart, Slider, Stats, fmt, Ledger } from "../depth/Shared";
export function Amortization() {
  const [rate, setRate] = useState(6),
    [months, setMonths] = useState(60),
    [extra, setExtra] = useState(0),
    [step, setStep] = useState(0),
    run = amortise(10000, rate, months, extra),
    base = amortise(10000, rate, months),
    length = Math.max(run.rows.length, base.rows.length) + 1,
    series = (rows: typeof run.rows) =>
      Array.from({ length }, (_, i) =>
        i === 0 ? 10000 : rows[Math.min(i - 1, rows.length - 1)].balance,
      ),
    current = run.rows[Math.min(step, run.rows.length) - 1];
  return (
    <>
      <p>
        A hypothetical 10,000-unit fixed-rate loan uses level monthly payments.
        Compare the original schedule with an additional fixed payment.
      </p>
      <Slider
        id="loan-rate"
        label="Annual rate"
        value={rate}
        min={0}
        max={15}
        step={0.5}
        suffix="%"
        onChange={(v) => {
          setRate(v);
          setStep(0);
        }}
      />
      <Slider
        id="loan-months"
        label="Original term in months"
        value={months}
        min={12}
        max={120}
        step={12}
        onChange={(v) => {
          setMonths(v);
          setStep(0);
        }}
      />
      <Slider
        id="extra-payment"
        label="Extra paid each month"
        value={extra}
        min={0}
        max={200}
        step={10}
        onChange={(v) => {
          setExtra(v);
          setStep(0);
        }}
      />
      <Chart
        label="Remaining balance under the two schedules"
        min={0}
        max={10000}
        xLabel={`Month 0 → ${length - 1}`}
        lines={[
          { name: "With selected extra", values: series(run.rows) },
          { name: "Original payment", values: series(base.rows) },
        ]}
      />
      <Actions>
        <button
          disabled={step >= run.rows.length}
          onClick={() => setStep((v) => Math.min(run.rows.length, v + 12))}
        >
          Inspect next repayment year
        </button>
      </Actions>
      <Stats
        items={[
          ["Original monthly payment", fmt(base.pay)],
          ["Selected monthly payment", fmt(run.pay)],
          ["Payoff month", String(run.rows.length)],
          ["Total interest", fmt(run.totalInterest)],
          ["Month inspected", String(step)],
          ["Balance at inspected month", fmt(current?.balance ?? 10000)],
        ]}
      />
      <p>
        Interest accrues monthly before payment, using unrounded teaching
        amounts. The final payment is capped at the remaining balance plus
        interest. Fees, insurance, taxes, rate changes, penalties and actual
        loan terms are omitted.
      </p>
    </>
  );
}
export function Debt() {
  const [strategy, setStrategy] = useState<"snowball" | "avalanche">(
      "avalanche",
    ),
    [budget, setBudget] = useState(300),
    [month, setMonth] = useState(0),
    [compare, setCompare] = useState(false),
    a = debtPlan("avalanche", budget),
    s = debtPlan("snowball", budget),
    chosen = strategy === "avalanche" ? a : s,
    length = Math.max(a.history.length, s.history.length);
  return (
    <>
      <Ledger
        label="Three hypothetical debts"
        headers={["Debt", "Opening balance", "Annual rate", "Monthly minimum"]}
        rows={[
          ["A", 800, "18%", 25],
          ["B", 2000, "8%", 25],
          ["C", 5000, "24%", 25],
        ]}
      />
      <Slider
        id="debt-budget"
        label="Total monthly payment budget"
        value={budget}
        min={150}
        max={600}
        step={25}
        onChange={(v) => {
          setBudget(v);
          setMonth(0);
          setCompare(false);
        }}
      />
      <Actions>
        <button
          aria-pressed={strategy === "avalanche"}
          onClick={() => {
            setStrategy("avalanche");
            setMonth(0);
          }}
        >
          Highest rate first
        </button>
        <button
          aria-pressed={strategy === "snowball"}
          onClick={() => {
            setStrategy("snowball");
            setMonth(0);
          }}
        >
          Smallest balance first
        </button>
        <button
          disabled={month >= chosen.history.length - 1}
          onClick={() =>
            setMonth((v) => Math.min(chosen.history.length - 1, v + 1))
          }
        >
          Pay one month
        </button>
        <button onClick={() => setCompare(true)}>Compare complete plans</button>
      </Actions>
      <Stats
        items={[
          ["Month paid", String(month)],
          ["Total remaining", fmt(chosen.history[month])],
          [
            "Debts cleared so far",
            String(chosen.milestones.filter((m) => m.month <= month).length),
          ],
        ]}
      />
      {compare && (
        <>
          <Chart
            label="Total balance using the same monthly budget"
            min={0}
            max={8300}
            xLabel={`Month 0 → ${length - 1}`}
            lines={[
              {
                name: "Highest rate first",
                values: Array.from(
                  { length },
                  (_, i) => a.history[Math.min(i, a.history.length - 1)],
                ),
              },
              {
                name: "Smallest balance first",
                values: Array.from(
                  { length },
                  (_, i) => s.history[Math.min(i, s.history.length - 1)],
                ),
              },
            ]}
          />
          <Ledger
            label="Modelled complete-plan results"
            headers={[
              "Plan",
              "Months simulated",
              "Interest",
              "First debt cleared",
            ]}
            rows={[
              [
                "Highest rate",
                a.history.length - 1,
                fmt(a.interest),
                a.milestones[0]?.month ?? "Not yet",
              ],
              [
                "Smallest balance",
                s.history.length - 1,
                fmt(s.interest),
                s.milestones[0]?.month ?? "Not yet",
              ],
            ]}
          />
        </>
      )}
      <p>
        Both plans accrue interest, pay up to 25 per active debt, then direct
        the remaining fixed budget by the selected priority. Payments are
        reallocated after payoff; no fees, changing rates or behavioural
        adherence are modelled. A 240-month cap would leave any remaining debt
        visible.
      </p>
    </>
  );
}
export function Convexity() {
  const [years, setYears] = useState(10),
    [shift, setShift] = useState(1),
    base = bond(0.05, years),
    delta = shift / 100,
    exact = bond(0.05 + delta, years).price,
    linear = base.price + base.first * delta,
    quadratic = linear + 0.5 * base.second * delta * delta;
  return (
    <>
      <p>
        A fictional annual-pay bond has face value 100, coupon 5 and baseline
        yield 5%. Compare exact repricing with first- and second-order
        approximations.
      </p>
      <Slider
        id="bond-years"
        label="Years to maturity"
        value={years}
        min={2}
        max={20}
        onChange={setYears}
      />
      <Slider
        id="yield-shift"
        label="Yield change in percentage points"
        value={shift}
        min={-3}
        max={3}
        step={0.25}
        onChange={setShift}
      />
      <Chart
        label="Price response to a parallel yield change"
        min={50}
        max={160}
        xLabel="Yield change −3 to +3 percentage points"
        lines={[
          {
            name: "Exact price",
            values: Array.from(
              { length: 61 },
              (_, i) => bond(0.02 + i * 0.001, years).price,
            ),
          },
          {
            name: "Linear duration",
            values: Array.from(
              { length: 61 },
              (_, i) => base.price + base.first * (-0.03 + i * 0.001),
            ),
          },
          {
            name: "With convexity",
            values: Array.from({ length: 61 }, (_, i) => {
              const d = -0.03 + i * 0.001;
              return base.price + base.first * d + 0.5 * base.second * d * d;
            }),
          },
        ]}
      />
      <Stats
        items={[
          ["Exact shifted price", fmt(exact)],
          ["Linear approximation", fmt(linear)],
          ["Second-order approximation", fmt(quadratic)],
          ["Convexity measure", fmt(base.second / base.price)],
        ]}
      />
      <p>
        Convexity captures curvature, not a guaranteed positive return. This
        option-free fixed-cash-flow example omits credit risk, callable
        features, market conventions and nonparallel yield-curve shifts.
      </p>
    </>
  );
}
export function Dividend() {
  const [payout, setPayout] = useState(20),
    [tax, setTax] = useState(0),
    [reinvest, setReinvest] = useState(false),
    price = (100 - payout) / 10,
    cash = (payout / 10) * (1 - tax / 100),
    shares = reinvest ? 1 + cash / price : 1;
  return (
    <>
      <p>
        A fictional firm is worth 100 across ten shares before distributing
        cash. You hold one share. Inspect the accounting before adding a
        dividend tax.
      </p>
      <Slider
        id="dividend"
        label="Total firm cash distribution"
        value={payout}
        min={0}
        max={50}
        step={5}
        onChange={setPayout}
      />
      <Slider
        id="dividend-tax"
        label="Tax on the cash distribution"
        value={tax}
        min={0}
        max={30}
        step={5}
        suffix="%"
        onChange={setTax}
      />
      <Actions>
        <button aria-pressed={reinvest} onClick={() => setReinvest((v) => !v)}>
          {reinvest ? "Reinvest cash" : "Keep cash"}
        </button>
      </Actions>
      <Stats
        items={[
          ["Ex-distribution price per share", fmt(price)],
          ["After-tax cash per original share", fmt(cash)],
          ["Shares held after chosen action", fmt(shares, 3)],
          [
            "Total share value plus cash",
            fmt(shares * price + (reinvest ? 0 : cash)),
          ],
          ["Initial wealth", "10.00"],
        ]}
      />
      <p>
        With no tax, paying cash simply moves value from the firm to the holder
        in this accounting example. Reinvestment assumes frictionless
        secondary-market purchases at the same price. This does not claim real
        prices mechanically follow the drawing or that dividends are irrelevant
        under actual taxes, information or financing constraints.
      </p>
    </>
  );
}
export function Frontier() {
  const [w, setW] = useState(30),
    [rho, setRho] = useState(0.2),
    [show, setShow] = useState(false),
    point = portfolio(w / 100, rho),
    minimum = minVariance(rho),
    minPoint = portfolio(minimum, rho),
    curve = Array.from({ length: 101 }, (_, i) => portfolio(i / 100, rho)),
    x = (risk: number) => 55 + (risk / 22) * 500,
    y = (ret: number) => 280 - ((ret - 4) / 6) * 240;
  return (
    <>
      <p>
        Two hypothetical assets have expected returns 5% and 9%, with standard
        deviations 10% and 20%. Choose the second asset’s weight and assumed
        correlation.
      </p>
      <Slider
        id="asset-weight"
        label="Weight in asset B"
        value={w}
        min={0}
        max={100}
        suffix="%"
        onChange={setW}
      />
      <Slider
        id="correlation"
        label="Return correlation"
        value={rho}
        min={-1}
        max={1}
        step={0.1}
        onChange={setRho}
      />
      <svg
        className="mosaic-scatter"
        viewBox="0 0 600 330"
        role="img"
        aria-label="Two-asset expected return against standard deviation"
      >
        {[5, 7, 9].map((v) => (
          <g key={v}>
            <line x1="55" x2="555" y1={y(v)} y2={y(v)} stroke="var(--border)" />
            <text x="45" y={y(v) + 5} textAnchor="end">
              {v}
            </text>
          </g>
        ))}
        {[0, 10, 20].map((v) => (
          <g key={v}>
            <line x1={x(v)} x2={x(v)} y1="40" y2="280" stroke="var(--border)" />
            <text x={x(v)} y="302" textAnchor="middle">
              {v}
            </text>
          </g>
        ))}
        <text x="55" y="20">
          Expected return (%)
        </text>
        <polyline
          points={curve.map((p) => `${x(p.risk)},${y(p.ret)}`).join(" ")}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
        />
        <circle
          cx={x(point.risk)}
          cy={y(point.ret)}
          r="8"
          fill="var(--foreground)"
        />
        {show && (
          <circle
            cx={x(minPoint.risk)}
            cy={y(minPoint.ret)}
            r="9"
            fill="none"
            stroke="var(--positive)"
            strokeWidth="3"
          />
        )}
        <text x="230" y="325">
          Standard deviation (%) →
        </text>
      </svg>
      <Actions>
        <button aria-pressed={show} onClick={() => setShow((v) => !v)}>
          Show minimum-variance portfolio
        </button>
      </Actions>
      <Stats
        items={[
          ["Expected portfolio return", fmt(point.ret) + "%"],
          ["Portfolio standard deviation", fmt(point.risk) + "%"],
          ["Minimum-variance B weight", fmt(100 * minimum) + "%"],
          [
            "Within this two-asset set",
            w / 100 < minimum - 1e-8
              ? "Dominated by a higher-return lower-risk point"
              : "On the efficient branch",
          ],
        ]}
      />
      <p>
        These moments are supplied assumptions, not estimated forecasts. No
        shorting is allowed. Mean–variance efficiency omits tail risk, taxes,
        fees, changing correlations and preferences; it is not a recommendation
        to hold the displayed allocation.
      </p>
    </>
  );
}
