import * as React from "react";
import Header from "../Header/Header";
import Meta from "../Meta/Meta";

interface IPageProps {
  children?: any;
}

const Page: React.FunctionComponent<IPageProps> = props => {
  return (
    <div>
      <Meta />
      <Header />
      {props.children}
    </div>
  );
};

export default Page;
