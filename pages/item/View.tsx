import * as React from "react";
import SingleItem from "../../components/SingleItem/SingleItems";

interface IViewProps {
  query: { id: string };
}

class View extends React.PureComponent<IViewProps> {
  static getInitialProps({ query }) {
    return { query };
  }
  render() {
    return <SingleItem id={this.props.query.id} />;
  }
}

export default View;
