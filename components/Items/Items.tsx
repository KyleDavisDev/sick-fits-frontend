import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Center, ItemsList } from "./ItemStyles";
import Item from "./components/Item/Item";
import Pagination from "../Pagination/Pagination";
import { perPage } from "../../config";

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export interface IItemsProps {
  page?: number;
}

export default class Items extends React.Component<IItemsProps> {
  public render() {
    return (
      <Center>
        <Pagination page={this.props.page || 1} />
        <p>Items!</p>
        <Query
          query={ALL_ITEMS_QUERY}
          variables={{
            first: perPage,
            skip: this.props.page * perPage - perPage || 0
          }}
        >
          {payload => {
            if (payload.loading) return <p>Loading...</p>;
            if (payload.error) return <p>Error: {payload.error.message}</p>;
            return (
              <ItemsList>
                {payload.data.items.map(item => (
                  <Item
                    item={item}
                    key={item.id}
                    first={perPage}
                    skip={this.props.page * perPage - perPage || 0}
                  />
                ))}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination page={this.props.page || 1} />
      </Center>
    );
  }
}
