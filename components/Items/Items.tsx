import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Center, ItemsList } from "./ItemStyles";
import Item from "./components/Item/Item";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export interface IItemsProps {}

export default class Items extends React.Component<IItemsProps> {
  public render() {
    return (
      <Center>
        <p>Items!</p>
        <Query query={ALL_ITEMS_QUERY}>
          {payload => {
            if (payload.loading) return <p>Loading...</p>;
            if (payload.error) return <p>Error: {payload.error.message}</p>;
            return (
              <ItemsList>
                {payload.data.items.map(item => (
                  <Item item={item} key={item.id} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}
