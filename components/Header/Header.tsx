import * as React from "react";
import Link from "next/link";

import { Logo, StyledHeader } from "./HeaderStyles";
import Nav from "../Nav/Nav";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = props => {
  return (
    <StyledHeader>
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
    </StyledHeader>
  );
};

export default Header;
