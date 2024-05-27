import { render, screen } from "@testing-library/react";
import { AddAccountForm } from "./AddAccountForm";
import { AccountsContext } from "../../contexts/AccountsContext";
import { useSelection, useToast } from "../../hooks";
import "@testing-library/jest-dom";

jest.mock("../../hooks", () => ({
  useSelection: jest.fn(),
  useToast: jest.fn(() => ({ showToast: jest.fn() })),
}));

describe("AddAccountForm", () => {
  const mockSetAccounts = jest.fn();
  const mockResetSelection = jest.fn();
  const mockShowToast = jest.fn();
  const mockClose = jest.fn();

  beforeEach(() => {
    (useSelection as jest.Mock).mockReturnValue({
      resetSelection: mockResetSelection,
    });
    (useToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
  });

  const renderComponent = (editFormConfig?: any) =>
    render(
      <AccountsContext.Provider
        value={{ accounts: [], setAccounts: mockSetAccounts }}
      >
        <AddAccountForm onClose={mockClose} editFormConfig={editFormConfig} />
      </AccountsContext.Provider>,
    );

  test("renders form fields correctly", () => {
    renderComponent();
    const ownerIdInput = screen.getByLabelText("Owner ID:");
    const balanceInput = screen.getByLabelText("Balance:");
    const currencySelect = screen.getByLabelText("Currency:");

    expect(ownerIdInput).toBeInTheDocument();
    expect(balanceInput).toBeInTheDocument();
    expect(currencySelect).toBeInTheDocument();
  });
});
