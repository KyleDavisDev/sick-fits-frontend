import * as React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { StyledDiv, StyledHeader, StyledCloseButton } from "./CartStyles";
import Button from "../Button/Button";
import User from "../User/User";
import CartItem from "../CartItem/CartItem";

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

export interface ICartProps {}

const Cart: React.FunctionComponent<ICartProps> = (props: ICartProps) => {
  return (
    <User>
      {({ data: { me } }) => {
        if (!me) return null;
        return (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => {
              return (
                <Query query={LOCAL_STATE_QUERY}>
                  {({ data }) => {
                    return (
                      <StyledDiv open={data.cartOpen}>
                        <header>
                          <StyledCloseButton
                            title={"close"}
                            onClick={toggleCart}
                          >
                            &times;
                          </StyledCloseButton>
                          <StyledHeader>{me.name} Cart</StyledHeader>
                          <p>
                            You have{" "}
                            {me.cart && me.cart.items
                              ? me.cart.items.length
                              : 0}{" "}
                            item
                            {me.cart &&
                            me.cart.items &&
                            me.cart.items.length > 1
                              ? "s"
                              : ""}{" "}
                            in your cart.
                          </p>
                        </header>
                        <ul>
                          {me.cart.items.map(cartItem => {
                            return (
                              <CartItem key={cartItem.id}>
                                {cartItem.id}
                              </CartItem>
                            );
                          })}
                        </ul>
                        <footer>
                          <p>$10.00</p>
                          <Button onClick={() => {}}>Checkout</Button>
                        </footer>
                      </StyledDiv>
                    );
                  }}
                </Query>
              );
            }}
          </Mutation>
        );
      }}
    </User>
  );
};

export default Cart;
