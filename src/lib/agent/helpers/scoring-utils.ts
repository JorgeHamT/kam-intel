export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function average(values: number[]): number {
  if (!values.length) {
    return 0;
  }

  return round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export function sum(values: number[]): number {
  return round(values.reduce((acc, value) => acc + value, 0));
}

export function toPercentage(value: number | null): string {
  if (value === null) {
    return "sin dato";
  }

  return `${round(value)}%`;
}

export function toFixedMetric(value: number | null): string {
  if (value === null) {
    return "sin dato";
  }

  return String(round(value));
}

