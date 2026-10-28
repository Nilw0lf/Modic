"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import { Actions, Slider, Stats, Choices, Plot, fixed } from "./Shared";
import { snell } from "@/lib/simulations/prism";
export function Doppler() {
  const [v, setV] = useState(0),
    [f, setF] = useState(440);
  return (
    <>
      <p>
        A stationary observer is to the right of a sound source in still air.
        Positive velocity moves the source toward the observer. Sound speed is
        fixed at 343 m/s.
      </p>
      <Slider
        label="Source velocity (m/s)"
        min={-150}
        max={150}
        value={v}
        onChange={setV}
      />
      <Slider
        label="Emitted frequency (Hz)"
        min={200}
        max={800}
        step={20}
        value={f}
        onChange={setF}
      />
      <svg
        viewBox="0 0 600 260"
        role="img"
        aria-label="Wavefronts emitted at earlier source positions"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx={300 - v * i * 0.08}
            cy="130"
            r={343 * i * 0.08}
            fill="none"
            stroke="var(--accent)"
            opacity={1 - i * 0.12}
          />
        ))}
        <circle cx="300" cy="130" r="9" fill="var(--foreground)" />
        <text x="475" y="135">
          Observer
        </text>
      </svg>
      <Stats
        items={[
          ["Observed frequency (Hz)", fixed((f * 343) / (343 - v), 1)],
          [
            "Approach / recession",
            v > 0 ? "Approach" : v < 0 ? "Recession" : "Stationary",
          ],
        ]}
      />
      <p>
        Try making 440 Hz sound close to 660 Hz by moving the source. This is
        the classical sound-source formula, not the relativistic Doppler formula
        for light; no actual audio plays.
      </p>
    </>
  );
}
export function Refraction() {
  const [angle, setAngle] = useState(35),
    [reverse, setReverse] = useState(false),
    n1 = reverse ? 1.5 : 1,
    n2 = reverse ? 1 : 1.5,
    out = snell(angle, n1, n2),
    rad = (angle * Math.PI) / 180;
  return (
    <>
      <p>
        A ray crosses between ideal air (n = 1) and glass (n = 1.5). Angles are
        measured from the dashed normal, not the surface.
      </p>
      <Slider
        label="Incident angle (degrees)"
        min={0}
        max={80}
        value={angle}
        onChange={setAngle}
      />
      <Actions>
        <button aria-pressed={reverse} onClick={() => setReverse(!reverse)}>
          Direction: {reverse ? "Glass to air" : "Air to glass"}
        </button>
      </Actions>
      <svg
        viewBox="0 0 400 300"
        role="img"
        aria-label="Incident and refracted or totally reflected ray"
      >
        <rect x="0" y="150" width="400" height="150" fill="var(--surface)" />
        <path
          d="M0 150H400 M200 10V290"
          stroke="var(--border)"
          strokeDasharray="6 4"
        />
        <line
          x1={200 - 130 * Math.sin(rad)}
          y1={150 - 130 * Math.cos(rad)}
          x2="200"
          y2="150"
          stroke="var(--foreground)"
          strokeWidth="4"
        />
        <line
          x1="200"
          y1="150"
          x2={200 + 130 * Math.sin(((out ?? angle) * Math.PI) / 180)}
          y2={
            150 +
            (out === null ? -1 : 1) *
              130 *
              Math.cos(((out ?? angle) * Math.PI) / 180)
          }
          stroke="var(--accent)"
          strokeWidth="4"
        />
      </svg>
      <Stats
        items={[
          ["Incident index", n1],
          ["Outgoing index", n2],
          [
            "Refracted angle",
            out === null ? "Total internal reflection" : fixed(out, 1) + "°",
          ],
        ]}
      />
      <p>
        In glass-to-air mode, exceed the critical angle of about 41.8°. The
        drawing shows the transmitted direction or total internal reflection,
        omitting partial reflection and polarisation.
      </p>
    </>
  );
}
export function InverseSquare() {
  const [r, setR] = useState(1),
    [power, setPower] = useState(100);
  return (
    <>
      <p>
        An ideal point source spreads power uniformly through spherical
        surfaces. Compare intensity relative to a reference area at distance
        one.
      </p>
      <Slider
        label="Distance from point source"
        min={1}
        max={10}
        step={0.5}
        value={r}
        onChange={setR}
      />
      <Slider
        label="Source scale"
        min={20}
        max={200}
        step={10}
        value={power}
        onChange={setPower}
      />
      <Plot
        series={[
          {
            name: "Relative intensity",
            points: Array.from({ length: 91 }, (_, i) => [
              1 + i / 10,
              power / (1 + i / 10) ** 2,
            ]),
          },
        ]}
        minX={1}
        maxX={10}
        maxY={200}
        xLabel="Distance"
        yLabel="Intensity units"
      />
      <Stats
        items={[
          ["Selected intensity", fixed(power / r ** 2)],
          ["Fraction of distance-one intensity", fixed(1 / r ** 2, 3)],
          ["Spherical area ratio", fixed(r * r)],
        ]}
      />
      <p>
        Double distance to quarter intensity. The rule assumes a point source,
        unobstructed propagation and no absorption; it is not a universal rule
        for every nearby light, loudspeaker or extended emitter.
      </p>
    </>
  );
}
export function DoubleSlit() {
  const [wave, setWave] = useState(550),
    [d, setD] = useState(0.25),
    [slits, setSlits] = useState("Two coherent slits");
  const intensity = (y: number) =>
    slits === "One slit baseline"
      ? 1
      : Math.cos((Math.PI * d * y) / (wave * 0.001)) ** 2;
  return (
    <>
      <p>
        Two ideal coherent narrow slits illuminate a screen one metre away. A
        small-angle far-field approximation ignores the single-slit envelope.
      </p>
      <Slider
        label="Wavelength (nm)"
        min={400}
        max={700}
        step={10}
        value={wave}
        onChange={setWave}
      />
      <Slider
        label="Slit separation (mm)"
        min={0.1}
        max={1}
        step={0.05}
        value={d}
        onChange={setD}
      />
      <Choices
        label="Illumination"
        options={["Two coherent slits", "One slit baseline"]}
        value={slits}
        onChange={setSlits}
      />
      <div
        className="prism-fringes"
        role="img"
        aria-label="Normalised screen intensity from minus ten to plus ten millimetres"
      >
        {Array.from({ length: 200 }, (_, i) => (
          <span
            key={i}
            style={{
              background: `rgb(${Math.round(255 * intensity(-10 + i * 0.1))},${Math.round(255 * intensity(-10 + i * 0.1))},${Math.round(255 * intensity(-10 + i * 0.1))})`,
            }}
          />
        ))}
      </div>
      <Plot
        series={[
          {
            name: "Normalised intensity",
            points: Array.from({ length: 201 }, (_, i) => [
              -10 + i * 0.1,
              intensity(-10 + i * 0.1),
            ]),
          },
        ]}
        minX={-10}
        maxX={10}
        xLabel="Screen position (mm)"
        yLabel="Intensity / maximum"
      />
      <Stats
        items={[["Two-slit fringe spacing (mm)", fixed((wave * 0.001) / d)]]}
      />
      <p>
        Greater slit separation packs fringes closer together. This wave-optics
        display does not simulate single-particle detection, which-path
        measurement or a laboratory light source.
      </p>
    </>
  );
}
export function Photoelectric() {
  const [wave, setWave] = useState(600),
    [flux, setFlux] = useState(5),
    [phi, setPhi] = useState(2);
  const energy = 1240 / wave,
    allowed = energy >= phi,
    emits = allowed && flux > 0;
  return (
    <>
      <p>
        Each incident photon has energy approximately 1240 divided by wavelength
        in nm, measured in eV. An ideal surface has an adjustable work function
        and one-electron-per-absorbed-photon yield above threshold.
      </p>
      <Slider
        label="Photon wavelength (nm)"
        min={200}
        max={800}
        step={10}
        value={wave}
        onChange={setWave}
      />
      <Slider
        label="Relative photon flux"
        min={0}
        max={10}
        value={flux}
        onChange={setFlux}
      />
      <Slider
        label="Work function (eV)"
        min={1}
        max={4}
        step={0.1}
        value={phi}
        onChange={setPhi}
      />
      <div
        className="prism-particles"
        aria-label={emits ? "Emission allowed" : "No emitted electrons"}
      >
        {Array.from({ length: emits ? flux : 0 }, (_, i) => (
          <span key={i}>e⁻ →</span>
        ))}
      </div>
      <Stats
        items={[
          ["Photon energy (eV)", fixed(energy)],
          [
            "Maximum energy if emitted (eV)",
            allowed ? fixed(energy - phi) : "Below threshold",
          ],
          ["Emission now", emits ? "Allowed" : "None"],
        ]}
      />
      <p>
        Try the longest wavelength first and raise flux: more below-threshold
        photons do not release electrons here. Particle icons represent relative
        flux, not a measured current or emission rate.
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
  const B = [Doppler, Refraction, InverseSquare, DoubleSlit, Photoelectric][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
