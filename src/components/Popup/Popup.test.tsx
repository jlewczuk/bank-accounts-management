import { fireEvent, render, screen } from "@testing-library/react";
import { Popup } from "./Popup";
import "@testing-library/jest-dom";

describe("Popup", () => {
  it("renders successfully", () => {
    const onClose = jest.fn();
    render(
      <Popup onClose={onClose}>
        <p>Test Popup Content</p>
      </Popup>,
    );

    expect(screen.getByText("Test Popup Content")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <Popup onClose={onClose}>
        <p>Test Popup Content</p>
      </Popup>,
    );

    fireEvent.click(screen.getByText("Close"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when popup background is clicked, but not content", () => {
    const onClose = jest.fn();
    render(
      <Popup onClose={onClose}>
        <p>Test Popup Content</p>
      </Popup>,
    );

    fireEvent.click(screen.getByTestId("popup-background"));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId("popup-content"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
