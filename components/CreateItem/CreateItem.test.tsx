import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import CreateItem, { CREATE_ITEM_MUTATION } from "./CreateItem";
import { fakeItem } from "../../lib/testUtils";
import Router from "next/router";

const item = fakeItem();

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
    const dogImage = "https://dog.com/dog.jpg";

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

  it("handles state update on user input", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    wrapper.find("#title").simulate("change", {
      target: { value: item.title, name: "title" }
    });
    wrapper.find("#price").simulate("change", {
      target: { value: item.price, name: "price", type: "number" }
    });
    wrapper.find("#description").simulate("change", {
      target: { value: item.description, name: "description" }
    });

    // let component update/load
    await wait();
    wrapper.update();

    const component = wrapper.find("CreateItem").instance() as CreateItem;
    expect(component.state).toMatchObject({
      title: item.title,
      description: item.description,
      price: item.price
    });
  });

  it("creates an item on form submission", async () => {
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            image: "",
            largeImage: "",
            price: item.price
          }
        },
        result: { data: { createItem: { ...item, __typename: "item" } } }
      }
    ];

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <CreateItem />
      </MockedProvider>
    );

    // fill out the form
    wrapper.find("#title").simulate("change", {
      target: { value: item.title, name: "title" }
    });
    wrapper.find("#price").simulate("change", {
      target: { value: item.price, name: "price", type: "number" }
    });
    wrapper.find("#description").simulate("change", {
      target: { value: item.description, name: "description" }
    });

    // mock the router
    Router.push = jest.fn();

    // submit form
    wrapper.find("form").simulate("submit");

    // let component update/load
    await wait(50);
    wrapper.update();

    // see if we have been redirected!
    expect(Router.push).toHaveBeenCalled();
  });
});
