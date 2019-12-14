import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

export interface ISingleItemProps {}

export interface ISingleItemState {}

export default class SingleItem extends React.Component<
  ISingleItemProps,
  ISingleItemState
> {
  constructor(props: ISingleItemProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>I am a single item</div>;
  }
}
