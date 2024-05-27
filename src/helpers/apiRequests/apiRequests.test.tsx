import fetch from "node-fetch";
import {
  deleteAccount,
  fetchData,
  getAccounts,
  patchAccount,
  postAccount,
} from "./apiRequests";
import { BASE_URL } from "../../constants";
import { HttpMethodEnum } from "../../enums";
import { IAccount } from "../../interfaces";

const endPointUrl = `${BASE_URL}/accounts`;

let fetchMock: any;

function accountData(): IAccount {
  return {
    id: "2708c000-f363-43a9-9a70-e49d7f380228",
    ownerId: "003423",
    balance: "123.45",
    currency: "GBP",
  };
}

function validateLastCall(
  expectedUrl: string,
  expectedMethod: HttpMethodEnum,
  expectedBody?: any,
) {
  const { method, body, headers } = fetchMock.lastCall()[1];
  expect(fetchMock.lastCall()[0]).toEqual(expectedUrl);
  expect(method).toEqual(expectedMethod);
  expect(headers).toEqual({ "Content-Type": "application/json" });

  if (expectedBody) {
    expect(JSON.parse(body)).toEqual(expectedBody);
  }
}

function setResponseMock(responseMock: any, method = "get") {
  fetchMock[method](endPointUrl, responseMock);
}

describe("API functions", () => {
  beforeAll(() => {
    fetchMock = require("fetch-mock-jest");
    fetchMock.config.overwriteRoutes = true;
    fetch.default = fetchMock.sandbox();
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it("fetchData function should return response if request is ok", async () => {
    const responseMock: IAccount[] = [accountData()];
    setResponseMock(responseMock);

    const data = await fetchData(endPointUrl, {
      method: HttpMethodEnum.GET,
    });

    expect(data).toEqual(responseMock);
  });

  it("getAccounts function should call the fetch API and return data if the request is ok", async () => {
    const responseMock: IAccount[] = [accountData()];
    setResponseMock(responseMock);

    const data = await getAccounts();

    expect(data).toEqual(responseMock);
  });

  it("postAccount function should call the fetch API with correct parameters and return data if the request is ok", async () => {
    const responseMock: IAccount = accountData();
    const body: IAccount = responseMock;
    setResponseMock(responseMock, "post");

    const data = await postAccount(body);
    validateLastCall(endPointUrl, HttpMethodEnum.POST, body);

    expect(data).toEqual(responseMock);
  });

  it("patchAccount function should call the fetch API with correct parameters and respond correctly", async () => {
    const responseMock: IAccount = accountData();
    const body: IAccount = responseMock;
    fetchMock.patch(`${endPointUrl}/${body.id}`, responseMock);

    const data = await patchAccount(body);
    validateLastCall(`${endPointUrl}/${body.id}`, HttpMethodEnum.PATCH, body);

    expect(data).toEqual(responseMock);
  });

  it("deleteAccount function should correctly call the fetch API and respond appropriately", async () => {
    const id = "2708c000-f363-43a9-9a70-e49d7f380228";
    fetchMock.delete(`${endPointUrl}/${id}`, {});

    await deleteAccount(id);
    validateLastCall(`${endPointUrl}/${id}`, HttpMethodEnum.DELETE);
  });
});
