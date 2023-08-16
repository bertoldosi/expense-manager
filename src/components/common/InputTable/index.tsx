import React from "react";
import { ScontainerInput, ScontainerInputCheckbox } from "./styles";

interface PropsTypes extends React.HTMLProps<HTMLInputElement> {
  handleEnter?: () => void;
}

const InputTable: React.FC<PropsTypes> = ({ handleEnter, ...props }) => {
  const { name, type, id, checked, value } = props;

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && handleEnter) {
      handleEnter();
    }
  };

  const isAmount = name === "amount";
  const placeholder = isAmount ? "R$ 0,00" : "Digite um valor";

  const renderCheckboxInput = () => (
    <ScontainerInputCheckbox>
      <input id={id} type="checkbox" checked={checked} {...props} />
      <label htmlFor={id} />
    </ScontainerInputCheckbox>
  );

  const renderTextInput = () => (
    <ScontainerInput>
      <input
        id={id}
        placeholder={placeholder}
        onKeyUp={handleOnKeyUp}
        value={value}
        {...props}
      />
    </ScontainerInput>
  );

  return type === "checkbox" ? renderCheckboxInput() : renderTextInput();
};

export default InputTable;
