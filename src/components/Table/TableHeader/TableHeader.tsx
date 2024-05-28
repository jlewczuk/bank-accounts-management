import { ThHTMLAttributes } from "react";
import styled from "styled-components";
import { useAccountsContext } from "../../../hooks";
import { IAccount } from "../../../interfaces";
import { Checkbox } from "../../Checkbox";

const StyledHeader = styled.th<StyledHeaderProps>`
  width: ${(props) => props.width};
  background-color: var(--app-color-primary);
  color: white;
  padding: 10px;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1;
`;

interface StyledHeaderProps
  extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
  width?: string;
}

interface TableHeaderProps<T> {
  headers: string[];
  columnWidths: string[];
  rows: T[];
  width?: string;
}

export const TableHeader = <T,>({
  headers,
  columnWidths,
}: TableHeaderProps<T>) => {
  const { accounts } = useAccountsContext();

  return (
    <thead>
      <tr>
        <StyledHeader width={columnWidths[0]}>
          <Checkbox id="selectAllAccounts" allData={accounts as IAccount[]} />
        </StyledHeader>
        {headers.map((header: string, index: number) => (
          <StyledHeader key={`header-${index}`} width={columnWidths[index + 1]}>
            {header}
          </StyledHeader>
        ))}
        <StyledHeader width={columnWidths[columnWidths.length - 1]} />
      </tr>
    </thead>
  );
};
