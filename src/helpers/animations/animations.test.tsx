import { render } from "@testing-library/react";
import styled from "styled-components";
import "jest-styled-components";
import { rotate, slideIn, slideOut } from "./animations";

const AnimationComponent = styled.div`
  animation: ${rotate} 2s linear infinite;
`;

const SlideInComponent = styled.div`
  animation: ${slideIn} 2s forwards;
`;

const SlideOutComponent = styled.div`
  animation: ${slideOut} 2s forwards;
`;

test("component has rotate animation", () => {
  const { container } = render(<AnimationComponent />);
  expect(container.firstChild).toHaveStyleRule("animation", expect.any(String));
});

test("component has slide in animation", () => {
  const { container } = render(<SlideInComponent />);
  expect(container.firstChild).toHaveStyleRule("animation", expect.any(String));
});

test("component has slide out animation", () => {
  const { container } = render(<SlideOutComponent />);
  expect(container.firstChild).toHaveStyleRule("animation", expect.any(String));
});
