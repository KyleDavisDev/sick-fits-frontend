import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const;

export interface IOrderProps {
  id: string;
}

export interface IOrderState {}

export default class Order extends React.Component<IOrderProps, IOrderState> {
  constructor(props: IOrderProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>I am an order!</div>;
  }
}
