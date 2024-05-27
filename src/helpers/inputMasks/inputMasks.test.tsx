import { decimalMask, numberMask, textMask } from "./inputMasks";

describe("Masks", () => {
  test("textMask allows alphabetic characters and space", () => {
    expect(textMask("test value")).toBeTruthy();
    expect(textMask("123")).toBeFalsy();
  });

  test("decimalMask allows properly formatted decimal numbers", () => {
    expect(decimalMask("0.12")).toBeTruthy();
    expect(decimalMask("1.23")).toBeTruthy();
    expect(decimalMask("123")).toBeTruthy();
    expect(decimalMask("123.")).toBeTruthy();
    expect(decimalMask("123.123")).toBeFalsy();
    expect(decimalMask("test value")).toBeFalsy();
  });

  test("numberMask allows numeric characters", () => {
    expect(numberMask("123")).toBeTruthy();
    expect(numberMask("test value")).toBeFalsy();
  });
});
