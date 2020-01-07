import * as React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { StyledTable } from "./PermissionsStyles";
import Button from "../Button/Button";

const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE"
];

export const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      name
      id
      email
      permissions
    }
  }
`;

export const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION(
    $userId: ID!
    $permissions: [Permission]
  ) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      name
      email
      id
      permissions
    }
  }
`;

interface IPermissionsProps {}

const Permissions: React.FunctionComponent<IPermissionsProps> = props => {
  return (
    <Query query={USERS_QUERY}>
      {({ data, loading, error }) => {
        // if (loading) return <p>Loading...</p>;
        // if (error) return <ErrorMessage error={error} />;

        return (
          <div>
            <h2>Manage Users</h2>
            <StyledTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {possiblePermissions.map(permission => {
                    return <th key={permission}>{permission}</th>;
                  })}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => {
                  return <UserPermissions user={user} key={user.id} />;
                })}
              </tbody>
            </StyledTable>
          </div>
        );
      }}
    </Query>
  );
};

export interface IUserPermissionsProps {
  user: {
    name: string;
    email: string;
    id: string;
    permissions: string[];
  };
}

class UserPermissions extends React.Component<IUserPermissionsProps> {
  state = {
    user: { ...this.props.user }
  };
  render() {
    const { user } = this.state;

    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.user.permissions,
          userId: this.state.user.id
        }}
      >
        {(updatePermissions, { loading, error }) => {
          return (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => {
                return (
                  <td key={`${user.id}-permission-${permission}-td`}>
                    <label htmlFor={`${user.id}-permission-${permission}`}>
                      <input
                        id={`${user.id}-permission-${permission}`}
                        type="checkbox"
                        checked={user.permissions.includes(permission)}
                        value={permission}
                        onChange={this.onCheckBoxChange}
                      ></input>
                    </label>
                  </td>
                );
              })}
              <td>
                <Button onClick={updatePermissions} disabled={loading}>
                  Updat{loading ? "ing..." : "e"}!
                </Button>
              </td>
            </tr>
          );
        }}
      </Mutation>
    );
  }

  private onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = event.target;

    // get a copy of current permissions for us to mutate
    let permissions = [...this.state.user.permissions];

    // make the change
    if (checkbox.checked) {
      permissions.push(checkbox.value);
    } else {
      permissions = permissions.filter(permis => permis !== checkbox.value);
    }

    //update state
    this.setState({ user: { ...this.state.user, permissions } });
  };
}

export default Permissions;
