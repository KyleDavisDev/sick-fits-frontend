import * as React from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import {
  StyledDropDown,
  StyledDropDownItem,
  StyledSearchStyles
} from "./SearchStyles";

export const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
    }
  }
`;

const routeToItem = item => {
  Router.push({
    pathname: "/item/view",
    query: {
      id: item.id
    }
  });
};

interface IAutoCompleteProps {}

interface IAutoCompleteState {
  items: [{ id: string; image: string; title: string }?];
  loading: boolean;
}

class AutoComplete extends React.Component<
  IAutoCompleteProps,
  IAutoCompleteState
> {
  state: IAutoCompleteState = {
    loading: false,
    items: []
  };

  render() {
    resetIdCounter();
    return (
      <StyledSearchStyles>
        <Downshift
          itemToString={item => (item === null ? "" : item.title)}
          onChange={routeToItem}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => {
            return (
              <div>
                <ApolloConsumer>
                  {client => {
                    return (
                      <input
                        {...getInputProps({
                          id: "seach",
                          className: this.state.loading ? "loading" : "",
                          type: "search",
                          placeholder: "Search For An Item...",
                          onChange: e => {
                            e.persist();
                            this.onChange(e, client);
                          }
                        })}
                      />
                    );
                  }}
                </ApolloConsumer>
                {isOpen && (
                  <StyledDropDown>
                    {this.state.items.map((item, ind) => {
                      return (
                        <StyledDropDownItem
                          key={item.id}
                          {...getItemProps({ item })}
                          highlighted={ind === highlightedIndex}
                        >
                          <img width="50" src={item.image} alt={item.title} />
                          {item.title}
                        </StyledDropDownItem>
                      );
                    })}
                    {!this.state.items.length && !this.state.loading && (
                      <StyledDropDownItem>
                        Nothing found for {inputValue}
                      </StyledDropDownItem>
                    )}
                  </StyledDropDown>
                )}
              </div>
            );
          }}
        </Downshift>
      </StyledSearchStyles>
    );
  }

  private onChange = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>, client: any) => {
      //set loading on
      this.setState({ loading: true });

      // manually query for results
      const res = await client.query({
        query: SEARCH_ITEMS_QUERY,
        variables: { searchTerm: e.target.value }
      });

      // turn loading off and assign data
      this.setState({
        loading: false,
        items: res.data && res.data.items.length > 0 ? res.data.items : []
      });
    },
    350
  );
}

export interface ISearchProps {}

export default class Search extends React.PureComponent<ISearchProps> {
  public render() {
    return <AutoComplete />;
  }
}
