import React, { ReactNode } from "react";

type TypeButtonKey = keyof typeof variantButton;

interface Prpos {
  children: ReactNode;
  type?: TypeButtonKey;
}

const variantButton = {
  primary: "bg-PRIMARY_COLOR text-INVERSE_TEXT_COLOR",
  secondary: "bg-SECONDARY_COLOR text-INVERSE_TEXT_COLOR",
  disabled: "bg-BG_COLOR text-TEXT_COLOR opacity-50",
  transparent: "bg-transparent text-TEXT_COLOR",
};

const Button = ({ children, type = "transparent" }: Prpos) => {
  return (
    <button
      className={`border-no cursor-pointer rounded-md  py-3 px-4 text-base uppercase ${variantButton[type]}`}
    >
      {children}
    </button>
  );
};

export default Button;
