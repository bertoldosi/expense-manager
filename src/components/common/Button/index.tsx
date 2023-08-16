import React from "react";

import { Scontent } from "./styles";
import { Lock } from "phosphor-react";

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  typeButton?: string;
  width?: string;
  height?: string;
}

export const Button = ({
  text,
  typeButton = "primary",
  disabled,
  width = "100%",
  height = "4rem",
  ...props
}: PropsType) => {
  return (
    <Scontent {...props} typeButton={typeButton} width={width} height={height}>
      {disabled ? <Lock size={18} /> : <strong>{text}</strong>}
    </Scontent>
  );
};
