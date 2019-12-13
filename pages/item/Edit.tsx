import * as React from "react";

import EditItem from "../../components/EditItem/EditItem";

interface IEditProps {
  query: { id: string };
}

class Edit extends React.PureComponent<IEditProps> {
  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    return <EditItem id={this.props.query.id} />;
  }
}

export default Edit;
