import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage";
import "@testing-library/jest-dom";

describe("ErrorMessage component", () => {
  test("Renders with the correct text", () => {
    render(<ErrorMessage text="Test error message" />);

    const errorElement = screen.getByText("Test error message");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveStyle("color: var(--color-warning)");
  });

  test("Not rendering when no text is given", () => {
    render(<ErrorMessage text="" />);

    expect(screen.queryByText("Test error message")).toBeNull();
  });
});
