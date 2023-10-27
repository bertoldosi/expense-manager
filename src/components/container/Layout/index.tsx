import React, { ReactNode } from "react";

import LayoutHeader from "@containers/Layout/LayoutHeader";

import { LayoutMain } from "./styles";

type LayoutType = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutType) => {
  return (
    <LayoutMain>
      <LayoutHeader />
      {children}
    </LayoutMain>
  );
};

export default Layout;
