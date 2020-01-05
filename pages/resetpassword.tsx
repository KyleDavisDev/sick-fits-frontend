import * as React from "react";
import ResetUserPassword from "../components/ResetUserPassword/ResetUserPassword";

interface IResetPasswordProps {
  query: { resetToken?: string };
}

class ResetPassword extends React.Component<IResetPasswordProps> {
  static getInitialProps({ query }) {
    return { query };
  }
  render() {
    const { resetToken } = this.props.query;
    return (
      <div>
        <ResetUserPassword resetToken={resetToken} />
      </div>
    );
  }
}

export default ResetPassword;
