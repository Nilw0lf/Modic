"use client";
import { useState } from "react";
import { matrixGame, pureEquilibria } from "@/lib/simulations/strategy";
import type { Settings } from "@/lib/simulations/everyday";
import { seededRandom } from "@/lib/simulations/random";

export function StrategyBoard({
  id,
  settings,
  seed,
}: {
  id: string;
  settings: Settings;
  seed: number;
}) {
  const [rounds, setRounds] = useState<
    { a: number; b: number; score: [number, number] }[]
  >([]);
  const game = matrixGame(id, settings);
  if (!game) return null;
  const equilibria = pureEquilibria(game),
    last = rounds.at(-1);
  function play(a: number) {
    const random = seededRandom(seed + rounds.length * 7919),
      b = random() < settings.opponent / 100 ? 0 : 1;
    setRounds((previous) => [...previous, { a, b, score: game!.cells[a][b] }]);
  }
  return (
    <section className="strategy-board" aria-label="Play the payoff table">
      <h3>Choose your move</h3>
      <p>
        Each cell shows your points, then your opponent’s. The opponent uses the
        probability above; your move does not change its draw.
      </p>
      <div className="strategy-table-wrap">
        <table className="strategy-table">
          <caption>
            Payoff table · highlighted cells are pure equilibria
          </caption>
          <thead>
            <tr>
              <th scope="col">You ↓ / opponent →</th>
              {game.actions.map((a) => (
                <th scope="col" key={a}>
                  {a}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {game.cells.map((row, a) => (
              <tr key={a}>
                <th scope="row">{game.actions[a]}</th>
                {row.map((score, b) => (
                  <td
                    key={b}
                    className={
                      equilibria.some(([i, j]) => i === a && j === b)
                        ? "equilibrium"
                        : ""
                    }
                  >
                    {score.join(" , ")}
                    {equilibria.some(([i, j]) => i === a && j === b) && (
                      <small>Equilibrium</small>
                    )}
                    {last?.a === a && last.b === b && <small>Last round</small>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {equilibria.length === 0 && (
        <p>
          No pure equilibrium. In Matching Pennies, both players randomize 50/50
          at the mixed equilibrium.
        </p>
      )}
      <div className="concept-actions">
        {game.actions.map((a, i) => (
          <button key={a} onClick={() => play(i)}>
            Play {a}
          </button>
        ))}
        <button disabled={!rounds.length} onClick={() => setRounds([])}>
          Clear rounds
        </button>
      </div>
      <p role="status">
        {last
          ? `Round ${rounds.length}: you chose ${game.actions[last.a]}, opponent chose ${game.actions[last.b]}. Points: ${last.score[0]} to ${last.score[1]}. Total: ${rounds.reduce((sum, r) => sum + r.score[0], 0)} to ${rounds.reduce((sum, r) => sum + r.score[1], 0)}.`
          : "Choose an action to play your first round."}
      </p>
      <p className="small-note">
        Changing the rules or opponent probability starts a new session.
      </p>
    </section>
  );
}
