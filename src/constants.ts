import { decimalMask, numberMask, textMask } from "./helpers";

export const BASE_URL: string = "http://localhost:3001";

export const TABLE_COLUMN_WIDTHS: string[] = [
  "3%",
  "40%",
  "20%",
  "20%",
  "10%",
  "7%",
];

export type Currency =
  | "USD"
  | "EUR"
  | "JPY"
  | "GBP"
  | "AUD"
  | "CAD"
  | "CHF"
  | "CNY"
  | "SEK"
  | "NZD";

export const CURRENCIES: (Currency | "")[] = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "SEK",
  "NZD",
];

export const BASE_EXCHANGE_RATES: Record<Currency, number | null> = {
  USD: 1,
  EUR: 0.85,
  JPY: 113.13,
  GBP: 0.75,
  AUD: 1.35,
  CAD: 1.26,
  CHF: 0.92,
  CNY: 6.38,
  SEK: 8.76,
  NZD: 1.42,
};

export const INPUT_MASKS = {
  text: textMask,
  decimal: decimalMask,
  number: numberMask,
};
