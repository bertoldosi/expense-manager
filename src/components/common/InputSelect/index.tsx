import React, { ChangeEventHandler, SelectHTMLAttributes } from "react";
import { Sselect } from "./styles";

interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

interface SelectInputProps<T extends string | number>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption<T>[];
  defaultOption?: SelectOption<T>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

function InputSelect<T extends string | number>({
  options,
  defaultOption,
  ...props
}: SelectInputProps<T>) {
  return (
    <Sselect {...props} defaultValue={defaultOption ? defaultOption.value : ""}>
      {defaultOption && (
        <option value={defaultOption.value} selected>
          {defaultOption.label}
        </option>
      )}

      {options.map((option) => (
        <option key={String(option.value)} value={option.value}>
          {option.label}
        </option>
      ))}
    </Sselect>
  );
}

export default InputSelect;
