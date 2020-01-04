import * as React from "react";
import CreateUser from "../components/CreateUser/CreateUser";
import SignInUser from "../components/SignInUser/SignInUser";

export interface ISignUpProps {}

export default class SignUp extends React.Component<ISignUpProps> {
  public render() {
    return (
      <div>
        <CreateUser />
        <br />
        <SignInUser />
        {/* <CreateUser /> */}
      </div>
    );
  }
}
