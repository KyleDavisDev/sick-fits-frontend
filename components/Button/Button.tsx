import * as React from "react";
import { StyledButton } from "./ButtonStyles";

interface IButtonProps {
  children: any;
}

const Button: React.FunctionComponent<IButtonProps> = props => {
  return <StyledButton>{props.children}</StyledButton>;
};

export default Button;
