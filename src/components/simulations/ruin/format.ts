export const wealthFormat = (value: number) =>
  value >= 1e9
    ? value.toExponential(2)
    : new Intl.NumberFormat("en-US", {
        maximumFractionDigits: value < 100 ? 1 : 0,
      }).format(value);
export const percentFormat = (value: number) => `${(value * 100).toFixed(1)}%`;
