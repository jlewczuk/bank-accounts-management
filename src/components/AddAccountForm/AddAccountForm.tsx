import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CURRENCIES, Currency } from "../../constants";
import { AccountsContext } from "../../contexts/AccountsContext";
import { MaskEnum, ToastTypeEnum } from "../../enums";
import { patchAccount, postAccount } from "../../helpers";
import { useSelection, useToast } from "../../hooks";
import { IAccount } from "../../interfaces";
import { Button } from "../Button";
import { Input } from "../Input";
import { Select } from "../Select";
import { OptionType } from "../Select/Select";
import { ButtonContainer } from "../styledComponents";

interface AddAccountFormProps {
  onClose: () => void;
  editFormConfig?: EditFormConfig;
}

interface EditFormConfig {
  isEditMode: boolean;
  accountDataToBeEdited: IAccount;
}

export const AddAccountForm = ({
  onClose,
  editFormConfig,
}: AddAccountFormProps) => {
  const { accounts, setAccounts } = useContext(
    AccountsContext,
  ) as AccountsContext;
  const { resetSelection } = useSelection<IAccount>();
  const { showToast } = useToast();
  const { isEditMode, accountDataToBeEdited } = editFormConfig || {};

  const [accountData, setAccountData] = useState<IAccount>(
    isEditMode
      ? (accountDataToBeEdited as IAccount)
      : {
          id: uuidv4(),
          ownerId: "",
          balance: "",
          currency: "",
        },
  );

  const mapCurrenciesToOptionType = (currency: Currency | ""): OptionType => ({
    label: currency,
    value: currency,
  });

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ): void => {
    setAccountData({
      ...accountData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSuccess = (accountData: IAccount): void => {
    if (isEditMode && accounts) {
      const updatedAccounts: IAccount[] = accounts.map((account: IAccount) =>
        account.id === accountData.id ? { ...accountData } : account,
      );
      setAccounts(updatedAccounts);
    } else {
      setAccounts((prevAccounts: IAccount[] | null) => [
        ...(prevAccounts || []),
        { ...accountData },
      ]);
    }
    resetSelection();

    showToast({
      header: "Success!",
      text: isEditMode
        ? `Saved account with: \n Owner ID: ${accountData.ownerId} \n Balance: ${accountData.balance} \n Currency: ${accountData.currency}`
        : `Added account with: \n Owner ID: ${accountData.ownerId} \n Balance: ${accountData.balance} \n Currency: ${accountData.currency}`,
      type: ToastTypeEnum.SUCCESS,
    });

    onClose();
  };

  const handleError = (error: unknown): void => {
    showToast({
      header: "Something went wrong...",
      text: isEditMode
        ? `Account could not be saved.\n ${error instanceof Error}`
        : `Account could not be added.\n ${error instanceof Error}`,
      type: ToastTypeEnum.ERROR,
    });
  };

  const handleDuplicate = (account: IAccount): void => {
    showToast({
      header: isEditMode
        ? "Failed to save account..."
        : "Account creation failed...",
      text: `An account with Owner ID: ${account.ownerId} already exists.`,
      type: ToastTypeEnum.ERROR,
    });
  };

  const isDisabled = (account: IAccount) => {
    return Boolean(!account.ownerId || !account.balance || !account.currency);
  };

  const checkDuplicateOwnerId = (
    accounts: IAccount[] | null,
    accountData: IAccount,
  ): boolean =>
    accounts?.some(
      (account: IAccount): boolean =>
        accountData.ownerId === account.ownerId &&
        (!isEditMode || account.id !== accountData.id),
    ) || false;

  const manageAccount = async (
    isEditMode: boolean,
    accountData: IAccount,
  ): Promise<void> => {
    isEditMode
      ? await patchAccount(accountData)
      : await postAccount(accountData);
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      if (checkDuplicateOwnerId(accounts, accountData)) {
        handleDuplicate(accountData);
      } else {
        await manageAccount(!!isEditMode, accountData);
        handleSuccess(accountData);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Owner ID:"
        type="text"
        name="ownerId"
        value={accountData.ownerId}
        onChange={handleChange}
        mask={MaskEnum.Number}
        required
      />
      <Input
        label="Balance:"
        type="text"
        name="balance"
        value={accountData.balance}
        onChange={handleChange}
        mask={MaskEnum.Decimal}
        required
      />
      <Select
        label="Currency:"
        options={CURRENCIES.map(mapCurrenciesToOptionType)}
        name="currency"
        value={accountData.currency}
        onChange={handleChange}
        required
      />
      <ButtonContainer>
        <Button
          type="submit"
          text={isEditMode ? "Save account" : "Add account"}
          disabled={isDisabled(accountData)}
        />
      </ButtonContainer>
    </form>
  );
};
