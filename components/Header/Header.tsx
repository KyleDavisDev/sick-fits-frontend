import * as React from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";

import { Logo, StyledHeader } from "./HeaderStyles";
import Nav from "../Nav/Nav";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

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
