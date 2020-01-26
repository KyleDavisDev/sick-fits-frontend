import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { CURRENT_USER_QUERY } from "../User/User";
import Nav from "./Nav";
import { fakeUser } from "../../lib/testUtils";

describe("<Nav />", () => {
  const notSignedInMocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: { data: { me: null } }
    }
  ];

  const signedInMocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: { data: { me: fakeUser() } }
    }
  ];

  it("renders", () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav></Nav>
      </MockedProvider>
    );

    expect(wrapper).toBeTruthy();
  });
});
