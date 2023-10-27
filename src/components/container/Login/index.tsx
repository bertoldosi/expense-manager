import React from "react";
import { signIn } from "next-auth/react";
import { LogoGoogle } from "@icons/LogoGoogle";

import { Container, ButtonGoogle, TextGoogle } from "./styles";

const LoginContainer = () => {
  function handlerLogin() {
    signIn("google");
  }
  return (
    <Container>
      <ButtonGoogle onClick={handlerLogin}>
        <LogoGoogle />
        <TextGoogle>Google</TextGoogle>
      </ButtonGoogle>
    </Container>
  );
};

export default LoginContainer;
