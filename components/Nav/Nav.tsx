import * as React from "react";
import Link from "next/link";
import { NavStyles } from "./NavStyles";
import User from "../User/User";

interface INavProps {}

const Nav: React.FunctionComponent<INavProps> = props => {
  return (
    <NavStyles>
      <User>
        {({ data: { me } }) => {
          if (me) return <p>{me.name}</p>;
          return null;
        }}
      </User>
      <Link href="/Shop">
        <a>Shop</a>
      </Link>
      <Link href="/Sell">
        <a>Sell</a>
      </Link>
      <Link href="/Signup">
        <a>Signup</a>
      </Link>
      <Link href="/Orders">
        <a>Orders</a>
      </Link>
      <Link href="/Me">
        <a>Account</a>
      </Link>
    </NavStyles>
  );
};

export default Nav;
