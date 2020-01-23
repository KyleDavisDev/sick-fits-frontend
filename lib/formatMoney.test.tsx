import formatMoney from "./formatMoney";

describe("formatMoney function", () => {
  it("renders cents correct", () => {
    expect(formatMoney(12)).toEqual("$0.12");
    expect(formatMoney(2)).toEqual("$0.02");
    expect(formatMoney(99)).toEqual("$0.99");
    expect(formatMoney(38)).toEqual("$0.38");
  });
});
