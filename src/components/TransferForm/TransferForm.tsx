import { Decimal } from "decimal.js";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MaskEnum, OperationsEnum, ToastTypeEnum } from "../../enums";
import {
  calculateTransferAmount,
  generateSelectOptions,
  patchAccount,
} from "../../helpers";
import { useAccountsContext, useToast } from "../../hooks";
import { IAccount } from "../../interfaces";
import { AccountDetails } from "../AccountDetails";
import { Button } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import { Input } from "../Input";
import { Select } from "../Select";
import { OptionType } from "../Select/Select";
import { ButtonContainer } from "../styledComponents";

interface TransferFormProps {
  onClose: () => void;
}

type TransferState = {
  from?: string;
  to?: string;
  amount?: string;
};

export const TransferForm = ({ onClose }: TransferFormProps) => {
  const { accounts, setAccounts } = useAccountsContext();
  const { showToast } = useToast();

  const accountOptions: OptionType[] = generateSelectOptions(
    accounts || [],
    "id",
    (account: IAccount) => String(account.ownerId),
  );

  const [state, setState] = useState<TransferState>({});
  const { from, to, amount } = state;

  const [fromAccount, setFromAccount] = useState<IAccount | undefined>();
  const [toAccount, setToAccount] = useState<IAccount | undefined>();

  const areBothAccountsUndefined = from === undefined && to === undefined;
  const isSameAccount = from === to && from !== undefined;

  const isBalanceExceeded =
    fromAccount && parseFloat(amount!) > parseFloat(fromAccount.balance);
  const isTransferButtonDisabled =
    from === to ||
    !amount ||
    parseFloat(amount) > (parseFloat(fromAccount!.balance) || 0);

  useEffect(() => {
    setFromAccount(accounts?.find((account: IAccount) => account.id === from));
  }, [from, accounts]);

  useEffect(() => {
    setToAccount(accounts?.find((account: IAccount) => account.id === to));
  }, [to, accounts]);

  const handleChange =
    (field: keyof TransferState) =>
    (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const newState = { ...state, [field]: e.target.value };
      setState(newState);
    };

  const updateAccountBalance = async (
    account: IAccount,
    amount: string,
    operation: OperationsEnum,
  ) => {
    let updatedBalance = new Decimal(account.balance);

    if (operation === OperationsEnum.Add) {
      updatedBalance = updatedBalance.plus(amount);
    } else {
      updatedBalance = updatedBalance.minus(amount);
    }

    account.balance = updatedBalance.toFixed(2).toString();
    return await patchAccount(account);
  };

  const transferBalance = async (
    fromAccount: IAccount,
    toAccount: IAccount,
    transferAmount: string,
  ) => {
    try {
      const convertedAmount = calculateTransferAmount(
        transferAmount,
        fromAccount.currency,
        toAccount.currency,
      );
      await performTransaction(
        fromAccount,
        transferAmount,
        OperationsEnum.Subtract,
      );
      await performTransaction(toAccount, convertedAmount, OperationsEnum.Add);
      refreshAccounts(fromAccount, toAccount, transferAmount, convertedAmount);
    } catch (error: unknown) {
      if (error instanceof Error) {
        triggerErrorToast(error.message);
      } else {
        triggerErrorToast("An unexpected error occurred");
      }
    }
  };

  const performTransaction = async (
    account: IAccount,
    amount: string,
    operation: OperationsEnum,
  ) => {
    try {
      await updateAccountBalance(account, amount, operation);
    } catch (error) {
      throw new Error(`Failed to update balance. ${error}`);
    }
  };

  const refreshAccounts = (
    fromAccount: IAccount,
    toAccount: IAccount,
    transferAmount: string,
    convertedAmount: string,
  ) => {
    setAccounts?.(
      accounts!.map((account) => {
        if (account.id === fromAccount.id) return fromAccount;
        if (account.id === toAccount.id) return toAccount;
        return account;
      }),
    );
    triggerSuccessToast(
      fromAccount,
      toAccount,
      transferAmount,
      convertedAmount,
    );
    onClose();
  };

  const triggerSuccessToast = (
    fromAccount: IAccount,
    toAccount: IAccount,
    transferAmount: string,
    convertedAmount: string,
  ) => {
    showToast({
      header: "Success!",
      text: `Successfully transferred ${transferAmount} ${fromAccount.currency}${
        fromAccount.currency !== toAccount.currency
          ? ` ( ${convertedAmount} ${toAccount.currency} )`
          : ""
      } from owner ${fromAccount.ownerId} to owner ${toAccount.ownerId}!`,
      type: ToastTypeEnum.SUCCESS,
    });
  };

  const triggerErrorToast = (error: string) => {
    showToast({
      header: "Error",
      text: `We could not process your request. ${error}`,
      type: ToastTypeEnum.ERROR,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    fromAccount &&
      toAccount &&
      amount !== undefined &&
      (await transferBalance(fromAccount, toAccount, amount));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Source Account:"
        name="sourceAccount"
        options={accountOptions}
        value={from || ""}
        onChange={handleChange("from")}
      />
      {fromAccount && <AccountDetails account={fromAccount} />}
      <Select
        label="Target Account:"
        name="targetAccount"
        options={accountOptions}
        value={to || ""}
        onChange={handleChange("to")}
      />
      {toAccount && <AccountDetails account={toAccount} />}
      <Input
        label="Amount:"
        type="text"
        name="amount"
        value={amount || ""}
        onChange={handleChange("amount")}
        mask={MaskEnum.Decimal}
        required
      />
      {!areBothAccountsUndefined && isSameAccount && (
        <ErrorMessage text={`Source and target account must be different`} />
      )}
      {isBalanceExceeded && (
        <ErrorMessage
          text={`Balance of the source account is insufficient for this transaction.`}
        />
      )}
      <ButtonContainer>
        <Button
          text="Transfer"
          type="submit"
          disabled={isTransferButtonDisabled}
        />
      </ButtonContainer>
    </form>
  );
};
