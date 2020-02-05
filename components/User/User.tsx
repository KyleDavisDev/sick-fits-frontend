import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
      permissions
      orders {
        id
      }
      cart {
        created
        id
        items {
          id
          quantity
          item {
            id
            price
            image
            title
            description
          }
        }
      }
    }
  }
`;

export interface IUserProps {
  children(data: any): any;
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
