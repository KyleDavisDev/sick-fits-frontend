import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
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
          return (
            <StripeCheckout
              amount={calcTotalPrice(me.cart.items)}
              name="Sick Fits"
              description={`Order of ${totalItems(me.cart)}`}
            >
              {this.props.children}
            </StripeCheckout>
          );
        }}
      </User>
    );
  }
}

export default TakeMyMoney;
