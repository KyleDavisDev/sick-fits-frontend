import * as React from "react";
import Nav from "../Nav/Nav";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = props => {
  return (
    <div>
      <div className="bar">
        <a href="#">Sick Fits</a>
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
