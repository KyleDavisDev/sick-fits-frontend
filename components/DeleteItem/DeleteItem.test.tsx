import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import DeleteItem, { DELETE_ITEM_MUTATION } from "./DeleteItem";
import { ALL_ITEMS_QUERY } from "../Items/Items";
import { fakeUser, simulateInputChange } from "../../lib/testUtils";

const fakeId = "asdab1223kkkdadf_123";
const fakeSkip = 3;
const fakeFirst = 3;

const mocks = [
  {
    request: { query: DELETE_ITEM_MUTATION, variables: { id: fakeId } },
    result: { data: { deleteItem: { __typename: "Item", id: fakeId } } }
  }
];

describe("<DeleteItem />", () => {
  it("renders and matches snapshot", () => {
    const wrapper = mount(
      <MockedProvider>
        <DeleteItem id={fakeId} first={fakeFirst} skip={fakeSkip} />
      </MockedProvider>
    );

    // check render
    expect(wrapper).toBeTruthy();

    // check snapshot
    expect(wrapper.find("button")).toMatchSnapshot();
  });

  it("calls global window confirm on button click", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <DeleteItem id={fakeId} first={fakeFirst} skip={fakeSkip} />
      </MockedProvider>
    );

    // check render
    expect(wrapper).toBeTruthy();

    // mock window confirm
    window.confirm = jest.fn();

    // click button
    wrapper.find("button").simulate("click");

    // allow any updating
    await wait();
    wrapper.update();

    expect(window.confirm).toHaveBeenCalled();

    // reset window confirm
    // @ts-ignore
    window.confirm.mockReset();
  });
});
