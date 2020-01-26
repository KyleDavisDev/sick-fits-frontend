import * as React from "react";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../User/User";
import SignInUser from "../SignInUser/SignInUser";

export interface IPleaseSignIn {
  children: React.Component;
}

const PleaseSignIn: React.FunctionComponent = (props: IPleaseSignIn) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        // return <p>hey</p>;
        if (loading) return <p>Loading...</p>;

        if (!data.me) {
          return (
            <>
              <p>Please sign in before you can continue!</p>
              <SignInUser />
            </>
          );
        }

        return props.children;
      }}
    </Query>
  );
};

export default PleaseSignIn;
