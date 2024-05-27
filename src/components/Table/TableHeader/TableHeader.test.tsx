import { render } from "@testing-library/react";
import { TableHeader } from "./TableHeader";
import { useAccountsContext } from "../../../hooks";
import { IAccount } from "../../../interfaces";
import "@testing-library/jest-dom";

jest.mock("../../../hooks", () => ({
  useAccountsContext: jest.fn(),
}));

jest.mock("../../Checkbox", () => ({
  Checkbox: jest.fn(({ id }) => <input type="checkbox" id={id} />),
}));

describe("<TableHeader />", () => {
  const headers = ["ID", "Owner ID", "Balance", "Currency"];
  const columnWidths = ["50px", "150px", "150px", "100px", "50px"];
  const mockAccounts: IAccount[] = [
    { id: "1", ownerId: "001", balance: "100.00", currency: "USD" },
    { id: "2", ownerId: "002", balance: "200.00", currency: "EUR" },
  ];

  beforeEach(() => {
    (useAccountsContext as jest.Mock).mockReturnValue({
      accounts: mockAccounts,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the headers correctly", () => {
    const { getByText } = render(
      <table>
        <TableHeader
          headers={headers}
          columnWidths={columnWidths}
          rows={mockAccounts}
        />
      </table>,
    );

    headers.forEach((header) => {
      expect(getByText(header)).toBeInTheDocument();
    });
  });

  it("renders the select all accounts checkbox", () => {
    const { getByRole } = render(
      <table>
        <TableHeader
          headers={headers}
          columnWidths={columnWidths}
          rows={mockAccounts}
        />
      </table>,
    );

    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("id", "selectAllAccounts");
  });

  it("applies the correct column widths", () => {
    const { container } = render(
      <div style={{ width: "500px" }}>
        <table>
          <TableHeader
            headers={headers}
            columnWidths={columnWidths}
            rows={mockAccounts}
          />
        </table>
      </div>,
    );

    const thElements = container.querySelectorAll("th");
    expect(thElements).toHaveLength(headers.length + 2);

    thElements.forEach((th, index) => {
      const computedStyle = window.getComputedStyle(th);
      if (index === 0) {
        expect(computedStyle.width).toBe(columnWidths[0]);
      } else if (index <= headers.length) {
        expect(computedStyle.width).toBe(columnWidths[index]);
      }
    });
  });
});
