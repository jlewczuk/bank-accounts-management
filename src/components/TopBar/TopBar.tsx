import styled from "styled-components";
import { ButtonVariantEnum, RoutesEnum } from "../../enums";
import { withPopup } from "../../hoc";
import {
  useAccountsContext,
  useHandleDeleteAccounts,
  useHandleRoute,
  useSelection,
} from "../../hooks";
import { IAccount } from "../../interfaces";
import { AddAccountForm } from "../AddAccountForm";
import { Button } from "../Button";
import { Divider } from "../Divider";
import { TransferForm } from "../TransferForm";

const TopBarContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 80px;
  background-color: var(--background-color);
  z-index: 1;
  box-shadow: var(--box-shadow-primary);
  box-sizing: border-box;
  border-bottom: var(--border);
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;
  background: none;
  padding-right: 10px;
`;

const HeaderImage = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;
  background: none;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  background: none;
  cursor: var(--cursor-pointer);
`;

const ButtonGroup = styled.div`
  display: flex;
  background-color: inherit;

  button + button {
    margin-left: 20px;
  }
`;

const AddAccountFormButton = withPopup(Button, AddAccountForm);
const TransferFormButton = withPopup(Button, TransferForm);

export const TopBar = () => {
  const { accounts } = useAccountsContext();
  const { selectedItems } = useSelection<IAccount>();
  const { handleDeleteAccounts } = useHandleDeleteAccounts();

  const handleRouteChange = useHandleRoute();
  const hasAccounts: boolean = Boolean(accounts?.length);
  const hasSelectedItems: boolean = selectedItems.length > 0;
  const isTransferDisabled: boolean =
    !hasAccounts || (accounts?.length || 0) < 2;

  return (
    <TopBarContainer>
      <ImageWrapper onClick={() => handleRouteChange(RoutesEnum.Home)}>
        <Logo src="/src/assets/header-logo.png" alt="Logo" />
        <HeaderImage src="/src/assets/header-img.png" alt="Header Image" />{" "}
      </ImageWrapper>
      <ButtonGroup>
        <AddAccountFormButton text="Add Account" />
        <TransferFormButton
          text="Make a Transfer"
          disabled={isTransferDisabled}
        />
        <Divider $vertical />
        <Button
          text={`Delete ${selectedItems.length} Account(s)`}
          $variant={ButtonVariantEnum.Warning}
          onClick={handleDeleteAccounts(selectedItems)}
          disabled={!hasSelectedItems}
        />
      </ButtonGroup>
    </TopBarContainer>
  );
};
