import * as React from "react";
import CreateUser from "../components/CreateUser/CreateUser";

export interface ISignUpProps {}

export default class SignUp extends React.Component<ISignUpProps> {
  public render() {
    return (
      <div>
        <CreateUser />
        <CreateUser />
        <CreateUser />
      </div>
    );
  }
}
