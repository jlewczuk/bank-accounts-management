import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentType } from "react";
import { TableRow } from "./TableRow";
import { IAccount } from "../../../interfaces";
import "@testing-library/jest-dom";

const mockHandleDeleteAccounts = jest.fn();
const mockResetSelection = jest.fn();

jest.mock("../../../hooks", () => ({
  useHandleDeleteAccounts: () => ({
    handleDeleteAccounts: mockHandleDeleteAccounts,
  }),
  useSelection: () => ({
    selectedItems: [],
    resetSelection: mockResetSelection,
  }),
}));

jest.mock("../../../hoc", () => ({
  withPopup: (WrappedComponent: ComponentType<any>) => (props: any) => (
    <WrappedComponent {...props} />
  ),
}));

jest.mock("../../ActionIcon", () => ({
  ActionIcon: jest.fn(({ onClick, title }) => (
    <button onClick={onClick} title={title}>
      Action Icon
    </button>
  )),
}));

describe("<TableRow />", () => {
  const rowData: IAccount = {
    id: "2708c000-f363-43a9-9a70-e49d7f380228",
    ownerId: "003423",
    balance: "123.45",
    currency: "GBP",
  };

  const columnWidths = ["100px", "200px", "200px", "200px", "200px"];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <TableRow
        rowData={rowData}
        isSelected={false}
        columnWidths={columnWidths}
      />,
    );
    expect(getByText("003423")).toBeInTheDocument();
    expect(getByText("123.45")).toBeInTheDocument();
    expect(getByText("GBP")).toBeInTheDocument();
  });

  it("triggers edit action on click edit icon (FaEdit)", async () => {
    const { findByTitle } = render(
      <TableRow
        rowData={rowData}
        isSelected={false}
        columnWidths={columnWidths}
      />,
    );
    const editButton = await findByTitle("Edit Account");
    await userEvent.click(editButton);
    expect(mockResetSelection).toBeCalled();
  });

  it("triggers delete account on click delete icon (FaTrash)", async () => {
    const { findByTitle } = render(
      <TableRow
        rowData={rowData}
        isSelected={false}
        columnWidths={columnWidths}
      />,
    );
    const deleteButton = await findByTitle("Delete Account");
    await userEvent.click(deleteButton);
    expect(mockHandleDeleteAccounts).toBeCalled();
  });
});
