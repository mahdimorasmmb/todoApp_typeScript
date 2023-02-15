import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  href: string;
  children: ReactNode;
}

const HeaderLink = ({ href, children }: Props) => {
  return (
    <Link
      className="cursor-pointer  text-INVERSE_TEXT_COLOR  no-underline m-1"
      to={href}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
