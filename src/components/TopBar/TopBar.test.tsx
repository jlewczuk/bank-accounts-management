import { fireEvent, render, screen } from "@testing-library/react";
import { ComponentType } from "react";
import { TopBar } from "./TopBar";
import * as hooks from "../../hooks";

jest.mock("../../hooks", () => ({
  useAccountsContext: jest
    .fn()
    .mockReturnValue({ accounts: [], setAccounts: jest.fn() }),
  useSelection: jest
    .fn()
    .mockReturnValue({ selectedItems: [], resetSelection: jest.fn() }),
  useHandleDeleteAccounts: jest
    .fn()
    .mockReturnValue({ handleDeleteAccounts: jest.fn() }),
  useHandleRoute: jest.fn(),
}));

jest.mock("../../hoc", () => ({
  withPopup: (WrappedComponent: ComponentType<any>) => (props: any) => (
    <WrappedComponent {...props} />
  ),
}));

describe("TopBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<TopBar />);
    screen.getByText("Add Account");
    screen.getByText("Make a Transfer");
  });

  it("navigates when logo is clicked", () => {
    const mockHandleRouteChange = jest.fn();
    (hooks.useHandleRoute as jest.Mock).mockImplementation(
      () => mockHandleRouteChange,
    );
    render(<TopBar />);
    fireEvent.click(screen.getByAltText("Logo"));
    expect(mockHandleRouteChange).toHaveBeenCalled();
  });

  it("calls handleDeleteAccounts when delete button is clicked", async () => {
    const handleDeleteAccountsMock = jest.fn();
    (hooks.useHandleDeleteAccounts as jest.Mock).mockReturnValue({
      handleDeleteAccounts: handleDeleteAccountsMock,
    });

    render(<TopBar />);

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(handleDeleteAccountsMock).toHaveBeenCalled();
  });
});
