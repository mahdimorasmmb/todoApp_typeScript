import React, { forwardRef, useEffect, useRef } from "react";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  label?:string;
  name?:string
  defaultValue?:string
}

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange,label,name ,defaultValue}, ref) => {
    return (
     <>
    {label &&  <label htmlFor={name}>{label}</label>}
     <input
     defaultValue={defaultValue}
     name={name}
     ref={ref}
     onChange={onChange}
     value={value}
     className="w-full rounded border border-[#c7c7c7] py-3 px-4 outline-PRIMARY_COLOR"
     type="text"
   />
     </>
    );
  }
);

export default TextField;
