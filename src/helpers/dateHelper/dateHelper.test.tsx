import { getCurrentYear } from "./dateHelper";

describe("getCurrentYear", () => {
  it("returns the current year", () => {
    const realDateNow = Date.now.bind(global.Date);
    global.Date.now = jest.fn(() => 1672444480000);

    expect(getCurrentYear()).toBe(2024);

    global.Date.now = realDateNow;
  });
});
