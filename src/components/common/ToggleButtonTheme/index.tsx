import { MoonStars, SunDim } from "phosphor-react";
import React, { useEffect, useState } from "react";

import { Container } from "./styles";
import {
  UserContextConfig,
  UserContextConfigType,
} from "@context/userContextConfig";

type Props = {};

export const ToggleButtonTheme = ({}: Props) => {
  const [checked, setChecked] = useState(true);

  const { toggleTheme, theme } = React.useContext(
    UserContextConfig
  ) as UserContextConfigType;

  function onChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = ev.target;
    setChecked(checked);
    toggleTheme();
  }

  return (
    <Container>
      <input
        type="checkbox"
        id="checkbox"
        checked={theme.type === "light"}
        onChange={onChange}
      />
      <label htmlFor="checkbox">
        <MoonStars size={12} color="#a1cae1" />
        <div />
        <SunDim size={12} color="#f49e12" />
      </label>
    </Container>
  );
};
