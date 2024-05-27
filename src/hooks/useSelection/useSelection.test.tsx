import { cleanup, render } from "@testing-library/react";
import { useSelection } from "./useSelection";
import { SelectionProvider } from "../../contexts";
import "@testing-library/jest-dom";

function TestComponent() {
  let message: string = "";
  try {
    const result = useSelection();
    message = result ? "Hook Used Successfully" : "Error Using Hook";
  } catch (error) {
    if (error instanceof Error) {
      message = error.message;
    }
  }

  return <div>{message}</div>;
}

describe("useSelection", () => {
  afterEach(cleanup);

  test("throws error when not used within SelectionProvider", () => {
    const { getByText } = render(<TestComponent />);
    expect(
      getByText("useSelection must be used within a SelectionProvider"),
    ).toBeInTheDocument();
  });

  test("works correctly when used within SelectionProvider", () => {
    const { getByText } = render(
      <SelectionProvider>
        <TestComponent />
      </SelectionProvider>,
    );

    expect(getByText("Hook Used Successfully")).toBeInTheDocument();
  });
});
