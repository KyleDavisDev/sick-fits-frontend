import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import RequestReset, { REQUEST_RESET_QUERY } from "./RequestReset";

describe("<RequestReset />", () => {
  const testEmail = "test@email.com";
  const mocks = [
    {
      request: {
        query: REQUEST_RESET_QUERY,
        variables: { email: testEmail }
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

    expect(form).toMatchSnapshot();
  });

  it("calls the mutation on form submit", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );

    // simulate typing in email
    wrapper
      .find("input")
      .simulate("change", { target: { name: "email", value: testEmail } });

    // submit the form
    wrapper.find("form").simulate("submit");

    // allow component to update/load
    await wait();
    wrapper.update();

    expect(wrapper.find("p").text()).toContain(
      "Success! Check your email for an update link"
    );
  });
});
