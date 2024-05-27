import { Decimal } from "decimal.js";
import { BASE_EXCHANGE_RATES } from "../../constants";

export const calculateTransferAmount = (
  stateAmount: string,
  fromCurrency: string,
  toCurrency: string,
): string => {
  let transferredAmount = new Decimal(stateAmount);
  if (fromCurrency !== toCurrency) {
    transferredAmount = transferredAmount
      .dividedBy(new Decimal(BASE_EXCHANGE_RATES[fromCurrency]))
      .times(new Decimal(BASE_EXCHANGE_RATES[toCurrency]));
  }
  return transferredAmount.toFixed(2);
};
