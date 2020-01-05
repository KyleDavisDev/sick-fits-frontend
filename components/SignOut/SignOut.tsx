import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../User/User";

export const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut {
      message
    }
  }
`;

interface ISignOutProps {}

const SignOut: React.FunctionComponent<ISignOutProps> = props => {
  return (
    <Mutation
      mutation={SIGNOUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {signOut => {
        return <button onClick={signOut}>Sign Out</button>;
      }}
    </Mutation>
  );
};

export default SignOut;
