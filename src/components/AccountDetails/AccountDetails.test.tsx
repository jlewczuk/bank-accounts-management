import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AccountDetails } from "./AccountDetils";
import { IAccount } from "../../interfaces";

describe("<AccountDetails />", () => {
  const dummyAccountData: IAccount = {
    id: "2708c000-f363-43a9-9a70-e49d7f380228",
    ownerId: "003423",
    balance: "123.45",
    currency: "GBP",
  };

  test("renders correctly when account is provided", () => {
    const { getAllByText } = render(
      <AccountDetails account={dummyAccountData} />,
    );

    Object.entries(dummyAccountData).forEach(([key, value]) => {
      expect(getAllByText(new RegExp(`${key}`, "i")).length).toBeGreaterThan(0);
      expect(getAllByText(new RegExp(`${value}`, "i")).length).toBeGreaterThan(
        0,
      );
    });
  });
});
