import { ReactNode, useState } from "react";
import { AccountsContext } from "./AccountsContext";
import { IAccount } from "../../interfaces";

type AccountsProviderProps = {
  children: ReactNode;
};

export const AccountsProvider = ({ children }: AccountsProviderProps) => {
  const [accounts, setAccounts] = useState<IAccount[] | null>(null);

  return (
    <AccountsContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AccountsContext.Provider>
  );
};
