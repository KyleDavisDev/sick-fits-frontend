import * as React from "react";
import { StyledLoading, StyledForm } from "./FormStyles";

export interface IFormProps {
  children: any;
  onSubmit: (e: React.FormEvent) => void;
}

class Form extends React.Component<IFormProps> {
  public render() {
    return (
      <StyledForm onSubmit={this.props.onSubmit}>
        {this.props.children}
      </StyledForm>
    );
  }
}

export default Form;
