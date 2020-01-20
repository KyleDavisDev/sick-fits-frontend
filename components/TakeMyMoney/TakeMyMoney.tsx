import * as React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import gql from "graphql-tag";
import calcTotalPrice from "../../lib/calcTotalPrice";
import Error from "../ErrorMessage/ErrorMessage";
import User, { CURRENT_USER_QUERY } from "../User/User";

export const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

interface ITakeMyMoneyProps {
  children: any;
}

function totalItems(cart) {
  return cart.items.reduce((acc, item) => acc + item.quantity, 0);
}

class TakeMyMoney extends React.Component<ITakeMyMoneyProps> {
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          if (!me.cart || !me.cart.items.length) return <p>No items</p>;
          const totalItemCount = totalItems(me.cart);
          return (
            <Mutation
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {createOrder => {
                return (
                  <StripeCheckout
                    amount={calcTotalPrice(me.cart.items)}
                    name="Sick Fits"
                    description={`Order of ${totalItemCount} item${
                      totalItemCount > 1 ? "s" : ""
                    }! `}
                    image={me.cart.items[0] && me.cart.items[0].item.image}
                    stripeKey="pk_test_GaDtTfxBhDnWRXT8nsE4xtNQ00Y9ZaOyUT"
                    currency="USD"
                    email={me.email}
                    token={token => this.onToken(token, createOrder)}
                  >
                    {this.props.children}
                  </StripeCheckout>
                );
              }}
            </Mutation>
          );
        }}
      </User>
    );
  }

  private onToken = async (token: Token, createOrder: any) => {
    //manually call mutation
    const res = await createOrder({ variables: { token: token.id } }).catch(
      err => {
        alert(err.message);
      }
    );

    console.log(res);
  };
}

export default TakeMyMoney;
