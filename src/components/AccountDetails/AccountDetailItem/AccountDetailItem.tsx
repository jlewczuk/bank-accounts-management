import styled from "styled-components";
import { OptionType } from "../../Select/Select";

const AccountDetail = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 5px 10px;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  color: #333;
  font-weight: 600;
`;

const Value = styled.span`
  text-align: right;
  font-weight: normal;
`;

export const AccountDetailItem = ({ label, value }: OptionType) => (
  <AccountDetail>
    <Label>{`${label}:`}</Label> <Value>{value}</Value>
  </AccountDetail>
);
