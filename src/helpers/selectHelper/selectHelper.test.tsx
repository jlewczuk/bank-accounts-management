import { generateSelectOptions } from "./selectHelper";
import { OptionType } from "../../components/Select/Select";
import { IAccount } from "../../interfaces";

describe("generateSelectOptions", () => {
  it("generates correct OptionType array", () => {
    const mockData: IAccount[] = [
      {
        id: "2708c000-f363-43a9-9a70-e49d7f380228",
        ownerId: "003423",
        balance: "123.45",
        currency: "GBP",
      },
      {
        id: "e48229ee-fd43-48b1-b3c6-c2f1b022f6f0",
        ownerId: "741784812",
        balance: "23234.23",
        currency: "EUR",
      },
    ];

    const valueField: keyof IAccount = "id";
    const labelGetter = (item: IAccount) => item.ownerId;

    const result: OptionType[] = generateSelectOptions(
      mockData,
      valueField,
      labelGetter,
    );

    const expectedResult = [
      { value: "2708c000-f363-43a9-9a70-e49d7f380228", label: "003423" },
      { value: "e48229ee-fd43-48b1-b3c6-c2f1b022f6f0", label: "741784812" },
    ];

    expect(result).toEqual(expectedResult);
  });
});
