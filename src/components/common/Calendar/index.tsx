import React from "react";

import { Scontainer, Scontent, Sheader } from "./styles";

export const Calendar = () => {
  return (
    <Scontainer>
      <Sheader>
        <h1>-</h1>
        <h1>2022</h1>
        <h1>-</h1>
      </Sheader>
      <Scontent>
        <span>Set</span>
        <span>Set</span>
        <span>Set</span>
        <span>Set</span>
        <span>Set</span>
        <span>Set</span>
        <span>Set</span>
      </Scontent>
    </Scontainer>
  );
};
