import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../Form/Form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const CREATEUSER_MUTATION = gql`
  mutation CREATEUSER_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createNewUser(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

export interface ICreateUserProps {}

export interface ICreateUserState {
  email: string;
  name: string;
  password: string;
  [name: string]: string;
}

export default class CreateUser extends React.Component<
  ICreateUserProps,
  ICreateUserState
> {
  state = { name: "", password: "", email: "" };

  public render() {
    return (
      <Mutation mutation={CREATEUSER_MUTATION} variables={this.state}>
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
