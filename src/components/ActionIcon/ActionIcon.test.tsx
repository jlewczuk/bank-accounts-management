import { fireEvent, render } from "@testing-library/react";
import { IoIosAirplane } from "react-icons/io";
import { ActionIcon } from "./ActionIcon";
import "@testing-library/jest-dom";

describe("ActionIcon", () => {
  const TestIcon = () => <div data-testid="test-icon" />;

  it("should render the icon component", () => {
    const { getByTestId } = render(<ActionIcon icon={TestIcon} />);
    expect(getByTestId("test-icon")).toBeInTheDocument();
  });

  it("should handle click events", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ActionIcon icon={TestIcon} onClick={onClick} />,
    );

    fireEvent.click(getByTestId("test-icon"));
    expect(onClick).toHaveBeenCalled();
  });

  it("should have the right title attribute", () => {
    const title = "Test title";
    const { getByTitle } = render(<ActionIcon icon={TestIcon} title={title} />);
    expect(getByTitle(title)).toBeInTheDocument();
  });

  it("should render the passed icon correctly", () => {
    const { container } = render(<ActionIcon icon={IoIosAirplane} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
