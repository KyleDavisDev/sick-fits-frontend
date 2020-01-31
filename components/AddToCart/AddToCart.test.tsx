import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import AddToCart, { ADD_TO_CART_MUTATION } from "./AddToCart";
import { CURRENT_USER_QUERY } from "../User/User";
import {
  fakeUser,
  fakeItem,
  fakeCart,
  fakeCartItem
} from "../../lib/testUtils";

const user = fakeUser();
const item = fakeItem();
const cartItem = fakeCartItem();
const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: { me: { ...user } }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...user,
          cart: { ...user.cart, items: [cartItem] }
        }
      }
    }
  },
  {
    request: { query: ADD_TO_CART_MUTATION, variables: { id: item.id } },
    result: {
      data: { addToCart: { __typename: "Cart", id: item.id } }
    }
  }
];

describe("<AddToCart />", () => {
  it("renders and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart id={item.id} />
      </MockedProvider>
    );

    await wait();
    wrapper.update();

    // check render
    expect(wrapper).toBeTruthy();

    // check snaps
    expect(wrapper.find("button")).toMatchSnapshot();
  });

  it("adds an item to cart when clicked", async () => {
    let apollClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apollClient = client;
            return <AddToCart id={item.id} />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );

    await wait(0);
    wrapper.update();

    // get the current user
    let res = await apollClient.query({ query: CURRENT_USER_QUERY });

    // check for empty cart
    expect(res.data.me.cart.items).toHaveLength(0);

    // add item to cart
    wrapper.find("button").simulate("click");

    await wait(100);
    wrapper.update();

    // check if new item is in the cart
    let res2 = await apollClient.query({
      query: CURRENT_USER_QUERY
    });
    const me2 = res2.data.me;

    // check for single item
    expect(me2.cart.items).toHaveLength(1);
  });
});
