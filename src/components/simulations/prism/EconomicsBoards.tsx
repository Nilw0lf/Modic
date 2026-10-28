"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import {
  Actions,
  Slider,
  Stats,
  Choices,
  Chart,
  Plot,
  Ledger,
  fixed,
} from "./Shared";
import { solow, taxMarket, monopsony } from "@/lib/simulations/prism";
export function Solow() {
  const [s, setS] = useState(0.2),
    [time, setTime] = useState(0),
    path = solow(s, time),
    k = path.at(-1)!;
  return (
    <>
      <p>
        A stripped-down Solow model uses output per worker √k, saving rate s and
        depreciation 0.1. Population and technology are fixed. Capital starts at
        one in every comparison.
      </p>
      <Slider
        label="Saving share"
        min={0.1}
        max={0.6}
        step={0.05}
        value={s}
        onChange={(v) => {
          setS(v);
          setTime(0);
        }}
      />
      <Actions>
        <button
          disabled={time >= 100}
          onClick={() => setTime(Math.min(100, time + 10))}
        >
          Advance 10 periods
        </button>
      </Actions>
      <Chart
        lines={[{ name: "Capital per worker", values: path }]}
        min={0}
        max={36}
        label="Investment less depreciation"
        xLabel={`${time} model periods`}
      />
      <Stats
        items={[
          ["Current capital", fixed(k)],
          ["Output per worker", fixed(Math.sqrt(k))],
          ["Consumption per worker", fixed((1 - s) * Math.sqrt(k))],
          ["Steady-state capital", fixed((s / 0.1) ** 2)],
        ]}
      />
      <p>
        A higher saving share reduces immediate consumption at a given capital
        stock while raising the steady-state capital level. This model does not
        imply permanently faster per-worker growth without technological change.
      </p>
    </>
  );
}
export function Multiplier() {
  const [g, setG] = useState(20),
    [mpc, setMpc] = useState(0.6),
    [rounds, setRounds] = useState(1),
    spending = Array.from({ length: rounds }, (_, i) => g * mpc ** i);
  return (
    <>
      <p>
        An initial autonomous spending change generates further rounds when
        recipients spend a fixed fraction of new income. Taxes, imports, prices,
        interest rates and capacity limits are held out of this simple
        expenditure model.
      </p>
      <Slider
        label="Initial spending change"
        min={10}
        max={100}
        step={10}
        value={g}
        onChange={setG}
      />
      <Slider
        label="Marginal propensity to consume"
        min={0}
        max={0.9}
        step={0.1}
        value={mpc}
        onChange={setMpc}
      />
      <Actions>
        <button disabled={rounds >= 20} onClick={() => setRounds(rounds + 1)}>
          Trace another spending round
        </button>
      </Actions>
      <Ledger
        label="Round-by-round teaching expenditure"
        headers={["Round", "Additional spending"]}
        rows={spending.map((v, i) => [i + 1, fixed(v)])}
      />
      <Stats
        items={[
          [
            "Cumulative spending in shown rounds",
            fixed(spending.reduce((a, b) => a + b, 0)),
          ],
          ["Infinite geometric-model total", fixed(g / (1 - mpc))],
          ["Model multiplier", fixed(1 / (1 - mpc))],
        ]}
      />
      <p>
        The geometric total is conditional arithmetic, not an empirical fiscal
        multiplier or a forecast for a particular economy.
      </p>
    </>
  );
}
export function Tax() {
  const [t, setT] = useState(0),
    m = taxMarket(t);
  return (
    <>
      <p>
        A competitive teaching market has demand P = 100−Q and supply P = 2Q.
        Add a per-unit tax and distinguish the buyer’s price from the seller’s
        net receipt.
      </p>
      <Slider label="Tax per unit" min={0} max={50} value={t} onChange={setT} />
      <Plot
        series={[
          {
            name: "Demand",
            points: [
              [0, 100],
              [50, 50],
            ],
          },
          {
            name: "Supply including tax",
            points: [
              [0, t],
              [50, 100 + t],
            ],
          },
        ]}
        maxX={50}
        maxY={150}
        xLabel="Quantity"
        yLabel="Price"
      />
      <Stats
        items={[
          ["Quantity traded", fixed(m.q)],
          ["Buyer price", fixed(m.buyer)],
          ["Seller net price", fixed(m.seller)],
          ["Buyer burden per unit", fixed(m.consumerBurden)],
          ["Seller burden per unit", fixed(m.producerBurden)],
          ["Tax revenue", fixed(m.revenue)],
        ]}
      />
      <p>
        Here buyers bear one-third and sellers two-thirds of the wedge because
        of the specified slopes. Statutory remittance does not determine
        economic incidence. Externalities, evasion, market power and
        distribution beyond these curves are omitted.
      </p>
    </>
  );
}
export function Monopsony() {
  const [n, setN] = useState(20),
    [show, setShow] = useState(false),
    m = monopsony(n);
  return (
    <>
      <p>
        One employer faces labour supply wage w = 10+L and marginal revenue
        product 100−L. All workers receive the same selected wage, so recruiting
        one more worker also raises pay to existing workers.
      </p>
      <Slider
        label="Workers hired L"
        min={0}
        max={60}
        value={n}
        onChange={setN}
      />
      <Stats
        items={[
          ["Wage", fixed(m.wage)],
          ["Marginal revenue product", fixed(m.revenuePerWorker)],
          ["Marginal labour cost", fixed(m.marginalCost)],
          ["Employer profit", fixed(m.profit)],
        ]}
      />
      <Actions>
        <button onClick={() => setShow(true)}>Reveal model benchmarks</button>
      </Actions>
      {show && (
        <Ledger
          label="Different hiring conditions"
          headers={["Condition", "Employment", "Wage"]}
          rows={[
            ["Monopsony: MRP = marginal labour cost", 30, 40],
            ["Competitive: MRP = wage", 45, 55],
          ]}
        />
      )}
      <p>
        Try maximising profit before revealing the benchmark. This static
        single-employer model assumes one wage and differentiable curves; it is
        not evidence about an actual employer or a complete minimum-wage
        analysis.
      </p>
    </>
  );
}
export function Gresham() {
  const [rule, setRule] = useState("Equal legal face value"),
    [coin, setCoin] = useState(""),
    amount = coin
      ? rule === "Equal legal face value"
        ? 0.6
        : 0.6 / (coin === "High-metal coin" ? 1.2 : 0.8)
      : 0,
    left =
      coin === "High-metal coin"
        ? (1 - amount) * 1.2 + 0.8
        : coin
          ? 1.2 + (1 - amount) * 0.8
          : 2;
  return (
    <>
      <p>
        You hold one unit each of two divisible monies. Both have legal face
        value one, but their commodity values are 1.2 and 0.8. Buy goods worth
        0.6 under different acceptance rules.
      </p>
      <Choices
        label="Shop acceptance rule"
        options={["Equal legal face value", "Commodity-value pricing"]}
        value={rule}
        onChange={(v) => {
          setRule(v);
          setCoin("");
        }}
      />
      <Choices
        label="Which money do you spend?"
        options={["High-metal coin", "Low-metal coin"]}
        value={coin}
        onChange={setCoin}
      />
      <Stats
        items={[
          ["Units of chosen money spent", coin ? fixed(amount) : "—"],
          ["Commodity value retained", fixed(left)],
        ]}
      />
      <p>
        At enforced equal face value, spending the low-metal money preserves
        more commodity value. At commodity-value prices, either payment retains
        1.4. Gresham’s law is conditional on valuation and acceptance rules, not
        a universal claim that inferior products displace superior ones.
        Divisible units simplify the accounting.
      </p>
    </>
  );
}

export default function GroupBoard({
  index,
  seed,
}: {
  index: number;
  seed: number;
}) {
  const B = [Solow, Multiplier, Tax, Monopsony, Gresham][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
