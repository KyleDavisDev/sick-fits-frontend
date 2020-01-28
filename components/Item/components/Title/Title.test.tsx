import "jsdom-global/register";
import * as React from "react";
import { shallow, mount } from "enzyme";
import Title from "./Title";

describe("<Title />", () => {
  let title = "Here is a test title";
  let id = "abc123";

  it("renders", () => {
    const wrapper = shallow(<Title id={id}>{title}</Title>);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = shallow(<Title id={id}>{title}</Title>);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders the expected title", () => {
    let fakeTitle = title;
    const wrapper = shallow(<Title id={id}>{fakeTitle}</Title>);

    // check title
    expect(wrapper.find("a").text()).toEqual(fakeTitle);

    // update title, check again
    fakeTitle = "Another title";
    wrapper.setProps({ children: fakeTitle });
    expect(wrapper.find("a").text()).toEqual(fakeTitle);

    // update title, check again
    fakeTitle = "Lets go again!!";
    wrapper.setProps({ children: fakeTitle });
    expect(wrapper.find("a").text()).toEqual(fakeTitle);
  });

  it("renders a link with the attached id", () => {
    let fakeID = id;
    const wrapper = mount(<Title id={fakeID}>{title}</Title>);

    // check href
    expect(wrapper.find("a").prop("href")).toContain(fakeID);

    // update title, check again
    fakeID = "asbasbd";
    wrapper.setProps({ id: fakeID });
    expect(wrapper.find("a").prop("href")).toContain(fakeID);

    // update title, check again
    fakeID = "123asdfaasdff_ASdfasdf";
    wrapper.setProps({ id: fakeID });
    expect(wrapper.find("a").prop("href")).toContain(fakeID);
  });
});
