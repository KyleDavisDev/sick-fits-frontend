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
