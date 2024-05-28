import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { withPopup } from "../../../hoc";
import { useHandleDeleteAccounts, useSelection } from "../../../hooks";
import { IAccount } from "../../../interfaces";
import { ActionIcon } from "../../ActionIcon";
import { AddAccountForm } from "../../AddAccountForm";
import { Checkbox } from "../../Checkbox";
import { TableCell } from "../TableCell";

interface StyledRowProps<T extends IAccount> {
  rowData: T;
  isSelected: boolean;
  columnWidths: string[];
}

const StyledRow = styled.tr<StyledRowProps<any>>`
  width: 100%;
  background-color: ${(props): string =>
    props.isSelected
      ? "var(--table-row-color-selected)"
      : "var(--color-white)"};

  &:nth-child(even) {
    background-color: ${(props): string =>
      props.isSelected
        ? "var(--table-row-color-selected)"
        : "var(--table-row-color-even-child)"};
  }
`;

const EditAccountIcon = withPopup(ActionIcon, AddAccountForm);

export const TableRow = <T extends IAccount>({
  rowData,
  isSelected,
  columnWidths,
}: StyledRowProps<T>) => {
  const { handleDeleteAccounts } = useHandleDeleteAccounts();
  const { resetSelection } = useSelection();

  useEffect(() => {
    return () => {
      resetSelection();
    };
  }, [resetSelection]);

  return (
    <StyledRow
      rowData={rowData}
      isSelected={isSelected}
      columnWidths={columnWidths}
    >
      <TableCell width={columnWidths[0]}>
        <Checkbox id={rowData.id} rowData={rowData}></Checkbox>
      </TableCell>
      {Object.keys(rowData).map((key: string, index: number) => (
        <TableCell key={String(key)} width={columnWidths[index + 1]}>
          {String(rowData[key as keyof T])}
        </TableCell>
      ))}
      <TableCell width={columnWidths[columnWidths.length - 1]}>
        <EditAccountIcon
          icon={FaEdit}
          title="Edit Account"
          editFormConfig={{ isEditMode: true, accountDataToBeEdited: rowData }}
        />
        <ActionIcon
          icon={FaTrash}
          title="Delete Account"
          onClick={handleDeleteAccounts([rowData])}
        />
      </TableCell>
    </StyledRow>
  );
};
