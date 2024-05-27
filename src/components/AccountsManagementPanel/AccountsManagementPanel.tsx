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
  color: #555;
  font-size: 16px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
