import * as React from "react";
import { StyledDiv, StyledHeader, StyledCloseButton } from "./CartStyles";

export interface ICartProps {}

export const Cart: React.FunctionComponent<ICartProps> = (
  props: ICartProps
) => {
  return (
    <StyledDiv>
      <header>
        <StyledCloseButton title={"close"}>&times;</StyledCloseButton>
        <StyledHeader>Your Cart</StyledHeader>
      </header>
      Cart
    </StyledDiv>
  );
};
