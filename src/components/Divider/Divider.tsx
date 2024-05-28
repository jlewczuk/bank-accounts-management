import styled, { css } from "styled-components";

const verticalStyles = css`
  height: 50px;
  border-left: var(--border);
  margin: auto 15px;
`;

const horizontalStyles = css`
  width: 100%;
  border-top: var(--border);
  margin: 15px auto;
`;

interface DividerProps {
  $vertical?: boolean;
}

export const Divider = styled.div<DividerProps>`
  ${({ $vertical }) => ($vertical ? verticalStyles : horizontalStyles)};
`;
