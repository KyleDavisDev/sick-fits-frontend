import * as React from "react";
import { Query } from "react-apollo";
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
  "PERMISSIONSUPDATE"
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

interface IPermissionsProps {}

const Permissions: React.FunctionComponent<IPermissionsProps> = props => {
  return (
    <Query query={USERS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <ErrorMessage error={error} />;

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
                  return <User user={user} key={user.id} />;
                })}
              </tbody>
            </StyledTable>
          </div>
        );
      }}
    </Query>
  );
};

class User extends React.Component<any> {
  render() {
    const { user } = this.props;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map(permission => {
          return (
            <td key={`${user.id}-permission-${permission}-td`}>
              <label htmlFor={`${user.id}-permission-${permission}`}>
                <input type="checkbox" checked={false}></input>
              </label>
            </td>
          );
        })}
        <td>
          <Button>Update!</Button>
        </td>
      </tr>
    );
  }
}

export default Permissions;
