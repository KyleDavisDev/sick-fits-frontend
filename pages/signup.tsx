import * as React from "react";
import CreateUser from "../components/CreateUser/CreateUser";
import SignInUser from "../components/SignInUser/SignInUser";
import RequestReset from "../components/RequestReset/RequestReset";

export interface ISignUpProps {}

export default class SignUp extends React.Component<ISignUpProps> {
  public render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around"
        }}
      >
        <CreateUser />
        <br />
        <SignInUser />
        <br />
        <RequestReset />
      </div>
    );
  }
}
