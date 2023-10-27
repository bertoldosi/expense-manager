import React from "react";
import { signIn } from "next-auth/react";
import { GoogleLogo } from "@icons/GoogleLogo";

import { Container, GoogleButton, GoogleText } from "./styles";

const LoginContainer = () => {
  function handlerLogin() {
    signIn("google");
  }
  return (
    <Container>
      <GoogleButton onClick={handlerLogin}>
        <GoogleLogo />
        <GoogleText>Google</GoogleText>
      </GoogleButton>
    </Container>
  );
};

export default LoginContainer;
