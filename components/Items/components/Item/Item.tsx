import * as React from "react";
import Link from "next/link";
import Title from "./components/Title/Title";
import PriceTag from "./components/PriceTag/PriceTag";
import { StyledContainer } from "./ItemStyles";

interface IItemProp {
  item: {
    id: string;
    title: string;
    description: string;
    price: number;
    image?: string;
  };
}

class Item extends React.Component<IItemProp, {}> {
  public render() {
    const { item } = this.props;

    return (
      <StyledContainer>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title id={item.id}>{item.title}</Title>
        <PriceTag>{item.price}</PriceTag>
        <p>{item.description}</p>

        <div className="buttonList">
          <Link href={{ pathname: "update", query: { id: item.id } }}>
            <a>Edit</a>
          </Link>
          <button>Add to cart</button>
          <button>delete</button>
        </div>
      </StyledContainer>
    );
  }
}

export default Item;
