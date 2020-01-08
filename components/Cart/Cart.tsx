import * as React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { StyledDiv, StyledHeader, StyledCloseButton } from "./CartStyles";
import Button from "../Button/Button";

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
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {toggleCart => {
        return (
          <Query query={LOCAL_STATE_QUERY}>
            {({ data }) => {
              return (
                <StyledDiv open={data.cartOpen}>
                  <header>
                    <StyledCloseButton title={"close"} onClick={toggleCart}>
                      &times;
                    </StyledCloseButton>
                    <StyledHeader>Your Cart</StyledHeader>
                    <p>You have __ items in your cart.</p>
                  </header>

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
};

export default Cart;
