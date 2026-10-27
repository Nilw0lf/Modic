import { Stats as BaseStats } from "../depth/Shared";
export { Actions, Slider, Chart, Ledger } from "../depth/Shared";
export function Stats({ items }: { items: [string, string | number][] }) {
  return (
    <BaseStats items={items.map(([label, value]) => [label, String(value)])} />
  );
}
