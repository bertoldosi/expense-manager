import React from "react";

import HeaderLogo from "@containers/Layout/LayoutHeaderLogo";
import HeaderUser from "@containers/Layout/LayoutHeaderUser";

import { Container, Wrapper } from "./styles";

function LayoutHeader() {
  return (
    <Container>
      <Wrapper>
        <HeaderLogo />
        <HeaderUser />
      </Wrapper>
    </Container>
  );
}

export default LayoutHeader;
