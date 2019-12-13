import * as React from "react";
import { Mutation, Query } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import Form from "../Form/Form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

interface IEditItemProps {
  id: string;
}

interface IEditItemState {
  title?: string;
  description?: string;
  image?: string;
  largeImage?: string;
  price?: number;

  [name: string]: string | number;
}

class EditItem extends React.Component<IEditItemProps, IEditItemState> {
  state: IEditItemState = {};

  public render() {
    return (
      <div>
        <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
          {queryPayload => {
            if (queryPayload.loading) return <p>Loading...</p>;
            if (queryPayload.error)
              return <p>Error: {queryPayload.error.message}</p>;
            if (!queryPayload.data.item)
              return <p>No Item found for ID: {this.props.id}</p>;
            return (
              <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                {(updateItem, payload) => (
                  <Form
                    onSubmit={async e => {
                      await this.onSubmit(e, updateItem);
                    }}
                  >
                    <ErrorMessage error={payload.error}></ErrorMessage>
                    <h2>CreateItem an Item</h2>
                    <fieldset
                      disabled={payload.loading}
                      aria-busy={payload.loading}
                    >
                      {/* <label htmlFor="file">
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
                      </label> */}
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          id="title"
                          name="title"
                          required
                          defaultValue={queryPayload.data.item.title}
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
                          defaultValue={queryPayload.data.item.price}
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
                          defaultValue={queryPayload.data.item.description}
                          onChange={this.onChange}
                        />
                      </label>
                      <button type="submit">Save Changes</button>
                    </fieldset>
                  </Form>
                )}
              </Mutation>
            );
          }}
        </Query>
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
    const res = await fn({ variables: { id: this.props.id, ...this.state } });

    //redirect user
    // Router.push({ pathname: "/item", query: { id: res.data.createItem.id } });
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
