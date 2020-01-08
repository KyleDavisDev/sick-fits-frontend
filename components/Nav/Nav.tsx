import * as React from "react";
import Link from "next/link";
import { Mutation } from "react-apollo";
import { NavStyles } from "./NavStyles";
import User from "../User/User";
import SignOut from "../SignOut/SignOut";
import { TOGGLE_CART_MUTATION } from "../Cart/Cart";

interface INavProps {}

const Nav: React.FunctionComponent<INavProps> = props => {
  return (
    <User>
      {({ data: { me } }) => {
        return (
          <NavStyles>
            <Link href="/Shop">
              <a>Shop</a>
            </Link>

            {me && (
              <>
                <Link href="/Sell">
                  <a>Sell</a>
                </Link>
                <Link href="/Orders">
                  <a>Orders</a>
                </Link>
                <Link href="/Me">
                  <a>Account</a>
                </Link>
                <SignOut />
                <Mutation mutation={TOGGLE_CART_MUTATION}>
                  {toggle => {
                    return <button onClick={toggle}>My Cart</button>;
                  }}
                </Mutation>
              </>
            )}
            {!me && (
              <Link href="/Signup">
                <a>Sign In</a>
              </Link>
            )}
          </NavStyles>
        );
      }}
    </User>
  );
};

export default Nav;
