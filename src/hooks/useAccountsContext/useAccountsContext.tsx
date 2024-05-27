import { useContext } from "react";
import { AccountsContext } from "../../contexts/AccountsContext";

export const useAccountsContext = (): AccountsContext => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error(
      "useAccountsContext must be used within an AccountsContext provider",
    );
  }
  return context;
};
