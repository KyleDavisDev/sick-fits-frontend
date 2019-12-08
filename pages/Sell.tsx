import * as React from "react";
import Form from "../components/Form/Form";

export interface ISellProps {}

export default class Sell extends React.Component<ISellProps> {
  public render() {
    return (
      <div>
        <Form>
          <h2>Sell an Item</h2>
          <fieldset>
            <label htmlFor="title">
              Title
              <input type="text" id="title" name="title" required></input>
            </label>
          </fieldset>
        </Form>
      </div>
    );
  }
}
