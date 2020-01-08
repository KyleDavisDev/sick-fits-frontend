import * as React from "react";
import { StyledDiv, StyledHeader, StyledCloseButton } from "./CartStyles";
import Button from "../Button/Button";

export interface ICartProps {}

const Cart: React.FunctionComponent<ICartProps> = (props: ICartProps) => {
  return (
    <StyledDiv open={false}>
      <header>
        <StyledCloseButton title={"close"}>&times;</StyledCloseButton>
        <StyledHeader>Your Cart</StyledHeader>
        <p>You have __ items in your cart.</p>
      </header>

      <footer>
        <p>$10.00</p>
        <Button onClick={() => {}}>Checkout</Button>
      </footer>
    </StyledDiv>
  );
};

export default Cart;
