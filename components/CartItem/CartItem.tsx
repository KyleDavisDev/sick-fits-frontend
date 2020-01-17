import * as React from "react";

import formatMoney from "../../lib/formatMoney";
import { StyledLi } from "./CartItemStyles";
import RemoveFromCart from "../RemoveFromCart/RemoveFromCart";

export interface ICartItemProps {
  cartItem: {
    id: string;
    quantity: number;
    item: {
      id: string;
      price: number;
      image: string;
      title: string;
      description: string;
    };
  };
}

const CartItem: React.SFC<ICartItemProps> = (props: ICartItemProps) => {
  return (
    <StyledLi>
      <img
        src={props.cartItem.item.image}
        width="100"
        alt={props.cartItem.item.title}
      />
      <div>
        <h3>{props.cartItem.item.title}</h3>
        <p>
          {formatMoney(props.cartItem.item.price * props.cartItem.quantity)}
          {" - "}
          <em>
            {props.cartItem.quantity} &times;{" "}
            {formatMoney(props.cartItem.item.price)}
            {" each"}
          </em>
        </p>
      </div>
      <RemoveFromCart id={props.cartItem.id}></RemoveFromCart>
    </StyledLi>
  );
};

export default CartItem;
