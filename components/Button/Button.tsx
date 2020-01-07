import * as React from "react";
import { StyledButton } from "./ButtonStyles";

interface IButtonProps {
  children: any;
  disabled?: boolean;
  onClick: () => void;
}

const Button: React.FunctionComponent<IButtonProps> = props => {
  return (
    <StyledButton onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
