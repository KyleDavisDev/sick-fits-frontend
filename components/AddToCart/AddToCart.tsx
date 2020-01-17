import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { StyledButton } from "./AddToCartStyles";
import { CURRENT_USER_QUERY } from "../User/User";

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
    }
  }
`;

interface IAddToCartProps {
  id: string;
}

class AddToCart extends React.Component<IAddToCartProps> {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {addToCart => {
          return <StyledButton onClick={addToCart}>Add to Cart</StyledButton>;
        }}
      </Mutation>
    );
  }
}

export default AddToCart;
