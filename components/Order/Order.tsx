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

          const order = data.order;
          return (
            <StyledDiv>
              <Head>
                <title>Sick Fits order {order.id}</title>
              </Head>
              <p>
                <span>Order ID:</span>
                <span>{order.id}</span>
              </p>
              <p>
                <span>Total:</span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Date:</span>
                <span>{moment(order.created * 1000).format("LLL")}</span>
              </p>
              <p>
                <span>Item Count:</span>
                <span>{order.items.length}</span>
              </p>
              <div className="items">
                {order.items.map(item => {
                  return (
                    <div className="order-item" key={item.id}>
                      <img src={item.image} alt={item.description} />
                      <div className="item-details">
                        <h2>{item.title}</h2>
                        <p>Qty: {item.quantity}</p>
                        <p>Each: {formatMoney(item.price)}</p>
                        <p>
                          Subtotal: {formatMoney(item.price * item.quantity)}
                        </p>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </StyledDiv>
          );
        }}
      </Query>
    );
  }
}
