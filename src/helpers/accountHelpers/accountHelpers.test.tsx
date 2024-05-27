import { Decimal } from "decimal.js";
import { calculateTransferAmount } from "./accountHelpers";
import { BASE_EXCHANGE_RATES } from "../../constants";

describe("calculateTransferAmount tests", () => {
  const currencyPairs: [string, string][] = [];
  const currencyKeys = Object.keys(BASE_EXCHANGE_RATES) as string[];

  for (let i = 0; i < currencyKeys.length; i++) {
    for (let j = i + 1; j < currencyKeys.length; j++) {
      currencyPairs.push([currencyKeys[i], currencyKeys[j]]);
    }
  }

  describe.each(currencyPairs)(
    "when fromCurrency is %s and toCurrency is %s",
    (fromCurrency, toCurrency) => {
      test("correctly calculates transfer amount for different currencies", () => {
        const stateAmount = "50.00";

        const expected = new Decimal(stateAmount)
          .dividedBy(new Decimal(BASE_EXCHANGE_RATES[fromCurrency] as number))
          .times(new Decimal(BASE_EXCHANGE_RATES[toCurrency] as number))
          .toFixed(2);

        const result = calculateTransferAmount(
          stateAmount,
          fromCurrency,
          toCurrency,
        );

        expect(result).toEqual(expected);
      });
    },
  );

  describe.each(currencyKeys)(
    "when both fromCurrency and toCurrency are %s",
    (currency) => {
      test("returns the same amount", () => {
        const stateAmount = "20.00";

        const result = calculateTransferAmount(stateAmount, currency, currency);

        expect(result).toEqual(stateAmount);
      });
    },
  );
});
