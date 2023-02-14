import React, { forwardRef, memo, useEffect, useRef } from "react";

interface Props {
  onInput: ({}) => void;
  value?: string;
  label?: string;
  name?: string;
  defaultValue?: string;
}

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ value, onInput, label, name, defaultValue }, ref) => {
    return (
      <>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          defaultValue={defaultValue}
          name={name}
          ref={ref}
          onChange={(e) => onInput({[e.target.name]:e.target.value})}
          value={value}
          className="w-full rounded border border-[#c7c7c7] py-3 px-4 outline-PRIMARY_COLOR"
          type="text"
        />
      </>
    );
  }
);

export default memo(TextField);
