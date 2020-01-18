import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { StyledDot, StyledAnimation } from "./CartCountStyles";

interface ICartCountProps {
  count: number;
}

const CartCount: React.FunctionComponent<ICartCountProps> = props => {
  return (
    <StyledAnimation>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          className="count"
          classNames="count"
          key={props.count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <StyledDot>{props.count}</StyledDot>
        </CSSTransition>
      </TransitionGroup>
    </StyledAnimation>
  );
};

export default CartCount;
