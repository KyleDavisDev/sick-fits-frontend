import * as React from "react";
import Link from "next/link";
import { StyledText } from "./TitleStyle";

interface ITitleProps {
  children: string;
  id: string;
}

const Title: React.FunctionComponent<ITitleProps> = props => {
  return (
    <StyledText>
      <Link href={{ pathname: "/item", query: { id: props.id } }}>
        <a>{props.children}</a>
      </Link>
    </StyledText>
  );
};

export default Title;
