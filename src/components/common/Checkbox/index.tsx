import React, { ReactNode } from "react";

import { Scontainer } from "./styles";

interface PropsTypes extends React.HTMLProps<HTMLInputElement> {
  error?: Object;
  props?: React.ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
}

export const Checkbox = ({ error, children, ...props }: PropsTypes) => {
  return (
    <Scontainer checked={props.checked}>
      <>
        <label htmlFor={props.id}>
          <input type="radio" {...props} />
          {children}
        </label>
        {error}
      </>
    </Scontainer>
  );
};
