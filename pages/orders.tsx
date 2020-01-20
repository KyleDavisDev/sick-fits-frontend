import * as React from "react";
import Orders from "../components/Orders/Orders";

export interface IOrdersPageProps {}

export interface IOrdersPageState {}

export default class OrdersPage extends React.Component<
  IOrdersPageProps,
  IOrdersPageState
> {
  constructor(props: IOrdersPageProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <Orders />;
  }
}
