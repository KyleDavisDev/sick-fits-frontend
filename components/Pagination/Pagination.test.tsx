import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import Pagination, { PAGINATION_QUERY } from "./Pagination";

const page = 5;

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

  it("renders loading text", () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(page)}>
        <Pagination page={page} />
      </MockedProvider>
    );

    expect(wrapper.find("p").text()).toContain("Loading");
  });
});
