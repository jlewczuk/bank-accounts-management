import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useHandleDeleteAccounts } from "./useHandleDeleteAccounts";
import { deleteAccount, getAccounts } from "../../helpers";
import { IAccount } from "../../interfaces";
import { useAccountsContext } from "../useAccountsContext";
import { useSelection } from "../useSelection";
import { useToast } from "../useToast";

jest.mock("../useAccountsContext/useAccountsContext");
jest.mock("../useSelection/useSelection");
jest.mock("../useToast/useToast");
jest.mock("../../helpers");

const mockAccounts: IAccount[] = [
  {
    id: "2708c000-f363-43a9-9a70-e49d7f380228",
    ownerId: "003423",
    balance: "123.45",
    currency: "GBP",
  },
  {
    id: "e48229ee-fd43-48b1-b3c6-c2f1b022f6f0",
    ownerId: "741784812",
    balance: "23234.23",
    currency: "EUR",
  },
];

describe("useHandleDeleteAccounts", () => {
  const setAccounts = jest.fn();
  const resetSelection = jest.fn();
  const showToast = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (useAccountsContext as jest.Mock).mockImplementation(() => ({
      setAccounts,
    }));
    (useSelection as jest.Mock).mockImplementation(() => ({ resetSelection }));
    (useToast as jest.Mock).mockImplementation(() => ({ showToast }));
  });

  it("calls deleteAccount for each account and updates the state", async () => {
    (deleteAccount as jest.Mock).mockResolvedValueOnce(undefined);
    (getAccounts as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useHandleDeleteAccounts());

    await act(async () => {
      await result.current.handleDeleteAccounts(mockAccounts)();
    });

    expect(deleteAccount).toHaveBeenCalledTimes(2);
    mockAccounts.forEach((account, index) => {
      expect(deleteAccount).toHaveBeenNthCalledWith(index + 1, account.id);
    });
    expect(resetSelection).toHaveBeenCalledTimes(1);
    expect(getAccounts).toHaveBeenCalledTimes(1);
    expect(setAccounts).toHaveBeenCalledWith([]);
    expect(showToast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "success",
        header: "Success!",
        text: "Successfully deleted 2 accounts.",
      }),
    );
  });

  it("handles errors correctly when deleting accounts fails", async () => {
    (deleteAccount as jest.Mock).mockImplementation(() => {
      throw new Error("Delete failed");
    });

    const { result } = renderHook(() => useHandleDeleteAccounts());

    await act(async () => {
      try {
        await result.current.handleDeleteAccounts(mockAccounts)();
      } catch (error) {
        /* empty */
      }
    });

    expect(showToast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "error",
        header: "Error",
        text: "Could not delete 2 accounts. Error: Delete failed",
      }),
    );
  });
});
