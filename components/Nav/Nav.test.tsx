import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { CURRENT_USER_QUERY } from "../User/User";
import Nav from "./Nav";
import { fakeUser } from "../../lib/testUtils";

describe("<Nav />", () => {
  const notSignedInMocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: { data: { me: null } }
    }
  ];

  const signedInMocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: { data: { me: fakeUser() } }
    }
  ];

  it("renders", () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav></Nav>
      </MockedProvider>
    );

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", async () => {
    // check signed out user first
    let wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav></Nav>
      </MockedProvider>
    );

    // allow component to load/update
    await wait();
    wrapper.update();

    let nav = wrapper.find('[data-test="nav"]');

    // check snapshot
    expect(nav).toMatchSnapshot();

    // mount component w/ signed in user
    wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav></Nav>
      </MockedProvider>
    );

    // allow component to load/update
    await wait();
    wrapper.update();

    nav = wrapper.find('[data-test="nav"]');

    // check snapshot
    expect(nav).toMatchSnapshot();
  });

  it("renders signed out nav when user is not logged in", async () => {
    // mount component w/ signed in user
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav></Nav>
      </MockedProvider>
    );

    // allow component to load/update
    await wait();
    wrapper.update();

    const nav = wrapper.find('[data-test="nav"]');

    // check both buttons
    expect(nav.find("Link").length).toEqual(2);
    // check first button text
    expect(
      nav
        .find("Link")
        .at(0)
        .text()
    ).toEqual("Shop");
    // check second button text
    expect(
      nav
        .find("Link")
        .at(1)
        .text()
    ).toEqual("Sign In");
  });
});
