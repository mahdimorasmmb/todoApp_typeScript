import React, { memo, ReactNode } from "react";

type TypeButtonKey = keyof typeof variantButton;

interface Prpos {
  className?: string;
  children: ReactNode;
  variant?: TypeButtonKey;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const variantButton = {
  primary: "bg-PRIMARY_COLOR text-INVERSE_TEXT_COLOR",
  secondary: "bg-SECONDARY_COLOR text-INVERSE_TEXT_COLOR",
  disabled: "bg-BG_COLOR text-TEXT_COLOR opacity-50",
  transparent: "bg-transparent text-TEXT_COLOR",
};

const Button = ({
  children,
  variant = "transparent",
  onClick,
  type = "button",
  className,
}: Prpos) => {
  const style = ` ${className} border-no cursor-pointer rounded-md  py-3 px-4 text-base uppercase   ${variantButton[variant]}  `;
  return (
    <button type={type} onClick={onClick} className={style}>
      {children}
    </button>
  );
};

export default memo(Button);
