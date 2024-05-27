import { fireEvent, render } from "@testing-library/react";
import { TransferForm } from "./TransferForm";
import { ToastProvider } from "../../contexts";
import { IAccount } from "../../interfaces";
import { OptionType } from "../Select/Select";
import "@testing-library/jest-dom";

const mockAccounts: IAccount[] = [
  { id: "1", ownerId: "1234", currency: "USD", balance: "100" },
  { id: "2", ownerId: "4321", currency: "EUR", balance: "200" },
];

const mockSelectOptions: OptionType[] = [
  { value: "1", label: "1234" },
  { value: "2", label: "4321" },
];

jest.mock("../../hooks", () => ({
  useAccountsContext: jest
    .fn()
    .mockReturnValue({ accounts: mockAccounts, setAccounts: jest.fn() }),
  useToast: jest.fn().mockReturnValue({ showToast: jest.fn() }),
}));

jest.mock("../../helpers", () => ({
  patchAccount: jest.fn(),
  generateSelectOptions: jest.fn(() => mockSelectOptions),
}));

describe("TransferForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders TransferForm component properly", () => {
    const { getByLabelText, getByText } = render(
      <ToastProvider>
        <TransferForm onClose={() => {}} />
      </ToastProvider>,
    );

    expect(getByLabelText("Source Account:")).toBeInTheDocument();
    expect(getByLabelText("Target Account:")).toBeInTheDocument();
    expect(getByLabelText("Amount:")).toBeInTheDocument();
    expect(getByText("Transfer")).toBeInTheDocument();
  });

  it("disables transfer button when source and target accounts are the same", () => {
    const { getByLabelText, getByText } = render(
      <ToastProvider>
        <TransferForm onClose={() => {}} />
      </ToastProvider>,
    );

    fireEvent.change(getByLabelText("Source Account:"), {
      target: { value: "1" },
    });
    fireEvent.change(getByLabelText("Target Account:"), {
      target: { value: "1" },
    });

    expect(getByText("Transfer")).toBeDisabled();
  });
});
