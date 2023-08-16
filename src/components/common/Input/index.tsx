import React, { ChangeEventHandler, HTMLProps } from "react";

import { Scontainer } from "./styles";

interface PropsTypes extends HTMLProps<HTMLInputElement> {
  error?: string;
}

function Input({ error, ...props }: PropsTypes) {
  return (
    <Scontainer>
      <input {...props} />
      <span>{error}</span>
    </Scontainer>
  );
}

export default Input;
