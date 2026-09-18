import {
  defaultGamblerInput,
  gamblerRuinInputSchema,
  type GamblerRuinInput,
} from "./gamblers-ruin";
export function parseRuinParams(params: URLSearchParams): {
  input: GamblerRuinInput;
  warning: string | null;
} {
  const candidate = { ...defaultGamblerInput };
  let hasInvalid = false;
  for (const key of Object.keys(candidate) as (keyof GamblerRuinInput)[]) {
    const value = params.get(key);
    if (value !== null) {
      if (!value.trim() || params.getAll(key).length > 1) hasInvalid = true;
      candidate[key] = Number(value);
    }
  }
  const parsed = gamblerRuinInputSchema.safeParse(candidate);
  return parsed.success && !hasInvalid
    ? { input: parsed.data, warning: null }
    : {
        input: { ...defaultGamblerInput },
        warning:
          "This link contains invalid settings. The experiment has been restored to its defaults.",
      };
}
export function serializeRuinParams(input: GamblerRuinInput): string {
  const validated = gamblerRuinInputSchema.parse(input);
  return new URLSearchParams(
    Object.entries(validated).map(([key, value]) => [key, String(value)]),
  ).toString();
}
