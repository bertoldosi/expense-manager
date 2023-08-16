import React from "react";

import { LayoutAccess } from "@containers/Layout/LayoutAccess";
import LoginContainer from "@containers/Login";

const Login = () => {
  return <LoginContainer />;
};

Login.layout = LayoutAccess;

export default Login;
