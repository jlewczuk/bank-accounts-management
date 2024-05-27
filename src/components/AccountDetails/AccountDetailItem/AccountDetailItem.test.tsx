import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AccountDetailItem } from "./AccountDetailItem";

describe("Account Detail Item component", () => {
  test("renders component with provided props", () => {
    render(<AccountDetailItem label="Test Label" value="Test Value" />);

    expect(screen.getByText("Test Label:")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });
});
