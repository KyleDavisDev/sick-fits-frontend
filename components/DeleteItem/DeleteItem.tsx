import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ALL_ITEMS_QUERY } from "../Items/Items";

export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export interface IDeleteItemProps {
  id: string;
}

export interface IDeleteItemState {}

export default class DeleteItem extends React.Component<
  IDeleteItemProps,
  IDeleteItemState
> {
  constructor(props: IDeleteItemProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, payload) => {
          if (payload.error)
            return <ErrorMessage error={payload.error}></ErrorMessage>;
          return (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this item?")) {
                  deleteItem();
                }
              }}
            >
              Delete Item
            </button>
          );
        }}
      </Mutation>
    );
  }

  public update = (cache, payload) => {
    // Will manually update cache on client so matches server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. Filter deleted item out of the page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };
}
