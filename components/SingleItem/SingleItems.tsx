import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { SingleItemStyles } from "./SingleItemStyles";

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

export interface ISingleItemProps {
  id: string;
}

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
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {payload => {
          if (payload.loading) return <p>Loading...</p>;
          if (payload.error) return <ErrorMessage error={payload.error} />;
          if (!payload.data.item)
            return <p>No Item found for ID: {this.props.id}</p>;
          const { item } = payload.data;
          return (
            <SingleItemStyles>
              <Head>
                <title>Sick Fits | {item.title}</title>
              </Head>
              <img src={item.largeImage} alt={item.title} />
              <div className="details">
                <h2>Viewing {item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}
