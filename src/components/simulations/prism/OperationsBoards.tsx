"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import { Actions, Slider, Stats, Chart, Plot, Ledger, fixed } from "./Shared";
import { newsvendor, rng, schedule } from "@/lib/simulations/prism";
export function Newsvendor({ seed }: { seed: number }) {
  const [q, setQ] = useState(60),
    [done, setDone] = useState(false),
    m = newsvendor(q),
    u = rng(seed)();
  const index = m.prob.findIndex(
    (_, i) => m.prob.slice(0, i + 1).reduce((a, b) => a + b, 0) >= u,
  );
  return (
    <>
      <p>
        Stock a one-day kiosk. Each unit costs 6, sells for 10 and returns 2 as
        salvage. Tomorrow’s demand is one of five known possibilities; unsold
        stock does not carry forward.
      </p>
      <Slider
        label="Order quantity"
        min={0}
        max={120}
        step={10}
        value={q}
        onChange={setQ}
        disabled={done}
      />
      <Ledger
        label="Declared demand distribution"
        headers={["Demand", "Probability", "Profit with selected order"]}
        rows={m.demand.map((d, i) => [d, m.prob[i], m.profit[i]])}
      />
      <Stats
        items={[
          ["Expected profit under stated distribution", fixed(m.expected)],
          ["Overage / underage cost", "4 / 4"],
        ]}
      />
      <Actions>
        <button disabled={done} onClick={() => setDone(true)}>
          Commit order and open the kiosk
        </button>
      </Actions>
      {done && (
        <p aria-live="polite">
          Realised demand: {m.demand[index]}; profit: {m.profit[index]}. The
          equal overage and underage costs target a demand median, here 60.
        </p>
      )}
      <p>
        This newsvendor model uses invented prices and probabilities.
        Expected-profit optimisation is not a guarantee for a single day, and
        missing demand data or stockout effects can change the answer.
      </p>
    </>
  );
}
export function EOQ() {
  const [q, setQ] = useState(100),
    [show, setShow] = useState(false),
    cost = (v: number) => (1200 / v) * 40 + (v / 2) * 2,
    opt = Math.sqrt((2 * 1200 * 40) / 2);
  return (
    <>
      <p>
        Annual demand is 1,200 units, fixed cost per order 40 and holding cost 2
        per unit-year. Inspect the tradeoff between ordering frequently and
        carrying larger average inventory.
      </p>
      <Slider
        label="Units per order Q"
        min={10}
        max={400}
        step={10}
        value={q}
        onChange={setQ}
      />
      <Plot
        series={[
          {
            name: "Annual ordering + holding cost",
            points: Array.from({ length: 40 }, (_, i) => {
              const n = 10 + i * 10;
              return [n, cost(n)];
            }),
          },
        ]}
        minX={10}
        maxX={400}
        maxY={5000}
        xLabel="Order size"
        yLabel="Annual relevant cost"
      />
      <Stats
        items={[
          ["Orders per year", fixed(1200 / q)],
          ["Average inventory", fixed(q / 2)],
          ["Annual ordering cost", fixed((1200 / q) * 40)],
          ["Annual holding cost", fixed(q)],
          ["Total relevant cost", fixed(cost(q))],
        ]}
      />
      <Actions>
        <button onClick={() => setShow(true)}>Reveal EOQ benchmark</button>
      </Actions>
      {show && (
        <p>
          EOQ = √(2DS/H) = {fixed(opt)} units; minimum relevant annual cost{" "}
          {fixed(cost(opt))}.
        </p>
      )}
      <p>
        The classic EOQ model assumes steady known demand, instantaneous
        replenishment and no shortages or quantity discounts. Fractional annual
        order counts are long-run averages, not literal partial purchase orders.
      </p>
    </>
  );
}
export function Kingman() {
  const [util, setUtil] = useState(70),
    [ca, setCa] = useState(1),
    [cs, setCs] = useState(1),
    rho = util / 100,
    wait = ((((ca * ca + cs * cs) / 2) * rho) / (1 - rho)) * 2;
  return (
    <>
      <p>
        One server averages two minutes per job. Kingman’s approximation relates
        waiting to utilisation and coefficients of variation of interarrival and
        service times.
      </p>
      <Slider
        label="Server utilisation (%)"
        min={20}
        max={95}
        step={5}
        value={util}
        onChange={setUtil}
      />
      <Slider
        label="Interarrival coefficient of variation"
        min={0}
        max={2}
        step={0.1}
        value={ca}
        onChange={setCa}
      />
      <Slider
        label="Service-time coefficient of variation"
        min={0}
        max={2}
        step={0.1}
        value={cs}
        onChange={setCs}
      />
      <figure className="prism-time-budget">
        <figcaption>Approximate average time per job</figcaption>
        <div
          role="img"
          aria-label={`${fixed(wait)} minutes waiting followed by 2 minutes service`}
        >
          {wait > 0 && <span style={{ flex: wait }} />}
          <span style={{ flex: 2 }} />
        </div>
        <p>Waiting: {fixed(wait)} min · Service: 2 min</p>
      </figure>
      <Stats
        items={[
          ["Approximate mean queue wait (minutes)", fixed(wait)],
          ["Approximate total time (minutes)", fixed(wait + 2)],
          ["Arrival rate (jobs/minute)", fixed(rho / 2, 3)],
          ["Approximate mean queue length", fixed((rho / 2) * wait)],
        ]}
      />
      <p>
        At equal utilisation, variability can change waiting substantially. The
        stationary single-server approximation assumes appropriate independent
        renewal arrivals and service, finite moments and utilisation below one.
        It is not an exact forecast for bursty, scheduled or multi-server
        operations.
      </p>
    </>
  );
}
export function Wright() {
  const [ratio, setRatio] = useState(80),
    [d, setD] = useState(0),
    b = ratio / 100,
    cost = 1000 * b ** d;
  return (
    <>
      <p>
        An illustrative unit-cost learning curve starts at 1,000 when cumulative
        production is one. Each doubling multiplies unit cost by a supplied
        progress ratio.
      </p>
      <Slider
        label="Progress ratio per doubling (%)"
        min={70}
        max={100}
        step={5}
        value={ratio}
        onChange={setRatio}
      />
      <Actions>
        <button disabled={d === 7} onClick={() => setD(d + 1)}>
          Double cumulative production
        </button>
      </Actions>
      <Chart
        lines={[
          {
            name: "Unit cost at successive doublings",
            values: Array.from({ length: d + 1 }, (_, i) => 1000 * b ** i),
          },
        ]}
        min={0}
        max={1000}
        label="Wright-style unit-cost curve"
        xLabel="Number of doublings"
      />
      <Stats
        items={[
          ["Cumulative production", 2 ** d],
          ["Doublings", d],
          ["Unit-cost index", fixed(cost)],
          ["Learning exponent", fixed(Math.log2(b), 3)],
        ]}
      />
      <p>
        An 80% progress ratio means a 20% unit-cost reduction per doubling, not
        per year or per additional unit. The board uses the unit-cost
        convention, not cumulative-average accounting, and assumes a stable
        relationship rather than predicting inevitable improvement.
      </p>
    </>
  );
}
export function Scheduling() {
  const [order, setOrder] = useState<number[]>([]),
    durations = [8, 2, 6, 1, 3],
    rows = schedule(order);
  return (
    <>
      <p>
        Five jobs all arrive at time zero. Choose their nonpreemptive order to
        reduce average waiting. All jobs have equal priority and known
        durations; the server never idles.
      </p>
      <Actions>
        {durations.map((d, i) => (
          <button
            key={i}
            disabled={order.includes(i)}
            onClick={() => setOrder([...order, i])}
          >
            Queue job {"ABCDE"[i]} ({d})
          </button>
        ))}
        <button onClick={() => setOrder([0, 1, 2, 3, 4])}>
          Use arrival order
        </button>
        <button onClick={() => setOrder([3, 1, 4, 2, 0])}>
          Use shortest-job-first
        </button>
        <button
          disabled={!order.length}
          onClick={() => setOrder(order.slice(0, -1))}
        >
          Undo last queued job
        </button>
      </Actions>
      <Ledger
        label="Selected schedule"
        headers={["Job", "Duration", "Start / wait", "Completion"]}
        rows={rows.map((r) => [
          "ABCDE"[r.id],
          durations[r.id],
          r.start,
          r.finish,
        ])}
      />
      <Stats
        items={[
          ["Jobs queued", order.length],
          [
            "Mean wait among queued jobs",
            rows.length
              ? fixed(rows.reduce((s, r) => s + r.wait, 0) / rows.length)
              : "—",
          ],
          ["Full schedule makespan", order.length === 5 ? 20 : "Incomplete"],
        ]}
      />
      <p>
        Compare complete schedules before comparing averages. Shortest
        processing time minimises total completion time under these conditions.
        Real arrival times, unknown durations, priorities and starvation
        concerns require other policies.
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
  const B = [Newsvendor, EOQ, Kingman, Wright, Scheduling][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
