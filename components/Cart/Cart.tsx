import * as React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import { StyledDiv, StyledHeader, StyledCloseButton } from "./CartStyles";
import Button from "../Button/Button";
import User from "../User/User";
import CartItem from "../CartItem/CartItem";
import TakeMyMoney from "../TakeMyMoney/TakeMyMoney";
import formatMoney from "../../lib/formatMoney";
import calcTotalPrice from "../../lib/calcTotalPrice";

export const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

export interface ICartProps {}

const Cart: React.FunctionComponent<ICartProps> = (props: ICartProps) => {
  return (
    <Composed>
      {({ user, toggleCart, localState }) => {
        const me = user.data.me;
        if (!me) return null;
        return (
          <StyledDiv open={localState.data.cartOpen}>
            <header>
              <StyledCloseButton title={"close"} onClick={toggleCart}>
                &times;
              </StyledCloseButton>
              <StyledHeader>{me.name} Cart</StyledHeader>
              <p>
                You have {me.cart && me.cart.items ? me.cart.items.length : 0}{" "}
                item
                {me.cart && me.cart.items && me.cart.items.length > 1
                  ? "s"
                  : ""}{" "}
                in your cart.
              </p>
            </header>
            <ul>
              {me.cart &&
                me.cart.items &&
                me.cart.items.map(cartItem => {
                  return (
                    <CartItem key={cartItem.id} cartItem={cartItem}>
                      {cartItem.id}
                    </CartItem>
                  );
                })}
            </ul>
            <footer>
              <p>
                {me.cart &&
                  me.cart.items &&
                  formatMoney(calcTotalPrice(me.cart.items))}
              </p>
              <TakeMyMoney>
                <Button onClick={() => {}}>Checkout</Button>
              </TakeMyMoney>
            </footer>
          </StyledDiv>
        );
      }}
    </Composed>
  );
};

export default Cart;
