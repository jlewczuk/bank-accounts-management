import { useEffect, useRef } from "react";
import { RoutesEnum } from "../../enums";
import { getAccounts } from "../../helpers";
import { useAccountsContext, useHandleRoute } from "../../hooks";
import { IAccount } from "../../interfaces";
import { Button } from "../Button";
import { Header } from "../Header";
import { ButtonContainer } from "../styledComponents";

export const HomePage = () => {
  const { setAccounts } = useAccountsContext();
  const handleRouteChange = useHandleRoute();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!isInitialMount.current) {
      getAccounts()
        .then((accounts: IAccount[]): void => {
          setAccounts(accounts);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      isInitialMount.current = false;
    }
  }, [setAccounts]);

  return (
    <div>
      <Header />
      <ButtonContainer>
        <Button
          text="Go to management panel"
          onClick={() => handleRouteChange(RoutesEnum.ManagementPanel)}
        />
      </ButtonContainer>
    </div>
  );
};
