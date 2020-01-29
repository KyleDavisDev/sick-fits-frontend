import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import DeleteItem, { DELETE_ITEM_MUTATION } from "./DeleteItem";
import { fakeUser, simulateInputChange } from "../../lib/testUtils";

const fakeId = "string";
const fakeSkip = 3;
const fakeFirst = 3;

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
});
