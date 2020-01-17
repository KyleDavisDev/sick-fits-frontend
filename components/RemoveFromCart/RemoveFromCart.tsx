import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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
    <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={props.id}>
      {(removeFromCart, { loading, error }) => {
        return (
          <button disabled={loading} onClick={removeFromCart}>
            Remov{loading ? "ing" : "e"} from cart
          </button>
        );
      }}
    </Mutation>
  );
};

export default RemoveFromCart;
