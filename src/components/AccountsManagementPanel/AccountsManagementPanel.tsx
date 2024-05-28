import styled from "styled-components";
import { TABLE_COLUMN_WIDTHS } from "../../constants";
import { useAccountsContext } from "../../hooks";
import { Table } from "../Table";

const ManagementPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NoAccountsMessage = styled.p`
  color: var(--text-color);
  font-size: var(--font-size-md);
  margin-top: 20px;
  padding: 10px;
  border: var(--border);
  border-radius: 5px;
  background-color: var(--background-color-secondary);
  box-shadow: var(--box-shadow-primary);
`;

export const AccountsManagementPanel = () => {
  const { accounts } = useAccountsContext();
  const accountKeys = accounts && accounts[0] ? Object.keys(accounts[0]) : [];

  return (
    <ManagementPanel>
      {accounts && accounts.length ? (
        <Table
          headers={accountKeys}
          rows={accounts}
          columnWidths={TABLE_COLUMN_WIDTHS}
        />
      ) : (
        <NoAccountsMessage>No accounts have been added yet.</NoAccountsMessage>
      )}
    </ManagementPanel>
  );
};
