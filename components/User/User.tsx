import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ReactElement } from "react";

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
      permissions
    }
  }
`;

export interface IUserProps {
  children(data: any): ReactElement;
}

const User: React.FunctionComponent<IUserProps> = props => {
  return (
    <Query {...props} query={CURRENT_USER_QUERY}>
      {payload => {
        return props.children(payload);
      }}
    </Query>
  );
};

export default User;