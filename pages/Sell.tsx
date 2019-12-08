import * as React from "react";
import Form from "../components/Form/Form";

export interface ISellProps {}

export default class Sell extends React.Component<ISellProps> {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };

  public render() {
    return (
      <div>
        <Form>
          <h2>Sell an Item</h2>
          <fieldset>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                required
                value={this.state.title}
                onChange={this.onChange}
              />
            </label>
            <label htmlFor="price">
              price
              <input
                type="number"
                id="price"
                name="price"
                required
                value={this.state.price}
                onChange={this.onChange}
              />
            </label>
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                required
                value={this.state.description}
                onChange={this.onChange}
              />
            </label>
          </fieldset>
        </Form>
      </div>
    );
  }

  public onChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // grab parts of events
    const { name, type, value } = ev.target;
    // change string-number into number if need be
    const val = type === "number" && value ? parseFloat(value) : value;
    // update state
    this.setState({ [name]: val });
  };
}
