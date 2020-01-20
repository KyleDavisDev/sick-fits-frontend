import * as React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import gql from "graphql-tag";
import calcTotalPrice from "../../lib/calcTotalPrice";
import Error from "../ErrorMessage/ErrorMessage";
import User, { CURRENT_USER_QUERY } from "../User/User";

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
          const totalItemCount = totalItems(me.cart);
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
              token={token => this.onToken(token)}
            >
              {this.props.children}
            </StripeCheckout>
          );
        }}
      </User>
    );
  }

  private onToken = (token: Token) => {
    console.log(token);
  };
}

export default TakeMyMoney;
