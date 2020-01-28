import * as React from "react";
import { shallow } from "enzyme";
import PriceTag from "./PriceTag";
import formatMoney from "../../../../lib/formatMoney";

describe("<PriceTag />", () => {
  it("renders", () => {
    const wrapper = shallow(<PriceTag>{0}</PriceTag>);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = shallow(<PriceTag>{0}</PriceTag>);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders correct amount", () => {
    let number = Math.random() * 100;
    const wrapper = shallow(<PriceTag>{number}</PriceTag>);

    // check once
    expect(wrapper.text()).toEqual(formatMoney(number));

    // update number and check again
    number = Math.random() * 100;
    wrapper.setProps({ children: number });
    expect(wrapper.text()).toEqual(formatMoney(number));

    // update number and check again
    number = Math.random() * 100;
    wrapper.setProps({ children: number });
    expect(wrapper.text()).toEqual(formatMoney(number));
  });
});
