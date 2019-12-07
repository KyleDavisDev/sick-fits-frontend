import * as React from "react";
import Items from "../components/Items/Items";

export interface IHomeProps {}

export default class Home extends React.Component<IHomeProps> {
  public render() {
    return (
      <div>
        <Items />
      </div>
    );
  }
}
