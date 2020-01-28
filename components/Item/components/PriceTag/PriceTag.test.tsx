import * as React from "react";
import { shallow } from "enzyme";
import PriceTag from "./PriceTag";

describe("<PriceTag />", () => {
  it("renders", () => {
    const wrapper = shallow(<PriceTag>{0}</PriceTag>);

    expect(wrapper).toBeTruthy();
  });
});
