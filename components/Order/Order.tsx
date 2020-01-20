import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import Head from "next/head";
import formatMoney from "../../lib/formatMoney";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { StyledDiv } from "./OrderStyles";

export const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      created
      user {
        id
      }
      items {
        id
        price
        image
        quantity
        description
        title
      }
    }
  }
`;

export interface IOrderProps {
  id: string;
}

export interface IOrderState {}

export default class Order extends React.Component<IOrderProps, IOrderState> {
  constructor(props: IOrderProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (error) return <ErrorMessage error />;
          if (loading) return <p>Loading...</p>;
          console.log(data);
          return <p>yo</p>;
        }}
      </Query>
    );
  }
}
