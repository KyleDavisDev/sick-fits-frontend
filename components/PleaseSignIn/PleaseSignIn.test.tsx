import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { CURRENT_USER_QUERY } from "../User/User";
import PleaseSignIn from "./PleaseSignIn";
import { fakeUser } from "../../lib/testUtils";
import { GraphQLError } from "graphql";

describe("<PleaseSignIn />", () => {
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
        <PleaseSignIn>Test</PleaseSignIn>
      </MockedProvider>
    );

    expect(wrapper).toBeTruthy();
  });
});
