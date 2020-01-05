import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Form from "../Form/Form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ApolloClient from "apollo-client";
import { CURRENT_USER_QUERY } from "../User/User";

const REQUEST_RESET_QUERY = gql`
  query REQUEST_RESET_QUERY($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export interface IRequestResetUserProps {}

export interface IRequestResetUserState {
  email: string;
  loading: boolean;
  error?: string;
  [name: string]: string | boolean;
}

export default class RequestResetUser extends React.Component<
  IRequestResetUserProps,
  IRequestResetUserState
> {
  state = {
    email: "test@email.com",
    loading: false,
    error: ""
  };

  public render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                await this.onFormSubmit(client);
              }}
            >
              <fieldset
                disabled={this.state.loading}
                aria-busy={this.state.loading}
              >
                <ErrorMessage error={this.state.error} />
                <h2>Request Password Reset</h2>
                <label htmlFor="email">
                  Email
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  ></input>
                </label>

                <button type="submit">Request</button>
              </fieldset>
            </Form>
          );
        }}
      </ApolloConsumer>
    );
  }

  private saveToState = (event: React.ChangeEvent<HTMLInputElement>) => {
    // grab name and value
    const name = event.target.name;
    const val = event.target.value;

    // set state
    this.setState({ [name]: val });
  };

  private onFormSubmit = async (client: ApolloClient<any>) => {
    // set loading state
    this.setState({ loading: true, error: null });

    client
      .query({
        query: REQUEST_RESET_QUERY,
        variables: this.state
      })
      .then(({ data, loading }) => {
        // reset form
        this.setState({
          loading,
          email: "",
          password: "",
          error: null
        });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          error: err,
          loading: false
        });
      });
  };
}
