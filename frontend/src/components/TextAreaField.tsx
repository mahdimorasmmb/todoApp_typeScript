import React from "react";

interface Props {
  value?: string;
  label?: string;
  name?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const TextAreaField = ({
  value,
  label,
  name,
  defaultValue,
  onChange,
}: Props) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        name={name}
        className="h-52 w-full rounded border border-[#c7c7c7] py-3 px-4 outline-PRIMARY_COLOR "
      />
    </>
  );
};

export default TextAreaField;
