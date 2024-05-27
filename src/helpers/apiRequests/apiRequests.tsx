import { BASE_URL } from "../../constants";
import { HttpMethodEnum } from "../../enums";
import { IAccount } from "../../interfaces";

type AccountKeysWithoutId = Exclude<keyof IAccount, "id">;
type OptionalAttributes = Partial<Pick<IAccount, AccountKeysWithoutId>>;
type AccountWithOptionalAttributes = IAccount & OptionalAttributes;
type RequestBody = IAccount | AccountWithOptionalAttributes[];

interface RequestOptions {
  method: HttpMethodEnum;
  body?: HttpMethodEnum extends "GET" | "DELETE" ? undefined : RequestBody;
}

export async function fetchData<T>(
  url: string,
  options: RequestOptions,
): Promise<T> {
  const requestOptions: RequestInit = {
    method: options.method,
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const response: Response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    throw new Error("Error parsing response JSON");
  }
}

export function getAccounts(): Promise<IAccount[]> {
  return fetchData<IAccount[]>(`${BASE_URL}/accounts`, {
    method: HttpMethodEnum.GET,
  });
}

export function postAccount(data: IAccount): Promise<IAccount> {
  return fetchData<IAccount>(`${BASE_URL}/accounts`, {
    method: HttpMethodEnum.POST,
    body: data,
  });
}

export function patchAccount(
  data: AccountWithOptionalAttributes,
): Promise<AccountWithOptionalAttributes[]> {
  return fetchData<AccountWithOptionalAttributes[]>(
    `${BASE_URL}/accounts/${data.id}`,
    {
      method: HttpMethodEnum.PATCH,
      body: data,
    },
  );
}

export function deleteAccount(id: string): Promise<void> {
  return fetchData<void>(`${BASE_URL}/accounts/${id}`, {
    method: HttpMethodEnum.DELETE,
  });
}
