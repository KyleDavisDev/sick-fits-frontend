import "jsdom-global/register";
import * as React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import CreateUser, { CREATEUSER_MUTATION } from "./CreateUser";
import { CURRENT_USER_QUERY } from "../User/User";
import { fakeUser, simulateInputChange } from "../../lib/testUtils";

const me = fakeUser();
const mocks = [
  // create user mock mutation
  {
    request: {
      query: CREATEUSER_MUTATION,
      variables: { name: me.name, email: me.email, password: "abc" }
    },
    result: {
      data: {
        createNewUser: {
          __typename: "User",
          id: "abc123",
          email: me.email,
          name: me.name
        }
      }
    }
  },
  // current user query mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: { me }
    }
  }
];

describe("<CreateUser />", () => {
  it("renders", () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateUser />
      </MockedProvider>
    );

    expect(wrapper).toBeTruthy();
  });

  it("renders", () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateUser />
      </MockedProvider>
    );

    expect(wrapper.find("form")).toMatchSnapshot();
  });

  it("calls the mutation and updates apollo client", async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <CreateUser />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );

    // allow component to upload/load
    await wait();
    wrapper.update();

    //simulate change
    simulateInputChange(wrapper, "name", me.name);
    simulateInputChange(wrapper, "email", me.email);
    simulateInputChange(wrapper, "password", "abc");

    //update again
    wrapper.update();

    // submit form
    wrapper.find("form").simulate("submit");

    await wait();

    // query user out of apolloClient
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });

    //check if our user made it to the store!
    expect(user.data.me).toMatchObject(me);
  });
});
