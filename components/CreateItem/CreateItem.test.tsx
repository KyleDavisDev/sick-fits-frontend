import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import CreateItem, { CREATE_ITEM_MUTATION } from "./CreateItem";
import { fakeItem } from "../../lib/testUtils";

// mock the global fetch API
const dogImage = "https://dog.com/dog.jpg";
const globalAny: any = global;
globalAny.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }]
  })
});

describe("<CreateItem />", () => {
  it("renders", () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    expect(wrapper).toBeTruthy();
  });
});
