import * as React from "react";
import { Query } from "react-apollo";

export interface IItemsProps {}

export default class Items extends React.Component<IItemsProps> {
  public render() {
    return (
      <div>
        <p>Items!</p>
      </div>
    );
  }
}
