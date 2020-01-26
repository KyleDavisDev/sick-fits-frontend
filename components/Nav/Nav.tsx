import * as React from "react";
import Link from "next/link";
import { Mutation } from "react-apollo";
import { NavStyles } from "./NavStyles";
import User from "../User/User";
import SignOut from "../SignOut/SignOut";
import { TOGGLE_CART_MUTATION } from "../Cart/Cart";
import CartCount from "../CartCount/CartCount";

interface INavProps {}

const Nav: React.FunctionComponent<INavProps> = props => {
  return (
    <User>
      {({ data: { me } }) => {
        return (
          <NavStyles data-test="nav">
            <Link href="/shop">
              <a>Shop</a>
            </Link>

            {me && (
              <>
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
                <Link href="/orders">
                  <a>Orders</a>
                </Link>
                <Link href="/me">
                  <a>Account</a>
                </Link>
                <SignOut />
                <Mutation mutation={TOGGLE_CART_MUTATION}>
                  {toggle => {
                    return (
                      <button onClick={toggle}>
                        My Cart
                        <CartCount
                          count={
                            me.cart && me.cart.items
                              ? me.cart.items.reduce(
                                  (acc, item) => acc + item.quantity,
                                  0
                                )
                              : 0
                          }
                        />
                      </button>
                    );
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
