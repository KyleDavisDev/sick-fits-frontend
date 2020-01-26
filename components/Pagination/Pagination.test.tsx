import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import Pagination, { PAGINATION_QUERY } from "./Pagination";
import { perPage } from "../../config";
let page = 1;

function makeMocksFor(length: number) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          itemsConnection: {
            __typename: "aggregate",
            aggregate: { __typename: "count", count: length }
          }
        }
      }
    }
  ];
}

describe("<Pagination />", () => {
  it("renders", () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(page)}>
        <Pagination page={page} />
      </MockedProvider>
    );

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(page)}>
        <Pagination page={page} />
      </MockedProvider>
    );

    expect(wrapper.find("p")).toMatchSnapshot();

    // let component load/update
    await wait();
    wrapper.update();

    // check links
    expect(
      wrapper.find("[data-test='pagination']").find("Link")
    ).toMatchSnapshot();

    // check head
    expect(wrapper.find("Head")).toMatchSnapshot();
  });

  it("renders loading text", () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(page)}>
        <Pagination page={page} />
      </MockedProvider>
    );

    expect(wrapper.find("p").text()).toContain("Loading");
  });

  it("renders correct text many items", async () => {
    const ranNum = Math.floor(Math.random() * 100);
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(ranNum)}>
        <Pagination page={page} />
      </MockedProvider>
    );

    // let component load/update
    await wait();
    wrapper.update();

    // grab where page count is being displayed
    const pageContainer = wrapper.find("[data-test='pagination'] p");

    // check text
    expect(pageContainer.text()).toContain(
      `Page ${page} of ${Math.ceil(ranNum / perPage)} !`
    );
  });
});
