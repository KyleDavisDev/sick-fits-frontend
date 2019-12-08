import * as React from "react";
import Title from "./components/Title/Title";
import PriceTag from "./components/PriceTag/PriceTag";
import { StyledContainer } from "./ItemStyles";

interface IItemProp {
  item: {
    id: string;
    title: string;
    description: string;
    price: number;
  };
}

class Item extends React.Component<IItemProp, {}> {
  public render() {
    const { item } = this.props;

    return (
      <StyledContainer>
        <Title id={item.id}>{item.title}</Title>
        <PriceTag>{item.price}</PriceTag>
        <p>{item.description}</p>

        <div className="button-list">
          <Link>
            <a>Edit</a>
          </Link>
        </div>
      </StyledContainer>
    );
  }
}

export default Item;
