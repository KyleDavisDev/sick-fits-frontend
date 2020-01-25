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

  it("updates w/ prop update", () => {
    const wrapper = enzyme.shallow(<CartCount count={fakeCount} />);
    expect(
      wrapper
        .find("CSSTransition")
        .children()
        .text()
    ).toEqual(`${fakeCount}`);

    // random number
    let updatedCount = Math.random() * 100;
    wrapper.setProps({ count: updatedCount });
    wrapper.simulate("transitionEnd");
    expect(
      wrapper
        .find("CSSTransition")
        .children()
        .text()
    ).toEqual(`${updatedCount}`);

    updatedCount = Math.random() * 100;
    wrapper.setProps({ count: updatedCount });
    wrapper.simulate("transitionEnd");
    expect(
      wrapper
        .find("CSSTransition")
        .children()
        .text()
    ).toEqual(`${updatedCount}`);

    updatedCount = Math.random() * 100;
    wrapper.setProps({ count: updatedCount });
    wrapper.simulate("transitionEnd");
    expect(
      wrapper
        .find("CSSTransition")
        .children()
        .text()
    ).toEqual(`${updatedCount}`);
  });
});
