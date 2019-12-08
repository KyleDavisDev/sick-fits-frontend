import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import formatMoney from "../../lib/formatMoney";

interface ICreateItem {}

class CreateItem extends React.Component<ICreateItem, {}> {
  public render() {
    return <p>CreateItems</p>;
  }
}

export default CreateItem;
