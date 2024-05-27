import { render, screen } from "@testing-library/react";
import { TableCell } from "./TableCell";
import "@testing-library/jest-dom";

describe("TableCell component", () => {
  test("renders without crashing", () => {
    render(<TableCell width="100px">Test</TableCell>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("has correct style", () => {
    render(<TableCell width={"100px"}>Test</TableCell>);
    const cell = screen.getByText("Test");
    expect(cell).toHaveStyle("text-align: center");
    expect(cell).toHaveStyle("padding: 10px");
  });

  test("renders correct width", () => {
    const { rerender } = render(<TableCell width={"100px"}>Test</TableCell>);
    expect(screen.getByText("Test")).toBeInTheDocument();

    rerender(<TableCell width={"200px"}>Test</TableCell>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
