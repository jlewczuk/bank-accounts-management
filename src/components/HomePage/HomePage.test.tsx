import { render, waitFor } from "@testing-library/react";
import React from "react";
import { HomePage } from "./HomePage";
import { getAccounts } from "../../helpers";
import { useAccountsContext } from "../../hooks";
import { IAccount } from "../../interfaces";

jest.mock("../../helpers", () => ({ getAccounts: jest.fn() }));

jest.mock("../../hooks", () => ({
  useAccountsContext: jest.fn(),
  useHandleRoute: () => jest.fn(),
}));

jest.spyOn(React, "useRef").mockReturnValueOnce({ current: false });

test("HomePage", async () => {
  const mockSetAccounts = jest.fn();

  (useAccountsContext as jest.Mock).mockImplementation(() => ({
    setAccounts: mockSetAccounts,
  }));

  const accounts: IAccount[] = [
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
  (getAccounts as jest.Mock).mockResolvedValue(accounts);

  render(<HomePage />);

  await waitFor(() => expect(mockSetAccounts).toHaveBeenCalledWith(accounts));
});
