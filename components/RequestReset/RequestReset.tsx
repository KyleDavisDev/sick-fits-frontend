import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Form from "../Form/Form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ApolloClient from "apollo-client";

export const REQUEST_RESET_QUERY = gql`
  query REQUEST_RESET_QUERY($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export interface IRequestResetProps {}

export interface IRequestResetState {
  email: string;
  loading: boolean;
  success: boolean;
  error?: any;
  [name: string]: string | boolean;
}

export default class RequestReset extends React.Component<
  IRequestResetProps,
  IRequestResetState
> {
  state = {
    email: "test@email.com",
    loading: false,
    success: false,
    error: ""
  };

  public render() {
    const { loading, error, success } = this.state;
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
                {!loading && !error && success && (
                  <p>Success! Check your email for an update link</p>
                )}
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
        variables: { email: this.state.email }
      })
      .then(({ data, loading }) => {
        // reset form
        this.setState({
          loading,
          email: "",
          error: null,
          success: true
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
