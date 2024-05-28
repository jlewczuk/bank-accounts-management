import { render } from "@testing-library/react";
import { Divider } from "./Divider";
import "jest-styled-components";

describe("Divider", () => {
  it("applies verticalStyles when $vertical prop is true", () => {
    const { container } = render(<Divider $vertical />);
    const divider = container.firstChild;

    expect(divider).toHaveStyleRule("height", "50px");
    expect(divider).toHaveStyleRule("border-left", "var(--border)");
    expect(divider).toHaveStyleRule("margin", "auto 15px");
  });

  it("applies horizontalStyles when $vertical prop is false or not provided", () => {
    const { container } = render(<Divider />);
    const divider = container.firstChild;

    expect(divider).toHaveStyleRule("width", "100%");
    expect(divider).toHaveStyleRule("border-top", "var(--border)");
    expect(divider).toHaveStyleRule("margin", "15px auto");
  });
});
