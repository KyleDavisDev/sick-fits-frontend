import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import moment from "moment";
import { StyledUl, OrderItemStyles } from "./OrdersStyles";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import formatMoney from "../../lib/formatMoney";

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

        return (
          <div>
            <h2>You have {orders.length} orders!</h2>
            <StyledUl>
              {orders.map(order => {
                return (
                  <OrderItemStyles key={order.id}>
                    <Link
                      href={{
                        pathname: "order/view",
                        query: { id: order.id }
                      }}
                    >
                      <a>
                        <div className="order-meta">
                          <p>
                            {order.items.reduce((accum, item) => {
                              return accum + item.quantity;
                            }, 0)}{" "}
                            Items
                          </p>
                          <p>{order.items.length} Products</p>
                          <p>
                            Created at{" "}
                            {moment(order.created * 1000).format("LLL")}
                          </p>
                          <p>{formatMoney(order.total)}</p>
                        </div>
                        <div className="images">
                          {order.items.map(item => {
                            return (
                              <img
                                src={item.image}
                                key={item.id}
                                alt={item.description}
                              />
                            );
                          })}
                        </div>
                      </a>
                    </Link>
                  </OrderItemStyles>
                );
              })}
            </StyledUl>
          </div>
        );
      }}
    </Query>
  );
};

export default Orders;
