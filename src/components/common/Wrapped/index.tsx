import React, { ReactNode } from "react";

import { Scontainer } from "./styles";

type PropsType = {
  children: ReactNode;
};

export const Wrapped = ({ children }: PropsType) => {
  return <Scontainer>{children}</Scontainer>;
};
