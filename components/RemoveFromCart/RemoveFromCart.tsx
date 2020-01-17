import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../User/User";
import { StyledButton } from "./RemoveFromCartStyles";

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

interface IRemoveFromCartProps {
  id: string;
}

const RemoveFromCart: React.FunctionComponent<IRemoveFromCartProps> = props => {
  return (
    <Mutation
      mutation={REMOVE_FROM_CART_MUTATION}
      variables={{ id: props.id }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(removeFromCart, { loading, error }) => {
        if (error) console.log(error.msg);
        return (
          <StyledButton disabled={loading} onClick={removeFromCart}>
            &times;
          </StyledButton>
        );
      }}
    </Mutation>
  );
};

export default RemoveFromCart;
