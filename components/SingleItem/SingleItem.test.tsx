import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import SingleItem, { SINGLE_ITEM_QUERY } from "./SingleItems";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeItem } from "../../lib/testUtils";

describe("<SingleItem />", () => {
  const item = fakeItem();
  const mocks = [
    {
      request: { query: SINGLE_ITEM_QUERY, variables: { id: item.id } },
      result: { data: { item } }
    }
  ];

  it("renders", () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id={item.id} />
      </MockedProvider>
    );
    expect(wrapper).toBeTruthy();
  });

  it("renders loading text", () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id={item.id} />
      </MockedProvider>
    );
    expect(wrapper.text()).toContain("Loading...");
  });
});
