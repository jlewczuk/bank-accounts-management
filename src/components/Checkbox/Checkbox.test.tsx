import { fireEvent, render } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Checkbox } from "./Checkbox";
import { SelectionContext } from "../../contexts/SelectionContext";
import "@testing-library/jest-dom";

const mockRowData = {
  id: "2708c000-f363-43a9-9a70-e49d7f380228",
  ownerId: "003423",
  balance: "123.45",
  currency: "GBP",
};

const mockAllData = [
  mockRowData,
  {
    id: "e48229ee-fd43-48b1-b3c6-c2f1b022f6f0",
    ownerId: "741784812",
    balance: "23234.23",
    currency: "EUR",
  },
];

const mockContext = {
  selectedItems: [],
  toggleSelection: jest.fn(),
  resetSelection: jest.fn(),
  toggleSelectionAll: jest.fn(),
};

const MockSelectionProvider = ({ children }: PropsWithChildren) => (
  <SelectionContext.Provider value={mockContext}>
    {children}
  </SelectionContext.Provider>
);

const renderWithProps = (isRowMode: boolean) => {
  const testProps = isRowMode
    ? { rowData: mockRowData }
    : { allData: mockAllData };

  return render(
    <MockSelectionProvider>
      <Checkbox id="test" {...testProps} />
    </MockSelectionProvider>,
  );
};

describe("Checkbox - row selection mode", () => {
  it("handles click events", () => {
    const checkbox = renderWithProps(true).getByLabelText("test");
    fireEvent.click(checkbox);
    expect(mockContext.toggleSelection).toHaveBeenCalledWith(mockRowData);
  });
});

describe("Checkbox - all selection mode", () => {
  it("handles click events", () => {
    const checkbox = renderWithProps(false).getByLabelText("test");
    fireEvent.click(checkbox);
    expect(mockContext.toggleSelectionAll).toHaveBeenCalled();
  });
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});
