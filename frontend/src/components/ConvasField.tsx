import React from "react";

interface Props {
  label?: string;
}

const ConvasField = ({ label }: Props) => {
  return (
    <>
      {label && <label>{label}</label>}
      <canvas  className="h-52 w-full cursor-crosshair rounded border-2 border-[#000000] " />
    </>
  );
};

export default ConvasField;
