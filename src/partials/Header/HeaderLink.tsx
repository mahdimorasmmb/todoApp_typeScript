import React, { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

const HeaderLink = ({ href, children }: Props) => {
  return (
    <a
      className="cursor-pointer  text-INVERSE_TEXT_COLOR  no-underline m-1"
      href={href}
    >
      {children}
    </a>
  );
};

export default HeaderLink;
