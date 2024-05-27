import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./Input";
import { MaskEnum } from "../../enums";
import "@testing-library/jest-dom";

describe("Input component", () => {
  let mockChangeHandler: jest.Mock;

  beforeEach(() => {
    mockChangeHandler = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Should call the onChange handler when the input value changes and mask condition is met", () => {
    render(
      <Input
        label="Test Label"
        type="text"
        name="Test Name"
        value="Test Value"
        onChange={mockChangeHandler}
        mask={MaskEnum.Decimal}
      />,
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "1234" },
    });

    expect(mockChangeHandler).toHaveBeenCalled();
  });

  test("Should call the onChange handler when the input value changes and Number mask condition is met", () => {
    render(
      <Input
        label="Test Label"
        type="text"
        name="Test Name"
        value="Test Value"
        onChange={mockChangeHandler}
        mask={MaskEnum.Number}
      />,
    );

    const newValue = "12345";
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: newValue },
    });

    expect(mockChangeHandler).toHaveBeenCalled();
  });

  test("Should not call the onChange handler when the input value changes and Number mask condition is not met", () => {
    render(
      <Input
        label="Test Label"
        type="text"
        name="Test Name"
        value="Test Value"
        onChange={mockChangeHandler}
        mask={MaskEnum.Number}
      />,
    );

    const newValue = "abcd";
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: newValue },
    });

    expect(mockChangeHandler).not.toHaveBeenCalled();
  });
});
