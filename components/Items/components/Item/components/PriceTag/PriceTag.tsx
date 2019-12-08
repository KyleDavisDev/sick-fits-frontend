import * as React from "react";
import { StyledSpan } from "./PriceTagStyle";
import formatMoney from "../../../../../../lib/formatMoney";

interface IPriceTagProps {
  children: number;
}

const PriceTag: React.FunctionComponent<IPriceTagProps> = props => {
  return <StyledSpan>{formatMoney(props.children)}</StyledSpan>;
};

export default PriceTag;
