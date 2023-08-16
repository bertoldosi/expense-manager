import React from "react";

import HeaderLogo from "@containers/Layout/LayoutHeaderLogo";
import HeaderUser from "@containers/Layout/LayoutHeaderUser";

import { Scontainer, Scontent } from "./styles";

function LayoutHeader() {
  return (
    <>
      <Scontainer>
        <Scontent>
          <HeaderLogo />
          <HeaderUser />
        </Scontent>
      </Scontainer>
    </>
  );
}

export default LayoutHeader;
