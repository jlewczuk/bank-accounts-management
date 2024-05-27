import { Currency } from "../constants";

export interface IAccount {
  id: string;
  ownerId: string;
  currency: Currency | "";
  balance: string;
}
