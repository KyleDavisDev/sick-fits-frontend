import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import NProgress from "nprogress";
import Router from "next/router";
import TakeMyMoney, { CREATE_ORDER_MUTATION } from "./TakeMyMoney";
import { CURRENT_USER_QUERY } from "../User/User";
import { fakeUser, fakeCartItem, fakeCart } from "../../lib/testUtils";

// mock the router
Router.push = jest.fn();

// const fakeToken: Token = {};

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: { ...fakeUser(), cart: { ...fakeCart() } } } }
  }
];

describe("<TakeMyMoney />", () => {
  it("renders and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney>
          <p>Test</p>
        </TakeMyMoney>
      </MockedProvider>
    );

    await wait();
    wrapper.update();

    // check that it renders
    expect(wrapper).toBeTruthy();

    const checkoutButton = wrapper.find("CheckoutButton");
    expect(checkoutButton).toMatchSnapshot();
  });

  it("creates an order ontoken", async () => {
    const createOrderMock = jest
      .fn()
      .mockResolvedValue({ data: { createOrder: { id: "xyz789" } } });

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney>
          <p>Test</p>
        </TakeMyMoney>
      </MockedProvider>
    );

    // grab component
    const component = wrapper.find("TakeMyMoney").instance() as TakeMyMoney;

    // manually call onToken method
    component.onToken({ id: "abc123" }, createOrderMock);
  });
});
