import React, { ForwardedRef, forwardRef, useContext } from "react";
import Link from "next/link";

import { LogoDark } from "@icons/LogoDark";
import { LogoLight } from "@icons/LogoLight";

import {
  UserContextConfig,
  UserContextConfigType,
} from "@context/userContextConfig";

import { Container } from "./styles";

function Logo() {
  const { theme } = useContext(UserContextConfig) as UserContextConfigType;

  if (theme.type === "dark") {
    return <LogoDark />;
  }

  return <LogoLight />;
}

const LayoutHeaderLogo = forwardRef<HTMLAnchorElement>((ref) => {
  return (
    <Container>
      <Link href="/" passHref ref={ref as ForwardedRef<HTMLAnchorElement>}>
        <Logo />
      </Link>
    </Container>
  );
});

export default LayoutHeaderLogo;
