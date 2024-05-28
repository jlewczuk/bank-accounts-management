import { useState } from "react";
import styled from "styled-components";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { useSelection } from "../../hooks";
import { IAccount } from "../../interfaces";
import { SearchInput } from "../SearchInput";

const StyledTableWrapper = styled.div`
  border: var(--border);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--box-shadow-primary);
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = rows.filter((row: T) => {
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  return (
    <StyledTableWrapper>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
            {filteredRows.map((row: T, index: number) => (
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
