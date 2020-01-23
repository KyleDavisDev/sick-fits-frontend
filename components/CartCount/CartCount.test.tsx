import "jsdom-global/register";
import * as React from "react";
import enzyme, { shallow } from "enzyme";
import CartCount from "./CartCount";

const fakeCount = 10;

describe("<CartCount />", () => {
  it("renders", () => {
    const wrapper = shallow(<CartCount count={fakeCount} />);
    expect(wrapper).toBeTruthy();
  });

  it("displays correct text", () => {
    const wrapper = enzyme.mount(<CartCount count={fakeCount} />);
    expect(wrapper.text()).toEqual(`${fakeCount}`);
  });
});
