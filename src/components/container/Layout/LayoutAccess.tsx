import React, { ReactNode, useContext } from "react";

import {
  UserContextConfig,
  UserContextConfigType,
} from "@context/userContextConfig";

import { LogoDark } from "@icons/LogoDark";
import { LogoLight } from "@icons/LogoLight";

import { Container, Content, Wrapper, Header } from "./styles";

type LayoutAccessType = {
  children: ReactNode;
};

function Logo() {
  const { theme } = useContext(UserContextConfig) as UserContextConfigType;

  if (theme.type === "dark") {
    return <LogoDark />;
  }

  return <LogoLight />;
}

export const LayoutAccess = ({ children }: LayoutAccessType) => {
  return (
    <Container>
      <Wrapper>
        <Header>
          <Logo />
        </Header>
        <Content>{children}</Content>
      </Wrapper>
    </Container>
  );
};
