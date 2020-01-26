import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import CreateItem, { CREATE_ITEM_MUTATION } from "./CreateItem";
import { fakeItem } from "../../lib/testUtils";

// mock the global fetch API
const dogImage = "https://dog.com/dog.jpg";

describe("<CreateItem />", () => {
  it("renders", () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    const form = wrapper.find("form");
    expect(form).toMatchSnapshot();
  });

  it("uploads an image when changed", async () => {
    // mock fetch
    // @ts-ignore
    global.fetch = jest.fn().mockResolvedValue({
      json: () => ({
        secure_url: dogImage,
        eager: [{ secure_url: dogImage }]
      })
    });

    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    const input = wrapper.find("input[type='file']");
    input.simulate("change", { target: { files: [dogImage] } });

    // let component update/load
    await wait();
    wrapper.update();

    // grab component
    const component = wrapper.find("CreateItem").instance() as CreateItem;

    // check state
    expect(component.state.image).toEqual(dogImage);
    expect(component.state.largeImage).toEqual(dogImage);
    // @ts-ignore
    expect(global.fetch).toHaveBeenCalled();

    // reset the global fetch
    // @ts-ignore
    global.fetch.mockReset();
  });
});
