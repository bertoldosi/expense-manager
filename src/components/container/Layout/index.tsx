import LayoutHeader from "@containers/Layout/LayoutHeader";
import React, { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

const Layout = ({ children }: PropsType) => {
  return (
    <div>
      <LayoutHeader />
      {children}
    </div>
  );
};

export default Layout;
