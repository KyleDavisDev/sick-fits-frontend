import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../Form/Form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { CURRENT_USER_QUERY } from "../User/User";

export const CREATEUSER_MUTATION = gql`
  mutation CREATEUSER_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createNewUser(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export interface ICreateUserProps {}

export interface ICreateUserState {
  name: string;
  email: string;
  password: string;
  [name: string]: string;
}

export default class CreateUser extends React.Component<
  ICreateUserProps,
  ICreateUserState
> {
  state = { name: "", email: "", password: "" };

  public render() {
    return (
      <Mutation
        mutation={CREATEUSER_MUTATION}
        variables={{
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => {
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                await signup();

                // reset form
                this.setState({ name: "", email: "", password: "" });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <ErrorMessage error={error} />
                <h2>Sign up for an Acount</h2>
                <label htmlFor="email">
                  Email
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  ></input>
                </label>

                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
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
}
