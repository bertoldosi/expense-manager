import React, { ChangeEventHandler, SelectHTMLAttributes } from "react";
import { Sselect } from "./styles";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  defaultOption?: SelectOption;
  onChange?: ChangeEventHandler;
}

function InputSelectTable({
  options,
  defaultOption,
  value,
  onChange,
  ...props
}: SelectInputProps) {
  return (
    <Sselect {...props} value={value} onChange={onChange}>
      {defaultOption && (
        <option value={defaultOption.value}>{defaultOption.label}</option>
      )}

      {options.map((option) => (
        <option key={String(option.value)} value={option.value}>
          {option.label}
        </option>
      ))}
    </Sselect>
  );
}

export default InputSelectTable;
