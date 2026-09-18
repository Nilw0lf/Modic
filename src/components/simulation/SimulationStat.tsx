export function SimulationStat({
  label,
  value,
  unit = "years",
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="simulation-stat">
      <dt>{label}</dt>
      <dd>
        {value} <span>{unit}</span>
      </dd>
    </div>
  );
}
