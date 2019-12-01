import * as React from "react";
import Header from "../Header/Header";
import Meta from "../Meta/Meta";
import { ThemeProvider, theme, injectGlobal } from "../../theme/theme";
import { StyledDiv } from "./PageStyles";

interface IPageProps {
  children?: any;
}

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format("woff2");
    font-weight: normal;
    font-style: normal;
  } 
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: "radnika_next";
  }
  a{
    text-decoration: none;
    color: ${theme.black}
  }
`;

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
