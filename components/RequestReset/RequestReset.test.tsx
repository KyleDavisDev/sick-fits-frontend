import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import RequestReset, { REQUEST_RESET_QUERY } from "./RequestReset";

describe("<RequestReset />", () => {
  const mocks = [
    {
      request: {
        query: REQUEST_RESET_QUERY,
        variables: { email: "test@email.com" }
      },
      result: {
        data: { requestReset: { __typename: "message", message: "success" } }
      }
    }
  ];

  it("renders", () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );

    const form = wrapper.find("form");

    console.log(form.debug());
    expect(form).toMatchSnapshot();
  });
});
