import { OptionType } from "../../components";
import { IAccount } from "../../interfaces";

export const generateSelectOptions = (
  data: IAccount[],
  valueField: keyof IAccount,
  labelGetter: (item: IAccount) => string,
): OptionType[] => {
  return data.map((item: IAccount): OptionType => {
    return { value: item[valueField]!.toString(), label: labelGetter(item) };
  });
};
