import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    orders(orderBy: created_DESC) {
      id
      total
      created
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

interface IOrdersProps {}

const Orders: React.FunctionComponent<IOrdersProps> = props => {
  return (
    <Query query={ALL_ORDERS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <ErrorMessage error />;

        const orders = data.orders;

        return <div>you have {orders.length} orders!</div>;
      }}
    </Query>
  );
};

export default Orders;
