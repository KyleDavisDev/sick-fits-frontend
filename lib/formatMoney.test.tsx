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

  it("renders whole dollars and cents correctly", () => {
    expect(formatMoney(112)).toEqual("$1.12");
    expect(formatMoney(999)).toEqual("$9.99");
    expect(formatMoney(50048)).toEqual("$500.48");
    expect(formatMoney(500489)).toEqual("$5,004.89");
    expect(formatMoney(471154862014)).toEqual("$4,711,548,620.14");
  });
});
