import styled from "styled-components";
import { AccountDetailItem } from "./AccountDetailItem";
import { IAccount } from "../../interfaces";

const StyledAccountDetails = styled.div`
  border: var(--border);
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: var(--background-color-secondary);
`;

type AccountDetailsProps = { account: IAccount };

export const AccountDetails = ({ account }: AccountDetailsProps) => {
  if (!account) {
    return null;
  }
  return (
    <StyledAccountDetails data-testid="account-details">
      {Object.entries(account).map(([key, value]) => (
        <AccountDetailItem key={key} label={key} value={String(value)} />
      ))}
    </StyledAccountDetails>
  );
};
