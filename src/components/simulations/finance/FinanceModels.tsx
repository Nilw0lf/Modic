"use client";
import { useState } from "react";
import {
  averaging,
  bond,
  dcf,
  feePath,
  pricePaths,
  realRate,
  rebalance,
  wealthPath,
} from "@/lib/simulations/finance";
import { Slider, Stats } from "../foundations/Shared";
export const fmt = (n: number) => Number(n.toFixed(2)).toLocaleString("en-US");
export function Chart({
  series,
  labels,
}: {
  series: number[][];
  labels: string[];
}) {
  const max = Math.max(1, ...series.flat()),
    length = Math.max(...series.map((s) => s.length));
  return (
    <figure className="money-chart">
      <svg
        viewBox="0 0 620 230"
        role="img"
        aria-label={series
          .map((s, i) => `${labels[i]}: ${s.map(fmt).join(", ")}`)
          .join(". ")}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <line
              x1="80"
              x2="600"
              y1={190 - f * 160}
              y2={190 - f * 160}
              stroke="var(--border)"
            />
            <text
              x="72"
              y={194 - f * 160}
              textAnchor="end"
              fill="var(--muted)"
              fontSize="11"
            >
              {max * f >= 1000 ? `${fmt((max * f) / 1000)}k` : fmt(max * f)}
            </text>
          </g>
        ))}
        {series.map((s, i) => (
          <polyline
            key={i}
            points={s
              .map(
                (n, j) =>
                  `${80 + (j * 520) / Math.max(1, length - 1)},${190 - (n / max) * 160}`,
              )
              .join(" ")}
            fill="none"
            stroke={i ? "var(--positive)" : "var(--accent)"}
            strokeWidth="3"
            strokeDasharray={i ? "6 4" : undefined}
          />
        ))}
        <text x="80" y="218" fill="var(--muted)" fontSize="11">
          Start
        </text>
        <text
          x="600"
          y="218"
          textAnchor="end"
          fill="var(--muted)"
          fontSize="11"
        >
          Period {length - 1}
        </text>
      </svg>
      <figcaption>
        Solid: {labels[0]}
        {labels[1] && ` · Dashed: ${labels[1]}`} · Teaching values, not
        forecasts
      </figcaption>
    </figure>
  );
}
function ReturnTiles({
  rates,
  set,
}: {
  rates: number[];
  set: (v: number[]) => void;
}) {
  return (
    <div className="money-tiles">
      {rates.map((r, i) => (
        <div key={i}>
          <span>Period {i + 1}</span>
          <strong className={r < 0 ? "money-loss" : ""}>
            {r >= 0 ? "+" : ""}
            {fmt(r * 100)}%
          </strong>
          <button
            aria-label={`Move period ${i + 1} earlier`}
            disabled={i === 0}
            onClick={() => {
              const next = [...rates];
              [next[i], next[i - 1]] = [next[i - 1], next[i]];
              set(next);
            }}
          >
            ← Earlier
          </button>
        </div>
      ))}
    </div>
  );
}
export function Volatility() {
  const [rates, setRates] = useState([0.5, -0.5, 0.1, 0.1]),
    actual = wealthPath(rates),
    mean = rates.reduce((s, r) => s + r, 0) / 4,
    smooth = wealthPath(Array(4).fill(mean));
  return (
    <>
      <p className="simple-prompt">
        Four return tiles. Change a tile or reorder the path.
      </p>
      <ReturnTiles rates={rates} set={setRates} />
      <div className="play-actions">
        {rates.map((r, i) => (
          <button
            key={i}
            onClick={() => {
              const options = [-0.5, -0.2, 0, 0.1, 0.5];
              setRates(
                rates.map((v, j) =>
                  j === i
                    ? options[(options.indexOf(v) + 1) % options.length]
                    : v,
                ),
              );
            }}
          >
            Change return {i + 1}
          </button>
        ))}
        <button onClick={() => setRates([0.5, -0.5, 0.5, -0.5])}>
          Try +50 / −50 twice
        </button>
      </div>
      <Chart
        series={[actual.values, smooth.values]}
        labels={["Your path", "Constant average"]}
      />
      <Stats
        items={[
          ["Arithmetic average", fmt(mean * 100) + "%"],
          ["Compounded balance", fmt(actual.wealth)],
          ["Constant-average balance", fmt(smooth.wealth)],
        ]}
      />
      <p role="status" className="play-feedback">
        Your four-period balance is {fmt(actual.wealth)}. Reordering leaves the
        product unchanged; changing a return changes the product.
      </p>
    </>
  );
}
export function Sequence() {
  const [rates, setRates] = useState([-0.3, -0.1, 0.1, 0.2, 0.3]),
    [withdraw, setWithdraw] = useState(10),
    own = wealthPath(rates, withdraw),
    reverse = wealthPath([...rates].reverse(), withdraw);
  return (
    <>
      <Slider
        id="sequence-withdrawal"
        label="Withdrawal after each period"
        min={0}
        max={20}
        value={withdraw}
        onChange={setWithdraw}
      />
      <ReturnTiles rates={rates} set={setRates} />
      <div className="play-actions">
        <button onClick={() => setRates([...rates].reverse())}>
          Reverse the order
        </button>
        <button onClick={() => setRates([...rates].sort((a, b) => b - a))}>
          Put gains first
        </button>
      </div>
      <Chart
        series={[own.values, reverse.values]}
        labels={["Your ordering", "Reversed ordering"]}
      />
      <Stats
        items={[
          ["Your final balance", fmt(own.wealth)],
          ["Reversed final balance", fmt(reverse.wealth)],
          ["Unpaid withdrawals", fmt(own.shortfall)],
        ]}
      />
      <p role="status" className="play-feedback">
        With withdrawal {withdraw}, your ordering ends at {fmt(own.wealth)} and
        the reversed ordering at {fmt(reverse.wealth)}. Set withdrawals to zero
        to isolate the return product.
      </p>
    </>
  );
}
export function Fees() {
  const [fee, setFee] = useState(1),
    [rate, setRate] = useState(6),
    [years, setYears] = useState(20),
    r = feePath(rate, fee, years);
  return (
    <>
      <div className="money-controls">
        <Slider
          id="fee-rate"
          label="Annual fee"
          min={0}
          max={3}
          step={0.1}
          suffix="%"
          value={fee}
          onChange={setFee}
        />
        <Slider
          id="fee-growth"
          label="Gross annual return"
          min={0}
          max={10}
          suffix="%"
          value={rate}
          onChange={setRate}
        />
        <Slider
          id="fee-years"
          label="Years"
          min={1}
          max={40}
          value={years}
          onChange={setYears}
        />
      </div>
      <Chart
        series={[r.values, r.benchmark]}
        labels={["After fees", "No-fee comparison"]}
      />
      <div className="play-actions">
        <button onClick={() => setFee(0.2)}>Compare a 0.2% fee</button>
        <button onClick={() => setFee(2)}>Compare a 2% fee</button>
      </div>
      <Stats
        items={[
          ["Net final balance", fmt(r.net)],
          ["Fees actually paid", fmt(r.paid)],
          ["Final balance gap", fmt(r.gap)],
        ]}
      />
      <p role="status" className="play-feedback">
        The gap is {fmt(r.gap)}: {fmt(r.paid)} in direct charges plus{" "}
        {fmt(r.gap - r.paid)} in foregone growth. Same gross return, different
        costs.
      </p>
    </>
  );
}
export function Inflation() {
  const [nominal, setNominal] = useState(5),
    [inflation, setInflation] = useState(3),
    [year, setYear] = useState(0);
  const account = 100 * (1 + nominal / 100) ** year,
    basket = 10 * (1 + inflation / 100) ** year,
    real = realRate(nominal, inflation);
  return (
    <>
      <div className="money-controls">
        <Slider
          id="real-nominal"
          label="Nominal annual return"
          min={0}
          max={12}
          suffix="%"
          value={nominal}
          onChange={setNominal}
        />
        <Slider
          id="real-inflation"
          label="Annual basket inflation"
          min={0}
          max={15}
          suffix="%"
          value={inflation}
          onChange={setInflation}
        />
      </div>
      <div className="money-shop">
        <span>Year {year} · One original shopping basket</span>
        <strong>{fmt(basket)} tokens</strong>
        <p>
          Account: {fmt(account)} tokens · Buys {fmt(account / basket)} baskets
        </p>
        <div className="money-baskets" aria-hidden="true">
          {"▣ ".repeat(Math.min(20, Math.floor(account / basket)))}
        </div>
      </div>
      <div className="play-actions">
        <button disabled={year === 10} onClick={() => setYear((y) => y + 1)}>
          Advance one year
        </button>
        <button
          onClick={() => {
            setNominal(5);
            setInflation(8);
            setYear(10);
          }}
        >
          More money, fewer baskets
        </button>
      </div>
      <Stats
        items={[
          ["Exact annual real return", fmt(real * 100) + "%"],
          ["Subtraction approximation", fmt(nominal - inflation) + "%"],
          ["Original baskets affordable", "10"],
        ]}
      />
      <p role="status" className="play-feedback">
        Year {year}: you can buy {fmt(account / basket)} baskets. Changing rates
        recomputes this constant-rate scenario from year zero.
      </p>
    </>
  );
}
export function Duration() {
  const [coupon, setCoupon] = useState(5),
    [years, setYears] = useState(10),
    [shock, setShock] = useState(1),
    base = bond(coupon, years, 5),
    now = bond(coupon, years, 5 + shock),
    estimate = base.price * (1 - (base.modified * shock) / 100);
  return (
    <>
      <div className="money-controls">
        <Slider
          id="bond-coupon"
          label="Annual coupon on face value 100"
          min={0}
          max={10}
          value={coupon}
          onChange={setCoupon}
        />
        <Slider
          id="bond-years"
          label="Maturity in years"
          min={1}
          max={20}
          value={years}
          onChange={setYears}
        />
        <Slider
          id="bond-shock"
          label="Yield change from 5%"
          min={-4}
          max={5}
          step={0.25}
          suffix=" pp"
          value={shock}
          onChange={setShock}
        />
      </div>
      <div className="money-valuation">
        <div>
          <span>Exact repriced bond</span>
          <strong>{fmt(now.price)}</strong>
        </div>
        <div>
          <span>Duration estimate</span>
          <strong>{fmt(estimate)}</strong>
        </div>
      </div>
      <Stats
        items={[
          ["Macaulay duration", fmt(base.duration) + " years"],
          ["Modified duration", fmt(base.modified)],
          ["Approximation error", fmt(estimate - now.price)],
        ]}
      />
      <details>
        <summary>Inspect each discounted cash flow</summary>
        <div className="frontier-table-wrap" tabIndex={0}>
          <table className="simple-history">
            <caption>
              Base yield 5%; principal returned in the final year
            </caption>
            <thead>
              <tr>
                <th>Year</th>
                <th>Cash paid</th>
                <th>Present value</th>
              </tr>
            </thead>
            <tbody>
              {base.flows.map((f) => (
                <tr key={f.year}>
                  <td>{f.year}</td>
                  <td>{fmt(f.cash)}</td>
                  <td>{fmt(f.pv)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <p role="status" className="play-feedback">
        Yield is now {fmt(5 + shock)}%. Exact price changes by{" "}
        {fmt((now.price / base.price - 1) * 100)}%; the first-order estimate
        changes by {fmt(-base.modified * shock)}%.
      </p>
    </>
  );
}
export function Valuation() {
  const [growth, setGrowth] = useState(5),
    [discount, setDiscount] = useState(8),
    [bid, setBid] = useState(80),
    [submitted, setSubmitted] = useState(false),
    r = dcf(growth, discount);
  return (
    <>
      <div className="money-controls">
        <Slider
          id="dcf-growth"
          label="Annual cash-flow growth"
          min={-10}
          max={20}
          suffix="%"
          value={growth}
          onChange={setGrowth}
        />
        <Slider
          id="dcf-discount"
          label="Discount rate"
          min={1}
          max={20}
          suffix="%"
          value={discount}
          onChange={setDiscount}
        />
        <Slider
          id="dcf-bid"
          label="Your project bid"
          min={20}
          max={160}
          value={bid}
          onChange={(v) => {
            setBid(v);
            setSubmitted(false);
          }}
        />
      </div>
      <div className="money-cashflows">
        {r.flows.map((f) => (
          <div key={f.year}>
            <span>Year {f.year}</span>
            <strong>{fmt(f.cash)}</strong>
            <small>Today: {fmt(f.pv)}</small>
          </div>
        ))}
      </div>
      <div className="play-actions">
        <button onClick={() => setSubmitted(true)}>Submit project bid</button>
        <button
          onClick={() => {
            setGrowth(-5);
            setDiscount(15);
            setSubmitted(true);
          }}
        >
          Stress the assumptions
        </button>
      </div>
      <Stats
        items={[
          ["Five-payment present value", fmt(r.value)],
          ["Your bid", fmt(bid)],
          ["Value minus bid", fmt(r.value - bid)],
        ]}
      />
      <p role="status" className="play-feedback">
        {submitted
          ? `Your bid is ${bid <= r.value ? "below" : "above"} this scenario's present value by ${fmt(Math.abs(r.value - bid))}. This is a conditional calculation, not a guaranteed profit.`
          : "Set assumptions, inspect every payment, then make a bid."}
      </p>
    </>
  );
}
const shocks = [
  [0.2, 0],
  [0.15, 0.03],
  [-0.3, 0.02],
  [0.1, -0.02],
  [0.25, 0],
  [-0.15, 0.04],
];
export function Rebalancing() {
  const [state, setState] = useState({
      a: 500,
      b: 500,
      holdA: 500,
      holdB: 500,
      round: 0,
      fees: 0,
      values: [1000],
      hold: [1000],
    }),
    [fee, setFee] = useState(0.5),
    [message, setMessage] = useState(
      "Start at 50/50. Next returns stay hidden until you advance.",
    );
  function next() {
    const [a, b] = shocks[state.round];
    setState((s) => {
      const x = s.a * (1 + a),
        y = s.b * (1 + b),
        ha = s.holdA * (1 + a),
        hb = s.holdB * (1 + b);
      return {
        ...s,
        a: x,
        b: y,
        holdA: ha,
        holdB: hb,
        round: s.round + 1,
        values: [...s.values, x + y],
        hold: [...s.hold, ha + hb],
      };
    });
    setMessage(
      `Round ${state.round + 1}: A ${a >= 0 ? "+" : ""}${fmt(a * 100)}%, B ${b >= 0 ? "+" : ""}${fmt(b * 100)}%. Choose whether to restore your weights.`,
    );
  }
  function restore() {
    const r = rebalance(state.a, state.b, fee);
    setState((s) => ({
      ...s,
      a: r.a,
      b: r.b,
      fees: s.fees + r.fee,
      values: s.values.map((v, i) =>
        i === s.values.length - 1 ? r.a + r.b : v,
      ),
    }));
    setMessage(
      `Rebalanced to 50/50; one-way transfer ${fmt(r.trade)}, fee ${fmt(r.fee)}. This controls exposure without guaranteeing higher returns.`,
    );
  }
  return (
    <>
      <Slider
        id="rebalance-fee"
        label="Fee on pre-fee one-way transfer"
        min={0}
        max={2}
        step={0.1}
        suffix="%"
        value={fee}
        onChange={setFee}
      />
      <div className="money-allocation">
        <span style={{ width: `${(100 * state.a) / (state.a + state.b)}%` }}>
          A {fmt((100 * state.a) / (state.a + state.b))}%
        </span>
        <span>B {fmt((100 * state.b) / (state.a + state.b))}%</span>
      </div>
      <div className="play-actions">
        <button disabled={state.round === 6} onClick={next}>
          Reveal next market round
        </button>
        <button
          disabled={Math.abs(state.a - state.b) < 0.001}
          onClick={restore}
        >
          Rebalance to 50/50
        </button>
      </div>
      <Chart
        series={[state.values, state.hold]}
        labels={["Managed portfolio", "Untouched comparison"]}
      />
      <Stats
        items={[
          ["Managed wealth", fmt(state.a + state.b)],
          ["Untouched wealth", fmt(state.holdA + state.holdB)],
          ["Trading fees paid", fmt(state.fees)],
        ]}
      />
      <p role="status" className="play-feedback">
        {message}
      </p>
    </>
  );
}
export function Averaging() {
  const [path, setPath] = useState("recovery"),
    [period, setPeriod] = useState(0),
    r = averaging(pricePaths[path]),
    row = period ? r.rows[period - 1] : null;
  return (
    <>
      <div className="play-actions" role="group" aria-label="Price scenario">
        {Object.keys(pricePaths).map((p) => (
          <button
            key={p}
            aria-pressed={p === path}
            onClick={() => {
              setPath(p);
              setPeriod(0);
            }}
          >
            {p[0].toUpperCase() + p.slice(1)} path
          </button>
        ))}
      </div>
      <div className="money-price-strip">
        {pricePaths[path].map((p, i) => (
          <div key={i} className={i < period ? "purchased" : ""}>
            <span>Period {i + 1}</span>
            <strong>{p}</strong>
            <small>{i < period ? "Purchased" : "Not yet"}</small>
          </div>
        ))}
      </div>
      <button disabled={period === 6} onClick={() => setPeriod((p) => p + 1)}>
        Invest next 100 tokens
      </button>
      <Stats
        items={[
          ["Staged shares", fmt(row?.shares ?? 0)],
          ["Uninvested cash", fmt(row?.cash ?? 600)],
          ["Staged total wealth", fmt(row?.staged ?? 600)],
        ]}
      />
      <p role="status" className="play-feedback">
        {row
          ? `At period ${period}, staged wealth including cash is ${fmt(row.staged)}; lump-sum wealth is ${fmt(row.lump)}. ${period === 6 ? `Staged average cost is ${fmt(r.averageCost)} per share.` : ""}`
          : "Start both comparisons with the same 600 tokens. The lump sum buys at the first displayed price."}
      </p>
      <Chart
        series={[
          [600, ...r.rows.slice(0, period).map((r) => r.staged)],
          [600, ...r.rows.slice(0, period).map((r) => r.lump)],
        ]}
        labels={["Equal instalments including cash", "Lump sum"]}
      />
    </>
  );
}
