import * as React from "react";
import { shallow } from "enzyme";
import Title from "./Title";

describe("<Title />", () => {
  it("renders", () => {
    const wrapper = shallow(<Title id={"123"}>test</Title>);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = shallow(<Title id={"123"}>test</Title>);

    expect(wrapper).toMatchSnapshot();
  });
});
