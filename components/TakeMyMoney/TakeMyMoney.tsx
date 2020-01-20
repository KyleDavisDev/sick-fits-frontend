import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import gql from "graphql-tag";
import calcTotalPrice from "../../lib/calcTotalPrice";

interface ITakeMyMoneyProps {}

const TakeMyMoney: React.FunctionComponent<ITakeMyMoneyProps> = props => {
  return <p>yo</p>;
};

export default TakeMyMoney;
