import React, { ReactNode } from "react";

import { Scontainer } from "./styles";

type PropsType = { children: ReactNode; title: string };

export const Card = ({ children, title }: PropsType) => {
  return (
    <Scontainer>
      <h2>{title}</h2>
      {children}
    </Scontainer>
  );
};
