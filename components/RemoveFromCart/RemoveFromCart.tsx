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

class RemoveFromCart extends React.PureComponent<IRemoveFromCartProps> {
  render() {
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.id }}
        // refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        update={this.update}
        optimisticResponse={{
          __typename: "Mutation",
          removeFromCart: {
            __typename: "CartItem",
            id: this.props.id
          }
        }}
      >
        {(removeFromCart: any, { loading, error }: any) => {
          if (error) console.log(error.msg);
          return (
            <StyledButton disabled={loading} onClick={removeFromCart}>
              &times;
            </StyledButton>
          );
        }}
      </Mutation>
    );
  }

  // This will be called as soon as we get response from server
  private update = (
    cache: {
      readQuery: (arg0: { query: any }) => any;
      writeQuery: (arg0: { query: any; data: any }) => void;
    },
    payload: { data: { removeFromCart: { id: any } } }
  ) => {
    console.log("running remove from cart");
    // 1. Read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });

    // 2. Remove item from the cart
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart.items = data.me.cart.items.filter(
      (cartItem: { id: any }) => cartItem.id !== cartItemId
    );

    // 3. Write it back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };
}

export default RemoveFromCart;
