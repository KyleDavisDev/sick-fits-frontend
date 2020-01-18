import * as React from "react";
import Downshift from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import {
  StyledDropDown,
  StyledDropDownItem,
  StyledSearchStyles
} from "./SearchStyles";

class AutoComplete extends React.Component {
  render() {
    return (
      <StyledSearchStyles>
        <div>
          <input type="search" />
          <StyledDropDown>
            <p>Items will go here...</p>
          </StyledDropDown>
        </div>
      </StyledSearchStyles>
    );
  }
}

export interface ISearchProps {}

export default class Search extends React.PureComponent<ISearchProps> {
  public render() {
    return <AutoComplete />;
  }
}
