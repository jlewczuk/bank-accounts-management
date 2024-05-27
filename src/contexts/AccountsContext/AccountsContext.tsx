import React, { createContext } from "react";
import { IAccount } from "../../interfaces";

export type AccountsContext = {
  accounts: IAccount[] | null;
  setAccounts: React.Dispatch<React.SetStateAction<IAccount[] | null>>;
};

export const AccountsContext = createContext<AccountsContext | null>(null);
