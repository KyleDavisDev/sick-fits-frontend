import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY(){
    orders{
      id
    }
  }
`;

interface IOrdersProps {}

const Orders: React.FunctionComponent<IOrdersProps> = props => {
  return <p>list orders here</p>;
};

export default Orders;
