import React, { forwardRef, useEffect, useRef } from "react";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange }, ref) => {
    return (
      <input
        ref={ref}
        onChange={onChange}
        value={value}
        className="w-full rounded border border-[#c7c7c7] py-3 px-4 outline-PRIMARY_COLOR"
        type="text"
      />
    );
  }
);

export default TextField;
