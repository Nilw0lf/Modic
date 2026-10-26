"use client";
import { useState } from "react";
import { pigou } from "@/lib/simulations/horizons";
import { Actions, Chart, Ledger, Slider, Stats, fmt } from "../depth/Shared";
export function Trade() {
  const [payment, setPayment] = useState(2.5),
    [deal, setDeal] = useState(false);
  return (
    <>
      <p>
        Each country has 12 labour hours. A needs 1 hour per bread and 2 per
        cloth; B needs 3 per bread and 4 per cloth. A is absolutely faster at
        both, but opportunity costs differ.
      </p>
      <Ledger
        label="Production before exchange"
        headers={[
          "Country",
          "Autarky bread / cloth",
          "Reallocated bread / cloth",
        ]}
        rows={[
          ["A", "6 / 3", "9 / 1.5"],
          ["B", "2 / 1.5", "0 / 3"],
        ]}
      />
      <Slider
        id="trade-price"
        label="Bread paid by A for 1.5 cloth from B"
        value={payment}
        min={0}
        max={4}
        step={0.1}
        onChange={(v) => {
          setPayment(v);
          setDeal(false);
        }}
      />
      <Actions>
        <button onClick={() => setDeal(true)}>Propose exchange</button>
      </Actions>
      {deal && (
        <>
          <Ledger
            label="Consumption after the proposed exchange"
            headers={["Country", "Bread", "Cloth", "Compared with autarky"]}
            rows={[
              [
                "A",
                fmt(9 - payment),
                3,
                payment <= 3 ? "No less of either good" : "Less bread",
              ],
              [
                "B",
                fmt(payment),
                1.5,
                payment >= 2 ? "No less of either good" : "Less bread",
              ],
            ]}
          />
          <p role="status">
            {payment >= 2 && payment <= 3
              ? "Both can accept without consuming less of either good. Payments strictly between 2 and 3 give each more bread."
              : "This proposal does not give both countries at least their autarky bundle. Try a payment between 2 and 3."}
          </p>
        </>
      )}
      <p>
        The reallocation uses all 12 hours in each country and creates one extra
        bread with the same total cloth. This partial-specialisation example
        assumes divisible output, no trade costs and no distributional
        differences within countries.
      </p>
    </>
  );
}
export function Tax() {
  const [tax, setTax] = useState(0),
    r = pigou(tax);
  return (
    <>
      <p>
        Demand is price = 100 − quantity, private marginal cost is 20, and
        external damage is 20 per unit. Choose a tax while counting tax receipts
        as transfers.
      </p>
      <Slider
        id="pollution-tax"
        label="Tax per unit"
        value={tax}
        min={0}
        max={60}
        onChange={setTax}
      />
      <Chart
        label="Social welfare at taxes 0–60"
        min={0}
        max={1900}
        xLabel="Tax 0 → 60"
        lines={[
          {
            name: "Total surplus after external damage",
            values: Array.from({ length: 61 }, (_, i) => pigou(i).welfare),
          },
        ]}
      />
      <Stats
        items={[
          ["Quantity", fmt(r.q)],
          ["External damage", fmt(r.external)],
          ["Tax revenue", fmt(r.revenue)],
          ["Social welfare", fmt(r.welfare)],
        ]}
      />
      <p>
        The social optimum here is quantity 60, reached by a tax of 20. Tax
        revenue is not subtracted as a social loss. Actual tax design would need
        uncertain damage estimates, administration, distribution and responses
        absent from this model.
      </p>
    </>
  );
}
export function Coase() {
  const [rights, setRights] = useState(false),
    [payment, setPayment] = useState(8),
    [cost, setCost] = useState(0),
    [run, setRun] = useState(false);
  const deal = !rights && payment >= 6 && payment + cost <= 10,
    abatement = rights || deal;
  return (
    <>
      <p>
        Noise harms a neighbour by 10 units. A workshop can eliminate it at cost
        6. A completed bargain also costs the payer the selected transaction
        cost.
      </p>
      <Actions>
        <button
          aria-pressed={!rights}
          onClick={() => {
            setRights(false);
            setRun(false);
          }}
        >
          Workshop may make noise
        </button>
        <button
          aria-pressed={rights}
          onClick={() => {
            setRights(true);
            setRun(false);
          }}
        >
          Neighbour has quiet right
        </button>
      </Actions>
      <Slider
        id="compensation"
        label="Proposed compensation"
        value={payment}
        min={0}
        max={12}
        step={0.5}
        onChange={(v) => {
          setPayment(v);
          setRun(false);
        }}
      />
      <Slider
        id="transaction-cost"
        label="Cost to complete a bargain"
        value={cost}
        min={0}
        max={8}
        onChange={(v) => {
          setCost(v);
          setRun(false);
        }}
      />
      <Actions>
        <button onClick={() => setRun(true)}>Test voluntary bargain</button>
      </Actions>
      {run && (
        <>
          <Stats
            items={[
              ["Noise", abatement ? "Eliminated" : "Continues"],
              ["Workshop payoff", fmt(rights ? -6 : deal ? payment - 6 : 0)],
              [
                "Neighbour payoff",
                fmt(rights ? 0 : deal ? -payment - cost : -10),
              ],
              ["Combined payoff", fmt(rights ? -6 : deal ? -6 - cost : -10)],
            ]}
          />
          <p role="status">
            {rights
              ? "With a quiet right, the workshop abates for 6. Paying at least 10 plus transaction cost for permission would cost more, so no mutually acceptable reversal occurs."
              : deal
                ? "The neighbour pays for abatement. Both weakly prefer this agreement to their no-bargain outcomes."
                : "No acceptable agreement at this compensation and transaction cost. Noise continues under the assigned right."}
          </p>
        </>
      )}
      <p>
        Zero transaction costs and clear rights support efficient abatement in
        either allocation, while the distribution differs. Rights are fictional
        rules; this is not legal guidance or a claim that real bargaining is
        costless or fair.
      </p>
    </>
  );
}
export function Hotelling() {
  const [future, setFuture] = useState(11),
    [rate, setRate] = useState(10),
    [early, setEarly] = useState(5),
    pv = early * 10 + ((10 - early) * future) / (1 + rate / 100);
  return (
    <>
      <p>
        A stock of ten resource units can be sold now at 10 per unit or next
        period at the selected net price. Extraction costs are zero and the
        stock never regenerates.
      </p>
      <Slider
        id="future-price"
        label="Next-period net price"
        value={future}
        min={8}
        max={16}
        step={0.5}
        onChange={setFuture}
      />
      <Slider
        id="interest-rate"
        label="Discount rate"
        value={rate}
        min={0}
        max={20}
        suffix="%"
        onChange={setRate}
      />
      <Slider
        id="extract-now"
        label="Units extracted now"
        value={early}
        min={0}
        max={10}
        onChange={setEarly}
      />
      <Stats
        items={[
          ["Present value of receipts", fmt(pv)],
          [
            "Future net price discounted to now",
            fmt(future / (1 + rate / 100)),
          ],
          ["Indifference future price", fmt(10 * (1 + rate / 100))],
        ]}
      />
      <p>
        When net scarcity rent grows at the discount rate, shifting extraction
        between these periods leaves present value unchanged. Away from that
        price, this price-taking two-period model favours one boundary. It does
        not determine an equilibrium resource-price forecast.
      </p>
    </>
  );
}
export function CostDisease() {
  const [years, setYears] = useState(10),
    [growth, setGrowth] = useState(0),
    wage = 10 * 1.05 ** years,
    service = (4 * wage) / (1 + growth / 100) ** years;
  return (
    <>
      <Slider
        id="years"
        label="Years in the teaching model"
        value={years}
        min={0}
        max={30}
        onChange={setYears}
      />
      <Slider
        id="service-growth"
        label="Service productivity growth per year"
        value={growth}
        min={0}
        max={10}
        suffix="%"
        onChange={setGrowth}
      />
      <Chart
        label="Unit labour cost index (year zero = 100)"
        min={0}
        max={450}
        xLabel="Year 0 → 30"
        lines={[
          {
            name: "Service",
            values: Array.from(
              { length: 31 },
              (_, t) => 100 * (1.05 / (1 + growth / 100)) ** t,
            ),
          },
          { name: "Manufactured good", values: Array(31).fill(100) },
        ]}
      />
      <Stats
        items={[
          ["Economy-wide hourly wage", fmt(wage)],
          ["Service unit labour cost", fmt(service)],
          ["Manufactured unit labour cost", "10.00"],
          ["Service units per fixed 100 budget", fmt(100 / service)],
        ]}
      />
      <p>
        Wages and manufacturing productivity both grow 5% annually. The service
        initially requires four labour hours per unit. Its unit cost rises when
        its productivity grows more slowly than wages. These are invented rates,
        not a forecast of tuition, healthcare or concert prices.
      </p>
    </>
  );
}
