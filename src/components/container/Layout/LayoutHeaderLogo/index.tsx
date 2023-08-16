import React, { ForwardedRef, forwardRef } from "react";
import Image from "next/image";
import logoDark from "@assets/logo-light.svg";
import logoLight from "@assets/logo-dark.svg";

import { Scontainer } from "./styles";
import Link from "next/link";
import {
  UserContextConfig,
  UserContextConfigType,
} from "@context/userContextConfig";

interface LayoutHeaderLogoProps {}

const LayoutHeaderLogo = forwardRef<HTMLAnchorElement, LayoutHeaderLogoProps>(
  (props, ref) => {
    const { theme } = React.useContext(
      UserContextConfig
    ) as UserContextConfigType;

    const logo = theme.type === "dark" ? logoLight : logoDark;

    return (
      <Scontainer>
        <Link href="/" passHref ref={ref as ForwardedRef<HTMLAnchorElement>}>
          <a>
            <Image src={logo} width={120} />
          </a>
        </Link>
      </Scontainer>
    );
  }
);

export default LayoutHeaderLogo;
