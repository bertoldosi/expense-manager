import Image from "next/image";
import React, { ReactNode } from "react";
import logoDark from "@assets/logo-dark.svg";
import logoLight from "@assets/logo-light.svg";
import { Sbody, Scontainer, Scontent, Sheader } from "./styles";

import {
  UserContextConfig,
  UserContextConfigType,
} from "@context/userContextConfig";

type PropsType = {
  children: ReactNode;
};

export const LayoutAccess = ({ children }: PropsType) => {
  const { theme } = React.useContext(
    UserContextConfig
  ) as UserContextConfigType;

  const logo = theme.type === "dark" ? logoDark : logoLight;

  return (
    <Scontainer>
      <Scontent>
        <Sheader>
          <Image src={logo} width={150} />
        </Sheader>
        <Sbody>{children}</Sbody>
      </Scontent>
    </Scontainer>
  );
};
