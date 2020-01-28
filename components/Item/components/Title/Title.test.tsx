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

  it("renders the expected title", () => {
    let title = "Here is a test title";
    const wrapper = shallow(<Title id={"123"}>{title}</Title>);

    // check title
    expect(wrapper.find("a").text()).toEqual(title);

    // update title, check again
    title = "Another title";
    wrapper.setProps({ children: title });
    expect(wrapper.find("a").text()).toEqual(title);

    // update title, check again
    title = "Lets go again!!";
    wrapper.setProps({ children: title });
    expect(wrapper.find("a").text()).toEqual(title);
  });
});
