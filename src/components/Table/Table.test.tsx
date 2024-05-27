import { render } from "@testing-library/react";
import { ComponentType, ReactElement } from "react";
import { Table } from "./Table";
import {
  AccountsProvider,
  SelectionProvider,
  ToastProvider,
} from "../../contexts";
import { IAccount } from "../../interfaces";
import "@testing-library/jest-dom";

jest.mock("../../hoc", () => ({
  withPopup: (WrappedComponent: ComponentType<any>) => (props: any) => (
    <WrappedComponent {...props} />
  ),
}));

describe("Table", () => {
  const headers = ["ID", "Owner ID", "Currency", "Balance"];
  const rows: IAccount[] = [
    { id: "1", ownerId: "001", currency: "USD", balance: "5000" },
    { id: "2", ownerId: "002", currency: "EUR", balance: "2000" },
  ];
  const columnWidths = ["1fr", "1fr", "1fr", "1fr"];

  const renderWithProviders = (component: ReactElement) => {
    return render(
      <SelectionProvider>
        <AccountsProvider>
          <ToastProvider>{component}</ToastProvider>
        </AccountsProvider>
      </SelectionProvider>,
    );
  };

  it("renders the headers", () => {
    const { getByText } = renderWithProviders(
      <Table headers={headers} rows={rows} columnWidths={columnWidths} />,
    );
    headers.forEach((header) => {
      expect(getByText(header)).toBeInTheDocument();
    });
  });

  it("renders the rows", () => {
    const { getByText } = renderWithProviders(
      <Table headers={headers} rows={rows} columnWidths={columnWidths} />,
    );
    rows.forEach((row: IAccount) => {
      expect(getByText(row.ownerId)).toBeInTheDocument();
      expect(getByText(row.currency)).toBeInTheDocument();
      expect(getByText(row.balance)).toBeInTheDocument();
    });
  });
});
