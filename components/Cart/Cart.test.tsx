import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import Cart, { LOCAL_STATE_QUERY } from "./Cart";
import { CURRENT_USER_QUERY } from "../User/User";
import { fakeUser, simulateInputChange, fakeCart } from "../../lib/testUtils";

const me = fakeUser();
const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } }
  },
  {
    request: { query: LOCAL_STATE_QUERY },
    result: { data: { cartOpen: true } }
  }
];

describe("<Cart />", () => {
  it("renders and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Cart />
      </MockedProvider>
    );

    await wait();
    wrapper.update();

    // check snaps
    expect(wrapper.find("header p")).toMatchSnapshot();
    expect(wrapper.find("header h3")).toMatchSnapshot();
  });
});
