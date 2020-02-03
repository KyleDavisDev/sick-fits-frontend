import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import RemoveFromCart, { REMOVE_FROM_CART_MUTATION } from "./RemoveFromCart";
import { CURRENT_USER_QUERY } from "../User/User";
import { fakeUser, fakeCartItem } from "../../lib/testUtils";

const user = fakeUser();
const numOfCartItems = user.cart.items.length;
const cartItem = fakeCartItem();

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...user,
          cart: { ...user.cart, items: user.cart.items.concat([cartItem]) } // add single item to cart
        }
      }
    }
  },
  {
    request: {
      query: REMOVE_FROM_CART_MUTATION,
      variables: { id: cartItem.id }
    },
    result: {
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

  it("removes the item from the cart", async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <RemoveFromCart id={cartItem.id} />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );

    // let component update/render
    await wait(100);
    wrapper.update();

    // query apollo client
    const res = await apolloClient.query({ query: CURRENT_USER_QUERY });

    // check number of items
    expect(res.data.me.cart.items).toHaveLength(numOfCartItems + 1);
    // check quantity
    expect(res.data.me.cart.items[numOfCartItems].quantity).toBe(
      cartItem.quantity
    );
    // check id
    expect(res.data.me.cart.items[numOfCartItems].id).toBe(cartItem.id);

    // simulate the button click
    wrapper.find("button").simulate("click");

    // let component update/render
    await wait(100);
    wrapper.update();

    // query apollo client
    const res2 = await apolloClient.query({ query: CURRENT_USER_QUERY });

    // make sure we have the starting amount of items
    // check number of items
    expect(res.data.me.cart.items).toHaveLength(0);
  });
});
