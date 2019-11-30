import * as React from "react";
import Link from "next/link";

import { Logo } from "./HeaderStyles";
import Nav from "../Nav/Nav";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = props => {
  return (
    <div>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>Sick Fits</a>
          </Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search here</p>
      </div>
      <div>Cart</div>
    </div>
  );
};

export default Header;
