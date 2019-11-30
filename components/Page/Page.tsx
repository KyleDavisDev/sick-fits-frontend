import * as React from "react";
import Header from "../Header/Header";
import Meta from "../Meta/Meta";
import { ThemeProvider, theme } from "../../theme/theme";
import { StyledDiv } from "./PageStyles";

interface IPageProps {
  children?: any;
}

const Page: React.FunctionComponent<IPageProps> = props => {
  return (
    <ThemeProvider theme={theme}>
      <StyledDiv>
        <Meta />
        <Header />
        {props.children}
      </StyledDiv>
    </ThemeProvider>
  );
};

export default Page;
