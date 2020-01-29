import "jsdom-global/register";
import * as React from "react";
import { mount, shallow } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import ResetUserPassword, {
  RESET_USER_PASSWORD_MUTATION
} from "./ResetUserPassword";
import { CURRENT_USER_QUERY } from "../User/User";
import { fakeUser, simulateInputChange } from "../../lib/testUtils";

const fakePassword = "123";
let fakeConfirmPassword = "123";
const fakeResetToken = "asbaafsdfasdf_1231";

const mocks = [
  {
    request: {
      query: RESET_USER_PASSWORD_MUTATION,
      variables: {
        resetToken: fakeResetToken,
        password: fakePassword,
        confirmPassword: fakeConfirmPassword
      }
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
        <ResetUserPassword resetToken={fakeResetToken} />
      </MockedProvider>
    );

    // check renders
    expect(wrapper).toBeTruthy();

    // check snapshot
    expect(wrapper.find("form")).toMatchSnapshot();
  });

  it("text boxes update with user input", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ResetUserPassword resetToken={fakeResetToken} />
      </MockedProvider>
    );

    // let component fully render/load
    await wait();
    wrapper.update();

    // simulate user input
    simulateInputChange(wrapper, "password", fakePassword);
    simulateInputChange(wrapper, "confirmPassword", fakeConfirmPassword);

    // let component fully render/load
    await wait();
    wrapper.update();

    // check input box
    expect(wrapper.find("input[name='password']").prop("value")).toEqual(
      fakePassword
    );
    expect(wrapper.find("input[name='confirmPassword']").prop("value")).toEqual(
      fakeConfirmPassword
    );
  });
});
