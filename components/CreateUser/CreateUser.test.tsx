import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import CreateUser, { CREATEUSER_MUTATION } from "./CreateUser";

describe("<CreateUser />", () => {
  it("renders", () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateUser />
      </MockedProvider>
    );

    expect(wrapper).toBeTruthy();
  });

  it("renders", () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateUser />
      </MockedProvider>
    );

    console.log(wrapper.debug());

    expect(wrapper.find("form")).toMatchSnapshot();
  });
});
