import * as React from "react";
import { StyledLoading, StyledForm } from "./FormStyles";

export interface IFormProps {
  children: any;
}

class Form extends React.Component<IFormProps> {
  public render() {
    return <StyledForm>{this.props.children}</StyledForm>;
  }
}

export default Form;
