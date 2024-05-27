import { ToastTypeEnum } from "../../enums";
import { deleteAccount, getAccounts } from "../../helpers";
import { IAccount } from "../../interfaces";
import { useAccountsContext } from "../useAccountsContext";
import { useSelection } from "../useSelection";
import { useToast } from "../useToast";

export const useHandleDeleteAccounts = () => {
  const { setAccounts } = useAccountsContext();
  const { resetSelection } = useSelection<IAccount>();
  const { showToast } = useToast();

  const getSuccessToastText = (num: number): string => {
    return num > 1
      ? `Successfully deleted ${num} accounts.`
      : "Successfully deleted an account.";
  };

  const getErrorToastText = (num: number, error: Error): string => {
    return num > 1
      ? `Could not delete ${num} accounts. ${error}`
      : `Could not delete an account. ${error}`;
  };

  const handleDeleteAccounts =
    (accounts: IAccount[]) => async (): Promise<void> => {
      try {
        await Promise.all(
          accounts!.map((account: IAccount) => deleteAccount(account.id)),
        );
        resetSelection();
        const updatedAccounts: IAccount[] = await getAccounts();
        setAccounts(updatedAccounts);
        showToast({
          header: "Success!",
          text: getSuccessToastText(accounts.length),
          type: ToastTypeEnum.SUCCESS,
        });
      } catch (error) {
        showToast({
          header: "Error",
          text: getErrorToastText(accounts.length, error as Error),
          type: ToastTypeEnum.ERROR,
        });
      }
    };
  return { handleDeleteAccounts };
};
