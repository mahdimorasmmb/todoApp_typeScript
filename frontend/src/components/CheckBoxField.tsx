import React, { memo } from "react";

interface Props {
  value?: boolean;
  label?: string;
  name: string;
  defaultValue?: boolean;
  onInput: (value:{}) => void
}

const CheckBoxField = ({
  label,
  name,
  defaultValue,
  onInput,
  value,
}: Props) => {
  return (
    <div className="flex cursor-pointer items-center ">
      <input
        checked={value}
        onChange={(e) => onInput({[e.target.name]:e.target.checked})}
        defaultChecked={defaultValue}
        name={name}
        className="-m-[1px] h-[15px] w-[15px] cursor-pointer rounded "
        type="checkbox"
      />
      {label && (
        <label className="ml-1" htmlFor={name}>
          {label}
        </label>
      )}
    </div>
  );
};

export default memo(CheckBoxField);
