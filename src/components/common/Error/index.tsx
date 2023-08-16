import React from "react";

import { Container } from "./styles";

type PropsType = {
  children: string | undefined;
};

export const Error = ({ children }: PropsType) => {
  return <Container>{children}</Container>;
};
