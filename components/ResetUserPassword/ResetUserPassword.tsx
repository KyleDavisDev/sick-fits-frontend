import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Form from "../Form/Form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "../User/User";

const RESET_USER_PASSWORD_MUTATION = gql`
  mutation RESET_USER_PASSWORD_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      name
    }
  }
`;

export interface IResetUserPasswordProps {
  resetToken: string;
}

export interface IResetUserPasswordState {
  resetToken: string;
  password: string;
  confirmPassword: string;
  [name: string]: string | boolean;
}

export default class ResetUserPassword extends React.Component<
  IResetUserPasswordProps,
  IResetUserPasswordState
> {
  state = {
    resetToken: this.props.resetToken,
    password: "",
    confirmPassword: ""
  };

  public render() {
    return (
      <Mutation mutation={RESET_USER_PASSWORD_MUTATION} variables={this.state}>
        {(resetPassword, { error, loading, called }) => {
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                await this.onFormSubmit(resetPassword);
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <ErrorMessage error={error} />
                {!loading && !error && called && (
                  <p>Success! Check your email for an update link</p>
                )}
                <h2>Request Password Reset</h2>

                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  ></input>
                </label>

                <label htmlFor="confirmPassword">
                  Confirm Password
                  <input
                    type="password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  ></input>
                </label>

                <button type="submit">Request</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }

  private saveToState = (event: React.ChangeEvent<HTMLInputElement>) => {
    // grab name and value
    const name = event.target.name;
    const val = event.target.value;

    // set state
    this.setState({ [name]: val });
  };

  private onFormSubmit = async (resetPassword: any) => {
    // set loading state
    this.setState({ loading: true, error: null });

    await resetPassword();

    this.setState({
      email: "",
      password: "",
      confirmPassword: ""
    });
  };
}
