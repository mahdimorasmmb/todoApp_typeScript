import React from "react";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const TextField = ({ value, onChange }: Props) => {
  return (
    <input
      onChange={onChange}
      value={value}
      className="w-full rounded border border-[#c7c7c7] py-3 px-4"
      type="text"
    />
  );
};

export default TextField;
