import { fireEvent, render } from "@testing-library/react";
import { Button } from "./Button";
import { ButtonVariantEnum } from "../../enums";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("renders in document", () => {
    const { getByText } = render(<Button text="Test Button" />);
    expect(getByText("Test Button")).toBeInTheDocument();
  });

  it("default button has cursor pointer", () => {
    const { getByText } = render(<Button text="Default Button" />);
    const defaultButton = getByText("Default Button");
    expect(defaultButton).toHaveStyle("cursor: var(--cursor-pointer)");
  });

  it("warning button has cursor pointer", () => {
    const { getByText } = render(
      <Button text="Warning Button" $variant={ButtonVariantEnum.Warning} />,
    );
    const warningButton = getByText("Warning Button");
    expect(warningButton).toHaveStyle("cursor: var(--cursor-pointer)");
  });

  it("disabled button has cursor not-allowed", () => {
    const { getByText } = render(
      <Button text="Disabled Button" disabled={true} />,
    );
    const disabledButton = getByText("Disabled Button");
    expect(disabledButton).toHaveStyle("cursor: var(--cursor-not-allowed)");
  });

  it("triggers onClick event", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button text="Clickable Button" onClick={handleClick} />,
    );
    fireEvent.click(getByText("Clickable Button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
