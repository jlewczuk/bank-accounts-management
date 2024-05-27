import { fireEvent, render } from "@testing-library/react";
import { OptionType, Select } from "./Select";
import "@testing-library/jest-dom";

describe("<Select />", () => {
  const options: OptionType[] = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ];
  const onChange = jest.fn();

  it("renders without crash", () => {
    render(
      <Select options={options} name="test" value="" onChange={onChange} />,
    );
  });

  it("displays the label", () => {
    const { getByText } = render(
      <Select
        options={options}
        label="Test Label"
        name="test"
        value=""
        onChange={onChange}
      />,
    );

    expect(getByText("Test Label")).toBeTruthy();
  });

  it("opens dropdown on select click", () => {
    const { getByText, queryByText } = render(
      <Select options={options} name="test" value="" onChange={onChange} />,
    );

    expect(queryByText("Option 1")).toBeNull();
    expect(queryByText("Option 2")).toBeNull();

    fireEvent.click(getByText("Select an option"));
    expect(getByText("Option 1")).toBeVisible();
    expect(getByText("Option 2")).toBeVisible();
  });

  it("calls onChange with correct value when an option is clicked", () => {
    const { getByText } = render(
      <Select options={options} name="test" value="" onChange={onChange} />,
    );

    fireEvent.click(getByText("Select an option"));
    fireEvent.click(getByText("Option 1"));

    expect(onChange).toHaveBeenCalledWith({
      target: {
        name: "test",
        value: "1",
      },
    });
  });
});
