import { render } from "@testing-library/react";
import { Header } from "./Header";
import "@testing-library/jest-dom";

describe("Header component", () => {
  it("renders without crashing", () => {
    render(<Header />);
  });

  it("loads and displays the logo and header images", () => {
    const { getByAltText } = render(<Header />);
    const logoImage = getByAltText("TranSecure logo");
    const headerImage = getByAltText("TranSecure header");

    expect(logoImage).toHaveAttribute("src", "/src/assets/header-logo.png");
    expect(headerImage).toHaveAttribute("src", "/src/assets/header-img.png");
  });
});
