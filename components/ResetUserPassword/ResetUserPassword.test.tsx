import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import ResetUserPassword, {
  RESET_USER_PASSWORD_MUTATION
} from "./ResetUserPassword";
import { CURRENT_USER_QUERY } from "../User/User";
import { fakeUser, simulateInputChange } from "../../lib/testUtils";

const mocks = [
  {
    request: {
      query: RESET_USER_PASSWORD_MUTATION,
      variables: { resetToken: "abc", password: "123", confirmPassword: "123" }
    },
    result: {
      data: {
        resetPassword: {
          __typename: "User",
          email: "abc@email.com",
          id: "abasdfasdf",
          name: "SampleName"
        }
      }
    }
  }
];

describe("<ResetUserPassword />", () => {
  it("renders and matches snapshot", () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ResetUserPassword resetToken={"abc"} />
      </MockedProvider>
    );

    // check renders
    expect(wrapper).toBeTruthy();

    // check snapshot
    expect(wrapper.find("form")).toMatchSnapshot();
  });
});
