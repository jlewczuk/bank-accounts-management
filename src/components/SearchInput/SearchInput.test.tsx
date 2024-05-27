import { fireEvent, render } from "@testing-library/react";
import { SearchInput } from "./SearchInput";
import "@testing-library/jest-dom";

describe("SearchInput", () => {
  test("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <SearchInput searchTerm="" setSearchTerm={() => {}} />,
    );
    const searchInput = getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  test("updates search term on change", () => {
    const setSearchTerm = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput searchTerm="" setSearchTerm={setSearchTerm} />,
    );
    const searchInput = getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "Test" } });

    expect(setSearchTerm).toHaveBeenCalledWith("Test");
  });
});
