import styled from "styled-components";
import { OptionType } from "../../Select/Select";

const AccountDetail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  font-size: var(--font-size-sm);
  color: var(--text-color);
`;

const Label = styled.span`
  color: var(--text-color);
  font-weight: var(--font-weight-medium);
`;

const Value = styled.span`
  text-align: right;
  font-weight: var(--font-weight-normal);
`;

export const AccountDetailItem = ({ label, value }: OptionType) => (
  <AccountDetail>
    <Label>{`${label}:`}</Label> <Value>{value}</Value>
  </AccountDetail>
);
