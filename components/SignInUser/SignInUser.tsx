import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Form from "../Form/Form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ApolloClient from "apollo-client";
import { CURRENT_USER_QUERY } from "../User/User";

const SIGNINUSER_QUERY = gql`
  query SIGNINUSER_QUERY($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export interface ISignInUserProps {}

export interface ISignInUserState {
  email: string;
  loading: boolean;
  error?: string;
  password: string;
  [name: string]: string | boolean;
}

export default class SignInUser extends React.Component<
  ISignInUserProps,
  ISignInUserState
> {
  state = {
    password: "test",
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
                <h2>Sign In to existing account</h2>
                <label htmlFor="email">
                  Email
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  ></input>
                </label>

                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  ></input>
                </label>

                <button type="submit">Submit</button>
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
        query: SIGNINUSER_QUERY,
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

    // refetch mutation so name shows up at top
    // need to wait or else cookie may not be set in time
    setTimeout(() => {
      client
        .query({
          query: CURRENT_USER_QUERY,
          fetchPolicy: "network-only"
        })
        .then(dat => {
          // console.log(dat.data);
        });
    }, 1000);
  };
}
