/**
 * Indicative rooftop solar estimation used by the calculator and the roof
 * visualisation. These are planning assumptions, not quoted figures — every
 * real number comes from a free on site survey.
 */
export const RATE_PER_UNIT = 8.5; // ₹ per unit, typical Jaipur slab
export const UNITS_PER_KW_PER_MONTH = 120; // Rajasthan average generation
export const SQFT_PER_KW = 90; // shadow free roof area needed per kW

export type PropertyType = "home" | "society" | "commercial";

export const PROPERTY_TYPES: { id: PropertyType; label: string; note: string }[] = [
  { id: "home", label: "Home", note: "Independent house or villa terrace" },
  { id: "society", label: "Society", note: "Shared roof, common area load" },
  { id: "commercial", label: "Commercial", note: "Factory, warehouse or showroom" },
];

export const CITIES = ["Jaipur", "Ajmer", "Jodhpur", "Kota", "Elsewhere in Rajasthan"];

export function estimate(monthlyBill: number) {
  const units = monthlyBill / RATE_PER_UNIT;
  const sizeKw = Math.max(1, Math.round((units / UNITS_PER_KW_PER_MONTH) * 2) / 2);
  const annualGeneration = Math.round(sizeKw * UNITS_PER_KW_PER_MONTH * 12);
  const monthlySavings = Math.round(
    Math.min(monthlyBill * 0.9, sizeKw * UNITS_PER_KW_PER_MONTH * RATE_PER_UNIT),
  );
  return {
    sizeKw,
    annualGeneration,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    roofAreaSqft: Math.round(sizeKw * SQFT_PER_KW),
  };
}

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
