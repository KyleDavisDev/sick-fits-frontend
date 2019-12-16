import * as React from "react";
import Items from "../components/Items/Items";

export interface IShopProps {
  query: { page: string };
}

export default class Shop extends React.Component<IShopProps> {
  static getInitialProps({ query }) {
    return { query };
  }
  public render() {
    return (
      <div>
        <Items page={parseFloat(this.props.query.page)} />
      </div>
    );
  }
}
