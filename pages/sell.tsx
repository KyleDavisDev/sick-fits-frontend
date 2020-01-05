import * as React from "react";
import CreateItem from "../components/CreateItem/CreateItem";
import PleaseSignIn from "../components/PleaseSignIn/PleaseSignIn";

interface ISellProps {}

const Sell: React.FunctionComponent<ISellProps> = props => {
  return (
    <PleaseSignIn>
      <CreateItem />
    </PleaseSignIn>
  );
};

export default Sell;
