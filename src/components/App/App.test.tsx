import { render, screen } from "@testing-library/react";
import { App } from "./App";
import "@testing-library/jest-dom";

jest.mock("../index", () => ({
  HomePage: () => <div>Home Page</div>,
  Footer: () => <div>Footer</div>,
}));

describe("<App />", () => {
  it("renders HomePage and Footer without crashing", () => {
    render(<App />);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
