import * as React from "react";
import { shallow } from "enzyme";
import CartCount from "./CartCount";

const fakeCount = 10;

describe("<CartCount />", () => {
  it("renders", () => {
    const wrapper = shallow(<CartCount count={fakeCount} />);
    expect(wrapper).toBeTruthy();
  });
});
