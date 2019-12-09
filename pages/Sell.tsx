import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../components/Form/Form";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

export interface ISellProps {}

export interface ISellState {
  title: string;
  description: string;
  image: string;
  largeImage: string;
  price: number;
  [name: string]: string | number;
}

export default class Sell extends React.Component<ISellProps, ISellState> {
  state: ISellState = {
    title: "sample title",
    description: "description",
    image: "dog.jpg",
    largeImage: "large-dog.jpg",
    price: 15
  };

  public render() {
    return (
      <div>
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
          {(createItem, payload) => (
            <Form onSubmit={this.onSubmit}>
              <ErrorMessage error={payload.error}></ErrorMessage>
              <h2>Sell an Item</h2>
              <fieldset disabled={true}>
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
                  Price
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
                    placeholder="Enter a description..."
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </label>
                <button type="submit">Submit</button>
              </fieldset>
            </Form>
          )}
        </Mutation>
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

  public onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit even");
  };
}
