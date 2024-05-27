import React from "react";
import styled from "styled-components";

const StyledCell = styled.td<{ width?: string }>`
  padding: 10px;
  text-align: center;
  border: none;
`;

interface TableCellProps {
  width?: string;
  children?: React.ReactNode;
}

export const TableCell = ({ width, children }: TableCellProps) => {
  return <StyledCell width={width}>{children}</StyledCell>;
};
