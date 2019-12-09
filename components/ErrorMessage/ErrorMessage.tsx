import React from "react";

import { StyledContainer } from "./ErrorMessageStyles";

export interface IErrorMessageProps {
  // error?: { message?: string; networkError?: { result?: {} } };
  error: any;
}

class ErrorMessage extends React.Component<IErrorMessageProps> {
  static defaultProps = {
    error: {}
  };
  render() {
    const { error } = this.props;
    if (!error || !error.message) return null;
    if (
      error.networkError &&
      error.networkError.result &&
      error.networkError.result.errors.length
    ) {
      return error.networkError.result.errors.map((error, i) => (
        <StyledContainer key={i}>
          <p data-test="graphql-error">
            <strong>Shoot!</strong>
            {error.message.replace("GraphQL error: ", "")}
          </p>
        </StyledContainer>
      ));
    }
    return (
      <StyledContainer>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace("GraphQL error: ", "")}
        </p>
      </StyledContainer>
    );
  }
}

export default ErrorMessage;
