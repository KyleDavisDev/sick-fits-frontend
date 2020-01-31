import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import AddToCart, { ADD_TO_CART_MUTATION } from "./AddToCart";
import { CURRENT_USER_QUERY } from "../User/User";
import { fakeUser, fakeItem, fakeCart } from "../../lib/testUtils";

const me = fakeUser();
const cart = fakeCart();
const item = fakeItem();
const mocks = [
  {
    request: { query: ADD_TO_CART_MUTATION },
    result: {
      data: { addToCart: { __typename: "Cart", id: item.id } }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: { me: { ...me, cart: { ...cart, items: [...cart.items, item] } } }
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

    console.log(wrapper.debug());
  });
});
