import React from "react";

import { Scontent, Spointer } from "./styles";

export const DragDrop = ({ ...props }) => {
  return (
    <Scontent {...props}>
      <div>
        <Spointer />
        <Spointer />
      </div>
      <div>
        <Spointer />
        <Spointer />
      </div>
    </Scontent>
  );
};
