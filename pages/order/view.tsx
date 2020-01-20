import * as React from "react";
import PleaseSignIn from "../../components/PleaseSignIn/PleaseSignIn";
import Order from "../../components/Order/Order";

interface IViewOrderProps {
  query: { id: string };
}

class ViewOrder extends React.PureComponent<IViewOrderProps> {
  static getInitialProps({ query }) {
    return { query };
  }
  render() {
    const id =
      this.props.query && this.props.query.id ? this.props.query.id : null;
    if (!id) return <p>No order found...</p>;
    return (
      <PleaseSignIn>
        <Order id={this.props.query.id} />
      </PleaseSignIn>
    );
  }
}

export default ViewOrder;
