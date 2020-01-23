import formatMoney from "./formatMoney";

describe("formatMoney function", () => {
  it("renders cents correctly", () => {
    expect(formatMoney(12)).toEqual("$0.12");
    expect(formatMoney(2)).toEqual("$0.02");
    expect(formatMoney(99)).toEqual("$0.99");
    expect(formatMoney(38)).toEqual("$0.38");
  });

  it("renders whole dollars correctly", () => {
    expect(formatMoney(500)).toEqual("$5");
    expect(formatMoney(1200)).toEqual("$12");
    expect(formatMoney(45800)).toEqual("$458");
    expect(formatMoney(500000)).toEqual("$5,000");
    expect(formatMoney(4545454500)).toEqual("$45,454,545");
    expect(formatMoney(4545454511200)).toEqual("$45,454,545,112");
    expect(formatMoney(0)).toEqual("$0");
  });
});
