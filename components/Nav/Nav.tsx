import * as React from "react";
import Link from "next/link";

interface INavProps {}

const Nav: React.FunctionComponent<INavProps> = props => {
  return (
    <div>
      <Link href="Sell">
        <a>Sell</a>
      </Link>

      <Link href="index">
        <a>Index</a>
      </Link>
    </div>
  );
};

export default Nav;
