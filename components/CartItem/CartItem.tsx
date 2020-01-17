import formatMoney from "../../lib/formatMoney";

export interface ICartItemProps {
  key: string;
}

const CartItem: React.SFC<ICartItemProps> = (props: ICartItemProps) => {
  return <li key={props.key}>yo</li>;
};

export default CartItem;
