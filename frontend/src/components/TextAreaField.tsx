import React, { memo } from "react";

interface Props {
  value?: string;
  label?: string;
  name?: string;
  defaultValue?: string;
  onInput:(value:{}) =>void
}

const TextAreaField = ({
  value,
  label,
  name,
  defaultValue,
  onInput,
}: Props) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onInput({[e.target.name]:e.target.value})}
        defaultValue={defaultValue}
        name={name}
        className="h-52 w-full rounded border border-[#c7c7c7] py-3 px-4 outline-PRIMARY_COLOR "
      />
    </>
  );
};

export default memo(TextAreaField);
