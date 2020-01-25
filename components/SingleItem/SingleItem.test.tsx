import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import SingleItem, { SINGLE_ITEM_QUERY } from "./SingleItems";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeItem } from "../../lib/testUtils";
import { GraphQLError } from "graphql";

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

  it("renders matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id={item.id} />
      </MockedProvider>
    );

    await wait(); // wait til next tick
    wrapper.update(); //update wrapper

    // check snapshots
    expect(wrapper.find("h2")).toMatchSnapshot();
    expect(wrapper.find("img")).toMatchSnapshot();
    expect(wrapper.find("p")).toMatchSnapshot();
  });

  it("renders item", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id={item.id} />
      </MockedProvider>
    );

    await wait(); // wait til next tick
    wrapper.update(); //update wrapper
    const img = wrapper.find("img"); // grab image

    // check values
    expect(wrapper.find("h2").text()).toEqual(`Viewing ${item.title}`);
    expect(img.props().src).toEqual(item.largeImage);
    expect(img.props().alt).toEqual(item.title);
    expect(wrapper.find("p").text()).toEqual(`${item.description}`);
  });

  it("errors when an item is not found", async () => {
    const errorMessage = "Count not render the thigns!!!!";
    // create an error mock
    const errMocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: item.id } },
        result: {
          errors: [new GraphQLError(errorMessage)]
        }
      }
    ];

    const wrapper = mount(
      <MockedProvider mocks={errMocks}>
        <SingleItem id={item.id} />
      </MockedProvider>
    );

    await wait(); // wait til next tick
    wrapper.update(); // update wrapper

    const errTag = wrapper.find("[data-test='graphql-error']");

    expect(errTag.text()).toContain(errorMessage);
  });
});
