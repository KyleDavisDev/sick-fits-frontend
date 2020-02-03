import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import RemoveFromCart, { REMOVE_FROM_CART_MUTATION } from "./RemoveFromCart";
import { CURRENT_USER_QUERY } from "../User/User";
import { fakeUser, fakeItem, fakeCartItem } from "../../lib/testUtils";

const user = fakeUser();
const numOfCartItems = user.cart.items.length;
const item = fakeItem();
const cartItem = fakeCartItem();

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...user,
          cart: { ...user.cart, items: user.cart.items.concat([cartItem]) }
        }
      }
    }
  },
  {
    request: {
      query: REMOVE_FROM_CART_MUTATION,
      variables: { id: cartItem.id }
    },
    response: {
      data: {
        removeFromCart: {
          __typename: "CartItem",
          id: cartItem.id
        }
      }
    }
  }
];

describe("<RemoveFromCart />", () => {
  it("renders and matches snapshots", async () => {
    const wrapper = mount(
      <MockedProvider>
        <RemoveFromCart id={cartItem.id} />
      </MockedProvider>
    );

    // check that it loads
    expect(wrapper).toBeTruthy();

    expect(wrapper.find("button")).toMatchSnapshot();
  });
});
