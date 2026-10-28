"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import { Actions, Slider, Stats, Choices, Bars, fixed } from "./Shared";
import { bridge, collide } from "@/lib/simulations/prism";
export function Ohm() {
  const [v, setV] = useState(12),
    [r, setR] = useState(10),
    [kind, setKind] = useState("Series"),
    eq = kind === "Series" ? 10 + r : (10 * r) / (10 + r),
    i = v / eq;
  return (
    <>
      <p>
        Connect an adjustable ideal resistor with a fixed 10 Ω resistor to an
        ideal voltage source. Predict current before switching the connection.
      </p>
      <Slider label="Voltage (V)" min={0} max={24} value={v} onChange={setV} />
      <Slider
        label="Adjustable resistance (Ω)"
        min={1}
        max={30}
        value={r}
        onChange={setR}
      />
      <Choices
        label="Connection"
        options={["Series", "Parallel"]}
        value={kind}
        onChange={setKind}
      />
      <Bars
        label="Current comparison at selected voltage"
        max={27}
        items={[
          ["Series current", v / (10 + r)],
          ["Parallel current", v / ((10 * r) / (10 + r))],
        ]}
      />
      <Stats
        items={[
          ["Equivalent resistance (Ω)", fixed(eq)],
          ["Source current (A)", fixed(i)],
          ["Total power (W)", fixed(v * i)],
        ]}
      />
      <p>
        Ohm’s law assumes an ohmic element at fixed conditions. Real supplies,
        heating, resistance changes and component power limits are omitted; this
        is not a circuit-building safety guide.
      </p>
    </>
  );
}
export function Kirchhoff() {
  const [r, setR] = useState(15),
    [closed, setClosed] = useState(true),
    m = bridge(r, closed);
  return (
    <>
      <p>
        Balance a Wheatstone-style bridge. A 12 V source feeds two divider
        branches: 10/20 Ω and 15/R Ω. A 10 Ω bridge joins the midpoints when
        connected.
      </p>
      <Slider
        label="Lower-right resistor R (Ω)"
        min={5}
        max={60}
        value={r}
        onChange={setR}
      />
      <Actions>
        <button aria-pressed={closed} onClick={() => setClosed(!closed)}>
          Midpoint bridge: {closed ? "Connected" : "Open"}
        </button>
      </Actions>
      <svg
        viewBox="0 0 600 370"
        role="img"
        aria-label={`12 volt bridge circuit: left branch 10 and 20 ohms, right branch 15 and ${r} ohms, midpoint 10 ohm resistor ${closed ? "connected" : "open"}`}
      >
        <g fill="none" stroke="var(--foreground)" strokeWidth="2">
          <path d="M180 65H420M180 65V95M420 65V95M180 145V205M420 145V205M180 255V300H420V255" />
          <rect x="165" y="95" width="30" height="50" rx="3" />
          <rect x="405" y="95" width="30" height="50" rx="3" />
          <rect x="165" y="205" width="30" height="50" rx="3" />
          <rect x="405" y="205" width="30" height="50" rx="3" />
          <path d="M180 175H265M335 175H420M180 65H80V135M80 235V300H180" />
          <circle cx="80" cy="185" r="50" />
          {closed ? (
            <rect x="265" y="160" width="70" height="30" rx="3" />
          ) : (
            <path d="M265 175L320 145M325 175H335" />
          )}
        </g>
        <g textAnchor="middle">
          <text x="80" y="180">
            12 V
          </text>
          <text x="80" y="207">
            + / −
          </text>
          <text x="140" y="125">
            10 Ω
          </text>
          <text x="465" y="125">
            15 Ω
          </text>
          <text x="140" y="238">
            20 Ω
          </text>
          <text x="465" y="238">
            {r} Ω
          </text>
          <text x="300" y="145">
            {closed ? "10 Ω" : "Open"}
          </text>
          <text x="300" y="43">
            Supply: 12 V
          </text>
          <text x="300" y="335">
            Ground: 0 V
          </text>
          <text x="210" y="200" style={{ fill: "var(--accent)" }}>
            {fixed(m.left, 2)} V
          </text>
          <text x="390" y="200" style={{ fill: "var(--accent)" }}>
            {fixed(m.right, 2)} V
          </text>
        </g>
        <circle cx="180" cy="175" r="5" fill="var(--accent)" />
        <circle cx="420" cy="175" r="5" fill="var(--accent)" />
      </svg>
      <Bars
        label="Midpoint potentials relative to ground"
        max={12}
        items={[
          ["Left midpoint", m.left],
          ["Right midpoint", m.right],
        ]}
      />
      <Stats
        items={[
          ["Bridge current left → right (A)", fixed(m.cross, 4)],
          ["Source current (A)", fixed(m.input, 4)],
          ["Return current (A)", fixed(m.output, 4)],
          ["Balanced", Math.abs(m.left - m.right) < 1e-8 ? "Yes" : "No"],
        ]}
      />
      <p>
        Find R that makes midpoint current zero. Nodal equations enforce
        Kirchhoff current balance; ideal resistors and a constant source omit
        transient, thermal and measurement effects.
      </p>
    </>
  );
}
export function Bernoulli() {
  const [a, setA] = useState(1),
    [q, setQ] = useState(1),
    v1 = (10 * q) / 4,
    v2 = (10 * q) / a,
    p2 = 400 + 0.5 * (v1 * v1 - v2 * v2);
  return (
    <>
      <p>
        Water flows steadily through a horizontal ideal pipe. The first area is
        4 cm² and pressure 400 kPa. Change the second area without changing the
        selected volume flow.
      </p>
      <Slider
        label="Second cross-section area (cm²)"
        min={1}
        max={8}
        step={0.5}
        value={a}
        onChange={setA}
      />
      <Slider
        label="Volume flow (litres/second)"
        min={0.2}
        max={2}
        step={0.1}
        value={q}
        onChange={setQ}
      />
      <svg
        viewBox="0 0 600 220"
        role="img"
        aria-label="Schematic pipe with changing cross section"
      >
        <path
          d={`M20 60H220L380 ${110 - a * 8}H580V${110 + a * 8}H380L220 160H20Z`}
          fill="var(--surface)"
          stroke="var(--foreground)"
        />
        <text x="60" y="115">
          4 cm² →
        </text>
        <text x="425" y="115">
          {a} cm² →
        </text>
      </svg>
      <Stats
        items={[
          ["First speed (m/s)", fixed(v1)],
          ["Second speed (m/s)", fixed(v2)],
          ["Second ideal pressure (kPa)", fixed(p2)],
          ["Flow at both sections (L/s)", fixed(q)],
        ]}
      />
      <p>
        Continuity fixes area times velocity; Bernoulli balances pressure and
        kinetic energy at equal height. The pipe is schematic. Viscosity,
        turbulence, pumps and energy losses are omitted.
      </p>
    </>
  );
}
export function Elastic() {
  const [m1, setM1] = useState(1),
    [m2, setM2] = useState(2),
    [after, setAfter] = useState(false),
    v = collide(m1, m2);
  return (
    <>
      <p>
        A one-dimensional perfectly elastic collision starts with cart A moving
        at 4 m/s and cart B stationary. Compare motion before and after contact.
      </p>
      <Slider
        label="Cart A mass (kg)"
        min={0.5}
        max={4}
        step={0.5}
        value={m1}
        onChange={(n) => {
          setM1(n);
          setAfter(false);
        }}
      />
      <Slider
        label="Cart B mass (kg)"
        min={0.5}
        max={4}
        step={0.5}
        value={m2}
        onChange={(n) => {
          setM2(n);
          setAfter(false);
        }}
      />
      <Actions>
        <button aria-pressed={after} onClick={() => setAfter(!after)}>
          {after ? "Show before collision" : "Resolve collision"}
        </button>
      </Actions>
      <svg
        viewBox="0 0 600 160"
        role="img"
        aria-label="Cart positions illustrate velocities, not a continuous animation"
      >
        {[m1, m2].map((m, i) => (
          <g key={i}>
            <rect
              x={(i ? 350 : 150) + (after ? (i ? v.v2 : v.v1) * 25 : 0)}
              y="55"
              width={25 + m * 8}
              height="40"
              fill={i ? "var(--foreground)" : "var(--accent)"}
            />
            <text
              x={(i ? 350 : 150) + (after ? (i ? v.v2 : v.v1) * 25 : 0)}
              y="120"
            >
              {i ? "B" : "A"}
            </text>
          </g>
        ))}
      </svg>
      <Stats
        items={[
          ["A velocity (m/s)", fixed(after ? v.v1 : 4)],
          ["B velocity (m/s)", fixed(after ? v.v2 : 0)],
          [
            "Total momentum (kg m/s)",
            fixed(after ? m1 * v.v1 + m2 * v.v2 : 4 * m1),
          ],
          [
            "Kinetic energy (J)",
            fixed(after ? 0.5 * m1 * v.v1 ** 2 + 0.5 * m2 * v.v2 ** 2 : 8 * m1),
          ],
        ]}
      />
      <p>
        Equal masses exchange velocities. This ideal point-cart calculation
        assumes no external impulse or energy loss; the drawing is a
        before/after illustration.
      </p>
    </>
  );
}
export function Buoyancy() {
  const [mass, setMass] = useState(8),
    [volume, setVolume] = useState(10),
    [fluid, setFluid] = useState("Water"),
    rho = fluid === "Water" ? 1000 : 800,
    capacity = (rho * volume) / 1000,
    fraction = Math.min(1, mass / capacity),
    force = Math.min(mass, capacity) * 9.81;
  return (
    <>
      <p>
        Build an ideal sealed object. Its average density depends on total mass
        and exterior displaced volume, including any sealed air space.
      </p>
      <Slider
        label="Total mass (kg)"
        min={1}
        max={20}
        value={mass}
        onChange={setMass}
      />
      <Slider
        label="Exterior volume (litres)"
        min={5}
        max={30}
        value={volume}
        onChange={setVolume}
      />
      <Choices
        label="Fluid"
        options={["Water", "Light oil"]}
        value={fluid}
        onChange={setFluid}
      />
      <svg
        viewBox="0 0 400 250"
        role="img"
        aria-label="Object immersion schematic"
      >
        <rect
          x="20"
          y="100"
          width="360"
          height="140"
          fill="var(--surface)"
          stroke="var(--border)"
        />
        <rect
          x="150"
          y={100 - 80 * (1 - fraction)}
          width="100"
          height="80"
          fill="var(--accent)"
          opacity=".8"
        />
        <line x1="20" x2="380" y1="100" y2="100" stroke="var(--foreground)" />
      </svg>
      <Stats
        items={[
          ["Object average density (kg/m³)", fixed((1000 * mass) / volume)],
          ["Maximum supported mass (kg)", fixed(capacity)],
          ["Buoyant force at shown immersion (N)", fixed(force)],
          [
            "Outcome",
            mass < capacity
              ? "Floats"
              : mass === capacity
                ? "Neutral when submerged"
                : "Sinks",
          ],
        ]}
      />
      <p>
        Archimedes’ principle uses displaced fluid mass. The model neglects
        surface tension, compressibility and shape-dependent stability; a
        sinking object is shown at full immersion, not with a calculated sinking
        speed.
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
  const B = [Ohm, Kirchhoff, Bernoulli, Elastic, Buoyancy][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
