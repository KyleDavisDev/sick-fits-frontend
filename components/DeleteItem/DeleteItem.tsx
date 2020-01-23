import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
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
  skip: number;
  first: number;
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
        {(deleteItem: any) => {
          return (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this item?")) {
                  deleteItem().catch((err: any) => {
                    alert(err.message);
                  });
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

  public update = (cache: any, payload: any) => {
    if (cache.data.data.ROOT_QUERY) {
      // manually update the cache on the client, so it matches the server
      // 1. Read the cache for the items we want
      const data = cache.readQuery({
        query: ALL_ITEMS_QUERY,
        variables: { skip: this.props.skip, first: this.props.first }
      });

      // 2. Filter the deleted itemout of the page
      data.items = data.items.filter(
        (item: any) => item.id !== payload.data.deleteItem.id
      );

      // 3. Put the items back!
      cache.writeQuery({
        query: ALL_ITEMS_QUERY,
        data,
        variables: { skip: this.props.skip, first: this.props.first }
      });
    }
  };
}
