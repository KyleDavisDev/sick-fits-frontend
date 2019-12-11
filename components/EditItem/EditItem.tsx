import * as React from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import Form from "../Form/Form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

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

interface IEditItemProps {}

interface IEditItemState {
  title: string;
  description: string;
  image: string;
  largeImage: string;
  price: number;

  [name: string]: string | number;
}

class EditItem extends React.Component<IEditItemProps, IEditItemState> {
  state: IEditItemState = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 15
  };

  public render() {
    return (
      <div>
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
          {(createItem, payload) => (
            <Form
              onSubmit={async e => {
                await this.onSubmit(e, createItem);
              }}
            >
              <ErrorMessage error={payload.error}></ErrorMessage>
              <h2>CreateItem an Item</h2>
              <fieldset disabled={payload.loading} aria-busy={payload.loading}>
                <label htmlFor="file">
                  Upload File
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Upload an image..."
                    required
                    onChange={this.uploadFile}
                  />
                  {this.state.image && <img src={this.state.image} />}
                </label>
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

  public onSubmit = async (e: React.FormEvent, fn: Function) => {
    // prevent normal form submission
    e.preventDefault();
    //call api to submit data
    const res = await fn();

    //redirect user
    Router.push({ pathname: "/item", query: { id: res.data.createItem.id } });
  };

  public uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("upload file...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sick-fits");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/kydavdev/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();

    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };
}

export default EditItem;
