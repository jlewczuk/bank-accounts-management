import styled from "styled-components";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { useSelection } from "../../hooks";
import { IAccount } from "../../interfaces";

const StyledTableWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTableContainer = styled.div`
  max-height: 60vh;
  overflow-y: auto;
`;

const StyledTable = styled.table`
  min-width: 60vw;
  border-collapse: collapse;
  width: 100%;
`;

interface TableProps<T> {
  headers: string[];
  rows: T[];
  columnWidths: string[];
}

export const Table = <T extends IAccount>({
  headers,
  rows,
  columnWidths,
}: TableProps<T>) => {
  const { selectedItems } = useSelection<T>();

  return (
    <StyledTableWrapper>
      <StyledTable>
        <TableHeader
          headers={headers}
          columnWidths={columnWidths}
          rows={rows}
        />
      </StyledTable>
      <StyledTableContainer>
        <StyledTable>
          <tbody>
            {rows.map((row: T, index: number) => (
              <TableRow
                key={`row-${index}`}
                rowData={row}
                isSelected={selectedItems.includes(row)}
                columnWidths={columnWidths}
              />
            ))}
          </tbody>
        </StyledTable>
      </StyledTableContainer>
    </StyledTableWrapper>
  );
};
