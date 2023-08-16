import { Save } from "src/components/icons/Save";
import React from "react";

import { Scontainer } from "./styles";

interface PropsTypes extends React.HTMLProps<HTMLInputElement> {
  onClickAddItem: () => void;
}

export const InputWithSelectItems = ({
  onClickAddItem,
  ...props
}: PropsTypes) => {
  return (
    <Scontainer>
      <input {...props} />
      <Save width={20} height={20} onClick={onClickAddItem} />
    </Scontainer>
  );
};
