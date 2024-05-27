import { render, screen } from "@testing-library/react";
import { ComponentType } from "react";
import { AccountsManagementPanel } from "./AccountsManagementPanel";
import { SelectionProvider, ToastProvider } from "../../contexts";
import { AccountsContext } from "../../contexts/AccountsContext";
import { IAccount } from "../../interfaces";
import "@testing-library/jest-dom";

jest.mock("../../hoc", () => ({
  withPopup: (WrappedComponent: ComponentType<any>) => (props: any) => (
    <WrappedComponent {...props} />
  ),
}));

jest.mock("../Table", () => ({
  Table: jest.fn(() => null),
}));

describe("AccountsManagementPanel", () => {
  const mockAccounts: IAccount[] = [
    { id: "1", ownerId: "owner1", currency: "USD", balance: "1000" },
    { id: "2", ownerId: "owner2", currency: "EUR", balance: "2000" },
  ];

  test("renders table when accounts are present", () => {
    const mockSetAccounts = jest.fn();

    render(
      <SelectionProvider>
        <AccountsContext.Provider
          value={{ accounts: mockAccounts, setAccounts: mockSetAccounts }}
        >
          <ToastProvider>
            <AccountsManagementPanel />
          </ToastProvider>
        </AccountsContext.Provider>
      </SelectionProvider>,
    );
  });

  test("renders no accounts message when accounts are not present", () => {
    const mockSetAccounts = jest.fn();

    render(
      <SelectionProvider>
        <AccountsContext.Provider
          value={{ accounts: [], setAccounts: mockSetAccounts }}
        >
          <ToastProvider>
            <AccountsManagementPanel />
          </ToastProvider>
        </AccountsContext.Provider>
      </SelectionProvider>,
    );

    const noAccountsMessage = screen.getByText(
      "No accounts have been added yet.",
    );
    expect(noAccountsMessage).toBeInTheDocument();
  });
});
