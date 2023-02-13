import React from "react";

interface Props {
  value?: boolean;
  label?: string;
  name?: string;
  defaultValue?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CheckBoxField = ({
  label,
  name,
  defaultValue,
  onChange,
  value,
}: Props) => {
  return (
    <div className="flex cursor-pointer items-center ">
      <input
        checked={value}
        onChange={onChange}
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

export default CheckBoxField;
