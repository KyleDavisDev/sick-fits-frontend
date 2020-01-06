import * as React from "react";
import PleaseSignIn from "../components/PleaseSignIn/PleaseSignIn";
import Permissions from "../components/Permissions/Permissions";

interface IPermissionsPageProps {}

const PermissionsPage: React.FunctionComponent<IPermissionsPageProps> = props => {
  return (
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  );
};

export default PermissionsPage;
